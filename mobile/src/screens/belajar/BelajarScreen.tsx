import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Search, BookOpen, Bookmark, Sparkles } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { FeatureHeroHeader } from '../../components/layout/FeatureHeroHeader';
import { ArticleCard } from '../../components/learning/ArticleCard';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { FloatingToast } from '../../components/common/FloatingToast';
import { useApp } from '../../state/AppContext';
import { LearningCategory } from '../../types';

export const BelajarScreen: React.FC = () => {
  const { articles, toggleBookmark, navigateTo, screenParams } = useApp();

  const [activeMainTab, setActiveMainTab] = useState<'all' | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<LearningCategory | 'Semua'>('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync if navigated from Profile or other screens with initialTab='saved'
  useEffect(() => {
    if (screenParams?.initialTab === 'saved') {
      setActiveMainTab('saved');
    }
  }, [screenParams]);

  // 9 Kategori resmi dari Screen E02 BRIEF TEMAN SEBAYA
  const categories: (LearningCategory | 'Semua')[] = [
    'Semua',
    'Kesehatan Mental',
    'Mengenal dan Mengelola Emosi',
    'Digital Wellbeing',
    'Relasi dan Pertemanan',
    'TRIAD KRR',
    'Life Skills',
    'Perencanaan Kehidupan Berkeluarga',
    'Transisi Kehidupan Remaja',
    'PIK-R dan GenRe',
  ];

  const savedArticles = articles.filter((art) => art.isSaved);

  const handleToggleBookmarkWithFeedback = (articleId: string) => {
    const targetArt = articles.find((a) => a.id === articleId);
    const willBeSaved = !targetArt?.isSaved;
    toggleBookmark(articleId);

    setToastMessage(
      willBeSaved
        ? 'Ditambahkan ke Bacaan Tersimpan!'
        : 'Dihapus dari Bacaan Tersimpan'
    );
    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  // Filtered list depending on main tab, search, and category
  const displayedArticles = articles.filter((art) => {
    if (activeMainTab === 'saved' && !art.isSaved) return false;

    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeMainTab === 'all' && selectedCategory !== 'Semua') {
      return art.category === selectedCategory;
    }

    return true;
  });

  return (
    <ScreenContainer
      style={{ backgroundColor: colors.accentAmber[600] }}
      contentContainerStyle={styles.containerContent}
      withBottomNav
      floatingOverlay={
        <FloatingToast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
          bottomOffset={96}
        />
      }
    >
      {/* 1. Illustrated Hero Header */}
      <FeatureHeroHeader
        feature="belajar"
        title="Teman Belajar"
        subtitle="Ruang bacaan psikoedukasi, kesehatan mental, dan literasi hidup remaja."
        infoContent={{
          title: 'Tentang Teman Belajar',
          description:
            'Koleksi materi psikoedukasi terkurasi yang disusun khusus untuk mendampingi fase transisi dan kesehatan mental remaja.',
          bulletPoints: [
            '9 topik literasi: Emosi, Digital Wellbeing, Relasi, Life Skills, dll.',
            'Artikel ringkas 2–4 menit dengan bahasa empatik dan aplikatif.',
            'Fitur simpan bacaan favorit untuk dibaca kembali kapan saja.',
          ],
        }}
      />

      {/* 2. Body Content Canvas */}
      <View style={styles.bodyContent}>
        {/* 2. Editorial Search Bar (Pill Shape Minimalis) */}
        <View style={styles.searchBar}>
        <Search size={18} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder={
            activeMainTab === 'saved'
              ? 'Cari di antara bacaan tersimpan...'
              : 'Cari topik bacaan atau kata kunci...'
          }
          placeholderTextColor={colors.textPlaceholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* 3. Segmented Navigation Tabs: Jelajah vs Tersimpan */}
      <View style={styles.tabBarRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveMainTab('all')}
          style={[styles.tabItem, activeMainTab === 'all' && styles.tabItemActive]}
        >
          <BookOpen
            size={15}
            color={activeMainTab === 'all' ? colors.brandBlue[600] : colors.textMuted}
            fill={activeMainTab === 'all' ? colors.brandBlue[600] : 'transparent'}
          />
          <Text
            style={[
              styles.tabText,
              activeMainTab === 'all' && styles.tabTextActive,
            ]}
          >
            Jelajah Artikel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveMainTab('saved')}
          style={[styles.tabItem, activeMainTab === 'saved' && styles.tabItemActive]}
        >
          <Bookmark
            size={15}
            color={activeMainTab === 'saved' ? colors.brandBlue[600] : colors.textMuted}
            fill={activeMainTab === 'saved' ? colors.brandBlue[600] : 'transparent'}
          />
          <Text
            style={[
              styles.tabText,
              activeMainTab === 'saved' && styles.tabTextActive,
            ]}
          >
            Tersimpan
          </Text>
          <View
            style={[
              styles.countPill,
              activeMainTab === 'saved' && styles.countPillActive,
            ]}
          >
            <Text
              style={[
                styles.countPillText,
                activeMainTab === 'saved' && styles.countPillTextActive,
              ]}
            >
              {savedArticles.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* 4. Category Pills Horizontal Scroll (Hanya di tab 'all') */}
      {activeMainTab === 'all' && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}
        >
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <Badge
                key={cat}
                label={cat}
                active={isActive}
                variant={isActive ? 'blue' : 'gray'}
                onPress={() => setSelectedCategory(cat)}
              />
            );
          })}
        </ScrollView>
      )}

      {/* 5. Info Banner Khusus Tab Tersimpan */}
      {activeMainTab === 'saved' && (
        <View style={styles.savedInfoBanner}>
          <Text style={styles.savedInfoText}>
            Menampilkan <Text style={styles.bold}>{savedArticles.length}</Text> artikel yang telah kamu bookmark untuk dibaca kembali.
          </Text>
        </View>
      )}

      {/* 6. Editorial Feed List (Featured Story + Editorial Rows) */}
      <View style={styles.articleList}>
        {displayedArticles.length > 0 ? (
          displayedArticles.map((art, idx) => {
            // Artikel pertama di tab utama tanpa pencarian dijadikan 'featured lead story'
            const isFeatured =
              idx === 0 && activeMainTab === 'all' && searchQuery.trim() === '';

            return (
              <ArticleCard
                key={art.id}
                article={art}
                variant={isFeatured ? 'featured' : 'row'}
                onPress={() => navigateTo('article_detail', { articleId: art.id })}
                onToggleBookmark={() => handleToggleBookmarkWithFeedback(art.id)}
              />
            );
          })
        ) : (
          <View style={styles.emptyWrap}>
            {activeMainTab === 'saved' ? (
              <>
                <View style={styles.emptyIconCircle}>
                  <Bookmark size={32} color={colors.brandBlue[600]} />
                </View>
                <Text style={styles.emptyTitle}>Belum Ada Bacaan Tersimpan</Text>
                <Text style={styles.emptyDesc}>
                  Tekan ikon bookmark pada artikel mana saja di Teman Belajar untuk menyimpannya di sini agar mudah dibaca nanti.
                </Text>
                <Button
                  title="Jelajahi Artikel Sekarang"
                  variant="primary"
                  onPress={() => setActiveMainTab('all')}
                  style={styles.browseBtn}
                />
              </>
            ) : (
              <>
                <BookOpen size={36} color={colors.borderMedium} />
                <Text style={styles.emptyTitle}>Tidak ada artikel ditemukan</Text>
                <Text style={styles.emptyDesc}>
                  Coba cari dengan kata kunci lain atau pilih kategori topik yang berbeda.
                </Text>
              </>
            )}
          </View>
        )}
      </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 110,
    backgroundColor: '#F8FAFC',
  },
  bodyContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  header: {
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    lineHeight: 18,
  },

  /* Search Bar Editorial Pill */
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    height: 42,
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    height: '100%',
    padding: 0,
  },

  /* Tab Bar Segmented Minimalis */
  tabBarRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: 3,
    marginBottom: spacing.md,
    gap: 4,
  },
  tabItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: borderRadius.sm,
    gap: 6,
  },
  tabItemActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: colors.textMuted,
  },
  tabTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },
  countPill: {
    backgroundColor: colors.borderLight,
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: borderRadius.full,
  },
  countPillActive: {
    backgroundColor: colors.brandBlue[50],
  },
  countPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
  },
  countPillTextActive: {
    color: colors.brandBlue[700],
  },

  /* Category Scroll */
  categoryScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },

  /* Saved Info Banner (Editorial Bersih Tanpa Box Kaku) */
  savedInfoBanner: {
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  savedInfoText: {
    fontSize: 12.5,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
    color: colors.textPrimary,
  },

  /* Article List Container */
  articleList: {
    paddingBottom: spacing.xl,
  },

  /* Empty Wrap */
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  emptyIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.brandBlue[50],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  emptyDesc: {
    fontSize: 12.5,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 290,
  },
  browseBtn: {
    marginTop: spacing.md,
    paddingHorizontal: 20,
  },
});
