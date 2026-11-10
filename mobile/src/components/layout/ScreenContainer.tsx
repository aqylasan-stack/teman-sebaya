import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing } from '../../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  floatingOverlay?: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  withBottomNav?: boolean;
}

export const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  header,
  floatingOverlay,
  scrollable = true,
  style,
  contentContainerStyle,
  withBottomNav = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      {header}

      {scrollable ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[
            styles.scrollContent,
            withBottomNav && { paddingBottom: 92 + insets.bottom },
            contentContainerStyle,
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.nonScrollContent,
            withBottomNav && { paddingBottom: 92 + insets.bottom },
            contentContainerStyle,
          ]}
        >
          {children}
        </View>
      )}

      {floatingOverlay}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    paddingTop: spacing.layout.screenPaddingTop,
    paddingBottom: spacing.layout.screenPaddingBottom,
  },
  nonScrollContent: {
    flex: 1,
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    paddingTop: spacing.layout.screenPaddingTop,
  },
});
