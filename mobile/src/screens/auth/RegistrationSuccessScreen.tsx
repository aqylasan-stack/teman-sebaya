import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckCircle2, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const RegistrationSuccessScreen: React.FC = () => {
  const { navigateTo, switchTab } = useApp();

  const handleStart = () => {
    switchTab('beranda');
    navigateTo('main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <CheckCircle2 size={56} color={colors.brandGreen[600]} />
        </View>

        <Text style={styles.title}>Pendaftaran Berhasil!</Text>
        <Text style={styles.subtitle}>
          Selamat bergabung di Teman Sebaya. Ruang amanmu kini telah siap. Mari
          mulai perjalanan mengenali perasaan dan merawat kesehatan emosimu.
        </Text>

        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>💡 Tips Awal Memulai:</Text>
          <Text style={styles.tipsText}>
            Lakukan Mood Check-in harian setiap pagi atau malam untuk memantau
            perkembangan emosimu secara bertahap.
          </Text>
        </View>
      </View>

      <Button
        title="Mulai Eksplorasi Beranda"
        variant="primary"
        fullWidth
        iconRight={<ArrowRight size={16} color={colors.surface} />}
        onPress={handleStart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: 80,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandGreen[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
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
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  tipsCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: colors.brandGreen[600],
  },
  tipsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  tipsText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

