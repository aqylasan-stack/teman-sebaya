import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { MoodDayStat } from '../../types';

interface MoodWeeklyChartProps {
  stats: MoodDayStat[];
  dominantEmotion?: string;
}

export const MoodWeeklyChart: React.FC<MoodWeeklyChartProps> = ({
  stats,
  dominantEmotion = 'Tenang (52%)',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Statistik Emosi 7 Hari</Text>
        <View style={styles.dominantBadge}>
          <Text style={styles.dominantText}>Dominan: {dominantEmotion}</Text>
        </View>
      </View>

      {/* Bar Columns Container */}
      <View style={styles.chartArea}>
        {stats.map((stat, idx) => {
          const barHeight = Math.max(16, (stat.percentage / 100) * 120);
          const isHighest = stat.percentage >= 80;

          return (
            <View key={idx} style={styles.column}>
              <Text style={styles.percentageText}>{stat.percentage}%</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      height: barHeight,
                      backgroundColor: isHighest
                        ? colors.brandBlue[600]
                        : colors.brandBlue[200],
                    },
                  ]}
                />
              </View>
              <Text style={styles.dayText}>{stat.dayName}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dominantBadge: {
    backgroundColor: colors.brandGreen[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
  },
  dominantText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandGreen[700],
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
    paddingHorizontal: spacing.xs,
  },
  column: {
    alignItems: 'center',
    width: 36,
  },
  percentageText: {
    fontSize: 9.5,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 4,
  },
  barTrack: {
    width: 14,
    height: 120,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    width: '100%',
    borderRadius: borderRadius.full,
  },
  dayText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 6,
  },
});

