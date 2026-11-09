import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { colors, borderRadius, spacing } from '../../theme';

interface BadgeProps {
  label: string;
  variant?: 'blue' | 'green' | 'amber' | 'violet' | 'gray' | 'danger';
  active?: boolean;
  onPress?: () => void;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'blue',
  active = false,
  onPress,
  icon,
  style,
}) => {
  const getBadgeStyle = (): { container: ViewStyle; text: TextStyle } => {
    if (active) {
      return {
        container: {
          backgroundColor: colors.brandBlue[600],
          borderColor: colors.brandBlue[600],
        },
        text: {
          color: colors.surface,
          fontWeight: '600',
        },
      };
    }

    switch (variant) {
      case 'green':
        return {
          container: {
            backgroundColor: colors.brandGreen[50],
            borderColor: colors.brandGreen[100],
          },
          text: {
            color: colors.brandGreen[600],
            fontWeight: '500',
          },
        };
      case 'amber':
        return {
          container: {
            backgroundColor: colors.accentAmber[50],
            borderColor: colors.accentAmber[100],
          },
          text: {
            color: colors.accentAmber[600],
            fontWeight: '500',
          },
        };
      case 'violet':
        return {
          container: {
            backgroundColor: colors.accentViolet[50],
            borderColor: colors.accentViolet[100],
          },
          text: {
            color: colors.accentViolet[600],
            fontWeight: '500',
          },
        };
      case 'danger':
        return {
          container: {
            backgroundColor: colors.crisis.dangerBg,
            borderColor: colors.crisis.dangerBorder,
          },
          text: {
            color: colors.crisis.dangerText,
            fontWeight: '600',
          },
        };
      case 'gray':
        return {
          container: {
            backgroundColor: colors.surfaceAlt,
            borderColor: colors.borderLight,
          },
          text: {
            color: colors.textSecondary,
            fontWeight: '400',
          },
        };
      case 'blue':
      default:
        return {
          container: {
            backgroundColor: colors.brandBlue[50],
            borderColor: colors.brandBlue[200],
          },
          text: {
            color: colors.brandBlue[700],
            fontWeight: '500',
          },
        };
    }
  };

  const currentStyles = getBadgeStyle();

  if (onPress) {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.badge, currentStyles.container, style]}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <Text style={[styles.text, currentStyles.text]}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.badge, currentStyles.container, style]}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.text, currentStyles.text]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    marginRight: 4,
  },
  text: {
    fontSize: 11,
    lineHeight: 14,
  },
});

