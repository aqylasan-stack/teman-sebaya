import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { colors, borderRadius, spacing, shadows } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  variant?: 'surface' | 'tintBlue' | 'tintGreen' | 'tintAmber' | 'tintViolet' | 'crisis';
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  variant = 'surface',
}) => {
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'tintBlue':
        return {
          backgroundColor: colors.brandBlue[50],
          borderColor: colors.brandBlue[200],
        };
      case 'tintGreen':
        return {
          backgroundColor: colors.feedback.successBg,
          borderColor: colors.feedback.successBorder,
        };
      case 'tintAmber':
        return {
          backgroundColor: colors.accentAmber[50],
          borderColor: colors.accentAmber[100],
        };
      case 'tintViolet':
        return {
          backgroundColor: colors.accentViolet[50],
          borderColor: colors.accentViolet[100],
        };
      case 'crisis':
        return {
          backgroundColor: colors.crisis.dangerBg,
          borderColor: colors.crisis.dangerBorder,
        };
      case 'surface':
      default:
        return {
          backgroundColor: colors.surface,
          borderColor: colors.borderLight,
        };
    }
  };

  const combinedStyle = [
    styles.card,
    getVariantStyle(),
    shadows.card,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={combinedStyle}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={combinedStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
});

