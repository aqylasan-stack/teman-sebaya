import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { ShieldCheck, Lock, EyeOff, Bot, Database } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { useApp } from '../../state/AppContext';

export const PrivacySettingsScreen: React.FC = () => {
  const { user, updateProfile, goBack } = useApp();

  const [isAnonymous, setIsAnonymous] = useState(user?.isAnonymous ?? true);
  const [allowAiMood, setAllowAiMood] = useState(user?.allowAiMoodAccess ?? false);
  const [dailyReminder, setDailyReminder] = useState(
    user?.dailyReminderEnabled ?? true
  );

  const handleToggleAnonymous = (val: boolean) => {
    setIsAnonymous(val);
    updateProfile({ isAnonymous: val });
  };

  const handleToggleAiMood = (val: boolean) => {
    setAllowAiMood(val);
    updateProfile({ allowAiMoodAccess: val });
  };

  const handleToggleReminder = (val: boolean) => {
    setDailyReminder(val);
    updateProfile({ dailyReminderEnabled: val });
  };

  return (
    <ScreenContainer
      header={<ContextualHeader title="Pengaturan Privasi & Keamanan" onBack={goBack} />}
    >
      <View style={styles.container}>
        {/* Encryption Assurance Card */}
        <Card variant="tintGreen" style={styles.bannerCard}>
          <View style={styles.bannerRow}>
            <ShieldCheck size={22} color={colors.brandGreen[600]} />
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Enkripsi & Kerahasiaan Terjamin</Text>
              <Text style={styles.bannerSub}>
                Semua catatan emosi dan percakapan pribadimu disimpan dengan enkripsi aman
                tanpa pernah dibagikan ke pihak ketiga.
              </Text>
            </View>
          </View>
        </Card>

        {/* Setting Toggles List */}
        <View style={styles.settingsGroup}>
          <Text style={styles.groupHeader}>Kontrol Identitas & Interaksi</Text>

          {/* Anonymous Mode */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleIconWrap}>
              <EyeOff size={18} color={colors.brandBlue[600]} />
            </View>
            <View style={styles.toggleDetails}>
              <Text style={styles.toggleTitle}>Mode Anonim Penuh</Text>
              <Text style={styles.toggleDesc}>
                Sembunyikan nama asli dan gunakan nama samaran saat bercerita dengan konselor sebaya.
              </Text>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={handleToggleAnonymous}
              trackColor={{ false: colors.borderMedium, true: colors.brandBlue[600] }}
            />
          </View>

          {/* AI Mood History Permission */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleIconWrap}>
              <Bot size={18} color={colors.accentViolet[600]} />
            </View>
            <View style={styles.toggleDetails}>
              <Text style={styles.toggleTitle}>Izin Riwayat Mood untuk AI</Text>
              <Text style={styles.toggleDesc}>
                Izinkan AI Teman Cerita membaca ringkasan emosi harianmu untuk memberikan respons yang lebih empatik.
              </Text>
            </View>
            <Switch
              value={allowAiMood}
              onValueChange={handleToggleAiMood}
              trackColor={{ false: colors.borderMedium, true: colors.brandBlue[600] }}
            />
          </View>

          {/* Daily Reminder */}
          <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
            <View style={styles.toggleIconWrap}>
              <Database size={18} color={colors.accentAmber[600]} />
            </View>
            <View style={styles.toggleDetails}>
              <Text style={styles.toggleTitle}>Pengingat Check-in Emosi Harian</Text>
              <Text style={styles.toggleDesc}>
                Dapatkan notifikasi lembut pada pukul 20:00 WIB untuk merefleksikan harimu.
              </Text>
            </View>
            <Switch
              value={dailyReminder}
              onValueChange={handleToggleReminder}
              trackColor={{ false: colors.borderMedium, true: colors.brandBlue[600] }}
            />
          </View>
        </View>

        {/* Ethical AI Commitment */}
        <Card style={styles.ethicsCard}>
          <Text style={styles.ethicsTitle}>Komitmen Etis Teman Sebaya:</Text>
          <Text style={styles.ethicsText}>
            1. Tidak ada algoritma yang memanipulasi emosi atau memicu ketergantungan layar.{'\n'}
            2. Kamu dapat meminta penghapusan akun dan seluruh rekaman data kapan saja melalui Pusat Bantuan.{'\n'}
            3. Protokol tanggap krisis otomatis mendeteksi kata kunci bahaya untuk merujukkan pengguna ke hotline manusia resmi 119.
          </Text>
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  bannerCard: {
    padding: spacing.md,
  },
  bannerRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  bannerSub: {
    fontSize: 11.5,
    color: colors.brandGreen[600],
    lineHeight: 16,
    marginTop: 2,
  },
  settingsGroup: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: spacing.md,
    gap: spacing.sm,
  },
  groupHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceAlt,
    gap: spacing.sm,
  },
  toggleIconWrap: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleDetails: {
    flex: 1,
  },
  toggleTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  toggleDesc: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
    marginTop: 2,
  },
  ethicsCard: {
    padding: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderMedium,
  },
  ethicsTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  ethicsText: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});

