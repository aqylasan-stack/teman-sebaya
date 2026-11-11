import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import {
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  BookmarkCheck,
  Share2,
  MessageCircle,
  BookOpen,
  Clock,
  Layers,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import {
  PSYCH_GAME_CATEGORIES,
  PsychGameCategory,
} from '../../data/gamePsychData';
import { useApp } from '../../state/AppContext';
import {
  ButterflyEffectPattern,
  NameThatFeelingPattern,
  DigitalDilemmaPattern,
} from '../../components/gameplay/GameplayPatterns';

// ============================================================================
// GAME-SPECIFIC REFLECTIVE LEARNING GENERATOR (Non-Clinical, Pedagogical)
// ============================================================================

interface GameLearningContent {
  sectionTitle: string;
  gameThemeLabel: string;
  narrative: string;
  takeaways: string[];
}

const getGameLearningContent = (
  categoryId: string,
  userChoices: Array<any>
): GameLearningContent => {
  // Extract genuine learning points from user choices if available
  const userTakeaways: string[] = [];
  if (userChoices && userChoices.length > 0) {
    userChoices.forEach((c) => {
      const pt = c.learningPoint || c.feedback;
      if (pt && !userTakeaways.includes(pt)) {
        userTakeaways.push(pt);
      }
    });
  }

  if (categoryId === 'karakter') {
    // Game 1: Butterfly Effect (Refleksi pilihan, keputusan, konsekuensi)
    const defaultTakeaways = [
      'Keputusan kecil dalam komunikasi terbuka dapat mencegah kesalahpahaman besar di dalam kelompok.',
      'Fokus pada solusi bersama jauh lebih efektif dalam meredakan ketegangan dibanding larut dalam kepanikan.',
      'Menghargai ritme kerja dan batasan energi rekan tim menjaga kerja sama jangka panjang tetap solid.',
    ];
    const takeaways =
      userTakeaways.length >= 2 ? userTakeaways.slice(0, 3) : defaultTakeaways;

    return {
      sectionTitle: 'Yang Kamu Pelajari',
      gameThemeLabel: 'Dinamika Keputusan & Konsekuensi',
      narrative:
        'Melalui skenario Butterfly Effect, kamu diajak melihat bagaimana keputusan kecil membawa dampak berantai pada dirimu dan rekan tim. Pilihan yang kamu ambil mencerminkan pentingnya menimbang situasi dengan tenang, mendengarkan sudut pandang berbeda, dan berani mengambil langkah solutif saat menghadapi dinamika sosial sekolah.',
      takeaways,
    };
  }

  if (categoryId === 'resiliensi' || categoryId === 'emosi') {
    // Game 2: Name That Feeling (Pemahaman emosi & respons adaptif)
    const defaultTakeaways = [
      'Menamai perasaan yang hadir (seperti cemas, lelah sosial, atau FOMO) adalah langkah awal agar emosi tidak menguasai tindakan.',
      'Mengakui rasa lelah dan memberi jeda istirahat adalah bentuk kepedulian yang sah terhadap diri sendiri.',
      'Memberi jeda beberapa detik sebelum merespons di situasi menekan membantu melindungi energi batinmu.',
    ];
    const takeaways =
      userTakeaways.length >= 2 ? userTakeaways.slice(0, 3) : defaultTakeaways;

    return {
      sectionTitle: 'Yang Kamu Pelajari',
      gameThemeLabel: 'Mengenali Emosi & Jeda Respons',
      narrative:
        'Dalam sesi Name That Feeling, kamu melatih kepekaan mengenali sinyal emosi dalam kehidupan sehari-hari. Pilihan responsmu menunjukkan pentingnya memberi jeda sebelum bertindak, memvalidasi apa yang kamu rasakan tanpa terburu-buru menghakimi diri, serta memilih cara mengekspresikan perasaan secara jujur dan sehat.',
      takeaways,
    };
  }

  // Game 3: Digital Dilemma ('relasi' - Pembelajaran situasi digital & batasan sehat)
  const defaultTakeaways = [
    'Waktu tidur malam dan kebersamaan keluarga adalah batasan penting yang perlu dilindungi dari godaan notifikasi ponsel.',
    'Menghubungi teman secara privat saat melihat tanda bahaya jauh lebih bermanfaat daripada sekadar berkomentar di ruang publik maya.',
    'Menjaga batasan screen time membantu pikiran tetap segar dan terhindar dari jebakan perbandingan sosial.',
  ];
  const takeaways =
    userTakeaways.length >= 2 ? userTakeaways.slice(0, 3) : defaultTakeaways;

  return {
    sectionTitle: 'Yang Kamu Pelajari',
    gameThemeLabel: 'Batasan Sehat & Etika Digital',
    narrative:
      'Melalui skenario Digital Dilemma, kamu berlatih menjaga batasan sehat di dunia maya. Keputusan yang kamu ambil memperlihatkan bahwa kamu memegang kendali atas gawaimu: memprioritaskan istirahat nyata, menjaga privasi pribadi, serta menyikapi interaksi daring dengan empati dan batasan yang bijak.',
    takeaways,
  };
};

const formatDuration = (seconds?: number, defaultMinutes = 3) => {
  if (!seconds || seconds <= 0) {
    return `~${defaultMinutes} Menit`;
  }
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) {
    return `${secs} dtk`;
  }
  if (secs === 0) {
    return `${mins} mnt`;
  }
  return `${mins}m ${secs}s`;
};

// ============================================================================
// RESULT COLOR THEMES (Harmonizes top banner, emblem, and bottom actions)
// ============================================================================

interface ResultThemeTokens {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primaryBorder: string;
  shadow: string;
}

const CATEGORY_THEMES: Record<
  'karakter' | 'resiliensi' | 'relasi',
  ResultThemeTokens
> = {
  karakter: {
    primary: '#2563EB',      // brandBlue[600]
    primaryDark: '#1D4ED8',  // brandBlue[700]
    primaryLight: '#EFF6FF', // brandBlue[50]
    primaryBorder: '#BFDBFE',// brandBlue[200]
    shadow: '#2563EB',
  },
  resiliensi: {
    primary: '#059669',      // brandGreen[600]
    primaryDark: '#047857',  // brandGreen[700]
    primaryLight: '#ECFDF5', // brandGreen[50]
    primaryBorder: '#A7F3D0',// brandGreen[200]
    shadow: '#059669',
  },
  relasi: {
    primary: '#7C3AED',      // accentViolet[600]
    primaryDark: '#6D28D9',  // accentViolet[700]
    primaryLight: '#F5F3FF', // accentViolet[50]
    primaryBorder: '#DDD6FE',// accentViolet[200]
    shadow: '#7C3AED',
  },
};

// ============================================================================
// MAIN SCREEN COMPONENT
// ============================================================================

export const MentalGameResultScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { screenParams, popTo, switchTab } = useApp();
  const [isSaved, setIsSaved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const rawCategory =
    screenParams?.categoryId || screenParams?.gameId || 'karakter';

  const categoryId: 'karakter' | 'resiliensi' | 'relasi' =
    rawCategory === 'resiliensi' ||
    rawCategory === 'emosi' ||
    rawCategory === 'name-that-feeling' ||
    rawCategory === 'feelings'
      ? 'resiliensi'
      : rawCategory === 'relasi' ||
        rawCategory === 'digital-dilemma' ||
        rawCategory === 'dilemma'
      ? 'relasi'
      : 'karakter';

  const category: PsychGameCategory =
    PSYCH_GAME_CATEGORIES.find((c) => c.id === categoryId) ||
    PSYCH_GAME_CATEGORIES[0];

  const totalScore: number =
    typeof screenParams?.totalScore === 'number'
      ? screenParams.totalScore
      : 185;

  const userChoices: Array<{
    sceneOrder: number;
    sceneId?: string;
    contextBanner?: string;
    situation?: string;
    choiceId?: string;
    choiceLabel?: string;
    choiceText?: string;
    feedback?: string;
    learningPoint?: string;
  }> = screenParams?.userChoices || [];

  const durationSeconds: number | undefined = screenParams?.durationSeconds;

  // Pick archetype based on accumulated score
  const archetype =
    category.archetypes.find((a) => totalScore >= a.minScore) ||
    category.archetypes[category.archetypes.length - 1];

  // Evaluate badge variant: 'senang' | 'sedih' | 'harmoni'
  const badgeVariant: 'senang' | 'sedih' | 'harmoni' =
    (archetype.variant as 'senang' | 'sedih' | 'harmoni') ||
    (totalScore >= 180 ? 'senang' : 'sedih');

  // Harmonized dynamic color tokens based on active game category
  const currentTheme =
    CATEGORY_THEMES[categoryId] || CATEGORY_THEMES.relasi;

  const renderPattern = () => {
    switch (categoryId) {
      case 'karakter':
        return <ButterflyEffectPattern opacity={0.18} />;
      case 'resiliensi':
        return <NameThatFeelingPattern opacity={0.18} />;
      case 'relasi':
        return <DigitalDilemmaPattern opacity={0.18} />;
      default:
        return <DigitalDilemmaPattern opacity={0.18} />;
    }
  };

  // Evaluate whether result is high/optimal (good) or developmental (growth needed)
  const isGoodResult =
    screenParams?.isGood !== undefined
      ? Boolean(screenParams.isGood)
      : badgeVariant !== 'sedih';

  // Banner status text overlay (Option B: Reflection Status: Optimal / Adaptif / Bertumbuh)
  const defaultStatusValue =
    badgeVariant === 'senang'
      ? 'Optimal'
      : badgeVariant === 'harmoni'
      ? 'Adaptif'
      : 'Bertumbuh';

  const bannerLabel = screenParams?.bannerLabel || 'Hasil Refleksi';
  const bannerValue =
    screenParams?.bannerValue && !screenParams.bannerValue.startsWith('+')
      ? screenParams.bannerValue
      : defaultStatusValue;

  // Dynamic mascot avatar based on reflection outcome:
  // - "oke bangeet" / Optimal (senang) -> 2 thumbs up
  // - "b aja" / Adaptif (harmoni) -> 1 thumb up
  // - Bertumbuh / Reflektif (sedih) -> thinking pose
  const isOptimal =
    bannerValue === 'Optimal' ||
    bannerValue === 'Sangat Baik' ||
    badgeVariant === 'senang';
  const isReflectiveGrowth =
    bannerValue === 'Bertumbuh' ||
    bannerValue === 'Perlu Dukungan' ||
    badgeVariant === 'sedih';

  const avatarCharacterSource = isOptimal
    ? require('../../../assets/games/avatar/avatar_result_two_thumbs.jpg')
    : isReflectiveGrowth
    ? require('../../../assets/games/avatar/avatar_result_thinking.png')
    : require('../../../assets/games/avatar/avatar_result_one_thumb.jpg');

  // Completion Header text
  const headerBannerText =
    badgeVariant === 'senang'
      ? 'Kerja bagus! Refleksi tuntas!'
      : badgeVariant === 'sedih'
      ? 'Refleksi tuntas! Terus bertumbuh!'
      : 'Hebat! Keseimbangan terjaga!';

  // Clean Indonesian Achievement Title & Subtitle
  const titleParts = archetype.title.match(/^(.*?)(?:\s*\((.*?)\))?$/);
  const mainBadgeTitle = titleParts?.[1]?.trim() || archetype.title;
  const badgeSubtitle = archetype.subtitle || titleParts?.[2]?.trim();

  // Game-specific learning reflection content and actual choice takeaways
  const learningContent = getGameLearningContent(categoryId, userChoices);

  const completedScenesCount =
    userChoices.length > 0 ? userChoices.length : category.scenes.length;

  const formattedDuration = formatDuration(
    durationSeconds,
    category.durationMinutes
  );

  const handleReturnToTemanBermain = () => {
    // Unwinds navigation stack directly back to Teman Bermain hub,
    // dropping all gameplay and result screens from history.
    popTo('teman_bermain');
  };

  const handleSaveToProfile = () => {
    setIsSaved(true);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Aku baru saja menyelesaikan sesi refleksi "${category.title}" di aplikasi Teman Sebaya! Capaian refleksiku: ${archetype.title}. Temukan pengalaman bermain dan belajar di Teman Sebaya!`,
      });
    } catch (_err) {
      // Ignored
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* ================================================================== */}
      {/* 1. DOMINANT HERO BACKGROUND WITH CONTEXTUAL LINE-ART PATTERN       */}
      {/* ================================================================== */}
      <View
        style={[
          styles.heroBackgroundArea,
          { backgroundColor: currentTheme.primary },
        ]}
      >
        {renderPattern()}
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop:
              Platform.OS === 'android'
                ? Math.max(insets.top, 16) + 12
                : insets.top + 12,
            paddingBottom: spacing.xxl + insets.bottom,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ================================================================== */}
        {/* MAIN REFINED CARD                                                  */}
        {/* ================================================================== */}
        <View style={styles.mainCard}>
          {/* A. COMPLETION HEADER BANNER */}
          <View
            style={[
              styles.headerBanner,
              { backgroundColor: currentTheme.primary },
            ]}
          >
            <Text style={styles.headerBannerText}>{headerBannerText}</Text>
          </View>

          {/* INNER CARD BODY */}
          <View style={styles.cardBody}>
            {/* B. CELEBRATION HERO BANNER WITH SOLID 3D MASCOT EMBLEM */}
            <View style={styles.celebrationHero}>
              <View style={styles.bannerHeroContainer}>
                {/* Circular Character Frame */}
                <View
                  style={[
                    styles.avatarCircleFrame,
                    { borderColor: currentTheme.primary },
                  ]}
                >
                  <Image
                    source={avatarCharacterSource}
                    style={styles.bannerCharacterImage}
                    resizeMode="cover"
                    accessibilityLabel={
                      isOptimal
                        ? 'Karakter dua jempol merayakan hasil optimal'
                        : isReflectiveGrowth
                        ? 'Karakter reflektif memotivasi bertumbuh'
                        : 'Karakter satu jempol apresiasi hasil adaptif'
                    }
                  />
                </View>

                {/* Overlapping Badge Pill at Bottom */}
                <View
                  style={[
                    styles.bannerTextOverlay,
                    {
                      backgroundColor: currentTheme.primary,
                      borderColor: currentTheme.primaryDark,
                    },
                  ]}
                >
                  <Text style={styles.bannerLabelText} numberOfLines={1}>
                    {bannerLabel}
                  </Text>
                  <Text
                    style={styles.bannerScoreText}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    {bannerValue}
                  </Text>
                </View>
              </View>
            </View>

            {/* C. ACHIEVEMENT / ARCHETYPE SECTION (Simplified, Direct, No Container/Box/Icon/Shadow) */}
            <View style={styles.capaianSection}>
              <Text style={styles.capaianLabel}>Capaian Refleksimu</Text>
              <Text style={[styles.capaianTitle, { color: currentTheme.primary }]}>
                {mainBadgeTitle}
              </Text>
              {badgeSubtitle ? (
                <Text style={styles.capaianSubtitle}>{badgeSubtitle}</Text>
              ) : null}
            </View>

            {/* D. YANG KAMU PELAJARI (Reflective Learning Card) */}
            <View style={styles.learningCard}>
              <View style={styles.learningHeaderRow}>
                <BookOpen size={17} color={currentTheme.primary} style={{ marginRight: 8 }} />
                <Text style={styles.learningSectionTitle}>
                  {learningContent.sectionTitle}
                </Text>
              </View>

              <Text style={styles.learningNarrativeText}>
                {learningContent.narrative}
              </Text>

              <View style={styles.takeawaysBox}>
                <Text style={[styles.takeawaysTitle, { color: currentTheme.primaryDark }]}>
                  Poin Pembelajaran:
                </Text>
                {learningContent.takeaways.map((takeaway, idx) => (
                  <View key={idx} style={styles.takeawayItemRow}>
                    <CheckCircle2
                      size={14}
                      color={currentTheme.primary}
                      style={{ marginTop: 2, marginRight: 8, flexShrink: 0 }}
                    />
                    <Text style={styles.takeawayItemText}>{takeaway}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* E. SUPPORTING STATS STRIP (Sleek, Proportional, Data-backed) */}
            <View style={styles.supportingStatsBar}>
              {/* Stat 1: Skenario Selesai */}
              <View style={styles.statBarItem}>
                <Layers size={15} color={currentTheme.primary} style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.statBarValue}>
                    {completedScenesCount} Skenario
                  </Text>
                  <Text style={styles.statBarLabel}>Selesai Dijelajahi</Text>
                </View>
              </View>

              {/* Subtle Divider */}
              <View style={styles.statBarDivider} />

              {/* Stat 2: Waktu Permainan Sebenarnya */}
              <View style={styles.statBarItem}>
                <Clock size={15} color="#64748B" style={{ marginRight: 8 }} />
                <View>
                  <Text style={styles.statBarValue}>{formattedDuration}</Text>
                  <Text style={styles.statBarLabel}>Waktu Permainan</Text>
                </View>
              </View>
            </View>

            {/* F. EXPANDABLE REVIEW TRIGGER */}
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsExpanded(!isExpanded)}
              style={styles.expandTriggerBtn}
              accessibilityRole="button"
              accessibilityLabel="Cek Lebih Detail"
            >
              {isExpanded ? (
                <ChevronDown size={18} color={currentTheme.primary} />
              ) : (
                <ChevronUp size={18} color={currentTheme.primary} />
              )}
              <Text style={[styles.expandTriggerText, { color: currentTheme.primary }]}>
                {isExpanded ? 'Tutup Detail' : 'Cek Detail & Misi Hari Ini'}
              </Text>
            </TouchableOpacity>

            {/* EXPANDED CONTENT: Summary & Actionable Missions */}
            {isExpanded && (
              <View style={styles.expandedContainer}>
                {/* 1. Refleksi Karakter & Pilihan */}
                <View style={styles.descBlock}>
                  <Text style={styles.descTitle}>Refleksi Pilihanmu</Text>
                  <Text style={styles.descText}>{archetype.description}</Text>
                </View>

                {/* 2. Review Jejak Pilihan Skenario (Jika ada userChoices) */}
                {userChoices.length > 0 && (
                  <View style={styles.choicesReviewCard}>
                    <Text style={styles.choicesReviewTitle}>
                      Catatan Pilihan Skenario
                    </Text>
                    <Text style={styles.choicesReviewSubtitle}>
                      Pilihan yang kamu ambil selama sesi ini:
                    </Text>
                    <View style={styles.choicesReviewList}>
                      {userChoices.map((choice, idx) => (
                        <View key={idx} style={styles.choiceReviewRow}>
                          <View style={[styles.choiceReviewIndexBadge, { backgroundColor: currentTheme.primaryLight }]}>
                            <Text style={[styles.choiceReviewIndexText, { color: currentTheme.primary }]}>
                              {choice.sceneOrder || idx + 1}
                            </Text>
                          </View>
                          <View style={styles.choiceReviewContent}>
                            <Text style={[styles.choiceReviewTag, { color: currentTheme.primaryDark }]}>
                              {choice.choiceLabel || 'Pilihanmu'}
                            </Text>
                            <Text style={styles.choiceReviewText}>
                              {choice.choiceText}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
                  </View>
                )}

                {/* Auxiliary Save & Share Actions */}
                <View style={styles.auxiliaryActionRow}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleSaveToProfile}
                    disabled={isSaved}
                    style={[
                      styles.auxSaveBtn,
                      { backgroundColor: currentTheme.primary },
                      isSaved && { backgroundColor: currentTheme.primaryDark },
                    ]}
                  >
                    <BookmarkCheck size={16} color="#FFFFFF" />
                    <Text style={styles.auxSaveText}>
                      {isSaved ? 'Tersimpan di Profil ✓' : 'Simpan Refleksi'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleShare}
                    style={styles.auxShareBtn}
                  >
                    <Share2 size={16} color="#334155" />
                    <Text style={styles.auxShareText}>Bagikan</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* F. PRIMARY ACTION BUTTON */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleReturnToTemanBermain}
              style={[
                styles.primaryActionButton,
                {
                  backgroundColor: currentTheme.primary,
                  shadowColor: currentTheme.shadow,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel="Kembali ke Teman Bermain"
            >
              <Text style={styles.primaryActionText}>
                Kembali ke Teman Bermain
              </Text>
            </TouchableOpacity>

            {/* Counseling Bridge */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => switchTab('cerita')}
              style={styles.bridgeButton}
            >
              <MessageCircle size={15} color={currentTheme.primary} />
              <Text style={[styles.bridgeButtonText, { color: currentTheme.primary }]}>
                Ada yang mengganjal? Curhat di Teman Cerita &rarr;
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate 50 Canvas (Design System 2.3)
    position: 'relative',
  },

  /* Dominant Colored Hero Area with Curved Bottom Edge behind the card */
  heroBackgroundArea: {
    position: 'absolute',
    top: -200,
    left: 0,
    right: 0,
    height: 540, // 200px overscroll buffer + 340px visible hero behind card
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },

  scrollContent: {
    paddingHorizontal: spacing.md,
  },

  /* MAIN CARD */
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 16,
    elevation: 4,
  },

  /* Top Banner */
  headerBanner: {
    backgroundColor: '#2563EB', // Primary Brand Blue (Design System 2.1)
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBannerSedih: {
    backgroundColor: '#2563EB', // Unified Brand Blue
  },
  headerBannerHarmoni: {
    backgroundColor: '#2563EB', // Unified Brand Blue
  },
  headerBannerText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 0.2,
  },

  /* Card Body */
  cardBody: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },

  /* Celebration Hero Banner */
  celebrationHero: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  bannerHeroContainer: {
    width: 210,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarCircleFrame: {
    width: 176,
    height: 176,
    borderRadius: 88,
    borderWidth: 4.5,
    backgroundColor: '#509BDC',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
  },
  bannerCharacterImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextOverlay: {
    position: 'absolute',
    bottom: 2,
    alignSelf: 'center',
    minWidth: 154,
    paddingVertical: 7,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerLabelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.4,
    marginBottom: 1,
    textAlign: 'center',
    opacity: 0.95,
  },
  bannerScoreText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 23,
    letterSpacing: 0.3,
    textAlign: 'center',
  },

  /* C. Capaian Refleksi (Simplified, Unboxed, Direct Typography) */
  capaianSection: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: spacing.sm,
  },
  capaianLabel: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#64748B', // Slate 500 (Design System 2.3)
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  capaianTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#059669', // Brand Green 600 (Secondary Identity, Semantic Color per Design System 2.2)
    textAlign: 'center',
    letterSpacing: -0.3,
    lineHeight: 26,
  },
  capaianSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#475569', // Slate 600
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
    maxWidth: '92%',
  },

  /* Yang Kamu Pelajari (Reflective Learning Card) */
  learningCard: {
    width: '100%',
    backgroundColor: '#F8FAFC', // Slate 50 Neutral Canvas
    borderRadius: 18,
    padding: spacing.md,
    marginTop: 14,
    marginBottom: 12,
  },
  learningHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  learningSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A', // Slate 900
    letterSpacing: -0.2,
  },
  learningNarrativeText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155', // Slate 700
    marginBottom: 12,
  },
  takeawaysBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  takeawaysTitle: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  takeawayItemRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 7,
  },
  takeawayItemText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: '#1E293B',
  },

  /* Supporting Stats Bar (Single, Sleek, Proportional, Data-backed) */
  supportingStatsBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: spacing.md,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  statBarItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statBarDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 8,
  },
  statBarValue: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 18,
  },
  statBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 1,
  },

  /* Expand Trigger */
  expandTriggerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  expandTriggerText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563EB',
  },

  /* Expanded Container */
  expandedContainer: {
    width: '100%',
    paddingTop: spacing.xs,
    paddingBottom: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    marginBottom: spacing.md,
  },
  descBlock: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  descTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 6,
  },
  descText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#334155',
  },

  /* Catatan Pilihan Skenario (Review Keputusan Pengguna) */
  choicesReviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  choicesReviewTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  choicesReviewSubtitle: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: spacing.md,
    marginTop: 2,
  },
  choicesReviewList: {
    gap: 12,
  },
  choiceReviewRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  choiceReviewIndexBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  choiceReviewIndexText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#2563EB',
  },
  choiceReviewContent: {
    flex: 1,
  },
  choiceReviewTag: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 2,
  },
  choiceReviewText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#334155',
  },

  /* Auxiliary actions */
  auxiliaryActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  auxSaveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 42,
    borderRadius: 10,
  },
  auxSavedBtnSuccess: {
    opacity: 0.9,
  },
  auxSaveText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  auxShareBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#F1F5F9',
    height: 42,
    borderRadius: 10,
  },
  auxShareText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#334155',
  },

  /* F. PRIMARY ACTION BUTTON */
  primaryActionButton: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
  },
  primaryActionText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },

  /* Counseling Bridge */
  bridgeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginTop: 4,
  },
  bridgeButtonText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#2563EB',
  },
});
