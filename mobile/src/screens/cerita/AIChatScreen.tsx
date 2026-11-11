import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Info } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { ChatBubble } from '../../components/chat/ChatBubble';
import { QuickPromptChips } from '../../components/chat/QuickPromptChips';
import { RelaxationCard } from '../../components/chat/RelaxationCard';
import { ChatInputBar } from '../../components/chat/ChatInputBar';
import { useApp } from '../../state/AppContext';

export const AIChatScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { chatMessages, sendAiMessage, screenParams, goBack } = useApp();
  const scrollRef = useRef<any>(null);

  // Check if AI is currently preparing a response
  const isAiTyping =
    chatMessages.length > 0 &&
    chatMessages[chatMessages.length - 1].sender === 'user';

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive or when AI begins typing
    const timer = setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 120);
    return () => clearTimeout(timer);
  }, [chatMessages, isAiTyping]);

  const hasRelaxationPrompt =
    screenParams?.startRelaxation ||
    chatMessages.some((m) => m.isBreathingPrompt);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* Top Safe Area Bar with Brand Blue */}
      <View style={{ height: insets.top, backgroundColor: colors.brandBlue[600] }} />

      {/* Header: Back button, Thoriq avatar, and Teman Akses title */}
      <ContextualHeader
        title="Teman Akses"
        subtitle="Thoriq · Teman Digitalmu"
        avatarSource={require('../../../assets/mascot/thoriq_avatar.png')}
        onBack={goBack}
        variant="blue"
      />

      {/* Ethical Transparency Disclaimer Banner */}
      <View style={styles.disclaimerBar}>
        <Info size={14} color={colors.textMuted} style={styles.disclaimerIcon} />
        <Text style={styles.disclaimerText}>
          Teman Akses menggunakan AI. Ia bukan manusia, psikolog, atau layanan darurat, dan tidak dapat memberikan diagnosis.
        </Text>
      </View>

        <KeyboardAvoidingView
          style={styles.keyboardContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <ScrollView
            ref={scrollRef}
            style={styles.messagesScroll}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Conversation Messages */}
            {chatMessages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}

            {/* Quick Prompts if conversation is starting */}
            {chatMessages.length <= 1 && (
              <QuickPromptChips onSelectPrompt={(p) => sendAiMessage(p)} />
            )}

            {/* Loading / Typing State Indicator */}
            {isAiTyping && (
              <View style={styles.typingContainer}>
                <View style={styles.typingBubble}>
                  <Text style={styles.typingText}>Mengetik...</Text>
                </View>
              </View>
            )}

            {/* Interactive Relaxation Exercise Card */}
            {hasRelaxationPrompt && (
              <RelaxationCard
                onComplete={() => {
                  sendAiMessage('Aku sudah selesai latihan napas, terasa lebih tenang sekarang.');
                }}
              />
            )}
          </ScrollView>

          {/* Bottom Chat Input Composer */}
          <ChatInputBar onSendMessage={(text) => sendAiMessage(text)} />
        </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  disclaimerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 9,
  },
  disclaimerIcon: {
    marginRight: 8,
  },
  disclaimerText: {
    fontSize: 11,
    lineHeight: 16,
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
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
  },
  typingContainer: {
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  typingBubble: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  typingText: {
    fontSize: 13,
    fontStyle: 'italic',
    color: colors.textMuted,
  },
});
