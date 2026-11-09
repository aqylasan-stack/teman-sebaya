import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Smile, Frown, Flame, Meh, Shield, Moon, CloudRain } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { PrimaryEmotion } from '../../types';

interface MoodSelectorProps {
  selectedEmotion?: PrimaryEmotion | null;
  onSelect: (emotion: PrimaryEmotion) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({
  selectedEmotion,
  onSelect,
}) => {
  // 4 Primary emotions directly specified in Screen C02 of BRIEF TEMAN SEBAYA
  const primaryFourEmotions: {
    name: PrimaryEmotion;
    copy: string;
    icon: any;
    color: string;
    bgColor: string;
    borderColor: string;
  }[] = [
    {
      name: 'Bahagia',
      copy: 'Aku sedang merasa bahagia',
      icon: Smile,
      color: colors.accentAmber[600],
      bgColor: colors.accentAmber[50],
      borderColor: colors.accentAmber[500],
    },
    {
      name: 'Sedih',
      copy: 'Aku sedang merasa sedih',
      icon: Frown,
      color: colors.brandBlue[600],
      bgColor: colors.brandBlue[50],
      borderColor: colors.brandBlue[500],
    },
    {
      name: 'Marah',
      copy: 'Aku sedang merasa marah',
      icon: Flame,
      color: colors.crisis.dangerText,
      bgColor: colors.crisis.dangerBg,
      borderColor: colors.crisis.dangerBorder,
    },
    {
      name: 'Biasa Saja',
      copy: 'Aku merasa biasa saja',
      icon: Meh,
      color: colors.textSecondary,
      bgColor: colors.surfaceAlt,
      borderColor: colors.borderMedium,
    },
  ];

  return (
    <View style={styles.grid}>
      {primaryFourEmotions.map((item) => {
        const isSelected = selectedEmotion === item.name;
        const Icon = item.icon;

        return (
          <TouchableOpacity
            key={item.name}
            activeOpacity={0.7}
            onPress={() => onSelect(item.name)}
            style={[
              styles.card,
              {
                backgroundColor: isSelected ? item.bgColor : colors.surface,
                borderColor: isSelected ? item.borderColor : colors.borderLight,
                borderWidth: isSelected ? 2 : 1,
              },
            ]}
          >
            <View
              style={[
                styles.iconBadge,
                {
                  backgroundColor: isSelected ? colors.surface : item.bgColor,
                },
              ]}
            >
              <Icon size={28} color={item.color} />
            </View>
            <Text
              style={[
                styles.label,
                isSelected && { color: item.color, fontWeight: '700' },
              ]}
            >
              {item.name}
            </Text>
            <Text style={styles.copyText} numberOfLines={2}>
              "{item.copy}"
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    justifyContent: 'space-between',
  },
  card: {
    width: '47.5%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  copyText: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 14,
  },
});

