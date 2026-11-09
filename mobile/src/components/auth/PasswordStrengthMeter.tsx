import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Check, Circle } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';

interface PasswordStrengthMeterProps {
  passwordValue: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  passwordValue,
}) => {
  const isEmpty = !passwordValue || passwordValue.length === 0;
  const hasMinLength = passwordValue.length >= 8;
  const hasMixedCase = /[a-z]/.test(passwordValue) && /[A-Z]/.test(passwordValue);
  const hasNumberOrSymbol = /[0-9!@#$%^&*(),.?":{}|<>]/.test(passwordValue);

  // Calculate score (0 to 3)
  let score = 0;
  if (!isEmpty) {
    if (hasMinLength) score += 1;
    if (hasMixedCase) score += 1;
    if (hasNumberOrSymbol) score += 1;
  }

  const getBarColor = (barIndex: number) => {
    if (isEmpty || barIndex >= score) {
      return colors.surfaceAlt; // Slate 100 neutral inactive
    }
    if (score === 1) return colors.crisis.dangerText; // Red/orange for weak
    if (score === 2) return colors.accentAmber[500]; // Amber for medium
    return colors.brandGreen[500]; // Green for strong
  };

  const getStrengthLabel = () => {
    if (isEmpty) return 'Masukkan kata sandi baru';
    if (score === 1) return 'Kata sandi lemah';
    if (score === 2) return 'Kata sandi sedang';
    return 'Kata sandi kuat';
  };

  return (
    <View style={styles.container}>
      {/* 3 Horizontal Indicator Bars */}
      <View style={styles.barsRow}>
        <View style={[styles.bar, { backgroundColor: getBarColor(0) }]} />
        <View style={[styles.bar, { backgroundColor: getBarColor(1) }]} />
        <View style={[styles.bar, { backgroundColor: getBarColor(2) }]} />
      </View>

      <Text style={styles.statusLabel}>{getStrengthLabel()}</Text>

      {/* Dynamic Rule Criteria List */}
      <View style={styles.criteriaList}>
        <View style={styles.criteriaItem}>
          {hasMinLength ? (
            <Check size={14} color={colors.brandGreen[600]} />
          ) : (
            <Circle size={10} color={colors.borderMedium} />
          )}
          <Text
            style={[
              styles.criteriaText,
              hasMinLength && styles.criteriaTextMet,
            ]}
          >
            Minimal 8 karakter
          </Text>
        </View>

        <View style={styles.criteriaItem}>
          {hasNumberOrSymbol && (hasMixedCase || /[a-zA-Z]/.test(passwordValue)) ? (
            <Check size={14} color={colors.brandGreen[600]} />
          ) : (
            <Circle size={10} color={colors.borderMedium} />
          )}
          <Text
            style={[
              styles.criteriaText,
              hasNumberOrSymbol && styles.criteriaTextMet,
            ]}
          >
            Kombinasi huruf besar & angka
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
  },
  barsRow: {
    flexDirection: 'row',
    gap: 6,
    height: 4,
    marginBottom: 6,
  },
  bar: {
    flex: 1,
    height: '100%',
    borderRadius: borderRadius.full,
  },
  statusLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  criteriaList: {
    gap: 4,
  },
  criteriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  criteriaText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  criteriaTextMet: {
    color: colors.brandGreen[700],
    fontWeight: '500',
  },
});

