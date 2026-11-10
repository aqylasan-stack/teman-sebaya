import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Sparkles, TrendingUp, Info } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { MoodDayStat, PrimaryEmotion } from '../../types';

interface MoodWeeklyChartProps {
  stats: MoodDayStat[];
  dominantEmotion?: string;
  showDistribution?: boolean;
}

interface EmotionConfigItem {
  label: string;
  color: string;
  trackColor: string;
  lightBg: string;
  textColor: string;
  borderColor: string;
  image: any;
  prompt: string;
}

const EMOTION_MAP: Record<string, EmotionConfigItem> = {
  Bahagia: {
    label: 'Bahagia',
    color: '#F59E0B', // Amber 500
    trackColor: '#FEF3C7', // Amber 100
    lightBg: '#FFFBEB',
    textColor: '#92400E',
    borderColor: '#FDE68A',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    prompt: 'Penuh energi positif dan kehangatan!',
  },
  Sedih: {
    label: 'Sedih',
    color: '#3B82F6', // Blue 500
    trackColor: '#DBEAFE', // Blue 100
    lightBg: '#EFF6FF',
    textColor: '#1E40AF',
    borderColor: '#BFDBFE',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    prompt: 'Wajar merasa lelah, beri ruang untuk jeda sejenak.',
  },
  Marah: {
    label: 'Marah',
    color: '#EF4444', // Red 500
    trackColor: '#FEE2E2', // Red 100
    lightBg: '#FEF2F2',
    textColor: '#991B1B',
    borderColor: '#FECACA',
    image: require('../../../assets/emojis/emoji_marah.png'),
    prompt: 'Emosi adalah sinyal. Tarik napas dalam dan tenangkan pikiran.',
  },
  'Biasa Saja': {
    label: 'Biasa Saja',
    color: '#B4916C', // Warm Sand / Neutral Latte
    trackColor: '#F5EDE4',
    lightBg: '#FAF5EE',
    textColor: '#705030',
    borderColor: '#E8DCCE',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    prompt: 'Hari yang stabil, tenang, dan mengalir apa adanya.',
  },
  // Backward compatibility alias
  Tenang: {
    label: 'Biasa Saja',
    color: '#B4916C',
    trackColor: '#F5EDE4',
    lightBg: '#FAF5EE',
    textColor: '#705030',
    borderColor: '#E8DCCE',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    prompt: 'Hari yang stabil, tenang, dan mengalir apa adanya.',
  },
};

const DEFAULT_CONFIG: EmotionConfigItem = EMOTION_MAP['Biasa Saja'];

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
  dominantEmotion,
  showDistribution = true,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(
    stats.length > 0 ? stats.length - 1 : 0
  );

  // Dynamic dominant calculation
  const emotionCounts: Record<string, number> = {
    Bahagia: 0,
    'Biasa Saja': 0,
    Sedih: 0,
    Marah: 0,
  };

  stats.forEach((s) => {
    const emotionKey =
      s.primaryEmotion === 'Tenang' ? 'Biasa Saja' : s.primaryEmotion || 'Biasa Saja';
    if (emotionCounts[emotionKey] !== undefined) {
      emotionCounts[emotionKey] += 1;
    }
  });

  const totalDays = stats.length || 7;
  let computedDominant = 'Bahagia';
  let maxCount = -1;
  Object.keys(emotionCounts).forEach((k) => {
    if (emotionCounts[k] > maxCount) {
      maxCount = emotionCounts[k];
      computedDominant = k;
    }
  });

  const computedPercentage = Math.round((maxCount / totalDays) * 100);
  const displayDominantText =
    dominantEmotion || `${computedDominant} (${computedPercentage}%)`;

  const dominantConfig = EMOTION_MAP[computedDominant] || DEFAULT_CONFIG;

  const activeStat = stats[selectedIndex] || stats[0];
  const activeEmotionKey =
    activeStat?.primaryEmotion === 'Tenang'
      ? 'Biasa Saja'
      : activeStat?.primaryEmotion || 'Biasa Saja';
  const activeConfig = EMOTION_MAP[activeEmotionKey] || DEFAULT_CONFIG;
  const activeDayFullName = activeStat ? DAY_FULL_NAMES[activeStat.dayName] || activeStat.dayName : '';

  return (
    <View style={styles.cardContainer}>
      {/* Header with Title and Dominant Pill */}
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>Statistik Emosi 7 Hari</Text>
          <Text style={styles.subtitle}>Ketuk hari untuk melihat refleksi harian</Text>
        </View>
        <View
          style={[
            styles.dominantBadge,
            {
              backgroundColor: dominantConfig.lightBg,
              borderColor: dominantConfig.borderColor,
            },
          ]}
        >
          <Sparkles size={11} color={dominantConfig.textColor} style={{ marginRight: 4 }} />
          <Text style={[styles.dominantText, { color: dominantConfig.textColor }]}>
            Dominan: {displayDominantText}
          </Text>
        </View>
      </View>

      {/* Selected Day Dynamic Inspector */}
      {activeStat && (
        <View
          style={[
            styles.inspectorCard,
            {
              backgroundColor: activeConfig.lightBg,
              borderColor: activeConfig.borderColor,
            },
          ]}
        >
          <Image source={activeConfig.image} style={styles.inspectorEmoji} resizeMode="contain" />
          <View style={styles.inspectorContent}>
            <View style={styles.inspectorTopRow}>
              <Text style={styles.inspectorDayText}>
                {activeDayFullName}
                <Text style={styles.inspectorPercentage}> · {activeStat.percentage}% Intensitas</Text>
              </Text>
              <View
                style={[
                  styles.miniEmotionPill,
                  { backgroundColor: activeConfig.color },
                ]}
              >
                <Text style={styles.miniEmotionPillText}>{activeConfig.label}</Text>
              </View>
            </View>
            <Text style={[styles.inspectorPrompt, { color: activeConfig.textColor }]}>
              {activeConfig.prompt}
            </Text>
          </View>
        </View>
      )}

      {/* Bar Columns Container */}
      <View style={styles.chartArea}>
        {stats.map((stat, idx) => {
          const emotionKey =
            stat.primaryEmotion === 'Tenang'
              ? 'Biasa Saja'
              : stat.primaryEmotion || 'Biasa Saja';
          const config = EMOTION_MAP[emotionKey] || DEFAULT_CONFIG;
          const isSelected = idx === selectedIndex;
          const barHeight = Math.max(18, (stat.percentage / 100) * 115);

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={() => setSelectedIndex(idx)}
              style={styles.columnTouchable}
            >
              <Text
                style={[
                  styles.percentageText,
                  isSelected && {
                    color: config.color,
                    fontWeight: '700',
                  },
                ]}
              >
                {stat.percentage}%
              </Text>

              {/* Bar track */}
              <View
                style={[
                  styles.barTrack,
                  { backgroundColor: config.trackColor },
                  isSelected && {
                    borderColor: config.color,
                    borderWidth: 1.5,
                  },
                ]}
              >
                <View
                  style={[
                    styles.barFill,
                    {
                      height: barHeight,
                      backgroundColor: config.color,
                    },
                  ]}
                />
              </View>

              {/* Day Name & Selection Indicator */}
              <View style={styles.dayLabelWrap}>
                <Text
                  style={[
                    styles.dayText,
                    isSelected && {
                      color: colors.textPrimary,
                      fontWeight: '700',
                    },
                  ]}
                >
                  {stat.dayName}
                </Text>
                {isSelected ? (
                  <View
                    style={[styles.activeDot, { backgroundColor: config.color }]}
                  />
                ) : (
                  <View style={styles.inactiveSpacer} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Emotion Distribution (Screen C06 Brief) */}
      {showDistribution && (
        <View style={styles.distributionSection}>
          <View style={styles.distributionDivider} />
          <View style={styles.distributionHeader}>
            <Text style={styles.distributionTitle}>Distribusi Emosi</Text>
            <Text style={styles.distributionSubtitle}>7 Hari Terakhir</Text>
          </View>

          {/* Segmented Proportional Progress Bar */}
          <View style={styles.segmentedBar}>
            {Object.keys(emotionCounts).map((key) => {
              const count = emotionCounts[key] || 0;
              const pct = (count / totalDays) * 100;
              if (pct === 0) return null;
              const conf = EMOTION_MAP[key] || DEFAULT_CONFIG;
              return (
                <View
                  key={key}
                  style={[
                    styles.barSegment,
                    {
                      flex: count,
                      backgroundColor: conf.color,
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Distribution Legend Chips */}
          <View style={styles.legendRow}>
            {Object.keys(emotionCounts).map((key) => {
              const count = emotionCounts[key] || 0;
              const pct = Math.round((count / totalDays) * 100);
              const conf = EMOTION_MAP[key] || DEFAULT_CONFIG;
              return (
                <View key={key} style={styles.legendItem}>
                  <View style={[styles.legendDot, { backgroundColor: conf.color }]} />
                  <Text style={styles.legendLabel}>
                    {conf.label}{' '}
                    <Text style={styles.legendPercentage}>{pct}%</Text>
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    // Soft subtle shadow
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleWrap: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  dominantBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
  },
  dominantText: {
    fontSize: 10.5,
    fontWeight: '600',
  },
  inspectorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    marginVertical: spacing.xs,
    gap: 10,
  },
  inspectorEmoji: {
    width: 32,
    height: 32,
  },
  inspectorContent: {
    flex: 1,
  },
  inspectorTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inspectorDayText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  inspectorPercentage: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textMuted,
  },
  miniEmotionPill: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  miniEmotionPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  inspectorPrompt: {
    fontSize: 11,
    marginTop: 2,
    lineHeight: 15,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 165,
    paddingTop: spacing.xs,
    paddingHorizontal: 2,
  },
  columnTouchable: {
    alignItems: 'center',
    width: 40,
    paddingVertical: 4,
  },
  percentageText: {
    fontSize: 10,
    fontWeight: '500',
    color: colors.textMuted,
    marginBottom: 5,
  },
  barTrack: {
    width: 16,
    height: 115,
    borderRadius: borderRadius.full,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: borderRadius.full,
  },
  dayLabelWrap: {
    alignItems: 'center',
    marginTop: 6,
  },
  dayText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 3,
  },
  inactiveSpacer: {
    width: 4,
    height: 4,
    marginTop: 3,
  },
  distributionSection: {
    marginTop: spacing.sm,
  },
  distributionDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginBottom: spacing.sm,
  },
  distributionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  distributionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  distributionSubtitle: {
    fontSize: 11,
    color: colors.textMuted,
  },
  segmentedBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    gap: 2,
  },
  barSegment: {
    height: '100%',
    borderRadius: 2,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
  },
  legendLabel: {
    fontSize: 10.5,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  legendPercentage: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
});
