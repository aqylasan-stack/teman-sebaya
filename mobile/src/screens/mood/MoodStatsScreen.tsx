import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Sparkles, Calendar, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { MoodWeeklyChart } from '../../components/mood/MoodWeeklyChart';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const MoodStatsScreen: React.FC = () => {
  const { weeklyStats, switchTab, navigateTo } = useApp();

  const handleReturnToMood = () => {
    switchTab('mood');
    navigateTo('main');
  };

  const handleViewHistory = () => {
    switchTab('mood');
    navigateTo('main');
  };

  return (
    <ScreenContainer
      header={<ContextualHeader title="Statistik & Analisis Emosi" />}
    >
      {/* Success Feedback Banner (Screen C04 BRIEF TEMAN SEBAYA) */}
      <Card variant="tintGreen" style={styles.successBanner}>
        <View style={styles.bannerRow}>
          <CheckCircle2 size={24} color={colors.brandGreen[600]} />
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>Catatanmu berhasil disimpan.</Text>
            <Text style={styles.bannerSubtitle}>
              Terima kasih sudah meluangkan waktu untuk memahami dirimu hari ini.
            </Text>
          </View>
        </View>
      </Card>

      {/* 7-Day Bar Chart */}
      <MoodWeeklyChart stats={weeklyStats} dominantEmotion="Bahagia (43%)" />

      {/* Insightful Feedback Card */}
      <Card variant="tintBlue" style={styles.insightCard}>
        <View style={styles.insightHeader}>
          <Sparkles size={18} color={colors.brandBlue[600]} />
          <Text style={styles.insightTitle}>Refleksi Minggu Ini</Text>
        </View>
        <Text style={styles.insightBody}>
          Emosimu didominasi oleh rasa Bahagia dan Biasa Saja di akhir pekan, namun sempat
          mengalami hari yang cukup melelahkan di pertengahan minggu sekolah. Membuka jeda
          singkat terbukti membantumu mengembalikan kestabilan emosi.
        </Text>
      </Card>

      {/* Calendar Summary */}
      <Card style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <Calendar size={18} color={colors.textPrimary} />
          <Text style={styles.calendarTitle}>Ringkasan Bulan November 2026</Text>
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricNum}>14</Text>
            <Text style={styles.metricLabel}>Hari Beruntun</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNum}>12</Text>
            <Text style={styles.metricLabel}>Total Refleksi</Text>
          </View>
          <View style={styles.metricDivider} />
          <View style={styles.metricItem}>
            <Text style={styles.metricNum}>85%</Text>
            <Text style={styles.metricLabel}>Tingkat Keteraturan</Text>
          </View>
        </View>
      </Card>

      {/* Dual action buttons matching Screen C04 */}
      <View style={styles.actionButtonsRow}>
        <Button
          title="Kembali ke Mood"
          variant="outline"
          style={styles.flexBtn}
          onPress={handleReturnToMood}
        />
        <Button
          title="Lihat Riwayat"
          variant="primary"
          style={styles.flexBtn}
          onPress={handleViewHistory}
        />
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  actionButtonsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
  },
  flexBtn: {
    flex: 1,
  },
  successBanner: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  bannerSubtitle: {
    ...typography.bodySmall,
    color: colors.brandGreen[600],
    marginTop: 2,
  },
  insightCard: {
    padding: spacing.md,
    marginVertical: spacing.md,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.xs,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  insightBody: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  calendarCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  calendarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricItem: {
    alignItems: 'center',
  },
  metricNum: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: colors.borderLight,
  },
  doneBtn: {
    marginBottom: spacing.xl,
  },
});

