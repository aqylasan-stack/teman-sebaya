import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
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

// ============================================================================
// MAIN COMPONENT: GAMEPLAY SCREEN (100% MATCH REFERENCE 3)
// ============================================================================

export const MentalGamePlayScreen: React.FC = () => {
  const { screenParams, replace, goBack } = useApp();
  const insets = useSafeAreaInsets();

  const categoryId = screenParams?.categoryId || 'karakter';
  const category: PsychGameCategory =
    PSYCH_GAME_CATEGORIES.find((c) => c.id === categoryId) ||
    PSYCH_GAME_CATEGORIES[0];

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
          : newTotalScore >= 195;

      const isBalanced =
        !isGood &&
        newTotalScore >= (category.id === 'resiliensi' ? 140 : 150);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.screen, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 8) : 0 }]}>
        <StatusBar barStyle="dark-content" />

        {/* ============================================================== */}
        {/* 1. THIN PROGRESS LINE (Reference 3: Very top edge)             */}
        {/* ============================================================== */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        {/* ============================================================== */}
        {/* 2. TOP BAR (Reference 3: Centered Counter + Right Close 'X')    */}
        {/* ============================================================== */}
        <View style={styles.topBar}>
          <View style={styles.topBarSideEmpty} />

          <Text style={styles.counterText}>
            {currentSceneIdx + 1}/{category.scenes.length}
          </Text>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={handleExitGame}
            style={styles.closeBtn}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            accessibilityRole="button"
            accessibilityLabel="Keluar dari permainan"
          >
            <X size={24} color="#0F172A" strokeWidth={2.4} />
          </TouchableOpacity>
        </View>

      {/* ============================================================== */}
      {/* 3. SCENARIO CONTEXT, ARTWORK & QUESTION STATEMENT             */}
      {/* ============================================================== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* A. Context Badge (Scenario Tag) */}
        <View style={styles.contextBadgeRow}>
          <View style={styles.contextBadge}>
            <Text style={styles.contextBadgeText}>
              {currentScene.contextBanner || `${category.badgeLabel} · Skenario ${currentSceneIdx + 1}`}
            </Text>
          </View>
        </View>

        {/* B. Scenario Dedicated 3D Artwork */}
        {currentScene.illustration && (
          <View style={styles.illustrationWrapper}>
            <Image
              source={currentScene.illustration}
              style={styles.illustrationImage}
              resizeMode="cover"
            />
          </View>
        )}

        {/* C. Split Question Hierarchy (Narrative vs Focal Prompt) */}
        <View style={styles.questionBlock}>
          {sceneText.narrative ? (
            <Text style={styles.situationNarrative}>
              {sceneText.narrative}
            </Text>
          ) : null}

          <Text style={styles.promptQuestion}>
            {sceneText.prompt}
          </Text>
        </View>

        {/* ============================================================== */}
        {/* 4. CHOICE CARDS WITH CLEAR LETTER BADGES (A, B, C)            */}
        {/* ============================================================== */}
        <View style={styles.pillList}>
          {currentScene.choices.map((choice, idx) => {
            const isSelected = selectedChoiceIdx === idx;
            const letter = String.fromCharCode(65 + idx); // A, B, C
            return (
              <TouchableOpacity
                key={choice.id}
                activeOpacity={0.85}
                onPress={() => handleSelectChoice(idx)}
                style={[
                  styles.choiceCard,
                  isSelected && styles.choiceCardSelected,
                ]}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
              >
                <View
                  style={[
                    styles.choiceLetterBadge,
                    isSelected && styles.choiceLetterBadgeSelected,
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
                    isSelected && styles.choiceTextSelected,
                  ]}
                >
                  {choice.text}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* ============================================================== */}
      {/* 5. BOTTOM NAVIGATION BUTTONS (Reference 3: '<' and '>')        */}
      {/* ============================================================== */}
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
            color={currentSceneIdx === 0 ? '#CBD5E1' : '#0F172A'}
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
            selectedChoiceIdx !== null && styles.navSquareBtnActive,
          ]}
          accessibilityLabel="Lanjut ke pertanyaan berikutnya"
        >
          <ChevronRight
            size={20}
            color={selectedChoiceIdx === null ? '#CBD5E1' : '#FFFFFF'}
            strokeWidth={2.4}
          />
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  );
};

// ============================================================================
// STYLESHEET (100% Faithful to Reference 3)
// ============================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Top Progress Line */
  progressTrack: {
    width: '100%',
    height: 3,
    backgroundColor: '#E2E8F0',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    zIndex: 20,
  },
  topBarSideEmpty: {
    width: 44,
    height: 44,
  },
  counterText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },

  /* Content */
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    alignItems: 'center',
  },

  /* Context Badge (Scenario Category & Order) */
  contextBadgeRow: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  contextBadge: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 999,
  },
  contextBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#2563EB',
    letterSpacing: 0.2,
  },

  /* Dedicated Scenario Artwork */
  illustrationWrapper: {
    width: '100%',
    height: 155,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
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
    fontSize: 14,
    fontWeight: '400',
    color: '#475569', // Slate 600
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 6,
  },
  promptQuestion: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#0F172A', // Slate 900 Focal Point
    textAlign: 'center',
    lineHeight: 24,
    letterSpacing: -0.2,
  },

  /* Choices (Clean Cards with Letter Badges) */
  pillList: {
    width: '100%',
    gap: 10,
  },
  choiceCard: {
    width: '100%',
    minHeight: 52,
    borderRadius: 16,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  choiceCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.8,
  },
  choiceLetterBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  choiceLetterBadgeSelected: {
    backgroundColor: '#2563EB',
  },
  choiceLetterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  choiceLetterTextSelected: {
    color: '#FFFFFF',
  },
  choiceText: {
    flex: 1,
    fontSize: 13.5,
    fontWeight: '500',
    color: '#1E293B',
    lineHeight: 19,
  },
  choiceTextSelected: {
    fontWeight: '600',
    color: '#1D4ED8',
  },

  /* Bottom Navigation Buttons (Square '<' and '>') */
  bottomNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingTop: 12,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  navSquareBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navSquareBtnDisabled: {
    borderColor: '#F1F5F9',
    backgroundColor: '#F8FAFC',
  },
  navSquareBtnActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
});
