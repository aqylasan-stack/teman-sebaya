import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Image,
} from 'react-native';
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
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import {
  PSYCH_GAME_CATEGORIES,
  PsychGameCategory,
} from '../../data/gamePsychData';
import { useApp } from '../../state/AppContext';

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

const RESULT_THEMES: Record<'senang' | 'harmoni' | 'sedih', ResultThemeTokens> = {
  senang: {
    primary: '#2563EB',      // Brand Blue 600
    primaryDark: '#1D4ED8',  // Brand Blue 700
    primaryLight: '#EFF6FF', // Brand Blue 50
    primaryBorder: '#BFDBFE',// Brand Blue 200
    shadow: '#2563EB',
  },
  harmoni: {
    primary: '#059669',      // Brand Green 600 (Matches "Hebat! Keseimbangan terjaga!")
    primaryDark: '#047857',  // Brand Green 700
    primaryLight: '#ECFDF5', // Brand Green 50
    primaryBorder: '#A7F3D0',// Brand Green 200
    shadow: '#059669',
  },
  sedih: {
    primary: '#4F46E5',      // Indigo 600
    primaryDark: '#4338CA',  // Indigo 700
    primaryLight: '#EEF2FF', // Indigo 50
    primaryBorder: '#C7D2FE',// Indigo 200
    shadow: '#4F46E5',
  },
};

// ============================================================================
// MAIN SCREEN COMPONENT
// ============================================================================

export const MentalGameResultScreen: React.FC = () => {
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

  // Harmonized dynamic color tokens across the screen
  const currentTheme = RESULT_THEMES[badgeVariant] || RESULT_THEMES.senang;

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

  // Hero emblem source (solid, opaque, character-driven)
  const heroSource =
    badgeVariant === 'senang'
      ? require('../../../assets/games/badges/crest_senang.png')
      : badgeVariant === 'sedih'
      ? require('../../../assets/games/badges/crest_sedih.png')
      : require('../../../assets/games/badges/crest_harmoni.png');

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
    <ScreenContainer
      scrollable={false}
      header={
        <ContextualHeader
          title="Hasil Refleksi"
          onBack={handleReturnToTemanBermain}
        />
      }
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
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
                <Image
                  source={heroSource}
                  style={styles.bannerImage}
                  resizeMode="contain"
                  accessibilityLabel={
                    badgeVariant === 'senang'
                      ? 'Lencana Ceria Merayakan Hasil Refleksi'
                      : badgeVariant === 'sedih'
                      ? 'Lencana Reflektif Memotivasi Bertumbuh'
                      : 'Lencana Harmoni Keseimbangan Refleksi'
                  }
                />
                <View style={styles.bannerTextOverlay}>
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

              <View style={[styles.takeawaysBox, { borderColor: currentTheme.primaryBorder }]}>
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
    </ScreenContainer>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    backgroundColor: '#F8FAFC', // Slate 50 Canvas (Design System 2.3)
  },

  /* MAIN CARD */
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0', // Border light (Design System 2.3)
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
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
    backgroundColor: '#4F46E5', // Indigo 600
  },
  headerBannerHarmoni: {
    backgroundColor: '#059669', // Brand Green 600
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
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerTextOverlay: {
    position: 'absolute',
    top: '63%',
    left: '16%',
    right: '16%',
    height: '24%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerLabelText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 2,
    opacity: 0.95,
  },
  bannerScoreText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    lineHeight: 24,
    letterSpacing: 0.3,
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
    borderWidth: 1.2,
    borderColor: '#E2E8F0', // Border Light (Design System 2.3)
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
    padding: 12,
    borderWidth: 1,
    borderColor: '#EFF6FF',
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
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: spacing.md,
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
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
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
