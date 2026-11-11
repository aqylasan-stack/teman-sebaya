import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  MessageCircle,
  Smile,
  BookOpen,
  Gamepad2,
  Users,
  Sparkles,
  Clock,
  ArrowRight,
  ChevronRight,
} from 'lucide-react-native';
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

export const HomeScreen: React.FC = () => {
  const {
    user,
    switchTab,
    navigateTo,
    articles,
  } = useApp();

  // 6 Main Feature Shortcuts (Strictly matching BRIEF TEMAN SEBAYA Table Page 15)
  const featureShortcuts = [
    {
      id: 'mood',
      title: 'Teman Mood',
      label: 'Kenali Emosimu',
      description: 'Catat perasaanmu setiap hari.',
      icon: Smile,
      color: colors.brandGreen[600],
      bgColor: colors.brandGreen[50],
      action: () => switchTab('mood'),
    },
    {
      id: 'cerita',
      title: 'Teman Cerita',
      label: 'Ruang Ceritamu',
      description: 'Temukan layanan pendampingan.',
      icon: MessageCircle,
      color: colors.brandBlue[600],
      bgColor: colors.brandBlue[50],
      action: () => switchTab('cerita'),
    },
    {
      id: 'belajar',
      title: 'Teman Belajar',
      label: 'Tambah Wawasan',
      description: 'Pelajari hal baru tentang dirimu.',
      icon: BookOpen,
      color: colors.accentAmber[600],
      bgColor: colors.accentAmber[50],
      action: () => switchTab('belajar'),
    },
    {
      id: 'bermain',
      title: 'Teman Bermain',
      label: 'Belajar Sambil Main',
      description: 'Jelajahi permainan edukatif.',
      icon: Gamepad2,
      color: colors.accentViolet[600],
      bgColor: colors.accentViolet[50],
      action: () => navigateTo('teman_bermain'),
    },
    {
      id: 'supportif',
      title: 'Teman Supportif',
      label: 'Temukan Komunitas',
      description: 'Kenali komunitas positif.',
      icon: Users,
      color: colors.accentPeach[600],
      bgColor: colors.accentPeach[50],
      action: () => navigateTo('teman_supportif'),
    },
    {
      id: 'akses',
      title: 'Teman Akses',
      label: 'Teman Digitalmu',
      description: 'Mulai percakapan dengan AI.',
      icon: Sparkles,
      color: colors.brandBlue[600],
      bgColor: colors.brandBlue[50],
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
      {/* 1. PERSONAL GREETING HERO SECTION                                */}
      {/* ================================================================ */}
      <HomeHero />

      {/* ================================================================ */}
      {/* 2. BODY CONTENT (Canvas Surface)                                 */}
      {/* ================================================================ */}
      <View style={styles.bodyContent}>
        {/* Feature Shortcuts (2-Column Balanced Grid for 6 Core Modules) */}
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
                activeOpacity={0.8}
                onPress={feat.action}
                style={styles.featureCard}
                accessibilityRole="button"
                accessibilityLabel={`Buka ${feat.title}: ${feat.label}`}
              >
                <View style={styles.featureCardTop}>
                  <View style={[styles.featureIconWrap, { backgroundColor: feat.bgColor }]}>
                    <IconComponent size={20} color={feat.color} />
                  </View>
                </View>

                <View style={styles.featureCardBody}>
                  <Text style={styles.featureCardTitle} numberOfLines={1}>
                    {feat.title}
                  </Text>
                  <Text style={styles.featureCardLabel} numberOfLines={1}>
                    {feat.label}
                  </Text>
                  <Text style={styles.featureCardDesc} numberOfLines={2}>
                    {feat.description}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* ================================================================ */}
      {/* 3. RECOMMENDED CONTENT ("Pilihan untuk Kamu")                     */}
      {/* ================================================================ */}
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
                activeOpacity={0.88}
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
                  <View style={styles.articleCategoryPill}>
                    <Text style={styles.articleCategoryText} numberOfLines={1}>
                      {art.category}
                    </Text>
                  </View>

                  <Text style={styles.articleTitle} numberOfLines={2}>
                    {art.title}
                  </Text>

                  <View style={styles.articleMetaRow}>
                    <Clock size={11} color="#64748B" style={{ marginRight: 4 }} />
                    <Text style={styles.articleMetaText}>{art.readingMinutes} mnt baca</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 110, // Generous clearance above floating bottom navigation bar
    backgroundColor: '#F8FAFC',
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionWrap: {
    marginBottom: 22,
  },

  /* Section Header */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionHeaderTitle: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#0F172A',
    letterSpacing: -0.2,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingLeft: 8,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
    marginRight: 2,
  },

  /* Feature Grid (2-Columns) */
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    width: '48.2%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    minHeight: 130,
    justifyContent: 'space-between',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  featureCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featureIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCardBody: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  featureCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  featureCardLabel: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 3,
  },
  featureCardDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 15,
  },

  /* Recommended Content */
  recommendedList: {
    gap: 10,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  articleCover: {
    width: 82,
    height: 82,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  articleContentCol: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  articleCategoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
    marginBottom: 4,
  },
  articleCategoryText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#1D4ED8',
  },
  articleTitle: {
    fontSize: 13.5,
    fontWeight: '700',
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
    fontWeight: '500',
  },
});
