import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Sparkles, ChevronRight, ShieldCheck, Heart, Target, Smile, UserCheck, Flame } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../state/AppContext';

export const TestPsikologiScreen: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  const tests = [
    {
      id: 'personality',
      title: 'Tes Kepribadian',
      subtitle: 'Mengenali 5 dimensi kepribadian utama (Big Five) dan kecenderungan respon emosionalmu.',
      category: 'Kepribadian',
      duration: '5 Menit',
      image: require('../../../assets/tests/personality_cover.jpg'),
      action: () => navigateTo('test_intro'),
    },
    {
      id: 'love_language',
      title: '5 Bahasa Cinta Remaja',
      subtitle: 'Memahami caramu mengekspresikan dan menerima kasih sayang dalam pertemanan dan keluarga.',
      category: 'Relasi',
      duration: '4 Menit',
      icon: Heart,
      action: () => navigateTo('test_intro'),
    },
    {
      id: 'happiness',
      title: 'Happiness & Kesejahteraan',
      subtitle: 'Evaluasi tingkat kepuasan hidup dan faktor-faktor yang mendukung kebahagiaan batinmu.',
      category: 'Kesejahteraan',
      duration: '3 Menit',
      icon: Smile,
      action: () => navigateTo('test_intro'),
    },
    {
      id: 'purpose',
      title: 'Purpose of Life (Tujuan Hidup)',
      subtitle: 'Refleksi mendalam seputar arah minat, makna hidup, dan cita-cita masa depan.',
      category: 'Masa Depan',
      duration: '5 Menit',
      icon: Target,
      action: () => navigateTo('test_intro'),
    },
    {
      id: 'self_efficacy',
      title: 'Self Efficacy (Keyakinan Diri)',
      subtitle: 'Mengukur seberapa percaya dirimu dalam menyelesaikan tantangan dan rintangan baru.',
      category: 'Karakter',
      duration: '4 Menit',
      icon: UserCheck,
      action: () => navigateTo('test_intro'),
    },
  ];

  return (
    <ScreenContainer
      header={<ContextualHeader title="Tes Psikologi Remaja" onBack={goBack} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Kenali Potensi & Karakter Dirimu</Text>
        <Text style={styles.subtitle}>
          Screening mandiri non-klinis untuk eksplorasi diri dan refleksi kesehatan emosi.
        </Text>
      </View>

      {/* Safeguarding Disclaimer */}
      <Card variant="tintAmber" style={styles.disclaimerCard}>
        <View style={styles.disclaimerRow}>
          <ShieldCheck size={20} color={colors.accentAmber[600]} />
          <Text style={styles.disclaimerText}>
            Seluruh tes ini bersifat reflektif dan BUKAN untuk mendiagnosis gangguan
            psikologis formal.
          </Text>
        </View>
      </Card>

      {/* Tests List */}
      <View style={styles.testsList}>
        {tests.map((test) => (
          <Card key={test.id} onPress={test.action} style={styles.testCard}>
            <View style={styles.cardRow}>
              {test.image ? (
                <Image
                  source={test.image}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.iconCircle}>
                  {test.icon && <test.icon size={24} color={colors.brandBlue[600]} />}
                </View>
              )}

              <View style={styles.cardDetails}>
                <View style={styles.badgeRow}>
                  <Badge label={test.category} variant="blue" />
                  <Text style={styles.durationText}>⏱️ {test.duration}</Text>
                </View>
                <Text style={styles.testTitle}>{test.title}</Text>
                <Text style={styles.testSub} numberOfLines={2}>
                  {test.subtitle}
                </Text>
              </View>

              <ChevronRight size={18} color={colors.textPlaceholder} />
            </View>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.xs,
    marginBottom: spacing.layout.sectionGap,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  disclaimerCard: {
    padding: spacing.layout.cardPadding,
    marginBottom: spacing.layout.cardGap,
  },
  disclaimerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  disclaimerText: {
    fontSize: 11.5,
    color: colors.accentAmber[600],
    lineHeight: 16,
    flex: 1,
  },
  testsList: {
    marginBottom: spacing.xxl,
  },
  testCard: {
    padding: spacing.layout.cardPadding,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  thumbnailImage: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.md,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardDetails: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  durationText: {
    fontSize: 10.5,
    color: colors.textMuted,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  testSub: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
});

