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
  const topBarBg = (style as any)?.backgroundColor;

  return (
    <View style={[styles.container, { backgroundColor: colors.canvas }]}>
      {/* Fixed Contextual Header (if provided by detail/sub-screens) */}
      {header && (
        <View
          style={{
            paddingTop: insets.top,
            backgroundColor: topBarBg || colors.surface,
          }}
        >
          {header}
        </View>
      )}

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
          {/* Top Overscroll Bounce Filler (Seamlessly matches Hero Header background) */}
          {topBarBg && (
            <View
              style={{
                position: 'absolute',
                top: -1000,
                left: 0,
                right: 0,
                height: 1000,
                backgroundColor: topBarBg,
              }}
            />
          )}
          {children}
        </ScrollView>
      ) : (
        <View
          style={[
            styles.nonScrollContent,
            !header && { paddingTop: insets.top },
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
    flexGrow: 1,
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
