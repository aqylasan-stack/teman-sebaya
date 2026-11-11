import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bell } from 'lucide-react-native';
import { colors, spacing } from '../../theme';
import { useApp } from '../../state/AppContext';

/**
 * Integrated Personal Header for Beranda
 * Dynamic time-based greeting, dynamic user nickname, notification button, and profile avatar.
 */
export const HomeHeader: React.FC = () => {
  const { user, switchTab, navigateTo } = useApp();

  // Dynamic time-based greeting
  const getGreetingWord = (): string => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat pagi';
    if (hour >= 11 && hour < 15) return 'Selamat siang';
    if (hour >= 15 && hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const displayName =
    user?.nickname ||
    (user?.name ? user.name.split(' ')[0] : null) ||
    (user?.pseudonym ? user.pseudonym.split(' ')[0] : 'Sobat');

  const greetingTitle = `${getGreetingWord()}, ${displayName}!`;
  const greetingSubtitle = 'Apa kabar kamu hari ini?';

  // Inisial avatar selalu sinkron dengan nama yang ditampilkan kepada pengguna
  const avatarInitials = React.useMemo(() => {
    const nameToUse =
      user?.nickname ||
      user?.pseudonym ||
      user?.name ||
      (displayName && displayName !== 'Sobat' ? displayName : '');

    if (nameToUse && nameToUse.trim()) {
      const parts = nameToUse.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0][0].toUpperCase();
    }
    if (user?.avatarInitials && user.avatarInitials !== 'G') {
      return user.avatarInitials.toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 1).toUpperCase();
    }
    return 'TS';
  }, [user, displayName]);

  return (
    <View style={styles.header}>
      {/* Left: Dynamic Time-based Greeting & Subtitle */}
      <View style={styles.greetingCol}>
        <Text style={styles.greetingTitle} numberOfLines={1}>
          {greetingTitle}
        </Text>
        <Text style={styles.greetingSubtitle} numberOfLines={1}>
          {greetingSubtitle}
        </Text>
      </View>

      {/* Right: Actions (Notification Bell & Profile Avatar) */}
      <View style={styles.actionsRow}>
        {/* Notification Icon */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigateTo('notification_settings')}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Buka Notifikasi"
        >
          <Bell size={18} color="#334155" />
          <View style={styles.notificationDot} />
        </TouchableOpacity>

        {/* Profile Avatar */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => switchTab('profil')}
          style={styles.avatarButton}
          accessibilityRole="button"
          accessibilityLabel="Buka Profil Pengguna"
        >
          {user?.avatarUrl ? (
            <Image
              source={{ uri: user.avatarUrl }}
              style={styles.avatarImg}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.avatarText}>{avatarInitials}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    height: 64,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  greetingCol: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 12,
  },
  greetingTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  greetingSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#2563EB',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  avatarButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#2563EB',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

