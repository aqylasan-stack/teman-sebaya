import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Send } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';

interface ChatInputBarProps {
  onSendMessage: (text: string) => void;
  disabled?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim() || disabled) return;
    onSendMessage(inputText);
    setInputText('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Tulis ceritamu di sini..."
          placeholderTextColor={colors.textPlaceholder}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxLength={500}
          editable={!disabled}
        />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleSend}
          disabled={!inputText.trim() || disabled}
          style={[
            styles.sendButton,
            inputText.trim() ? styles.sendActive : styles.sendDisabled,
          ]}
        >
          <Send
            size={16}
            color={inputText.trim() ? colors.surface : colors.textPlaceholder}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.disclaimerText}>
        Jika dalam kondisi bahaya, ketuk tombol Darurat di atas atau hubungi 119.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    maxHeight: 80,
    minHeight: 38,
    paddingHorizontal: spacing.xs,
    paddingVertical: 4,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  sendActive: {
    backgroundColor: colors.brandBlue[600],
  },
  sendDisabled: {
    backgroundColor: colors.borderLight,
  },
  disclaimerText: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});

