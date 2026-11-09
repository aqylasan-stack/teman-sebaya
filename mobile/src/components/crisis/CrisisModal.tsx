import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { AlertCircle, Phone, ShieldCheck, X } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../state/AppContext';

export const CrisisModal: React.FC = () => {
  const { isCrisisModalOpen, closeCrisisModal } = useApp();

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`).catch((err) =>
      console.log('Cannot open phone dialer:', err)
    );
  };

  return (
    <Modal visible={isCrisisModalOpen} onClose={closeCrisisModal}>
      <View style={styles.container}>
        {/* Header with controlled alert icon and clean close button */}
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <AlertCircle size={22} color={colors.crisis.dangerText} />
          </View>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>Bantuan Darurat & Krisis</Text>
            <Text style={styles.subtitle}>Layanan Resmi & Bebas Pulsa 24 Jam</Text>
          </View>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.7}
            onPress={closeCrisisModal}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            accessibilityLabel="Tutup dialog krisis"
          >
            <X size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Calming, empathetic orientation copy */}
        <Text style={styles.introMessage}>
          Jika kamu atau seseorang sedang dalam kondisi darurat, pikiran krisis, atau membutuhkan pertolongan segera, bantuan profesional selalu siap mendampingimu:
        </Text>

        {/* Option 1: SEJIWA 119 Ext 8 */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCall('119')}
          style={styles.hotlineCardRed}
          accessibilityRole="button"
          accessibilityLabel="Hubungi Layanan SEJIWA 119 ekstensi 8"
        >
          <View style={styles.hotlineIcon}>
            <Phone size={18} color={colors.crisis.dangerText} />
          </View>
          <View style={styles.hotlineDetails}>
            <Text style={styles.hotlineName}>Hotline SEJIWA: 119 Ext 8</Text>
            <Text style={styles.hotlineDesc}>
              Kemenkes RI · Konseling krisis kesehatan mental bebas pulsa 24 jam
            </Text>
          </View>
          <View style={styles.callBadgeRed}>
            <Text style={styles.callBadgeText}>Panggil</Text>
          </View>
        </TouchableOpacity>

        {/* Option 2: 112 Panggilan Darurat Nasional */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleCall('112')}
          style={styles.hotlineCardBlue}
          accessibilityRole="button"
          accessibilityLabel="Hubungi Nomor Darurat 112"
        >
          <View style={styles.hotlineIcon}>
            <Phone size={18} color={colors.brandBlue[600]} />
          </View>
          <View style={styles.hotlineDetails}>
            <Text style={styles.hotlineName}>Panggilan Darurat: 112</Text>
            <Text style={styles.hotlineDesc}>
              Layanan medis, ambulans, dan tanggap darurat terpadu
            </Text>
          </View>
          <View style={styles.callBadgeBlue}>
            <Text style={styles.callBadgeText}>Panggil</Text>
          </View>
        </TouchableOpacity>

        {/* Option 3: PKPR Puskesmas Faskes 1 (BPJS Peduli Remaja) */}
        <View style={styles.faskesCard}>
          <View style={styles.hotlineIcon}>
            <ShieldCheck size={18} color={colors.brandGreen[600]} />
          </View>
          <View style={styles.hotlineDetails}>
            <Text style={styles.faskesTitle}>Layanan PKPR Puskesmas (Faskes 1)</Text>
            <Text style={styles.faskesDesc}>
              Pelayanan Kesehatan Peduli Remaja resmi di Puskesmas terdekat, ramah & bebas biaya BPJS.
            </Text>
          </View>
          <View style={styles.infoBadgeGreen}>
            <Text style={styles.infoBadgeText}>Info Faskes</Text>
          </View>
        </View>

        {/* Return to App CTA */}
        <Button
          title="Tutup & Kembali ke Aplikasi"
          variant="outline"
          fullWidth
          onPress={closeCrisisModal}
          style={styles.returnButton}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.crisis.dangerBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  introMessage: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  hotlineCardRed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.crisis.dangerBg,
    borderWidth: 1,
    borderColor: colors.crisis.dangerBorder,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    minHeight: 52,
  },
  hotlineCardBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandBlue[50],
    borderWidth: 1,
    borderColor: colors.brandBlue[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    minHeight: 52,
  },
  hotlineIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hotlineDetails: {
    flex: 1,
  },
  hotlineName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  hotlineDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textSecondary,
    marginTop: 2,
  },
  callBadgeRed: {
    backgroundColor: colors.crisis.dangerText,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
  },
  callBadgeBlue: {
    backgroundColor: colors.brandBlue[600],
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: borderRadius.full,
  },
  callBadgeText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  faskesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brandGreen[50],
    borderWidth: 1,
    borderColor: colors.brandGreen[100],
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    minHeight: 52,
  },
  faskesTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  faskesDesc: {
    fontSize: 11,
    lineHeight: 15,
    color: colors.textSecondary,
    marginTop: 2,
  },
  infoBadgeGreen: {
    backgroundColor: colors.brandGreen[100],
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: borderRadius.full,
  },
  infoBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandGreen[700],
  },
  returnButton: {
    marginTop: spacing.xs,
  },
});
