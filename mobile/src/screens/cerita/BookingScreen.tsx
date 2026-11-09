import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Calendar, Clock, MessageSquare, Phone, Video, CheckCircle2, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { useApp } from '../../state/AppContext';

export const BookingScreen: React.FC = () => {
  const { counselors, screenParams, createBooking, switchTab, goBack } = useApp();

  const counselorId = screenParams?.counselorId || 'cns_001';
  const counselor = counselors.find((c) => c.id === counselorId) || counselors[0];

  const dates = ['Kamis, 12 Nov 2026', 'Jumat, 13 Nov 2026', 'Senin, 16 Nov 2026'];
  const times = ['14:00 WIB', '16:00 WIB', '19:30 WIB'];
  const modes: ('Chat' | 'Audio' | 'Video')[] = ['Chat', 'Audio', 'Video'];

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [selectedMode, setSelectedMode] = useState<'Chat' | 'Audio' | 'Video'>('Chat');
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConfirm = () => {
    createBooking({
      counselorId: counselor.id,
      counselorName: counselor.name,
      counselorRole: counselor.role,
      date: selectedDate,
      timeSlot: selectedTime,
      mode: selectedMode,
      status: 'Menunggu',
      notes,
    });
    setIsSuccess(true);
  };

  return (
    <ScreenContainer
      header={<ContextualHeader title="Jadwalkan Sesi Konseling" onBack={goBack} />}
    >
      {!isSuccess ? (
        <View style={styles.container}>
          {/* Counselor Overview */}
          <Card variant="tintBlue" style={styles.counselorCard}>
            <Text style={styles.counselorName}>{counselor.name}</Text>
            <Text style={styles.counselorRole}>
              {counselor.role} · {counselor.institution}
            </Text>
            <View style={styles.tagsRow}>
              {counselor.tags.map((tag, idx) => (
                <Badge key={idx} label={tag} variant="blue" />
              ))}
            </View>
          </Card>

          {/* Date Selector */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Calendar size={16} color={colors.brandBlue[600]} />
              <Text style={styles.sectionTitle}>Pilih Tanggal Sesi</Text>
            </View>
            <View style={styles.chipsRow}>
              {dates.map((d) => (
                <TouchableOpacity
                  key={d}
                  activeOpacity={0.7}
                  onPress={() => setSelectedDate(d)}
                  style={[
                    styles.dateChip,
                    selectedDate === d && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedDate === d && styles.chipTextActive,
                    ]}
                  >
                    {d}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Time Selector */}
          <View style={styles.section}>
            <View style={styles.sectionTitleRow}>
              <Clock size={16} color={colors.brandBlue[600]} />
              <Text style={styles.sectionTitle}>Pilih Waktu Sesi (Durasi 45 Menit)</Text>
            </View>
            <View style={styles.chipsRow}>
              {times.map((t) => (
                <TouchableOpacity
                  key={t}
                  activeOpacity={0.7}
                  onPress={() => setSelectedTime(t)}
                  style={[
                    styles.timeChip,
                    selectedTime === t && styles.chipActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.chipText,
                      selectedTime === t && styles.chipTextActive,
                    ]}
                  >
                    {t}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Mode Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Metode Percakapan</Text>
            <View style={styles.modesRow}>
              {modes.map((m) => {
                const isSelected = selectedMode === m;
                return (
                  <TouchableOpacity
                    key={m}
                    activeOpacity={0.7}
                    onPress={() => setSelectedMode(m)}
                    style={[
                      styles.modeOption,
                      isSelected && styles.modeOptionActive,
                    ]}
                  >
                    {m === 'Chat' ? (
                      <MessageSquare
                        size={18}
                        color={isSelected ? colors.brandBlue[600] : colors.textMuted}
                      />
                    ) : m === 'Audio' ? (
                      <Phone
                        size={18}
                        color={isSelected ? colors.brandBlue[600] : colors.textMuted}
                      />
                    ) : (
                      <Video
                        size={18}
                        color={isSelected ? colors.brandBlue[600] : colors.textMuted}
                      />
                    )}
                    <Text
                      style={[
                        styles.modeOptionText,
                        isSelected && styles.modeOptionTextActive,
                      ]}
                    >
                      {m}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Topic / Notes */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Catatan Topik Awal (Opsional)</Text>
            <View style={styles.inputWrap}>
              <TextInput
                style={styles.textArea}
                placeholder="Misal: Ingin cerita seputar beban belajar atau relasi pertemanan..."
                placeholderTextColor={colors.textPlaceholder}
                multiline
                numberOfLines={3}
                value={notes}
                onChangeText={setNotes}
              />
            </View>
          </View>

          <Button
            title="Konfirmasi Penjadwalan Sesi"
            variant="primary"
            fullWidth
            onPress={handleConfirm}
            style={styles.submitBtn}
          />
        </View>
      ) : (
        /* Success Confirmation View */
        <View style={styles.successContainer}>
          <View style={styles.successIconCircle}>
            <CheckCircle2 size={54} color={colors.brandGreen[600]} />
          </View>
          <Text style={styles.successTitle}>Sesi Konseling Berhasil Dijadwalkan!</Text>
          <Text style={styles.successSubtitle}>
            Jadwalmu bersama {counselor.name} telah dikonfirmasi untuk hari{' '}
            {selectedDate} pukul {selectedTime} via {selectedMode}.
          </Text>

          <Card variant="tintBlue" style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Detail Sesi Anda:</Text>
            <Text style={styles.summaryText}>• Konselor: {counselor.name}</Text>
            <Text style={styles.summaryText}>• Waktu: {selectedDate}, {selectedTime}</Text>
            <Text style={styles.summaryText}>• Metode: {selectedMode} Room</Text>
            <Text style={styles.summaryText}>• Status: Terjadwal & Terenkripsi</Text>
          </Card>

          <Button
            title="Kembali ke Beranda"
            variant="primary"
            fullWidth
            iconRight={<ArrowRight size={16} color={colors.surface} />}
            onPress={() => switchTab('beranda')}
            style={styles.returnBtn}
          />
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  counselorCard: {
    padding: spacing.md,
  },
  counselorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  counselorRole: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: spacing.sm,
  },
  section: {
    gap: spacing.xs,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  dateChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  timeChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.md,
  },
  chipActive: {
    backgroundColor: colors.brandBlue[600],
    borderColor: colors.brandBlue[600],
  },
  chipText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  chipTextActive: {
    color: colors.surface,
    fontWeight: '600',
  },
  modesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  modeOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: borderRadius.md,
  },
  modeOptionActive: {
    backgroundColor: colors.brandBlue[50],
    borderColor: colors.brandBlue[600],
  },
  modeOptionText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  modeOptionTextActive: {
    color: colors.brandBlue[700],
    fontWeight: '700',
  },
  inputWrap: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    padding: spacing.md,
  },
  textArea: {
    fontSize: 12.5,
    color: colors.textPrimary,
    minHeight: 64,
    textAlignVertical: 'top',
  },
  submitBtn: {
    marginTop: spacing.sm,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.md,
  },
  successIconCircle: {
    width: 88,
    height: 88,
    borderRadius: borderRadius.full,
    backgroundColor: colors.brandGreen[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  successSubtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.sm,
  },
  summaryCard: {
    width: '100%',
    padding: spacing.md,
    gap: 4,
  },
  summaryTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.brandBlue[700],
    marginBottom: 4,
  },
  summaryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  returnBtn: {
    marginTop: spacing.sm,
  },
});

