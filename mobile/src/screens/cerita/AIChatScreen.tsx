import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { ShieldCheck, Info } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { ChatBubble } from '../../components/chat/ChatBubble';
import { QuickPromptChips } from '../../components/chat/QuickPromptChips';
import { RelaxationCard } from '../../components/chat/RelaxationCard';
import { ChatInputBar } from '../../components/chat/ChatInputBar';
import { useApp } from '../../state/AppContext';

export const AIChatScreen: React.FC = () => {
  const { chatMessages, sendAiMessage, screenParams, goBack } = useApp();
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 150);
  }, [chatMessages]);

  const hasRelaxationPrompt =
    screenParams?.startRelaxation ||
    chatMessages.some((m) => m.isBreathingPrompt);

  const [showMoodPermission, setShowMoodPermission] = React.useState(true);

  return (
    <View style={styles.container}>
      <ContextualHeader
        title="Teman Akses"
        subtitle="Teman Digitalmu · Asisten AI"
        showCrisisButton
        onBack={goBack}
      />

      {/* Ethical Transparency Banner (Screen H01 BRIEF TEMAN SEBAYA) */}
      <View style={styles.disclaimerBar}>
        <Info size={14} color={colors.textMuted} />
        <Text style={styles.disclaimerText}>
          Teman Akses menggunakan AI. Ia bukan manusia, psikolog, atau layanan darurat, dan tidak dapat memberikan diagnosis.
        </Text>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef as any}
          style={styles.messagesScroll}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Mood Data Permission Prompt (Screen H04 BRIEF TEMAN SEBAYA) */}
          {showMoodPermission && (
            <View style={styles.moodPermissionBox}>
              <Text style={styles.moodPermissionTitle}>Izin Akses Catatan Mood</Text>
              <Text style={styles.moodPermissionText}>
                Apakah kamu ingin Teman Akses menggunakan ringkasan catatan mood untuk membantu memberikan respons yang lebih relevan?
              </Text>
              <View style={styles.moodPermissionButtons}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowMoodPermission(false)}
                  style={styles.permissionAllowBtn}
                >
                  <Text style={styles.permissionAllowText}>Izinkan</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowMoodPermission(false)}
                  style={styles.permissionDismissBtn}
                >
                  <Text style={styles.permissionDismissText}>Tidak Sekarang</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Quick Prompts if only 1 message (Screen H02 Suggested Prompts) */}
          {chatMessages.length <= 1 && (
            <QuickPromptChips onSelectPrompt={(p) => sendAiMessage(p)} />
          )}

          {/* Messages */}
          {chatMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}

          {/* Interactive Relaxation Exercise Card */}
          {hasRelaxationPrompt && (
            <RelaxationCard
              onComplete={() => {
                sendAiMessage('Aku sudah selesai latihan napas, terasa lebih tenang sekarang.');
              }}
            />
          )}
        </ScrollView>

        {/* Input Bar */}
        <ChatInputBar onSendMessage={(text) => sendAiMessage(text)} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  disclaimerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  disclaimerText: {
    fontSize: 10.5,
    color: colors.textMuted,
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  messagesScroll: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  moodPermissionBox: {
    backgroundColor: colors.brandBlue[50],
    borderWidth: 1,
    borderColor: colors.brandBlue[100],
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  moodPermissionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandBlue[700],
    marginBottom: 4,
  },
  moodPermissionText: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  moodPermissionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  permissionAllowBtn: {
    backgroundColor: colors.brandBlue[600],
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: borderRadius.full,
  },
  permissionAllowText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  permissionDismissBtn: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
  },
  permissionDismissText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
