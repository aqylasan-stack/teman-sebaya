import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, AlertTriangle } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useApp } from '../../state/AppContext';

interface ContextualHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  showCrisisButton?: boolean;
  rightAction?: React.ReactNode;
}

export const ContextualHeader: React.FC<ContextualHeaderProps> = ({
  title,
  subtitle,
  onBack,
  showCrisisButton = false,
  rightAction,
}) => {
  const { goBack, openCrisisModal } = useApp();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  return (
    <View style={styles.header}>
      {/* Back button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleBack}
        style={styles.backButton}
      >
        <ArrowLeft size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      {/* Title & subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
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
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textMuted,
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
});

