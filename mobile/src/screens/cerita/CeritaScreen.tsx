import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users, UserCheck, Clock } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const CeritaScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      {/* Header & Subheading (Sesuai Screen D01 BRIEF TEMAN SEBAYA & Screenshot Acuan) */}
      <View style={styles.header}>
        <Text style={styles.title}>Teman Cerita</Text>
        <Text style={styles.subtitle}>
          Ruang aman untuk didengarkan dan menemukan dukungan.
        </Text>
      </View>

      {/* Screen D01: Dua Service Cards (Konselor Sebaya & Layanan Profesional) */}
      <View style={styles.serviceCardsContainer}>
        {/* Card 1 — Konselor Sebaya */}
        <Card
          style={styles.serviceCard}
          onPress={() => navigateTo('service_info', { serviceType: 'sebaya' })}
        >
          <View style={styles.serviceHeader}>
            <View style={[styles.serviceIconWrap, { backgroundColor: colors.brandBlue[50] }]}>
              <Users size={20} color={colors.brandBlue[600]} />
            </View>
            <Badge label="Gratis Kuota" variant="blue" />
          </View>
          <Text style={styles.serviceTitle}>Konselor Sebaya</Text>
          <Text style={styles.serviceDesc}>
            Berbagi cerita bersama teman sebaya yang telah mendapatkan pembekalan pendampingan.
          </Text>
          <View style={styles.serviceInfoRow}>
            <Clock size={13} color={colors.textMuted} />
            <Text style={styles.serviceInfoText}>Durasi sesi: 60 menit · Metode chat/audio</Text>
          </View>
          <Button
            title="Cari Konselor Sebaya"
            variant="primary"
            size="sm"
            onPress={() => navigateTo('service_info', { serviceType: 'sebaya' })}
            style={styles.serviceActionBtn}
          />
        </Card>

        {/* Card 2 — Layanan Profesional */}
        <Card
          style={styles.serviceCard}
          onPress={() => navigateTo('service_info', { serviceType: 'profesional' })}
        >
          <View style={styles.serviceHeader}>
            <View style={[styles.serviceIconWrap, { backgroundColor: colors.brandGreen[50] }]}>
              <UserCheck size={20} color={colors.brandGreen[600]} />
            </View>
            <Badge label="Mitra Terverifikasi" variant="green" />
          </View>
          <Text style={styles.serviceTitle}>Layanan Profesional</Text>
          <Text style={styles.serviceDesc}>
            Temukan layanan bersama tenaga profesional yang telah diverifikasi.
          </Text>
          <View style={styles.serviceInfoRow}>
            <Clock size={13} color={colors.textMuted} />
            <Text style={styles.serviceInfoText}>Durasi sesi: 30 menit · Sesuai jadwal mitra</Text>
          </View>
          <Button
            title="Cari Profesional"
            variant="secondary"
            size="sm"
            onPress={() => navigateTo('service_info', { serviceType: 'profesional' })}
            style={styles.serviceActionBtn}
          />
        </Card>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  subtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    marginTop: 4,
  },
  serviceCardsContainer: {
    gap: spacing.md,
    marginBottom: spacing.layout.sectionGap,
  },
  serviceCard: {
    padding: spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F1E9DF',
    backgroundColor: '#FFFFFF',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  serviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.md,
  },
  serviceInfoText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  serviceActionBtn: {
    alignSelf: 'flex-start',
  },
});
