import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  Smile,
  ArrowRight,
  Sparkles,
  Clock,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';

export const MoodCard: React.FC = () => {
  const { dailyMoodStatus, todayMood, navigateTo, user } = useApp();

  // Helper aset emoji sesuai emosi utama
  const getEmotionImage = (emotion: PrimaryEmotion) => {
    switch (emotion) {
      case 'Bahagia':
        return require('../../../assets/emojis/emoji_bahagia.png');
      case 'Sedih':
        return require('../../../assets/emojis/emoji_sedih.png');
      case 'Marah':
        return require('../../../assets/emojis/emoji_marah.png');
      case 'Biasa Saja':
      case 'Tenang':
      default:
        return require('../../../assets/emojis/emoji_biasa.png');
    }
  };

  // Helper warna tema emosi
  const getEmotionTheme = (emotion: PrimaryEmotion) => {
    switch (emotion) {
      case 'Bahagia':
        return {
          bgColor: colors.accentAmber[50],
          borderColor: colors.accentAmber[500],
          textColor: colors.accentAmber[600],
          badgeBg: '#FEF3C7',
          badgeText: '#92400E',
        };
      case 'Sedih':
        return {
          bgColor: colors.brandBlue[50],
          borderColor: colors.brandBlue[500],
          textColor: colors.brandBlue[600],
          badgeBg: '#DBEAFE',
          badgeText: '#1E40AF',
        };
      case 'Marah':
        return {
          bgColor: colors.crisis.dangerBg,
          borderColor: colors.crisis.dangerBorder,
          textColor: colors.crisis.dangerText,
          badgeBg: '#FEE2E2',
          badgeText: '#991B1B',
        };
      case 'Biasa Saja':
      case 'Tenang':
      default:
        return {
          bgColor: '#FDFBF7',
          borderColor: '#D8C4B0',
          textColor: '#8A6642',
          badgeBg: '#F5EDE4',
          badgeText: '#705030',
        };
    }
  };

  /* -------------------------------------------------------------
   * KONDISI 1: MOOD CHECK-IN COMPLETED
   * Pengguna sudah menyelesaikan dan menyimpan mood hari ini secara riil
   * ------------------------------------------------------------- */
  if (dailyMoodStatus === 'completed' && todayMood && todayMood.primaryEmotion) {
    const theme = getEmotionTheme(todayMood.primaryEmotion);
    const subEmotion =
      todayMood.secondaryEmotions && todayMood.secondaryEmotions.length > 0
        ? todayMood.secondaryEmotions[0]
        : null;

    return (
      <Card variant="surface" style={styles.card}>
        {/* Status Header: Menunjukkan status mood hari ini sudah tercatat */}
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <View style={styles.indicatorDotGreen} />
            <Text style={styles.headerTitle}>Mood Hari Ini Tercatat</Text>
          </View>
          <View style={styles.timeBadgeWrap}>
            <Clock size={12} color={colors.textMuted} style={{ marginRight: 3 }} />
            <Text style={styles.timeText}>{todayMood.timeString}</Text>
          </View>
        </View>

        {/* Logged Emotion Summary Row */}
        <View style={[styles.loggedCard, { backgroundColor: theme.bgColor }]}>
          <View style={[styles.emojiHalo, { borderColor: theme.borderColor }]}>
            <Image
              source={getEmotionImage(todayMood.primaryEmotion)}
              style={styles.loggedEmojiImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.emotionInfo}>
            <View style={styles.emotionTitleRow}>
              <Text style={[styles.emotionCategoryName, { color: theme.textColor }]}>
                {todayMood.primaryEmotion}
              </Text>
              {subEmotion ? (
                <View style={[styles.subEmotionPill, { backgroundColor: theme.badgeBg }]}>
                  <Text style={[styles.subEmotionPillText, { color: theme.badgeText }]}>
                    #{subEmotion}
                  </Text>
                </View>
              ) : null}
            </View>

              {todayMood.note && todayMood.note.trim() ? (
                <Text style={styles.emotionNoteText} numberOfLines={2}>
                  "{todayMood.note.trim()}"
                </Text>
              ) : null}
          </View>
        </View>

        {/* Action Row: Akses melihat afirmasi/detail & statistik */}
        <View style={styles.completedActionsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigateTo('daily_mood_checkin', { initialStage: 3, viewOnly: true })
            }
            style={styles.affirmationButton}
          >
            <Sparkles size={14} color={colors.surface} />
            <Text style={styles.affirmationButtonText}>Lihat Detail & Afirmasi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigateTo('mood_stats')}
            style={styles.statsButton}
          >
            <Text style={styles.statsButtonText}>Statistik</Text>
            <ArrowRight size={13} color={colors.brandBlue[600]} />
          </TouchableOpacity>
        </View>

        {/* Perbarui Catatan Link */}
        <View style={styles.updateRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigateTo('daily_mood_checkin', { initialStage: 1 })
            }
            style={styles.updateLink}
          >
            <RotateCcw size={12} color={colors.textMuted} style={{ marginRight: 4 }} />
            <Text style={styles.updateLinkText}>Perbarui suasana hati jika berubah</Text>
          </TouchableOpacity>
        </View>
      </Card>
    );
  }

  /* -------------------------------------------------------------
   * KONDISI 2: MOOD CHECK-IN SKIPPED
   * Pengguna melewati proses Daily Mood Check-in
   * ------------------------------------------------------------- */
  if (dailyMoodStatus === 'skipped') {
    const firstName = user?.nickname || (user?.name ? user.name.split(' ')[0] : 'Teman');

    return (
      <Card variant="tintAmber" style={[styles.card, styles.skippedCard]}>
        {/* Header Status */}
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <View style={styles.indicatorDotAmber} />
            <Text style={[styles.headerTitle, { color: colors.accentAmber[600] }]}>
              Check-in Belum Selesai
            </Text>
          </View>
          <Badge label="Dilewati" variant="amber" />
        </View>

        {/* Mascot & Sapaan Personal Row */}
        <View style={styles.skippedContentRow}>
          <View style={styles.mascotAvatarWrap}>
            <Image
              source={require('../../../assets/mascot/mascot_waving_clean.png')}
              style={styles.mascotThumb}
              resizeMode="contain"
            />
          </View>

          <View style={styles.skippedTextWrap}>
            <Text style={styles.skippedGreetingTitle}>
              Hai {firstName}! Thoriq tetap di sini 👋
            </Text>
            <Text style={styles.skippedPromptText}>
              Belum ada catatan mood yang tersimpan karena kamu melewati tahap check-in. Luangkan 1 menit jika hatimu sudah siap untuk mulai mencatat kabarmu.
            </Text>
          </View>
        </View>

        {/* CTA: Akses untuk memulai check-in */}
        <Button
          title="Mulai Catat Mood"
          variant="primary"
          size="md"
          fullWidth
          iconRight={<ArrowRight size={16} color={colors.surface} />}
          onPress={() => navigateTo('daily_mood_checkin')}
          style={styles.ctaButton}
        />
      </Card>
    );
  }

  /* -------------------------------------------------------------
   * KONDISI 3: MOOD CHECK-IN NOT STARTED
   * Pengguna belum memulai check-in hari ini
   * ------------------------------------------------------------- */
  return (
    <Card variant="tintBlue" style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Smile size={18} color={colors.brandBlue[600]} />
          <Text style={[styles.headerTitle, { color: colors.brandBlue[700] }]}>
            Daily Mood Check-in
          </Text>
        </View>
        <Badge label="Belum Diisi" variant="blue" />
      </View>

      <Text style={styles.notStartedHeading}>
        Belum ada catatan mood hari ini
      </Text>

      <Text style={styles.notStartedDesc}>
        Kenali dan sadari emosimu satu hari dalam satu waktu. Setiap perasaanmu berharga dan layak didengarkan.
      </Text>

      {/* 4 Emojis Quick Preview Row (Bahagia, Sedih, Marah, Biasa Saja) */}
      <View style={styles.emojiPreviewRow}>
        <View style={styles.previewEmojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_bahagia.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Bahagia</Text>
        </View>

        <View style={styles.previewEmojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_sedih.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Sedih</Text>
        </View>

        <View style={styles.previewEmojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_marah.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Marah</Text>
        </View>

        <View style={styles.previewEmojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_biasa.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Biasa Saja</Text>
        </View>
      </View>

      {/* CTA Button: Memulai Daily Mood Check-in */}
      <Button
        title="Mulai Catat Mood"
        variant="primary"
        size="md"
        fullWidth
        iconRight={<ArrowRight size={16} color={colors.surface} />}
        onPress={() => navigateTo('daily_mood_checkin')}
        style={styles.ctaButton}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
    marginBottom: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  indicatorDotGreen: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.feedback.successText,
  },
  indicatorDotAmber: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.accentAmber[500],
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  timeBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },

  /* Completed State Styles */
  loggedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  emojiHalo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  loggedEmojiImage: {
    width: 38,
    height: 38,
  },
  emotionInfo: {
    flex: 1,
  },
  emotionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 3,
  },
  emotionCategoryName: {
    fontSize: 15,
    fontWeight: '700',
  },
  subEmotionPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  subEmotionPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  emotionNoteText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  completedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  affirmationButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue[600],
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: 6,
  },
  affirmationButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
  },
  statsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandBlue[50],
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.brandBlue[100],
  },
  statsButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  updateRow: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  updateLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  updateLinkText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },

  /* Skipped State Styles */
  skippedCard: {
    borderColor: colors.accentAmber[100],
  },
  skippedContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  mascotAvatarWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mascotThumb: {
    width: 44,
    height: 44,
  },
  skippedTextWrap: {
    flex: 1,
  },
  skippedGreetingTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  skippedPromptText: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    fontSize: 11.5,
    lineHeight: 16,
  },

  /* Not Started State Styles */
  notStartedHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  notStartedDesc: {
    ...typography.bodySmall,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.md,
  },
  emojiPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  previewEmojiItem: {
    alignItems: 'center',
    gap: 4,
  },
  miniEmojiImage: {
    width: 32,
    height: 32,
  },
  miniEmojiLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  ctaButton: {
    marginTop: 2,
  },
});
