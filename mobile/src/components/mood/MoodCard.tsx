import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Smile, ArrowRight, ShieldCheck } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';

export const MoodCard: React.FC = () => {
  const { todayMood, saveMood, navigateTo } = useApp();

  const quickEmotions: { label: PrimaryEmotion; variant: 'blue' | 'green' | 'amber' | 'violet' | 'gray' }[] = [
    { label: 'Bahagia', variant: 'amber' },
    { label: 'Sedih', variant: 'blue' },
    { label: 'Marah', variant: 'violet' },
    { label: 'Biasa Saja', variant: 'gray' },
  ];

  if (todayMood) {
    return (
      <Card variant="surface" style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <View style={styles.indicatorDot} />
            <Text style={styles.headerTitle}>Catatan Suasana Hati Hari Ini</Text>
          </View>
          <Text style={styles.timeText}>{todayMood.timeString}</Text>
        </View>

        <View style={styles.loggedRow}>
          <View style={styles.emotionIconBadge}>
            <Smile size={24} color={colors.brandGreen[600]} />
          </View>
          <View style={styles.emotionInfo}>
            <Text style={styles.emotionName}>
              {todayMood.primaryEmotion}
              {todayMood.secondaryEmotions.length > 0 &&
                ` — ${todayMood.secondaryEmotions[0]}`}
            </Text>
            <Text style={styles.emotionNote} numberOfLines={2}>
              "{todayMood.note}"
            </Text>
          </View>
        </View>

        {/* Action buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigateTo('mood_stats')}
            style={styles.statsButton}
          >
            <Text style={styles.statsButtonText}>Lihat Statistik</Text>
            <ArrowRight size={14} color={colors.brandBlue[600]} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigateTo('mood_selection')}
            style={styles.editButton}
          >
            <Text style={styles.editButtonText}>Perbarui Catatan</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  return (
    <Card variant="tintBlue" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Smile size={18} color={colors.brandBlue[600]} />
          <Text style={[styles.headerTitle, { color: colors.brandBlue[700] }]}>
            Bagaimana perasaanmu hari ini?
          </Text>
        </View>
      </View>
      <Text style={styles.promptDesc}>
        Luangkan sedikit waktu untuk mengenali apa yang sedang kamu rasakan.
      </Text>

      {/* Quick Pills */}
      <View style={styles.pillsRow}>
        {quickEmotions.map((item) => (
          <Badge
            key={item.label}
            label={item.label}
            variant={item.variant}
            onPress={() => {
              saveMood(
                item.label,
                [],
                `Mencatat suasana hati: ${item.label}`,
                ['Harian']
              );
            }}
          />
        ))}
      </View>

      {/* Button: Check-in Mood (Sesuai Page 15 BRIEF TEMAN SEBAYA) */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigateTo('mood_selection')}
        style={styles.deepLink}
      >
        <Text style={styles.deepLinkText}>Check-in Mood Lengkap</Text>
        <ArrowRight size={14} color={colors.brandBlue[600]} />
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandGreen[500],
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  timeText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  loggedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  emotionIconBadge: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandGreen[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emotionInfo: {
    flex: 1,
  },
  emotionName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emotionNote: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  statsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
  },
  statsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  editButton: {
    paddingVertical: 4,
  },
  editButtonText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  promptDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.sm,
  },
  deepLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  deepLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
});

