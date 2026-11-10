import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { Home, Smile, MessageCircle, BookOpen, User } from 'lucide-react-native';
import { colors, borderRadius } from '../../theme';
import { TabType } from '../../types';
import { useApp } from '../../state/AppContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Refined Layout Constants for Spacious, Airy & Natural Proportions
const TOP_OFFSET = 30; // Generous headroom above navbar for elevated active circle
const CIRCLE_RADIUS = 20; // 40px diameter (sleek, perfectly proportionate)
const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
const NOTCH_RADIUS = 38; // 76px horizontal span (18px breathing room on each side)
const NOTCH_DEPTH = 24; // Smooth, relaxed concave dip depth
const CORNER_RADIUS = 18; // Elegant rounded top corners
const BAR_BASE_HEIGHT = 68; // Ample vertical body height for labels & breathing room
const NAV_H_PADDING = 14; // Inset from screen edges to avoid bezel crowding

/**
 * Builds the smooth SVG path for the navbar top edge with an integrated concave notch.
 * Provides generous breathing room (8-18px clearance) around the active circle,
 * and seamlessly adapts corner curves when near the outer edges.
 */
function buildNavbarSvgPath(
  width: number,
  totalHeight: number,
  cx: number
): string {
  const clampedCx = Math.max(NOTCH_RADIUS * 0.8, Math.min(width - NOTCH_RADIUS * 0.8, cx));
  const notchStart = clampedCx - NOTCH_RADIUS;
  const notchEnd = clampedCx + NOTCH_RADIUS;

  // Adaptive corner radii to avoid overlapping notch near edges
  const leftCornerR = Math.max(0, Math.min(CORNER_RADIUS, notchStart));
  const rightCornerR = Math.max(0, Math.min(CORNER_RADIUS, width - notchEnd));

  let d = `M 0 ${totalHeight} `;

  // 1. Left vertical edge up
  d += `L 0 ${TOP_OFFSET + leftCornerR} `;

  // 2. Top-left rounded corner
  if (leftCornerR > 0) {
    d += `Q 0 ${TOP_OFFSET} ${leftCornerR.toFixed(1)} ${TOP_OFFSET} `;
  }

  // 3. Flat top edge to start of notch
  if (notchStart > leftCornerR) {
    d += `L ${notchStart.toFixed(1)} ${TOP_OFFSET} `;
  }

  // 4. Concave notch left shoulder down to bottom center (relaxed, wide curve)
  const cp1x = notchStart + 18;
  const cp2x = clampedCx - 16;
  const notchBottomY = TOP_OFFSET + NOTCH_DEPTH;
  d += `C ${cp1x.toFixed(1)} ${TOP_OFFSET}, ${cp2x.toFixed(1)} ${notchBottomY}, ${clampedCx.toFixed(1)} ${notchBottomY} `;

  // 5. Concave notch bottom center up to right shoulder
  const cp3x = clampedCx + 16;
  const cp4x = notchEnd - 18;
  d += `C ${cp3x.toFixed(1)} ${notchBottomY}, ${cp4x.toFixed(1)} ${TOP_OFFSET}, ${notchEnd.toFixed(1)} ${TOP_OFFSET} `;

  // 6. Flat top edge to top-right corner
  const rightEdgeX = width - rightCornerR;
  if (rightEdgeX > notchEnd) {
    d += `L ${rightEdgeX.toFixed(1)} ${TOP_OFFSET} `;
  }

  // 7. Top-right rounded corner
  if (rightCornerR > 0) {
    d += `Q ${width} ${TOP_OFFSET} ${width} ${(TOP_OFFSET + rightCornerR).toFixed(1)} `;
  }

  // 8. Right vertical edge down
  d += `L ${width} ${totalHeight} `;

  // 9. Close path
  d += 'Z';

  return d;
}

export const BottomNavBar: React.FC = () => {
  const { currentTab, switchTab } = useApp();
  const insets = useSafeAreaInsets();
  const [layoutWidth, setLayoutWidth] = useState(SCREEN_WIDTH);

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: 'beranda', label: 'Beranda', icon: Home },
    { key: 'mood', label: 'Mood', icon: Smile },
    { key: 'cerita', label: 'Cerita', icon: MessageCircle },
    { key: 'belajar', label: 'Belajar', icon: BookOpen },
    { key: 'profil', label: 'Profil', icon: User },
  ];

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.key === currentTab)
  );

  const innerWidth = layoutWidth - 2 * NAV_H_PADDING;
  const tabWidth = innerWidth / tabs.length;
  const initialCenterX = NAV_H_PADDING + (activeIndex + 0.5) * tabWidth;

  // Animated position for smooth gliding
  const animX = useRef(new Animated.Value(initialCenterX)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [svgNotchX, setSvgNotchX] = useState(initialCenterX);

  // Synchronize SVG notch path dynamically with the animation
  useEffect(() => {
    const listenerId = animX.addListener(({ value }) => {
      setSvgNotchX(value);
    });
    return () => {
      animX.removeListener(listenerId);
    };
  }, [animX]);

  // Trigger animation when active tab or layout width changes
  useEffect(() => {
    const targetCenterX = NAV_H_PADDING + (activeIndex + 0.5) * tabWidth;

    scaleAnim.setValue(0.85);
    Animated.parallel([
      Animated.spring(animX, {
        toValue: targetCenterX,
        useNativeDriver: false,
        bounciness: 4,
        speed: 12,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: false,
        bounciness: 5,
        speed: 14,
      }),
    ]).start();
  }, [activeIndex, tabWidth, layoutWidth]);

  const bottomInset = Math.max(insets.bottom, 10);
  const totalNavHeight = TOP_OFFSET + BAR_BASE_HEIGHT + bottomInset;
  const svgPath = buildNavbarSvgPath(layoutWidth, totalNavHeight, svgNotchX);

  const ActiveIcon = tabs[activeIndex]?.icon || Home;

  return (
    <View
      style={[styles.container, { height: totalNavHeight }]}
      pointerEvents="box-none"
      onLayout={(e) => {
        const w = e.nativeEvent.layout.width;
        if (w > 0 && Math.abs(w - layoutWidth) > 1) {
          setLayoutWidth(w);
        }
      }}
    >
      {/* Background SVG with Concave Notch and Rounded Corners */}
      <View style={styles.svgWrapper} pointerEvents="none">
        <Svg width={layoutWidth} height={totalNavHeight}>
          <Path
            d={svgPath}
            fill={colors.surface}
            stroke="rgba(226, 232, 240, 0.85)"
            strokeWidth={1}
          />
        </Svg>
      </View>

      {/* Floating Elevated Active Circle */}
      <Animated.View
        pointerEvents="box-none"
        style={[
          styles.floatingCircleWrapper,
          {
            transform: [
              {
                translateX: animX.interpolate({
                  inputRange: [0, 1000],
                  outputRange: [-CIRCLE_RADIUS, 1000 - CIRCLE_RADIUS],
                }),
              },
              { scale: scaleAnim },
            ],
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => switchTab(tabs[activeIndex].key)}
          style={styles.floatingCircle}
        >
          <ActiveIcon size={19} color="#FFFFFF" strokeWidth={2.3} />
        </TouchableOpacity>
      </Animated.View>

      {/* Tab Items Row with Horizontal Inset */}
      <View
        style={[
          styles.tabRow,
          {
            top: TOP_OFFSET,
            left: NAV_H_PADDING,
            right: NAV_H_PADDING,
            paddingBottom: bottomInset,
          },
        ]}
      >
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const IconComponent = tab.icon;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.75}
              onPress={() => switchTab(tab.key)}
              style={styles.tabButton}
            >
              {/* If active, reserve vertical space so label aligns with inactive items */}
              {isActive ? (
                <View style={styles.activeIconSpacer} />
              ) : (
                <View style={styles.inactiveIconWrapper}>
                  <IconComponent
                    size={19}
                    color={colors.textMuted}
                    strokeWidth={1.9}
                  />
                </View>
              )}

              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.activeTabLabel,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#0F172A',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  svgWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingCircleWrapper: {
    position: 'absolute',
    top: 6, // 24px above navbar top edge (60% elevated in the open air)
    left: 0,
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCircle: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[600],
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: colors.brandBlue[600],
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.32,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  tabRow: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  activeIconSpacer: {
    height: 34, // Matches inactive icon area + clearance so label aligns perfectly
  },
  inactiveIconWrapper: {
    height: 26,
    paddingTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
  },
  activeTabLabel: {
    color: colors.brandBlue[600],
    fontWeight: '600',
    textAlign: 'center',
  },
});
