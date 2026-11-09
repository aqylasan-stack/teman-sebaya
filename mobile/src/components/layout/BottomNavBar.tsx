import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Home, Smile, MessageCircle, BookOpen, User } from 'lucide-react-native';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { TabType } from '../../types';
import { useApp } from '../../state/AppContext';

export const BottomNavBar: React.FC = () => {
  const { currentTab, switchTab } = useApp();
  const insets = useSafeAreaInsets();

  const tabs: { key: TabType; label: string; icon: any }[] = [
    { key: 'beranda', label: 'Beranda', icon: Home },
    { key: 'mood', label: 'Mood', icon: Smile },
    { key: 'cerita', label: 'Cerita', icon: MessageCircle },
    { key: 'belajar', label: 'Belajar', icon: BookOpen },
    { key: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <View
      style={[
        styles.navContainer,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      <View style={styles.navRow}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.key;
          const IconComponent = tab.icon;

          return (
            <TouchableOpacity
              key={tab.key}
              activeOpacity={0.7}
              onPress={() => switchTab(tab.key)}
              style={styles.tabButton}
            >
              <View
                style={[
                  styles.iconWrapper,
                  isActive && styles.activeIconWrapper,
                ]}
              >
                <IconComponent
                  size={20}
                  color={isActive ? colors.surface : colors.textMuted}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.activeTabLabel,
                ]}
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
  navContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingTop: spacing.xs,
    ...shadows.navBar,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    flex: 1,
  },
  iconWrapper: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  activeIconWrapper: {
    backgroundColor: colors.brandBlue[600],
  },
  tabLabel: {
    fontSize: 10.5,
    fontWeight: '500',
    color: colors.textMuted,
  },
  activeTabLabel: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },
});

