import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Smile, Plus, Calendar, Flame, Shield, Heart } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { MoodWeeklyChart } from '../../components/mood/MoodWeeklyChart';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const MoodScreen: React.FC = () => {
  const { moodEntries, weeklyStats, user, navigateTo } = useApp();

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      {/* Header Banner */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Teman Mood</Text>
          <Text style={styles.subtitle}>
            Kenali perasaanmu, satu hari dalam satu waktu.
          </Text>
        </View>
        <Button
          title="Catat Mood"
          size="sm"
          iconLeft={<Plus size={16} color={colors.surface} />}
          onPress={() => navigateTo('daily_mood_checkin')}
        />
      </View>

      {/* Streak Summary Card */}
      <View style={styles.statsRow}>
        <Card style={styles.statCard} variant="tintGreen">
          <Flame size={20} color={colors.brandGreen[600]} />
          <Text style={styles.statValue}>{user?.activeStreakDays || 14} Hari</Text>
          <Text style={styles.statLabel}>Runtun Aktif</Text>
        </Card>
        <Card style={styles.statCard} variant="tintBlue">
          <Heart size={20} color={colors.brandBlue[600]} />
          <Text style={styles.statValue}>{moodEntries.length} Catatan</Text>
          <Text style={styles.statLabel}>Refleksi Diri</Text>
        </Card>
      </View>

      {/* Weekly Emotional Distribution Chart */}
      <MoodWeeklyChart stats={weeklyStats} dominantEmotion="Tenang (52%)" />

      {/* Recent Entries Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Riwayat Refleksi Terbaru</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigateTo('mood_stats')}
        >
          <Text style={styles.seeStatsLink}>Lihat Analisis Lengkap</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.entriesList}>
        {moodEntries.map((entry) => (
          <Card key={entry.id} style={styles.entryCard}>
            <View style={styles.entryHeader}>
              <View style={styles.entryMetaRow}>
                <Badge
                  label={entry.primaryEmotion}
                  variant={
                    entry.primaryEmotion === 'Bahagia'
                      ? 'amber'
                      : entry.primaryEmotion === 'Tenang'
                      ? 'green'
                      : entry.primaryEmotion === 'Marah'
                      ? 'danger'
                      : 'blue'
                  }
                />
                <Text style={styles.entryDate}>{entry.dateString} · {entry.timeString}</Text>
              </View>
            </View>

            {entry.secondaryEmotions.length > 0 && (
              <View style={styles.subTagsRow}>
                {entry.secondaryEmotions.map((sub, idx) => (
                  <View key={idx} style={styles.subTag}>
                    <Text style={styles.subTagText}>{sub}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.entryNote}>{entry.note}</Text>

            {entry.contextTags.length > 0 && (
              <View style={styles.contextTagsRow}>
                {entry.contextTags.map((ctx, idx) => (
                  <Text key={idx} style={styles.contextTagText}>
                    #{ctx}
                  </Text>
                ))}
              </View>
            )}
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    maxWidth: 240,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.xs,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
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
  seeStatsLink: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  entriesList: {
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  entryCard: {
    padding: spacing.md,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  entryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  entryDate: {
    fontSize: 11,
    color: colors.textMuted,
  },
  subTagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 4,
  },
  subTag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  subTagText: {
    fontSize: 10.5,
    color: colors.textSecondary,
  },
  entryNote: {
    ...typography.bodyRegular,
    color: colors.textPrimary,
    lineHeight: 18,
    marginTop: 4,
  },
  contextTagsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.xs,
  },
  contextTagText: {
    fontSize: 11,
    color: colors.brandBlue[600],
    fontWeight: '500',
  },
});

