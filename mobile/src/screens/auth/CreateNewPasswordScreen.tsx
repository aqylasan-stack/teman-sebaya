import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Lock, ArrowLeft } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { useApp } from '../../state/AppContext';

export const CreateNewPasswordScreen: React.FC = () => {
  const { navigateTo } = useApp();

  // STRICTLY EMPTY INITIAL VALUES per user rules
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    let isValid = true;

    if (!password) {
      setPasswordError('Kata sandi baru wajib diisi.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Kata sandi minimal 8 karakter.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmError('Konfirmasi kata sandi baru tidak cocok.');
      isValid = false;
    } else {
      setConfirmError('');
    }

    if (!isValid) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigateTo('password_reset_success');
    }, 600);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigateTo('verify_code')}
        style={styles.backBtn}
      >
        <ArrowLeft size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Lock size={36} color={colors.brandBlue[600]} />
        </View>
        <Text style={styles.title}>Buat Kata Sandi Baru</Text>
        <Text style={styles.subtitle}>
          Pilih kata sandi yang kuat dan mudah kamu ingat, namun belum pernah
          digunakan sebelumnya.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Kata Sandi Baru"
          placeholder="Minimal 8 karakter"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (passwordError) setPasswordError('');
          }}
          isPassword
          error={passwordError}
          leftIcon={<Lock size={18} color={colors.textMuted} />}
        />

        {/* Dynamic Strength Meter */}
        <PasswordStrengthMeter passwordValue={password} />

        <Input
          label="Konfirmasi Kata Sandi Baru"
          placeholder="Ulangi kata sandi baru"
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
            if (confirmError) setConfirmError('');
          }}
          isPassword
          error={confirmError}
          leftIcon={<Lock size={18} color={colors.textMuted} />}
          containerStyle={{ marginTop: spacing.md }}
        />
      </View>

      <Button
        title="Simpan Kata Sandi"
        variant="primary"
        fullWidth
        loading={loading}
        onPress={handleSave}
        style={styles.submitBtn}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  header: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
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
    paddingHorizontal: spacing.sm,
  },
  form: {
    flex: 1,
  },
  submitBtn: {
    marginTop: spacing.xl,
  },
});

