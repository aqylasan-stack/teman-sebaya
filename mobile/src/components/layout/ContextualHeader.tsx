import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useApp } from '../../state/AppContext';

export interface ContextualHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showCrisisButton?: boolean;
  rightAction?: React.ReactNode;
  avatarSource?: ImageSourcePropType;
  variant?: 'default' | 'blue';
}

export const ContextualHeader: React.FC<ContextualHeaderProps> = ({
  title,
  subtitle,
  onBack,
  showCrisisButton = false,
  rightAction,
  avatarSource,
  variant = 'default',
}) => {
  const { goBack, openCrisisModal } = useApp();
  const isBlue = variant === 'blue';

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <View style={[styles.header, isBlue && styles.headerBlue]}>
      {/* Back button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleBack}
        style={[styles.backButton, isBlue && styles.backButtonBlue]}
        accessibilityRole="button"
        accessibilityLabel="Kembali"
      >
        <ArrowLeft
          size={20}
          color={isBlue ? colors.brandBlue[600] : colors.textPrimary}
          strokeWidth={2.4}
        />
      </TouchableOpacity>

      {/* Avatar (if provided) */}
      {avatarSource && (
        <View style={[styles.avatarContainer, isBlue && styles.avatarContainerBlue]}>
          <Image source={avatarSource} style={styles.avatarImage} resizeMode="cover" />
        </View>
      )}

      {/* Title & subtitle */}
      <View style={styles.titleContainer}>
        <Text
          style={[styles.title, isBlue && styles.titleBlue]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {subtitle && (
          <Text
            style={[styles.subtitle, isBlue && styles.subtitleBlue]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right Action or Crisis Pill */}
      <View style={styles.rightActionContainer}>
        {showCrisisButton ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={openCrisisModal}
            style={styles.crisisPill}
          >
            <AlertTriangle size={14} color={colors.crisis.dangerText} />
            <Text style={styles.crisisText}>Darurat</Text>
          </TouchableOpacity>
        ) : (
          rightAction || <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    height: spacing.layout.headerHeight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  avatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.brandBlue[50],
    borderWidth: 1.5,
    borderColor: colors.brandBlue[100],
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 20,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
    marginTop: 1,
  },
  rightActionContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  crisisPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.crisis.dangerBg,
    borderWidth: 1,
    borderColor: colors.crisis.dangerBorder,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  crisisText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.crisis.dangerText,
  },
  placeholder: {
    width: 36,
  },
  headerBlue: {
    backgroundColor: colors.brandBlue[600],
    borderBottomWidth: 1,
    borderBottomColor: colors.brandBlue[700],
  },
  backButtonBlue: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  avatarContainerBlue: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  titleBlue: {
    color: '#FFFFFF',
  },
  subtitleBlue: {
    color: 'rgba(255, 255, 255, 0.88)',
  },
});

