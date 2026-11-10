import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { MoodDayStat } from '../../types';

interface MoodWeeklyChartProps {
  stats: MoodDayStat[];
  dominantEmotion?: string;
  showDistribution?: boolean;
}

interface EmotionTheme {
  label: string;
  color: string;
  softBg: string;
  borderColor: string;
  textColor: string;
  image: any;
  prompt: string;
}

const EMOTION_THEMES: Record<string, EmotionTheme> = {
  Bahagia: {
    label: 'Bahagia',
    color: '#EAB308',
    softBg: '#FFFDF0',
    borderColor: '#FEF08A',
    textColor: '#854D0E',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    prompt: 'Hari yang penuh energi positif dan kehangatan.',
  },
  Sedih: {
    label: 'Sedih',
    color: '#2563EB',
    softBg: '#EFF6FF',
    borderColor: '#BFDBFE',
    textColor: '#1E40AF',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    prompt: 'Wajar merasa lelah, beri dirimu ruang untuk istirahat sejenak.',
  },
  Marah: {
    label: 'Marah',
    color: '#DC2626',
    softBg: '#FEF2F2',
    borderColor: '#FECACA',
    textColor: '#991B1B',
    image: require('../../../assets/emojis/emoji_marah.png'),
    prompt: 'Tarik napas panjang dan berikan jeda untuk menenangkan pikiran.',
  },
  'Biasa Saja': {
    label: 'Biasa Saja',
    color: '#8C6E54',
    softBg: '#FAF5EE',
    borderColor: '#E8DCCE',
    textColor: '#705030',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    prompt: 'Hari yang stabil, tenang, dan mengalir apa adanya.',
  },
  Tenang: {
    label: 'Biasa Saja',
    color: '#8C6E54',
    softBg: '#FAF5EE',
    borderColor: '#E8DCCE',
    textColor: '#705030',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    prompt: 'Hari yang stabil, tenang, dan mengalir apa adanya.',
  },
};

const DEFAULT_THEME: EmotionTheme = EMOTION_THEMES['Biasa Saja'];

const DAY_FULL_NAMES: Record<string, string> = {
  Sen: 'Senin',
  Sel: 'Selasa',
  Rab: 'Rabu',
  Kam: 'Kamis',
  Jum: 'Jumat',
  Sab: 'Sabtu',
  Min: 'Minggu',
};

export const MoodWeeklyChart: React.FC<MoodWeeklyChartProps> = ({
  stats,
}) => {
  const daysShort = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const todayDayName = daysShort[new Date().getDay()];
  const now = new Date();
  const todayDateNum = String(now.getDate()).padStart(2, '0');

  // Cari indeks hari ini secara dinamis agar default selected state selalu sinkron ke hari ini
  const findDefaultIndex = (statsList: MoodDayStat[]): number => {
    if (!statsList || statsList.length === 0) return 0;

    // 1. Prioritaskan kecocokan tanggal (misal dateString memiliki "10 Nov" atau diawali "10")
    const dateIdx = statsList.findIndex(
      (s) =>
        s.dateString &&
        (s.dateString.includes(`${todayDateNum} `) ||
          s.dateString.startsWith(todayDateNum))
    );
    if (dateIdx !== -1) return dateIdx;

    // 2. Kecocokan nama hari ("Sel")
    const dayIdx = statsList.findIndex((s) => s.dayName === todayDayName);
    if (dayIdx !== -1) return dayIdx;

    // 3. Fallback: hari terakhir yang memiliki catatan aktual
    const lastRecorded = statsList
      .map((s, idx) => (s.primaryEmotion ? idx : -1))
      .filter((idx) => idx !== -1)
      .pop();
    if (lastRecorded !== undefined) return lastRecorded;

    return statsList.length - 1;
  };

  const [selectedIndex, setSelectedIndex] = useState<number>(() =>
    findDefaultIndex(stats)
  );

  // Jika stats diperbarui dan indeks di luar jangkauan, sinkronkan ke hari ini
  React.useEffect(() => {
    if (selectedIndex >= stats.length) {
      setSelectedIndex(findDefaultIndex(stats));
    }
  }, [stats]);

  // Filter hari yang memiliki catatan aktual
  const recordedStats = stats.filter((s) => Boolean(s.primaryEmotion));
  const totalRecordedDays = recordedStats.length;

  // Hitung jumlah hari aktual per emosi
  const emotionDaysCount: Record<string, number> = {
    Bahagia: 0,
    'Biasa Saja': 0,
    Sedih: 0,
    Marah: 0,
  };

  recordedStats.forEach((s) => {
    const key =
      s.primaryEmotion === 'Tenang' ? 'Biasa Saja' : s.primaryEmotion || 'Biasa Saja';
    if (emotionDaysCount[key] !== undefined) {
      emotionDaysCount[key] += 1;
    }
  });

  const activeStat = stats[selectedIndex] || stats[0];
  const activeHasRecord = Boolean(activeStat?.primaryEmotion);
  const activeEmotionKey =
    activeStat?.primaryEmotion === 'Tenang'
      ? 'Biasa Saja'
      : activeStat?.primaryEmotion || 'Biasa Saja';
  const activeTheme = activeHasRecord
    ? EMOTION_THEMES[activeEmotionKey] || DEFAULT_THEME
    : null;
  const activeDayFullName = activeStat
    ? DAY_FULL_NAMES[activeStat.dayName] || activeStat.dayName
    : '';

  const isToday =
    activeStat?.dayName === todayDayName ||
    (activeStat?.dateString != null &&
      (activeStat.dateString.includes(`${todayDateNum} `) ||
        activeStat.dateString.startsWith(todayDateNum)));

  return (
    <View style={styles.cardContainer}>
      {/* 1. Header Bagian: Judul */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Ritme Emosi 7 Hari</Text>
          <Text style={styles.subtitle}>Ketuk hari untuk melihat refleksi</Text>
        </View>
      </View>

      {/* 2. 7-Day Emotion Strip (Selected State Berwarna Lembut & Natural, Penanda Khusus Hari Kosong) */}
      <View style={styles.stripContainer}>
        {stats.map((stat, idx) => {
          const hasRecord = Boolean(stat.primaryEmotion);
          const emotionKey =
            stat.primaryEmotion === 'Tenang'
              ? 'Biasa Saja'
              : stat.primaryEmotion;
          const theme = emotionKey ? EMOTION_THEMES[emotionKey] || DEFAULT_THEME : null;
          const isSelected = idx === selectedIndex;

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={() => setSelectedIndex(idx)}
              style={[
                styles.dayColumn,
                isSelected &&
                  (hasRecord && theme
                    ? [
                        styles.dayColumnSelected,
                        {
                          backgroundColor: theme.softBg,
                          borderColor: theme.borderColor,
                        },
                      ]
                    : [
                        styles.dayColumnSelected,
                        {
                          backgroundColor: colors.surfaceAlt,
                          borderColor: colors.borderMedium,
                        },
                      ]),
              ]}
            >
              <Text
                style={[
                  styles.dayLabel,
                  isSelected && styles.dayLabelSelected,
                ]}
              >
                {stat.dayName}
              </Text>

              {/* Emoji jika ada catatan, Penanda Bersih jika belum tercatat */}
              {hasRecord && theme ? (
                <Image
                  source={theme.image}
                  style={[
                    styles.dayEmoji,
                    isSelected && styles.dayEmojiSelected,
                  ]}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={[
                    styles.emptyDayPlaceholder,
                    isSelected && styles.emptyDayPlaceholderSelected,
                  ]}
                >
                  <View
                    style={[
                      styles.emptyDayDot,
                      isSelected && styles.emptyDayDotSelected,
                    ]}
                  />
                </View>
              )}

              {/* Indikator Alami Hari Terpilih */}
              <View
                style={[
                  styles.indicatorDot,
                  isSelected && {
                    backgroundColor:
                      hasRecord && theme ? theme.color : colors.textMuted,
                  },
                ]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 3. Detail Hari Terpilih (Editorial, Tanpa Card Bersarang) */}
      {activeStat && (
        activeHasRecord && activeTheme ? (
          <View style={styles.activeDayContent}>
            <View style={styles.activeDayHeader}>
              <Image
                source={activeTheme.image}
                style={styles.activeDayMiniEmoji}
                resizeMode="contain"
              />
              <View style={styles.activeDayHeaderTextWrap}>
                <Text style={styles.activeDayTitle}>
                  {activeDayFullName}
                  {activeStat.dateString ? `, ${activeStat.dateString}` : ''} ·{' '}
                  <Text style={{ color: activeTheme.color, fontWeight: '700' }}>
                    {activeTheme.label}
                  </Text>
                </Text>
                {activeStat.secondaryEmotion && (
                  <Text style={styles.activeSubEmotionText}>
                    Perasaan: {activeStat.secondaryEmotion}
                  </Text>
                )}
              </View>
            </View>

            {activeStat.note && activeStat.note.trim() ? (
              <View style={styles.activeDayStoryWrap}>
                <Text style={styles.activeDayStoryLabel}>Catatan Refleksi:</Text>
                <Text style={styles.activeDayStoryText}>
                  "{activeStat.note}"
                </Text>
              </View>
            ) : isToday ? (
              <View style={styles.activeDayStoryWrap}>
                <Text style={styles.activeDayStoryLabel}>Catatan Refleksi:</Text>
                <Text style={[styles.activeDayStoryText, styles.activeDayStoryEmptyText]}>
                  Tidak ada catatan tertulis untuk hari ini.
                </Text>
              </View>
            ) : (
              <Text style={[styles.activeDayPrompt, { color: activeTheme.textColor }]}>
                {activeTheme.prompt}
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.activeDayContent}>
            <View style={styles.activeDayHeader}>
              <View style={styles.activeDayEmptyIconWrap}>
                <Calendar size={14} color={colors.textMuted} />
              </View>
              <Text style={styles.activeDayEmptyTitle}>
                {activeDayFullName}
                {activeStat.dateString ? `, ${activeStat.dateString}` : ''} ·{' '}
                <Text style={{ color: colors.textMuted, fontWeight: '600' }}>
                  Belum Ada Catatan
                </Text>
              </Text>
            </View>
            <Text style={styles.activeDayEmptyBody}>
              Kamu belum mencatat emosi pada hari ini. Mengambil jeda singkat dan mendengarkan diri selalu terbuka kapan pun kamu siap.
            </Text>
          </View>
        )
      )}

      {/* 4. Distribusi Emosi (Menyatu dalam ritme mingguan) */}
      <View style={styles.distributionSection}>
        <View style={styles.distributionHeader}>
          <Text style={styles.distributionTitle}>Distribusi Emosi</Text>
        </View>

        {/* Segmented Bar Proposional Berdasarkan Kategori Aktual */}
        <View style={styles.segmentedTrack}>
          {totalRecordedDays > 0 ? (
            Object.keys(emotionDaysCount).map((k) => {
              const count = emotionDaysCount[k] || 0;
              if (count === 0) return null;
              const theme = EMOTION_THEMES[k] || DEFAULT_THEME;
              return (
                <View
                  key={k}
                  style={[
                    styles.segmentFill,
                    {
                      flex: count,
                      backgroundColor: theme.color,
                    },
                  ]}
                />
              );
            })
          ) : (
            <View style={[styles.segmentFill, { flex: 1, backgroundColor: colors.surfaceAlt }]} />
          )}
        </View>

        {/* Legenda Ringkas: Jumlah Hari Nyata */}
        <View style={styles.legendRow}>
          {Object.keys(emotionDaysCount).map((k) => {
            const count = emotionDaysCount[k] || 0;
            const theme = EMOTION_THEMES[k] || DEFAULT_THEME;
            return (
              <View key={k} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: theme.color }]} />
                <Text style={styles.legendText}>
                  {theme.label} <Text style={styles.legendCount}>{count} hari</Text>
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    // Soft subtle shadow
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: spacing.layout.cardGap,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  stripContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.xs,
  },
  dayColumn: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  dayColumnSelected: {
    borderWidth: 1.5,
  },
  dayLabel: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.textMuted,
    marginBottom: 6,
  },
  dayLabelSelected: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dayEmoji: {
    width: 28,
    height: 28,
  },
  dayEmojiSelected: {
    width: 30,
    height: 30,
    transform: [{ scale: 1.05 }],
  },
  emptyDayPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  emptyDayPlaceholderSelected: {
    borderColor: colors.textSecondary,
    backgroundColor: colors.surfaceAlt,
  },
  emptyDayDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.borderMedium,
  },
  emptyDayDotSelected: {
    backgroundColor: colors.textSecondary,
  },
  indicatorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'transparent',
    marginTop: 6,
  },

  /* Detail Hari Terpilih (Mengalir di dalam card utama) */
  activeDayContent: {
    paddingVertical: spacing.xs,
    marginTop: spacing.xs,
  },
  activeDayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  activeDayHeaderTextWrap: {
    flex: 1,
  },
  activeDayMiniEmoji: {
    width: 24,
    height: 24,
  },
  activeDayTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  activeSubEmotionText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 1,
  },
  activeDayStoryWrap: {
    marginTop: spacing.sm,
    paddingTop: spacing.xs,
  },
  activeDayStoryLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  activeDayStoryText: {
    fontSize: 12.5,
    lineHeight: 19,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  activeDayStoryEmptyText: {
    fontStyle: 'normal',
    color: colors.textSecondary,
  },
  activeDayPrompt: {
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
  },
  activeDayEmptyIconWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDayEmptyTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  activeDayEmptyBody: {
    fontSize: 12,
    color: colors.textMuted,
    lineHeight: 18,
    marginTop: 4,
  },

  /* Distribusi Emosi */
  distributionSection: {
    paddingTop: spacing.sm,
    marginTop: spacing.xs,
  },
  distributionHeader: {
    marginBottom: 8,
  },
  distributionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  segmentedTrack: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    gap: 2,
    marginBottom: spacing.sm,
  },
  segmentFill: {
    height: '100%',
    borderRadius: 2,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
    marginTop: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    gap: 6,
  },
  legendDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  legendText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  legendCount: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
