import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  History,
  Search,
  Filter,
  Calendar as CalendarIcon,
  ThumbsUp,
  Briefcase,
  X,
  ChevronRight,
  Clock,
  MessageSquare,
  Phone,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useApp } from '../../state/AppContext';
import { Counselor } from '../../types';

export const CounselorDirectoryScreen: React.FC = () => {
  const { screenParams, navigateTo, goBack, counselors, bookings } = useApp();
  const insets = useSafeAreaInsets();

  // Route / Service type: 'sebaya' | 'profesional' | 'all'
  const initialFilter = (screenParams?.filter as 'all' | 'sebaya' | 'profesional') || 'all';
  const isSebayaInitial = initialFilter !== 'profesional';

  // State
  const [activeTab, setActiveTab] = useState<'jadwal' | 'semua'>('semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'none' | 'az' | 'za'>('none');
  const [filterAvailabilityOnly, setFilterAvailabilityOnly] = useState(false);

  // Selected date in "Jadwal Konselor" strip
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);

  // Modals state
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Filter Modal selections
  const daysList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const timeSlots = [
    { id: 'morning', label: 'Pagi (00:00 - 12:00)' },
    { id: 'afternoon', label: 'Siang (12:01 - 18:00)' },
    { id: 'evening', label: 'Malam (18:01 - 23:59)' },
  ];
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Calendar modal date range (10 Nov - 26 Nov 2026 per screenshot)
  const [rangeStart, setRangeStart] = useState(10);
  const [rangeEnd, setRangeEnd] = useState(26);

  // Date strip days
  const dateStrip = [
    { date: '10 Nov', day: 'Sel', fullDay: 'Selasa', dayNum: 10 },
    { date: '11 Nov', day: 'Rab', fullDay: 'Rabu', dayNum: 11 },
    { date: '12 Nov', day: 'Kam', fullDay: 'Kamis', dayNum: 12 },
    { date: '13 Nov', day: 'Jum', fullDay: 'Jumat', dayNum: 13 },
    { date: '14 Nov', day: 'Sab', fullDay: 'Sabtu', dayNum: 14 },
    { date: '15 Nov', day: 'Min', fullDay: 'Minggu', dayNum: 15 },
    { date: '16 Nov', day: 'Sen', fullDay: 'Senin', dayNum: 16 },
  ];

  // Filtering counselors
  let filteredCounselors = counselors.filter((c) => {
    // 1. Role filter (Sebaya vs Profesional)
    if (initialFilter === 'sebaya') {
      const isSeb = c.role.toLowerCase().includes('sebaya') || c.role.toLowerCase().includes('pendidik');
      if (!isSeb) return false;
    } else if (initialFilter === 'profesional') {
      const isPro = c.role.toLowerCase().includes('psikolog') || c.role.toLowerCase().includes('profesional');
      if (!isPro) return false;
    }

    // 2. Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchRole = c.role.toLowerCase().includes(q);
      const matchTag = c.tags && c.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchRole && !matchTag) return false;
    }

    // 3. Tab-specific filtering
    if (activeTab === 'semua') {
      if (filterAvailabilityOnly && !c.isAvailableToday) {
        return false;
      }
    } else if (activeTab === 'jadwal') {
      const selectedDayObj = dateStrip[selectedDateIdx];
      if (selectedDayObj) {
        // If counselor has availableDays specified, check match
        if (c.availableDays && c.availableDays.length > 0) {
          if (!c.availableDays.includes(selectedDayObj.fullDay)) {
            return false;
          }
        }
      }

      // Filter by selected days in filter modal
      if (selectedDays.length > 0 && c.availableDays) {
        const matchesDay = selectedDays.some((d) => c.availableDays?.includes(d));
        if (!matchesDay) return false;
      }

      // Filter by selected times in filter modal
      if (selectedTimes.length > 0 && c.availableTimeSlots) {
        const matchesTime = selectedTimes.some(
          (t) => (c.availableTimeSlots as any)?.[t] === true
        );
        if (!matchesTime) return false;
      }
    }

    return true;
  });

  // Sorting
  if (sortOption === 'az') {
    filteredCounselors = [...filteredCounselors].sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'za') {
    filteredCounselors = [...filteredCounselors].sort((a, b) => b.name.localeCompare(a.name));
  }

  const toggleDayFilter = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleTimeFilter = (timeId: string) => {
    setSelectedTimes((prev) =>
      prev.includes(timeId) ? prev.filter((t) => t !== timeId) : [...prev, timeId]
    );
  };

  const handleResetFilter = () => {
    setSelectedDays([]);
    setSelectedTimes([]);
  };

  const pageTitle = initialFilter === 'profesional' ? 'Layanan Profesional' : 'Konselor Sebaya';

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 16) : 8 }]}>
        {/* Top Header Bar matching reference: Left back button, Title, Right history button */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={goBack}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Kembali"
          >
            <ChevronLeft size={28} color={colors.textPrimary} strokeWidth={2.2} />
          </TouchableOpacity>

          <Text style={styles.topBarTitle}>{pageTitle}</Text>

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

        {/* Search Input Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrap}>
            <Search size={18} color={colors.textPlaceholder} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Cari konselor..."
              placeholderTextColor={colors.textPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              clearButtonMode="while-editing"
            />
          </View>
        </View>

        {/* Segmented Tab Switcher: [Jadwal Konselor] [Semua Konselor] */}
        <View style={styles.segmentedContainer}>
          <View style={styles.segmentedControl}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab('jadwal')}
              style={[
                styles.segmentedTab,
                activeTab === 'jadwal' && styles.segmentedTabActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentedTabText,
                  activeTab === 'jadwal' && styles.segmentedTabTextActive,
                ]}
              >
                Jadwal Konselor
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setActiveTab('semua')}
              style={[
                styles.segmentedTab,
                activeTab === 'semua' && styles.segmentedTabActive,
              ]}
            >
              <Text
                style={[
                  styles.segmentedTabText,
                  activeTab === 'semua' && styles.segmentedTabTextActive,
                ]}
              >
                Semua Konselor
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* View Mode 1: "Semua Konselor" Sub-Filters */}
        {activeTab === 'semua' ? (
          <View style={styles.secondaryFiltersRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setFilterAvailabilityOnly((prev) => !prev)}
              style={[
                styles.subFilterChip,
                filterAvailabilityOnly && styles.subFilterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.subFilterChipText,
                  filterAvailabilityOnly && styles.subFilterChipTextActive,
                ]}
              >
                Kesediaan Jadwal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSortOption(sortOption === 'az' ? 'none' : 'az')}
              style={[
                styles.subFilterChip,
                sortOption === 'az' && styles.subFilterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.subFilterChipText,
                  sortOption === 'az' && styles.subFilterChipTextActive,
                ]}
              >
                A-Z
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setSortOption(sortOption === 'za' ? 'none' : 'za')}
              style={[
                styles.subFilterChip,
                sortOption === 'za' && styles.subFilterChipActive,
              ]}
            >
              <Text
                style={[
                  styles.subFilterChipText,
                  sortOption === 'za' && styles.subFilterChipTextActive,
                ]}
              >
                Z-A
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* View Mode 2: "Jadwal Konselor" Controls */
          <View style={styles.scheduleControlsSection}>
            {/* Action Buttons: [Filter] and [Pilih Tanggal] */}
            <View style={styles.scheduleActionsRow}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowFilterModal(true)}
                style={[
                  styles.filterActionButton,
                  (selectedDays.length > 0 || selectedTimes.length > 0) &&
                    styles.filterActionButtonActive,
                ]}
              >
                <Filter size={15} color={colors.textPrimary} />
                <Text style={styles.filterActionText}>Filter</Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setShowCalendarModal(true)}
                style={styles.datePickerButton}
              >
                <CalendarIcon size={15} color={colors.brandBlue[600]} />
                <Text style={styles.datePickerButtonText}>
                  Pilih tanggal  {rangeStart} Nov - {rangeEnd} Nov
                </Text>
              </TouchableOpacity>
            </View>

            {/* Horizontal Date Strip (Carousel of days) */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.dateStripContainer}
            >
              {dateStrip.map((item, idx) => {
                const isSelected = selectedDateIdx === idx;
                return (
                  <TouchableOpacity
                    key={idx}
                    activeOpacity={0.7}
                    onPress={() => setSelectedDateIdx(idx)}
                    style={[
                      styles.dateStripItem,
                      isSelected && styles.dateStripItemActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dateStripDateText,
                        isSelected && styles.dateStripDateTextActive,
                      ]}
                    >
                      {item.date}
                    </Text>
                    <Text
                      style={[
                        styles.dateStripDayText,
                        isSelected && styles.dateStripDayTextActive,
                      ]}
                    >
                      {item.day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Counselors List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 40 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {filteredCounselors.length > 0 ? (
            filteredCounselors.map((counselor) => {
              const initials =
                counselor.initials ||
                counselor.name
                  .split(' ')
                  .filter((n) => !n.startsWith('Kak'))
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase();

              const isSebaya =
                counselor.role.toLowerCase().includes('sebaya') ||
                counselor.role.toLowerCase().includes('pendidik');

              return (
                <TouchableOpacity
                  key={counselor.id}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigateTo('counselor_detail', { counselorId: counselor.id })
                  }
                  style={styles.counselorCard}
                >
                  {/* Left Avatar circle */}
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarInitials}>{initials}</Text>
                  </View>

                  {/* Right Information */}
                  <View style={styles.counselorInfo}>
                    {/* Badges Row */}
                    <View style={styles.badgesRow}>
                      <View style={styles.roleBadge}>
                        <Text style={styles.roleBadgeText}>
                          {isSebaya ? 'Peer Counselor' : 'Psikolog Klinis'}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.availabilityBadge,
                          counselor.isAvailableToday
                            ? styles.badgeAvailable
                            : styles.badgeUnavailable,
                        ]}
                      >
                        <Text
                          style={[
                            styles.availabilityBadgeText,
                            counselor.isAvailableToday
                              ? styles.badgeAvailableText
                              : styles.badgeUnavailableText,
                          ]}
                        >
                          {counselor.isAvailableToday ? 'Tersedia' : 'Tidak Tersedia'}
                        </Text>
                      </View>
                    </View>

                    {/* Counselor Full Name */}
                    <Text style={styles.counselorName}>{counselor.name}</Text>

                    {/* Sub-chips Row: Thumbs up rating & Briefcase experience */}
                    <View style={styles.subChipsRow}>
                      <View style={styles.subChip}>
                        <ThumbsUp size={11} color="#0284C7" />
                        <Text style={styles.subChipText}>
                          {counselor.positiveRatingPct || 98}% ( {counselor.reviewCount} Review )
                        </Text>
                      </View>

                      <View style={styles.subChip}>
                        <Briefcase size={11} color="#D97706" />
                        <Text style={styles.subChipText}>
                          {counselor.experience || '0 - 2 Tahun'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Tidak ada konselor yang cocok</Text>
              <Text style={styles.emptyDesc}>
                Coba sesuaikan kata kunci pencarian atau reset filter hari dan jam.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* MODAL 1: Filter Bottom Sheet matching reference */}
        <Modal
          visible={showFilterModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowFilterModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
              {/* Sheet Indicator */}
              <View style={styles.sheetHandleWrap}>
                <View style={styles.sheetHandle} />
              </View>

              {/* Header */}
              <View style={styles.filterModalHeader}>
                <Text style={styles.filterModalTitle}>Filter</Text>
                <TouchableOpacity onPress={handleResetFilter}>
                  <Text style={styles.resetFilterText}>Reset</Text>
                </TouchableOpacity>
              </View>

              {/* Section 1: Pilih Hari */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Pilih Hari</Text>
                <View style={styles.filterChipsWrap}>
                  {daysList.map((day) => {
                    const isSelected = selectedDays.includes(day);
                    return (
                      <TouchableOpacity
                        key={day}
                        activeOpacity={0.7}
                        onPress={() => toggleDayFilter(day)}
                        style={[
                          styles.filterSelectionChip,
                          isSelected && styles.filterSelectionChipActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterSelectionChipText,
                            isSelected && styles.filterSelectionChipTextActive,
                          ]}
                        >
                          {day}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* Section 2: Pilih Waktu */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Pilih Waktu</Text>
                <View style={styles.filterChipsWrap}>
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimes.includes(slot.id);
                    return (
                      <TouchableOpacity
                        key={slot.id}
                        activeOpacity={0.7}
                        onPress={() => toggleTimeFilter(slot.id)}
                        style={[
                          styles.filterSelectionChip,
                          isSelected && styles.filterSelectionChipActive,
                        ]}
                      >
                        <Text
                          style={[
                            styles.filterSelectionChipText,
                            isSelected && styles.filterSelectionChipTextActive,
                          ]}
                        >
                          {slot.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* CTA Apply */}
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={() => setShowFilterModal(false)}
                style={styles.applyFilterButton}
              >
                <Text style={styles.applyFilterButtonText}>Terapkan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* MODAL 2: Date Range Calendar Modal matching reference */}
        <Modal
          visible={showCalendarModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCalendarModal(false)}
        >
          <View style={styles.modalCenterOverlay}>
            <View style={styles.calendarCard}>
              {/* Range header */}
              <View style={styles.calendarRangeHeader}>
                <View style={styles.calendarRangeCol}>
                  <Text style={styles.calendarRangeLabel}>Dari</Text>
                  <Text style={styles.calendarRangeValue}>Sel, {rangeStart} Nov</Text>
                </View>
                <View style={styles.calendarRangeCol}>
                  <Text style={styles.calendarRangeLabel}>Hingga</Text>
                  <Text style={styles.calendarRangeValue}>Kam, {rangeEnd} Nov</Text>
                </View>
              </View>

              {/* Month navigation */}
              <View style={styles.calendarMonthHeader}>
                <TouchableOpacity style={styles.calNavBtn}>
                  <ChevronLeft size={20} color={colors.textPrimary} />
                </TouchableOpacity>
                <Text style={styles.calendarMonthTitle}>November 2026</Text>
                <TouchableOpacity style={styles.calNavBtn}>
                  <ChevronRight size={20} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Weekday labels */}
              <View style={styles.weekdaysRow}>
                {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((w, idx) => (
                  <Text key={idx} style={styles.weekdayLabel}>
                    {w}
                  </Text>
                ))}
              </View>

              {/* Calendar Grid (Days 1 to 30) */}
              <View style={styles.calendarGrid}>
                {/* 6 placeholder days for previous month */}
                {[26, 27, 28, 29, 30, 31].map((p, idx) => (
                  <View key={`prev_${idx}`} style={styles.calDayBox}>
                    <Text style={styles.calDayTextMuted}>{p}</Text>
                  </View>
                ))}

                {/* Days 1 to 30 of November */}
                {Array.from({ length: 30 }).map((_, i) => {
                  const day = i + 1;
                  const isInRange = day >= rangeStart && day <= rangeEnd;
                  const isStart = day === rangeStart;
                  const isEnd = day === rangeEnd;

                  return (
                    <TouchableOpacity
                      key={day}
                      activeOpacity={0.7}
                      onPress={() => {
                        if (day < rangeStart) {
                          setRangeStart(day);
                        } else {
                          setRangeEnd(day);
                        }
                      }}
                      style={[
                        styles.calDayBox,
                        isInRange && styles.calDayBoxInRange,
                        isStart && styles.calDayBoxStart,
                        isEnd && styles.calDayBoxEnd,
                      ]}
                    >
                      <Text
                        style={[
                          styles.calDayText,
                          isInRange && styles.calDayTextInRange,
                          (isStart || isEnd) && styles.calDayTextEndpoint,
                        ]}
                      >
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Actions row */}
              <View style={styles.calendarActionsRow}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowCalendarModal(false)}
                  style={styles.calCancelBtn}
                >
                  <Text style={styles.calCancelBtnText}>Batal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setShowCalendarModal(false)}
                  style={styles.calApplyBtn}
                >
                  <Text style={styles.calApplyBtnText}>Terapkan</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* MODAL 3: Riwayat Sesi Konseling */}
        <Modal
          visible={showHistoryModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowHistoryModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalSheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Riwayat Sesi Konseling</Text>
                  <Text style={styles.modalSubtitle}>Daftar konsultasi yang telah kamu jadwalkan</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setShowHistoryModal(false)}
                  style={styles.modalCloseBtn}
                >
                  <X size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>

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
                          <CalendarIcon size={13} color={colors.brandBlue[600]} />
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
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
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
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 6,
    marginBottom: 12,
  },
  searchInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
  segmentedContainer: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  segmentedControl: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  segmentedTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  segmentedTabActive: {
    backgroundColor: colors.brandBlue[600],
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentedTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentedTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  secondaryFiltersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 8,
    marginBottom: 14,
  },
  subFilterChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subFilterChipActive: {
    backgroundColor: '#EAF5FC',
    borderColor: colors.brandBlue[600],
  },
  subFilterChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  subFilterChipTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },
  scheduleControlsSection: {
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  scheduleActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  filterActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterActionButtonActive: {
    backgroundColor: '#EAF5FC',
    borderColor: colors.brandBlue[600],
  },
  filterActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  datePickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  datePickerButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dateStripContainer: {
    gap: 8,
    paddingVertical: 2,
  },
  dateStripItem: {
    width: 68,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dateStripItemActive: {
    backgroundColor: '#EAF5FC',
    borderColor: colors.brandBlue[600],
  },
  dateStripDateText: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  dateStripDateTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '600',
  },
  dateStripDayText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  dateStripDayTextActive: {
    color: colors.brandBlue[600],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 16,
  },
  counselorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0F2A4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarInitials: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F59E0B',
  },
  counselorInfo: {
    flex: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    backgroundColor: '#EAF5FC',
  },
  roleBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0284C7',
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeAvailable: {
    backgroundColor: '#ECFDF5',
  },
  badgeUnavailable: {
    backgroundColor: '#FEE2E2',
  },
  availabilityBadgeText: {
    fontSize: 10.5,
    fontWeight: '600',
  },
  badgeAvailableText: {
    color: '#059669',
  },
  badgeUnavailableText: {
    color: '#EF4444',
  },
  counselorName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  subChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  subChipText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  // Bottom sheet modal styling
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
    paddingTop: 12,
    maxHeight: '80%',
  },
  sheetHandleWrap: {
    alignItems: 'center',
    paddingVertical: 6,
  },
  sheetHandle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CBD5E1',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    paddingTop: 4,
  },
  filterModalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  resetFilterText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.brandBlue[600],
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  filterChipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterSelectionChip: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  filterSelectionChipActive: {
    backgroundColor: '#EAF5FC',
    borderColor: colors.brandBlue[600],
  },
  filterSelectionChipText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  filterSelectionChipTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },
  applyFilterButton: {
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.brandBlue[600],
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  applyFilterButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Calendar Center Modal
  modalCenterOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  calendarCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  calendarRangeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    marginBottom: 14,
  },
  calendarRangeCol: {
    flex: 1,
    alignItems: 'center',
  },
  calendarRangeLabel: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 2,
  },
  calendarRangeValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  calendarMonthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  calNavBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarMonthTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  weekdaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekdayLabel: {
    width: 36,
    textAlign: 'center',
    fontSize: 11,
    fontWeight: '600',
    color: colors.brandBlue[600],
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  calDayBox: {
    width: '14.28%',
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  calDayBoxInRange: {
    backgroundColor: '#EAF5FC',
  },
  calDayBoxStart: {
    backgroundColor: '#0F2A4A',
    borderRadius: 19,
  },
  calDayBoxEnd: {
    backgroundColor: '#0F2A4A',
    borderRadius: 19,
  },
  calDayText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  calDayTextMuted: {
    fontSize: 12,
    color: '#CBD5E1',
  },
  calDayTextInRange: {
    color: colors.brandBlue[700],
    fontWeight: '600',
  },
  calDayTextEndpoint: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  calendarActionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  calCancelBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calCancelBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  calApplyBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F2A4A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calApplyBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // Modal Riwayat
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
