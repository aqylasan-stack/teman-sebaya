import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Sparkles,
  ArrowRight,
  BarChart2,
  CheckCircle2,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion, MoodEntry } from '../../types';

type PeriodType = 'weekly' | 'monthly' | 'yearly';

interface EmotionTheme {
  label: string;
  color: string;
  softBg: string;
  borderColor: string;
  textColor: string;
  image: any;
}

const EMOTION_THEMES: Record<string, EmotionTheme> = {
  Bahagia: {
    label: 'Bahagia',
    color: '#EAB308',
    softBg: '#FFFDF0',
    borderColor: '#FEF08A',
    textColor: '#854D0E',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
  },
  Sedih: {
    label: 'Sedih',
    color: '#2563EB',
    softBg: '#EFF6FF',
    borderColor: '#BFDBFE',
    textColor: '#1E40AF',
    image: require('../../../assets/emojis/emoji_sedih.png'),
  },
  Marah: {
    label: 'Marah',
    color: '#DC2626',
    softBg: '#FEF2F2',
    borderColor: '#FECACA',
    textColor: '#991B1B',
    image: require('../../../assets/emojis/emoji_marah.png'),
  },
  'Biasa Saja': {
    label: 'Biasa Saja',
    color: '#8C6E54',
    softBg: '#FAF5EE',
    borderColor: '#E8DCCE',
    textColor: '#705030',
    image: require('../../../assets/emojis/emoji_biasa.png'),
  },
};

const DEFAULT_THEME: EmotionTheme = EMOTION_THEMES['Biasa Saja'];

const MONTH_NAMES_INDO = [
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

const MONTH_SHORT_INDO = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Ags',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const DAY_NAMES_INDO = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const DAY_NAMES_FULL_INDO = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
];

export const MoodAnalysisScreen: React.FC = () => {
  const { moodEntries, todayMood, navigateTo, goBack } = useApp();

  const [period, setPeriod] = useState<PeriodType>('monthly');
  // Offset relatif: 0 = periode sekarang, -1 = satu periode ke belakang, dst.
  const [offset, setOffset] = useState<number>(0);
  // Tanggal terpilih pada kalender bulanan
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number>(() => {
    return new Date().getDate();
  });

  // Tanggal acuan saat ini (Default: 10 Nov 2026 atau waktu lokal)
  const baseDate = useMemo(() => {
    return new Date();
  }, []);

  // Normalisasi semua entri (termasuk check-in hari ini jika ada)
  const allEntries = useMemo(() => {
    const list = [...moodEntries];
    if (todayMood && !list.some((e) => e.id === todayMood.id)) {
      list.unshift(todayMood);
    }
    return list;
  }, [moodEntries, todayMood]);

  // ==========================================
  // KALKULASI RANGE PERIODE BERDASARKAN OFFSET
  // ==========================================

  // 1. Periode Mingguan
  const weeklyRange = useMemo(() => {
    const d = new Date(baseDate);
    // Geser hari sesuai offset minggu (setiap offset = 7 hari)
    d.setDate(d.getDate() + offset * 7);

    // Cari hari Senin pada minggu tersebut
    const day = d.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const monday = new Date(d);
    monday.setDate(d.getDate() + diffToMonday);
    monday.setHours(0, 0, 0, 0);

    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const formatShort = (dt: Date) =>
      `${String(dt.getDate()).padStart(2, '0')} ${MONTH_SHORT_INDO[dt.getMonth()]}`;

    const label =
      offset === 0
        ? `Minggu Ini (${formatShort(monday)} – ${formatShort(sunday)})`
        : `${formatShort(monday)} – ${formatShort(sunday)} ${sunday.getFullYear()}`;

    return { start: monday, end: sunday, label };
  }, [baseDate, offset]);

  // 2. Periode Bulanan
  const monthlyRange = useMemo(() => {
    const targetMonthIndex = baseDate.getMonth() + offset;
    const targetDate = new Date(baseDate.getFullYear(), targetMonthIndex, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    const start = new Date(year, month, 1, 0, 0, 0, 0);
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999);

    const label = `${MONTH_NAMES_INDO[month]} ${year}`;
    return { start, end, label, year, month };
  }, [baseDate, offset]);

  // 3. Periode Tahunan
  const yearlyRange = useMemo(() => {
    const year = baseDate.getFullYear() + offset;
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59, 999);
    const label = `Tahun ${year}`;
    return { start, end, label, year };
  }, [baseDate, offset]);

  // Current active range
  const currentRange = useMemo(() => {
    if (period === 'weekly') return weeklyRange;
    if (period === 'monthly') return monthlyRange;
    return yearlyRange;
  }, [period, weeklyRange, monthlyRange, yearlyRange]);

  // Apakah sedang berada di periode sekarang (tidak bisa geser ke masa depan)
  const isCurrentPeriod = offset >= 0;

  const handlePrevPeriod = () => setOffset((prev) => prev - 1);
  const handleNextPeriod = () => {
    if (!isCurrentPeriod) setOffset((prev) => prev + 1);
  };

  const handleSwitchPeriod = (newPeriod: PeriodType) => {
    setPeriod(newPeriod);
    setOffset(0); // Reset offset saat ganti tipe periode
  };

  // ==========================================
  // FILTER DATA SESUAI PERIODE
  // ==========================================
  const filteredEntries = useMemo(() => {
    const { start, end } = currentRange;
    return allEntries.filter((entry) => {
      const entryTime = new Date(entry.timestamp).getTime();
      return entryTime >= start.getTime() && entryTime <= end.getTime();
    });
  }, [allEntries, currentRange]);

  // ==========================================
  // AGREGASI STATISTIK DARI DATA AKTUAL
  // ==========================================
  const stats = useMemo(() => {
    // 1. Jumlah entri total
    const totalEntries = filteredEntries.length;

    // 2. Jumlah hari unik yang mencatat mood (Hari Tanpa Check-in TIDAK dihitung)
    const uniqueDaysSet = new Set<string>();
    filteredEntries.forEach((e) => {
      const dt = new Date(e.timestamp);
      uniqueDaysSet.add(`${dt.getFullYear()}-${dt.getMonth()}-${dt.getDate()}`);
    });
    const activeDays = uniqueDaysSet.size;

    // 2b. Jumlah entri yang memiliki catatan refleksi tertulis (bukan string kosong)
    const entriesWithNotes = filteredEntries.filter(
      (e) => Boolean(e.note && e.note.trim())
    ).length;

    // 3. Hitung total hari acuan dalam periode untuk rumus keteraturan
    let totalDaysInPeriod = 7;
    const now = new Date();

    if (period === 'weekly') {
      totalDaysInPeriod = 7;
    } else if (period === 'monthly') {
      const { year, month } = monthlyRange;
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      // Jika bulan ini, gunakan hari yang sudah berjalan
      if (year === now.getFullYear() && month === now.getMonth()) {
        totalDaysInPeriod = Math.max(1, now.getDate());
      } else {
        totalDaysInPeriod = daysInMonth;
      }
    } else {
      // Tahunan
      const { year } = yearlyRange;
      if (year === now.getFullYear()) {
        // Estimasi hari yang sudah lewat tahun ini
        const startOfYear = new Date(year, 0, 1);
        const diffDays = Math.ceil(
          (now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)
        );
        totalDaysInPeriod = Math.max(1, diffDays);
      } else {
        totalDaysInPeriod = 365;
      }
    }

    // Persentase Keteraturan: (activeDays / totalDaysInPeriod) * 100
    const consistencyRate = Math.min(
      100,
      Math.round((activeDays / totalDaysInPeriod) * 100)
    );

    // 4. Distribusi per kategori emosi aktual
    const emotionCounts: Record<string, number> = {
      Bahagia: 0,
      'Biasa Saja': 0,
      Sedih: 0,
      Marah: 0,
    };

    const subEmotionCounts: Record<string, number> = {};

    filteredEntries.forEach((e) => {
      const k = e.primaryEmotion === 'Tenang' ? 'Biasa Saja' : e.primaryEmotion;
      if (emotionCounts[k] !== undefined) {
        emotionCounts[k] += 1;
      }
      // Kumpulkan sub-emosi
      if (e.secondaryEmotions && e.secondaryEmotions.length > 0) {
        e.secondaryEmotions.forEach((sub) => {
          subEmotionCounts[sub] = (subEmotionCounts[sub] || 0) + 1;
        });
      }
    });

    // Cari emosi dominan
    const sortedEmotions = Object.entries(emotionCounts).sort(
      (a, b) => b[1] - a[1]
    );
    const [dominantName, dominantCount] = sortedEmotions[0] || ['Biasa Saja', 0];
    const dominantTheme =
      dominantCount > 0
        ? EMOTION_THEMES[dominantName] || DEFAULT_THEME
        : null;

    // Sub-emosi paling sering
    const sortedSubEmotions = Object.entries(subEmotionCounts).sort(
      (a, b) => b[1] - a[1]
    );
    const topSubEmotion = sortedSubEmotions[0]?.[0] || null;

    return {
      totalEntries,
      activeDays,
      entriesWithNotes,
      totalDaysInPeriod,
      consistencyRate,
      emotionCounts,
      dominantName,
      dominantCount,
      dominantTheme,
      topSubEmotion,
      hasData: totalEntries > 0,
    };
  }, [filteredEntries, period, monthlyRange, yearlyRange]);

  // ==========================================
  // DATA GRAFIK PERJALANAN EMOSI (TRENDS)
  // ==========================================

  // Grafik Mingguan: 7 Hari (Senin s/d Minggu)
  const weeklyTrendData = useMemo(() => {
    if (period !== 'weekly') return [];
    const { start } = weeklyRange;

    // Susun array 7 hari: Sen, Sel, Rab, Kam, Jum, Sab, Min
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);

      const dayName = DAY_NAMES_INDO[d.getDay()];
      const dateNum = d.getDate();

      // Cari entri pada tanggal tersebut
      const entry = filteredEntries.find((e) => {
        const ed = new Date(e.timestamp);
        return (
          ed.getFullYear() === d.getFullYear() &&
          ed.getMonth() === d.getMonth() &&
          ed.getDate() === d.getDate()
        );
      });

      const emotion = entry
        ? entry.primaryEmotion === 'Tenang'
          ? 'Biasa Saja'
          : entry.primaryEmotion
        : null;

      days.push({
        dayName,
        dateNum,
        hasRecord: Boolean(entry),
        emotion,
        theme: emotion ? EMOTION_THEMES[emotion] || DEFAULT_THEME : null,
        entry,
      });
    }
    return days;
  }, [period, weeklyRange, filteredEntries]);

  // Data Grid Kalender Bulanan (Berdasarkan referensi visual & Screen C05 Brief)
  const monthlyCalendarData = useMemo(() => {
    if (period !== 'monthly') return null;
    const { year, month } = monthlyRange;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Hari pertama bulan (0 = Min, 1 = Sen, ..., 6 = Sab)
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    // Minggu dimulai dari Senin (0 = Sen, 6 = Min). Hitung jeda slot sebelum tanggal 1:
    const leadBlanks = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

    // Petakan entri mood berdasarkan tanggal hari (1..daysInMonth)
    const dayEntriesMap = new Map<number, MoodEntry>();
    filteredEntries.forEach((entry) => {
      const eDate = new Date(entry.timestamp);
      if (eDate.getFullYear() === year && eDate.getMonth() === month) {
        dayEntriesMap.set(eDate.getDate(), entry);
      }
    });

    const now = new Date();
    const isCurrentMonth =
      now.getFullYear() === year && now.getMonth() === month;
    const currentTodayDate = isCurrentMonth ? now.getDate() : -1;

    const cells: {
      dateNum: number;
      isBlank: boolean;
      isToday: boolean;
      entry: MoodEntry | null;
      theme: EmotionTheme | null;
    }[] = [];

    // Slot kosong sebelum tanggal 1
    for (let i = 0; i < leadBlanks; i++) {
      cells.push({
        dateNum: 0,
        isBlank: true,
        isToday: false,
        entry: null,
        theme: null,
      });
    }

    // Tanggal 1 s/d daysInMonth
    for (let d = 1; d <= daysInMonth; d++) {
      const entry = dayEntriesMap.get(d) || null;
      const theme = entry
        ? EMOTION_THEMES[entry.primaryEmotion] || DEFAULT_THEME
        : null;

      cells.push({
        dateNum: d,
        isBlank: false,
        isToday: d === currentTodayDate,
        entry,
        theme,
      });
    }

    return {
      year,
      month,
      daysInMonth,
      cells,
      dayEntriesMap,
    };
  }, [period, monthlyRange, filteredEntries]);

  // Data detail tanggal terpilih di kalender bulanan
  const selectedCalendarDateData = useMemo(() => {
    if (period !== 'monthly' || !monthlyCalendarData) {
      return { entry: null, theme: null, dayName: '', validDate: 1 };
    }
    const { year, month } = monthlyRange;
    const validDate = Math.min(
      Math.max(1, selectedCalendarDate),
      monthlyCalendarData.daysInMonth
    );
    const entry = monthlyCalendarData.dayEntriesMap.get(validDate) || null;
    const theme = entry
      ? EMOTION_THEMES[entry.primaryEmotion] || DEFAULT_THEME
      : null;
    const dayObj = new Date(year, month, validDate);
    const dayName = DAY_NAMES_FULL_INDO[dayObj.getDay()] || 'Hari';

    return { entry, theme, dayName, validDate };
  }, [period, monthlyCalendarData, selectedCalendarDate, monthlyRange]);

  // Grafik Tahunan: 12 Bulan (Jan - Des)
  const yearlyTrendData = useMemo(() => {
    if (period !== 'yearly') return [];
    const { year } = yearlyRange;

    return MONTH_SHORT_INDO.map((monthShort, mIndex) => {
      const mEntries = filteredEntries.filter((e) => {
        const ed = new Date(e.timestamp);
        return ed.getFullYear() === year && ed.getMonth() === mIndex;
      });

      // Hitung dominan di bulan tersebut
      const counts: Record<string, number> = {
        Bahagia: 0,
        'Biasa Saja': 0,
        Sedih: 0,
        Marah: 0,
      };
      mEntries.forEach((e) => {
        const k = e.primaryEmotion === 'Tenang' ? 'Biasa Saja' : e.primaryEmotion;
        if (counts[k] !== undefined) counts[k] += 1;
      });

      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
      const domName = top && top[1] > 0 ? top[0] : null;

      return {
        monthShort,
        monthName: MONTH_NAMES_INDO[mIndex],
        count: mEntries.length,
        domEmotion: domName,
        theme: domName ? EMOTION_THEMES[domName] || DEFAULT_THEME : null,
      };
    });
  }, [period, yearlyRange, filteredEntries]);

  // ==========================================
  // REFLEKSI PERIODE (FAKTUAL & MANUSIAWI)
  // ==========================================
  const reflectionNarrative = useMemo(() => {
    if (!stats.hasData) {
      return 'Belum ada catatan emosi yang tersimpan pada periode ini. Meluangkan waktu 1–2 menit setiap hari di Teman Mood membantumu melihat ritme perasaan secara utuh.';
    }

    const { activeDays, totalEntries, dominantName, dominantCount, topSubEmotion } =
      stats;

    let text = `Dalam periode ini, kamu mencatat ${activeDays} hari (${totalEntries} entri refleksi) dengan perasaan ${dominantName} paling sering hadir (${dominantCount} kali).`;

    if (topSubEmotion) {
      text += ` Nuansa perasaan "${topSubEmotion}" menjadi salah satu yang paling sering kamu rasakan.`;
    }

    text +=
      ' Mengamati pasang surut emosi tanpa menghakimi memberi ruang aman bagi dirimu untuk lebih memahami apa yang sedang kamu butuhkan.';

    return text;
  }, [stats]);

  return (
    <ScreenContainer
      header={
        <ContextualHeader
          title="Analisis Lengkap"
          subtitle="Pola & dinamika perjalanan emosi"
          onBack={goBack}
        />
      }
      contentContainerStyle={styles.scrollContent}
    >
      {/* 1. Period Selector (Mingguan | Bulanan | Tahunan) */}
        <View style={styles.periodSegment}>
          {(['weekly', 'monthly', 'yearly'] as PeriodType[]).map((p) => {
            const isActive = period === p;
            const labels: Record<PeriodType, string> = {
              weekly: 'Mingguan',
              monthly: 'Bulanan',
              yearly: 'Tahunan',
            };
            return (
              <TouchableOpacity
                key={p}
                activeOpacity={0.8}
                onPress={() => handleSwitchPeriod(p)}
                style={[
                  styles.segmentBtn,
                  isActive && styles.segmentBtnActive,
                ]}
              >
                <Text
                  style={[
                    styles.segmentText,
                    isActive && styles.segmentTextActive,
                  ]}
                >
                  {labels[p]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 2. Date Navigation Bar */}
        <View style={styles.navBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePrevPeriod}
            style={styles.navArrowBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ChevronLeft size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.navTitleWrap}>
            <Calendar size={14} color={colors.brandBlue[600]} />
            <Text style={styles.navTitleText}>{currentRange.label}</Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleNextPeriod}
            disabled={isCurrentPeriod}
            style={[
              styles.navArrowBtn,
              isCurrentPeriod && styles.navArrowBtnDisabled,
            ]}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <ChevronRight
              size={18}
              color={isCurrentPeriod ? colors.borderMedium : colors.textPrimary}
            />
          </TouchableOpacity>
        </View>

        {/* 3. Summary Statistics (3 Metrik Bersih, Hangat, & Bernapas Lega) */}
        <View style={styles.statsRow}>
          {/* Metrik 1: Hari Tercatat */}
          <View style={styles.statBox}>
            <View style={styles.statValueRow}>
              <Text style={styles.statNum}>{stats.activeDays}</Text>
              <Text style={styles.statUnit}>hari</Text>
            </View>
            <Text style={styles.statLabel}>Hari Tercatat</Text>
            <Text style={styles.statCaption}>
              {period === 'weekly'
                ? 'dari 7 hari'
                : period === 'monthly'
                ? 'di bulan ini'
                : 'sepanjang tahun'}
            </Text>
          </View>

          <View style={styles.statDivider} />

          {/* Metrik 2: Catatan Tertulis */}
          <View style={styles.statBox}>
            <View style={styles.statValueRow}>
              <Text style={styles.statNum}>{stats.entriesWithNotes}</Text>
              <Text style={styles.statUnit}>cerita</Text>
            </View>
            <Text style={styles.statLabel}>Catatan Tertulis</Text>
            <Text style={styles.statCaption}>refleksi di jurnal</Text>
          </View>

          <View style={styles.statDivider} />

          {/* Metrik 3: Suasana Dominan */}
          <View style={styles.statBox}>
            {stats.dominantTheme ? (
              <View style={styles.dominantWrap}>
                <Image
                  source={stats.dominantTheme.image}
                  style={styles.dominantMiniEmoji}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.dominantLabel,
                    { color: stats.dominantTheme.color },
                  ]}
                  numberOfLines={1}
                >
                  {stats.dominantName}
                </Text>
              </View>
            ) : (
              <View style={styles.statValueRow}>
                <Text style={styles.statEmptyDash}>-</Text>
              </View>
            )}
            <Text style={styles.statLabel}>Suasana Dominan</Text>
            <Text style={styles.statCaption}>paling sering hadir</Text>
          </View>
        </View>

        {/* 4. Emotion Distribution (Visual Proposional Terinspirasi dari Referensi) */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Distribusi Emosi</Text>
            <Text style={styles.sectionSubheading}>
              {stats.hasData
                ? `${stats.totalEntries} catatan dianalisis`
                : 'Belum ada data'}
            </Text>
          </View>

          {/* Segmented Bar Proposional */}
          <View style={styles.segmentedTrack}>
            {stats.hasData ? (
              Object.keys(stats.emotionCounts).map((k) => {
                const count = stats.emotionCounts[k] || 0;
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
              <View
                style={[
                  styles.segmentFill,
                  { flex: 1, backgroundColor: colors.surfaceAlt },
                ]}
              />
            )}
          </View>

          {/* 4 Kartu Kategori Emosi (Visual Terinspirasi Bubble Emosi Referensi) */}
          <View style={styles.emotionGrid}>
            {Object.keys(stats.emotionCounts).map((key) => {
              const count = stats.emotionCounts[key] || 0;
              const pct = stats.totalEntries > 0
                ? Math.round((count / stats.totalEntries) * 100)
                : 0;
              const theme = EMOTION_THEMES[key] || DEFAULT_THEME;

              return (
                <View
                  key={key}
                  style={[
                    styles.emotionPillCard,
                    count > 0 && {
                      backgroundColor: theme.softBg,
                      borderColor: theme.borderColor,
                    },
                  ]}
                >
                  <Image
                    source={theme.image}
                    style={styles.emotionCardEmoji}
                    resizeMode="contain"
                  />
                  <View style={styles.emotionCardInfo}>
                    <Text style={styles.emotionCardName}>{theme.label}</Text>
                    <Text style={styles.emotionCardDetail}>
                      {count} hari <Text style={styles.emotionCardPct}>({pct}%)</Text>
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 5. Emotional Trends (Grafik Kapsul Mingguan/Tahunan atau Kalender Mood Bulanan) */}
        <View style={styles.cardSection}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionHeading}>
                {period === 'weekly'
                  ? 'Ritme Emosi 7 Hari'
                  : period === 'monthly'
                  ? 'Kalender Mood Bulanan'
                  : 'Tren Perjalanan Tahunan'}
              </Text>
              <Text style={styles.sectionSubheading}>
                {period === 'weekly'
                  ? 'Status harian 7 hari'
                  : period === 'monthly'
                  ? 'Sentuh tanggal untuk melihat detail refleksi'
                  : 'Agregasi 12 bulan'}
              </Text>
            </View>
          </View>

          {/* Render Trend Khusus Mingguan */}
          {period === 'weekly' && (
            <View style={styles.weeklyColumnsContainer}>
              {weeklyTrendData.map((item, idx) => (
                <View key={idx} style={styles.weeklyColItem}>
                  <Text style={styles.colDayLabel}>{item.dayName}</Text>
                  <Text style={styles.colDateLabel}>{item.dateNum}</Text>

                  {/* Kapsul Vertikal Terinspirasi Referensi */}
                  <View
                    style={[
                      styles.capsuleTrack,
                      item.hasRecord &&
                        item.theme && {
                          backgroundColor: item.theme.softBg,
                          borderColor: item.theme.borderColor,
                        },
                    ]}
                  >
                    {item.hasRecord && item.theme ? (
                      <Image
                        source={item.theme.image}
                        style={styles.capsuleEmoji}
                        resizeMode="contain"
                      />
                    ) : (
                      <View style={styles.capsuleEmptyDot} />
                    )}
                  </View>

                  <Text
                    style={[
                      styles.colStatusText,
                      item.theme && { color: item.theme.color, fontWeight: '700' },
                    ]}
                    numberOfLines={1}
                  >
                    {item.hasRecord ? item.emotion : 'Kosong'}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Kalender Mood Bulanan (Berdasarkan Referensi Visual May 2026 & Screen C05 Brief) */}
          {period === 'monthly' && monthlyCalendarData && (
            <View style={styles.calendarContainer}>
              {/* Header Nama Hari: Sen s/d Min */}
              <View style={styles.calendarDayNamesRow}>
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map(
                  (dayName, dIdx) => (
                    <View key={dIdx} style={styles.calendarDayNameCol}>
                      <Text style={styles.calendarDayNameText}>{dayName}</Text>
                    </View>
                  )
                )}
              </View>

              {/* Grid 7 Kolom Tanggal Bulanan */}
              <View style={styles.calendarGrid}>
                {monthlyCalendarData.cells.map((cell, cIdx) => {
                  if (cell.isBlank) {
                    return <View key={cIdx} style={styles.calendarCellWrapper} />;
                  }

                  const isSelected =
                    cell.dateNum === selectedCalendarDateData.validDate;

                  return (
                    <View key={cIdx} style={styles.calendarCellWrapper}>
                      <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => setSelectedCalendarDate(cell.dateNum)}
                        style={[
                          styles.calendarCellTile,
                          cell.theme
                            ? {
                                backgroundColor: cell.theme.softBg,
                                borderColor:
                                  cell.isToday || isSelected
                                    ? cell.theme.color
                                    : cell.theme.borderColor,
                                borderWidth:
                                  cell.isToday || isSelected ? 2 : 1.5,
                                ...(isSelected
                                  ? {
                                      shadowColor: cell.theme.color,
                                      shadowOffset: { width: 0, height: 2 },
                                      shadowOpacity: 0.2,
                                      shadowRadius: 4,
                                      elevation: 3,
                                    }
                                  : {}),
                              }
                            : {
                                ...(cell.isToday
                                  ? styles.calendarCellToday
                                  : {}),
                                ...(isSelected
                                  ? styles.calendarCellSelected
                                  : {}),
                              },
                        ]}
                      >
                        {cell.theme ? (
                          <Image
                            source={cell.theme.image}
                            style={styles.calendarCellEmoji}
                            resizeMode="contain"
                          />
                        ) : (
                          <Text
                            style={[
                              styles.calendarDateNum,
                              cell.isToday && styles.calendarDateNumToday,
                              isSelected && styles.calendarDateNumSelected,
                            ]}
                          >
                            {cell.dateNum}
                          </Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>

              {/* Legend Emosi Sederhana */}
              <View style={styles.calendarLegendRow}>
                {[
                  { label: 'Bahagia', color: '#EAB308' },
                  { label: 'Biasa Saja', color: '#8C6E54' },
                  { label: 'Sedih', color: '#2563EB' },
                  { label: 'Marah', color: '#DC2626' },
                ].map((leg) => (
                  <View key={leg.label} style={styles.legendItem}>
                    <View
                      style={[styles.legendDot, { backgroundColor: leg.color }]}
                    />
                    <Text style={styles.legendText}>{leg.label}</Text>
                  </View>
                ))}
              </View>

              {/* Kartu Detail Tanggal Terpilih (Sesuai Referensi & Brief) */}
              <View style={styles.calendarDetailWrap}>
                {selectedCalendarDateData.entry ? (
                  <View
                    style={[
                      styles.calendarDetailCard,
                      selectedCalendarDateData.theme && {
                        backgroundColor: selectedCalendarDateData.theme.softBg,
                        borderColor: selectedCalendarDateData.theme.borderColor,
                      },
                    ]}
                  >
                    <View style={styles.calendarDetailHeader}>
                      {selectedCalendarDateData.theme && (
                        <Image
                          source={selectedCalendarDateData.theme.image}
                          style={styles.calendarDetailEmoji}
                          resizeMode="contain"
                        />
                      )}
                      <View style={styles.calendarDetailHeaderTextWrap}>
                        <Text style={styles.calendarDetailTitle}>
                          {selectedCalendarDateData.dayName},{' '}
                          {selectedCalendarDateData.validDate}{' '}
                          {MONTH_SHORT_INDO[monthlyRange.month]}{' '}
                          {monthlyRange.year}
                          {selectedCalendarDateData.theme ? (
                            <>
                              {' · '}
                              <Text
                                style={{
                                  color: selectedCalendarDateData.theme.color,
                                  fontWeight: '700',
                                }}
                              >
                                {selectedCalendarDateData.theme.label}
                              </Text>
                            </>
                          ) : null}
                        </Text>

                        {selectedCalendarDateData.entry.secondaryEmotions &&
                          selectedCalendarDateData.entry.secondaryEmotions.length >
                            0 && (
                            <Text style={styles.calendarDetailSubEmotion}>
                              Perasaan:{' '}
                              {
                                selectedCalendarDateData.entry.secondaryEmotions[0]
                              }
                            </Text>
                          )}

                        <Text style={styles.calendarDetailTime}>
                          Tercatat pukul{' '}
                          {selectedCalendarDateData.entry.timeString ||
                            '12:00 WIB'}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.calendarDetailStoryWrap}>
                      <Text style={styles.calendarDetailStoryLabel}>
                        Catatan Refleksi:
                      </Text>
                      <Text
                        style={[
                          styles.calendarDetailStoryText,
                          !(
                            selectedCalendarDateData.entry.note &&
                            selectedCalendarDateData.entry.note.trim()
                          ) && styles.calendarDetailStoryEmpty,
                        ]}
                      >
                        {selectedCalendarDateData.entry.note &&
                        selectedCalendarDateData.entry.note.trim()
                          ? `"${selectedCalendarDateData.entry.note}"`
                          : 'Tidak ada catatan tertulis untuk tanggal ini.'}
                      </Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.calendarDetailEmptyCard}>
                    <View style={styles.calendarDetailEmptyIconWrap}>
                      <Calendar size={15} color={colors.textMuted} />
                    </View>
                    <View style={styles.calendarDetailEmptyTextWrap}>
                      <Text style={styles.calendarDetailEmptyTitle}>
                        {selectedCalendarDateData.dayName},{' '}
                        {selectedCalendarDateData.validDate}{' '}
                        {MONTH_SHORT_INDO[monthlyRange.month]}{' '}
                        {monthlyRange.year}
                      </Text>
                      <Text style={styles.calendarDetailEmptySub}>
                        Belum ada catatan emosi yang tersimpan pada tanggal ini.
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          )}

          {/* Render Trend Khusus Tahunan */}
          {period === 'yearly' && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.yearlyScrollTrack}
            >
              {yearlyTrendData.map((m, idx) => {
                const maxCount = Math.max(
                  ...yearlyTrendData.map((x) => x.count),
                  1
                );
                const heightPercent = Math.max(
                  18,
                  Math.round((m.count / maxCount) * 85)
                );

                return (
                  <View key={idx} style={styles.yearlyColItem}>
                    <Text style={styles.colDayLabel}>{m.monthShort}</Text>

                    <View style={styles.yearlyBarTrack}>
                      <View
                        style={[
                          styles.barFillCapsule,
                          {
                            height: m.count > 0 ? `${heightPercent}%` : 14,
                            backgroundColor:
                              m.theme?.color || colors.borderMedium,
                          },
                        ]}
                      >
                        {m.theme && (
                          <Image
                            source={m.theme.image}
                            style={styles.miniBarEmoji}
                            resizeMode="contain"
                          />
                        )}
                      </View>
                    </View>

                    <Text style={styles.yearlyCountLabel}>{m.count}</Text>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>

        {/* 6. Period Reflection (Editorial Narrative Faktual) */}
        <View style={styles.reflectionSection}>
          <Text style={styles.reflectionTitle}>Refleksi Periode Ini</Text>
          <Text style={styles.reflectionSubtitle}>{currentRange.label}</Text>
          <Text style={styles.reflectionBody}>{reflectionNarrative}</Text>
        </View>

        {/* 7. Action Button: Navigasi Balik ke Mood / Jurnal */}
        <View style={styles.actionRow}>
          <Button
            title="Kembali ke Jurnal Mood"
            variant="primary"
            fullWidth
            onPress={() => {
              if (goBack) {
                goBack();
              } else {
                navigateTo('main');
              }
            }}
          />
        </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.lg,
  },

  /* 1. Period Selector Segment */
  periodSegment: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: 3,
    marginBottom: spacing.sm,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.sm,
  },
  segmentBtnActive: {
    backgroundColor: colors.surface,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },

  /* 2. Date Navigation Bar */
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  navArrowBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrowBtnDisabled: {
    opacity: 0.4,
  },
  navTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  navTitleText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },

  /* 3. Summary Stats Row (Unboxed Editorial) */
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  statValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.brandBlue[600],
    letterSpacing: -0.3,
  },
  statUnit: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  statEmptyDash: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.borderMedium,
  },
  statLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 2,
    textAlign: 'center',
  },
  statCaption: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: colors.borderLight,
    alignSelf: 'center',
  },
  dominantWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dominantMiniEmoji: {
    width: 20,
    height: 20,
  },
  dominantLabel: {
    fontSize: 12,
    fontWeight: '700',
  },

  /* Card Containers */
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionSubheading: {
    fontSize: 11.5,
    color: colors.textMuted,
  },

  /* Segmented Bar */
  segmentedTrack: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: colors.surfaceAlt,
    gap: 2,
    marginBottom: spacing.md,
  },
  segmentFill: {
    height: '100%',
    borderRadius: 2,
  },

  /* 4 Grid Kategori Emosi */
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 8,
  },
  emotionPillCard: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 8,
  },
  emotionCardEmoji: {
    width: 28,
    height: 28,
  },
  emotionCardInfo: {
    flex: 1,
  },
  emotionCardName: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emotionCardDetail: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  emotionCardPct: {
    fontWeight: '700',
    color: colors.textSecondary,
  },

  /* 5. Grafik Kapsul Mingguan */
  weeklyColumnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  weeklyColItem: {
    flex: 1,
    alignItems: 'center',
  },
  colDayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 2,
  },
  colDateLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 6,
  },
  capsuleTrack: {
    width: 36,
    height: 72,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  capsuleEmoji: {
    width: 26,
    height: 26,
  },
  capsuleEmptyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.borderMedium,
  },
  colStatusText: {
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
  },

  /* Kalender Mood Bulanan (Berdasarkan Referensi May 2026 & Brief C05) */
  calendarContainer: {
    paddingTop: 4,
  },
  calendarDayNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
    marginBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  calendarDayNameCol: {
    width: '14.28%',
    alignItems: 'center',
  },
  calendarDayNameText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
  },
  calendarCellWrapper: {
    width: '14.28%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
  },
  calendarCellTile: {
    width: 38,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  calendarCellToday: {
    borderColor: colors.brandBlue[500],
    borderWidth: 1.5,
  },
  calendarCellSelected: {
    borderColor: colors.brandBlue[600],
    borderWidth: 2,
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarDateNum: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  calendarDateNumToday: {
    fontWeight: '800',
    color: colors.brandBlue[700],
  },
  calendarDateNumSelected: {
    fontWeight: '800',
  },
  calendarCellEmoji: {
    width: 25,
    height: 25,
  },
  calendarLegendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 10,
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  calendarDetailWrap: {
    marginTop: spacing.sm,
  },
  calendarDetailCard: {
    borderWidth: 1.5,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
  },
  calendarDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  calendarDetailEmoji: {
    width: 32,
    height: 32,
  },
  calendarDetailHeaderTextWrap: {
    flex: 1,
  },
  calendarDetailTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  calendarDetailSubEmotion: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 1,
  },
  calendarDetailTime: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  calendarDetailStoryWrap: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.06)',
  },
  calendarDetailStoryLabel: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  calendarDetailStoryText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  calendarDetailStoryEmpty: {
    fontStyle: 'normal',
    color: colors.textMuted,
  },
  calendarDetailEmptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: 12,
  },
  calendarDetailEmptyIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarDetailEmptyTextWrap: {
    flex: 1,
  },
  calendarDetailEmptyTitle: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  calendarDetailEmptySub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* Grafik Tahunan */
  yearlyScrollTrack: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    paddingHorizontal: 4,
    gap: 8,
  },
  yearlyColItem: {
    alignItems: 'center',
    width: 32,
  },
  yearlyBarTrack: {
    width: 24,
    height: 72,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    marginVertical: 6,
  },
  barFillCapsule: {
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    paddingTop: 3,
  },
  miniBarEmoji: {
    width: 16,
    height: 16,
  },
  yearlyCountLabel: {
    fontSize: 10,
    color: colors.textMuted,
  },

  /* 6. Refleksi Periode */
  reflectionSection: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.lg,
  },
  reflectionTitle: {
    fontSize: 14.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  reflectionSubtitle: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  reflectionBody: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },

  /* 7. Action Row */
  actionRow: {
    marginBottom: spacing.lg,
  },
});

