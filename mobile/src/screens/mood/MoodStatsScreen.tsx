import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, Calendar, CheckCircle2, X } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { MoodWeeklyChart } from '../../components/mood/MoodWeeklyChart';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const MoodStatsScreen: React.FC = () => {
  const {
    weeklyStats,
    moodEntries,
    todayMood,
    user,
    switchTab,
    navigateTo,
    screenParams,
    goBack,
  } = useApp();

  // Feedback banner keberhasilan hanya muncul jika ada parameter justSaved (tidak permanen)
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(
    Boolean(screenParams?.justSaved)
  );

  const handleReturnToMood = () => {
    if (goBack) {
      goBack();
    } else {
      switchTab('mood');
      navigateTo('main');
    }
  };

  const handleViewHistory = () => {
    switchTab('mood');
    navigateTo('main');
  };

  // Sinkronkan data 7 hari dengan check-in hari ini jika ada
  const daysShort = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
  const todayDayName = daysShort[new Date().getDay()];

  const enhancedWeeklyStats = weeklyStats.map((stat) => {
    if (todayMood && stat.dayName === todayDayName) {
      const cleanDate = todayMood.dateString
        ? todayMood.dateString.replace(/ \d{4}$/, '')
        : stat.dateString;
      return {
        ...stat,
        primaryEmotion: todayMood.primaryEmotion,
        secondaryEmotion: todayMood.secondaryEmotions?.[0] || stat.secondaryEmotion,
        note: todayMood.note,
        dateString: cleanDate,
      };
    }
    return stat;
  });

  // Hitung data untuk Refleksi Minggu Ini dari catatan aktual
  const recordedDays = enhancedWeeklyStats.filter((s) => Boolean(s.primaryEmotion));
  const recordedDaysCount = recordedDays.length;

  const emotionCounts: Record<string, number> = {
    Bahagia: 0,
    'Biasa Saja': 0,
    Sedih: 0,
    Marah: 0,
  };

  recordedDays.forEach((s) => {
    const k = s.primaryEmotion === 'Tenang' ? 'Biasa Saja' : s.primaryEmotion!;
    if (emotionCounts[k] !== undefined) {
      emotionCounts[k] += 1;
    }
  });

  const sortedEmotions = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]);
  const [topEmotion, topCount] = sortedEmotions[0] || ['Biasa Saja', 0];
  const [secondEmotion, secondCount] = sortedEmotions[1] || ['', 0];

  let reflectionText = '';
  if (recordedDaysCount < 3) {
    reflectionText = `Kamu baru memiliki ${recordedDaysCount} hari catatan emosi pada periode ini. Belum ada cukup catatan untuk melihat pola mingguan secara utuh. Terus luangkan waktu sejenak setiap hari agar rangkuman refleksi tersaji lebih mendalam.`;
  } else if (secondCount > 0) {
    reflectionText = `Minggu ini kamu mencatat ${recordedDaysCount} hari refleksi, dengan emosi ${topEmotion} (${topCount} hari) dan ${secondEmotion} (${secondCount} hari) paling sering hadir. Setiap emosi yang datang adalah bagian alami dari hari-harimu. Terima kasih sudah meluangkan waktu hadir dan jujur merawat perasaanmu sendiri.`;
  } else {
    reflectionText = `Minggu ini kamu mencatat ${recordedDaysCount} hari refleksi, dengan perasaan ${topEmotion} dominan (${topCount} hari). Mengamati ritme emosi tanpa menghakimi memberi ruang aman bagi dirimu untuk bernapas lebih lega.`;
  }

  // Hitung Ringkasan Bulanan dari data aktual
  const now = new Date();
  const monthNamesIndo = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  const currentMonthName = `${monthNamesIndo[now.getMonth()]} ${now.getFullYear()}`;
  const currentDayOfMonth = Math.max(1, now.getDate());

  // Streak beruntun aktual
  const streakDays = user?.activeStreakDays ?? 1;

  // Total catatan tersimpan
  const totalEntries = user?.moodEntriesCount || moodEntries.length;

  // Keteraturan aktual: rasio hari check-in dibanding hari yang sudah berjalan bulan ini
  const activeDaysThisMonth = Math.min(currentDayOfMonth, totalEntries);
  const consistencyPercent = Math.min(
    100,
    Math.round((activeDaysThisMonth / currentDayOfMonth) * 100)
  );

  return (
    <ScreenContainer
      header={
        <ContextualHeader
          title="Statistik & Analisis Emosi"
          subtitle="Pola emosi & refleksi diri"
        />
      }
    >
      <View style={styles.container}>
        {/* Feedback Sementara Catatan Berhasil Disimpan (Hanya jika baru saja menyimpan) */}
        {showSuccessBanner && (
          <View style={styles.savedBanner}>
            <CheckCircle2 size={18} color={colors.brandGreen[600]} />
            <View style={styles.savedBannerTextWrap}>
              <Text style={styles.savedBannerTitle}>Catatanmu berhasil disimpan.</Text>
              <Text style={styles.savedBannerSubtitle}>
                Terima kasih sudah meluangkan waktu untuk memahami dirimu hari ini.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setShowSuccessBanner(false)}
              style={styles.savedBannerClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <X size={15} color={colors.brandGreen[700]} />
            </TouchableOpacity>
          </View>
        )}

        {/* 1. Ringkasan Bulanan (3 Metrik Terukur - Editorial Tanpa Card) */}
        <View style={styles.monthlySection}>
          <View style={styles.monthlyHeader}>
            <Calendar size={15} color={colors.textSecondary} />
            <Text style={styles.monthlyTitle}>
              Ringkasan Bulan {currentMonthName}
            </Text>
          </View>

          <View style={styles.metricsRow}>
            {/* Metrik 1: Hari Beruntun */}
            <View style={styles.metricItem}>
              <View style={styles.metricValueRow}>
                <Text style={styles.metricNum}>{streakDays}</Text>
                <Text style={styles.metricUnit}>hari</Text>
              </View>
              <Text style={styles.metricLabel}>Hari Beruntun</Text>
              <Text style={styles.metricCaption}>Streak aktif</Text>
            </View>

            <View style={styles.metricDivider} />

            {/* Metrik 2: Total Refleksi */}
            <View style={styles.metricItem}>
              <View style={styles.metricValueRow}>
                <Text style={styles.metricNum}>{totalEntries}</Text>
                <Text style={styles.metricUnit}>entri</Text>
              </View>
              <Text style={styles.metricLabel}>Total Refleksi</Text>
              <Text style={styles.metricCaption}>Tersimpan di jurnal</Text>
            </View>

            <View style={styles.metricDivider} />

            {/* Metrik 3: Keteraturan Bulan */}
            <View style={styles.metricItem}>
              <View style={styles.metricValueRow}>
                <Text style={styles.metricNum}>{consistencyPercent}%</Text>
              </View>
              <Text style={styles.metricLabel}>Keteraturan</Text>
              <Text style={styles.metricCaption}>
                {activeDaysThisMonth} dari {currentDayOfMonth} hari
              </Text>
            </View>
          </View>
        </View>

        {/* 2. Ritme Emosi 7 Hari & 3. Distribusi Emosi (Dalam Card Utama) */}
        <MoodWeeklyChart stats={enhancedWeeklyStats} />

        {/* 4. Gambaran Minggu Ini (Editorial Bersih Tanpa Card Biru Besar) */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Gambaran Minggu Ini</Text>
          <Text style={styles.summarySubtitle}>
            {recordedDaysCount >= 3
              ? `Berdasarkan ${recordedDaysCount} dari 7 hari pencatatan`
              : 'Catatan belum mencukupi'}
          </Text>
          <Text style={styles.summaryBody}>{reflectionText}</Text>
        </View>

        {/* Tombol Navigasi Bawah */}
        <View style={styles.actionButtonsRow}>
          <Button
            title="Kembali ke Mood"
            variant="outline"
            style={styles.flexBtn}
            onPress={handleReturnToMood}
          />
          <Button
            title="Analisis Lengkap"
            variant="primary"
            style={styles.flexBtn}
            onPress={() => navigateTo('mood_analysis')}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
  },

  /* Feedback Sementara Tersimpan */
  savedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.brandGreen[50],
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
    borderRadius: borderRadius.md,
    padding: 12,
    marginBottom: spacing.md,
  },
  savedBannerTextWrap: {
    flex: 1,
  },
  savedBannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  savedBannerSubtitle: {
    fontSize: 11.5,
    color: colors.brandGreen[600],
    marginTop: 2,
    lineHeight: 16,
  },
  savedBannerClose: {
    padding: 4,
  },

  /* 1. Ringkasan Bulanan (Editorial, Tanpa Card) */
  monthlySection: {
    paddingVertical: spacing.xs,
  },
  monthlyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.md,
  },
  monthlyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  metricNum: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.brandBlue[600],
    letterSpacing: -0.5,
  },
  metricUnit: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
    textAlign: 'center',
  },
  metricCaption: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 42,
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
  },

  /* Pemisah Editorial Tipis */
  sectionDivider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: spacing.layout.sectionGap,
  },

  /* 3. Gambaran Minggu Ini (Editorial, Tanpa Card Biru Besar) */
  summarySection: {
    paddingVertical: spacing.xs,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  summaryBody: {
    fontSize: 13,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  /* Tombol Aksi Bawah */
  actionButtonsRow: {
    flexDirection: 'row',
    gap: spacing.layout.itemGap,
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  flexBtn: {
    flex: 1,
  },
});
