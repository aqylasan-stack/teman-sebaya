import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  Smile,
  ArrowRight,
  Clock,
  RotateCcw,
  Sparkles,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';

export const MoodCard: React.FC = () => {
  const { dailyMoodStatus, todayMood, navigateTo, switchTab } = useApp();

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
   * KONDISI B: PENGGUNA SUDAH CHECK-IN
   * Menampilkan data emosi aktual yang dipilih pengguna
   * ------------------------------------------------------------- */
  if (dailyMoodStatus === 'completed' && todayMood && todayMood.primaryEmotion) {
    const theme = getEmotionTheme(todayMood.primaryEmotion);
    const subEmotion =
      todayMood.secondaryEmotions && todayMood.secondaryEmotions.length > 0
        ? todayMood.secondaryEmotions[0]
        : null;

    return (
      <View style={[styles.card, styles.completedCard]}>
        {/* Status Header: Menunjukkan status mood hari ini sudah tercatat */}
        <View style={styles.headerRow}>
          <View style={styles.titleWrap}>
            <View style={styles.indicatorDotGreen} />
            <Text style={styles.headerTitle}>Mood Hari Ini Tercatat</Text>
          </View>
          <View style={styles.timeBadgeWrap}>
            <Clock size={12} color="#64748B" style={{ marginRight: 4 }} />
            <Text style={styles.timeText}>{todayMood.timeString || 'Hari Ini'}</Text>
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

        {/* Action Row: Akses melihat detail refleksi */}
        <View style={styles.completedActionsRow}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigateTo('daily_mood_checkin', { initialStage: 3, viewOnly: true })
            }
            style={styles.detailButton}
            accessibilityRole="button"
            accessibilityLabel="Lihat Detail Refleksi"
          >
            <Sparkles size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
            <Text style={styles.detailButtonText}>Lihat Detail Refleksi</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigateTo('daily_mood_checkin', { initialStage: 1 })
            }
            style={styles.updateLink}
            accessibilityRole="button"
            accessibilityLabel="Perbarui suasana hati"
          >
            <RotateCcw size={12} color="#64748B" style={{ marginRight: 4 }} />
            <Text style={styles.updateLinkText}>Perbarui</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  /* -------------------------------------------------------------
   * KONDISI A & C: PENGGUNA BELUM / MELEWATI CHECK-IN
   * Pendekatan visual Soft Blue sesuai identitas aplikasi Teman Sebaya
   * ------------------------------------------------------------- */
  return (
    <View style={[styles.card, styles.softBlueCard]}>
      {/* Top Meta Label */}
      <View style={styles.cardTopRow}>
        <View style={styles.tagPill}>
          <Smile size={13} color="#2563EB" style={{ marginRight: 5 }} />
          <Text style={styles.tagText}>Teman Mood</Text>
        </View>
      </View>

      {/* Main Heading & Description */}
      <Text style={styles.headingTitle}>Bagaimana perasaanmu hari ini?</Text>
      <Text style={styles.headingDesc}>
        Luangkan sedikit waktu untuk mengenali apa yang sedang kamu rasakan.
      </Text>

      {/* 4 Emojis Friendly Preview (Bahagia, Tenang, Sedih, Marah) */}
      <View style={styles.emojiPreviewRow}>
        <View style={styles.emojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_bahagia.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Bahagia</Text>
        </View>
        <View style={styles.emojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_biasa.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Tenang</Text>
        </View>
        <View style={styles.emojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_sedih.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Sedih</Text>
        </View>
        <View style={styles.emojiItem}>
          <Image
            source={require('../../../assets/emojis/emoji_marah.png')}
            style={styles.miniEmojiImage}
            resizeMode="contain"
          />
          <Text style={styles.miniEmojiLabel}>Marah</Text>
        </View>
      </View>

      {/* CTA Button: Check-in Mood */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => switchTab('mood')}
        style={styles.ctaButton}
        accessibilityRole="button"
        accessibilityLabel="Check-in Mood"
      >
        <Text style={styles.ctaButtonText}>Check-in Mood</Text>
        <ArrowRight size={16} color="#FFFFFF" style={{ marginLeft: 6 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  softBlueCard: {
    backgroundColor: '#EFF6FF', // Soft Blue background (Design System 2.2)
    borderColor: '#BFDBFE',     // Brand Blue 200
  },
  completedCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },

  /* Uncompleted State */
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 10,
    paddingVertical: 3.5,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  headingTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
    marginBottom: 4,
  },
  headingDesc: {
    fontSize: 12.5,
    color: '#475569',
    lineHeight: 18,
    marginBottom: 14,
  },
  emojiPreviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  emojiItem: {
    alignItems: 'center',
    flex: 1,
  },
  miniEmojiImage: {
    width: 32,
    height: 32,
    marginBottom: 3,
  },
  miniEmojiLabel: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#64748B',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    height: 44,
    borderRadius: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaButtonText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  /* Completed State */
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicatorDotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  headerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#047857',
  },
  timeBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  loggedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 14,
    marginBottom: 10,
  },
  emojiHalo: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  loggedEmojiImage: {
    width: 34,
    height: 34,
  },
  emotionInfo: {
    flex: 1,
  },
  emotionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  emotionCategoryName: {
    fontSize: 15,
    fontWeight: '700',
  },
  subEmotionPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  subEmotionPillText: {
    fontSize: 11,
    fontWeight: '600',
  },
  emotionNoteText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#475569',
    lineHeight: 16,
    marginTop: 2,
  },
  completedActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 2,
  },
  detailButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    height: 40,
    borderRadius: 12,
  },
  detailButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  updateLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  updateLinkText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
});
