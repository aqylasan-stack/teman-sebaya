import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { KeyRound, ArrowLeft } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const VerifyCodeScreen: React.FC = () => {
  const { navigateTo, screenParams } = useApp();

  const [digits, setDigits] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const ref1 = useRef<any>(null);
  const ref2 = useRef<any>(null);
  const ref3 = useRef<any>(null);
  const ref4 = useRef<any>(null);
  const refs = [ref1, ref2, ref3, ref4];

  const handleDigitChange = (val: string, index: number) => {
    if (val.length > 1) {
      val = val[val.length - 1];
    }
    const next = [...digits];
    next[index] = val;
    setDigits(next);

    if (error) setError('');

    if (val && index < 3) {
      refs[index + 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const fullCode = digits.join('');
    if (fullCode.length < 4) {
      setError('Masukkan 4 digit kode pemulihan.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigateTo('create_new_password');
    }, 600);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigateTo('forgot_password')}
        style={styles.backBtn}
      >
        <ArrowLeft size={20} color={colors.textPrimary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <KeyRound size={36} color={colors.brandBlue[600]} />
        </View>

        <Text style={styles.title}>Masukkan Kode Pemulihan</Text>
        <Text style={styles.subtitle}>
          Kode 4-digit telah dikirimkan ke:{' '}
          <Text style={styles.emailHighlight}>
            {screenParams.email || 'emailkamu@domain.id'}
          </Text>
        </Text>

        <View style={styles.boxesRow}>
          {digits.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={refs[idx] as any}
              style={[
                styles.box,
                digit ? styles.boxFilled : null,
                error ? styles.boxError : null,
              ]}
              value={digit}
              onChangeText={(val) => handleDigitChange(val, idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              selectTextOnFocus
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <Button
        title="Lanjut Buat Kata Sandi Baru"
        variant="primary"
        fullWidth
        loading={loading}
        onPress={handleVerify}
      />
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
    fontSize: 20,
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
    marginBottom: spacing.xl,
  },
  emailHighlight: {
    fontWeight: '600',
    color: colors.brandBlue[700],
  },
  boxesRow: {
    flexDirection: 'row',
    gap: spacing.md,
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  box: {
    width: 56,
    height: 60,
    borderRadius: borderRadius.lg,
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surfaceAlt,
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  boxFilled: {
    borderColor: colors.brandBlue[600],
    backgroundColor: colors.brandBlue[50],
  },
  boxError: {
    borderColor: colors.crisis.dangerBorder,
  },
  errorText: {
    fontSize: 12,
    color: colors.crisis.dangerText,
    marginBottom: spacing.sm,
  },
});
