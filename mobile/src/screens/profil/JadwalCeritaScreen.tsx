import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {
  Calendar,
  Clock,
  MessageCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Phone,
  Video,
  FileText,
  User,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { useApp } from '../../state/AppContext';
import { BookingSession } from '../../types';

export const JadwalCeritaScreen: React.FC = () => {
  const { bookings, goBack, switchTab, navigateTo } = useApp();
  const [selectedBookingForModal, setSelectedBookingForModal] =
    useState<BookingSession | null>(null);

  return (
    <ScreenContainer
      scrollable={false}
      header={
        <ContextualHeader
          title="Jadwal Cerita"
          subtitle="Sesi Pendampingan Terdaftar"
          onBack={goBack}
        />
      }
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {bookings.length > 0 ? (
          <View style={styles.listContainer}>
            <Text style={styles.sectionHeading}>
              Daftar Sesi Terdaftar ({bookings.length})
            </Text>

            {bookings.map((booking) => {
              const isWaiting = booking.status === 'Menunggu';
              return (
                <TouchableOpacity
                  key={booking.id}
                  activeOpacity={0.88}
                  onPress={() => setSelectedBookingForModal(booking)}
                  style={styles.bookingCard}
                  accessibilityRole="button"
                  accessibilityLabel={`Buka detail sesi dengan ${booking.counselorName}`}
                >
                  <View style={styles.bookingTopRow}>
                    <View style={styles.counselorAvatarBox}>
                      <Text style={styles.counselorInitials}>
                        {booking.counselorName
                          .split(' ')
                          .filter((n) => !n.startsWith('Kak'))
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join('')
                          .toUpperCase() || 'KP'}
                      </Text>
                    </View>

                    <View style={styles.counselorInfoCol}>
                      <Text style={styles.counselorName} numberOfLines={1}>
                        {booking.counselorName}
                      </Text>
                      <Text style={styles.counselorRole} numberOfLines={1}>
                        {booking.counselorRole}
                      </Text>
                    </View>

                    <View
                      style={[
                        styles.statusPill,
                        isWaiting ? styles.statusPillWaiting : styles.statusPillDone,
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          isWaiting
                            ? styles.statusPillTextWaiting
                            : styles.statusPillTextDone,
                        ]}
                      >
                        {booking.status}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.bookingDivider} />

                  <View style={styles.bookingBottomRow}>
                    <View style={styles.bookingMetaWrap}>
                      <View style={styles.metaItem}>
                        <Calendar size={13} color="#64748B" style={{ marginRight: 5 }} />
                        <Text style={styles.metaText}>{booking.date}</Text>
                      </View>
                      <View style={styles.metaItem}>
                        <Clock size={13} color="#64748B" style={{ marginRight: 5 }} />
                        <Text style={styles.metaText}>{booking.timeSlot}</Text>
                      </View>
                    </View>

                    <View style={styles.detailLinkRow}>
                      <Text style={styles.detailLinkText}>Detail</Text>
                      <ChevronRight size={14} color={colors.brandBlue[600]} />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => switchTab('cerita')}
              style={styles.addNewBookingBtn}
            >
              <MessageCircle size={16} color={colors.brandBlue[600]} style={{ marginRight: 8 }} />
              <Text style={styles.addNewBookingBtnText}>
                Jadwalkan Sesi Baru di Teman Cerita
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ========================================================== */
          /* EMPTY STATE (Clean, Focused, with Friendly Icon)           */
          /* ========================================================== */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Calendar size={44} color={colors.brandBlue[600]} strokeWidth={1.8} />
            </View>

            <Text style={styles.emptyTitle}>Belum Ada Jadwal Cerita</Text>
            <Text style={styles.emptySubtitle}>
              Kamu belum memiliki sesi pendampingan konselor sebaya atau profesional yang aktif saat ini.
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => switchTab('cerita')}
              style={styles.findCounselorBtn}
              accessibilityRole="button"
              accessibilityLabel="Cari pendamping di Teman Cerita"
            >
              <MessageCircle size={17} color="#FFFFFF" style={{ marginRight: 8 }} />
              <Text style={styles.findCounselorBtnText}>
                Cari Pendamping di Teman Cerita
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* ============================================================== */}
      {/* MODAL DETAIL JADWAL SESI KONSELING                            */}
      {/* ============================================================== */}
      <Modal
        visible={!!selectedBookingForModal}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedBookingForModal(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.scheduleModalSheet}>
            <View style={styles.scheduleModalHeader}>
              <View style={styles.scheduleModalHeaderTexts}>
                <Text style={styles.scheduleModalTitle}>Detail Jadwal Ceritamu</Text>
                <Text style={styles.scheduleModalSubtitle}>
                  Informasi sesi pendampingan yang telah terdaftar
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setSelectedBookingForModal(null)}
                style={styles.modalCloseBtn}
                accessibilityRole="button"
                accessibilityLabel="Tutup detail jadwal"
              >
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            {selectedBookingForModal && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scheduleModalBody}
              >
                <View style={styles.modalCounselorCard}>
                  <View style={styles.modalCounselorAvatar}>
                    <Text style={styles.modalCounselorInitials}>
                      {selectedBookingForModal.counselorName
                        .split(' ')
                        .filter((n) => !n.startsWith('Kak'))
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase() || 'KP'}
                    </Text>
                  </View>
                  <View style={styles.modalCounselorInfo}>
                    <Text style={styles.modalCounselorName}>
                      {selectedBookingForModal.counselorName}
                    </Text>
                    <Text style={styles.modalCounselorRole}>
                      {selectedBookingForModal.counselorRole}
                    </Text>
                    <View style={styles.modalStatusBadge}>
                      <Text style={styles.modalStatusBadgeText}>
                        {selectedBookingForModal.status === 'Menunggu'
                          ? '⏳ Menunggu Waktu Sesi'
                          : selectedBookingForModal.status === 'Selesai'
                          ? '✅ Sesi Selesai'
                          : selectedBookingForModal.status}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.modalDetailsCard}>
                  <View style={styles.modalDetailRow}>
                    <Calendar size={16} color="#2563EB" style={styles.detailIcon} />
                    <View style={styles.detailTextCol}>
                      <Text style={styles.detailLabel}>Tanggal Sesi</Text>
                      <Text style={styles.detailValue}>
                        {selectedBookingForModal.date}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalDetailDivider} />

                  <View style={styles.modalDetailRow}>
                    <Clock size={16} color="#2563EB" style={styles.detailIcon} />
                    <View style={styles.detailTextCol}>
                      <Text style={styles.detailLabel}>Waktu / Slot</Text>
                      <Text style={styles.detailValue}>
                        {selectedBookingForModal.timeSlot}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalDetailDivider} />

                  <View style={styles.modalDetailRow}>
                    <FileText size={16} color="#2563EB" style={styles.detailIcon} />
                    <View style={styles.detailTextCol}>
                      <Text style={styles.detailLabel}>Catatan Sesi</Text>
                      <Text style={styles.detailValue}>
                        {selectedBookingForModal.notes || 'Sesi pendampingan sebaya.'}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalDetailDivider} />

                  <View style={styles.modalDetailRow}>
                    {selectedBookingForModal.mode?.includes('Video') ? (
                      <Video size={16} color="#2563EB" style={styles.detailIcon} />
                    ) : selectedBookingForModal.mode?.includes('Suara') ? (
                      <Phone size={16} color="#2563EB" style={styles.detailIcon} />
                    ) : (
                      <MessageCircle size={16} color="#2563EB" style={styles.detailIcon} />
                    )}
                    <View style={styles.detailTextCol}>
                      <Text style={styles.detailLabel}>Media Konseling</Text>
                      <Text style={styles.detailValue}>
                        {selectedBookingForModal.mode || 'Sesi Chat Interaktif'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.safetyNoticeBox}>
                  <ShieldCheck size={16} color="#059669" style={{ marginRight: 8 }} />
                  <Text style={styles.safetyNoticeText}>
                    Kerahasiaan ceritamu dijamin 100% aman dan terlindungi sesuai kode etik pendampingan sebaya.
                  </Text>
                </View>

                {selectedBookingForModal.status === 'Menunggu' ? (
                  <TouchableOpacity
                    activeOpacity={0.88}
                    onPress={() => {
                      setSelectedBookingForModal(null);
                      navigateTo('ai_chat');
                    }}
                    style={styles.modalStartBtn}
                  >
                    <MessageCircle size={16} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.modalStartBtnText}>Masuk ke Ruang Obrolan</Text>
                  </TouchableOpacity>
                ) : null}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
    flexGrow: 1,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 12,
  },
  listContainer: {
    width: '100%',
  },
  bookingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  bookingTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counselorAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    marginRight: 12,
  },
  counselorInitials: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2563EB',
  },
  counselorInfoCol: {
    flex: 1,
  },
  counselorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  counselorRole: {
    fontSize: 12.5,
    color: '#64748B',
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPillWaiting: {
    backgroundColor: '#EFF6FF',
  },
  statusPillDone: {
    backgroundColor: '#ECFDF5',
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusPillTextWaiting: {
    color: '#2563EB',
  },
  statusPillTextDone: {
    color: '#059669',
  },
  bookingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  bookingBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bookingMetaWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  detailLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLinkText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#2563EB',
    marginRight: 2,
  },
  addNewBookingBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#BFDBFE',
    borderStyle: 'dashed',
    borderRadius: 16,
    paddingVertical: 14,
    marginTop: 6,
  },
  addNewBookingBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },

  /* Empty State */
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13.5,
    lineHeight: 20,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 290,
  },
  findCounselorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 24,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  findCounselorBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scheduleModalSheet: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    maxHeight: '86%',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  scheduleModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  scheduleModalHeaderTexts: {
    flex: 1,
    marginRight: 12,
  },
  scheduleModalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  scheduleModalSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleModalBody: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  modalCounselorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  modalCounselorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#BFDBFE',
    marginRight: 12,
  },
  modalCounselorInitials: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2563EB',
  },
  modalCounselorInfo: {
    flex: 1,
  },
  modalCounselorName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  modalCounselorRole: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 6,
  },
  modalStatusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 8,
  },
  modalStatusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563EB',
  },
  modalDetailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailTextCol: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '700',
  },
  modalDetailDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  safetyNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  safetyNoticeText: {
    fontSize: 11.5,
    lineHeight: 16,
    color: '#166534',
    flex: 1,
  },
  modalStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 24,
    height: 48,
  },
  modalStartBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
