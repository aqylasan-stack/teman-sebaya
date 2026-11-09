import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle2, HelpCircle, ArrowRight, Award } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { QuizData } from '../../types';

interface QuizModalProps {
  visible: boolean;
  quiz: QuizData;
  onClose: () => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  visible,
  quiz,
  onClose,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = quiz.questions[currentQuestionIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    if (idx === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
    onClose();
  };

  return (
    <Modal visible={visible} onClose={handleReset}>
      {!isCompleted ? (
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.badgeWrap}>
              <HelpCircle size={16} color={colors.brandBlue[600]} />
              <Text style={styles.badgeText}>
                Soal {currentQuestionIndex + 1} dari {quiz.questions.length}
              </Text>
            </View>
          </View>

          {/* Question Text */}
          <Text style={styles.questionText}>{currentQ.question}</Text>

          {/* Options List */}
          <View style={styles.optionsList}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let optBg = colors.surface;
              let optBorder = colors.borderMedium;
              let optTextColor = colors.textPrimary;

              if (isAnswered) {
                if (isCorrect) {
                  optBg = colors.feedback.successBg;
                  optBorder = colors.feedback.successBorder;
                  optTextColor = colors.feedback.successText;
                } else if (isSelected) {
                  optBg = colors.crisis.dangerBg;
                  optBorder = colors.crisis.dangerBorder;
                  optTextColor = colors.crisis.dangerText;
                }
              } else if (isSelected) {
                optBg = colors.brandBlue[50];
                optBorder = colors.brandBlue[600];
              }

              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  disabled={isAnswered}
                  onPress={() => handleSelectOption(idx)}
                  style={[
                    styles.optionButton,
                    { backgroundColor: optBg, borderColor: optBorder },
                  ]}
                >
                  <Text style={[styles.optionText, { color: optTextColor }]}>
                    {opt}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Explanation Box */}
          {isAnswered && (
            <View style={styles.explanationBox}>
              <Text style={styles.explanationTitle}>Pembahasan Edukatif:</Text>
              <Text style={styles.explanationText}>{currentQ.explanation}</Text>
            </View>
          )}

          {/* Next / Submit Button */}
          {isAnswered && (
            <Button
              title={
                currentQuestionIndex < quiz.questions.length - 1
                  ? 'Soal Selanjutnya'
                  : 'Lihat Hasil Kuis'
              }
              variant="primary"
              fullWidth
              iconRight={<ArrowRight size={16} color={colors.surface} />}
              onPress={handleNextQuestion}
              style={styles.nextButton}
            />
          )}
        </View>
      ) : (
        /* Completion View */
        <View style={styles.completedContainer}>
          <View style={styles.awardBadge}>
            <Award size={36} color={colors.accentAmber[500]} />
          </View>
          <Text style={styles.completedTitle}>Hebat, Kamu Sudah Belajar!</Text>
          <Text style={styles.completedScore}>
            Kamu menjawab benar {score} dari {quiz.questions.length} soal.
          </Text>
          <Text style={styles.completedDesc}>
            Uji pemahaman ini bukan tentang nilai angka, melainkan ruang untuk
            memperkaya literasi kesehatan mental dan relasi sehatmu.
          </Text>
          <Button
            title="Selesai & Tutup Kuis"
            variant="primary"
            fullWidth
            onPress={handleReset}
            style={styles.finishButton}
          />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  badgeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandBlue[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  questionText: {
    ...typography.cardHeading,
    fontSize: 15,
    lineHeight: 22,
    color: colors.textPrimary,
  },
  optionsList: {
    gap: spacing.xs,
    marginVertical: spacing.xs,
  },
  optionButton: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  optionText: {
    fontSize: 12.5,
    lineHeight: 18,
  },
  explanationBox: {
    backgroundColor: colors.surfaceAlt,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.brandBlue[600],
    marginTop: spacing.xs,
  },
  explanationTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[700],
    marginBottom: 2,
  },
  explanationText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  nextButton: {
    marginTop: spacing.sm,
  },
  completedContainer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  awardBadge: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.accentAmber[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  completedScore: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  completedDesc: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginVertical: spacing.xs,
  },
  finishButton: {
    marginTop: spacing.sm,
  },
});

