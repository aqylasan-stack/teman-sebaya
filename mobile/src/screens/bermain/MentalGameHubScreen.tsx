import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { ArrowLeft, Clock, Play } from 'lucide-react-native';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import {
  GAMES_CATALOG,
  GameItem,
} from '../../data/gameCatalogData';
import { useApp } from '../../state/AppContext';

// ============================================================================
// MAIN COMPONENT: TEMAN BERMAIN (Screen F01 - Game Dashboard Brief Specification)
// ============================================================================

export const MentalGameHubScreen: React.FC = () => {
  const { navigateTo, goBack } = useApp();

  const handleSelectGame = (game: GameItem) => {
    // Membuka Halaman Pengantar / Detail Permainan (Screen F02 / F03 / F04)
    navigateTo('game_detail', {
      gameId: game.id,
      categoryId: game.categoryId,
    });
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />

      {/* ============================================================== */}
      {/* 1. TOP HEADER (Brief F01: Header "Teman Bermain" + Copy)        */}
      {/* ============================================================== */}
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={goBack}
          style={styles.backButton}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          accessibilityLabel="Kembali ke Beranda"
        >
          <ArrowLeft size={24} color="#0F172A" strokeWidth={2.4} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Teman Bermain</Text>
        <Text style={styles.headerSubtitle}>
          Belajar tidak selalu harus serius. Yuk, kenali dirimu lewat permainan.
        </Text>
      </View>

      {/* ============================================================== */}
      {/* 2. THREE OFFICIAL GAMES (Brief F01: Butterfly, Feelings, Dilemma)*/}
      {/* ============================================================== */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      >
        {GAMES_CATALOG.map((game) => (
          <TouchableOpacity
            key={game.id}
            activeOpacity={0.88}
            onPress={() => handleSelectGame(game)}
            style={styles.gameCard}
            accessibilityRole="button"
            accessibilityLabel={`Mainkan ${game.title}`}
          >
            {/* Left: Square 3D Character Thumbnail */}
            <Image
              source={game.thumbnail}
              style={styles.thumbnailImage}
              resizeMode="cover"
            />

            {/* Right: Content Column */}
            <View style={styles.gameContentCol}>
              <Text style={styles.gameTitle} numberOfLines={1}>
                {game.title}
              </Text>
              <Text style={styles.gameSubtitle} numberOfLines={2}>
                {game.subtitle}
              </Text>

              {/* Bottom Meta & Mainkan Action */}
              <View style={styles.cardBottomRow}>
                <View style={styles.durationBadge}>
                  <Clock size={12} color="#64748B" style={{ marginRight: 4 }} />
                  <Text style={styles.durationText}>~{game.durationMinutes} Menit</Text>
                </View>

                <View style={styles.playButton}>
                  <Play size={10} color="#FFFFFF" fill="#FFFFFF" style={{ marginRight: 4 }} />
                  <Text style={styles.playButtonText}>Mainkan</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

// ============================================================================
// STYLESHEET (Clean Minimalist Matching Brief & Design System)
// ============================================================================

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC', // Slate 50
  },

  /* Header Section */
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginTop: 4,
  },

  /* List Section */
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 14,
  },
  gameCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  thumbnailImage: {
    width: 86,
    height: 86,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  gameContentCol: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  gameTitle: {
    fontSize: 16.5,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 3,
    letterSpacing: -0.2,
  },
  gameSubtitle: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 8,
  },
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  durationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  durationText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  playButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  playButtonText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
