import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, Sparkles } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';

interface QuickPromptChipsProps {
  onSelectPrompt: (promptText: string) => void;
}

export const QuickPromptChips: React.FC<QuickPromptChipsProps> = ({
  onSelectPrompt,
}) => {
  // 4 Suggested prompts resmi dari Screen H02 BRIEF TEMAN SEBAYA
  const prompts = [
    'Aku ingin mengenali perasaanku.',
    'Bagaimana cara mengelola emosi?',
    'Aku sedang merasa kewalahan.',
    'Aku ingin belajar tentang kesehatan mental.',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Sparkles size={14} color={colors.brandBlue[600]} />
        <Text style={styles.title}>Pilihan topik untuk memulai:</Text>
      </View>
      <View style={styles.list}>
        {prompts.map((prompt, idx) => (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            onPress={() => onSelectPrompt(prompt)}
            style={styles.card}
          >
            <Text style={styles.promptText}>"{prompt}"</Text>
            <ChevronRight size={16} color={colors.textPlaceholder} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  list: {
    gap: 6,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  promptText: {
    fontSize: 12.5,
    color: colors.textPrimary,
    flex: 1,
  },
});

