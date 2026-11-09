import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, spacing } from '../../theme';

export const GlobalHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      {/* Brand logo & title */}
      <View style={styles.brandContainer}>
        <Image
          source={require('../../../assets/branding/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>TEMAN SEBAYA</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  logoImage: {
    width: 32,
    height: 32,
  },
  brandTitle: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.brandBlue[600],
  },
});
