import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BookOpen, ChevronRight, PhoneCall } from 'lucide-react-native';
import { colors } from '../../theme';
import { ChatMessage } from '../../types';
import { useApp } from '../../state/AppContext';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const { navigateTo, openCrisisModal } = useApp();
  const isUser = message.sender === 'user';

  return (
    <View
      style={[
        styles.messageContainer,
        isUser ? styles.containerUser : styles.containerAi,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAi,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            isUser ? styles.messageTextUser : styles.messageTextAi,
          ]}
        >
          {message.text}
        </Text>

        {/* Recommended Article Card if AI suggests learning resources */}
        {message.recommendedArticleId && (
          <TouchableOpacity
            style={styles.articleCard}
            onPress={() =>
              navigateTo('article_detail', { articleId: message.recommendedArticleId })
            }
            activeOpacity={0.8}
          >
            <View style={styles.articleIconBox}>
              <BookOpen size={16} color={colors.brandBlue[600]} />
            </View>
            <View style={styles.articleInfo}>
              <Text style={styles.articleBadge}>Teman Belajar</Text>
              <Text style={styles.articleTitle} numberOfLines={2}>
                {message.recommendedArticleTitle || 'Baca artikel terkait'}
              </Text>
            </View>
            <ChevronRight size={16} color={colors.textMuted} />
          </TouchableOpacity>
        )}

        {/* Emergency Crisis Action Card */}
        {message.isCrisisNotice && (
          <TouchableOpacity
            style={styles.crisisCard}
            onPress={() => openCrisisModal()}
            activeOpacity={0.85}
          >
            <View style={styles.crisisIconBox}>
              <PhoneCall size={16} color="#DC2626" />
            </View>
            <View style={styles.crisisInfo}>
              <Text style={styles.crisisTitle}>Layanan SEJIWA 119 Ext 8</Text>
              <Text style={styles.crisisSubtitle}>
                Buka Protokol Darurat & Bantuan Sekarang
              </Text>
            </View>
            <ChevronRight size={16} color="#DC2626" />
          </TouchableOpacity>
        )}

        <Text
          style={[
            styles.timestamp,
            isUser ? styles.timestampUser : styles.timestampAi,
          ]}
        >
          {message.timestamp}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    width: '100%',
    marginVertical: 4,
    flexDirection: 'row',
  },
  containerUser: {
    justifyContent: 'flex-end',
  },
  containerAi: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    minWidth: 64,
    paddingHorizontal: 13,
    paddingTop: 9,
    paddingBottom: 6,
    borderRadius: 16,
    // Subtle elevation for natural WhatsApp-like card depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  bubbleUser: {
    backgroundColor: colors.brandBlue[600],
    borderBottomRightRadius: 4,
  },
  bubbleAi: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1,
  },
  messageTextUser: {
    color: '#FFFFFF',
  },
  messageTextAi: {
    color: colors.textPrimary,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
    fontWeight: '500',
  },
  timestampUser: {
    color: '#BFDBFE',
  },
  timestampAi: {
    color: '#94A3B8',
  },
  articleCard: {
    marginTop: 10,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    padding: 10,
  },
  articleIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#E0F2FE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  articleInfo: {
    flex: 1,
  },
  articleBadge: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.brandBlue[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  articleTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 16,
  },
  crisisCard: {
    marginTop: 10,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
    padding: 10,
  },
  crisisIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  crisisInfo: {
    flex: 1,
  },
  crisisTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 2,
  },
  crisisSubtitle: {
    fontSize: 11,
    color: '#7F1D1D',
    lineHeight: 15,
  },
});
