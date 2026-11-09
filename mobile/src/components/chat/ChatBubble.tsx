import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bot, User } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ChatMessage } from '../../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <View
      style={[
        styles.row,
        isUser ? styles.rowUser : styles.rowAi,
      ]}
    >
      {!isUser && (
        <View style={styles.avatarBadge}>
          <Bot size={16} color={colors.brandBlue[600]} />
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAi,
        ]}
      >
        {!isUser && (
          <Text style={styles.senderLabel}>{message.senderName}</Text>
        )}
        <Text
          style={[
            styles.messageText,
            isUser ? styles.messageTextUser : styles.messageTextAi,
          ]}
        >
          {message.text}
        </Text>
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
  row: {
    flexDirection: 'row',
    marginVertical: 6,
    maxWidth: '88%',
  },
  rowUser: {
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  },
  rowAi: {
    alignSelf: 'flex-start',
    alignItems: 'flex-end',
    gap: spacing.xs,
  },
  avatarBadge: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    borderWidth: 1,
    borderColor: colors.brandBlue[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  bubble: {
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  bubbleUser: {
    backgroundColor: colors.textPrimary, // Charcoal / Dark Slate per PRD & master screen
    borderBottomRightRadius: 4,
  },
  bubbleAi: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderBottomLeftRadius: 4,
  },
  senderLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[600],
    marginBottom: 2,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 19,
  },
  messageTextUser: {
    color: colors.surface,
  },
  messageTextAi: {
    color: colors.textPrimary,
  },
  timestamp: {
    fontSize: 9.5,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  timestampUser: {
    color: colors.borderMedium,
  },
  timestampAi: {
    color: colors.textMuted,
  },
});

