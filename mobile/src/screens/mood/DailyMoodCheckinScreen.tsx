import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  Share,
  StatusBar,
  Dimensions,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  X,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Sparkles,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { useApp } from '../../state/AppContext';
import { PrimaryEmotion } from '../../types';

const { width } = Dimensions.get('window');

// Data emosi utama 4 kategori
interface EmotionConfig {
  name: PrimaryEmotion;
  label: string;
  headlineText: string;
  description: string;
  image: any;
  // Theme styling for Stage 2 & 3
  themeBg: string;
  themeCardBg: string;
  accentColor: string;
  glowColor: string;
  chipActiveBg: string;
  chipActiveText: string;
  subEmotions: string[];
}

const EMOTION_CONFIGS: Record<string, EmotionConfig> = {
  Bahagia: {
    name: 'Bahagia',
    label: 'Bahagia',
    headlineText: 'Aku Merasa Bahagia',
    description:
      'Merasa bersyukur, bersemangat, dan penuh energi positif menyambut hari ini.',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    themeBg: '#FFFBEB', // Soft warm sunny amber tint (Amber 50)
    themeCardBg: '#FEF3C7',
    accentColor: '#D97706',
    glowColor: '#FEF3C7',
    chipActiveBg: '#F59E0B',
    chipActiveText: '#FFFFFF',
    subEmotions: [
      'Bersyukur',
      'Ceria',
      'Percaya Diri',
      'Bersemangat',
      'Bangga',
      'Terinspirasi',
      'Puas',
      'Lega',
    ],
  },
  'Biasa Saja': {
    name: 'Biasa Saja',
    label: 'Biasa Saja',
    headlineText: 'Aku Merasa Biasa Saja',
    description:
      'Merasa datar, stabil, dan menjalani hari seperti biasa tanpa gejolak emosi yang kuat.',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    themeBg: '#FAF7F2', // Soft warm linen / sand pastel (selaras dengan emoji krem/beige)
    themeCardBg: '#F5EDE4',
    accentColor: '#8C6E54', // Warm latte / sand
    glowColor: '#F5EDE4', // Warm cream glow
    chipActiveBg: '#8C6E54',
    chipActiveText: '#FFFFFF',
    subEmotions: [
      'Netral',
      'Datar',
      'Stabil',
      'Biasa Saja',
      'Menjalani Hari',
      'Lempeng',
      'Mengamati',
      'Santai',
    ],
  },
  Sedih: {
    name: 'Sedih',
    label: 'Sedih',
    headlineText: 'Aku Merasa Sedih',
    description:
      'Merasa kehilangan, murung, atau terbebani oleh peristiwa yang menguras energi batin.',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    themeBg: '#EFF6FF', // Soft calming sky blue tint (Blue 50)
    themeCardBg: '#DBEAFE',
    accentColor: '#2563EB',
    glowColor: '#DBEAFE',
    chipActiveBg: '#2563EB',
    chipActiveText: '#FFFFFF',
    subEmotions: [
      'Kesepian',
      'Kecewa',
      'Hampa',
      'Murung',
      'Lelah Mental',
      'Rindu',
      'Terluka',
      'Patah Hati',
    ],
  },
  Marah: {
    name: 'Marah',
    label: 'Marah',
    headlineText: 'Aku Merasa Marah',
    description:
      'Merasa terganggu, frustrasi, atau tersakiti akibat sesuatu yang tidak sesuai harapan.',
    image: require('../../../assets/emojis/emoji_marah.png'),
    themeBg: '#FEF2F2', // Soft pastel rose / red blush tint (Red 50)
    themeCardBg: '#FEE2E2',
    accentColor: '#DC2626',
    glowColor: '#FEE2E2',
    chipActiveBg: '#DC2626',
    chipActiveText: '#FFFFFF',
    subEmotions: [
      'Dikecewakan',
      'Terhina',
      'Sakit Hati',
      'Kesal',
      'Agresif',
      'Frustrasi',
      'Menarik Diri',
      'Menyalahkan',
    ],
  },
};

// Database Afirmasi cerdas yang adaptif terhadap emosi dan subemosi
const AFFIRMATIONS: Record<string, Record<string, string>> = {
  Marah: {
    Dikecewakan:
      'Rasa kecewa adalah bukti ketulusan harapanmu. Beri hatimu ruang untuk pulih; kamu berharga melampaui perlakuan siapa pun.',
    Terhina:
      'Nilai dirimu tidak pernah berkurang oleh ucapan orang lain. Martabatmu tetap utuh, berdiri kuat dengan ketegasan yang tenang.',
    'Sakit Hati':
      'Sakit hati membantumu mengenali batasan diri yang sehat. Rawat hatimu dengan kelembutan, bukan dengan menyalahkan diri sendiri.',
    Kesal:
      'Wajar jika situasi tidak sesuai rencana. Tarik napas perlahan; lepaskan apa yang di luar kendalimu dan jaga energimu.',
    Agresif:
      'Emosimu berhak didengar. Salurkan energi ini pada hal yang aman dan konstruktif; kamu adalah pengendali atas responmu.',
    Frustrasi:
      'Jeda sejenak bukanlah tanda kekalahan. Beri waktu pada pikiranmu untuk jernih, satu tarikan napas sudah membantumu melangkah.',
    'Menarik Diri':
      'Mengambil jarak untuk menenangkan diri adalah langkah bijak. Nikmati keheningan ini untuk mengisi kembali energimu.',
    Menyalahkan:
      'Berdamai dengan ketidaksempurnaan hari ini memberimu kebebasan batin. Fokuslah pada apa yang bisa kamu perbaiki ke depan.',
    default:
      'Aku menerima kemarahanku dengan lembut, belajar dari setiap rasa, dan memilih untuk tumbuh tanpa menyalahkan diri sendiri.',
  },
  Sedih: {
    Kesepian:
      'Kesepian bukan berarti kamu tidak bernilai. Kamu sangat berharga, dan pintu percakapan hangat selalu terbuka untukmu di sini.',
    Kecewa:
      'Beri dirimu izin untuk merasa sedih. Kecewa adalah proses merelakan ekspektasi agar ruang baru yang lebih baik bisa hadir.',
    Hampa:
      'Rasa hampa adalah sinyal tubuhmu meminta istirahat yang mendalam. Hadirlah untuk dirimu hari ini tanpa tuntutan apa pun.',
    Murung:
      'Awan mendung ini hanyalah sementara. Bersabarlah dengan prosesmu; sinar hangat akan kembali menyapa pada waktunya.',
    'Lelah Mental':
      'Istirahat bukanlah kelemahan, melainkan wujud cinta kasih pada diri sendiri. Lepaskan beban sejenak dan bernapaslah lega.',
    Rindu:
      'Rindu adalah bentuk cinta yang abadi. Kenanglah dengan hangat setiap senyuman dan pelajaran yang pernah hadir di hidupmu.',
    Terluka:
      'Luka emosional butuh waktu untuk pulih, sama seperti luka fisik. Perlakukan hatimu dengan penuh kelembutan hari ini.',
    'Patah Hati':
      'Setiap akhir membuka jalan bagi awal yang baru. Hatimu jauh lebih tangguh dan berdaya dari apa yang kamu bayangkan.',
    default:
      'Rasa sedih adalah bukti hatimu jujur. Izinkan dirimu merasakan jeda ini, karena setelah malam tergelap, fajar pasti tiba.',
  },
  Bahagia: {
    Bersyukur:
      'Rasa syukur adalah magnet kebahagiaan. Simpan momen manis ini di dalam hatimu sebagai pelita ketika hari sedang redup.',
    Ceria:
      'Keceriaanmu hari ini membawa kehangatan bagi sekitarmu. Nikmati setiap tawa dan energi positif yang mengalir!',
    'Percaya Diri':
      'Keyakinan pada diri sendiri adalah kekuatan terbesarmu. Teruslah melangkah maju, kamu berada di jalur yang tepat.',
    Bersemangat:
      'Gelombang semangatmu sungguh menginspirasi! Gunakan energi berharga ini untuk menciptakan hal-hal baik hari ini.',
    Bangga:
      'Kamu pantas berbangga atas setiap usaha dan perjuanganmu. Beri apresiasi tulus pada dirimu atas langkah yang telah diraih.',
    Terinspirasi:
      'Ide-ide hebat lahir dari hati yang terbuka dan gembira. Biarkan inspirasi hari ini membimbing langkah-langkah indahmu.',
    Puas:
      'Menikmati hasil kerja keras membawa kepuasan mendalam. Rayakan pencapaian ini dengan rasa syukur dan kelegaan.',
    Lega:
      'Beban yang terangkat membuka ruang untuk bernapas lega. Nikmati kebebasan dan rasa ringan yang hadir di hatimu.',
    default:
      'Rayakan setiap detik kebahagiaanmu hari ini. Kamu pantas menikmati setiap senyuman dan pencapaian kecilmu.',
  },
  'Biasa Saja': {
    Netral:
      'Hari yang netral adalah ruang istirahat bagi pikiranmu. Tidak semua hari harus penuh drama atau euforia; stabil apa adanya itu sudah cukup.',
    Datar:
      'Merasa datar adalah respon alami tubuh saat berada di zona aman. Nikmati ritme yang lempeng ini tanpa beban ekspektasi.',
    Stabil:
      'Kondisi yang stabil membantumu menjalani rutinitas dengan lancar. Tetaplah hadir dan nikmati hari apa adanya.',
    'Biasa Saja':
      'Hari yang biasa-biasa saja tetap memiliki nilainya sendiri. Bernapas lega, jalani harimu langkah demi langkah.',
    'Menjalani Hari':
      'Mengalir mengikuti alur hari ini dengan nyaman. Kamu tidak perlu membuktikan apa-apa, cukup jalani harimu apa adanya.',
    Lempeng:
      'Pikiran yang lempeng dan tidak mudah terombang-ambing adalah bentuk pertahanan diri yang hebat. Nikmati harimu.',
    Mengamati:
      'Melihat dunia tanpa banyak reaksi emosional memberimu kejernihan pandang. Nikmati peranmu sebagai pengamat hari ini.',
    Santai:
      'Menjalani hari dengan santai tanpa terburu-buru. Kamu memegang kendali atas ritmemu sendiri.',
    default:
      'Hari biasa adalah fondasi kehidupan yang berharga. Hargai ritme harimu yang stabil dan mengalir apa adanya.',
  },
};

export const DailyMoodCheckinScreen: React.FC = () => {
  const { user, saveMood, navigateTo, screenParams, todayMood, skipMoodCheckinToday } = useApp();

  // State alur 3 tahap: 1 = Mood Selection, 2 = Emotion Exploration, 3 = Affirmation
  const [stage, setStage] = useState<1 | 2 | 3>(screenParams?.initialStage || 1);

  // Pilihan emosi - utamakan data hari ini jika sudah pernah diisi, atau preferensi awal onboarding
  const initialEmotionKey =
    todayMood?.primaryEmotion ||
    screenParams?.selectedEmotion ||
    user?.initialEmotion ||
    'Bahagia';

  const [selectedEmotionKey, setSelectedEmotionKey] = useState<string>(initialEmotionKey);
  const currentConfig = EMOTION_CONFIGS[selectedEmotionKey] || EMOTION_CONFIGS.Bahagia;

  // Subemosi: utamakan yang sudah dipilih pengguna, atau default ke subemosi pertama dari emosi aktif
  const [selectedSubEmotion, setSelectedSubEmotion] = useState<string>(
    todayMood?.secondaryEmotions?.[0] || currentConfig.subEmotions[0]
  );

  // Cerita / momen opsional (hanya terbuka jika pengguna sudah pernah menulis catatan aktual)
  const [isStoryExpanded, setIsStoryExpanded] = useState<boolean>(
    Boolean(todayMood?.note && todayMood.note.trim())
  );
  const [storyNote, setStoryNote] = useState<string>(todayMood?.note || '');

  // Feedback evaluasi di tahap 3
  const [feedbackVote, setFeedbackVote] = useState<'up' | 'down' | null>(null);
  const [shareToast, setShareToast] = useState<string>('');

  // Afirmasi teks berdasarkan emosi & subemosi
  const getAffirmationText = (): string => {
    const emotionGroup = AFFIRMATIONS[selectedEmotionKey];
    if (!emotionGroup) return AFFIRMATIONS.Bahagia.default;
    return (
      emotionGroup[selectedSubEmotion] ||
      emotionGroup.default ||
      AFFIRMATIONS.Bahagia.default
    );
  };

  // Navigasi & aksi
  const handleNextToExploration = () => {
    // Pastikan sub-emosi default terpilih jika belum
    if (!currentConfig.subEmotions.includes(selectedSubEmotion)) {
      setSelectedSubEmotion(currentConfig.subEmotions[0]);
    }
    setStage(2);
  };

  const handleNextToAffirmation = () => {
    setStage(3);
  };

  const handleShareQuote = async () => {
    const quote = getAffirmationText();
    try {
      await Share.share({
        title: 'Daily Affirmation — Teman Sebaya',
        message: `"${quote}"\n\n— Daily Mood Check-in Teman Sebaya`,
      });
      setShareToast('Kutipan berhasil dibagikan!');
      setTimeout(() => setShareToast(''), 3000);
    } catch (_error) {
      setShareToast('Kutipan disalin ke papan klip.');
      setTimeout(() => setShareToast(''), 3000);
    }
  };

  const handleFinishCheckin = () => {
    // Simpan ke AppContext dengan data aktual yang dipilih pengguna
    saveMood(
      currentConfig.name,
      [selectedSubEmotion],
      storyNote.trim(),
      ['Daily Check-in']
    );
    // Masuk ke Home / Beranda
    navigateTo('main');
  };

  const handleSkipToHome = () => {
    // Catat bahwa check-in dilewati hari ini jika belum ada mood yang tersimpan
    if (!todayMood) {
      skipMoodCheckinToday();
    }
    navigateTo('main');
  };

  /* -------------------------------------------------------------
   * RENDER: TAHAP 1 - MOOD SELECTION
   * ------------------------------------------------------------- */
  const renderStage1 = () => {
    return (
      <View style={styles.stage1Container}>
        <StatusBar barStyle="dark-content" />

        {/* Top Header Row */}
        <View style={styles.topHeader}>
          <TouchableOpacity
            style={styles.circleIconButton}
            activeOpacity={0.7}
            onPress={handleSkipToHome}
          >
            <ArrowLeft size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Mood Check-in</Text>

          <TouchableOpacity
            style={styles.skipButton}
            activeOpacity={0.7}
            onPress={handleSkipToHome}
          >
            <Text style={styles.skipButtonText}>Lewati</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.stage1ScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Title Heading */}
          <View style={styles.headingSection}>
            <Text style={styles.heroHeading}>
              Bagaimana suasana{'\n'}
              <Text style={{ color: colors.brandBlue[600] }}>hatimu</Text> hari ini?
            </Text>
            <Text style={styles.heroSubheading}>
              Pilih satu emoji yang paling menggambarkan energimu sekarang.
            </Text>
          </View>

          {/* Central Hero Emotion Display */}
          <View style={styles.heroCardContainer}>
            <Image
              source={currentConfig.image}
              style={styles.heroEmojiImage}
              resizeMode="contain"
            />

            {/* Emotion Title & Description */}
            <View style={styles.heroLabelWrap}>
              <Text
                style={[
                  styles.emotionHeadlineText,
                  { color: currentConfig.accentColor },
                ]}
              >
                {currentConfig.headlineText}
              </Text>
              <Text style={styles.emotionDescriptionText}>
                {currentConfig.description}
              </Text>
            </View>
          </View>

          {/* Bottom Mood Dock / Interactive Selector */}
          <View style={styles.bottomSelectorDock}>
            <Text style={styles.dockTitle}>PILIH SUASANA HATIMU</Text>
            <View style={styles.moodDockRow}>
              {(['Bahagia', 'Sedih', 'Marah', 'Biasa Saja'] as const).map((key) => {
                const item = EMOTION_CONFIGS[key];
                const isSelected = selectedEmotionKey === key;

                return (
                  <TouchableOpacity
                    key={key}
                    activeOpacity={0.7}
                    onPress={() => {
                      setSelectedEmotionKey(key);
                      setSelectedSubEmotion(item.subEmotions[0]);
                    }}
                    style={[
                      styles.dockItem,
                      isSelected && styles.dockItemSelected,
                      isSelected && { borderColor: item.accentColor },
                    ]}
                  >
                    <View style={styles.dockThumbWrapper}>
                      <Image
                        source={item.image}
                        style={styles.dockEmojiThumb}
                        resizeMode="contain"
                      />
                    </View>
                    <Text
                      style={[
                        styles.dockItemLabel,
                        isSelected && {
                          color: item.accentColor,
                          fontWeight: '700',
                        },
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <View
                        style={[
                          styles.activeDot,
                          { backgroundColor: item.accentColor },
                        ]}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Primary Action Button */}
          <TouchableOpacity
            style={styles.primaryActionButton}
            activeOpacity={0.8}
            onPress={handleNextToExploration}
          >
            <Text style={styles.primaryActionText}>Lanjut ke Eksplorasi</Text>
            <ArrowRight size={18} color={colors.surface} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  /* -------------------------------------------------------------
   * RENDER: TAHAP 2 - EMOTION EXPLORATION
   * ------------------------------------------------------------- */
  const renderStage2 = () => {
    return (
      <View
        style={[
          styles.immersiveContainer,
          { backgroundColor: currentConfig.themeBg },
        ]}
      >
        <StatusBar barStyle="dark-content" />

        {/* Top Header - Bersih tanpa badge langkah */}
        <View style={styles.immersiveHeader}>
          <TouchableOpacity
            style={styles.translucentCircleButton}
            activeOpacity={0.7}
            onPress={() => setStage(1)}
          >
            <ArrowLeft size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.translucentCircleButton}
            activeOpacity={0.7}
            onPress={handleSkipToHome}
          >
            <X size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.stage2ScrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Standalone Mood Emoji Hero */}
          <View style={styles.stage2HeroSection}>
            <Image
              source={currentConfig.image}
              style={styles.stage2EmojiStandalone}
              resizeMode="contain"
            />
            <Text
              style={[
                styles.stage2EmotionTitle,
                { color: currentConfig.accentColor },
              ]}
            >
              {currentConfig.name}
            </Text>
            <Text style={styles.stage2EmotionDesc}>
              {currentConfig.description}
            </Text>
          </View>

          {/* Sub-Emotion Selection Section (Fixed 3-3-2 Grid, No Checkmark Vector, Zero Layout Shift) */}
          <View style={styles.subEmotionSection}>
            <Text style={styles.subEmotionPrompt}>
              Pilih satu yang paling menggambarkan dirimu.
            </Text>

            <View style={styles.chipsContainer}>
              {[
                currentConfig.subEmotions.slice(0, 3),
                currentConfig.subEmotions.slice(3, 6),
                currentConfig.subEmotions.slice(6, 8),
              ].map((row, rowIdx) => (
                <View key={rowIdx} style={styles.chipsRow}>
                  {row.map((sub) => {
                    const isSelected = selectedSubEmotion === sub;
                    return (
                      <TouchableOpacity
                        key={sub}
                        activeOpacity={0.8}
                        onPress={() => setSelectedSubEmotion(sub)}
                        style={[
                          styles.subEmotionChip,
                          isSelected && {
                            backgroundColor: currentConfig.accentColor,
                            borderColor: currentConfig.accentColor,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.subEmotionChipText,
                            isSelected && styles.subEmotionChipTextSelected,
                          ]}
                        >
                          {sub}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ))}
            </View>
          </View>

          {/* Optional Story / Moment Input */}
          <View style={styles.storySection}>
            <Text style={styles.storyPromptTitle}>
              Apa yang membuat kamu merasa demikian?
            </Text>

            {!isStoryExpanded ? (
              <TouchableOpacity
                style={styles.addMomentButton}
                activeOpacity={0.8}
                onPress={() => setIsStoryExpanded(true)}
              >
                <Text style={styles.addMomentText}>Tambahkan momen / cerita</Text>
                <Plus size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            ) : (
              <View style={styles.storyInputCard}>
                <TextInput
                  style={styles.storyTextInput}
                  placeholder="Ceritakan hal atau peristiwa yang melatarbelakangi perasaanmu... (opsional)"
                  placeholderTextColor={colors.textPlaceholder}
                  multiline
                  numberOfLines={3}
                  value={storyNote}
                  onChangeText={setStoryNote}
                  maxLength={200}
                />
                <View style={styles.storyCardFooter}>
                  <Text style={styles.charCounter}>
                    {storyNote.length}/200 karakter
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      if (!storyNote.trim()) setIsStoryExpanded(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.doneInputText,
                        { color: currentConfig.accentColor },
                      ]}
                    >
                      Simpan Catatan
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* Navigation Action Buttons Row */}
          <View style={styles.stage2ActionRow}>
            <TouchableOpacity
              style={styles.stage2PrevButton}
              activeOpacity={0.7}
              onPress={() => setStage(1)}
            >
              <Text style={styles.stage2PrevText}>Sebelumnya</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.stage2NextButton}
              activeOpacity={0.8}
              onPress={handleNextToAffirmation}
            >
              <Text style={styles.stage2NextText}>Simpan & Lanjut</Text>
              <ArrowRight size={16} color={colors.surface} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  };

  /* -------------------------------------------------------------
   * RENDER: TAHAP 3 - AFFIRMATION
   * ------------------------------------------------------------- */
  const renderStage3 = () => {
    const quote = getAffirmationText();

    return (
      <View
        style={[
          styles.immersiveContainer,
          { backgroundColor: currentConfig.themeBg },
        ]}
      >
        <StatusBar barStyle="dark-content" />

        {/* Top Header - Bersih tanpa badge langkah */}
        <View style={styles.immersiveHeader}>
          <TouchableOpacity
            style={styles.translucentCircleButton}
            activeOpacity={0.7}
            onPress={() => setStage(2)}
          >
            <ArrowLeft size={18} color={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.translucentCircleButton}
            activeOpacity={0.7}
            onPress={handleFinishCheckin}
          >
            <X size={18} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.stage3ScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Floating Share Toast if any */}
          {shareToast ? (
            <View style={styles.toastCard}>
              <Sparkles size={14} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.toastText}>{shareToast}</Text>
            </View>
          ) : null}

          {/* Expressive Heart Accent */}
          <View style={styles.heartHeroContainer}>
            <View style={styles.heartGlowCircle}>
              <Heart
                size={40}
                color={currentConfig.accentColor}
                fill={currentConfig.accentColor}
              />
            </View>
          </View>

          {/* Emotion Meta Pill */}
          <View style={styles.subEmotionPillWrap}>
            <View style={styles.subEmotionPill}>
              <Text style={styles.subEmotionPillText}>
                Refleksi: {currentConfig.name} · {selectedSubEmotion}
              </Text>
            </View>
          </View>

          {/* Main Affirmation Quote */}
          <View style={styles.quoteCard}>
            <Text
              style={[
                styles.quoteMark,
                { color: currentConfig.accentColor },
              ]}
            >
              “
            </Text>
            <Text style={styles.quoteBodyText}>{quote}</Text>
          </View>

          {/* Share Quote Button */}
          <TouchableOpacity
            style={styles.shareButton}
            activeOpacity={0.8}
            onPress={handleShareQuote}
          >
            <Text style={styles.shareButtonText}>Bagikan</Text>
            <Share2 size={16} color={colors.surface} />
          </TouchableOpacity>

          {/* User Feedback Section */}
          <View style={styles.feedbackSection}>
            <Text style={styles.feedbackPromptText}>
              Apakah pesan ini mewakili kondisimu saat ini?
            </Text>

            <View style={styles.feedbackButtonsRow}>
              {/* Thumbs Down */}
              <TouchableOpacity
                style={[
                  styles.feedbackCircleButton,
                  styles.thumbsDownButton,
                  feedbackVote === 'down' && styles.thumbsDownActive,
                ]}
                activeOpacity={0.7}
                onPress={() =>
                  setFeedbackVote((prev) => (prev === 'down' ? null : 'down'))
                }
              >
                <ThumbsDown
                  size={24}
                  color={feedbackVote === 'down' ? '#FFFFFF' : '#EF4444'}
                />
              </TouchableOpacity>

              {/* Thumbs Up */}
              <TouchableOpacity
                style={[
                  styles.feedbackCircleButton,
                  styles.thumbsUpButton,
                  feedbackVote === 'up' && styles.thumbsUpActive,
                ]}
                activeOpacity={0.7}
                onPress={() =>
                  setFeedbackVote((prev) => (prev === 'up' ? null : 'up'))
                }
              >
                <ThumbsUp
                  size={24}
                  color={feedbackVote === 'up' ? '#FFFFFF' : '#10B981'}
                />
              </TouchableOpacity>
            </View>

            {feedbackVote && (
              <Text style={styles.feedbackThankYouText}>
                {feedbackVote === 'up'
                  ? 'Terima kasih! Senang pesan ini bermanfaat untukmu.'
                  : 'Terima kasih atas tanggapanmu, kami akan terus menyempurnakannya.'}
              </Text>
            )}
          </View>

          {/* Completion CTA Button */}
          <TouchableOpacity
            style={styles.finishCtaButton}
            activeOpacity={0.85}
            onPress={handleFinishCheckin}
          >
            <Text style={styles.finishCtaText}>Selesai</Text>
            <ArrowRight size={18} color={colors.surface} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {stage === 1 && renderStage1()}
      {stage === 2 && renderStage2()}
      {stage === 3 && renderStage3()}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },

  /* ------------------ TAHAP 1 STYLES ------------------ */
  stage1Container: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  topHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.canvas,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  circleIconButton: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: borderRadius.full,
  },
  skipButtonText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  stage1ScrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  headingSection: {
    marginBottom: spacing.lg,
  },
  heroHeading: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    lineHeight: 34,
    marginBottom: spacing.xs,
  },
  heroSubheading: {
    ...typography.bodyRegular,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  heroCardContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.lg,
    // subtle shadow
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  emojiHaloGlow: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroEmojiImage: {
    width: 136,
    height: 136,
    marginBottom: spacing.md,
  },
  heroLabelWrap: {
    alignItems: 'center',
    width: '100%',
  },
  emotionHeadlineText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  emotionDescriptionText: {
    ...typography.bodySmall,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: spacing.sm,
  },
  primaryActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue[600],
    height: 50,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    marginBottom: spacing.md,
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryActionText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
  },
  bottomSelectorDock: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderLight,
    marginBottom: spacing.md,
  },
  dockTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.8,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  moodDockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.xs,
  },
  dockItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: 4,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: 'transparent',
    backgroundColor: colors.surfaceAlt,
  },
  dockItemSelected: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dockThumbWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  dockEmojiThumb: {
    width: 32,
    height: 32,
  },
  dockItemLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },

  /* ------------------ TAHAP 2 STYLES ------------------ */
  immersiveContainer: {
    flex: 1,
  },
  immersiveHeader: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
  },
  translucentCircleButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  stage2ScrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
  },
  stage2HeroSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  stage2EmojiStandalone: {
    width: 136,
    height: 136,
    marginBottom: spacing.md,
  },
  stage2EmotionTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stage2EmotionDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 19,
    paddingHorizontal: spacing.md,
  },
  subEmotionSection: {
    marginBottom: spacing.xl,
  },
  subEmotionPrompt: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  chipsContainer: {
    gap: 10,
    alignItems: 'center',
    width: '100%',
  },
  chipsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'nowrap',
  },
  subEmotionChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  subEmotionChipSelected: {
    shadowOpacity: 0.15,
    elevation: 3,
  },
  subEmotionChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subEmotionChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  storySection: {
    marginBottom: spacing.xl,
  },
  storyPromptTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  addMomentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderMedium,
    borderRadius: borderRadius.lg,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  addMomentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  storyInputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.borderMedium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  storyTextInput: {
    fontSize: 13,
    color: colors.textPrimary,
    minHeight: 64,
    textAlignVertical: 'top',
  },
  storyCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },
  charCounter: {
    fontSize: 11,
    color: colors.textMuted,
  },
  doneInputText: {
    fontSize: 12,
    fontWeight: '700',
  },
  stage2ActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  stage2PrevButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: borderRadius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.borderMedium,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stage2PrevText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stage2NextButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue[600],
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  stage2NextText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.surface,
  },

  /* ------------------ TAHAP 3 STYLES ------------------ */
  stage3ScrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xxxl,
    alignItems: 'center',
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: borderRadius.full,
    marginBottom: spacing.md,
  },
  toastText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  heartHeroContainer: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  heartGlowCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  subEmotionPillWrap: {
    marginBottom: spacing.lg,
  },
  subEmotionPill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  subEmotionPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  quoteCard: {
    width: '100%',
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  quoteMark: {
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 48,
    marginBottom: -16,
  },
  quoteBodyText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 30,
    letterSpacing: -0.2,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue[600],
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
    marginBottom: spacing.xxl,
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  shareButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.surface,
  },
  feedbackSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  feedbackPromptText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  feedbackButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    marginBottom: spacing.sm,
  },
  feedbackCircleButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbsDownButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FECACA',
  },
  thumbsDownActive: {
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
    shadowColor: '#EF4444',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1.05 }],
  },
  thumbsUpButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#A7F3D0',
  },
  thumbsUpActive: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
    shadowColor: '#10B981',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 4,
    transform: [{ scale: 1.05 }],
  },
  feedbackThankYouText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  finishCtaButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brandBlue[600],
    height: 52,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
    shadowColor: colors.brandBlue[600],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  finishCtaText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.surface,
  },
});
