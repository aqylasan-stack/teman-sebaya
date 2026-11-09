import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Search, BookOpen, Bookmark, Sparkles, ArrowRight } from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { GlobalHeader } from '../../components/layout/GlobalHeader';
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

  // Filtered list depending on main tab
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
      header={<GlobalHeader />}
      withBottomNav
      floatingOverlay={
        <FloatingToast
          message={toastMessage}
          onDismiss={() => setToastMessage(null)}
          bottomOffset={96}
        />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Teman Belajar</Text>
        <Text style={styles.subtitle}>
          Belajar memahami diri, hubungan, dan kehidupan sehari-hari.
        </Text>
      </View>

      {/* Segmented Main Tabs: Jelajah vs Tersimpan */}
      <View style={styles.segmentedRow}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveMainTab('all')}
          style={[styles.segmentBtn, activeMainTab === 'all' && styles.segmentBtnActive]}
        >
          <BookOpen
            size={16}
            color={activeMainTab === 'all' ? colors.brandBlue[600] : colors.textMuted}
          />
          <Text
            style={[
              styles.segmentText,
              activeMainTab === 'all' && styles.segmentTextActive,
            ]}
          >
            Jelajah Artikel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setActiveMainTab('saved')}
          style={[styles.segmentBtn, activeMainTab === 'saved' && styles.segmentBtnActive]}
        >
          <Bookmark
            size={16}
            color={activeMainTab === 'saved' ? colors.brandBlue[600] : colors.textMuted}
            fill={activeMainTab === 'saved' ? colors.brandBlue[600] : 'transparent'}
          />
          <Text
            style={[
              styles.segmentText,
              activeMainTab === 'saved' && styles.segmentTextActive,
            ]}
          >
            Tersimpan
          </Text>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{savedArticles.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar (Available in both tabs) */}
      <View style={styles.searchBar}>
        <Search size={18} color={colors.textPlaceholder} />
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

      {/* Category Pills (Only in 'all' tab) */}
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
                variant="blue"
                onPress={() => setSelectedCategory(cat)}
              />
            );
          })}
        </ScrollView>
      )}

      {/* Saved Tab Subtitle Info */}
      {activeMainTab === 'saved' && (
        <View style={styles.savedInfoBanner}>
          <Text style={styles.savedInfoText}>
            📌 Menampilkan <Text style={styles.bold}>{savedArticles.length}</Text> artikel yang telah kamu bookmark untuk dibaca kembali.
          </Text>
        </View>
      )}

      {/* Article Feed */}
      <View style={styles.articleList}>
        {displayedArticles.length > 0 ? (
          displayedArticles.map((art) => (
            <ArticleCard
              key={art.id}
              article={art}
              onPress={() => navigateTo('article_detail', { articleId: art.id })}
              onToggleBookmark={() => handleToggleBookmarkWithFeedback(art.id)}
            />
          ))
        ) : (
          <View style={styles.emptyWrap}>
            {activeMainTab === 'saved' ? (
              <>
                <View style={styles.emptyIconCircle}>
                  <Bookmark size={36} color={colors.brandBlue[600]} />
                </View>
                <Text style={styles.emptyTitle}>Belum Ada Bacaan Tersimpan</Text>
                <Text style={styles.emptyDesc}>
                  Tekan ikon bookmark (🔖) pada artikel mana saja di Teman Belajar untuk menyimpannya di sini agar mudah dibaca nanti!
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
                <BookOpen size={40} color={colors.borderMedium} />
                <Text style={styles.emptyTitle}>Tidak ada artikel ditemukan</Text>
                <Text style={styles.emptyDesc}>
                  Coba cari dengan kata kunci lain atau pilih kategori yang berbeda.
                </Text>
              </>
            )}
          </View>
        )}
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
    lineHeight: 18,
  },
  segmentedRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.md,
    gap: 4,
  },
  segmentBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: borderRadius.sm,
    gap: 6,
  },
  segmentBtnActive: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  segmentTextActive: {
    color: colors.brandBlue[600],
    fontWeight: '700',
  },
  countBadge: {
    backgroundColor: colors.brandBlue[50],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.brandBlue[200],
  },
  countBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.brandBlue[700],
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    height: 44,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    height: '100%',
    padding: 0,
  },
  categoryScroll: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: spacing.md,
  },
  savedInfoBanner: {
    backgroundColor: colors.brandBlue[50],
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.brandBlue[100],
    marginBottom: spacing.md,
  },
  savedInfoText: {
    fontSize: 12,
    color: colors.brandBlue[700],
    lineHeight: 17,
  },
  bold: {
    fontWeight: '700',
  },
  articleList: {
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  emptyIconCircle: {
    width: 68,
    height: 68,
    borderRadius: borderRadius.full,
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
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  browseBtn: {
    marginTop: spacing.md,
    paddingHorizontal: 20,
  },
});
