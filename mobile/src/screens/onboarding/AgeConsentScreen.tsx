import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ShieldCheck, CheckSquare, Square, HeartHandshake } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const AgeConsentScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleProceed = () => {
    if (!agreed) {
      setError('Mohon setujui prinsip ruang aman untuk melanjutkan.');
      return;
    }
    setError('');
    navigateTo('register');
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.shieldBadge}>
            <ShieldCheck size={32} color={colors.brandBlue[600]} />
          </View>
          <Text style={styles.title}>Prinsip Ruang Aman & Perlindungan Remaja</Text>
          <Text style={styles.subtitle}>
            Teman Sebaya dirancang khusus bagi remaja usia 13–19 tahun untuk tumbuh
            secara sehat, berdaya, dan terlindungi.
          </Text>
        </View>

        {/* Commitment Cards */}
        <View style={styles.commitmentsList}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>1. Bukan Alat Diagnosis Medis</Text>
            <Text style={styles.cardBody}>
              Aplikasi ini adalah ruang pendamping emosional dan psikoedukasi sebaya.
              Jika kamu membutuhkan penanganan medis, kami menyediakan direktori rujukan resmi.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>2. Perlindungan Privasi Penuh</Text>
            <Text style={styles.cardBody}>
              Kamu dapat menggunakan nama samaran / anonim. Data catatan emosionalmu
              tidak pernah dibagikan kepada pihak ketiga untuk kepentingan komersial.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>3. Tanggap Krisis 24 Jam</Text>
            <Text style={styles.cardBody}>
              Bantuan darurat SEJIWA 119 Ext 8 dan kontak faskes kesehatan remaja
              selalu dapat diakses langsung kapan pun kamu merasa kewalahan.
            </Text>
          </View>
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setAgreed(!agreed);
            if (error) setError('');
          }}
          style={styles.checkboxRow}
        >
          {agreed ? (
            <CheckSquare size={20} color={colors.brandBlue[600]} />
          ) : (
            <Square size={20} color={colors.borderMedium} />
          )}
          <Text style={styles.checkboxLabel}>
            Saya berusia di atas 10 tahun dan menyetujui Etika Komunitas Ruang Aman Teman Sebaya.
          </Text>
        </TouchableOpacity>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.footer}>
        <Button
          title="Daftar Akun Baru"
          variant="primary"
          fullWidth
          onPress={handleProceed}
        />
        <Button
          title="Sudah Memiliki Akun? Masuk"
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
    paddingTop: 54,
    paddingHorizontal: spacing.lg,
    paddingBottom: 24,
  },
  scroll: {
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  shieldBadge: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
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
  },
  commitmentsList: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.brandBlue[600],
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  cardBody: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  errorText: {
    fontSize: 11,
    color: colors.crisis.dangerText,
    marginTop: 6,
  },
  footer: {
    gap: spacing.xs,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
});

