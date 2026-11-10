import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  Plus,
  Flame,
  Heart,
  Sparkles,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Smile,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { MoodWeeklyChart } from '../../components/mood/MoodWeeklyChart';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';

// 4 Emosi kanonikal terstandarisasi: Bahagia, Sedih, Marah, Biasa Saja
const QUICK_EMOTIONS: {
  name: PrimaryEmotion;
  label: string;
  image: any;
  color: string;
  bgColor: string;
  borderColor: string;
}[] = [
  {
    name: 'Bahagia',
    label: 'Bahagia',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  {
    name: 'Sedih',
    label: 'Sedih',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  {
    name: 'Marah',
    label: 'Marah',
    image: require('../../../assets/emojis/emoji_marah.png'),
    color: '#EF4444',
    bgColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  {
    name: 'Biasa Saja',
    label: 'Biasa Saja',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    color: '#B4916C',
    bgColor: '#FAF5EE',
    borderColor: '#E8DCCE',
  },
];

const getEmotionMeta = (emotion: string) => {
  switch (emotion) {
    case 'Bahagia':
      return {
        label: 'Bahagia',
        color: '#F59E0B',
        bgColor: '#FFFBEB',
        borderColor: '#FDE68A',
        badgeBg: '#FEF3C7',
        badgeText: '#92400E',
        image: require('../../../assets/emojis/emoji_bahagia.png'),
      };
    case 'Sedih':
      return {
        label: 'Sedih',
        color: '#3B82F6',
        bgColor: '#EFF6FF',
        borderColor: '#BFDBFE',
        badgeBg: '#DBEAFE',
        badgeText: '#1E40AF',
        image: require('../../../assets/emojis/emoji_sedih.png'),
      };
    case 'Marah':
      return {
        label: 'Marah',
        color: '#EF4444',
        bgColor: '#FEF2F2',
        borderColor: '#FECACA',
        badgeBg: '#FEE2E2',
        badgeText: '#991B1B',
        image: require('../../../assets/emojis/emoji_marah.png'),
      };
    case 'Biasa Saja':
    case 'Tenang':
    default:
      return {
        label: 'Biasa Saja',
        color: '#B4916C',
        bgColor: '#FAF5EE',
        borderColor: '#E8DCCE',
        badgeBg: '#F5EDE4',
        badgeText: '#705030',
        image: require('../../../assets/emojis/emoji_biasa.png'),
      };
  }
};

export const MoodScreen: React.FC = () => {
  const {
    moodEntries,
    weeklyStats,
    user,
    navigateTo,
    todayMood,
    dailyMoodStatus,
  } = useApp();

  const isCheckedInToday = dailyMoodStatus === 'completed' && Boolean(todayMood);
  const todayMeta = todayMood ? getEmotionMeta(todayMood.primaryEmotion) : null;

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      {/* Header Banner */}
      <View style={styles.header}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.title}>Teman Mood</Text>
          <Text style={styles.subtitle}>
            Kenali perasaanmu, satu hari dalam satu waktu.
          </Text>
        </View>

        {isCheckedInToday ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.completedPillBtn}
            onPress={() => navigateTo('daily_mood_checkin')}
          >
            <CheckCircle2 size={13} color={colors.brandGreen[700]} />
            <Text style={styles.completedPillText}>Tercatat</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.recordPillBtn}
            onPress={() => navigateTo('daily_mood_checkin')}
          >
            <Plus size={15} color="#FFFFFF" />
            <Text style={styles.recordPillBtnText}>Catat Mood</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Daily Check-in Quick Action Hero */}
      {!isCheckedInToday ? (
        <View style={styles.checkinPromptCard}>
          <View style={styles.promptHeader}>
            <View style={styles.promptSparkleWrap}>
              <Sparkles size={15} color={colors.brandBlue[600]} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.promptTitle}>
                Halo {user?.name ? user.name.split(' ')[0] : 'Teman'}, apa kabarmu hari ini?
              </Text>
              <Text style={styles.promptSubtitle}>
                Ketuk salah satu suasana hati untuk mulai check-in:
              </Text>
            </View>
          </View>

          {/* Quick 4 Emoji Taps */}
          <View style={styles.quickEmotionsRow}>
            {QUICK_EMOTIONS.map((item) => (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.75}
                style={[
                  styles.quickEmotionCard,
                  {
                    backgroundColor: item.bgColor,
                    borderColor: item.borderColor,
                  },
                ]}
                onPress={() =>
                  navigateTo('daily_mood_checkin', {
                    selectedEmotion: item.name,
                    initialStage: 2,
                  })
                }
              >
                <Image
                  source={item.image}
                  style={styles.quickEmotionImage}
                  resizeMode="contain"
                />
                <Text style={[styles.quickEmotionLabel, { color: item.color }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ) : todayMeta && todayMood ? (
        <View
          style={[
            styles.todaySummaryCard,
            {
              backgroundColor: todayMeta.bgColor,
              borderColor: todayMeta.borderColor,
            },
          ]}
        >
          <View style={styles.todaySummaryLeft}>
            <Image
              source={todayMeta.image}
              style={styles.todaySummaryEmoji}
              resizeMode="contain"
            />
            <View style={styles.todaySummaryInfo}>
              <View style={styles.todaySummaryTitleRow}>
                <Text style={styles.todaySummaryTitle}>Mood Hari Ini</Text>
                <View
                  style={[
                    styles.todayBadge,
                    { backgroundColor: todayMeta.badgeBg },
                  ]}
                >
                  <Text
                    style={[
                      styles.todayBadgeText,
                      { color: todayMeta.badgeText },
                    ]}
                  >
                    {todayMeta.label}
                  </Text>
                </View>
              </View>
              <Text style={styles.todaySummaryTime}>
                Tercatat pukul {todayMood.timeString}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.todayViewLink}
            onPress={() => navigateTo('daily_mood_checkin')}
          >
            <Text style={styles.todayViewLinkText}>Detail</Text>
            <ChevronRight size={13} color={colors.brandBlue[600]} />
          </TouchableOpacity>
        </View>
      ) : null}

      {/* Streak & Metric Summary Cards */}
      <View style={styles.statsRow}>
        <View style={[styles.metricCard, styles.streakMetricCard]}>
          <View style={styles.metricHeaderRow}>
            <View style={styles.streakIconWrap}>
              <Flame size={16} color="#D97706" />
            </View>
            <View style={styles.streakTag}>
              <Text style={styles.streakTagText}>🔥 Aktif</Text>
            </View>
          </View>
          <Text style={styles.metricValue}>
            {user?.activeStreakDays || 14} Hari
          </Text>
          <Text style={styles.metricLabel}>Runtun Check-in</Text>
        </View>

        <View style={[styles.metricCard, styles.reflectionsMetricCard]}>
          <View style={styles.metricHeaderRow}>
            <View style={styles.reflectionsIconWrap}>
              <Heart size={16} color={colors.brandBlue[600]} />
            </View>
            <View style={styles.reflectionsTag}>
              <Text style={styles.reflectionsTagText}>💙 Tersimpan</Text>
            </View>
          </View>
          <Text style={styles.metricValue}>{moodEntries.length} Catatan</Text>
          <Text style={styles.metricLabel}>Refleksi Diri</Text>
        </View>
      </View>

      {/* Weekly Emotional Distribution Chart */}
      <View style={styles.chartWrapper}>
        <MoodWeeklyChart stats={weeklyStats} />
      </View>

      {/* Recent Entries Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Riwayat Refleksi</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{moodEntries.length}</Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.seeStatsWrap}
          onPress={() => navigateTo('mood_stats')}
        >
          <Text style={styles.seeStatsLink}>Lihat Analisis Lengkap</Text>
          <ArrowRight size={12} color={colors.brandBlue[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.entriesList}>
        {moodEntries.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <Smile size={32} color={colors.textMuted} />
            <Text style={styles.emptyStateTitle}>Belum ada catatan refleksi</Text>
            <Text style={styles.emptyStateSubtitle}>
              Mulai kenali perasaanmu hari ini dengan melakukan check-in singkat.
            </Text>
          </View>
        ) : (
          moodEntries.map((entry) => {
            const meta = getEmotionMeta(entry.primaryEmotion);

            return (
              <View
                key={entry.id}
                style={[
                  styles.entryCard,
                  { borderLeftColor: meta.color, borderLeftWidth: 4 },
                ]}
              >
                {/* Entry Header: Emoji, Emotion Badge & Timestamp */}
                <View style={styles.entryHeader}>
                  <View style={styles.entryHeaderLeft}>
                    <Image
                      source={meta.image}
                      style={styles.entryEmoji}
                      resizeMode="contain"
                    />
                    <View
                      style={[
                        styles.entryEmotionBadge,
                        {
                          backgroundColor: meta.badgeBg,
                          borderColor: meta.borderColor,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.entryEmotionBadgeText,
                          { color: meta.badgeText },
                        ]}
                      >
                        {meta.label}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.entryDate}>
                    {entry.dateString} · {entry.timeString}
                  </Text>
                </View>

                {/* Sub-emotions row */}
                {entry.secondaryEmotions.length > 0 && (
                  <View style={styles.subTagsRow}>
                    {entry.secondaryEmotions.map((sub, idx) => (
                      <View key={idx} style={styles.subTag}>
                        <Text style={styles.subTagText}>{sub}</Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Reflection Note */}
                {Boolean(entry.note && entry.note.trim()) && (
                  <View style={styles.noteQuoteContainer}>
                    <Text style={styles.entryNote}>{entry.note}</Text>
                  </View>
                )}

                {/* Context Hashtags */}
                {entry.contextTags.length > 0 && (
                  <View style={styles.contextTagsRow}>
                    {entry.contextTags.map((ctx, idx) => (
                      <View key={idx} style={styles.contextTagPill}>
                        <Text style={styles.contextTagText}>#{ctx}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        )}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  headerTextWrap: {
    flex: 1,
    paddingRight: 10,
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 16,
  },
  recordPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.brandBlue[600],
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recordPillBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  completedPillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.brandGreen[50],
    borderColor: colors.brandGreen[100],
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
  },
  completedPillText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.brandGreen[700],
  },
  checkinPromptCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: spacing.sm,
  },
  promptSparkleWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  promptTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  promptSubtitle: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  quickEmotionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  quickEmotionCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  quickEmotionImage: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  quickEmotionLabel: {
    fontSize: 11,
    fontWeight: '700',
  },
  todaySummaryCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  todaySummaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  todaySummaryEmoji: {
    width: 34,
    height: 34,
  },
  todaySummaryInfo: {
    flex: 1,
  },
  todaySummaryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  todaySummaryTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  todayBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
  },
  todayBadgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  todaySummaryTime: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  todayViewLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  todayViewLinkText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  metricCard: {
    flex: 1,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
  },
  streakMetricCard: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  reflectionsMetricCard: {
    backgroundColor: '#EFF6FF',
    borderColor: '#BFDBFE',
  },
  metricHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakTag: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  streakTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#92400E',
  },
  reflectionsIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reflectionsTag: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  reflectionsTagText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.brandBlue[700],
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  metricLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 2,
  },
  chartWrapper: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  countBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: borderRadius.full,
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  seeStatsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  seeStatsLink: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  entriesList: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  entryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  entryEmoji: {
    width: 24,
    height: 24,
  },
  entryEmotionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  entryEmotionBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  entryDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  subTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 8,
  },
  subTag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  subTagText: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  noteQuoteContainer: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: borderRadius.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.borderMedium,
    marginBottom: 8,
  },
  entryNote: {
    ...typography.bodyRegular,
    color: colors.textPrimary,
    lineHeight: 18,
    fontSize: 12.5,
  },
  contextTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  contextTagPill: {
    backgroundColor: colors.brandBlue[50],
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  contextTagText: {
    fontSize: 10.5,
    color: colors.brandBlue[700],
    fontWeight: '600',
  },
  emptyStateCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  emptyStateSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 240,
  },
});
