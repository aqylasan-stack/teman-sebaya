import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  User,
  Heart,
  MessageCircle,
  Bookmark,
  Bell,
  ShieldCheck,
  Lock,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Flame,
  Award,
  CheckCircle2,
  Pencil,
  X,
  ExternalLink,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const ProfileScreen: React.FC = () => {
  const {
    user,
    navigateTo,
    switchTab,
    articles,
    openLogoutDialog,
    openCrisisModal,
  } = useApp();

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const savedCount = articles.filter((a) => a.isSaved).length;

  const displayName = user?.nickname || user?.name || 'Anya Sebaya';
  const roleOrSchool = user?.schoolOrOrg || 'PIK-R SMAN 1 Karawang';
  const verifiedEmail = user?.email || 'anya.sebaya@teman.id';
  const joinedDate = user?.joinedDate || 'Nov 2026';

  // Section Group 1: Akun Saya
  const accountMenuItems = [
    {
      id: 'edit_profile',
      title: 'Edit Profil',
      subtitle: 'Nama samaran, info sekolah PIK-R, dan minat',
      icon: User,
      iconColor: colors.brandBlue[600],
      iconBg: colors.softBlue,
      action: () => navigateTo('edit_profile'),
    },
    {
      id: 'mood_history',
      title: 'Riwayat Teman Mood',
      subtitle: `${user?.moodEntriesCount || 12} catatan emosi & refleksi harian`,
      icon: Heart,
      iconColor: colors.brandBlue[600],
      iconBg: colors.brandBlue[50],
      action: () => switchTab('mood'),
    },
    {
      id: 'chat_history',
      title: 'Riwayat Teman Cerita',
      subtitle: 'Sesi obrolan & konseling sebaya terenkripsi',
      icon: MessageCircle,
      iconColor: colors.accentViolet[600],
      iconBg: colors.accentViolet[50],
      action: () => switchTab('cerita'),
    },
    {
      id: 'saved_content',
      title: 'Konten Tersimpan',
      subtitle: `${savedCount} materi & panduan favorit`,
      icon: Bookmark,
      iconColor: colors.accentAmber[600],
      iconBg: colors.accentAmber[50],
      action: () => switchTab('belajar', { initialTab: 'saved' }),
    },
  ];

  // Section Group 2: Preferensi
  const preferenceMenuItems = [
    {
      id: 'notification_settings',
      title: 'Pengaturan Notifikasi',
      subtitle: `Pengingat check-in harian ${user?.dailyReminderTime || '20:00 WIB'}`,
      icon: Bell,
      iconColor: colors.accentPeach[600],
      iconBg: colors.accentPeach[50],
      action: () => navigateTo('privacy_settings'),
    },
    {
      id: 'privacy_security',
      title: 'Privasi dan Keamanan',
      subtitle: 'Mode anonim penuh & kontrol data emosi AI',
      icon: ShieldCheck,
      iconColor: colors.brandGreen[600],
      iconBg: colors.brandGreen[50],
      action: () => navigateTo('privacy_settings'),
    },
  ];

  // Section Group 3: Bantuan dan Informasi
  const helpMenuItems = [
    {
      id: 'help_center',
      title: 'Pusat Bantuan',
      subtitle: 'Hotline Krisis SEJIWA 119 & panduan darurat',
      icon: HelpCircle,
      iconColor: colors.brandBlue[600],
      iconBg: colors.brandBlue[50],
      action: () => openCrisisModal(),
    },
    {
      id: 'about_teman_sebaya',
      title: 'Tentang TEMAN SEBAYA',
      subtitle: 'Platform kesehatan mental & PIK-R Remaja',
      icon: Info,
      iconColor: colors.textMuted,
      iconBg: colors.surfaceAlt,
      action: () => setIsAboutModalOpen(true),
    },
  ];

  // Render a grouped settings section with a pill header and divider-separated items
  const renderMenuGroup = (
    sectionTitle: string,
    items: Array<{
      id: string;
      title: string;
      subtitle: string;
      icon: any;
      iconColor: string;
      iconBg: string;
      action: () => void;
      isDanger?: boolean;
    }>
  ) => {
    return (
      <View style={styles.menuGroup}>
        {/* Section Pill Header */}
        <View style={styles.sectionPill}>
          <Text style={styles.sectionPillText}>{sectionTitle}</Text>
        </View>

        {/* Group Items List */}
        <View style={styles.groupItemsContainer}>
          {items.map((item, index) => {
            const Icon = item.icon;
            const isLast = index === items.length - 1;
            const isDanger = item.isDanger;

            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.65}
                onPress={item.action}
                style={[
                  styles.menuRow,
                  !isLast && styles.menuRowBorder,
                ]}
              >
                {/* Icon Container */}
                <View
                  style={[
                    styles.menuIconContainer,
                    { backgroundColor: item.iconBg },
                  ]}
                >
                  <Icon size={18} color={item.iconColor} />
                </View>

                {/* Text Labels */}
                <View style={styles.menuTextCol}>
                  <Text
                    style={[
                      styles.menuTitle,
                      isDanger && styles.menuDangerTitle,
                    ]}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.menuSubtitle,
                      isDanger && styles.menuDangerSubtitle,
                    ]}
                  >
                    {item.subtitle}
                  </Text>
                </View>

                {/* Chevron */}
                <ChevronRight
                  size={18}
                  color={isDanger ? colors.crisis.dangerBorder : colors.borderMedium}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <ScreenContainer
      withBottomNav
      style={styles.screenBg}
      contentContainerStyle={styles.scrollContent}
    >

      {/* ============================================================== */}
      {/* 1. COLORED PROFILE HEADER (Baby Blue #B8DDF5)                  */}
      {/* ============================================================== */}
      <View style={styles.headerArea}>
        {/* User Identity Row */}
        <View style={styles.identityRow}>
          {/* Avatar with White Ring & Quick Edit Badge */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              {!imageError ? (
                <Image
                  source={require('../../../assets/branding/mascot_avatar.png')}
                  style={styles.avatarImg}
                  resizeMode="cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <Text style={styles.avatarInitials}>
                  {user?.avatarInitials || 'AS'}
                </Text>
              )}
            </View>

            {/* Edit Profile Shortcut Badge */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigateTo('edit_profile')}
              style={styles.editAvatarBadge}
              accessibilityLabel="Edit Profil Pengguna"
            >
              <Pencil size={11} color="#FFFFFF" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>

          {/* User Details */}
          <View style={styles.identityTextCol}>
            <Text style={styles.profileName} numberOfLines={1}>
              {displayName}
            </Text>
            <Text style={styles.profileRole} numberOfLines={1}>
              {roleOrSchool}
            </Text>

            {/* Verified Email Badge */}
            <View style={styles.verifiedBadge}>
              <CheckCircle2 size={12} color={colors.brandGreen[600]} />
              <Text style={styles.verifiedText} numberOfLines={1}>
                {verifiedEmail} · Terverifikasi
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Row (Activity & Streaks) */}
        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Flame size={15} color={colors.accentPeach[500]} />
            <Text style={styles.statValue}>
              {user?.activeStreakDays || 14} Hari Runtun
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Heart size={15} color={colors.brandBlue[600]} />
            <Text style={styles.statValue}>
              {user?.moodEntriesCount || 12} Refleksi
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statItem}>
            <Award size={15} color={colors.brandGreen[600]} />
            <Text style={styles.statValue}>
              {user?.challengesCompleted || 5} Tantangan
            </Text>
          </View>
        </View>

        {/* Membership Info */}
        <Text style={styles.joinedText}>Bergabung Sejak, {joinedDate}</Text>

        {/* Security & Privacy Assurance Strip */}
        <View style={styles.securityStrip}>
          <Lock size={12} color={colors.brandBlue[700]} />
          <Text style={styles.securityStripText}>
            Mode Anonim Aktif · Data Terenkripsi Aman
          </Text>
        </View>
      </View>

      {/* ============================================================== */}
      {/* 2. WHITE SHEET CONTENT (Grouped Navigation & Settings)         */}
      {/* ============================================================== */}
      <View style={styles.sheetContainer}>
        {/* Group 1: Akun Saya */}
        {renderMenuGroup('Akun Saya', accountMenuItems)}

        {/* Group 2: Preferensi */}
        {renderMenuGroup('Preferensi', preferenceMenuItems)}

        {/* Group 3: Bantuan dan Informasi */}
        {renderMenuGroup('Bantuan dan Informasi', helpMenuItems)}

        {/* Group 4: Kelola Akun */}
        {renderMenuGroup('Kelola Akun', [
          {
            id: 'logout',
            title: 'Keluar dari Akun',
            subtitle: 'Sesi anonim akan ditutup dengan aman',
            icon: LogOut,
            iconColor: colors.crisis.dangerText,
            iconBg: colors.crisis.dangerBg,
            action: openLogoutDialog,
            isDanger: true,
          },
        ])}

        {/* App Version Info Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.versionTitle}>
            Teman Sebaya v1.0.0 (Build 2026.11)
          </Text>
          <Text style={styles.versionSubtitle}>
            Ruang Aman Konseling & Literasi Remaja Indonesia
          </Text>
        </View>
      </View>

      {/* ============================================================== */}
      {/* 3. MODAL: TENTANG TEMAN SEBAYA                                  */}
      {/* ============================================================== */}
      <Modal visible={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)}>
        <View style={styles.aboutModalContent}>
          {/* Header Close Button */}
          <TouchableOpacity
            style={styles.modalCloseBtn}
            onPress={() => setIsAboutModalOpen(false)}
            accessibilityLabel="Tutup Informasi"
          >
            <X size={20} color={colors.textMuted} />
          </TouchableOpacity>

          {/* App Branding */}
          <View style={styles.aboutHeader}>
            <Image
              source={require('../../../assets/branding/logo.png')}
              style={styles.aboutLogo}
              resizeMode="contain"
            />
            <Text style={styles.aboutAppTitle}>TEMAN SEBAYA</Text>
            <Text style={styles.aboutTagline}>
              Ruang Konseling & Literasi Emosi Remaja
            </Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionBadgeText}>Versi 1.0.0 (Release 2026)</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.aboutBodyText}>
            Teman Sebaya adalah platform kesehatan mental digital yang dirancang
            khusus untuk mendampingi remaja Indonesia. Kami berkolaborasi dengan
            kelompok binaan PIK-R (Pusat Informasi dan Konseling Remaja) dan
            BKKBN untuk menyediakan ruang bercerita yang aman, terenkripsi, serta
            bebas dari penghakiman.
          </Text>

          {/* Commitments Box */}
          <View style={styles.aboutCommitmentsBox}>
            <View style={styles.commitmentRow}>
              <ShieldCheck size={16} color={colors.brandGreen[600]} />
              <Text style={styles.commitmentText}>
                100% Bebas Stigma & Menjaga Kerahasiaan
              </Text>
            </View>
            <View style={styles.commitmentRow}>
              <Lock size={16} color={colors.brandBlue[600]} />
              <Text style={styles.commitmentText}>
                Data Terenkripsi & Mode Anonim Penuh
              </Text>
            </View>
            <View style={styles.commitmentRow}>
              <HelpCircle size={16} color={colors.accentPeach[600]} />
              <Text style={styles.commitmentText}>
                Terintegrasi Hotline Krisis SEJIWA 119 Ext 8
              </Text>
            </View>
          </View>

          {/* Action Button */}
          <Button
            title="Tutup Informasi"
            variant="primary"
            fullWidth
            onPress={() => setIsAboutModalOpen(false)}
            style={styles.modalActionBtn}
          />
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screenBg: {
    backgroundColor: colors.babyBlue,
  },
  scrollContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    backgroundColor: colors.babyBlue,
  },

  /* ============================================================== */
  /* PROFILE HEADER STYLES (BABY BLUE)                              */
  /* ============================================================== */
  headerArea: {
    backgroundColor: colors.babyBlue,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  editAvatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.brandBlue[600],
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  identityTextCol: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  profileRole: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 2,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    marginTop: 6,
    gap: 5,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandGreen[700],
  },
  statsBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.85)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statValue: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statDivider: {
    width: 1,
    height: 18,
    backgroundColor: 'rgba(15, 23, 42, 0.1)',
  },
  joinedText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
  securityStrip: {
    backgroundColor: 'rgba(37, 99, 235, 0.12)',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  securityStripText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandBlue[700],
  },

  /* ============================================================== */
  /* WHITE SHEET CONTENT STYLES                                     */
  /* ============================================================== */
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -16,
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 24,
    minHeight: 520,
  },
  menuGroup: {
    marginBottom: 20,
  },
  sectionPill: {
    backgroundColor: colors.babyBlue,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  sectionPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  groupItemsContainer: {
    paddingHorizontal: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 4,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextCol: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  menuDangerTitle: {
    color: colors.crisis.dangerText,
  },
  menuSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  menuDangerSubtitle: {
    color: colors.crisis.dangerText,
    opacity: 0.75,
  },

  /* ============================================================== */
  /* FOOTER STYLES                                                  */
  /* ============================================================== */
  footerContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    marginTop: 4,
  },
  versionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  versionSubtitle: {
    fontSize: 10,
    color: colors.textPlaceholder,
    marginTop: 2,
  },

  /* ============================================================== */
  /* ABOUT MODAL STYLES                                             */
  /* ============================================================== */
  aboutModalContent: {
    position: 'relative',
    paddingTop: 8,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: -4,
    right: 0,
    padding: 6,
    zIndex: 10,
  },
  aboutHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutLogo: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  aboutAppTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.5,
  },
  aboutTagline: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  versionBadge: {
    backgroundColor: colors.brandBlue[50],
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
    marginTop: 6,
  },
  versionBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brandBlue[700],
  },
  aboutBodyText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  aboutCommitmentsBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: 12,
    gap: 8,
    marginBottom: 18,
  },
  commitmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  commitmentText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  modalActionBtn: {
    marginTop: 4,
  },
});
