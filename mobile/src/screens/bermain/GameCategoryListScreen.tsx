import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import {
  Search,
  X,
  ArrowRight,
  Clock,
  BookOpen,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  FolderOpen,
} from 'lucide-react-native';
import { colors, spacing, borderRadius } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { ContextualHeader } from '../../components/layout/ContextualHeader';
import {
  getCategoryById,
  getGamesByCategoryId,
  GameItem,
} from '../../data/gameCatalogData';
import { useApp } from '../../state/AppContext';

// ============================================================================
// GAME THUMBNAIL ICONS (Vector Art for Individual Games)
// ============================================================================

const ButterflyGameThumbnail = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx="24" cy="24" r="22" fill="#EFF6FF" />
    <Path d="M24 10v28" stroke="#2563EB" strokeWidth={2.4} strokeLinecap="round" />
    <Path
      d="M24 16C17 7 6 9 6 19c0 9 10 11 18 4"
      stroke="#2563EB"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(37, 99, 235, 0.12)"
    />
    <Path
      d="M24 26c-6 3.5-13 2.5-13-3s6-6.5 13-2"
      stroke="#2563EB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(37, 99, 235, 0.08)"
    />
    <Path
      d="M24 16c7-9 18-7 18 3 0 9-10 11-18 4"
      stroke="#2563EB"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(37, 99, 235, 0.12)"
    />
    <Path
      d="M24 26c6 3.5 13 2.5 13-3s-6-6.5-13-2"
      stroke="#2563EB"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(37, 99, 235, 0.08)"
    />
  </Svg>
);

const FeelingsGameThumbnail = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx="24" cy="24" r="22" fill="#ECFDF5" />
    <Circle cx="24" cy="24" r="14" stroke="#059669" strokeWidth={2.2} fill="rgba(5, 150, 105, 0.08)" />
    <Circle cx="19" cy="20" r="1.8" fill="#059669" />
    <Circle cx="29" cy="20" r="1.8" fill="#059669" />
    <Path
      d="M18 27c1.8 2.5 8.2 2.5 10 0"
      stroke="#059669"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    {/* Floating heart bubble */}
    <Circle cx="35" cy="14" r="6" fill="#FCEBE6" stroke="#E98B73" strokeWidth={1.2} />
    <Path
      d="M35 13.5c-.8-1-2.2-.4-1.8.8.4 1.2 1.8 2.2 1.8 2.2s1.4-1 1.8-2.2c.4-1.2-1-1.8-1.8-.8z"
      fill="#E98B73"
    />
  </Svg>
);

const DilemmaGameThumbnail = ({ size = 48 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Circle cx="24" cy="24" r="22" fill="#F5F3FF" />
    <Rect x="13" y="10" width="22" height="30" rx="4.5" stroke="#7C3AED" strokeWidth={2.2} fill="rgba(124, 58, 237, 0.06)" />
    <Path d="M19 14h10" stroke="#7C3AED" strokeWidth={2} strokeLinecap="round" />
    <Circle cx="24" cy="35" r="1.6" fill="#7C3AED" />
    {/* Shield */}
    <Path
      d="M24 19l4.5 2v4c0 3-2 5-4.5 5.5-2.5-.5-4.5-2.5-4.5-5.5v-4L24 19z"
      stroke="#7C3AED"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="rgba(249, 115, 22, 0.2)"
    />
  </Svg>
);

const getGameThumbnail = (gameId: string) => {
  if (gameId.includes('butterfly') || gameId.includes('karakter')) {
    return ButterflyGameThumbnail;
  }
  if (gameId.includes('feeling') || gameId.includes('resiliensi')) {
    return FeelingsGameThumbnail;
  }
  return DilemmaGameThumbnail;
};

// ============================================================================
// MAIN COMPONENT: GAME CATEGORY LIST SCREEN
// ============================================================================

export const GameCategoryListScreen: React.FC = () => {
  const { screenParams, navigateTo, goBack } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const categoryId = screenParams?.categoryId || 'decision-based-story';
  const category = getCategoryById(categoryId);
  const allCategoryGames = getGamesByCategoryId(category.id);

  // Real-time functional search filter
  const filteredGames = useMemo(() => {
    if (!searchQuery.trim()) return allCategoryGames;
    const query = searchQuery.toLowerCase().trim();
    return allCategoryGames.filter(
      (game) =>
        game.title.toLowerCase().includes(query) ||
        game.subtitle.toLowerCase().includes(query) ||
        game.description.toLowerCase().includes(query) ||
        game.targetTraits.some((t) => t.toLowerCase().includes(query))
    );
  }, [allCategoryGames, searchQuery]);

  const handleSelectGame = (game: GameItem) => {
    navigateTo('game_detail', {
      gameId: game.id,
      categoryId: category.id,
    });
  };

  return (
    <ScreenContainer
      header={
        <ContextualHeader
          title={category.name}
          onBack={goBack}
        />
      }
      contentContainerStyle={styles.container}
    >
      {/* ============================================================== */}
      {/* 1. CATEGORY OVERVIEW BANNER                                    */}
      {/* ============================================================== */}
      <View style={styles.categoryHeroCard}>
        <View style={styles.categoryTagRow}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>{category.tagline}</Text>
          </View>
          <Text style={styles.gamesCountBadge}>
            {allCategoryGames.length} Permainan Tersedia
          </Text>
        </View>

        <Text style={styles.categoryHeroTitle}>{category.name}</Text>
        <Text style={styles.categoryHeroDesc}>{category.description}</Text>
      </View>

      {/* ============================================================== */}
      {/* 2. FUNCTIONAL SEARCH BAR                                       */}
      {/* ============================================================== */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={18} color="#64748B" style={styles.searchIcon} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Cari permainan dalam kategori ini..."
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            returnKeyType="search"
            accessibilityLabel="Cari permainan"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={styles.clearSearchBtn}
              accessibilityLabel="Hapus pencarian"
            >
              <X size={16} color="#64748B" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ============================================================== */}
      {/* 3. GAMES LIST                                                  */}
      {/* ============================================================== */}
      <View style={styles.listSection}>
        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeadingTitle}>Daftar Permainan</Text>
          <Text style={styles.sectionHeadingCount}>
            {filteredGames.length} dari {allCategoryGames.length}
          </Text>
        </View>

        {filteredGames.length > 0 ? (
          filteredGames.map((game) => {
            const Thumbnail = getGameThumbnail(game.id);
            return (
              <TouchableOpacity
                key={game.id}
                activeOpacity={0.88}
                onPress={() => handleSelectGame(game)}
                style={styles.gameCard}
                accessibilityRole="button"
                accessibilityLabel={`Pilih permainan ${game.title}`}
              >
                {/* Horizontal Card Content */}
                <View style={styles.gameCardInner}>
                  {/* Left: Square Thumbnail (Reference 1 Style) */}
                  <Image
                    source={game.thumbnail}
                    style={styles.thumbnailImage}
                    resizeMode="cover"
                  />

                  {/* Center: Title & Description */}
                  <View style={styles.gameCardBody}>
                    <View style={styles.badgeRow}>
                      <View
                        style={[
                          styles.gameBadge,
                          { backgroundColor: game.themeBg },
                        ]}
                      >
                        <Text
                          style={[
                            styles.gameBadgeText,
                            { color: game.themeColor },
                          ]}
                        >
                          {game.badgeLabel}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.gameCardTitle}>{game.title}</Text>
                    <Text style={styles.gameCardDesc} numberOfLines={2}>
                      {game.subtitle}
                    </Text>

                    {/* Metadata Footer */}
                    <View style={styles.gameCardMetaRow}>
                      <View style={styles.metaBadge}>
                        <Clock size={12} color="#64748B" />
                        <Text style={styles.metaBadgeText}>
                          {game.durationMinutes} Menit
                        </Text>
                      </View>
                      <View style={styles.metaBadge}>
                        <BookOpen size={12} color="#64748B" />
                        <Text style={styles.metaBadgeText}>
                          {game.scenarioCount} Skenario
                        </Text>
                      </View>
                      <View style={styles.readyBadge}>
                        <CheckCircle2 size={12} color="#059669" />
                        <Text style={styles.readyBadgeText}>Siap Main</Text>
                      </View>
                    </View>
                  </View>

                  {/* Right: Chevron Arrow */}
                  <View style={styles.arrowContainer}>
                    <ArrowRight size={18} color="#EA580C" />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          /* ============================================================ */
          /* 4. EMPTY SEARCH STATE                                        */
          /* ============================================================ */
          <View style={styles.emptySearchContainer}>
            <View style={styles.emptyIconWrap}>
              <FolderOpen size={36} color="#94A3B8" />
            </View>
            <Text style={styles.emptyTitle}>Permainan Tidak Ditemukan</Text>
            <Text style={styles.emptyDesc}>
              Tidak ada permainan dalam kategori ini yang sesuai dengan pencarian
              &ldquo;{searchQuery}&rdquo;.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setSearchQuery('')}
              style={styles.resetSearchBtn}
            >
              <Text style={styles.resetSearchBtnText}>Reset Pencarian</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ============================================================ */}
        {/* 5. INFORMATIVE NOTICE: UPCOMING EXPANSION                     */}
        {/* ============================================================ */}
        <View style={styles.upcomingNoticeCard}>
          <View style={styles.upcomingIconBox}>
            <Sparkles size={16} color="#059669" />
          </View>
          <View style={styles.upcomingTextCol}>
            <Text style={styles.upcomingTitle}>
              Katalog Permainan Terus Bertumbuh
            </Text>
            <Text style={styles.upcomingDesc}>
              Skenario permainan baru sedang disusun bersama konselor sebaya
              PIK-R dan Forum GenRe untuk menghadirkan pengalaman belajar yang
              semakin kaya.
            </Text>
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
};

// ============================================================================
// STYLES
// ============================================================================

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
    backgroundColor: '#FAF7F2',
  },

  /* 1. Category Hero Card */
  categoryHeroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#F1E9DF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryPill: {
    backgroundColor: '#FCEBE6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  categoryPillText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#EA580C',
  },
  gamesCountBadge: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#64748B',
  },
  categoryHeroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6,
    letterSpacing: -0.3,
  },
  categoryHeroDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: '#475569',
  },

  /* 2. Functional Search Bar */
  searchSection: {
    marginBottom: spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#0F172A',
    paddingVertical: 0,
  },
  clearSearchBtn: {
    padding: 4,
  },

  /* 3. Games List */
  listSection: {
    gap: 12,
  },
  sectionHeadingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  sectionHeadingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  sectionHeadingCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  gameCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#F1E9DF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  gameCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: 12,
  },
  thumbnailImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
  },
  gameThumbWrapper: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: '#FAF7F2',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gameCardBody: {
    flex: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  gameBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  gameBadgeText: {
    fontSize: 10.5,
    fontWeight: '700',
  },
  gameCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 3,
  },
  gameCardDesc: {
    fontSize: 12,
    lineHeight: 17,
    color: '#64748B',
    marginBottom: 8,
  },
  gameCardMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  metaBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
  },
  readyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#059669',
  },
  arrowContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* 4. Empty State */
  emptySearchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginTop: 8,
  },
  emptyIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 12.5,
    lineHeight: 18,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: spacing.md,
    maxWidth: 260,
  },
  resetSearchBtn: {
    backgroundColor: '#E98B73',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
  },
  resetSearchBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  /* 5. Upcoming Notice Card */
  upcomingNoticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#ECFDF5',
    borderRadius: 14,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 6,
  },
  upcomingIconBox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D1FAE5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  upcomingTextCol: {
    flex: 1,
  },
  upcomingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#065F46',
    marginBottom: 2,
  },
  upcomingDesc: {
    fontSize: 11.5,
    lineHeight: 16,
    color: '#047857',
  },
});

