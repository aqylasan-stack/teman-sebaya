import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  const insets = useSafeAreaInsets();

  const handleSend = () => {
    if (!inputText.trim() || disabled) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const hasText = inputText.trim().length > 0;

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 8 : 8) },
      ]}
    >
      <View style={styles.inputRow}>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.textInput}
            placeholder="Tulis ceritamu di sini..."
            placeholderTextColor="#94A3B8"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
            editable={!disabled}
            textAlignVertical="center"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSend}
          disabled={!hasText || disabled}
          hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          style={[
            styles.sendButton,
            hasText && !disabled ? styles.sendActive : styles.sendDisabled,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Kirim Pesan"
        >
          <Send
            size={18}
            color={hasText && !disabled ? '#FFFFFF' : '#94A3B8'}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.disclaimerText}>
        Jika dalam kondisi krisis atau bahaya darurat, segera hubungi 119.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    minHeight: 40,
    maxHeight: 100,
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 14,
    color: '#0F172A',
    paddingVertical: 0,
    paddingHorizontal: 0,
    margin: 0,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  sendDisabled: {
    backgroundColor: '#F1F5F9',
  },
  disclaimerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 15,
  },
});
