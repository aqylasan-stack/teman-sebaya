import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  Clock,
  ChevronRight,
} from 'lucide-react-native';
import {
  FilledMoodIcon,
  FilledCeritaIcon,
  FilledBelajarIcon,
  FilledBermainIcon,
  FilledSupportifIcon,
  FilledAksesIcon,
} from '../../components/home/FeatureCardIcons';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { HomeHero } from '../../components/layout/HomeHero';
import { useApp } from '../../state/AppContext';
import { Article } from '../../types';

// Map cover images for educational articles
const articleCovers: Record<string, any> = {
  article_overthinking: require('../../../assets/articles/article_overthinking.jpg'),
  article_burnout: require('../../../assets/articles/article_burnout.jpg'),
  article_konflik: require('../../../assets/articles/article_konflik.jpg'),
  article_asertif: require('../../../assets/articles/article_asertif.jpg'),
  article_detoks: require('../../../assets/articles/article_detoks.jpg'),
  article_mengenal_diri: require('../../../assets/articles/article_mengenal_diri.jpg'),
  article_regulasi_emosi: require('../../../assets/articles/article_regulasi_emosi.jpg'),
  article_komunikasi: require('../../../assets/articles/article_komunikasi.jpg'),
  article_tidur_sehat: require('../../../assets/articles/article_tidur_sehat.jpg'),
};

// Documentation gallery for peer community activities
const communityActivities = [
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

export const HomeScreen: React.FC = () => {
  const {
    user,
    switchTab,
    navigateTo,
    articles,
  } = useApp();

  // 6 Main Feature Shortcuts with Dedicated Color Identity (BRIEF TEMAN SEBAYA Table Page 15)
  const featureShortcuts = [
    {
      id: 'mood',
      title: 'Teman Mood',
      description: 'Catat perasaanmu setiap hari.',
      icon: FilledMoodIcon,
      cardBg: '#EBFBF2', // Solid Soft Mint Green
      cardBorder: '#A7F3D0',
      iconWrapBg: colors.brandGreen[600],
      iconWrapBorder: colors.brandGreen[700],
      iconColor: '#FFFFFF',
      accentColor: colors.brandGreen[600],
      titleColor: '#064E3B',
      descColor: '#475569',
      action: () => switchTab('mood'),
    },
    {
      id: 'cerita',
      title: 'Teman Cerita',
      description: 'Temukan layanan pendampingan.',
      icon: FilledCeritaIcon,
      cardBg: '#EFF6FF', // Solid Soft Royal Blue
      cardBorder: '#BFDBFE',
      iconWrapBg: colors.brandBlue[600],
      iconWrapBorder: colors.brandBlue[700],
      iconColor: '#FFFFFF',
      accentColor: colors.brandBlue[600],
      titleColor: '#1E3A8A',
      descColor: '#475569',
      action: () => switchTab('cerita'),
    },
    {
      id: 'belajar',
      title: 'Teman Belajar',
      description: 'Pelajari hal baru tentang dirimu.',
      icon: FilledBelajarIcon,
      cardBg: '#FEF8E7', // Solid Soft Warm Amber
      cardBorder: '#FDE68A',
      iconWrapBg: colors.accentAmber[600],
      iconWrapBorder: '#B45309',
      iconColor: '#FFFFFF',
      accentColor: colors.accentAmber[600],
      titleColor: '#78350F',
      descColor: '#475569',
      action: () => switchTab('belajar'),
    },
    {
      id: 'bermain',
      title: 'Teman Bermain',
      description: 'Jelajahi permainan edukatif.',
      icon: FilledBermainIcon,
      cardBg: '#F4F0FF', // Solid Soft Violet / Purple
      cardBorder: '#DDD6FE',
      iconWrapBg: colors.accentViolet[600],
      iconWrapBorder: '#6D28D9',
      iconColor: '#FFFFFF',
      accentColor: colors.accentViolet[600],
      titleColor: '#4C1D95',
      descColor: '#475569',
      action: () => navigateTo('teman_bermain'),
    },
    {
      id: 'supportif',
      title: 'Teman Supportif',
      description: 'Kenali komunitas positif.',
      icon: FilledSupportifIcon,
      cardBg: '#FFF2E8', // Solid Soft Coral / Peach
      cardBorder: '#FED7AA',
      iconWrapBg: colors.accentPeach[600],
      iconWrapBorder: '#C2410C',
      iconColor: '#FFFFFF',
      accentColor: colors.accentPeach[600],
      titleColor: '#7C2D12',
      descColor: '#475569',
      action: () => navigateTo('teman_supportif'),
    },
    {
      id: 'akses',
      title: 'Teman Akses',
      description: 'Mulai percakapan dengan AI.',
      icon: FilledAksesIcon,
      cardBg: '#EBF6FD', // Solid Soft Digital Sky Blue
      cardBorder: '#BAE6FD',
      iconWrapBg: '#0284C7',
      iconWrapBorder: '#0369A1',
      iconColor: '#FFFFFF',
      accentColor: '#0284C7',
      titleColor: '#0C4A6E',
      descColor: '#475569',
      action: () => navigateTo('ai_chat'),
    },
  ];

  // Recommended Content: Prioritize based on user interests if available
  const userInterests = user?.interests || [];
  const recommendedArticles = React.useMemo(() => {
    if (userInterests.length > 0) {
      const matched = articles.filter((a) =>
        userInterests.some((interest) =>
          a.category.toLowerCase().includes(interest.toLowerCase()) ||
          a.title.toLowerCase().includes(interest.toLowerCase())
        )
      );
      if (matched.length >= 2) return matched.slice(0, 2);
    }
    return articles.slice(0, 2);
  }, [articles, userInterests]);

  return (
    <ScreenContainer
      style={{ backgroundColor: colors.brandBlue[600] }}
      contentContainerStyle={styles.containerContent}
      withBottomNav
    >
      {/* ================================================================ */}
      {/* 1. PERSONAL GREETING HERO SECTION & DAILY MOOD DOCK              */}
      {/* ================================================================ */}
      <HomeHero />

      {/* ================================================================ */}
      {/* 2. BODY CONTENT (Canvas Surface)                                 */}
      {/* ================================================================ */}
      <View style={styles.bodyContent}>
        {/* ============================================================== */}
        {/* SECTION A: EKSPLORASI TEMAN SEBAYA (6 Core Feature Grid)       */}
        {/* ============================================================== */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Eksplorasi Teman Sebaya</Text>
          </View>

          <View style={styles.featureGrid}>
            {featureShortcuts.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <TouchableOpacity
                  key={feat.id}
                  activeOpacity={0.82}
                  onPress={feat.action}
                  style={[
                    styles.featureCard,
                    {
                      backgroundColor: feat.cardBg,
                      borderColor: feat.cardBorder,
                    },
                  ]}
                  accessibilityRole="button"
                  accessibilityLabel={`Buka ${feat.title}: ${feat.description}`}
                >
                  <View style={styles.featureCardTop}>
                    <View
                      style={[
                        styles.featureIconWrap,
                        {
                          backgroundColor: feat.iconWrapBg,
                          borderColor: feat.iconWrapBorder,
                        },
                      ]}
                    >
                      <IconComponent
                        size={19}
                        color={feat.iconColor}
                        accentColor={feat.accentColor}
                      />
                    </View>
                  </View>

                  <View style={styles.featureCardBody}>
                    <Text
                      style={[styles.featureCardTitle, { color: feat.titleColor }]}
                      numberOfLines={1}
                    >
                      {feat.title}
                    </Text>
                    <Text
                      style={[styles.featureCardDesc, { color: feat.descColor }]}
                      numberOfLines={2}
                    >
                      {feat.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================================== */}
        {/* SECTION B: PILIHAN UNTUK KAMU (Recommended Educational Content) */}
        {/* ============================================================== */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Pilihan untuk Kamu</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => switchTab('belajar')}
              style={styles.seeAllBtn}
              accessibilityRole="button"
              accessibilityLabel="Lihat semua konten di Teman Belajar"
            >
              <Text style={styles.seeAllText}>Lihat Semua</Text>
              <ChevronRight size={14} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <View style={styles.recommendedList}>
            {recommendedArticles.map((art) => {
              const coverSource = art.imageKey
                ? articleCovers[art.imageKey] || articleCovers.article_burnout
                : articleCovers.article_burnout;

              return (
                <TouchableOpacity
                  key={art.id}
                  activeOpacity={0.85}
                  onPress={() => navigateTo('article_detail', { articleId: art.id })}
                  style={styles.articleCard}
                  accessibilityRole="button"
                  accessibilityLabel={`Baca artikel: ${art.title}`}
                >
                  <Image
                    source={coverSource}
                    style={styles.articleCover}
                    resizeMode="cover"
                  />

                  <View style={styles.articleContentCol}>
                    <Text style={styles.articleCategoryText} numberOfLines={1}>
                      {art.category}
                    </Text>

                    <Text style={styles.articleTitle} numberOfLines={2}>
                      {art.title}
                    </Text>

                    <View style={styles.articleMetaRow}>
                      <Clock size={11.5} color="#64748B" style={{ marginRight: 4 }} />
                      <Text style={styles.articleMetaText}>{art.readingMinutes} mnt baca</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* ============================================================== */}
        {/* SECTION C: KOMUNITAS SEBAYA (Dokumentasi Kegiatan Komunitas) */}
        {/* ============================================================== */}
        <View style={styles.sectionWrap}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeaderTitle}>Komunitas Sebaya</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigateTo('teman_supportif')}
              style={styles.seeAllBtn}
              accessibilityRole="button"
              accessibilityLabel="Lihat semua komunitas sebaya"
            >
              <Text style={styles.seeAllText}>Eksplorasi</Text>
              <ChevronRight size={14} color="#2563EB" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.communityGalleryScrollWrap}
            contentContainerStyle={styles.communityGalleryScroll}
          >
            {communityActivities.map((item) => (
              <TouchableOpacity
                key={item.id}
                activeOpacity={0.85}
                onPress={() => navigateTo('teman_supportif')}
                style={styles.communityGalleryItem}
                accessibilityRole="button"
                accessibilityLabel={`Dokumentasi kegiatan: ${item.title}`}
              >
                <Image
                  source={item.image}
                  style={styles.communityGalleryPhoto}
                  resizeMode="cover"
                />
                <View style={styles.communityGalleryCaption}>
                  <Text style={styles.communityGalleryTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.communityGalleryMeta} numberOfLines={1}>
                    {item.date} · {item.context}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 96, // Clear of floating bottom navigation bar
    backgroundColor: '#F8FAFC',
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  sectionWrap: {
    marginBottom: 20,
  },

  /* Section Header */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingLeft: 6,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
    marginRight: 2,
  },

  /* Feature Grid (2-Columns) */
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  featureCard: {
    width: '48.4%',
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 13,
    minHeight: 114,
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  featureCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featureIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCardBody: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
    marginBottom: 3,
    letterSpacing: -0.1,
  },
  featureCardDesc: {
    fontSize: 11.5,
    fontWeight: '400',
    lineHeight: 16,
  },

  /* Recommended Articles */
  recommendedList: {
    gap: 10,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  articleCover: {
    width: 76,
    height: 76,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  articleContentCol: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  articleCategoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 3,
  },
  articleTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 18,
    marginBottom: 4,
  },
  articleMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleMetaText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '400',
  },

  /* Community Activities Gallery (Horizontal Carousel) */
  communityGalleryScrollWrap: {
    marginHorizontal: -16,
  },
  communityGalleryScroll: {
    paddingHorizontal: 16,
    gap: 12,
    paddingTop: 2,
    paddingBottom: 4,
  },
  communityGalleryItem: {
    width: 240,
  },
  communityGalleryPhoto: {
    width: 240,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  communityGalleryCaption: {
    paddingTop: 8,
    paddingHorizontal: 2,
  },
  communityGalleryTitle: {
    fontSize: 13.5,
    fontWeight: '600',
    color: '#0F172A',
    lineHeight: 18,
  },
  communityGalleryMeta: {
    fontSize: 11.5,
    fontWeight: '400',
    color: '#64748B',
    marginTop: 3,
    lineHeight: 16,
  },
});
