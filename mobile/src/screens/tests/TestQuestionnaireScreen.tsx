import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronLeft, ChevronRight, X } from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useApp } from '../../state/AppContext';

export const TestQuestionnaireScreen: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  const questions = [
    'Saya memiliki imajinasi yang jelas dan senang mengeksplorasi ide baru.',
    'Saya selalu merencanakan tugas-tugas sekolah dan menyelesaikannya teratur.',
    'Saya mudah merasa cemas atau overthinking ketika menghadapi tekanan.',
    'Saya senang mendengarkan dan berempati dengan teman yang sedang kesulitan.',
    'Saya merasa bersemangat ketika berinteraksi dalam kelompok yang aktif.',
  ];

  const options = [
    'Tidak Pernah',
    'Sangat Jarang',
    'Jarang',
    'Kadang-kadang',
    'Sering',
    'Selalu',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  const handleSelectOption = (optIdx: number) => {
    setAnswers({ ...answers, [currentIndex]: optIdx });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigateTo('test_result');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const selectedAnswer = answers[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Top Progress Bar & Close Button */}
      <View style={styles.header}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
        </View>

        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            {currentIndex + 1}/{questions.length}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={styles.closeBtn}>
            <X size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Question Prompt */}
      <View style={styles.questionSection}>
        <Text style={styles.questionText}>{questions[currentIndex]}</Text>
      </View>

      {/* 6 Likert Scale Option Pills matching screenshot */}
      <View style={styles.optionsList}>
        {options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;

          return (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.7}
              onPress={() => handleSelectOption(idx)}
              style={[
                styles.optionPill,
                isSelected && styles.optionPillSelected,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Bottom Nav Arrows */}
      <View style={styles.bottomNavRow}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePrev}
          disabled={currentIndex === 0}
          style={[styles.navArrowBtn, currentIndex === 0 && styles.navArrowDisabled]}
        >
          <ChevronLeft
            size={22}
            color={currentIndex === 0 ? colors.borderMedium : colors.textPrimary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleNext}
          disabled={selectedAnswer === undefined}
          style={[
            styles.navArrowBtn,
            selectedAnswer === undefined && styles.navArrowDisabled,
          ]}
        >
          <ChevronRight
            size={22}
            color={
              selectedAnswer === undefined
                ? colors.borderMedium
                : colors.brandBlue[600]
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingTop: 48,
    paddingHorizontal: spacing.layout.screenPaddingHorizontal,
    paddingBottom: 32,
    justifyContent: 'space-between',
  },
  header: {
    gap: spacing.sm,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#0F3E5D', // Dark navy blue matching screenshot
    borderRadius: borderRadius.full,
  },
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: 4,
  },
  questionSection: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 28,
  },
  optionsList: {
    gap: 10,
    marginVertical: spacing.sm,
  },
  optionPill: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionPillSelected: {
    borderColor: colors.brandBlue[600],
    backgroundColor: colors.brandBlue[50],
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  optionTextSelected: {
    color: colors.brandBlue[700],
    fontWeight: '700',
  },
  bottomNavRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  navArrowBtn: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrowDisabled: {
    borderColor: colors.borderLight,
    backgroundColor: colors.surfaceAlt,
  },
});

