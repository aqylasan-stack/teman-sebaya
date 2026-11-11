import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors, spacing } from '../../theme';

export const GlobalHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      {/* Brand logo */}
      <View style={styles.brandContainer}>
        <Image
          source={require('../../../assets/branding/logo_transparent.png')}
          style={styles.logoImage}
          resizeMode="contain"
          accessibilityLabel="Logo Teman Sebaya"
        />
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
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    height: spacing.layout.headerHeight,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 76,
    height: 44,
  },
});
