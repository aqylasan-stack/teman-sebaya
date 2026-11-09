import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { User, Mail, Lock, CheckSquare, Square } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { useApp } from '../../state/AppContext';

export const RegisterScreen: React.FC = () => {
  const { navigateTo } = useApp();

  // All inputs strictly start empty
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError('Nama lengkap atau nama samaran wajib diisi.');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim() || !email.includes('@')) {
      setEmailError('Alamat email valid wajib diisi.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Kata sandi wajib diisi.');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Kata sandi minimal 8 karakter.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (password !== confirmPassword) {
      setConfirmError('Konfirmasi kata sandi tidak cocok.');
      isValid = false;
    } else {
      setConfirmError('');
    }

    if (!termsAgreed) {
      setTermsError('Mohon setujui ketentuan layanan.');
      isValid = false;
    } else {
      setTermsError('');
    }

    if (!isValid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to OTP verification
      navigateTo('otp_verification', { name, email, password });
    }, 600);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Image
          source={require('../../../assets/branding/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>TEMAN SEBAYA</Text>
        <Text style={styles.screenHeading}>Daftar Akun Baru</Text>
        <Text style={styles.screenSubheading}>
          Dapatkan akses penuh ke seluruh ruang pendampingan dan fitur Teman Sebaya.
        </Text>
      </View>

      <View style={styles.form}>
        <Input
          label="Nama Lengkap / Samaran"
          placeholder="Misal: Anya Sebaya"
          value={name}
          onChangeText={(val) => {
            setName(val);
            if (nameError) setNameError('');
          }}
          error={nameError}
          leftIcon={<User size={18} color={colors.textMuted} />}
        />

        <Input
          label="Alamat Email"
          placeholder="contoh@email.com"
          value={email}
          onChangeText={(val) => {
            setEmail(val);
            if (emailError) setEmailError('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          error={emailError}
          leftIcon={<Mail size={18} color={colors.textMuted} />}
        />

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

        {/* Dynamic Password Strength Indicator */}
        <PasswordStrengthMeter passwordValue={password} />

        <Input
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi baru"
          value={confirmPassword}
          onChangeText={(val) => {
            setConfirmPassword(val);
            if (confirmError) setConfirmError('');
          }}
          isPassword
          error={confirmError}
          leftIcon={<Lock size={18} color={colors.textMuted} />}
          containerStyle={{ marginTop: spacing.xs }}
        />

        {/* Terms Agreement Checkbox */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setTermsAgreed(!termsAgreed);
            if (termsError) setTermsError('');
          }}
          style={styles.checkboxRow}
        >
          {termsAgreed ? (
            <CheckSquare size={18} color={colors.brandBlue[600]} />
          ) : (
            <Square size={18} color={colors.borderMedium} />
          )}
          <Text style={styles.checkboxLabel}>
            Saya menyetujui Ketentuan Layanan, Prinsip Ruang Aman, dan Kebijakan Privasi.
          </Text>
        </TouchableOpacity>
        {termsError ? <Text style={styles.errorText}>{termsError}</Text> : null}

        <Button
          title="Daftar Sekarang"
          variant="primary"
          fullWidth
          loading={isLoading}
          onPress={handleRegister}
          style={styles.submitBtn}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Sudah memiliki akun?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigateTo('login')}
        >
          <Text style={styles.loginLink}>Masuk ke Akun</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    marginBottom: spacing.lg,
  },
  logoImage: {
    width: 56,
    height: 56,
    marginBottom: spacing.xs,
  },
  brandTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.brandBlue[600],
    marginBottom: 4,
  },
  screenHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  screenSubheading: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  form: {
    flex: 1,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: spacing.xs,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  errorText: {
    fontSize: 11,
    color: colors.crisis.dangerText,
    marginBottom: 6,
  },
  submitBtn: {
    marginTop: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.lg,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  loginLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
});

