import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Users, ShieldCheck, Calendar, MapPin, CheckCircle2, Camera } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useApp } from '../../state/AppContext';

export const SupportifScreen: React.FC = () => {
  const { communityList, toggleJoinCommunity, eventsList, goBack } = useApp();

  const communityImages: Record<string, any> = {
    com_001: require('../../../assets/community/pikr_group.jpg'),
    com_002: require('../../../assets/community/genre_workshop.jpg'),
    com_003: require('../../../assets/community/genre_activity_1.jpg'),
  };

  const galleryActivities = [
    {
      id: 'g1',
      title: 'Workshop GenRe Karawang',
      date: '28 Oktober 2026',
      image: require('../../../assets/community/genre_workshop.jpg'),
      tag: 'Forum GenRe',
    },
    {
      id: 'g2',
      title: 'Konseling Sebaya PIK-R',
      date: '15 September 2026',
      image: require('../../../assets/community/pikr_group.jpg'),
      tag: 'PIK-R Karawang',
    },
    {
      id: 'g3',
      title: 'Sosialisasi Literasi Remaja',
      date: '12 Agustus 2026',
      image: require('../../../assets/community/genre_activity_1.jpg'),
      tag: 'Edukasi Emosi',
    },
    {
      id: 'g4',
      title: 'Temu Kawan & Aksi Peduli',
      date: '24 Juli 2026',
      image: require('../../../assets/community/genre_activity_2.jpg'),
      tag: 'Aksi Remaja',
    },
  ];

  return (
    <ScreenContainer
      header={<ContextualHeader title="Teman Supportif" onBack={goBack} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Komunitas Sebaya & Aksi Positif</Text>
        <Text style={styles.subtitle}>
          Temukan ruang positif untuk belajar, berbagi cerita, dan bertumbuh bersama.
        </Text>
      </View>

      {/* Safeguarding Notice Banner */}
      <Card variant="tintGreen" style={styles.noticeCard}>
        <View style={styles.noticeRow}>
          <ShieldCheck size={20} color={colors.brandGreen[600]} />
          <Text style={styles.noticeText}>
            Semua kelompok didampingi oleh Pembina & Konselor Sebaya bersertifikasi BKKBN.
            Ruang aman tanpa diskriminasi.
          </Text>
        </View>
      </Card>

      {/* Real Photo Gallery of Youth Activities */}
      <View style={styles.sectionHeader}>
        <View style={styles.titleWithIcon}>
          <Camera size={16} color={colors.brandBlue[600]} />
          <Text style={styles.sectionTitle}>Dokumentasi Kegiatan Remaja</Text>
        </View>
        <Text style={styles.sectionMeta}>Karawang</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryScroll}
      >
        {galleryActivities.map((item) => (
          <View key={item.id} style={styles.galleryCard}>
            <Image
              source={item.image}
              style={styles.galleryImage}
              resizeMode="cover"
            />
            <View style={styles.galleryMeta}>
              <Badge label={item.tag} variant="blue" style={styles.galleryBadge} />
              <Text style={styles.galleryTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Text style={styles.galleryDate}>{item.date}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Community Groups Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Kelompok Komunitas Binaan</Text>
      </View>

      <View style={styles.list}>
        {communityList.map((grp) => {
          const imgSource = communityImages[grp.id] || communityImages.com_001;

          return (
            <Card key={grp.id} style={styles.groupCard}>
              {/* Photo Cover */}
              <Image
                source={imgSource}
                style={styles.groupCoverImage}
                resizeMode="cover"
              />

              <View style={styles.groupContent}>
                <View style={styles.groupHeader}>
                  <View style={styles.groupMain}>
                    <Text style={styles.groupName}>{grp.name}</Text>
                    <Text style={styles.groupSchedule}>🗓️ {grp.meetingSchedule}</Text>
                  </View>
                  <Badge
                    label={grp.badge}
                    variant={
                      grp.type === 'PIK-R'
                        ? 'blue'
                        : grp.type === 'Forum GenRe'
                        ? 'green'
                        : 'violet'
                    }
                  />
                </View>

                <Text style={styles.groupDesc}>{grp.description}</Text>

                <View style={styles.groupFooter}>
                  <View style={styles.membersCountRow}>
                    <Users size={14} color={colors.textMuted} />
                    <Text style={styles.membersCountText}>
                      {grp.memberCount} Anggota Aktif
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
            </Card>
          );
        })}
      </View>

      {/* Upcoming Events Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Agenda Kegiatan Remaja Karawang</Text>
      </View>

      <View style={styles.list}>
        {eventsList.map((ev) => (
          <Card key={ev.id} variant="tintBlue" style={styles.eventCard}>
            <Text style={styles.eventTitle}>{ev.title}</Text>
            <View style={styles.eventMetaRow}>
              <Calendar size={13} color={colors.brandBlue[600]} />
              <Text style={styles.eventMetaText}>
                {ev.date} · {ev.time}
              </Text>
            </View>
            <View style={styles.eventMetaRow}>
              <MapPin size={13} color={colors.brandBlue[600]} />
              <Text style={styles.eventMetaText}>{ev.location}</Text>
            </View>
            <Text style={styles.eventDesc}>{ev.description}</Text>
          </Card>
        ))}
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginVertical: spacing.md,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    marginTop: 2,
  },
  noticeCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  noticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  noticeText: {
    fontSize: 11.5,
    color: colors.brandGreen[700],
    lineHeight: 16,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.layout.sectionGap,
    marginBottom: spacing.sm,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionMeta: {
    fontSize: 11,
    color: colors.textMuted,
  },
  galleryScroll: {
    gap: spacing.md,
    paddingVertical: spacing.xs,
    paddingBottom: spacing.md,
  },
  galleryCard: {
    width: 220,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.borderLight,
    overflow: 'hidden',
  },
  galleryImage: {
    width: '100%',
    height: 120,
  },
  galleryMeta: {
    padding: spacing.md,
  },
  galleryBadge: {
    marginBottom: 4,
  },
  galleryTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  galleryDate: {
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  list: {
    gap: spacing.md,
    marginBottom: spacing.layout.sectionGap,
  },
  groupCard: {
    padding: 0,
    overflow: 'hidden',
  },
  groupCoverImage: {
    width: '100%',
    height: 140,
  },
  groupContent: {
    padding: spacing.md,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  groupMain: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  groupName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  groupSchedule: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  groupDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    marginVertical: spacing.xs,
  },
  groupFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.surfaceAlt,
    paddingTop: spacing.xs,
    marginTop: 4,
  },
  membersCountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  membersCountText: {
    fontSize: 11,
    color: colors.textMuted,
  },
  eventCard: {
    padding: spacing.md,
    gap: 4,
  },
  eventTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  eventMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventMetaText: {
    fontSize: 11.5,
    color: colors.brandBlue[700],
  },
  eventDesc: {
    fontSize: 11.5,
    color: colors.textSecondary,
    lineHeight: 16,
    marginTop: 2,
  },
});
