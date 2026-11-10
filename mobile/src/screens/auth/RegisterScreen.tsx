import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { User, Mail, Lock, CheckSquare, Square } from 'lucide-react-native';
import { colors, spacing } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { GoogleIcon } from '../../components/common/GoogleIcon';
import { PasswordStrengthMeter } from '../../components/auth/PasswordStrengthMeter';
import { useApp } from '../../state/AppContext';

export const RegisterScreen: React.FC = () => {
  const { navigateTo, register } = useApp();

  // All inputs strictly start empty per specification
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Validation Errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
      // Navigate to OTP verification per architecture flow
      navigateTo('otp_verification', { name, email, password });
    }, 600);
  };

  const handleGoogleRegister = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      register(name.trim() || 'Teman Baru', 'google.newuser@teman.id', 'google_session_pass');
    }, 700);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardRoot}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        {/* 1. Header Area: Follows App Primary Brand Blue */}
        <View style={styles.header}>
          {/* Die-Cut Sticker Logo (Clean standalone, without redundant text) */}
          <Image
            source={require('../../../assets/branding/logo_transparent.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />

          {/* Heading & Subtitle */}
          <Text style={styles.headerHeading}>Buat Akun Barumu</Text>
          <Text style={styles.headerSubtitle}>
            Bergabung bersama ruang aman untuk mengenali diri dan bertumbuh bersama.
          </Text>
        </View>

        {/* 2. Form Sheet: Rounded Top Corners overlapping Header */}
        <View style={styles.formSheet}>
          {/* Name Field */}
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
            inputWrapperStyle={styles.roundedInputWrapper}
          />

          {/* Email Field */}
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
            inputWrapperStyle={styles.roundedInputWrapper}
          />

          {/* Password Field */}
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
            inputWrapperStyle={styles.roundedInputWrapper}
            containerStyle={{ marginBottom: spacing.xs }}
          />

          {/* Password Strength Indicator */}
          <PasswordStrengthMeter passwordValue={password} />

          {/* Confirm Password Field */}
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
            inputWrapperStyle={styles.roundedInputWrapper}
            containerStyle={{ marginTop: spacing.xs, marginBottom: spacing.sm }}
          />

          {/* Terms & Conditions Agreement */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setTermsAgreed(!termsAgreed);
              if (termsError) setTermsError('');
            }}
            style={styles.termsRow}
          >
            {termsAgreed ? (
              <CheckSquare size={17} color={colors.brandBlue[600]} style={{ marginTop: 2 }} />
            ) : (
              <Square size={17} color={termsError ? colors.crisis.dangerBorder : colors.borderMedium} style={{ marginTop: 2 }} />
            )}
            <Text style={styles.termsText}>
              Saya menyetujui{' '}
              <Text style={styles.termsHighlight}>Ketentuan Layanan</Text> &{' '}
              <Text style={styles.termsHighlight}>Kebijakan Privasi</Text> Teman Sebaya.
            </Text>
          </TouchableOpacity>
          {termsError ? <Text style={styles.termsErrorText}>{termsError}</Text> : null}

          {/* Primary Action Button */}
          <Button
            title="Daftar Akun"
            variant="primary"
            fullWidth
            size="lg"
            loading={isLoading}
            onPress={handleRegister}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
          />

          {/* Separator ("atau") */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>atau</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Google Sign-up Option */}
          <TouchableOpacity
            style={styles.googleBtn}
            activeOpacity={0.8}
            onPress={handleGoogleRegister}
            disabled={isGoogleLoading}
          >
            <GoogleIcon size={20} />
            <Text style={styles.googleBtnText}>
              {isGoogleLoading ? 'Menghubungkan...' : 'Daftar dengan Google'}
            </Text>
          </TouchableOpacity>

          {/* Bottom Navigation Link to Login */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Sudah memiliki akun? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigateTo('login')}
            >
              <Text style={styles.footerLink}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardRoot: {
    flex: 1,
    backgroundColor: colors.brandBlue[600],
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.brandBlue[600],
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.brandBlue[600],
  },

  /* 1. Header Area */
  header: {
    backgroundColor: colors.brandBlue[600],
    paddingTop: Platform.OS === 'ios' ? 56 : 48,
    paddingHorizontal: 24,
    paddingBottom: 42,
  },
  logoImage: {
    width: 136,
    height: 79,
    marginBottom: 16,
  },
  headerHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    color: 'rgba(255, 255, 255, 0.88)',
  },

  /* 2. Form Sheet Container */
  formSheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: Platform.OS === 'ios' ? 44 : 32,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },

  /* Rounded Input Styling matching Reference */
  roundedInputWrapper: {
    borderRadius: 22,
    height: 50,
    borderColor: colors.borderMedium,
    backgroundColor: '#FFFFFF',
  },

  /* Terms Checkbox */
  termsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginTop: 4,
    marginBottom: 20,
    paddingRight: 8,
  },
  termsText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  termsHighlight: {
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  termsErrorText: {
    fontSize: 11,
    color: colors.crisis.dangerText,
    marginTop: -14,
    marginBottom: 14,
  },

  /* Primary Button */
  submitBtn: {
    borderRadius: 24,
    height: 50,
    backgroundColor: colors.brandBlue[600],
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  submitBtnText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  /* Separator */
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderLight,
  },
  separatorText: {
    marginHorizontal: 14,
    fontSize: 12.5,
    color: colors.textMuted,
    fontWeight: '500',
  },

  /* Google Button */
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    height: 50,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: '#FFFFFF',
  },
  googleBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  /* Footer Bottom Navigation Link */
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 13.5,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
});
