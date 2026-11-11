import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Clock, Play } from 'lucide-react-native';
import { colors } from '../../theme';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { FeatureHeroHeader } from '../../components/layout/FeatureHeroHeader';
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
    <ScreenContainer
      style={{ backgroundColor: colors.brandBlue[600] }}
      contentContainerStyle={styles.containerContent}
    >
      {/* ============================================================== */}
      {/* 1. ILLUSTRATED HERO HEADER                                     */}
      {/* ============================================================== */}
      <FeatureHeroHeader
        feature="bermain"
        title="Teman Bermain"
        subtitle="Belajar tidak selalu harus serius. Yuk, kenali dirimu lewat permainan."
        onBack={goBack}
        infoContent={{
          title: 'Tentang Teman Bermain',
          description:
            'Media gamifikasi psikologis yang mengajakmu bereksplorasi dan belajar mengenali diri lewat simulasi naratif interaktif.',
          bulletPoints: [
            'Keputusan Butterfly Effect: Sadari dampak setiap pilihan kecilmu.',
            'Laboratorium Emosi: Belajar mengenali berbagai spektrum perasaan.',
            'Dilema Moral: Latih kemampuan empati dan pertimbangan etis.',
          ],
        }}
      />

      {/* ============================================================== */}
      {/* 2. BODY CONTENT: THREE OFFICIAL GAMES                         */}
      {/* ============================================================== */}
      <View style={styles.bodyContent}>
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
      </View>
    </ScreenContainer>
  );
};

// ============================================================================
// STYLESHEET (Clean Minimalist Matching Brief & Design System)
// ============================================================================

const styles = StyleSheet.create({
  containerContent: {
    paddingHorizontal: 0,
    paddingTop: 0,
    paddingBottom: 40,
    backgroundColor: '#F8FAFC', // Slate 50
    flexGrow: 1,
  },
  bodyContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 18,
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
