import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  ShieldCheck,
  User,
  Lock,
  Bell,
  HelpCircle,
  FileText,
  Info,
  LogOut,
  ChevronRight,
  Flame,
  Heart,
  Award,
  Bookmark,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const ProfileScreen: React.FC = () => {
  const { user, navigateTo, switchTab, articles, openLogoutDialog, openCrisisModal } = useApp();

  const savedCount = articles.filter((a) => a.isSaved).length;

  const menuItems = [
    {
      id: 'saved_articles',
      title: 'Bacaan Tersimpan (Bookmark)',
      subtitle: `${savedCount} artikel tersimpan untuk dibaca nanti`,
      icon: Bookmark,
      action: () => switchTab('belajar', { initialTab: 'saved' }),
    },
    {
      id: 'edit_profile',
      title: 'Detail Profil Pengguna',
      subtitle: 'Nama samaran, info sekolah PIK-R, minat konseling',
      icon: User,
      action: () => navigateTo('edit_profile'),
    },
    {
      id: 'privacy',
      title: 'Akun & Privasi Data',
      subtitle: 'Mode anonim, izin riwayat emosi untuk AI',
      icon: Lock,
      action: () => navigateTo('privacy_settings'),
    },
    {
      id: 'help',
      title: 'Pusat Bantuan & Hotline Krisis',
      subtitle: 'Kontak darurat SEJIWA 119 Ext 8 dan panduan',
      icon: HelpCircle,
      action: () => openCrisisModal(),
    },
    {
      id: 'ethics',
      title: 'Kebijakan Privasi & Etika AI',
      subtitle: 'Komitmen non-penghakiman dan perlindungan data',
      icon: ShieldCheck,
      action: () => navigateTo('privacy_settings'),
    },
  ];

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      <View style={styles.container}>
        {/* User Identity Card */}
        <Card style={styles.userCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user?.avatarInitials || 'AS'}</Text>
          </View>

          <Text style={styles.userName}>{user?.pseudonym || 'Anya Sebaya (Anonim)'}</Text>
          <Text style={styles.userEmail}>
            {user?.email} · {user?.schoolOrOrg || 'SMAN 1 Karawang'}
          </Text>

          {/* Encryption Badge */}
          <View style={styles.encryptionBadge}>
            <ShieldCheck size={14} color={colors.brandGreen[600]} />
            <Text style={styles.encryptionText}>Data Terenkripsi & Anonim Terjaga</Text>
          </View>
        </Card>

        {/* Activity Streak Stats Card */}
        <Card style={styles.statsCard}>
          <View style={styles.statCol}>
            <Flame size={18} color={colors.accentPeach[500]} />
            <Text style={styles.statVal}>{user?.activeStreakDays || 14} Hari</Text>
            <Text style={styles.statLbl}>Runtun Aktif</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statCol}>
            <Heart size={18} color={colors.brandBlue[600]} />
            <Text style={styles.statVal}>{user?.moodEntriesCount || 12}</Text>
            <Text style={styles.statLbl}>Refleksi Mood</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.statCol}>
            <Award size={18} color={colors.brandGreen[600]} />
            <Text style={styles.statVal}>{user?.challengesCompleted || 5}</Text>
            <Text style={styles.statLbl}>Tantangan</Text>
          </View>
        </Card>

        {/* Settings Menu List */}
        <View style={styles.menuList}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={item.action}
                style={styles.menuItem}
              >
                <View style={styles.menuIconWrap}>
                  <Icon size={18} color={colors.textPrimary} />
                </View>
                <View style={styles.menuTextWrap}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSub}>{item.subtitle}</Text>
                </View>
                <ChevronRight size={18} color={colors.textPlaceholder} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* App Version Info */}
        <View style={styles.versionWrap}>
          <Text style={styles.versionText}>Teman Sebaya v1.0.0 (Build 2026.11)</Text>
          <Text style={styles.versionSub}>Ruang Aman Konseling & Literasi Emosi Remaja</Text>
        </View>

        {/* Logout Button */}
        <Button
          title="Keluar dari Akun"
          variant="danger"
          fullWidth
          iconLeft={<LogOut size={16} color={colors.crisis.dangerText} />}
          onPress={openLogoutDialog}
          style={styles.logoutBtn}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    gap: spacing.layout.cardGap,
    paddingBottom: spacing.lg,
  },
  userCard: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    borderWidth: 2,
    borderColor: colors.brandBlue[200],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  userEmail: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  encryptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandGreen[50],
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: borderRadius.full,
    gap: 6,
    marginTop: spacing.md,
  },
  encryptionText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandGreen[700],
  },
  statsCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statCol: {
    alignItems: 'center',
    flex: 1,
  },
  statVal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
  },
  statLbl: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: colors.borderLight,
  },
  menuList: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
    gap: spacing.md,
  },
  menuIconWrap: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextWrap: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  versionWrap: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  versionText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  versionSub: {
    fontSize: 10,
    color: colors.textPlaceholder,
    marginTop: 2,
  },
  logoutBtn: {
    marginTop: spacing.xs,
  },
});

