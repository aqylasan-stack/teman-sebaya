import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {
  CheckCircle2,
  Users,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { FeatureHeroHeader } from '../../components/layout/FeatureHeroHeader';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const SupportifScreen: React.FC = () => {
  const { communityList, toggleJoinCommunity, goBack } = useApp();

  const communityImages: Record<string, any> = {
    com_001: require('../../../assets/community/pikr_group.jpg'),
    com_002: require('../../../assets/community/genre_gathering.jpg'),
    com_003: require('../../../assets/community/genre_activity_1.jpg'),
  };

  const galleryActivities = [
    {
      id: 'g1',
      title: 'Workshop GenRe Karawang',
      date: '28 Oktober 2026',
      image: require('../../../assets/community/genre_workshop.jpg'),
      context: 'Forum GenRe',
    },
    {
      id: 'g2',
      title: 'Konseling Sebaya PIK-R',
      date: '15 September 2026',
      image: require('../../../assets/community/pikr_group.jpg'),
      context: 'PIK-R Karawang',
    },
    {
      id: 'g3',
      title: 'Sosialisasi Literasi Remaja',
      date: '12 Agustus 2026',
      image: require('../../../assets/community/genre_activity_1.jpg'),
      context: 'Edukasi Emosi',
    },
    {
      id: 'g4',
      title: 'Temu Kawan & Aksi Peduli',
      date: '24 Juli 2026',
      image: require('../../../assets/community/genre_activity_2.jpg'),
      context: 'Aksi Remaja',
    },
    {
      id: 'g5',
      title: 'Temu Akbar GenRe Karawang',
      date: '10 Juli 2026',
      image: require('../../../assets/community/genre_gathering.jpg'),
      context: 'Forum GenRe',
    },
    {
      id: 'g6',
      title: 'Sesi Berbagi Bersama Konselor',
      date: '28 Juni 2026',
      image: require('../../../assets/community/foto_thoriq_counseling.jpg'),
      context: 'Konseling Sebaya',
    },
  ];

  // Distinguish organizational partner (Forum GenRe) from school/support groups
  const genreOrg = communityList.find((c) => c.type === 'Forum GenRe');
  const peerCommunities = communityList.filter((c) => c.type !== 'Forum GenRe');

  return (
    <ScreenContainer
      style={{ backgroundColor: colors.brandBlue[600] }}
      contentContainerStyle={styles.screenContainer}
    >
      {/* ============================================================== */}
      {/* 1. ILLUSTRATED HERO HEADER                                     */}
      {/* ============================================================== */}
      <FeatureHeroHeader
        feature="supportif"
        title="Teman Supportif"
        subtitle="Temukan ruang positif untuk belajar, berbagi cerita, dan bertumbuh bersama."
        onBack={goBack}
        infoContent={{
          title: 'Tentang Teman Supportif',
          description:
            'Jejaring komunitas sebaya, forum PIK-R, dan GenRe yang memberikan wadah bertumbuh dan berinteraksi positif bagi remaja.',
          bulletPoints: [
            'Didampingi oleh pembina dan konselor sebaya bersertifikasi BKKBN.',
            'Kegiatan edukatif, workshop, dan aksi kerelawanan nyata.',
            'Ruang aman tanpa diskriminasi, saling mendukung dan inklusif.',
          ],
        }}
      />

      {/* ============================================================== */}
      {/* 2. BODY CONTENT CANVAS                                         */}
      {/* ============================================================== */}
      <View style={styles.bodyContent}>
        {/* ============================================================== */}
        {/* 2. DOKUMENTASI KEGIATAN REMAJA (EDITORIAL PHOTO GALLERY)      */}
        {/* ============================================================== */}
      <View style={styles.sectionHeaderWrap}>
        <Text style={styles.kicker}>DOKUMENTASI VISUAL</Text>
        <Text style={styles.sectionHeading}>Dokumentasi Kegiatan Remaja</Text>
        <Text style={styles.sectionSub}>
          Momen nyata konseling, lokakarya, dan aksi peduli sebaya di Karawang
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryScroll}
      >
        {galleryActivities.map((item) => (
          <View key={item.id} style={styles.galleryItem}>
            <Image
              source={item.image}
              style={styles.galleryPhoto}
              resizeMode="cover"
            />
            <View style={styles.galleryCaption}>
              <Text style={styles.galleryTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.galleryMeta}>
                {item.date} · {item.context}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* ============================================================== */}
      {/* 3. FORUM GENRE (ORGANISASI MITRA DENGAN HIERARKI EDITORIAL)   */}
      {/* ============================================================== */}
      {genreOrg && (
        <View style={styles.genreSection}>
          <View style={styles.genreHeader}>
            <Text style={styles.kicker}>ORGANISASI & MITRA STRATEGIS</Text>
            <Text style={styles.sectionHeading}>{genreOrg.name}</Text>
          </View>

          <Image
            source={communityImages.com_002}
            style={styles.genreHeroPhoto}
            resizeMode="cover"
          />

          <Text style={styles.genreDescription}>{genreOrg.description}</Text>

          <View style={styles.genreMetaRow}>
            <View style={styles.genreMetaCol}>
              <Text style={styles.genreMetaLabel}>JADWAL KEGIATAN</Text>
              <Text style={styles.genreMetaValue}>{genreOrg.meetingSchedule}</Text>
            </View>
            <View style={styles.genreMetaCol}>
              <Text style={styles.genreMetaLabel}>KOLABORASI</Text>
              <Text style={styles.genreMetaValue}>
                {genreOrg.memberCount} Pemuda Tergabung
              </Text>
            </View>
          </View>

          <View style={styles.genreActionWrap}>
            <Button
              title={
                genreOrg.isJoined
                  ? 'Telah Terhubung dengan Forum GenRe'
                  : 'Gabung Jaringan Forum GenRe'
              }
              variant={genreOrg.isJoined ? 'outline' : 'primary'}
              size="md"
              fullWidth
              iconLeft={
                genreOrg.isJoined ? (
                  <CheckCircle2 size={16} color={colors.brandGreen[600]} />
                ) : undefined
              }
              onPress={() => toggleJoinCommunity(genreOrg.id)}
            />
          </View>
        </View>
      )}

      {/* ============================================================== */}
      {/* 4. KELOMPOK KOMUNITAS BINAAN (PEER & SUPPORT GROUPS)          */}
      {/* ============================================================== */}
      <View style={styles.communitiesSection}>
        <View style={styles.sectionHeaderWrap}>
          <Text style={styles.kicker}>RUANG SHARING & PEER SUPPORT</Text>
          <Text style={styles.sectionHeading}>Kelompok Komunitas Binaan</Text>
          <Text style={styles.sectionSub}>
            Ruang konseling sebaya dan pendampingan psikologis terdekat
          </Text>
        </View>

        <View style={styles.communitiesList}>
          {peerCommunities.map((grp, index) => {
            const imgSource = communityImages[grp.id] || communityImages.com_001;
            const isLast = index === peerCommunities.length - 1;

            return (
              <View
                key={grp.id}
                style={[styles.communityItem, !isLast && styles.communityItemBorder]}
              >
                <Image
                  source={imgSource}
                  style={styles.communityPhoto}
                  resizeMode="cover"
                />

                <View style={styles.communityContent}>
                  <Text style={styles.communityName}>{grp.name}</Text>

                  {/* Status verifikasi valid tanpa badge neon */}
                  {grp.badge && (
                    <View style={styles.verificationRow}>
                      <CheckCircle2 size={13} color={colors.brandBlue[600]} />
                      <Text style={styles.verificationText}>{grp.badge}</Text>
                    </View>
                  )}

                  <Text style={styles.communitySchedule}>
                    Jadwal Temu: {grp.meetingSchedule}
                  </Text>

                  <Text style={styles.communityDescription}>{grp.description}</Text>

                  <View style={styles.communityFooterRow}>
                    <View style={styles.memberCountBlock}>
                      <Users size={14} color={colors.textMuted} />
                      <Text style={styles.memberCountText}>
                        {grp.memberCount} Remaja Aktif
                      </Text>
                    </View>

                    <Button
                      title={grp.isJoined ? 'Telah Bergabung' : 'Gabung Obrolan'}
                      variant={grp.isJoined ? 'outline' : 'primary'}
                      size="sm"
                      iconLeft={
                        grp.isJoined ? (
                          <CheckCircle2 size={14} color={colors.brandGreen[600]} />
                        ) : undefined
                      }
                      onPress={() => toggleJoinCommunity(grp.id)}
                    />
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 64,
    backgroundColor: colors.canvas,
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  /* ============================================================== */
  /* HEADER & PLEDGE STYLES                                         */
  /* ============================================================== */
  headerBlock: {
    paddingHorizontal: 20,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  kicker: {
    fontSize: 10.5,
    fontWeight: '700',
    color: colors.brandBlue[600],
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 19,
    marginTop: 4,
  },

  /* ============================================================== */
  /* SECTION HEADER REUSABLE                                        */
  /* ============================================================== */
  sectionHeaderWrap: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 24,
  },
  sectionSub: {
    fontSize: 12.5,
    color: colors.textMuted,
    lineHeight: 17,
    marginTop: 2,
  },

  /* ============================================================== */
  /* DOKUMENTASI KEGIATAN (EDITORIAL GALLERY)                       */
  /* ============================================================== */
  galleryScroll: {
    paddingHorizontal: 20,
    gap: 14,
    paddingTop: 4,
    paddingBottom: 6,
  },
  galleryItem: {
    width: 250,
  },
  galleryPhoto: {
    width: 250,
    height: 155,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
  },
  galleryCaption: {
    paddingTop: 8,
    paddingHorizontal: 2,
  },
  galleryTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  galleryMeta: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 3,
  },

  /* ============================================================== */
  /* FORUM GENRE (ORGANISASI MITRA)                                 */
  /* ============================================================== */
  genreSection: {
    marginTop: 28,
    paddingTop: 24,
    marginHorizontal: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  genreHeader: {
    marginBottom: 10,
  },
  genreHeroPhoto: {
    width: '100%',
    height: 180,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
  },
  genreDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    marginTop: 12,
  },
  genreMetaRow: {
    flexDirection: 'row',
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
    gap: 16,
  },
  genreMetaCol: {
    flex: 1,
  },
  genreMetaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  genreMetaValue: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 3,
    lineHeight: 17,
  },
  genreActionWrap: {
    marginTop: 14,
  },

  /* ============================================================== */
  /* KELOMPOK KOMUNITAS BINAAN                                      */
  /* ============================================================== */
  communitiesSection: {
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  communitiesList: {
    marginTop: 6,
    paddingHorizontal: 20,
  },
  communityItem: {
    paddingBottom: 24,
    marginBottom: 20,
  },
  communityItemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderLight,
  },
  communityPhoto: {
    width: '100%',
    height: 160,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceAlt,
  },
  communityContent: {
    paddingTop: 12,
  },
  communityName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    lineHeight: 22,
  },
  verificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 4,
  },
  verificationText: {
    fontSize: 11.5,
    fontWeight: '500',
    color: colors.brandBlue[600],
  },
  communitySchedule: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  communityDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
    marginTop: 6,
  },
  communityFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderLight,
  },
  memberCountBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  memberCountText: {
    fontSize: 11.5,
    color: colors.textMuted,
  },
});
