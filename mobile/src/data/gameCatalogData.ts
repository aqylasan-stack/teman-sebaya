/**
 * Teman Bermain - Catalog & Category Hierarchy Data
 * Single Source of Truth untuk Kategori dan Daftar Permainan
 * Desain dan struktur mengacu pada Referensi UI Teman Sebaya
 */

export interface GameCategory {
  id: 'all' | 'decision-based-story' | 'emotional-literacy' | 'digital-wellbeing';
  name: string;
  tagline: string;
  description: string;
  themeColor: string;
  themeBg: string;
}

export interface GameItem {
  id: string;
  categoryId: 'decision-based-story' | 'emotional-literacy' | 'digital-wellbeing';
  categoryName: string;
  psychCategoryId: 'karakter' | 'resiliensi' | 'relasi';
  title: string;
  subtitle: string;
  description: string;
  durationMinutes: number;
  scenarioCount: number;
  badgeLabel: string;
  themeColor: string;
  themeBg: string;
  thumbnail: any;
  targetTraits: string[];
  isAvailable: boolean;
}

export const GAME_CATEGORIES: GameCategory[] = [
  {
    id: 'decision-based-story',
    name: 'Decision Story',
    tagline: 'Refleksi Pilihan Karakter',
    description:
      'Setiap pilihan memiliki cerita. Eksplorasi bagaimana keputusan kecil membawa dampak berbeda.',
    themeColor: '#2563EB',
    themeBg: '#EFF6FF',
  },
  {
    id: 'emotional-literacy',
    name: 'Emotional Literacy',
    tagline: 'Kecerdasan & Resiliensi Emosi',
    description:
      'Bisakah kamu mengenali emosi dari berbagai situasi? Perkaya kosakata dan kepekaan perasaanmu.',
    themeColor: '#059669',
    themeBg: '#ECFDF5',
  },
  {
    id: 'digital-wellbeing',
    name: 'Digital Wellbeing',
    tagline: 'Batasan & Relasi Sehat',
    description:
      'Hadapi berbagai situasi di dunia digital dan pilih respons yang paling bijak dan sehat.',
    themeColor: '#7C3AED',
    themeBg: '#F5F3FF',
  },
];

export const GAMES_CATALOG: GameItem[] = [
  {
    id: 'butterfly-effect',
    categoryId: 'decision-based-story',
    categoryName: 'Decision-Based Story',
    psychCategoryId: 'karakter',
    title: 'Butterfly Effect',
    subtitle:
      'Setiap pilihan memiliki cerita. Lihat bagaimana keputusan kecil dapat membawa hasil yang berbeda.',
    description:
      'Simulasi keputusan interaktif berbasis skenario nyata kehidupan remaja. Uji bagaimana responmu terhadap festival sekolah, dinamika pertemanan, dan situasi krisis mendadak merefleksikan karakter dan kestabilan emosimu.',
    durationMinutes: 4,
    scenarioCount: 8,
    badgeLabel: 'Decision Story',
    themeColor: '#2563EB',
    themeBg: '#EFF6FF',
    thumbnail: require('../../assets/games/thumbnails/thumb_butterfly.jpg'),
    targetTraits: ['Openness', 'Conscientiousness', 'Regulasi Stres'],
    isAvailable: true,
  },
  {
    id: 'name-that-feeling',
    categoryId: 'emotional-literacy',
    categoryName: 'Emotional Literacy',
    psychCategoryId: 'resiliensi',
    title: 'Name That Feeling',
    subtitle:
      'Bisakah kamu mengenali emosi dari berbagai situasi?',
    description:
      'Latihan kepekaan emosional untuk mengidentifikasi dan menamai perasaan secara tepat dari situasi nyata pertemanan tanpa menghakimi.',
    durationMinutes: 4,
    scenarioCount: 8,
    badgeLabel: 'Emotional Literacy',
    themeColor: '#059669',
    themeBg: '#ECFDF5',
    thumbnail: require('../../assets/games/thumbnails/thumb_feelings.jpg'),
    targetTraits: ['Granularity Emosi', 'Empati Sebaya', 'Self-Awareness'],
    isAvailable: true,
  },
  {
    id: 'digital-dilemma',
    categoryId: 'digital-wellbeing',
    categoryName: 'Digital Wellbeing',
    psychCategoryId: 'relasi',
    title: 'Digital Dilemma',
    subtitle:
      'Hadapi berbagai situasi di dunia digital dan pilih respons yang paling bijak.',
    description:
      'Simulasi etika interaksi digital, penanganan cyberbullying, dan cara menjaga batasan sehat di media sosial demi ketenangan mentalmu.',
    durationMinutes: 4,
    scenarioCount: 8,
    badgeLabel: 'Digital Wellbeing',
    themeColor: '#7C3AED',
    themeBg: '#F5F3FF',
    thumbnail: require('../../assets/games/thumbnails/thumb_dilemma.jpg'),
    targetTraits: ['Digital Assertiveness', 'Etika Siber', 'Healthy Boundaries'],
    isAvailable: true,
  },
];

export const getCategoryById = (id?: string): GameCategory => {
  return (
    GAME_CATEGORIES.find(
      (c) =>
        c.id === id ||
        (id === 'karakter' && c.id === 'decision-based-story') ||
        (id === 'resiliensi' && c.id === 'emotional-literacy') ||
        (id === 'relasi' && c.id === 'digital-wellbeing')
    ) || GAME_CATEGORIES[0]
  );
};

export const getGamesByCategoryId = (categoryId?: string): GameItem[] => {
  if (!categoryId || categoryId === 'all') return GAMES_CATALOG;
  const normalizedCategory = getCategoryById(categoryId);
  return GAMES_CATALOG.filter((g) => g.categoryId === normalizedCategory.id);
};

export const getGameById = (gameId?: string, categoryId?: string): GameItem => {
  if (gameId) {
    const found = GAMES_CATALOG.find(
      (g) =>
        g.id === gameId ||
        (gameId === 'karakter' && g.id === 'butterfly-effect') ||
        (gameId === 'resiliensi' && g.id === 'name-that-feeling') ||
        (gameId === 'relasi' && g.id === 'digital-dilemma')
    );
    if (found) return found;
  }
  if (categoryId) {
    const games = getGamesByCategoryId(categoryId);
    if (games.length > 0) return games[0];
  }
  return GAMES_CATALOG[0];
};
