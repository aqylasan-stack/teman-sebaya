import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Plus, ArrowRight, Smile, X, ChevronRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { MoodWeeklyChart } from '../../components/mood/MoodWeeklyChart';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion, MoodEntry } from '../../types';

// 4 Emosi utama aplikasi
const QUICK_EMOTIONS: {
  name: PrimaryEmotion;
  label: string;
  image: any;
}[] = [
  {
    name: 'Bahagia',
    label: 'Bahagia',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
  },
  {
    name: 'Sedih',
    label: 'Sedih',
    image: require('../../../assets/emojis/emoji_sedih.png'),
  },
  {
    name: 'Marah',
    label: 'Marah',
    image: require('../../../assets/emojis/emoji_marah.png'),
  },
  {
    name: 'Biasa Saja',
    label: 'Biasa Saja',
    image: require('../../../assets/emojis/emoji_biasa.png'),
  },
];

const EMOTION_THEMES: Record<
  string,
  {
    label: string;
    color: string;
    softBg: string;
    borderColor: string;
    textColor: string;
    image: any;
  }
> = {
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
    softBg: '#F6FAFF',
    borderColor: '#BFDBFE',
    textColor: '#1E40AF',
    image: require('../../../assets/emojis/emoji_sedih.png'),
  },
  Marah: {
    label: 'Marah',
    color: '#DC2626',
    softBg: '#FEF7F7',
    borderColor: '#FECACA',
    textColor: '#991B1B',
    image: require('../../../assets/emojis/emoji_marah.png'),
  },
  'Biasa Saja': {
    label: 'Biasa Saja',
    color: '#8C6E54',
    softBg: '#FDFBF9',
    borderColor: '#E8DCCE',
    textColor: '#705030',
    image: require('../../../assets/emojis/emoji_biasa.png'),
  },
  Tenang: {
    label: 'Biasa Saja',
    color: '#8C6E54',
    softBg: '#FDFBF9',
    borderColor: '#E8DCCE',
    textColor: '#705030',
    image: require('../../../assets/emojis/emoji_biasa.png'),
  },
};

const DEFAULT_THEME = EMOTION_THEMES['Biasa Saja'];

export const MoodScreen: React.FC = () => {
  const {
    moodEntries,
    weeklyStats,
    navigateTo,
    todayMood,
    dailyMoodStatus,
  } = useApp();

  // State untuk modal detail catatan refleksi yang diklik
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const isCheckedInToday = dailyMoodStatus === 'completed' && Boolean(todayMood);
  const todayTheme = todayMood
    ? EMOTION_THEMES[todayMood.primaryEmotion] || DEFAULT_THEME
    : null;

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

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      {/* 1. Header Layar: Sederhana & Terarah */}
      <View style={styles.header}>
        <View style={styles.headerTextWrap}>
          <Text style={styles.title}>Teman Mood</Text>
          <Text style={styles.subtitle}>
            Ruang hening untuk mengenali dan merawat perasaanmu.
          </Text>
        </View>

        {!isCheckedInToday && (
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.actionBtnPrimary}
            onPress={() => navigateTo('daily_mood_checkin')}
          >
            <Plus size={15} color="#FFFFFF" />
            <Text style={styles.actionBtnPrimaryText}>Catat Mood</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 2. Mood Hari Ini: Visual Emphasis dengan Soft Tinted Background & Emoji Besar Standalone */}
      {isCheckedInToday && todayMood && todayTheme ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setSelectedEntry(todayMood)}
          style={[
            styles.todayCard,
            {
              backgroundColor: todayTheme.softBg,
              borderColor: todayTheme.borderColor,
            },
          ]}
        >
          {/* Card Header: Eyebrow + Action */}
          <View style={styles.todayCardHeader}>
            <Text style={[styles.todayEyebrow, { color: todayTheme.textColor }]}>
              MOOD HARI INI
            </Text>
            <View style={styles.todayHeaderRight}>
              <Text style={styles.todayEditLink}>Lihat Detail</Text>
              <ChevronRight size={13} color={colors.brandBlue[600]} />
            </View>
          </View>

          {/* Hero Row: Emoji Besar Standalone (68x68) + Info Komposisi Seimbang */}
          <View style={styles.todayHeroRow}>
            <Image
              source={todayTheme.image}
              style={styles.todayLargeEmoji}
              resizeMode="contain"
            />

            <View style={styles.todayInfoCol}>
              <Text
                style={[
                  styles.todayEmotionTitle,
                  { color: todayTheme.color },
                ]}
              >
                {todayTheme.label}
              </Text>

              {todayMood.secondaryEmotions.length > 0 && (
                <Text style={styles.todaySubEmotionText}>
                  {todayMood.secondaryEmotions[0]}
                </Text>
              )}

              <Text style={styles.todayTimeText}>
                Tercatat pukul {todayMood.timeString}
              </Text>
            </View>
          </View>

          {/* Catatan Refleksi Pengguna dalam Wadah Halus */}
          {Boolean(todayMood.note && todayMood.note.trim()) && (
            <View style={styles.todayNoteWrap}>
              <Text style={styles.todayNoteText}>“{todayMood.note}”</Text>
            </View>
          )}
        </TouchableOpacity>
      ) : (
        /* Keadaan Belum Check-in Hari Ini: Soft Card Interaktif */
        <View style={styles.todayUncheckedCard}>
          <Text style={styles.promptEyebrow}>HARI INI</Text>
          <Text style={styles.promptHeadline}>
            Bagaimana suasana hatimu hari ini?
          </Text>
          <Text style={styles.promptSubtext}>
            Pilih satu emosi yang paling menggambarkan perasaanmu:
          </Text>

          {/* 4 Emoji Standalone Touchables */}
          <View style={styles.quickEmojisRow}>
            {QUICK_EMOTIONS.map((item) => (
              <TouchableOpacity
                key={item.name}
                activeOpacity={0.7}
                style={styles.quickEmojiItem}
                onPress={() =>
                  navigateTo('daily_mood_checkin', {
                    selectedEmotion: item.name,
                    initialStage: 2,
                  })
                }
              >
                <Image
                  source={item.image}
                  style={styles.quickEmojiImg}
                  resizeMode="contain"
                />
                <Text style={styles.quickEmojiLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* 3. Ritme Emosi 7 Hari & Distribusi Emosi */}
      <View style={styles.sectionWrap}>
        <MoodWeeklyChart stats={enhancedWeeklyStats} />
      </View>

      {/* 4. Jurnal Refleksi: Timeline Jurnal dengan Entri Interaktif (Dapat Diklik) */}
      <View style={styles.journalSection}>
        <View style={styles.journalHeaderRow}>
          <View>
            <Text style={styles.journalTitle}>Jurnal Refleksi</Text>
            <Text style={styles.journalSubtitle}>
              {moodEntries.length} catatan tersimpan
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.analysisLink}
            onPress={() => navigateTo('mood_analysis')}
          >
            <Text style={styles.analysisLinkText}>Analisis Lengkap</Text>
            <ArrowRight size={13} color={colors.brandBlue[600]} />
          </TouchableOpacity>
        </View>

        {moodEntries.length === 0 ? (
          <View style={styles.emptyStateWrap}>
            <Smile size={28} color={colors.textMuted} />
            <Text style={styles.emptyStateTitle}>
              Belum ada catatan refleksi
            </Text>
            <Text style={styles.emptyStateDesc}>
              Catatan harianmu akan tersusun rapi di sini layaknya jurnal pribadi.
            </Text>
          </View>
        ) : (
          <View style={styles.timelineList}>
            {moodEntries.map((entry) => {
              const theme =
                EMOTION_THEMES[entry.primaryEmotion] || DEFAULT_THEME;

              return (
                <TouchableOpacity
                  key={entry.id}
                  activeOpacity={0.75}
                  onPress={() => setSelectedEntry(entry)}
                  style={styles.journalEntryCard}
                >
                  {/* Baris Tanggal & Waktu + Indikator Panah */}
                  <View style={styles.entryHeaderRow}>
                    <Text style={styles.entryDateText}>
                      {entry.dateString} · {entry.timeString}
                    </Text>
                    <ChevronRight size={14} color={colors.textMuted} />
                  </View>

                  {/* Baris Mood & Sub-emosi (Hanya 1 sub-emosi tunggal) */}
                  <View style={styles.entryMoodRow}>
                    <Image
                      source={theme.image}
                      style={styles.entryEmoji}
                      resizeMode="contain"
                    />
                    <Text style={styles.entryEmotionTitle}>
                      {theme.label}
                      {entry.secondaryEmotions.length > 0 && (
                        <Text style={styles.entrySubEmotions}>
                          {' '}
                          · {entry.secondaryEmotions[0]}
                        </Text>
                      )}
                    </Text>
                  </View>

                  {/* Isi Refleksi / Cerita Pengguna */}
                  {Boolean(entry.note && entry.note.trim()) && (
                    <Text
                      style={styles.entryStoryText}
                      numberOfLines={3}
                    >
                      {entry.note}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>

      {/* 5. Modal Detail Catatan Refleksi yang Dapat Diklik */}
      {selectedEntry && (
        <Modal
          visible={Boolean(selectedEntry)}
          onClose={() => setSelectedEntry(null)}
          animationType="none"
        >
          {(() => {
            const theme =
              EMOTION_THEMES[selectedEntry.primaryEmotion] || DEFAULT_THEME;
            const isTodayEntry = todayMood?.id === selectedEntry.id;

          return (
            <View style={styles.modalContent}>
              {/* Header Modal */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalDateText}>
                  {selectedEntry.dateString} · {selectedEntry.timeString}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setSelectedEntry(null)}
                  style={styles.modalCloseBtn}
                >
                  <X size={18} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Banner Emosi & Sub-emosi */}
              <View
                style={[
                  styles.modalEmotionBanner,
                  {
                    backgroundColor: theme.softBg,
                    borderColor: theme.borderColor,
                  },
                ]}
              >
                <Image
                  source={theme.image}
                  style={styles.modalEmoji}
                  resizeMode="contain"
                />
                <View style={styles.modalEmotionInfo}>
                  <Text style={[styles.modalEmotionTitle, { color: theme.color }]}>
                    {theme.label}
                  </Text>
                  {selectedEntry.secondaryEmotions.length > 0 && (
                    <Text style={styles.modalSubEmotionText}>
                      {selectedEntry.secondaryEmotions[0]}
                    </Text>
                  )}
                </View>
              </View>

              {/* Isi Lengkap Cerita Refleksi */}
              <View style={styles.modalStorySection}>
                <Text style={styles.modalStoryLabel}>Cerita Refleksi:</Text>
                <Text style={styles.modalStoryBody}>
                  {selectedEntry.note && selectedEntry.note.trim()
                    ? selectedEntry.note
                    : 'Tidak ada catatan tertulis untuk hari ini.'}
                </Text>
              </View>

              {/* Tombol Aksi Bawah */}
              <View style={styles.modalActionsRow}>
                {isTodayEntry && (
                  <TouchableOpacity
                    style={styles.modalEditBtn}
                    activeOpacity={0.8}
                    onPress={() => {
                      setSelectedEntry(null);
                      navigateTo('daily_mood_checkin');
                    }}
                  >
                    <Text style={styles.modalEditBtnText}>Ubah Catatan</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.modalDismissBtn,
                    !isTodayEntry && { flex: 1 },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => setSelectedEntry(null)}
                >
                  <Text style={styles.modalDismissBtnText}>Tutup</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })()}
      </Modal>
      )}
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
    paddingRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
  },
  subtitle: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
  actionBtnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.brandBlue[600],
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.md,
  },
  actionBtnPrimaryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  todayCard: {
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    padding: spacing.lg,
    marginBottom: spacing.layout.sectionGap,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  todayCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  todayEyebrow: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  todayHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  todayEditLink: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  todayHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  todayLargeEmoji: {
    width: 68,
    height: 68,
  },
  todayInfoCol: {
    flex: 1,
  },
  todayEmotionTitle: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  todaySubEmotionText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 2,
  },
  todayTimeText: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 4,
  },
  todayNoteWrap: {
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    borderRadius: borderRadius.md,
    padding: 10,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.05)',
  },
  todayNoteText: {
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.textPrimary,
    fontStyle: 'italic',
  },
  todayUncheckedCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.lg,
    marginBottom: spacing.layout.sectionGap,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  promptEyebrow: {
    fontSize: 10.5,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: colors.textMuted,
    marginBottom: 4,
  },
  promptHeadline: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  promptSubtext: {
    fontSize: 12.5,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.md,
  },
  quickEmojisRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickEmojiItem: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 4,
  },
  quickEmojiImg: {
    width: 42,
    height: 42,
    marginBottom: 6,
  },
  quickEmojiLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sectionWrap: {
    marginBottom: spacing.layout.sectionGap,
  },
  journalSection: {
    paddingBottom: spacing.xl,
  },
  journalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  journalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  journalSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  analysisLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingVertical: 2,
  },
  analysisLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  emptyStateWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: 6,
  },
  emptyStateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 4,
  },
  emptyStateDesc: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    maxWidth: 260,
  },
  timelineList: {
    gap: spacing.md,
  },
  journalEntryCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  entryHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  entryDateText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: colors.textMuted,
  },
  entryMoodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  entryEmoji: {
    width: 26,
    height: 26,
  },
  entryEmotionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  entrySubEmotions: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  entryStoryText: {
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.textPrimary,
    marginTop: 2,
  },

  /* Modal Detail Styles */
  modalContent: {
    gap: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalDateText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
  },
  modalCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEmotionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  modalEmoji: {
    width: 40,
    height: 40,
  },
  modalEmotionInfo: {
    flex: 1,
  },
  modalEmotionTitle: {
    fontSize: 17,
    fontWeight: '800',
  },
  modalSubEmotionText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalStorySection: {
    backgroundColor: colors.surfaceAlt,
    padding: 14,
    borderRadius: borderRadius.md,
  },
  modalStoryLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  modalStoryBody: {
    fontSize: 13.5,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  modalActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  modalEditBtn: {
    flex: 1,
    backgroundColor: colors.brandBlue[600],
    paddingVertical: 10,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalEditBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalDismissBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
  },
  modalDismissBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
});
