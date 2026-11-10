import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Animated,
  Easing,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
} from 'react-native';
import {
  ArrowLeft,
  CheckSquare,
  Square,
  Sparkles,
  MapPin,
  ChevronRight,
  ChevronDown,
  Check,
  Search,
  X,
  Heart,
  Star,
} from 'lucide-react-native';
import { colors, spacing, borderRadius, typography } from '../../theme';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { useApp } from '../../state/AppContext';
import { validateNickname } from '../../utils/validation';
import { PrimaryEmotion } from '../../types';

// Daftar resmi 27 Kota & Kabupaten di Provinsi Jawa Barat
const WEST_JAVA_CITIES = [
  'Kabupaten Bandung',
  'Kabupaten Bandung Barat',
  'Kabupaten Bekasi',
  'Kabupaten Bogor',
  'Kabupaten Ciamis',
  'Kabupaten Cianjur',
  'Kabupaten Cirebon',
  'Kabupaten Garut',
  'Kabupaten Indramayu',
  'Kabupaten Karawang',
  'Kabupaten Kuningan',
  'Kabupaten Majalengka',
  'Kabupaten Pangandaran',
  'Kabupaten Purwakarta',
  'Kabupaten Subang',
  'Kabupaten Sukabumi',
  'Kabupaten Sumedang',
  'Kabupaten Tasikmalaya',
  'Kota Bandung',
  'Kota Banjar',
  'Kota Bekasi',
  'Kota Bogor',
  'Kota Cimahi',
  'Kota Cirebon',
  'Kota Depok',
  'Kota Sukabumi',
  'Kota Tasikmalaya',
];

// 4 Emosi Utama untuk Mood Check-in Pertama dengan Background Solid
const MOOD_OPTIONS: {
  type: PrimaryEmotion;
  label: string;
  hint: string;
  image: any;
  solidBg: string;
  borderColor: string;
  selectedBorderColor: string;
  titleColor: string;
  hintColor: string;
}[] = [
  {
    type: 'Bahagia',
    label: 'Bahagia',
    hint: 'Ceria',
    image: require('../../../assets/emojis/emoji_bahagia.png'),
    solidBg: '#FEF08A', // Solid warm sunny yellow
    borderColor: '#FDE047',
    selectedBorderColor: '#EAB308',
    titleColor: '#78350F',
    hintColor: '#854D0E',
  },
  {
    type: 'Sedih',
    label: 'Sedih',
    hint: 'Murung',
    image: require('../../../assets/emojis/emoji_sedih.png'),
    solidBg: '#BFDBFE', // Solid blue
    borderColor: '#93C5FD',
    selectedBorderColor: '#1D4ED8',
    titleColor: '#1E3A8A',
    hintColor: '#1D4ED8',
  },
  {
    type: 'Marah',
    label: 'Marah',
    hint: 'Kesal',
    image: require('../../../assets/emojis/emoji_marah.png'),
    solidBg: '#FECACA', // Solid coral red
    borderColor: '#FCA5A5',
    selectedBorderColor: '#DC2626',
    titleColor: '#7F1D1D',
    hintColor: '#991B1B',
  },
  {
    type: 'Biasa Saja',
    label: 'Biasa Saja',
    hint: 'Tenang',
    image: require('../../../assets/emojis/emoji_biasa.png'),
    solidBg: '#EADBC8', // Solid warm beige
    borderColor: '#D8C5B0',
    selectedBorderColor: '#8C6E54',
    titleColor: '#3E2723',
    hintColor: '#5D4037',
  },
];

export const ThoriqOnboardingScreen: React.FC = () => {
  const { user, updateProfile, saveMood, navigateTo, switchTab, screenParams } = useApp();

  // Current Step (0: Intro Wysa-style, 1: Age & Consent, 2: Profile Setup, 3: First Mood Check-in)
  const [step, setStep] = useState<number>(0);

  // Form State: Step 1 (Age & Consent) - Kosong secara default
  const [birthDay, setBirthDay] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [ageConsentAgreed, setAgeConsentAgreed] = useState(false);
  const [step1Error, setStep1Error] = useState('');

  // Form State: Step 2 (Profile Setup) - Kosong secara default
  const [nickname, setNickname] = useState('');
  const [city, setCity] = useState('');
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Kelola Stres',
    'Emosi',
  ]);
  const [step2Error, setStep2Error] = useState('');
  const [cityError, setCityError] = useState('');

  // Form State: Step 3 (Mood Check-in)
  const [selectedMood, setSelectedMood] = useState<PrimaryEmotion | null>(null);

  // Animation values
  const isNativeDriver = Platform.OS !== 'web';
  const bubbleScale = useRef(new Animated.Value(0.85)).current;
  const bubbleOpacity = useRef(new Animated.Value(0)).current;
  const contentFade = useRef(new Animated.Value(1)).current;

  // Speech bubble spring entrance when step changes
  useEffect(() => {
    bubbleScale.setValue(0.85);
    bubbleOpacity.setValue(0);
    contentFade.setValue(0);

    Animated.parallel([
      Animated.spring(bubbleScale, {
        toValue: 1,
        friction: 5,
        tension: 50,
        useNativeDriver: isNativeDriver,
      }),
      Animated.timing(bubbleOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: isNativeDriver,
      }),
      Animated.timing(contentFade, {
        toValue: 1,
        duration: 300,
        useNativeDriver: isNativeDriver,
      }),
    ]).start();
  }, [step, bubbleScale, bubbleOpacity, contentFade, isNativeDriver]);

  // Dynamic age calculation
  const calculateAge = () => {
    const d = parseInt(birthDay, 10);
    const m = parseInt(birthMonth, 10);
    const y = parseInt(birthYear, 10);
    if (!y || isNaN(y) || y < 1900) return 16;
    const today = new Date();
    let age = today.getFullYear() - y;
    if (m && !isNaN(m)) {
      const monthDiff = today.getMonth() + 1 - m;
      if (monthDiff < 0 || (monthDiff === 0 && d && !isNaN(d) && today.getDate() < d)) {
        age--;
      }
    }
    return age;
  };
  const computedAge = calculateAge();
  const isTeen = computedAge >= 10 && computedAge <= 17;
  const isYoungAdult = computedAge >= 18 && computedAge <= 24;

  // Calendar Lock & Auto-Clamp Helpers (Official Gregorian Calendar)
  const getMaxDaysInMonth = (monthStr: string, yearStr: string): number => {
    const m = parseInt(monthStr, 10);
    if (!m || isNaN(m) || m < 1 || m > 12) return 31;
    const y = parseInt(yearStr, 10) || 2024;
    return new Date(y, m, 0).getDate();
  };

  const handleDayChange = (raw: string) => {
    if (step1Error) setStep1Error('');
    const cleaned = raw.replace(/[^0-9]/g, '');
    if (!cleaned) {
      setBirthDay('');
      return;
    }
    const num = parseInt(cleaned, 10);
    const maxDays = getMaxDaysInMonth(birthMonth, birthYear);
    if (num > maxDays) {
      setBirthDay(String(maxDays));
    } else {
      setBirthDay(cleaned);
    }
  };

  const handleMonthChange = (raw: string) => {
    if (step1Error) setStep1Error('');
    const cleaned = raw.replace(/[^0-9]/g, '');
    if (!cleaned) {
      setBirthMonth('');
      return;
    }
    const num = parseInt(cleaned, 10);
    let finalMonth = cleaned;
    if (num > 12) {
      finalMonth = '12';
    }
    setBirthMonth(finalMonth);

    // Auto-lock Day if existing day exceeds new month's calendar maximum
    if (birthDay) {
      const dayNum = parseInt(birthDay, 10);
      const maxDays = getMaxDaysInMonth(finalMonth, birthYear);
      if (dayNum > maxDays) {
        setBirthDay(String(maxDays));
      }
    }
  };

  const handleYearChange = (raw: string) => {
    if (step1Error) setStep1Error('');
    const cleaned = raw.replace(/[^0-9]/g, '');
    const currentYear = new Date().getFullYear();
    if (!cleaned) {
      setBirthYear('');
      return;
    }
    let finalYear = cleaned;
    if (cleaned.length === 4) {
      const num = parseInt(cleaned, 10);
      if (num > currentYear) {
        finalYear = String(currentYear);
      }
    }
    setBirthYear(finalYear);

    // Re-check February days if year changed (leap year 28 vs 29)
    if (birthDay && (birthMonth === '2' || birthMonth === '02')) {
      const maxDays = getMaxDaysInMonth(birthMonth, finalYear);
      if (parseInt(birthDay, 10) > maxDays) {
        setBirthDay(String(maxDays));
      }
    }
  };

  // Navigation handlers between steps
  const handleProceedFromIntro = () => {
    setStep(1);
  };

  const handleProceedFromAge = () => {
    const d = parseInt(birthDay, 10);
    const m = parseInt(birthMonth, 10);
    const y = parseInt(birthYear, 10);

    if (!birthDay.trim() || !birthMonth.trim() || !birthYear.trim()) {
      setStep1Error('Mohon masukkan tanggal, bulan, dan tahun lahirmu.');
      return;
    }

    if (isNaN(d) || d < 1 || d > 31) {
      setStep1Error('Tanggal lahir tidak valid (harus 1–31).');
      return;
    }

    if (isNaN(m) || m < 1 || m > 12) {
      setStep1Error('Bulan lahir tidak valid (harus 1–12).');
      return;
    }

    const currentYear = new Date().getFullYear();
    if (isNaN(y) || y < 1900 || y > currentYear) {
      setStep1Error('Tahun lahir tidak valid.');
      return;
    }

    const age = computedAge;
    if (age < 10) {
      setStep1Error('Layanan Teman Sebaya ditujukan untuk usia minimal 10 tahun.');
      return;
    }

    if (!ageConsentAgreed) {
      setStep1Error('Mohon setujui prinsip perlindungan data & ruang aman.');
      return;
    }

    setStep1Error('');
    setStep(2);
  };

  const filteredCities = WEST_JAVA_CITIES.filter((c) =>
    c.toLowerCase().includes(citySearchQuery.toLowerCase().trim())
  );

  const handleSelectCity = (selectedCity: string) => {
    setCity(selectedCity);
    if (cityError) setCityError('');
    setShowCityPicker(false);
    setCitySearchQuery('');
  };

  const handleProceedFromProfile = () => {
    let hasError = false;
    const nicknameValidation = validateNickname(nickname);
    if (!nicknameValidation.isValid) {
      setStep2Error(nicknameValidation.error || 'Nama panggilan tidak valid.');
      hasError = true;
    } else {
      setStep2Error('');
    }

    if (!city.trim()) {
      setCityError('Silakan pilih kota atau kabupaten asalmu.');
      hasError = true;
    } else {
      setCityError('');
    }

    if (hasError) return;

    setStep(3);
  };

  const handleFinishOnboarding = (skipMood = false) => {
    // 1. Simpan preferensi profil pengguna baru tanpa menandai Daily Mood Check-in sudah selesai
    // Catatan: Daily Mood Check-in 3-tahap (Eksplorasi & Afirmasi) baru dilakukan di Beranda / setelah Login
    updateProfile({
      nickname: nickname.trim(),
      name: user?.name || nickname.trim(),
      city: city.trim(),
      interests: selectedInterests,
      age: computedAge,
      ageCategory: isTeen ? 'teen' : computedAge <= 24 ? 'young_adult' : 'adult',
      birthDate: `${birthDay}-${birthMonth}-${birthYear}`,
      initialEmotion: !skipMood && selectedMood ? selectedMood : undefined,
    });

    // 2. Langsung arahkan ke Beranda dengan status Daily Mood Check-in: Not Started
    switchTab('beranda');
    navigateTo('main');
  };

  // Interest options (2-column symmetrical grid, concise without emoji)
  const interestOptions = [
    { id: 'stres', title: 'Kelola Stres' },
    { id: 'teman', title: 'Pertemanan' },
    { id: 'emosi', title: 'Emosi' },
    { id: 'belajar', title: 'Belajar' },
    { id: 'selfcare', title: 'Self-Care' },
    { id: 'bullying', title: 'Anti-Bullying' },
  ];

  const toggleInterest = (title: string) => {
    if (selectedInterests.includes(title)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== title));
    } else {
      setSelectedInterests([...selectedInterests, title]);
    }
  };

  // Select mascot image according to active step
  const getMascotSource = () => {
    switch (step) {
      case 0:
        return require('../../../assets/mascot/mascot_waving_clean.png');
      case 1:
        return require('../../../assets/mascot/mascot_thinking_clean.png');
      case 2:
        // Saat nanya nama ("Keren! Terus, bagaimana kami bisa memanggilmu?") -> Pose Jempol
        return require('../../../assets/mascot/mascot_thumbsup_clean.png');
      case 3:
      default:
        // Saat salam kenal ("Salam kenal {nickname}!") -> Pose Waving (Melambaikan tangan)
        return require('../../../assets/mascot/mascot_waving_clean.png');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar barStyle="dark-content" />

      {/* Progress & Header Bar (Only visible from step 1 onwards) */}
      {step > 0 && (
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setStep(step - 1)}
            style={styles.backBtn}
          >
            <ArrowLeft size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          {/* 3-segment progress bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressSegment, step >= 1 && styles.progressSegmentActive]} />
            <View style={[styles.progressSegment, step >= 2 && styles.progressSegmentActive]} />
            <View style={[styles.progressSegment, step >= 3 && styles.progressSegmentActive]} />
          </View>

          <Text style={styles.stepText}>Langkah {step} dari 3</Text>
        </View>
      )}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, step === 0 && styles.scrollContentIntro]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ========================================================
            STEP 0: INTRO HERO (Logo Top -> Mascot Center -> Text Bottom -> CTA)
        ======================================================== */}
        {step === 0 && (
          <View style={styles.introContainer}>
            {/* 1. TOP: Logo Teman Sebaya */}
            <View style={styles.introLogoSection}>
              <Image
                source={require('../../../assets/logo/teman_sebaya_logo_clean.png')}
                style={styles.introLogoImage}
                resizeMode="contain"
              />
            </View>

            {/* 2. CENTER: Hero Mascot with Aura and Playful Accents (Close to mascot) */}
            <View style={styles.introMascotCenterArea}>
              {/* Mascot Character with Concentric Background Aura and Accents */}
              <View style={styles.introMascotWrap}>
                {/* Soft Ambient Radial Background Aura */}
                <View style={styles.introAuraBackground} />

                {/* Playful Floating Accent 1: Heart on top right (close to hair) */}
                <View style={styles.playfulDecorHeart}>
                  <Heart size={22} color={colors.brandBlue[500]} fill={colors.brandBlue[200]} />
                </View>

                {/* Playful Floating Accent 2: Warm Playful Star on left (close to hand) */}
                <View style={styles.playfulDecorStarLeft}>
                  <Star size={18} color="#F59E0B" fill="#FEF3C7" />
                </View>

                {/* Playful Floating Accent 3: Subtle Sparkle on bottom right (close to arm) */}
                <View style={styles.playfulDecorSparkleRight}>
                  <Sparkles size={16} color={colors.brandBlue[600]} />
                </View>

                <Image
                  source={getMascotSource()}
                  style={styles.introMascotImage}
                  resizeMode="contain"
                />
              </View>
            </View>

            {/* 3. BELOW MASCOT: Text Content (Heading -> Subtitle) */}
            <View style={styles.introTextSection}>
              <Text style={styles.introHeading}>Hai! Aku Thoriq</Text>
              <Text style={styles.introSubtitle}>
                Teman yang siap mendengarkan ceritamu tanpa menghakimi, membantumu merasa lebih tenang, dan bertumbuh bersama.
              </Text>
            </View>

            {/* 4. BOTTOM: CTA Button */}
            <View style={styles.introBottomSection}>
              <Button
                title="Hai Thoriq, Salam Kenal!"
                variant="primary"
                fullWidth
                size="lg"
                onPress={handleProceedFromIntro}
                style={styles.introCtaBtn}
                textStyle={styles.introCtaBtnText}
              />
            </View>
          </View>
        )}

        {/* ========================================================
            STEP 1: AGE & CONSENT (Screen A06 BRIEF TEMAN SEBAYA)
        ======================================================== */}
        {step === 1 && (
          <Animated.View style={[styles.stepContainer, { opacity: contentFade }]}>
            {/* Mascot & Speech Bubble */}
            <View style={styles.mascotDialogRow}>
              <View style={styles.dialogMascotWrap}>
                <Image
                  source={getMascotSource()}
                  style={styles.dialogMascotImage}
                  resizeMode="contain"
                />
              </View>

              <Animated.View
                style={[
                  styles.speechBubble,
                  {
                    transform: [{ scale: bubbleScale }],
                    opacity: bubbleOpacity,
                  },
                ]}
              >
                <View style={styles.speechTail} />
                <Text style={styles.speechText}>
                  Boleh tahu tanggal lahirmu? Biar aku bisa menyiapkan ruang yang paling aman dan pas
                  buat usiamu! 🤔
                </Text>
              </Animated.View>
            </View>

            {/* Date of Birth Selection Form */}
            <View style={styles.formCard}>
              <Text style={styles.inputGroupLabel}>Tanggal Lahir Kamu</Text>

              <View style={styles.datePickerRow}>
                {/* Tanggal */}
                <View style={styles.dateCol}>
                  <Text style={styles.dateSubLabel}>Hari</Text>
                  <Input
                    placeholder="15"
                    value={birthDay}
                    onChangeText={handleDayChange}
                    keyboardType="number-pad"
                    maxLength={2}
                    containerStyle={styles.dateInputContainer}
                    inputWrapperStyle={styles.dateInputWrapper}
                  />
                </View>

                {/* Bulan */}
                <View style={styles.dateCol}>
                  <Text style={styles.dateSubLabel}>Bulan</Text>
                  <Input
                    placeholder="7"
                    value={birthMonth}
                    onChangeText={handleMonthChange}
                    keyboardType="number-pad"
                    maxLength={2}
                    containerStyle={styles.dateInputContainer}
                    inputWrapperStyle={styles.dateInputWrapper}
                  />
                </View>

                {/* Tahun */}
                <View style={[styles.dateCol, { flex: 1.4 }]}>
                  <Text style={styles.dateSubLabel}>Tahun</Text>
                  <Input
                    placeholder="2008"
                    value={birthYear}
                    onChangeText={handleYearChange}
                    keyboardType="number-pad"
                    maxLength={4}
                    containerStyle={styles.dateInputContainer}
                    inputWrapperStyle={styles.dateInputWrapper}
                  />
                </View>
              </View>

              {/* Age Guideline Helper Text */}
              <Text style={styles.dateHelperText}>
                Layanan Teman Sebaya ditujukan untuk pengguna usia minimal 10 tahun.
              </Text>

              {/* Privacy Notice per Brief */}
              <Text style={styles.privacyBriefNote}>
                Data tanggal lahir hanya digunakan semata-mata untuk menentukan mekanisme
                perlindungan privasi usia dan tidak pernah dibagikan kepada pihak ketiga.
              </Text>

              {/* Explicit Consent Checkbox */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setAgeConsentAgreed(!ageConsentAgreed);
                  if (step1Error) setStep1Error('');
                }}
                style={styles.consentCheckboxRow}
              >
                {ageConsentAgreed ? (
                  <CheckSquare size={18} color={colors.brandBlue[600]} style={{ marginTop: 2 }} />
                ) : (
                  <Square
                    size={18}
                    color={step1Error ? colors.crisis.dangerBorder : colors.borderMedium}
                    style={{ marginTop: 2 }}
                  />
                )}
                <Text style={styles.consentCheckboxLabel}>
                  Saya memahami dan menyetujui prinsip perlindungan ruang aman Teman Sebaya.
                </Text>
              </TouchableOpacity>
              {step1Error ? <Text style={styles.errorText}>{step1Error}</Text> : null}

              {/* Button */}
              <Button
                title="Lanjutkan"
                variant="primary"
                fullWidth
                size="lg"
                onPress={handleProceedFromAge}
                style={styles.continueBtn}
              />
            </View>
          </Animated.View>
        )}

        {/* ========================================================
            STEP 2: PROFILE SETUP (Screen A07 BRIEF TEMAN SEBAYA)
        ======================================================== */}
        {step === 2 && (
          <Animated.View style={[styles.stepContainer, { opacity: contentFade }]}>
            {/* Mascot & Speech Bubble */}
            <View style={styles.mascotDialogRow}>
              <View style={styles.dialogMascotWrap}>
                <Image
                  source={getMascotSource()}
                  style={styles.dialogMascotImage}
                  resizeMode="contain"
                />
              </View>

              <Animated.View
                style={[
                  styles.speechBubble,
                  {
                    transform: [{ scale: bubbleScale }],
                    opacity: bubbleOpacity,
                  },
                ]}
              >
                <View style={styles.speechTail} />
                <Text style={styles.speechText}>
                  Keren! Terus, bagaimana kami bisa memanggilmu? 😊
                </Text>
              </Animated.View>
            </View>

            {/* Profile Setup Form */}
            <View style={styles.formCard}>
              {/* Nama Panggilan */}
              <Input
                label="Nama Panggilan"
                placeholder="Misal: Anya atau Thoriq"
                value={nickname}
                maxLength={25}
                onChangeText={(val) => {
                  setNickname(val);
                  if (step2Error) {
                    const validation = validateNickname(val);
                    if (validation.isValid) {
                      setStep2Error('');
                    }
                  }
                }}
                error={step2Error}
                helperText="Nama ini akan digunakan oleh Thoriq dan konselor untuk menyapamu."
                inputWrapperStyle={styles.roundedInputWrapper}
              />

              {/* Kota / Kabupaten (Dropdown Khusus Jawa Barat) */}
              <View style={styles.dropdownFieldContainer}>
                <Text style={styles.dropdownFieldLabel}>Kota / Kabupaten</Text>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => setShowCityPicker(true)}
                  style={[
                    styles.dropdownTrigger,
                    cityError ? styles.dropdownTriggerError : null,
                  ]}
                >
                  <View style={styles.dropdownTriggerLeft}>
                    <MapPin size={18} color={city ? colors.brandBlue[600] : colors.textMuted} />
                    <Text
                      style={[
                        styles.dropdownTriggerText,
                        !city && styles.dropdownTriggerPlaceholder,
                      ]}
                      numberOfLines={1}
                    >
                      {city || 'Pilih Kota / Kabupaten'}
                    </Text>
                  </View>
                  <ChevronDown size={18} color={colors.textMuted} />
                </TouchableOpacity>

                {cityError ? (
                  <Text style={styles.fieldErrorText}>{cityError}</Text>
                ) : (
                  <Text style={styles.fieldHelperText}>
                    Membantu merekomendasikan pos edukasi PIK-R dan faskes terdekat.
                  </Text>
                )}
              </View>

              {/* Minat Edukasi (Opsional) - Symmetrical 2-Column Grid */}
              <Text style={styles.fieldSectionLabel}>Topik yang Ingin Kamu Jelajahi</Text>
              <View style={styles.chipsGrid}>
                {interestOptions.map((topic) => {
                  const active = selectedInterests.includes(topic.title);
                  return (
                    <TouchableOpacity
                      key={topic.id}
                      activeOpacity={0.75}
                      onPress={() => toggleInterest(topic.title)}
                      style={[styles.topicCard, active && styles.topicCardActive]}
                    >
                      <Text
                        style={[styles.topicText, active && styles.topicTextActive]}
                        numberOfLines={1}
                      >
                        {topic.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Button */}
              <Button
                title="Lanjut ke Langkah Terakhir"
                variant="primary"
                fullWidth
                size="lg"
                onPress={handleProceedFromProfile}
                style={styles.continueBtnMargin}
              />
            </View>
          </Animated.View>
        )}

        {/* ========================================================
            STEP 3: FIRST MOOD CHECK-IN (BISA DI-SKIP)
        ======================================================== */}
        {step === 3 && (
          <Animated.View style={[styles.stepContainer, { opacity: contentFade }]}>
            {/* Mascot & Speech Bubble */}
            <View style={styles.mascotDialogRow}>
              <View style={styles.dialogMascotWrap}>
                <Image
                  source={getMascotSource()}
                  style={styles.dialogMascotImage}
                  resizeMode="contain"
                />
              </View>

              <Animated.View
                style={[
                  styles.speechBubble,
                  {
                    transform: [{ scale: bubbleScale }],
                    opacity: bubbleOpacity,
                  },
                ]}
              >
                <View style={styles.speechTail} />
                <Text style={styles.speechText}>
                  Salam kenal {nickname ? nickname.trim() : 'Teman'}! Btw, hari ini kabar hatimu lagi gimana nih? 😊
                </Text>
              </Animated.View>
            </View>

            {/* 4 Mood Cards Selection */}
            <View style={styles.formCard}>
              <Text style={styles.moodPromptSubtitle}>
                Pilih emosimu saat ini:
              </Text>

              <View style={styles.moodGrid}>
                {MOOD_OPTIONS.map((mood) => {
                  const isSelected = selectedMood === mood.type;
                  return (
                    <TouchableOpacity
                      key={mood.type}
                      activeOpacity={0.8}
                      onPress={() => setSelectedMood(mood.type)}
                      style={[
                        styles.moodCardOption,
                        {
                          backgroundColor: mood.solidBg,
                          borderColor: isSelected
                            ? mood.selectedBorderColor
                            : mood.borderColor,
                          borderWidth: isSelected ? 2.5 : 1.5,
                        },
                        isSelected && styles.moodCardOptionSelected,
                      ]}
                    >
                      {/* Indikator Pilihan (Selected State) */}
                      {isSelected && (
                        <View
                          style={[
                            styles.moodSelectedBadge,
                            { backgroundColor: mood.selectedBorderColor },
                          ]}
                        >
                          <Check size={11} color="#FFFFFF" strokeWidth={3} />
                        </View>
                      )}

                      <Image
                        source={mood.image}
                        style={styles.moodEmojiImage}
                        resizeMode="contain"
                      />
                      <Text
                        style={[
                          styles.moodCardTitle,
                          { color: mood.titleColor },
                        ]}
                        numberOfLines={1}
                      >
                        {mood.label}
                      </Text>
                      <Text
                        style={[
                          styles.moodCardHint,
                          { color: mood.hintColor },
                        ]}
                        numberOfLines={1}
                      >
                        {mood.hint}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Submit Button */}
              <Button
                title={selectedMood ? 'Selesai' : 'Mulai Sekarang'}
                variant="primary"
                fullWidth
                size="lg"
                onPress={() => handleFinishOnboarding(false)}
                style={styles.continueBtn}
              />

              {/* Skip Option Button */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => handleFinishOnboarding(true)}
                style={styles.skipButton}
              >
                <Text style={styles.skipButtonText}>Lewati untuk sekarang</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
      </ScrollView>

      {/* Modal Dropdown Pilihan Kota / Kabupaten Jawa Barat */}
      <Modal
        visible={showCityPicker}
        onClose={() => {
          setShowCityPicker(false);
          setCitySearchQuery('');
        }}
        contentStyle={styles.cityModalContent}
      >
        <View style={styles.cityModalContainer}>
          {/* Header */}
          <View style={styles.cityModalHeader}>
            <View>
              <Text style={styles.cityModalTitle}>Pilih Kota / Kabupaten</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowCityPicker(false);
                setCitySearchQuery('');
              }}
              style={styles.cityModalCloseBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <X size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          </View>

          {/* Search Box */}
          <View style={styles.citySearchBox}>
            <Search size={16} color={colors.textMuted} />
            <TextInput
              style={styles.citySearchInput}
              placeholder="Cari (misal: Karawang)..."
              placeholderTextColor={colors.textPlaceholder}
              value={citySearchQuery}
              onChangeText={setCitySearchQuery}
              autoCorrect={false}
            />
            {citySearchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setCitySearchQuery('')}>
                <X size={15} color={colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          {/* List of 27 Cities */}
          <ScrollView
            style={styles.cityListScroll}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            {filteredCities.length > 0 ? (
              filteredCities.map((cityName) => {
                const isSelected = city === cityName;
                return (
                  <TouchableOpacity
                    key={cityName}
                    activeOpacity={0.7}
                    onPress={() => handleSelectCity(cityName)}
                    style={[
                      styles.cityItemRow,
                      isSelected && styles.cityItemRowSelected,
                    ]}
                  >
                    <View style={styles.cityItemLeft}>
                      <MapPin
                        size={16}
                        color={isSelected ? colors.brandBlue[600] : colors.textMuted}
                      />
                      <Text
                        style={[
                          styles.cityItemText,
                          isSelected && styles.cityItemTextSelected,
                        ]}
                      >
                        {cityName}
                      </Text>
                    </View>
                    {isSelected && <Check size={18} color={colors.brandBlue[600]} />}
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.cityEmptyWrap}>
                <Text style={styles.cityEmptyText}>Kota/Kabupaten tidak ditemukan</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  scrollContentIntro: {
    paddingBottom: 0,
    flexGrow: 1,
  },

  /* Top Bar & Stepper */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 52 : 36,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  backBtn: {
    padding: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flex: 1,
    marginHorizontal: 16,
  },
  progressSegment: {
    flex: 1,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.borderMedium,
  },
  progressSegmentActive: {
    backgroundColor: colors.brandBlue[600],
  },
  stepText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  /* ==================== STEP 0: INTRO HERO STYLES ==================== */
  introContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 44 : 24,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    minHeight: Dimensions.get('window').height > 660 ? Dimensions.get('window').height - (Platform.OS === 'ios' ? 70 : 44) : 580,
  },
  introLogoSection: {
    alignItems: 'center',
    width: '100%',
    paddingTop: 4,
    marginBottom: 2,
    zIndex: 2,
  },
  introLogoImage: {
    width: 135,
    height: 74,
  },
  introTextSection: {
    alignItems: 'center',
    width: '100%',
    marginTop: -12,
    marginBottom: 20,
    zIndex: 2,
  },
  introHeading: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  introSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 320,
    paddingHorizontal: 8,
  },
  introMascotCenterArea: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 4,
    marginBottom: 4,
    minHeight: 250,
  },
  introAuraBackground: {
    position: 'absolute',
    width: 225,
    height: 225,
    borderRadius: 112.5,
    backgroundColor: '#DBEAFE',
    opacity: 0.5,
    top: 18,
    alignSelf: 'center',
  },
  playfulDecorHeart: {
    position: 'absolute',
    top: 8,
    right: 18,
    transform: [{ rotate: '14deg' }],
    zIndex: 3,
  },
  playfulDecorStarLeft: {
    position: 'absolute',
    top: 86,
    left: 6,
    transform: [{ rotate: '-12deg' }],
    zIndex: 3,
  },
  playfulDecorSparkleRight: {
    position: 'absolute',
    bottom: 40,
    right: 16,
    transform: [{ rotate: '8deg' }],
    zIndex: 3,
  },
  introMascotWrap: {
    width: 240,
    height: 260,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 2,
  },
  introMascotImage: {
    width: '100%',
    height: '100%',
  },
  introBottomSection: {
    width: '100%',
    paddingTop: 8,
    zIndex: 2,
  },
  introCtaBtn: {
    borderRadius: 24,
    height: 52,
    backgroundColor: colors.brandBlue[600],
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 5,
  },
  introCtaBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },

  /* ==================== STEPS 1-3 DIALOG & FORM ==================== */
  stepContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  mascotDialogRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  dialogMascotWrap: {
    width: 86,
    height: 116,
  },
  dialogMascotImage: {
    width: '100%',
    height: '100%',
  },
  speechBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    marginTop: 6,
  },
  speechTail: {
    position: 'absolute',
    left: -8,
    top: 24,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: '#FFFFFF',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
  },
  speechText: {
    fontSize: 13.5,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  /* Form Card */
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.borderLight,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  inputGroupLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  datePickerRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  dateCol: {
    flex: 1,
  },
  dateSubLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    marginBottom: 4,
  },
  dateInputContainer: {
    marginBottom: 0,
  },
  dateInputWrapper: {
    borderRadius: 16,
    height: 48,
    borderColor: colors.borderMedium,
    backgroundColor: '#F8FAFC',
  },
  roundedInputWrapper: {
    borderRadius: 18,
    height: 48,
    borderColor: colors.borderMedium,
    backgroundColor: '#F8FAFC',
  },

  dateHelperText: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 16,
    marginTop: -4,
  },
  privacyBriefNote: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.textMuted,
    marginBottom: 16,
  },

  /* Consent Checkbox */
  consentCheckboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 16,
  },
  consentCheckboxLabel: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  errorText: {
    fontSize: 11.5,
    color: colors.crisis.dangerText,
    marginTop: -8,
    marginBottom: 12,
  },

  fieldSectionLabel: {
    fontSize: 12.5,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 10,
    marginBottom: 8,
  },

  /* Topic Cards (2-Column Symmetrical Grid) */
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
    marginBottom: 16,
  },
  topicCard: {
    width: '48.5%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
  },
  topicCardActive: {
    backgroundColor: colors.brandBlue[50],
    borderColor: colors.brandBlue[600],
  },
  topicText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
    textAlign: 'center',
  },
  topicTextActive: {
    color: colors.brandBlue[700],
    fontWeight: '700',
  },

  /* Step 3: Mood Grid */
  moodPromptSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
    marginBottom: 16,
  },
  moodCardOption: {
    width: '48.5%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 20,
    position: 'relative',
  },
  moodCardOptionSelected: {
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  moodSelectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 3,
  },
  moodEmojiImage: {
    width: 48,
    height: 48,
    marginBottom: 6,
  },
  moodCardTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
    textAlign: 'center',
  },
  moodCardHint: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },

  /* Buttons */
  continueBtn: {
    borderRadius: 22,
    height: 50,
    backgroundColor: colors.brandBlue[600],
    marginTop: 6,
  },
  continueBtnMargin: {
    borderRadius: 22,
    height: 50,
    backgroundColor: colors.brandBlue[600],
    marginTop: spacing.md,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 6,
  },
  skipButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },

  /* Dropdown Field (City Picker) */
  dropdownFieldContainer: {
    marginBottom: spacing.sm,
    marginTop: spacing.xs,
  },
  dropdownFieldLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  dropdownTrigger: {
    height: 48,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.borderMedium,
    backgroundColor: '#F8FAFC',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  dropdownTriggerError: {
    borderColor: colors.crisis.dangerBorder,
  },
  dropdownTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    marginRight: 8,
  },
  dropdownTriggerText: {
    fontSize: 13.5,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  dropdownTriggerPlaceholder: {
    color: colors.textPlaceholder,
    fontWeight: '400',
  },
  fieldHelperText: {
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 16,
  },
  fieldErrorText: {
    fontSize: 11.5,
    color: colors.crisis.dangerText,
    marginTop: 4,
  },

  /* City Picker Modal */
  cityModalContent: {
    padding: 20,
    borderRadius: 24,
    maxHeight: '85%',
  },
  cityModalContainer: {
    width: '100%',
  },
  cityModalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cityModalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cityModalSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  cityModalCloseBtn: {
    padding: 4,
  },
  citySearchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 42,
    gap: 8,
    marginBottom: 12,
  },
  citySearchInput: {
    flex: 1,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  cityListScroll: {
    maxHeight: 280,
  },
  cityItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 4,
  },
  cityItemRowSelected: {
    backgroundColor: colors.brandBlue[50],
  },
  cityItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  cityItemText: {
    fontSize: 13.5,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  cityItemTextSelected: {
    color: colors.brandBlue[700],
    fontWeight: '700',
  },
  cityEmptyWrap: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  cityEmptyText: {
    fontSize: 12.5,
    color: colors.textMuted,
  },
});
