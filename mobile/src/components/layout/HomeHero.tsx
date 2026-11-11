import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Bell, ArrowRight } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
  textColor: string;
}

const MOOD_OPTIONS: MoodOption[] = [
  {
    key: 'Bahagia',
    label: 'Bahagia',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    bgColor: '#FEF9C3', // Warm sunny yellow tint
    borderColor: '#FDE047',
    textColor: '#854D0E',
  },
  {
    key: 'Biasa Saja',
    label: 'Biasa Saja',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    bgColor: '#F5EDE4', // Calm warm beige tint
    borderColor: '#D8C5B0',
    textColor: '#705030',
  },
  {
    key: 'Sedih',
    label: 'Sedih',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    bgColor: '#EFF6FF', // Soft royal blue tint
    borderColor: '#BFDBFE',
    textColor: '#1E40AF',
  },
  {
    key: 'Marah',
    label: 'Marah',
    image: require('../../../assets/emojis/emoji_marah.png'),
    bgColor: '#FEE2E2', // Soft coral red tint
    borderColor: '#FECACA',
    textColor: '#991B1B',
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
  const insets = useSafeAreaInsets();
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
          bg: '#FEF08A',
          border: '#FACC15',
          textHighlight: '#B45309', // Warm amber-gold
          pillBg: '#FEF9C3',
          pillBorder: '#FDE047',
          pillText: '#854D0E',
          cardBorder: '#FEF08A',
        };
      case 'Sedih':
        return {
          bg: '#DBEAFE',
          border: '#93C5FD',
          textHighlight: '#2563EB', // Calm royal blue
          pillBg: '#EFF6FF',
          pillBorder: '#BFDBFE',
          pillText: '#1D4ED8',
          cardBorder: '#DBEAFE',
        };
      case 'Marah':
        return {
          bg: '#FECACA',
          border: '#F87171',
          textHighlight: '#DC2626', // Crimson red
          pillBg: '#FEE2E2',
          pillBorder: '#FECACA',
          pillText: '#991B1B',
          cardBorder: '#FECACA',
        };
      case 'Biasa Saja':
      case 'Tenang':
      default:
        return {
          bg: '#EDE3D5',
          border: '#CBB49C',
          textHighlight: '#705030', // Warm neutral earth brown
          pillBg: '#F5EDE4',
          pillBorder: '#D8C5B0',
          pillText: '#705030',
          cardBorder: '#E7DDD3',
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
    <View style={[styles.heroWrapper, { paddingTop: insets.top + 8 }]}>
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
        <View
          style={[
            styles.moodCardContainer,
            currentTheme?.cardBorder ? { borderColor: currentTheme.cardBorder } : null,
          ]}
        >
          <View style={styles.completedContentRow}>
            {/* Bersih tanpa lingkaran/glow latar belakang di belakang emoji */}
            <Image
              source={getEmotionImage(todayMood.primaryEmotion)}
              style={styles.completedEmojiImg}
              resizeMode="contain"
            />

            <View style={styles.completedTextCol}>
              <Text style={styles.completedPrimaryText}>
                Kamu merasa{' '}
                <Text
                  style={[
                    styles.primaryEmotionHighlight,
                    { color: currentTheme?.textHighlight || colors.brandBlue[600] },
                  ]}
                >
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
              style={[
                styles.modifyPillBtn,
                {
                  backgroundColor: currentTheme?.pillBg || '#EFF6FF',
                  borderColor: currentTheme?.pillBorder || '#BFDBFE',
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Ubah catatan mood hari ini"
            >
              <Text
                style={[
                  styles.modifyPillText,
                  { color: currentTheme?.pillText || '#2563EB' },
                ]}
              >
                Ubah
              </Text>
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
                activeOpacity={0.78}
                onPress={() => handleSelectEmotion(item.key)}
                style={[
                  styles.emotionItemBtn,
                  {
                    backgroundColor: item.bgColor,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Catat mood ${item.label}`}
              >
                <Image
                  source={item.image}
                  style={styles.dockEmojiImage}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    styles.emotionLabelText,
                    { color: item.textColor },
                  ]}
                  numberOfLines={1}
                >
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
    backgroundColor: colors.brandBlue[600], // #2563EB - Primary Brand Blue
    position: 'relative',
    overflow: 'hidden',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 3,
  },

  /* 1. Identity Bar */
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandLogo: {
    width: 86,
    height: 44,
  },

  /* Notification Button: Clean Elevated Circular Button */
  notificationBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 9,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#EF4444',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  /* 2. Hero Headline */
  headlineBlock: {
    marginBottom: 16,
  },
  timeGreetingText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.90)',
    marginBottom: 4,
    letterSpacing: 0.1,
  },
  mainHeadlineText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 29,
    letterSpacing: -0.3,
  },

  /* 3. Daily Mood Integrated Card Container */
  moodCardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 13,
    paddingHorizontal: 15,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },

  /* Belum Check-in Dock Styles */
  dockPromptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  dockPromptText: {
    fontSize: 12.5,
    fontWeight: '500',
    color: '#475569',
  },
  dockDetailLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  dockDetailLinkText: {
    fontSize: 12,
    fontWeight: '600',
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
    paddingVertical: 9,
    paddingHorizontal: 2,
    borderRadius: 14,
  },
  dockEmojiImage: {
    width: 32,
    height: 32,
    marginBottom: 5,
  },
  emotionLabelText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#334155',
  },

  /* Sudah Check-in Completed Card Styles */
  completedContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedEmojiImg: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  completedTextCol: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 8,
  },
  completedPrimaryText: {
    fontSize: 13.5,
    fontWeight: '500',
    color: '#0F172A',
    marginBottom: 2,
  },
  primaryEmotionHighlight: {
    fontWeight: '700',
  },
  completedSubText: {
    fontSize: 11.5,
    fontWeight: '400',
    color: '#64748B',
  },
  modifyPillBtn: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 12,
    borderWidth: 1,
  },
  modifyPillText: {
    fontSize: 11.5,
    fontWeight: '600',
  },
});
