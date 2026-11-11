import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChevronLeft,
  Video,
  MessageSquare,
  Briefcase,
  ThumbsUp,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { useApp } from '../../state/AppContext';

export const CounselorDetailScreen: React.FC = () => {
  const { screenParams, navigateTo, goBack, counselors } = useApp();
  const insets = useSafeAreaInsets();

  const counselorId = screenParams?.counselorId || 'cns_001';
  const counselor = counselors.find((c) => c.id === counselorId) || counselors[0];

  const initials =
    counselor.initials ||
    counselor.name
      .split(' ')
      .filter((n) => !n.startsWith('Kak'))
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const isSebaya = counselor.role.toLowerCase().includes('sebaya') || counselor.role.toLowerCase().includes('pendidik');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 16) : 8 }]}>
        {/* Top Header Bar matching reference: Left back button, Brand text in center */}
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

          <View style={styles.brandTitleWrap}>
            <Sparkles size={16} color={colors.brandBlue[600]} />
            <Text style={styles.brandTitle}>TEMAN SEBAYA</Text>
          </View>

          <View style={styles.topBarPlaceholder} />
        </View>

        {/* Scrollable Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: 96 + insets.bottom },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Hero */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>

            {/* Badges Row */}
            <View style={styles.badgesRow}>
              <View style={styles.roleBadge}>
                <Text style={styles.roleBadgeText}>
                  {isSebaya ? 'Peer Counselor' : 'Psikolog Klinis'}
                </Text>
              </View>

              {counselor.hasVideoCall && (
                <View style={styles.featureBadge}>
                  <Video size={13} color="#059669" />
                  <Text style={styles.featureBadgeText}>Video Call Tersedia</Text>
                </View>
              )}
            </View>

            {/* Counselor Full Name */}
            <Text style={styles.counselorName}>{counselor.name}</Text>

            {/* Stats Chips */}
            <View style={styles.statsRow}>
              <View style={styles.statChip}>
                <MessageSquare size={13} color="#0284C7" />
                <Text style={styles.statChipText}>
                  {counselor.totalSessions || `${counselor.reviewCount * 4}`} Sesi
                </Text>
              </View>
              <View style={styles.statChip}>
                <Briefcase size={13} color="#D97706" />
                <Text style={styles.statChipText}>
                  {counselor.experience || '1 - 3 Tahun'}
                </Text>
              </View>
            </View>
          </View>

          {/* About Bio */}
          {counselor.about && (
            <View style={styles.aboutCard}>
              <Text style={styles.aboutText}>{counselor.about}</Text>
            </View>
          )}

          {/* Section Ulasan Klien matching reference */}
          <View style={styles.reviewsSection}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Ulasan Klien</Text>
              <View style={styles.ratingBadge}>
                <ThumbsUp size={13} color="#0284C7" />
                <Text style={styles.ratingBadgeText}>
                  {counselor.positiveRatingPct || 98}% ( {counselor.reviewCount} Review )
                </Text>
              </View>
            </View>

            {/* Reviews List */}
            <View style={styles.reviewsList}>
              {counselor.reviews && counselor.reviews.length > 0 ? (
                counselor.reviews.map((rev, idx) => (
                  <View key={rev.id || idx} style={styles.reviewItem}>
                    <View style={styles.reviewHeaderRow}>
                      <View style={styles.reviewUserAvatar}>
                        <Text style={styles.reviewUserInitials}>
                          {rev.clientInitials}
                        </Text>
                      </View>
                      <View style={styles.reviewUserInfo}>
                        <Text style={styles.reviewUserName}>{rev.clientInitials}</Text>
                        <Text style={styles.reviewUserTier}>
                          {rev.tier || 'Basic'} |{' '}
                          <Text style={styles.reviewVerdict}>
                            {rev.verdict || 'Terbantu 😊'}
                          </Text>
                        </Text>
                      </View>
                      <Text style={styles.reviewDate}>{rev.date}</Text>
                    </View>

                    <Text style={styles.reviewComment}>{rev.comment}</Text>
                  </View>
                ))
              ) : (
                <View style={styles.emptyReviews}>
                  <Text style={styles.emptyReviewsText}>
                    Belum ada ulasan untuk konselor ini.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        {/* Fixed Bottom CTA: "Buat Jadwal" matching reference */}
        <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              navigateTo('counselor_booking', { counselorId: counselor.id })
            }
            style={styles.ctaButton}
            accessibilityRole="button"
            accessibilityLabel="Buat Jadwal"
          >
            <Text style={styles.ctaButtonText}>Buat Jadwal</Text>
          </TouchableOpacity>
        </View>
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
  brandTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.brandBlue[600],
    letterSpacing: 0.5,
  },
  topBarPlaceholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#0F2A4A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarInitials: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F59E0B',
    letterSpacing: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  roleBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#EAF5FC',
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
  },
  featureBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#ECFDF5',
  },
  featureBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
  },
  counselorName: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    letterSpacing: -0.3,
    marginBottom: 12,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
  },
  statChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  aboutCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: borderRadius.lg,
    padding: 14,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  aboutText: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  reviewsSection: {
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 20,
  },
  reviewsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    backgroundColor: '#EAF5FC',
  },
  ratingBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
  },
  reviewsList: {
    gap: 16,
  },
  reviewItem: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  reviewHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewUserAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  reviewUserInitials: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewUserTier: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 1,
  },
  reviewVerdict: {
    color: '#059669',
    fontWeight: '700',
  },
  reviewDate: {
    fontSize: 11,
    color: '#94A3B8',
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    paddingLeft: 48,
  },
  emptyReviews: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyReviewsText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
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
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

