import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import {
  PSYCH_GAME_CATEGORIES,
  PsychGameCategory,
  PsychGameScene,
} from '../../data/gamePsychData';
import { useApp } from '../../state/AppContext';
import {
  ButterflyEffectPattern,
  NameThatFeelingPattern,
  DigitalDilemmaPattern,
} from '../../components/gameplay/GameplayPatterns';

// Token konfigurasi tema gameplay resmi per kategori
const GAME_THEMES: Record<
  string,
  {
    name: string;
    color: string;
    darkColor: string;
    softBg: string;
    badgeBorder: string;
    textColor: string;
  }
> = {
  karakter: {
    name: 'Butterfly Effect',
    color: '#2563EB', // brandBlue[600]
    darkColor: '#1D4ED8',
    softBg: '#EFF6FF',
    badgeBorder: '#BFDBFE',
    textColor: '#1E40AF',
  },
  resiliensi: {
    name: 'Name That Feeling',
    color: '#059669', // brandGreen[600]
    darkColor: '#047857',
    softBg: '#ECFDF5',
    badgeBorder: '#A7F3D0',
    textColor: '#065F46',
  },
  relasi: {
    name: 'Digital Dilemma',
    color: '#7C3AED', // accentViolet[600]
    darkColor: '#6D28D9',
    softBg: '#F5F3FF',
    badgeBorder: '#DDD6FE',
    textColor: '#5B21B6',
  },
};

// ============================================================================
// MAIN COMPONENT: GAMEPLAY SCREEN (IMMERSIVE LAYERED DESIGN)
// ============================================================================

export const MentalGamePlayScreen: React.FC = () => {
  const { screenParams, replace, goBack } = useApp();
  const insets = useSafeAreaInsets();

  const categoryId = screenParams?.categoryId || 'karakter';
  const category: PsychGameCategory =
    PSYCH_GAME_CATEGORIES.find((c) => c.id === categoryId) ||
    PSYCH_GAME_CATEGORIES[0];

  const theme = GAME_THEMES[category.id] || GAME_THEMES.karakter;

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  // Start time tracker for genuine session duration metric
  const startTimeRef = useRef<number>(Date.now());

  // Accumulated Scores across scenes
  const [accumulatedTraits, setAccumulatedTraits] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [userChoices, setUserChoices] = useState<
    Array<{
      sceneOrder: number;
      sceneId: string;
      contextBanner?: string;
      situation: string;
      choiceId: string;
      choiceLabel: string;
      choiceText: string;
      feedback: string;
      learningPoint: string;
    }>
  >([]);

  const currentScene: PsychGameScene = category.scenes[currentSceneIdx];
  const isLastScene = currentSceneIdx === category.scenes.length - 1;

  // Split narrative situation and core focal question
  const splitSituation = (text: string) => {
    const qMarkIdx = text.lastIndexOf('?');
    if (qMarkIdx !== -1) {
      const beforeQ = text.slice(0, qMarkIdx);
      const lastDot = beforeQ.lastIndexOf('.');
      if (lastDot !== -1 && lastDot < beforeQ.length - 2) {
        return {
          narrative: text.slice(0, lastDot + 1).trim(),
          prompt: text.slice(lastDot + 1).trim(),
        };
      }
    }
    return { narrative: '', prompt: text };
  };

  const sceneText = splitSituation(currentScene.situation);

  const handleSelectChoice = (idx: number) => {
    setSelectedChoiceIdx(idx);
  };

  const handleNextScene = () => {
    if (selectedChoiceIdx === null) return;

    const choice = currentScene.choices[selectedChoiceIdx];

    // Merge trait scores
    const updatedTraits = { ...accumulatedTraits };
    let addedScore = 0;
    Object.entries(choice.traitScores).forEach(([k, v]) => {
      updatedTraits[k] = (updatedTraits[k] || 0) + v;
      addedScore += v;
    });

    const newTotalScore = totalScore + addedScore;
    setAccumulatedTraits(updatedTraits);
    setTotalScore(newTotalScore);

    const record = {
      sceneOrder: currentSceneIdx + 1,
      sceneId: currentScene.id,
      contextBanner: currentScene.contextBanner,
      situation: currentScene.situation,
      choiceId: choice.id,
      choiceLabel: choice.tag,
      choiceText: choice.text,
      feedback: choice.feedback,
      learningPoint: choice.learningPoint,
    };
    const updatedChoices = [...userChoices, record];
    setUserChoices(updatedChoices);

    if (!isLastScene) {
      setCurrentSceneIdx((prev) => prev + 1);
      setSelectedChoiceIdx(null);
    } else {
      const elapsedSeconds = Math.max(
        15,
        Math.round((Date.now() - startTimeRef.current) / 1000)
      );

      // Evaluasi apakah hasil optimal (good / senang), adaptif (harmoni), atau bertumbuh
      const isGood =
        category.id === 'resiliensi'
          ? newTotalScore >= 175
          : category.id === 'relasi'
          ? newTotalScore >= 180
          : newTotalScore >= 160;

      const isBalanced =
        !isGood &&
        newTotalScore >= (category.id === 'resiliensi' ? 140 : 135);

      const statusValue = isGood
        ? 'Optimal'
        : isBalanced
        ? 'Adaptif'
        : 'Bertumbuh';

      // Selesai: Replace layar saat ini dengan Game Result Screen
      replace('mental_game_result', {
        categoryId: category.id,
        gameId: screenParams?.gameId,
        totalScore: newTotalScore,
        traits: updatedTraits,
        userChoices: updatedChoices,
        durationSeconds: elapsedSeconds,
        isGood,
        bannerLabel: 'Hasil Refleksi',
        bannerValue: statusValue,
      });
    }
  };

  const handlePreviousScene = () => {
    if (currentSceneIdx > 0) {
      setCurrentSceneIdx((prev) => prev - 1);
      setSelectedChoiceIdx(null);
    }
  };

  const handleExitGame = () => {
    goBack();
  };

  const progressPercent =
    ((currentSceneIdx + 1) / category.scenes.length) * 100;

  // Render pola ilustrasi line-art sesuai game yang sedang aktif
  const renderPattern = () => {
    switch (category.id) {
      case 'karakter':
        return <ButterflyEffectPattern opacity={0.18} />;
      case 'resiliensi':
        return <NameThatFeelingPattern opacity={0.18} />;
      case 'relasi':
        return <DigitalDilemmaPattern opacity={0.18} />;
      default:
        return <ButterflyEffectPattern opacity={0.18} />;
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      {/* ============================================================== */}
      {/* 1. DOMINANT HERO BACKGROUND WITH CONTEXTUAL LINE-ART PATTERN   */}
      {/* ============================================================== */}
      <View style={[styles.heroBackgroundArea, { backgroundColor: theme.color }]}>
        {renderPattern()}
      </View>

      {/* ============================================================== */}
      {/* 2. SCROLL CONTENT: UNIFIED LAYERED GAMEPLAY                    */}
      {/* ============================================================== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop:
              Platform.OS === 'android'
                ? Math.max(insets.top, 12)
                : insets.top + 6,
          },
        ]}
      >
        {/* Top Control Bar (Pill Counter + Close Button) */}
        <View style={styles.topControlBar}>
          <View style={styles.counterPill}>
            <Text style={styles.counterText}>
              {category.title} · {currentSceneIdx + 1}/{category.scenes.length}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleExitGame}
            style={styles.closeCircleBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityRole="button"
            accessibilityLabel="Keluar dari permainan"
          >
            <X size={18} color="#0F172A" strokeWidth={2.4} />
          </TouchableOpacity>
        </View>

        {/* ============================================================ */}
        {/* MAIN CONTENT PANEL (SOLID, OPAQUE, LAYERED OVER BACKGROUND)  */}
        {/* ============================================================ */}
        <View style={styles.mainContentPanel}>
          {/* A. Progress Line at top of panel */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%`, backgroundColor: theme.color },
              ]}
            />
          </View>

          {/* B. Scenario Title (Clean typography without container pill or border) */}
          <View style={styles.scenarioTitleRow}>
            <Text
              style={[styles.scenarioTitleText, { color: theme.textColor }]}
              numberOfLines={1}
            >
              {currentScene.contextBanner ||
                `${category.badgeLabel} · Skenario ${currentSceneIdx + 1}`}
            </Text>
          </View>

          {/* C. Dedicated 3D Scenario Artwork */}
          {currentScene.illustration && (
            <View style={styles.illustrationWrapper}>
              <Image
                source={currentScene.illustration}
                style={styles.illustrationImage}
                resizeMode="cover"
              />
            </View>
          )}

          {/* D. Question Narrative vs Focal Prompt */}
          <View style={styles.questionBlock}>
            {sceneText.narrative ? (
              <Text style={styles.situationNarrative}>
                {sceneText.narrative}
              </Text>
            ) : null}

            <Text
              style={[
                styles.promptQuestion,
                { color: theme.darkColor || theme.textColor || theme.color },
              ]}
            >
              {sceneText.prompt}
            </Text>
          </View>

          {/* E. Choices Options List */}
          <View style={styles.pillList}>
            {currentScene.choices.map((choice, idx) => {
              const isSelected = selectedChoiceIdx === idx;
              const letter = String.fromCharCode(65 + idx);
              return (
                <TouchableOpacity
                  key={choice.id}
                  activeOpacity={0.85}
                  onPress={() => handleSelectChoice(idx)}
                  style={[
                    styles.choiceCard,
                    isSelected && {
                      backgroundColor: theme.softBg,
                      borderColor: theme.color,
                      borderWidth: 2,
                      shadowColor: theme.color,
                      shadowOpacity: 0.12,
                    },
                  ]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View
                    style={[
                      styles.choiceLetterBadge,
                      isSelected && {
                        backgroundColor: theme.color,
                        borderColor: theme.color,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.choiceLetterText,
                        isSelected && styles.choiceLetterTextSelected,
                      ]}
                    >
                      {letter}
                    </Text>
                  </View>

                  <Text
                    style={[
                      styles.choiceText,
                      isSelected && {
                        fontWeight: '700',
                        color: theme.textColor,
                      },
                    ]}
                  >
                    {choice.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================================ */}
        {/* 4. BOTTOM NAVIGATION CONTROLS (Previous '<' & Next '>')     */}
        {/* ============================================================ */}
        <View style={styles.bottomNavRow}>
          {/* Previous Button '<' */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handlePreviousScene}
            disabled={currentSceneIdx === 0}
            style={[
              styles.navSquareBtn,
              currentSceneIdx === 0 && styles.navSquareBtnDisabled,
            ]}
            accessibilityLabel="Pertanyaan sebelumnya"
          >
            <ChevronLeft
              size={20}
              color={currentSceneIdx === 0 ? '#94A3B8' : '#0F172A'}
              strokeWidth={2.4}
            />
          </TouchableOpacity>

          {/* Next Button '>' */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleNextScene}
            disabled={selectedChoiceIdx === null}
            style={[
              styles.navSquareBtn,
              selectedChoiceIdx === null && styles.navSquareBtnDisabled,
              selectedChoiceIdx !== null && {
                backgroundColor: theme.color,
                borderColor: theme.color,
                shadowColor: theme.color,
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 4,
              },
            ]}
            accessibilityLabel={
              isLastScene ? 'Lihat Hasil Refleksi' : 'Lanjut ke pertanyaan berikutnya'
            }
          >
            <ChevronRight
              size={20}
              color={selectedChoiceIdx === null ? '#94A3B8' : '#FFFFFF'}
              strokeWidth={2.4}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// ============================================================================
// STYLESHEET (IMMERSIVE LAYERED COMPOSITION)
// ============================================================================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate 50 canvas below
    position: 'relative',
  },

  /* Dominant Colored Hero Area with Curved Bottom Edge */
  heroBackgroundArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 360,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: 'hidden',
  },

  /* Top Control Bar */
  topControlBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  counterPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  counterText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  closeCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },

  /* Scroll Content */
  scrollContent: {
    paddingBottom: 32,
  },

  /* Main Content Panel: Solid, Fully Opaque, Layered Over Hero Background */
  mainContentPanel: {
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF', // Solid, 100% opaque white
    borderRadius: 24,
    padding: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 5,
  },

  /* Top Progress Track inside Main Panel */
  progressTrack: {
    width: '100%',
    height: 5,
    backgroundColor: '#F1F5F9',
    borderRadius: 2.5,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2.5,
  },

  /* Scenario Title (Plain text hierarchy without pill/border container) */
  scenarioTitleRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    marginTop: 2,
  },
  scenarioTitleText: {
    fontSize: 13.5,
    fontWeight: '600',
    lineHeight: 18,
    letterSpacing: -0.1,
    textAlign: 'center',
  },

  /* Dedicated Scenario Artwork */
  illustrationWrapper: {
    width: '100%',
    height: 155,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },

  /* Question Hierarchy (Narrative vs Focal Prompt) */
  questionBlock: {
    width: '100%',
    paddingHorizontal: 4,
    marginBottom: 18,
    alignItems: 'center',
  },
  situationNarrative: {
    fontSize: 13.5,
    fontWeight: '400',
    color: '#475569', // Slate 600
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 6,
  },
  promptQuestion: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 23,
    letterSpacing: -0.2,
  },

  /* Choices Options List */
  pillList: {
    width: '100%',
    gap: 12,
  },
  choiceCard: {
    width: '100%',
    minHeight: 56,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CBD5E1', // Defined border (Slate 300)
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  choiceLetterBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  choiceLetterText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
  },
  choiceLetterTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  choiceText: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '500',
    color: '#0F172A',
    lineHeight: 20,
  },

  /* Bottom Navigation Buttons (Square '<' and '>') */
  bottomNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  navSquareBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  navSquareBtnDisabled: {
    backgroundColor: '#F1F5F9',
    borderColor: '#E2E8F0',
    opacity: 0.5,
  },
});

