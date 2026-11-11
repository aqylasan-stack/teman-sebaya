import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Bell, Clock, ArrowRight } from 'lucide-react-native';
import { colors, spacing } from '../../theme';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';
import { HomePattern } from './patterns/FeatureHeroPatterns';

interface MoodOption {
  key: PrimaryEmotion;
  label: string;
  image: any;
  bgColor: string;
  borderColor: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    key: 'Bahagia',
    label: 'Bahagia',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    bgColor: '#FEF9C3', // Warm sunny yellow tint
    borderColor: '#FDE047',
  },
  {
    key: 'Biasa Saja',
    label: 'Biasa Saja',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    bgColor: '#F5EDE4', // Calm warm beige tint
    borderColor: '#D8C5B0',
  },
  {
    key: 'Sedih',
    label: 'Sedih',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    bgColor: '#DBEAFE', // Soft blue tint
    borderColor: '#93C5FD',
  },
  {
    key: 'Marah',
    label: 'Marah',
    image: require('../../../assets/emojis/emoji_marah.png'),
    bgColor: '#FEE2E2', // Soft coral red tint
    borderColor: '#FCA5A5',
  },
];

/**
 * Unified Personal Greeting Hero for Homepage
 * Features:
 * 1. Personal Greeting: Circle user photo / initials on left, "Hai 👋" + user nickname, white circular bell button on right.
 * 2. Main Greeting / Hero Headline: Local time-based greeting + bold prominent headline "Bagaimana kabar dan perasaanmu hari ini?".
 * 3. Daily Mood Interaction: Replaces search bar with cohesive 4-emotion interactive dock or actual recorded mood summary.
 */
export const HomeHero: React.FC = () => {
  const { user, todayMood, dailyMoodStatus, navigateTo, switchTab } = useApp();

  // Dynamic time-based greeting word based on local device time
  const getGreetingWord = (): string => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return 'Selamat pagi';
    if (hour >= 11 && hour < 15) return 'Selamat siang';
    if (hour >= 15 && hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  const displayName =
    user?.nickname ||
    (user?.name ? user.name.split(' ')[0] : null) ||
    (user?.pseudonym ? user.pseudonym.split(' ')[0] : 'Sobat');

  const greetingTitle = `${getGreetingWord()}, ${displayName}!`;

  // Helper aset emoji untuk mood yang sudah tercatat
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

  const getEmotionTheme = (emotion: PrimaryEmotion) => {
    switch (emotion) {
      case 'Bahagia':
        return {
          bg: '#FEF9C3',
          border: '#FDE047',
        };
      case 'Sedih':
        return {
          bg: '#DBEAFE',
          border: '#93C5FD',
        };
      case 'Marah':
        return {
          bg: '#FEE2E2',
          border: '#FCA5A5',
        };
      case 'Biasa Saja':
      case 'Tenang':
      default:
        return {
          bg: '#F5EDE4',
          border: '#D8C5B0',
        };
    }
  };

  // Navigasi langsung dengan emosi yang dipilih
  const handleSelectEmotion = (emotion: PrimaryEmotion) => {
    navigateTo('daily_mood_checkin', {
      selectedEmotion: emotion,
      initialStage: 2,
    });
  };

  const isCheckedIn =
    dailyMoodStatus === 'completed' && todayMood && todayMood.primaryEmotion;

  const currentTheme = isCheckedIn
    ? getEmotionTheme(todayMood.primaryEmotion)
    : null;

  return (
    <View style={styles.heroWrapper}>
      {/* Background Line-Art Pattern */}
      <HomePattern opacity={0.16} />

      {/* ============================================================== */}
      {/* 1. TOP IDENTITY BAR: App Logo (Left) & Bell (Right)            */}
      {/* ============================================================== */}
      <View style={styles.identityRow}>
        {/* Left: Official TEMAN SEBAYA Die-Cut Sticker Logo */}
        <View style={styles.brandRow}>
          <Image
            source={require('../../../assets/branding/logo_transparent.png')}
            style={styles.brandLogo}
            resizeMode="contain"
            accessibilityLabel="Logo Teman Sebaya"
          />
        </View>

        {/* Right: Circular Notification Bell Button */}
        <TouchableOpacity
          activeOpacity={0.78}
          onPress={() => navigateTo('notification_settings')}
          style={styles.notificationBtn}
          accessibilityRole="button"
          accessibilityLabel="Buka Pengaturan Notifikasi"
        >
          <Bell size={19} color="#2563EB" strokeWidth={2.0} />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>

      {/* ============================================================== */}
      {/* 2. HERO HEADLINE: Dynamic Time Greeting + Bold Welcome Prompt  */}
      {/* ============================================================== */}
      <View style={styles.headlineBlock}>
        <Text style={styles.timeGreetingText}>{greetingTitle}</Text>
        <Text style={styles.mainHeadlineText}>
          Bagaimana kabar dan perasaanmu hari ini?
        </Text>
      </View>

      {/* ============================================================== */}
      {/* 3. INTEGRATED DAILY MOOD SECTION (Replaces Search Bar)        */}
      {/* ============================================================== */}
      {isCheckedIn ? (
        /* KONDISI A: SUDAH CHECK-IN -> Tampilkan Kartu Status Ringkas & Elegan */
        <View style={styles.moodCardContainer}>
          <View style={styles.completedHeaderRow}>
            <View style={styles.statusIndicatorRow}>
              <View style={styles.greenIndicatorDot} />
              <Text style={styles.completedStatusTitle}>Mood Hari Ini Tercatat</Text>
            </View>
            <View style={styles.timeBadgeRow}>
              <Clock size={11} color="#64748B" style={{ marginRight: 4 }} />
              <Text style={styles.timeBadgeText}>
                {todayMood.timeString || 'Hari Ini'}
              </Text>
            </View>
          </View>

          <View style={styles.completedContentRow}>
            <View
              style={[
                styles.completedEmojiCircle,
                {
                  backgroundColor: currentTheme?.bg || '#FEF9C3',
                  borderColor: currentTheme?.border || '#FDE047',
                },
              ]}
            >
              <Image
                source={getEmotionImage(todayMood.primaryEmotion)}
                style={styles.completedEmojiImg}
                resizeMode="contain"
              />
            </View>

            <View style={styles.completedTextCol}>
              <Text style={styles.completedPrimaryText}>
                Kamu merasa{' '}
                <Text style={styles.primaryEmotionHighlight}>
                  {todayMood.primaryEmotion}
                </Text>
              </Text>
              <Text style={styles.completedSubText} numberOfLines={1}>
                {todayMood.secondaryEmotions && todayMood.secondaryEmotions.length > 0
                  ? todayMood.secondaryEmotions.join(' · ')
                  : todayMood.note
                  ? todayMood.note
                  : 'Refleksi tersimpan di kalender'}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigateTo('daily_mood_checkin', {
                  selectedEmotion: todayMood.primaryEmotion,
                })
              }
              style={styles.modifyPillBtn}
              accessibilityRole="button"
              accessibilityLabel="Ubah catatan mood hari ini"
            >
              <Text style={styles.modifyPillText}>Ubah</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* KONDISI B: BELUM CHECK-IN / MELEWATI -> Tampilkan 4 Emosi Natural Terintegrasi */
        <View style={styles.moodCardContainer}>
          <View style={styles.dockPromptRow}>
            <Text style={styles.dockPromptText}>
              Pilih emosimu sekarang:
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => switchTab('mood')}
              style={styles.dockDetailLink}
              accessibilityLabel="Buka Kalender Mood Lengkap"
            >
              <Text style={styles.dockDetailLinkText}>Catat Lengkap</Text>
              <ArrowRight
                size={12}
                color={colors.brandBlue[600]}
                style={{ marginLeft: 3 }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.emotionsRow}>
            {MOOD_OPTIONS.map((item) => (
              <TouchableOpacity
                key={item.key}
                activeOpacity={0.75}
                onPress={() => handleSelectEmotion(item.key)}
                style={styles.emotionItemBtn}
                accessibilityRole="button"
                accessibilityLabel={`Catat mood ${item.label}`}
              >
                <Image
                  source={item.image}
                  style={styles.dockEmojiImage}
                  resizeMode="contain"
                />
                <Text style={styles.emotionLabelText} numberOfLines={1}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  /* Hero Main Container: Brand Blue with Pattern & Curved Bottom Edges */
  heroWrapper: {
    backgroundColor: colors.brandBlue[600], // #2563EB - Samakan dengan warna tombol brand
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 22,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },

  /* 1. Identity Bar */
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 92,
    height: 52,
  },

  /* Notification Button: Clean Elevated Circular Button */
  notificationBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 11,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  /* 2. Hero Headline */
  headlineBlock: {
    marginBottom: 20,
  },
  timeGreetingText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.90)',
    marginBottom: 6,
    letterSpacing: 0.1,
  },
  mainHeadlineText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 32,
    letterSpacing: -0.4,
  },

  /* 3. Daily Mood Integrated Card Container */
  moodCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 14,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  /* Belum Check-in Dock Styles */
  dockPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dockPromptText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  dockDetailLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  dockDetailLinkText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
  emotionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  emotionItemBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dockEmojiImage: {
    width: 34,
    height: 34,
    marginBottom: 6,
  },
  emotionLabelText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
  },

  /* Sudah Check-in Completed Card Styles */
  completedHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  statusIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenIndicatorDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  completedStatusTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  timeBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeBadgeText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  completedContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedEmojiCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    marginRight: 12,
  },
  completedEmojiImg: {
    width: 30,
    height: 30,
  },
  completedTextCol: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  completedPrimaryText: {
    fontSize: 14.5,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 2,
  },
  primaryEmotionHighlight: {
    color: '#2563EB',
    fontWeight: '800',
  },
  completedSubText: {
    fontSize: 11.5,
    color: '#64748B',
  },
  modifyPillBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  modifyPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },
});
