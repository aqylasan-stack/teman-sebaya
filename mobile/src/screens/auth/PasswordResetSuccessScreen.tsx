import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const PasswordResetSuccessScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.successEmoji}>✅</Text>

        <Text style={styles.title}>Kata Sandi Berhasil Diperbarui!</Text>
        <Text style={styles.subtitle}>
          Kata sandi barumu telah tersimpan dengan aman. Silakan gunakan kata
          sandi baru untuk masuk ke akun Teman Sebaya.
        </Text>
      </View>

      <Button
        title="Masuk ke Akun"
        variant="primary"
        fullWidth
        iconRight={<ArrowRight size={16} color={colors.surface} />}
        onPress={() => navigateTo('login')}
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
  successEmoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: spacing.lg,
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
  },
});

