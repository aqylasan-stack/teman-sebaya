import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {
  User,
  Heart,
  MessageCircle,
  Bookmark,
  Bell,
  ShieldCheck,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Flame,
  Award,
  X,
  Lock,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
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

  // Section Group 1: Akun Saya
  const accountMenuItems = [
    {
      id: 'edit_profile',
      title: 'Edit Profil',
      subtitle: 'Nama samaran, info sekolah PIK-R, dan minat',
      icon: User,
      action: () => navigateTo('edit_profile'),
    },
    {
      id: 'mood_history',
      title: 'Riwayat Teman Mood',
      subtitle: `${user?.moodEntriesCount ?? 0} catatan emosi & refleksi harian`,
      icon: Heart,
      action: () => switchTab('mood'),
    },
    {
      id: 'chat_history',
      title: 'Riwayat Teman Cerita',
      subtitle: 'Sesi obrolan & konseling sebaya terenkripsi',
      icon: MessageCircle,
      action: () => switchTab('cerita'),
    },
    {
      id: 'saved_content',
      title: 'Konten Tersimpan',
      subtitle: `${savedCount} materi & panduan favorit`,
      icon: Bookmark,
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
      action: () => navigateTo('privacy_settings'),
    },
    {
      id: 'privacy_security',
      title: 'Privasi dan Keamanan',
      subtitle: 'Mode anonim penuh & kontrol data emosi AI',
      icon: ShieldCheck,
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
      action: () => openCrisisModal(),
    },
    {
      id: 'about_teman_sebaya',
      title: 'Tentang TEMAN SEBAYA',
      subtitle: 'Platform kesehatan mental & PIK-R Remaja',
      icon: Info,
      action: () => setIsAboutModalOpen(true),
    },
  ];

  // Render a grouped settings section with unified styling and thin dividers
  const renderMenuGroup = (
    sectionTitle: string,
    items: Array<{
      id: string;
      title: string;
      subtitle: string;
      icon: any;
      action: () => void;
      isDanger?: boolean;
    }>
  ) => {
    return (
      <View style={styles.menuGroup}>
        {/* Section Heading — Pola styling seragam untuk seluruh kategori */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>{sectionTitle}</Text>
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
                {/* Icon Container — Seragam menggunakan Brand Blue Surface */}
                <View
                  style={[
                    styles.menuIconContainer,
                    isDanger && styles.menuDangerIconContainer,
                  ]}
                >
                  <Icon
                    size={18}
                    color={isDanger ? colors.crisis.dangerText : colors.brandBlue[600]}
                    strokeWidth={2.0}
                  />
                </View>

                {/* Text Labels: Judul (Text Primary), Deskripsi (Text Secondary) */}
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

                {/* Trailing Chevron */}
                <ChevronRight
                  size={18}
                  color={isDanger ? colors.crisis.dangerText : colors.textPlaceholder}
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
      {/* 1. CENTERED PROFILE HEADER (Baby Blue #B8DDF5)                 */}
      {/* ============================================================== */}
      <View style={styles.headerArea}>
        {/* Centered Identity Layout: Foto -> Nama -> Sekolah/Komunitas */}
        <View style={styles.centeredIdentityContainer}>
          {/* Avatar Utama Proporsional */}
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

          {/* Nama Pengguna */}
          <Text style={styles.profileName} numberOfLines={1}>
            {displayName}
          </Text>

          {/* Informasi Sekolah / Komunitas */}
          <Text style={styles.profileRole} numberOfLines={1}>
            {roleOrSchool}
          </Text>
        </View>

        {/* ============================================================== */}
        {/* 2. STATISTIK PROFIL: Satu kelompok horizontal seimbang          */}
        {/* ============================================================== */}
        <View style={styles.statsBar}>
          {/* 1. Hari Beruntun */}
          <View style={styles.statItem}>
            <View style={styles.statValueRow}>
              <Flame size={15} color={colors.brandBlue[600]} strokeWidth={2.2} />
              <Text style={styles.statNumber}>
                {user?.activeStreakDays ?? 1}
              </Text>
            </View>
            <Text style={styles.statLabel}>Hari Beruntun</Text>
          </View>

          <View style={styles.statDivider} />

          {/* 2. Total Refleksi */}
          <View style={styles.statItem}>
            <View style={styles.statValueRow}>
              <Heart size={15} color={colors.brandBlue[600]} strokeWidth={2.2} />
              <Text style={styles.statNumber}>
                {user?.moodEntriesCount ?? 0}
              </Text>
            </View>
            <Text style={styles.statLabel}>Total Refleksi</Text>
          </View>

          <View style={styles.statDivider} />

          {/* 3. Tantangan */}
          <View style={styles.statItem}>
            <View style={styles.statValueRow}>
              <Award size={15} color={colors.brandBlue[600]} strokeWidth={2.2} />
              <Text style={styles.statNumber}>
                {user?.challengesCompleted ?? 5}
              </Text>
            </View>
            <Text style={styles.statLabel}>Tantangan</Text>
          </View>
        </View>
      </View>

      {/* ============================================================== */}
      {/* 3. WHITE SHEET CONTENT (Grouped Settings Navigation)           */}
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
            subtitle: 'Sesi akun ini akan ditutup dengan aman',
            icon: LogOut,
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
      {/* 4. MODAL: TENTANG TEMAN SEBAYA                                 */}
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
  /* PROFILE HEADER STYLES (CENTERED VERTICAL LAYOUT)               */
  /* ============================================================== */
  headerArea: {
    backgroundColor: colors.babyBlue,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 12 : 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  centeredIdentityContainer: {
    alignItems: 'center',
    width: '100%',
  },
  avatarCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarImg: {
    width: '100%',
    height: '100%',
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: -0.2,
    marginTop: 10,
    textAlign: 'center',
  },
  profileRole: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 3,
    textAlign: 'center',
  },

  /* ============================================================== */
  /* STATS BAR (BALANCED HORIZONTAL GROUP)                          */
  /* ============================================================== */
  statsBar: {
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginTop: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 26,
    backgroundColor: colors.borderLight,
  },

  /* ============================================================== */
  /* WHITE SHEET CONTENT STYLES                                     */
  /* ============================================================== */
  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -10,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    minHeight: 520,
  },
  menuGroup: {
    marginBottom: 16,
  },
  sectionHeaderRow: {
    paddingVertical: 6,
    paddingHorizontal: 2,
    marginBottom: 2,
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  groupItemsContainer: {
    paddingHorizontal: 2,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  menuIconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuDangerIconContainer: {
    backgroundColor: colors.crisis.dangerBg,
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
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
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
    marginTop: 6,
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
