import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import {
  PSYCH_GAME_CATEGORIES,
  PsychGameCategory,
} from '../../data/gamePsychData';
import {
  getGameById,
  GameItem,
} from '../../data/gameCatalogData';
import { useApp } from '../../state/AppContext';

// ============================================================================
// MAIN COMPONENT: GAME DETAIL / INTRO SCREEN (100% MATCH REFERENCE 2)
// ============================================================================

export const GameDetailScreen: React.FC = () => {
  const { screenParams, navigateTo, goBack } = useApp();
  const insets = useSafeAreaInsets();
  const [isExpanded, setIsExpanded] = useState(false);

  const gameItem: GameItem = getGameById(
    screenParams?.gameId,
    screenParams?.categoryId
  );

  const category: PsychGameCategory =
    PSYCH_GAME_CATEGORIES.find((c) => c.id === gameItem.psychCategoryId) ||
    PSYCH_GAME_CATEGORIES[0];

  const handleStartGame = () => {
    navigateTo('mental_game_play', {
      categoryId: category.id,
      gameId: gameItem.id,
      categoryCatalogId: gameItem.categoryId,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.screen, { paddingTop: Platform.OS === 'android' ? Math.max(insets.top, 8) : 0 }]}>
        <StatusBar barStyle="dark-content" />

        {/* ============================================================== */}
        {/* 1. TOP BAR WITH CLOSE BUTTON (Reference 2: Top-Right 'X')       */}
        {/* ============================================================== */}
        <View style={styles.topBar}>
          <View style={styles.flexSpacer} />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={goBack}
            style={styles.closeBtn}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            accessibilityRole="button"
            accessibilityLabel="Tutup dan kembali"
          >
            <X size={24} color="#0F172A" strokeWidth={2.4} />
          </TouchableOpacity>
        </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ============================================================== */}
        {/* 2. CENTERED HERO IMAGE (Reference 2: Big Rounded Square)       */}
        {/* ============================================================== */}
        <View style={styles.heroWrapper}>
          <Image
            source={gameItem.thumbnail}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* ============================================================== */}
        {/* 3. CENTERED TITLE                                              */}
        {/* ============================================================== */}
        <Text style={styles.gameTitle}>{gameItem.title}</Text>

        {/* ============================================================== */}
        {/* 4. CENTERED DESCRIPTION WITH 'SELENGKAPNYA' LINK              */}
        {/* ============================================================== */}
        <View style={styles.descContainer}>
          <Text style={styles.descText}>
            {gameItem.description}
            {!isExpanded && (
              <Text
                style={styles.expandLink}
                onPress={() => setIsExpanded(true)}
              >
                {' '}selengkapnya
              </Text>
            )}
          </Text>

          {isExpanded && (
            <View style={styles.expandedBasisBox}>
              <Text style={styles.expandedBasisTitle}>Landasan Pendekatan:</Text>
              <Text style={styles.expandedBasisText}>{category.scientificBasis}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsExpanded(false)}
                style={styles.collapseBtn}
              >
                <Text style={styles.collapseBtnText}>Tutup rincian</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* ============================================================== */}
        {/* 5. GUIDANCE BOX (Reference 2: Cream Card with 1-2-3 Badges)   */}
        {/* ============================================================== */}
        <View style={styles.guidanceBox}>
          {/* Item 1 */}
          <View style={styles.guidanceRow}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberBadgeText}>1</Text>
            </View>
            <Text style={styles.guidanceText}>
              Sesi bermain ini hadir sebagai ruang refleksi diri yang <Text style={styles.boldText}>positif, aman, dan suportif</Text> tanpa penghakiman
            </Text>
          </View>

          {/* Item 2 */}
          <View style={styles.guidanceRow}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberBadgeText}>2</Text>
            </View>
            <Text style={styles.guidanceText}>
              Tidak ada jawaban benar dan salah. Pilih saja satu yang paling menggambarkan diri kamu!
            </Text>
          </View>

          {/* Item 3 */}
          <View style={styles.guidanceRow}>
            <View style={styles.numberBadge}>
              <Text style={styles.numberBadgeText}>3</Text>
            </View>
            <Text style={styles.guidanceText}>
              Hindari memilih jawaban netral untuk hasil yang lebih maksimal
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ============================================================== */}
      {/* 6. BOTTOM CTA: 'MULAI' BUTTON (Reference 2 Chunky Orange CTA)  */}
      {/* ============================================================== */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          activeOpacity={0.88}
          onPress={handleStartGame}
          style={styles.startButton}
          accessibilityRole="button"
          accessibilityLabel={`Mulai ${gameItem.title}`}
        >
          <Text style={styles.startButtonText}>Mulai</Text>
        </TouchableOpacity>
      </View>
    </View>
  </SafeAreaView>
  );
};

// ============================================================================
// STYLESHEET (100% Faithful to Reference 2)
// ============================================================================

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
    zIndex: 20,
  },
  flexSpacer: {
    flex: 1,
  },
  closeBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },

  /* Scroll Content */
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 24,
    alignItems: 'center',
  },

  /* Hero Artwork */
  heroWrapper: {
    marginTop: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  heroImage: {
    width: 240,
    height: 240,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
  },

  /* Title & Subtitle */
  gameTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.4,
  },
  descContainer: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  descText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  expandLink: {
    color: '#2563EB',
    fontWeight: '700',
  },
  expandedBasisBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  expandedBasisTitle: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  expandedBasisText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  collapseBtn: {
    marginTop: 8,
    alignSelf: 'center',
  },
  collapseBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },

  /* Guidance Box (Clean Surface with Design System Accent) */
  guidanceBox: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
    borderRadius: 18,
    padding: 18,
    gap: 16,
  },
  guidanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  numberBadgeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  guidanceText: {
    flex: 1,
    fontSize: 13.5,
    color: '#1E293B',
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '800',
  },

  /* Bottom Bar CTA */
  bottomBar: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  startButton: {
    backgroundColor: '#2563EB',
    height: 52,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16.5,
    fontWeight: '700',
  },
});
