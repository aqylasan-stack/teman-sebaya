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
import { Mail, Lock, CheckSquare, Square } from 'lucide-react-native';
import { colors, spacing, typography } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { GoogleIcon } from '../../components/common/GoogleIcon';
import { useApp } from '../../state/AppContext';

export const LoginScreen: React.FC = () => {
  const { login, loginWithGoogle, navigateTo } = useApp();

  // Initial Form State: empty per specification
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  const handleGoogleLogin = () => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      // FLOW 1 — LOGIN with Google:
      // Memanfaatkan data profil yang diberikan Google (email, nama)
      // Jika profil sudah lengkap -> langsung lanjut ke Mood Check-in sebelum Beranda.
      // Jika profil belum lengkap -> hanya minta data yang belum dimiliki.
      loginWithGoogle({
        email: 'anya.sebaya@gmail.com',
        name: 'Anya Sebaya',
      });
    }, 600);
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
          <Text style={styles.headerHeading}>Selamat Datang!</Text>
          <Text style={styles.headerSubtitle}>
            Masuk untuk melanjutkan perjalanan amanmu bersama Teman Sebaya.
          </Text>
        </View>

        {/* 2. Form Sheet: Rounded Top Corners overlapping Header */}
        <View style={styles.formSheet}>
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
            label="Kata Sandi"
            placeholder="Masukkan kata sandi Anda"
            value={password}
            onChangeText={(val) => {
              setPassword(val);
              if (passwordError) setPasswordError('');
            }}
            isPassword
            error={passwordError}
            leftIcon={<Lock size={18} color={colors.textMuted} />}
            inputWrapperStyle={styles.roundedInputWrapper}
            containerStyle={{ marginBottom: spacing.sm }}
          />

          {/* Remember Me & Forgot Password Row */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setRememberMe(!rememberMe)}
              style={styles.rememberMeWrap}
            >
              {rememberMe ? (
                <CheckSquare size={17} color={colors.brandBlue[600]} />
              ) : (
                <Square size={17} color={colors.borderMedium} />
              )}
              <Text style={styles.rememberMeText}>Ingat saya</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigateTo('forgot_password')}
              style={styles.forgotPasswordBtn}
            >
              <Text style={styles.forgotPasswordText}>Lupa kata sandi?</Text>
            </TouchableOpacity>
          </View>

          {/* Primary Action Button */}
          <Button
            title="Masuk"
            variant="primary"
            fullWidth
            size="lg"
            loading={isLoading}
            onPress={handleLogin}
            style={styles.submitBtn}
            textStyle={styles.submitBtnText}
          />

          {/* Separator ("atau") */}
          <View style={styles.separatorRow}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>atau</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Google Sign-in Option */}
          <TouchableOpacity
            style={styles.googleBtn}
            activeOpacity={0.8}
            onPress={handleGoogleLogin}
            disabled={isGoogleLoading}
          >
            <GoogleIcon size={20} />
            <Text style={styles.googleBtnText}>
              {isGoogleLoading ? 'Menghubungkan...' : 'Masuk dengan Google'}
            </Text>
          </TouchableOpacity>

          {/* Bottom Navigation Link to Register */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Belum memiliki akun? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigateTo('register')}
            >
              <Text style={styles.footerLink}>Daftar Sekarang</Text>
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

  /* Options Row */
  optionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
    marginBottom: 22,
  },
  rememberMeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  rememberMeText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  forgotPasswordBtn: {
    paddingVertical: 4,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brandBlue[600],
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
    marginVertical: 22,
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
    marginTop: 26,
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
