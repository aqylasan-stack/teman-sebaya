import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ShieldCheck, UserPlus, LogIn } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const OnboardingCompleteScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Balanced Brand Logo without clumsy blue box wrapper */}
        <Image
          source={require('../../../assets/branding/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={styles.title}>
          Setiap perasaan punya cerita. Setiap cerita layak didengarkan.
        </Text>
        <Text style={styles.subtitle}>
          Selamat datang di TEMAN SEBAYA, ruang digital untuk mengenali diri, belajar, dan bertumbuh bersama.
        </Text>

        {/* Authentic Safety & Trust Card (No exaggerated or fake claims) */}
        <View style={styles.trustCard}>
          <ShieldCheck size={20} color={colors.brandGreen[600]} style={{ marginTop: 2 }} />
          <Text style={styles.trustText}>
            Akun terotentikasi memastikan ruang curhat dan catatan refleksimu terlindungi secara privat.
          </Text>
        </View>
      </View>

      {/* Primary Actions: Mulai Sekarang & Saya Sudah Punya Akun */}
      <View style={styles.footer}>
        <Button
          title="Mulai Sekarang"
          variant="primary"
          fullWidth
          size="lg"
          iconLeft={<UserPlus size={18} color="#FFFFFF" />}
          onPress={() => navigateTo('register')}
        />
        <Button
          title="Saya Sudah Punya Akun"
          variant="secondary"
          fullWidth
          size="lg"
          iconLeft={<LogIn size={18} color={colors.brandBlue[600]} />}
          onPress={() => navigateTo('login')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.xl,
    paddingTop: 64,
    paddingBottom: 36,
    justifyContent: 'space-between',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  logoImage: {
    width: 96,
    height: 96,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 23,
    fontWeight: '800',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 0.2,
  },
  subtitle: {
    ...typography.bodyRegular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  trustCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.brandGreen[50],
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    width: '100%',
  },
  trustText: {
    fontSize: 12.5,
    color: colors.brandGreen[700],
    lineHeight: 18,
    flex: 1,
    fontWeight: '500',
  },
  footer: {
    gap: spacing.sm,
  },
});
