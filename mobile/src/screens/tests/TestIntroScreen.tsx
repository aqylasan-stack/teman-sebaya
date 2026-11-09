import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const TestIntroScreen: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  return (
    <View style={styles.container}>
      {/* Top Close Button */}
      <View style={styles.topBar}>
        <TouchableOpacity activeOpacity={0.7} onPress={goBack} style={styles.closeBtn}>
          <X size={22} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Cover Illustration */}
        <View style={styles.imageWrap}>
          <Image
            source={require('../../../assets/tests/personality_cover.jpg')}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        {/* Title & Introduction */}
        <Text style={styles.title}>Tes Kepribadian</Text>
        <Text style={styles.subtitle}>
          Test Kepribadian ini <Text style={styles.bold}>TIDAK</Text> ditujukan untuk
          mendiagnosis gangguan psikologis, namun untuk membantumu mengenali kondisi dan
          kecenderungan respon emosionalmu.
        </Text>

        {/* 3 Guidelines Card matching screenshot */}
        <View style={styles.guidelinesCard}>
          <View style={styles.guidelineItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>1</Text>
            </View>
            <Text style={styles.guidelineText}>
              Tes ini <Text style={styles.bold}>BUKAN</Text> untuk mendiagnosis gangguan
              psikologis, melainkan hanya untuk memberi gambaran kondisi dirimu saat ini.
            </Text>
          </View>

          <View style={styles.guidelineItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>2</Text>
            </View>
            <Text style={styles.guidelineText}>
              Tidak ada jawaban benar dan salah. Pilih saja satu yang paling menggambarkan
              diri kamu!
            </Text>
          </View>

          <View style={styles.guidelineItem}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberText}>3</Text>
            </View>
            <Text style={styles.guidelineText}>
              Hindari memilih jawaban ragu-ragu untuk hasil analisis yang lebih maksimal.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Start Button */}
      <View style={styles.footer}>
        <Button
          title="Mulai Tes"
          variant="primary"
          fullWidth
          size="lg"
          style={styles.startBtn}
          onPress={() => navigateTo('test_questionnaire')}
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
    paddingHorizontal: spacing.lg,
    paddingBottom: 24,
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
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  imageWrap: {
    width: '100%',
    height: 220,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  bold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  guidelinesCard: {
    backgroundColor: '#FFFBEB', // Warm soft amber/yellow matching screenshot
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
    width: '100%',
  },
  guidelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: borderRadius.full,
    backgroundColor: '#0F3E5D', // Dark navy circle matching screenshot
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  numberText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.surface,
  },
  guidelineText: {
    fontSize: 12,
    color: colors.textPrimary,
    lineHeight: 18,
    flex: 1,
  },
  footer: {
    paddingTop: spacing.xs,
  },
  startBtn: {
    backgroundColor: colors.accentPeach[500], // Orange CTA matching screenshot
  },
});

