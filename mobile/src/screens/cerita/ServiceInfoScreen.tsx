import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, History, Check, X, Calendar, Clock, MessageSquare, Phone, CheckCircle2 } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { useApp } from '../../state/AppContext';

export const ServiceInfoScreen: React.FC = () => {
  const { screenParams, navigateTo, goBack, bookings } = useApp();
  const insets = useSafeAreaInsets();
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // 'sebaya' | 'profesional'
  const serviceType = (screenParams?.serviceType as 'sebaya' | 'profesional') || 'sebaya';
  const isSebaya = serviceType === 'sebaya';

  // Dynamic content based on service type
  const content = isSebaya
    ? {
        title: 'Konselor Sebaya',
        intro:
          'Konseling dan ruang aman untuk berbagi cerita secara personal bersama teman sebaya terlatih melalui chat atau panggilan suara.',
        cta: 'Cari Konselor',
        filter: 'sebaya' as const,
        points: [
          'Sesi berdurasi 60 Menit.',
          'Metode pendampingan fleksibel melalui Chat atau Panggilan Audio langsung di aplikasi.',
          'Slot curhat tersedia setiap Senin hingga Sabtu secara terbatas (09.00 – 21.00 WIB).',
          'Minggu dan tanggal merah LIBUR.',
          'Layanan 100% gratis tanpa dipungut biaya (didukung Forum GenRe & PIK-R Karawang).',
          'Jika kamu TIDAK bisa memilih jam, tandanya jadwal curhat sudah penuh, silakan coba kembali pukul 00.00 WIB, karena slot akan bertambah di jam tersebut setiap harinya.',
          'Kerahasiaan ceritamu terjamin penuh dalam lingkungan yang aman, hangat, dan tanpa penghakiman.',
          'Konselor sebaya adalah pendamping suportif terlatih, bukan pengganti psikolog klinis atau layanan medis krisis.',
        ],
      }
    : {
        title: 'Layanan Profesional',
        intro:
          'Layanan konsultasi psikologis terstruktur bersama psikolog klinis profesional mitra terverifikasi untuk penanganan kebutuhan yang lebih intensif.',
        cta: 'Cari Profesional',
        filter: 'profesional' as const,
        points: [
          'Sesi berdurasi 30 Menit per sesi awal konsultasi terstruktur.',
          'Metode telekonsultasi terenkripsi via Chat atau Panggilan Audio langsung.',
          'Didampingi langsung oleh Psikolog Klinis profesional mitra terverifikasi (Klinik Ramah Remaja Karawang).',
          'Jadwal konsultasi mengikuti ketersediaan sesi mitra (Senin hingga Sabtu).',
          'Konfirmasi jadwal reservasi disarankan dilakukan minimal 1 hari sebelumnya.',
          'Jika kuota sesi pada tanggal yang dipilih penuh, jadwal baru dibuka secara berkala sesuai ketersediaan psikolog.',
          'Privasi dan kerahasiaan catatan konseling dilindungi sepenuhnya oleh kode etik profesi psikologi.',
          'Jika kamu sedang dalam situasi krisis keselamatan diri, segera akses Layanan Krisis Darurat Hotline SEJIWA 119 Ext 8.',
        ],
      };

  const handleContinue = () => {
    navigateTo('counselor_directory', { filter: content.filter });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 16) : 8 }]}>
        {/* Top Header Bar matching reference: Left Back Button, Right History Icon */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali ke Teman Cerita"
          >
            <ChevronLeft size={28} color={colors.textPrimary} strokeWidth={2.2} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowHistoryModal(true)}
            style={styles.historyButton}
            accessibilityRole="button"
            accessibilityLabel="Lihat Riwayat Sesi"
          >
            <History size={20} color={colors.textPrimary} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Scrollable Information Body */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 100 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Title */}
          <Text style={styles.title}>{content.title}</Text>

          {/* Description Paragraph */}
          <Text style={styles.introText}>{content.intro}</Text>

          {/* Bullet points with checkmarks */}
          <View style={styles.pointsList}>
            {content.points.map((point, index) => (
              <View key={index} style={styles.pointRow}>
                <View style={styles.checkIconWrap}>
                  <Check size={16} color={colors.textPrimary} strokeWidth={2.4} />
                </View>
                <Text style={styles.pointText}>{point}</Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Bottom CTA Button (Design System Brand Blue, NOT orange) */}
        <View style={[styles.bottomContainer, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleContinue}
            style={styles.ctaButton}
            accessibilityRole="button"
            accessibilityLabel={content.cta}
          >
            <Text style={styles.ctaText}>{content.cta}</Text>
          </TouchableOpacity>
        </View>

        {/* Modal Riwayat Sesi */}
        <Modal
          visible={showHistoryModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowHistoryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Riwayat Sesi Konseling</Text>
                  <Text style={styles.modalSubtitle}>Daftar jadwal konsultasi yang telah kamu pesan</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowHistoryModal(false)}
                  style={styles.modalCloseBtn}
                  accessibilityRole="button"
                  accessibilityLabel="Tutup Riwayat"
                >
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

              {/* Bookings List */}
              <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
                {bookings && bookings.length > 0 ? (
                  bookings.map((item) => (
                    <View key={item.id} style={styles.historyCard}>
                      <View style={styles.historyCardHeader}>
                        <Text style={styles.historyCounselorName}>{item.counselorName}</Text>
                        <View
                          style={[
                            styles.statusBadge,
                            item.status === 'Selesai'
                              ? styles.statusBadgeSuccess
                              : item.status === 'Dibatalkan'
                              ? styles.statusBadgeCancel
                              : styles.statusBadgePending,
                          ]}
                        >
                          <Text
                            style={[
                              styles.statusBadgeText,
                              item.status === 'Selesai'
                                ? styles.statusTextSuccess
                                : item.status === 'Dibatalkan'
                                ? styles.statusTextCancel
                                : styles.statusTextPending,
                            ]}
                          >
                            {item.status}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.historyCounselorRole}>{item.counselorRole}</Text>

                      <View style={styles.historyDetailsRow}>
                        <View style={styles.historyDetailItem}>
                          <Calendar size={13} color={colors.brandBlue[600]} />
                          <Text style={styles.historyDetailText}>{item.date}</Text>
                        </View>
                        <View style={styles.historyDetailItem}>
                          <Clock size={13} color={colors.brandBlue[600]} />
                          <Text style={styles.historyDetailText}>{item.timeSlot}</Text>
                        </View>
                        <View style={styles.historyDetailItem}>
                          {item.mode === 'Chat' ? (
                            <MessageSquare size={13} color={colors.brandBlue[600]} />
                          ) : (
                            <Phone size={13} color={colors.brandBlue[600]} />
                          )}
                          <Text style={styles.historyDetailText}>{item.mode}</Text>
                        </View>
                      </View>
                    </View>
                  ))
                ) : (
                  <View style={styles.emptyHistoryState}>
                    <Clock size={40} color={colors.textPlaceholder} />
                    <Text style={styles.emptyHistoryTitle}>Belum Ada Riwayat Sesi</Text>
                    <Text style={styles.emptyHistoryDesc}>
                      Sesi konseling atau cerita yang kamu pesan akan tercatat rapi di sini.
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  historyButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.4,
    marginBottom: 14,
  },
  introText: {
    fontSize: 14.5,
    lineHeight: 22,
    color: colors.textSecondary,
    marginBottom: 24,
  },
  pointsList: {
    gap: 16,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  checkIconWrap: {
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  ctaButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.brandBlue[600],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
  // Modal Riwayat
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '75%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalScroll: {
    marginBottom: 12,
  },
  historyCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  historyCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  historyCounselorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  historyCounselorRole: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusBadgePending: {
    backgroundColor: colors.accentAmber[50],
  },
  statusBadgeSuccess: {
    backgroundColor: colors.brandGreen[50],
  },
  statusBadgeCancel: {
    backgroundColor: '#FEE2E2',
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  statusTextPending: {
    color: colors.accentAmber[600],
  },
  statusTextSuccess: {
    color: colors.brandGreen[600],
  },
  statusTextCancel: {
    color: '#EF4444',
  },
  historyDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  historyDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  historyDetailText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  emptyHistoryState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  emptyHistoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 8,
  },
  emptyHistoryDesc: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
});

