import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import {
  Bell,
  Clock,
  MessageCircle,
  Calendar,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { useApp } from '../../state/AppContext';

export const NotificationSettingsScreen: React.FC = () => {
  const { user, updateProfile, goBack } = useApp();

  const [dailyReminder, setDailyReminder] = useState(
    user?.dailyReminderEnabled ?? true
  );
  const [selectedTime, setSelectedTime] = useState(
    user?.dailyReminderTime || '20:00 WIB'
  );
  const [counselorReply, setCounselorReply] = useState(true);
  const [sessionReminder, setSessionReminder] = useState(true);
  const [communityUpdates, setCommunityUpdates] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const reminderTimeOptions = ['19:00 WIB', '20:00 WIB', '21:00 WIB', '21:30 WIB'];

  const handleToggleDailyReminder = (val: boolean) => {
    setDailyReminder(val);
    updateProfile({ dailyReminderEnabled: val });
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
    updateProfile({ dailyReminderTime: time });
  };

  return (
    <ScreenContainer
      header={<ContextualHeader title="Pengaturan Notifikasi" onBack={goBack} />}
      contentContainerStyle={styles.container}
    >
      {/* ============================================================== */}
      {/* 1. HERO REASSURANCE CARD                                       */}
      {/* ============================================================== */}
      <View style={styles.heroCard}>
        <View style={styles.heroIconCircle}>
          <Bell size={20} color={colors.brandBlue[600]} />
        </View>
        <View style={styles.heroTextContent}>
          <Text style={styles.heroTitle}>Notifikasi Empatik & Bebas Distraksi</Text>
          <Text style={styles.heroSubtitle}>
            Pemberitahuan dirancang ramah untuk menjaga ritme refleksi dirimu tanpa
            mengganggu waktu istirahat, belajar, atau sekolah.
          </Text>
        </View>
      </View>

      {/* ============================================================== */}
      {/* 2. GROUP: PENGINGAT REFLEKSI & MOOD HARIAN                     */}
      {/* ============================================================== */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>Pengingat Refleksi Harian</Text>

        {/* Toggle Check-in Harian */}
        <View style={styles.toggleRow}>
          <View style={styles.iconWrap}>
            <Clock size={18} color={colors.brandBlue[600]} />
          </View>
          <View style={styles.toggleDetails}>
            <Text style={styles.toggleLabel}>Pengingat Check-in Mood</Text>
            <Text style={styles.toggleSub}>
              Notifikasi hangat setiap malam untuk mencatat suasana hatimu.
            </Text>
          </View>
          <Switch
            value={dailyReminder}
            onValueChange={handleToggleDailyReminder}
            trackColor={{ false: '#CBD5E1', true: colors.brandBlue[600] }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#CBD5E1"
          />
        </View>

        {/* Time Selection Pills (muncul saat dailyReminder aktif) */}
        {dailyReminder && (
          <View style={styles.timeSelectionWrap}>
            <Text style={styles.timeSectionLabel}>PILIH WAKTU PENGINGAT:</Text>
            <View style={styles.timePillsGrid}>
              {reminderTimeOptions.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <TouchableOpacity
                    key={time}
                    activeOpacity={0.7}
                    onPress={() => handleSelectTime(time)}
                    style={[
                      styles.timePill,
                      isSelected && styles.timePillActive,
                    ]}
                  >
                    {isSelected && (
                      <Check size={13} color="#FFFFFF" strokeWidth={2.4} />
                    )}
                    <Text
                      style={[
                        styles.timePillText,
                        isSelected && styles.timePillTextActive,
                      ]}
                    >
                      {time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>

      {/* ============================================================== */}
      {/* 3. GROUP: KONSELING & OBROLAN SEBAYA                           */}
      {/* ============================================================== */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>Konseling & Obrolan Sebaya</Text>

        {/* Balasan Konselor */}
        <View style={styles.toggleRow}>
          <View style={styles.iconWrap}>
            <MessageCircle size={18} color={colors.brandGreen[600]} />
          </View>
          <View style={styles.toggleDetails}>
            <Text style={styles.toggleLabel}>Balasan Pesan Konselor</Text>
            <Text style={styles.toggleSub}>
              Dapatkan notifikasi segera saat konselor sebaya membalas ceritamu.
            </Text>
          </View>
          <Switch
            value={counselorReply}
            onValueChange={setCounselorReply}
            trackColor={{ false: '#CBD5E1', true: colors.brandBlue[600] }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#CBD5E1"
          />
        </View>

        {/* Pengingat Jadwal Sesi */}
        <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
          <View style={styles.iconWrap}>
            <Calendar size={18} color={colors.accentPeach[500]} />
          </View>
          <View style={styles.toggleDetails}>
            <Text style={styles.toggleLabel}>Pengingat Sesi Konseling</Text>
            <Text style={styles.toggleSub}>
              Pengingat 15 menit sebelum jadwal sesi konseling dimulai.
            </Text>
          </View>
          <Switch
            value={sessionReminder}
            onValueChange={setSessionReminder}
            trackColor={{ false: '#CBD5E1', true: colors.brandBlue[600] }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#CBD5E1"
          />
        </View>
      </View>

      {/* ============================================================== */}
      {/* 4. GROUP: KOMUNITAS & PENGEMBANGAN DIRI                        */}
      {/* ============================================================== */}
      <View style={styles.groupContainer}>
        <Text style={styles.groupTitle}>Komunitas & Wawasan</Text>

        {/* Kabar Lokakarya Komunitas */}
        <View style={styles.toggleRow}>
          <View style={styles.iconWrap}>
            <Sparkles size={18} color={colors.accentAmber[500]} />
          </View>
          <View style={styles.toggleDetails}>
            <Text style={styles.toggleLabel}>Agenda Komunitas & Lokakarya</Text>
            <Text style={styles.toggleSub}>
              Info kegiatan baru dari kelompok PIK-R dan Forum GenRe Karawang.
            </Text>
          </View>
          <Switch
            value={communityUpdates}
            onValueChange={setCommunityUpdates}
            trackColor={{ false: '#CBD5E1', true: colors.brandBlue[600] }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#CBD5E1"
          />
        </View>

        {/* Ringkasan Refleksi Mingguan */}
        <View style={[styles.toggleRow, { borderBottomWidth: 0 }]}>
          <View style={styles.iconWrap}>
            <ShieldCheck size={18} color={colors.accentViolet[500]} />
          </View>
          <View style={styles.toggleDetails}>
            <Text style={styles.toggleLabel}>Refleksi Mingguan (Minggu Sore)</Text>
            <Text style={styles.toggleSub}>
              Grafik ringkasan suasana hatimu selama sepekan untuk mengenali pola emosi.
            </Text>
          </View>
          <Switch
            value={weeklyDigest}
            onValueChange={setWeeklyDigest}
            trackColor={{ false: '#CBD5E1', true: colors.brandBlue[600] }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#CBD5E1"
          />
        </View>
      </View>

      {/* ============================================================== */}
      {/* 5. FOOTER ASSURANCE                                            */}
      {/* ============================================================== */}
      <View style={styles.footerNote}>
        <Text style={styles.footerText}>
          🔒 Kami menjaga ketenanganmu. TEMAN SEBAYA bebas dari spam promosi atau
          notifikasi beruntun yang memicu kecemasan.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: spacing.sm,
    paddingBottom: 48,
    gap: 16,
  },

  /* Hero Reassurance Card */
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.brandBlue[50],
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.brandBlue[100],
    padding: 14,
  },
  heroIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextContent: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  heroSubtitle: {
    fontSize: 11.5,
    color: colors.brandBlue[600],
    lineHeight: 16,
    marginTop: 2,
  },

  /* Group Containers */
  groupContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.surfaceAlt,
    gap: 12,
  },
  iconWrap: {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleDetails: {
    flex: 1,
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  toggleSub: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 15,
    marginTop: 2,
  },

  /* Time Selection Pills */
  timeSelectionWrap: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.surfaceAlt,
  },
  timeSectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  timePillsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    backgroundColor: colors.surface,
  },
  timePillActive: {
    backgroundColor: colors.brandBlue[600],
    borderColor: colors.brandBlue[600],
  },
  timePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  timePillTextActive: {
    color: '#FFFFFF',
  },

  /* Footer Note */
  footerNote: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  footerText: {
    fontSize: 11,
    color: colors.textMuted,
    lineHeight: 16,
    textAlign: 'center',
  },
});

