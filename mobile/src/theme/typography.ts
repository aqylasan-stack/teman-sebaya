import { TextStyle } from 'react-native';
import { colors } from './colors';

export const typography: Record<string, TextStyle> = {
  // Display & Screen titles
  displayHero: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
    color: colors.textPrimary,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 28,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: colors.textPrimary,
  },

  // Cards & Body
  cardHeading: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: colors.textPrimary,
  },
  bodyRegular: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 19,
    color: colors.textSecondary,
  },
  bodyMedium: {
    fontSize: 13,
    fontWeight: '500',
    lineHeight: 19,
    color: colors.textPrimary,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: colors.textSecondary,
  },

  // Controls & Labels
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    color: colors.surface,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: colors.textSecondary,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
    lineHeight: 14,
    color: colors.brandBlue[700],
  },
  caption: {
    fontSize: 10.5,
    fontWeight: '400',
    lineHeight: 15,
    color: colors.textMuted,
  },
};

