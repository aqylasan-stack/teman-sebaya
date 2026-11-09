import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const ForgotPasswordScreen: React.FC = () => {
  const { navigateTo } = useApp();

  // Strictly empty initial state
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Masukkan alamat email terdaftar yang valid.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigateTo('verify_code', { email });
    }, 600);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigateTo('login')}
        style={styles.backBtn}
      >
        <ArrowLeft size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Mail size={36} color={colors.brandBlue[600]} />
        </View>

        <Text style={styles.title}>Lupa Kata Sandi?</Text>
        <Text style={styles.subtitle}>
          Masukkan alamat email yang terdaftar pada akunmu. Kami akan mengirimkan
          kode verifikasi untuk mengatur ulang kata sandi.
        </Text>

        <Input
          label="Alamat Email"
          placeholder="contoh@email.com"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (error) setError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={error}
          leftIcon={<Mail size={18} color={colors.textMuted} />}
          containerStyle={{ marginTop: spacing.md }}
        />
      </View>

      <View style={styles.footer}>
        <Button
          title="Kirim Kode Verifikasi"
          variant="primary"
          fullWidth
          loading={loading}
          onPress={handleSubmit}
        />
        <Button
          title="Kembali ke Halaman Masuk"
          variant="ghost"
          fullWidth
          onPress={() => navigateTo('login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: 54,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
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
    lineHeight: 20,
  },
  footer: {
    gap: spacing.xs,
  },
});

