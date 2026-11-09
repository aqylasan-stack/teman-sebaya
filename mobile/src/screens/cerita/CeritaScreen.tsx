import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  Users,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Calendar,
  Star,
  Clock,
  Sparkles,
  Bot,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const CeritaScreen: React.FC = () => {
  const { navigateTo, openCrisisModal, counselors } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'sebaya' | 'profesional'>('all');

  const counselorImages: Record<string, any> = {
    cns_001: require('../../../assets/counselors/counselor_dimas.jpg'),
    cns_002: require('../../../assets/counselors/counselor_sarah.jpg'),
  };

  const filteredCounselors = counselors.filter((c) => {
    if (filterType === 'sebaya') {
      return c.role.toLowerCase().includes('sebaya') || c.role.toLowerCase().includes('pendidik');
    }
    if (filterType === 'profesional') {
      return c.role.toLowerCase().includes('psikolog') || c.role.toLowerCase().includes('profesional');
    }
    return true;
  });

  return (
    <ScreenContainer header={<GlobalHeader />} withBottomNav>
      {/* Header & Subheading (Sesuai Screen D01 BRIEF TEMAN SEBAYA) */}
      <View style={styles.header}>
        <Text style={styles.title}>Teman Cerita</Text>
        <Text style={styles.subtitle}>
          Ruang aman untuk didengarkan dan menemukan dukungan.
        </Text>
      </View>

      {/* Screen D01: Dua Service Cards (Konselor Sebaya & Profesional) */}
      <View style={styles.serviceCardsContainer}>
        {/* Card 1 — Konselor Sebaya */}
        <Card style={styles.serviceCard}>
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
            onPress={() => setFilterType('sebaya')}
            style={styles.serviceActionBtn}
          />
        </Card>

        {/* Card 2 — Profesional */}
        <Card style={styles.serviceCard}>
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
            onPress={() => setFilterType('profesional')}
            style={styles.serviceActionBtn}
          />
        </Card>
      </View>

      {/* Bridge ke Teman Akses (AI Chatbot) */}
      <Card
        variant="tintBlue"
        onPress={() => navigateTo('ai_chat')}
        style={styles.aiBridgeCard}
      >
        <View style={styles.aiBridgeRow}>
          <View style={styles.aiBridgeIcon}>
            <Bot size={18} color={colors.brandBlue[600]} />
          </View>
          <View style={styles.aiBridgeTextWrap}>
            <Text style={styles.aiBridgeTitle}>Teman Akses — Teman Digitalmu</Text>
            <Text style={styles.aiBridgeDesc}>
              Butuh teman bicara cepat 24 jam? Mulai obrolan dengan AI di Teman Akses.
            </Text>
          </View>
          <ArrowRight size={16} color={colors.brandBlue[600]} />
        </View>
      </Card>

      {/* Screen D02: Counselor Directory */}
      <View style={styles.directorySection}>
        <View style={styles.directoryHeader}>
          <Text style={styles.directoryTitle}>Daftar Pendamping Tersedia</Text>
          <Text style={styles.directoryMeta}>{filteredCounselors.length} Pendamping</Text>
        </View>

        {/* Filter Pills */}
        <View style={styles.filtersRow}>
          {[
            { id: 'all', label: 'Semua' },
            { id: 'sebaya', label: 'Konselor Sebaya' },
            { id: 'profesional', label: 'Profesional' },
          ].map((item) => {
            const isActive = filterType === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.7}
                onPress={() => setFilterType(item.id as any)}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Counselor Cards */}
        {filteredCounselors.map((counselor) => (
          <Card key={counselor.id} style={styles.counselorCard}>
            <View style={styles.counselorHeader}>
              <View style={styles.counselorAvatar}>
                {counselorImages[counselor.id] ? (
                  <Image
                    source={counselorImages[counselor.id]}
                    style={styles.counselorAvatarImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Text style={styles.counselorInitials}>
                    {counselor.name.substring(4, 6).toUpperCase()}
                  </Text>
                )}
              </View>
              <View style={styles.counselorMain}>
                <Text style={styles.counselorName}>{counselor.name}</Text>
                <Text style={styles.counselorInstitution}>
                  {counselor.role} · {counselor.institution}
                </Text>
                <View style={styles.ratingRow}>
                  <Star size={13} color={colors.accentAmber[500]} fill={colors.accentAmber[500]} />
                  <Text style={styles.ratingText}>
                    {counselor.rating} ({counselor.reviewCount} sesi cerita)
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.counselorAbout}>{counselor.about}</Text>

            <View style={styles.counselorFooter}>
              <View style={styles.slotsInfo}>
                <Calendar size={13} color={colors.brandGreen[600]} />
                <Text style={styles.slotText}>
                  {counselor.isAvailableToday
                    ? `Tersedia: ${counselor.availableSlots[0]}`
                    : counselor.availableSlots[0]}
                </Text>
              </View>

              <Button
                title="Pilih Jadwal"
                size="sm"
                variant="primary"
                onPress={() =>
                  navigateTo('counselor_booking', { counselorId: counselor.id })
                }
              />
            </View>
          </Card>
        ))}
      </View>

      {/* Emergency Crisis Escalation Banner */}
      <Card variant="crisis" onPress={openCrisisModal} style={styles.crisisBanner}>
        <View style={styles.crisisRow}>
          <ShieldAlert size={22} color={colors.crisis.dangerText} />
          <View style={styles.crisisTextWrap}>
            <Text style={styles.crisisTitle}>Bantuan Darurat & Krisis</Text>
            <Text style={styles.crisisSubtitle}>
              Jika kamu atau seseorang sedang dalam situasi bahaya, hubungi Hotline SEJIWA 119 Ext 8 bebas pulsa.
            </Text>
          </View>
        </View>
      </Card>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  serviceCardsContainer: {
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  serviceCard: {
    padding: spacing.md,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  serviceIconWrap: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 4,
    marginBottom: 4,
  },
  serviceDesc: {
    fontSize: 13,
    lineHeight: 18,
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
    fontSize: 11.5,
    color: colors.textMuted,
  },
  serviceActionBtn: {
    alignSelf: 'flex-start',
  },
  aiBridgeCard: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  aiBridgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  aiBridgeIcon: {
    width: 34,
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiBridgeTextWrap: {
    flex: 1,
  },
  aiBridgeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  aiBridgeDesc: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  directorySection: {
    marginBottom: spacing.lg,
  },
  directoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  directoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  directoryMeta: {
    fontSize: 12,
    color: colors.textMuted,
  },
  filtersRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  filterChipActive: {
    backgroundColor: colors.brandBlue[50],
    borderColor: colors.brandBlue[600],
  },
  filterChipText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },
  counselorCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  counselorHeader: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  counselorAvatar: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandBlue[100],
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  counselorAvatarImage: {
    width: '100%',
    height: '100%',
  },
  counselorInitials: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
  counselorMain: {
    flex: 1,
  },
  counselorName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  counselorInstitution: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  counselorAbout: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
    marginVertical: spacing.xs,
  },
  counselorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    marginTop: 4,
  },
  slotsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  slotText: {
    fontSize: 11.5,
    color: colors.brandGreen[600],
    fontWeight: '600',
  },
  crisisBanner: {
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  crisisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  crisisTextWrap: {
    flex: 1,
  },
  crisisTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.crisis.dangerDark,
  },
  crisisSubtitle: {
    fontSize: 11.5,
    lineHeight: 16,
    color: colors.crisis.dangerText,
    marginTop: 1,
  },
});
