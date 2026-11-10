import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {
  X,
  Compass,
  Sparkles,
  ArrowRight,
  Brain,
  CheckCircle2,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Card } from '../../components/common/Card';
import {
  PSYCH_GAME_CATEGORIES,
  PsychGameChoice,
  PsychGameCategory,
} from '../../data/gamePsychData';
import { useApp } from '../../state/AppContext';

export const MentalGamePlayScreen: React.FC = () => {
  const { screenParams, navigateTo, goBack } = useApp();

  const categoryId = screenParams?.categoryId || 'karakter';
  const category: PsychGameCategory =
    PSYCH_GAME_CATEGORIES.find((c) => c.id === categoryId) ||
    PSYCH_GAME_CATEGORIES[0];

  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [selectedChoiceIdx, setSelectedChoiceIdx] = useState<number | null>(null);

  // Accumulated Scores across scenes
  const [accumulatedTraits, setAccumulatedTraits] = useState<Record<string, number>>({});
  const [totalScore, setTotalScore] = useState(0);

  const currentScene = category.scenes[currentSceneIdx];
  const isLastScene = currentSceneIdx === category.scenes.length - 1;

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

    if (!isLastScene) {
      setCurrentSceneIdx((prev) => prev + 1);
      setSelectedChoiceIdx(null);
    } else {
      // Navigate to Gamified Psychological Reflection Results
      navigateTo('mental_game_result', {
        categoryId: category.id,
        totalScore: newTotalScore,
        traits: updatedTraits,
      });
    }
  };

  const activeChoice: PsychGameChoice | null =
    selectedChoiceIdx !== null ? currentScene.choices[selectedChoiceIdx] : null;

  const progressPercent = ((currentSceneIdx + 1) / category.scenes.length) * 100;

  return (
    <View style={styles.container}>
      {/* Top Bar: Clean header with category info and progress */}
      <View style={styles.topBar}>
        <View style={styles.topBarHeader}>
          <View style={styles.categoryBadgeWrap}>
            <View
              style={[
                styles.categoryDot,
                { backgroundColor: category.themeColor },
              ]}
            />
            <Text style={styles.categoryNameText}>{category.title}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
            style={styles.closeBtn}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Keluar dari permainan"
          >
            <X size={18} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Clean Step Counter & Progress Bar */}
        <View style={styles.progressRow}>
          <Text style={styles.progressStepText}>
            Skenario {currentSceneIdx + 1} dari {category.scenes.length}
          </Text>
          <View style={styles.progressBarBg}>
            <View
              style={[
                styles.progressBarFill,
                {
                  width: `${progressPercent}%`,
                  backgroundColor: category.themeColor,
                },
              ]}
            />
          </View>
        </View>
      </View>

      {/* Main Gameplay Scenario Body */}
      <ScrollView
        style={styles.scrollBody}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Scenario Narrative Box (Primary Focal Point) */}
        <Card style={styles.narrativeCard}>
          {currentScene.contextBanner && (
            <View style={styles.contextBannerPill}>
              <Compass size={13} color={category.themeColor} />
              <Text
                style={[
                  styles.contextBannerText,
                  { color: category.themeColor },
                ]}
              >
                {currentScene.contextBanner}
              </Text>
            </View>
          )}

          <Text style={styles.situationText}>{currentScene.situation}</Text>

          <View style={styles.promptDivider}>
            <View style={styles.dividerLine} />
            <Text style={styles.promptQuestion}>Apa langkah keputusanmu?</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Response Choices List (A, B, C) */}
          <View style={styles.choicesList}>
            {currentScene.choices.map((choice, idx) => {
              const isSelected = selectedChoiceIdx === idx;

              return (
                <TouchableOpacity
                  key={choice.id}
                  activeOpacity={0.85}
                  onPress={() => handleSelectChoice(idx)}
                  style={[
                    styles.choiceCard,
                    isSelected && {
                      borderColor: category.themeColor,
                      backgroundColor: category.themeBg,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={styles.choiceHeaderRow}>
                    <View
                      style={[
                        styles.choiceBullet,
                        isSelected && {
                          backgroundColor: category.themeColor,
                          borderColor: category.themeColor,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.choiceBulletText,
                          isSelected && { color: '#FFFFFF' },
                        ]}
                      >
                        {String.fromCharCode(65 + idx)}
                      </Text>
                    </View>
                    <View style={styles.choiceTagPill}>
                      <Text style={styles.choiceTagText}>{choice.tag}</Text>
                    </View>
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
        </Card>

        {/* Psychological Reflection & Consequence (Displayed upon choice selection) */}
        {activeChoice && (
          <Card variant="tintGreen" style={styles.reflectionCard}>
            <View style={styles.reflectionHeader}>
              <Sparkles size={16} color={colors.brandGreen[700]} />
              <Text style={styles.reflectionTitle}>
                Refleksi Psikologis dari Pilihanmu
              </Text>
            </View>
            <Text style={styles.feedbackText}>{activeChoice.feedback}</Text>

            <View style={styles.learningBox}>
              <View style={styles.learningBoxHeader}>
                <Brain size={14} color={colors.brandBlue[600]} />
                <Text style={styles.learningLabel}>
                  Wawasan Edukasi Sebaya:
                </Text>
              </View>
              <Text style={styles.learningText}>
                {activeChoice.learningPoint}
              </Text>
            </View>
          </Card>
        )}
      </ScrollView>

      {/* Docked Sticky Bottom CTA Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={selectedChoiceIdx === null}
          onPress={handleNextScene}
          style={[
            styles.nextBtn,
            { backgroundColor: category.themeColor },
            selectedChoiceIdx === null && styles.nextBtnDisabled,
          ]}
          accessibilityRole="button"
        >
          <Text
            style={[
              styles.nextBtnText,
              selectedChoiceIdx === null && styles.nextBtnTextDisabled,
            ]}
          >
            {isLastScene
              ? 'Lihat Hasil Analisis Arketipe'
              : 'Lanjut ke Skenario Berikutnya'}
          </Text>
          <ArrowRight
            size={18}
            color={selectedChoiceIdx === null ? colors.textMuted : '#FFFFFF'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  topBar: {
    backgroundColor: colors.surface,
    paddingTop: Platform.OS === 'ios' ? 48 : 36,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  topBarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryBadgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryNameText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginTop: 4,
  },
  progressStepText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  scrollBody: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    paddingTop: spacing.layout.screenPaddingTop,
    paddingBottom: 110, // Prevent overlap with docked bottom bar
  },
  narrativeCard: {
    padding: spacing.layout.cardPadding,
    marginBottom: spacing.layout.cardGap,
  },
  contextBannerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  contextBannerText: {
    fontSize: 12,
    fontWeight: '700',
  },
  situationText: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textPrimary,
    fontWeight: '400',
    marginBottom: spacing.lg,
  },
  promptDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  promptQuestion: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  choicesList: {
    gap: spacing.layout.itemGap,
  },
  choiceCard: {
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.lg,
    padding: 14,
    minHeight: 52,
  },
  choiceHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  choiceBullet: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceBulletText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  choiceTagPill: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: borderRadius.full,
  },
  choiceTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  choiceText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },
  choiceTextSelected: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  reflectionCard: {
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  reflectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: spacing.xs,
  },
  reflectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  feedbackText: {
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  learningBox: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
  },
  learningBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  learningLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  learningText: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 32 : spacing.md,
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: borderRadius.md,
  },
  nextBtnDisabled: {
    backgroundColor: colors.surfaceAlt,
  },
  nextBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  nextBtnTextDisabled: {
    color: colors.textMuted,
  },
});
