import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { X, ChevronDown, ChevronUp, Sparkles, HeartHandshake } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const TestResultScreen: React.FC = () => {
  const { navigateTo, switchTab } = useApp();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const traits = [
    {
      percentage: '70%',
      name: 'Openness to Experience',
      norm: 'high',
      color: '#0D7287',
      explanation:
        'Kamu memiliki rasa ingin tahu intelektual yang tinggi, kreatif, terbuka terhadap ide-ide baru, dan menikmati hal-hal seni atau eksploratif.',
    },
    {
      percentage: '55%',
      name: 'Conscientiousness',
      norm: 'average',
      color: '#D97706',
      explanation:
        'Kamu memiliki keseimbangan yang baik antara kedisiplinan menyelesaikan tugas dan fleksibilitas beradaptasi terhadap perubahan situasi.',
    },
    {
      percentage: '50%',
      name: 'Neuroticism',
      norm: 'high',
      color: '#0D7287',
      explanation:
        'Kamu cenderung peka terhadap tekanan dan stres emosional. Latihan regulasi emosi di Teman Sebaya sangat tepat untuk membantumu.',
    },
    {
      percentage: '45%',
      name: 'Agreeableness',
      norm: 'low',
      color: '#DC2626',
      explanation:
        'Kamu mandiri dan tidak ragu menyuarakan pendapat pribadimu secara tegas, meskipun terkadang perlu melatih asertivitas yang lebih hangat.',
    },
    {
      percentage: '40%',
      name: 'Extraversion',
      norm: 'low',
      color: '#DC2626',
      explanation:
        'Kamu cenderung mengisi energi saat sendiri (introvert). Kamu lebih nyaman dalam kelompok kecil yang hangat dan bermakna.',
    },
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <View style={styles.container}>
      {/* Top Close Button */}
      <View style={styles.topBar}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => switchTab('beranda')}
          style={styles.closeBtn}
        >
          <X size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Desk / Student Illustration */}
        <View style={styles.imageWrap}>
          <Image
            source={require('../../../assets/tests/result_desk.jpg')}
            style={styles.resultImage}
            resizeMode="contain"
          />
        </View>

        {/* Traits Card Container matching screenshot */}
        <View style={styles.traitsCard}>
          {traits.map((trait, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <View
                key={idx}
                style={[
                  styles.traitItem,
                  idx < traits.length - 1 && styles.traitBorder,
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => toggleExpand(idx)}
                  style={styles.traitHeader}
                >
                  <View style={styles.traitMain}>
                    <Text style={[styles.traitTitle, { color: trait.color }]}>
                      {trait.percentage} {trait.name}
                    </Text>
                    <Text style={styles.traitNorm}>Detail norm: {trait.norm}</Text>
                  </View>
                  {isExpanded ? (
                    <ChevronUp size={20} color={colors.textPrimary} />
                  ) : (
                    <ChevronDown size={20} color={colors.textPrimary} />
                  )}
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.traitExplanationBox}>
                    <Text style={styles.traitExplanationText}>
                      {trait.explanation}
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Bottom Buttons matching screenshot */}
      <View style={styles.footer}>
        <Button
          title="Cari Bantuan & Cerita"
          variant="primary"
          fullWidth
          size="lg"
          style={styles.helpBtn}
          iconLeft={<HeartHandshake size={18} color={colors.surface} />}
          onPress={() => switchTab('cerita')}
        />
        <Button
          title="Ulangi Tes"
          variant="outline"
          fullWidth
          size="lg"
          style={styles.repeatBtn}
          onPress={() => navigateTo('test_intro')}
        />
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
    paddingBottom: spacing.layout.screenPaddingBottom,
    justifyContent: 'space-between',
  },
  topBar: {
    alignItems: 'flex-end',
    marginBottom: spacing.xs,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  imageWrap: {
    width: '100%',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  traitsCard: {
    backgroundColor: '#E6F4F7', // Soft cyan/blue background matching screenshot
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    width: '100%',
  },
  traitItem: {
    paddingVertical: spacing.md,
  },
  traitBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 62, 93, 0.1)',
  },
  traitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  traitMain: {
    flex: 1,
  },
  traitTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  traitNorm: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  traitExplanationBox: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
  },
  traitExplanationText: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  footer: {
    gap: spacing.sm,
    paddingTop: spacing.xs,
  },
  helpBtn: {
    backgroundColor: colors.accentPeach[500], // Orange CTA matching screenshot
  },
  repeatBtn: {
    borderColor: colors.accentPeach[500],
    borderWidth: 1.5,
  },
});

