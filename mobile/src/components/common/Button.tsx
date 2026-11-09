import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { colors, borderRadius, spacing } from '../../theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getContainerStyle = (): ViewStyle => {
    let base: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius.md,
      gap: spacing.sm,
    };

    // Size
    if (size === 'sm') {
      base = { ...base, paddingVertical: 8, paddingHorizontal: 12 };
    } else if (size === 'lg') {
      base = { ...base, paddingVertical: 14, paddingHorizontal: 20 };
    } else {
      base = { ...base, paddingVertical: 12, paddingHorizontal: 16 };
    }

    // Variant
    switch (variant) {
      case 'primary':
        base = {
          ...base,
          backgroundColor: disabled ? colors.borderMedium : colors.brandBlue[600],
        };
        break;
      case 'secondary':
        base = {
          ...base,
          backgroundColor: colors.brandBlue[50],
          borderWidth: 1,
          borderColor: colors.brandBlue[200],
        };
        break;
      case 'outline':
        base = {
          ...base,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.borderMedium,
        };
        break;
      case 'danger':
        base = {
          ...base,
          backgroundColor: colors.crisis.dangerBg,
          borderWidth: 1,
          borderColor: colors.crisis.dangerBorder,
        };
        break;
      case 'ghost':
        base = {
          ...base,
          backgroundColor: 'transparent',
        };
        break;
    }

    if (fullWidth) {
      base = { ...base, width: '100%' };
    }

    return base;
  };

  const getTextStyle = (): TextStyle => {
    let base: TextStyle = {
      fontSize: size === 'sm' ? 12 : size === 'lg' ? 14 : 13,
      fontWeight: '600',
    };

    switch (variant) {
      case 'primary':
        base = { ...base, color: colors.surface };
        break;
      case 'secondary':
        base = { ...base, color: colors.brandBlue[700] };
        break;
      case 'outline':
        base = { ...base, color: colors.textPrimary };
        break;
      case 'danger':
        base = { ...base, color: colors.crisis.dangerText };
        break;
      case 'ghost':
        base = { ...base, color: colors.brandBlue[600] };
        break;
    }

    return base;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), style]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? colors.surface : colors.brandBlue[600]}
        />
      ) : (
        <>
          {iconLeft && <View>{iconLeft}</View>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
          {iconRight && <View>{iconRight}</View>}
        </>
      )}
    </TouchableOpacity>
  );
};

