import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  Award,
  X,
} from 'lucide-react-native';
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
  const isUserCorrect =
    selectedOption !== null && selectedOption === currentQ.correctIndex;

  // Bersihkan awalan "Tepat!" atau "Benar!" dari string pembahasan jika ada
  const cleanExplanation = currentQ.explanation.replace(
    /^(Tepat sekali!|Benar sekali\.|Tepat!|Benar!)\s*/i,
    ''
  );

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
          {/* Header Bar: Badge Counter + Tombol Tutup */}
          <View style={styles.header}>
            <View style={styles.badgeWrap}>
              <HelpCircle size={15} color={colors.brandBlue[600]} />
              <Text style={styles.badgeText}>
                Soal {currentQuestionIndex + 1} dari {quiz.questions.length}
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleReset}
              style={styles.closeButton}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityLabel="Tutup Kuis"
            >
              <X size={18} color={colors.textSecondary} />
            </TouchableOpacity>
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
                  optBg = '#F0FDF4';
                  optBorder = '#86EFAC';
                  optTextColor = '#15803D';
                } else if (isSelected) {
                  optBg = '#FEF2F2';
                  optBorder = '#FCA5A5';
                  optTextColor = '#B91C1C';
                } else {
                  optBg = colors.surfaceAlt;
                  optBorder = colors.borderLight;
                  optTextColor = colors.textMuted;
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
                  <View style={styles.optionContentRow}>
                    <Text
                      style={[
                        styles.optionText,
                        { color: optTextColor },
                        isAnswered && (isCorrect || isSelected) && { fontWeight: '600' },
                      ]}
                    >
                      {opt}
                    </Text>

                    {/* Badge Indikator Status Jawaban */}
                    {isAnswered && isCorrect && (
                      <View style={styles.optionTagSuccess}>
                        <CheckCircle2 size={13} color="#16A34A" />
                        <Text style={styles.optionTagSuccessText}>Benar</Text>
                      </View>
                    )}

                    {isAnswered && isSelected && !isCorrect && (
                      <View style={styles.optionTagDanger}>
                        <XCircle size={13} color="#DC2626" />
                        <Text style={styles.optionTagDangerText}>Pilihanmu</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Dynamic Feedback Banner + Pembahasan Edukatif */}
          {isAnswered && (
            <View style={styles.feedbackContainer}>
              {/* Banner Status: Menyesuaikan apakah jawaban pengguna benar atau salah */}
              <View
                style={[
                  styles.statusBanner,
                  isUserCorrect
                    ? styles.statusBannerSuccess
                    : styles.statusBannerDanger,
                ]}
              >
                {isUserCorrect ? (
                  <CheckCircle2 size={18} color="#16A34A" />
                ) : (
                  <XCircle size={18} color="#DC2626" />
                )}

                <View style={styles.statusTextWrap}>
                  <Text
                    style={[
                      styles.statusTitle,
                      { color: isUserCorrect ? '#15803D' : '#B91C1C' },
                    ]}
                  >
                    {isUserCorrect ? 'Jawabanmu Tepat! 🎉' : 'Jawabanmu Kurang Tepat'}
                  </Text>
                  {!isUserCorrect && (
                    <Text style={styles.statusSub}>
                      Kunci yang benar adalah{' '}
                      <Text style={styles.correctHighlight}>
                        "{currentQ.options[currentQ.correctIndex]}"
                      </Text>
                    </Text>
                  )}
                </View>
              </View>

              {/* Box Pembahasan Netral & Berwawasan */}
              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>Pembahasan Edukatif</Text>
                <Text style={styles.explanationText}>{cleanExplanation}</Text>
              </View>
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
  closeButton: {
    padding: 4,
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
  optionContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  optionText: {
    fontSize: 12.5,
    lineHeight: 18,
    flex: 1,
  },
  optionTagSuccess: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  optionTagSuccessText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#15803D',
  },
  optionTagDanger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  optionTagDangerText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#B91C1C',
  },

  /* Feedback Container */
  feedbackContainer: {
    gap: 8,
    marginTop: spacing.xs,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    padding: 10,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  statusBannerSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  statusBannerDanger: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  statusTextWrap: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  statusSub: {
    fontSize: 11.5,
    color: '#7F1D1D',
    lineHeight: 16,
    marginTop: 2,
  },
  correctHighlight: {
    fontWeight: '700',
    color: '#991B1B',
  },
  explanationBox: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.md,
    padding: 10,
  },
  explanationTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  explanationText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  nextButton: {
    marginTop: spacing.xs,
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
