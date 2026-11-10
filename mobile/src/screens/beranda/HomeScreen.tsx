import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import {
  MessageCircle,
  Smile,
  BookOpen,
  Gamepad2,
  Users,
  Compass,
  Calendar,
  ChevronRight,
  Sparkles,
  ArrowRight,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { MoodCard } from '../../components/mood/MoodCard';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../state/AppContext';

export const HomeScreen: React.FC = () => {
  const { user, switchTab, navigateTo, openCrisisModal, bookings, articles } = useApp();

  const nextBooking = bookings.length > 0 ? bookings[0] : null;

  // 6 Fitur Utama persis sesuai Tabel Page 15 BRIEF TEMAN SEBAYA
  const featureShortcuts = [
    {
      id: 'mood',
      title: 'Teman Mood',
      label: 'Kenali Emosimu',
      subtitle: 'Catat perasaanmu setiap hari',
      icon: Smile,
      color: colors.brandGreen[600],
      bgColor: colors.brandGreen[50],
      action: () => switchTab('mood'),
    },
    {
      id: 'cerita',
      title: 'Teman Cerita',
      label: 'Ruang Ceritamu',
      subtitle: 'Temukan layanan pendampingan',
      icon: MessageCircle,
      color: colors.brandBlue[600],
      bgColor: colors.brandBlue[50],
      action: () => switchTab('cerita'),
    },
    {
      id: 'belajar',
      title: 'Teman Belajar',
      label: 'Tambah Wawasan',
      subtitle: 'Pelajari hal baru tentang dirimu',
      icon: BookOpen,
      color: colors.accentAmber[600],
      bgColor: colors.accentAmber[50],
      action: () => switchTab('belajar'),
    },
    {
      id: 'bermain',
      title: 'Teman Bermain',
      label: 'Belajar Sambil Main',
      subtitle: 'Jelajahi permainan edukatif',
      icon: Gamepad2,
      color: colors.accentViolet[600],
      bgColor: colors.accentViolet[50],
      action: () => navigateTo('teman_bermain'),
    },
    {
      id: 'supportif',
      title: 'Teman Supportif',
      label: 'Temukan Komunitas',
      subtitle: 'Kenali komunitas positif',
      icon: Users,
      color: colors.accentPeach[600],
      bgColor: colors.accentPeach[50],
      action: () => navigateTo('teman_supportif'),
    },
    {
      id: 'akses',
      title: 'Teman Akses',
      label: 'Teman Digitalmu',
      subtitle: 'Mulai percakapan dengan AI',
      icon: Sparkles,
      color: colors.brandBlue[600],
      bgColor: colors.brandBlue[50],
      action: () => navigateTo('teman_akses'),
    },
  ];

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      {/* Greeting Banner (Screen B01 BRIEF TEMAN SEBAYA) */}
      <View style={styles.greetingSection}>
        <Text style={styles.greetingTitle}>
          Halo, {user?.nickname || (user?.name ? user.name.split(' ')[0] : 'Sobat Sebaya')}!
        </Text>
        <Text style={styles.greetingSubtitle}>
          Apa kabar kamu hari ini?
        </Text>
      </View>

      {/* Daily Mood Check-in Card */}
      <MoodCard />

      {/* Psychological Testing Banner aligned with Teman Bermain */}
      <Card
        onPress={() => navigateTo('teman_bermain')}
        style={styles.testBannerCard}
      >
        <Image
          source={require('../../../assets/tests/personality_cover.jpg')}
          style={styles.testBannerImage}
          resizeMode="cover"
        />
        <View style={styles.testBannerContent}>
          <View style={styles.testBannerBadgeRow}>
            <Badge label="Teman Bermain" variant="blue" />
            <Text style={styles.testDurationText}>4 Menit</Text>
          </View>
          <Text style={styles.testBannerTitle}>Butterfly Effect</Text>
          <Text style={styles.testBannerDesc}>
            Setiap pilihan memiliki cerita. Lihat bagaimana keputusan kecil dapat membawa hasil yang berbeda.
          </Text>
        </View>
      </Card>

      {/* Feature Grid Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Eksplorasi Teman Sebaya</Text>
        <Text style={styles.sectionMeta}>6 Modul Pendampingan</Text>
      </View>

      {/* 6 Feature Shortcuts Grid */}
      <View style={styles.grid}>
        {featureShortcuts.map((feat) => {
          const Icon = feat.icon;
          return (
            <TouchableOpacity
              key={feat.id}
              activeOpacity={0.7}
              onPress={feat.action}
              style={styles.gridItem}
            >
              <View style={[styles.gridIconWrap, { backgroundColor: feat.bgColor }]}>
                <Icon size={22} color={feat.color} />
              </View>
              <Text style={styles.gridItemTitle}>{feat.title}</Text>
              <Text style={styles.gridItemLabel}>{feat.label}</Text>
              <Text style={styles.gridItemSub} numberOfLines={2}>
                {feat.subtitle}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Upcoming Session Card (Section 5 BRIEF TEMAN SEBAYA) */}
      <View style={styles.upcomingSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Jadwal Ceritamu Berikutnya</Text>
          {nextBooking ? (
            <Badge label="Terkonfirmasi" variant="green" />
          ) : (
            <Text style={styles.emptySessionText}>Belum ada sesi terjadwal</Text>
          )}
        </View>
        {nextBooking ? (
          <Card variant="tintBlue" style={styles.bookingCard}>
            <View style={styles.bookingHeader}>
              <View style={styles.bookingIcon}>
                <Calendar size={18} color={colors.brandBlue[600]} />
              </View>
              <View style={styles.bookingDetails}>
                <Text style={styles.bookingCounselor}>{nextBooking.counselorName}</Text>
                <Text style={styles.bookingRole}>{nextBooking.counselorRole}</Text>
              </View>
            </View>
            <View style={styles.bookingTimeRow}>
              <Text style={styles.bookingTime}>
                {nextBooking.date} · {nextBooking.timeSlot}
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => switchTab('cerita')}
                style={styles.roomButton}
              >
                <Text style={styles.roomButtonText}>Lihat Jadwal</Text>
                <ChevronRight size={14} color={colors.surface} />
              </TouchableOpacity>
            </View>
          </Card>
        ) : null}
      </View>

      {/* Recommended Content Section (Section 4 BRIEF TEMAN SEBAYA) */}
      <View style={styles.recommendedSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pilihan untuk Kamu</Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => switchTab('belajar')}
          >
            <Text style={styles.seeAllText}>Lihat Semua</Text>
          </TouchableOpacity>
        </View>

        {articles.slice(0, 2).map((art) => (
          <Card
            key={art.id}
            onPress={() => navigateTo('article_detail', { articleId: art.id })}
            style={styles.articleCard}
          >
            <View style={styles.articleHeader}>
              <Badge label={art.category} variant="blue" />
              <Text style={styles.readingTime}>{art.readingMinutes} mnt baca</Text>
            </View>
            <Text style={styles.articleTitle}>{art.title}</Text>
            <Text style={styles.articleSummary} numberOfLines={2}>
              {art.summary}
            </Text>
          </Card>
        ))}
      </View>

      {/* Community Event Banner with Real Photo */}
      <Card
        onPress={() => navigateTo('community_events')}
        style={styles.communityBanner}
      >
        <Image
          source={require('../../../assets/community/genre_workshop.jpg')}
          style={styles.communityBannerImage}
          resizeMode="cover"
        />
        <View style={styles.bannerRow}>
          <View style={styles.bannerIcon}>
            <Sparkles size={20} color={colors.accentAmber[600]} />
          </View>
          <View style={styles.bannerInfo}>
            <Text style={styles.bannerTitle}>Kabar Komunitas Teman Supportif</Text>
            <Text style={styles.bannerDesc}>
              Workshop Regulasi Emosi Forum GenRe Karawang (15 Nov 2026).
            </Text>
          </View>
          <ChevronRight size={18} color={colors.accentAmber[600]} />
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  greetingSection: {
    marginVertical: spacing.md,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  greetingSubtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionMeta: {
    ...typography.caption,
    color: colors.textMuted,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48.5%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  gridIconWrap: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  gridItemTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  gridItemLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.brandBlue[600],
    marginBottom: 2,
  },
  gridItemSub: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
  },
  upcomingSection: {
    marginTop: spacing.xs,
  },
  emptySessionText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  bookingCard: {
    padding: spacing.md,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  bookingIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingDetails: {
    flex: 1,
  },
  bookingCounselor: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bookingRole: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  bookingTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.brandBlue[200],
    paddingTop: spacing.xs,
  },
  bookingTime: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.brandBlue[700],
  },
  roomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandBlue[600],
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.md,
    gap: 2,
  },
  roomButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.surface,
  },
  recommendedSection: {
    marginTop: spacing.xs,
  },
  articleCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  readingTime: {
    fontSize: 11,
    color: colors.textMuted,
  },
  articleTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  articleSummary: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  testBannerCard: {
    padding: 0,
    overflow: 'hidden',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  testBannerImage: {
    width: '100%',
    height: 120,
  },
  testBannerContent: {
    padding: spacing.md,
  },
  testBannerBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  testDurationText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  testBannerTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  testBannerDesc: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  communityBanner: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    padding: 0,
    overflow: 'hidden',
  },
  communityBannerImage: {
    width: '100%',
    height: 110,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  bannerIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerInfo: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bannerDesc: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});

