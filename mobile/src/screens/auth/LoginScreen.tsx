import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Mail, Lock, CheckSquare, Square, Sparkles } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const LoginScreen: React.FC = () => {
  const { login, navigateTo } = useApp();

  // Initial State: STRICTLY EMPTY per user rules
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError('Alamat email wajib diisi.');
      isValid = false;
    } else if (!email.includes('@')) {
      setEmailError('Format email tidak valid.');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Kata sandi wajib diisi.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Kata sandi minimal 6 karakter.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!isValid) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(email, password);
    }, 600);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Brand Header */}
      <View style={styles.header}>
        <Image
          source={require('../../../assets/branding/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.brandTitle}>TEMAN SEBAYA</Text>
        <Text style={styles.screenHeading}>Selamat datang kembali.</Text>
        <Text style={styles.screenSubheading}>
          Masuk untuk melanjutkan perjalanan amanmu di Teman Sebaya.
        </Text>
      </View>

      {/* Form Fields */}
      <View style={styles.form}>
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
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
          value={password}
          onChangeText={(val) => {
            setPassword(val);
            if (passwordError) setPasswordError('');
          }}
          isPassword
          error={passwordError}
          leftIcon={<Lock size={18} color={colors.textMuted} />}
        />

        {/* Remember me & Forgot Password */}
        <View style={styles.optionsRow}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMeWrap}
          >
            {rememberMe ? (
              <CheckSquare size={16} color={colors.brandBlue[600]} />
            ) : (
              <Square size={16} color={colors.borderMedium} />
            )}
            <Text style={styles.rememberMeText}>Ingat saya</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigateTo('forgot_password')}
          >
            <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <Button
          title="Masuk ke Akun"
          variant="primary"
          fullWidth
          loading={isLoading}
          onPress={handleLogin}
          style={styles.submitBtn}
        />

        {/* Demo Account Quick Fill */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setEmail('anya.sebaya@teman.id');
            setPassword('123456');
            setEmailError('');
            setPasswordError('');
          }}
          style={styles.demoFillBtn}
        >
          <Sparkles size={14} color={colors.brandBlue[600]} />
          <Text style={styles.demoFillText}>Isi Akun Demo Otomatis</Text>
        </TouchableOpacity>
      </View>

      {/* Footer link to Register */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Belum memiliki akun?</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigateTo('register')}
        >
          <Text style={styles.registerLink}>Daftar Akun Baru</Text>
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
    paddingTop: 64,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: spacing.xl,
  },
  logoImage: {
    width: 60,
    height: 60,
    marginBottom: spacing.xs,
  },
  brandTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.brandBlue[600],
    marginBottom: spacing.xs,
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
    lineHeight: 20,
  },
  form: {
    flex: 1,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  rememberMeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rememberMeText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  forgotPasswordText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  submitBtn: {
    marginTop: spacing.lg,
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: spacing.sm,
    paddingVertical: 10,
    backgroundColor: colors.brandBlue[50],
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.brandBlue[200],
  },
  demoFillText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
});

