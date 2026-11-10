import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useApp } from '../../state/AppContext';

const { width, height } = Dimensions.get('window');

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const isNativeDriver = Platform.OS !== 'web';
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animation values for smooth slide transitions
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Real onboarding illustration assets tailored to Teman Sebaya
  const slides = [
    {
      id: 'mood',
      title: 'Kenali Dirimu',
      subtitle:
        'Luangkan waktu sejenak untuk memahami apa yang sedang kamu rasakan hari ini.',
      themeColor: '#F97316', // Warm Coral from Teman Sebaya Logo
      skyColor: '#FBDABC',
      image: require('../../../assets/onboarding/onboarding_mood.jpg'),
    },
    {
      id: 'cerita',
      title: 'Temukan Ruang Ceritamu',
      subtitle:
        'Konselor sebaya dan tenaga profesional siap mendengarkan tanpa menghakimi.',
      themeColor: '#2563EB', // Primary Brand Blue from Teman Sebaya Logo
      skyColor: '#C2DDFB',
      image: require('../../../assets/onboarding/onboarding_counseling.jpg'),
    },
    {
      id: 'belajar',
      title: 'Belajar dan Bertumbuh',
      subtitle:
        'Kumpulan artikel psikoedukasi, simulasi interaktif, dan komunitas remaja positif.',
      themeColor: '#059669', // Secondary Brand Green from Teman Sebaya Logo
      skyColor: '#D0F1DE',
      image: require('../../../assets/onboarding/onboarding_growth.jpg'),
    },
  ];

  const animateSlideChange = (nextIndex: number) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 140,
        useNativeDriver: isNativeDriver,
      }),
      Animated.timing(slideAnim, {
        toValue: 8,
        duration: 140,
        useNativeDriver: isNativeDriver,
      }),
    ]).start(() => {
      setCurrentSlide(nextIndex);
      slideAnim.setValue(-8);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: isNativeDriver,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: isNativeDriver,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      animateSlideChange(currentSlide + 1);
    } else {
      navigateTo('login');
    }
  };

  const handleSkip = () => {
    navigateTo('login');
  };

  const handleGoToSlide = (idx: number) => {
    if (idx !== currentSlide) {
      animateSlideChange(idx);
    }
  };

  const current = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  // Shallow horizontal elliptical curve matching reference screen:
  // Both left & right edges are higher up (y=0).
  // The center curves down smoothly into a shallow, wide U-shape (y ≈ 34px).
  const curveHeight = 44;
  const ellipticalCurvePath = `
    M 0,0
    C ${width * 0.26},46 
      ${width * 0.74},46 
      ${width},0
    L ${width},${curveHeight}
    L 0,${curveHeight}
    Z
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* 1. TOP ILLUSTRATIVE SECTION (~53% Screen Height with Custom Artwork) */}
      <View style={[styles.topArea, { backgroundColor: current.skyColor }]}>
        {/* Sleek 'Lewati' (Skip) Button at Top Right with glassmorphism backing */}
        <View style={styles.topBar}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSkip}
            style={styles.skipBtn}
            hitSlop={{ top: 12, bottom: 12, left: 16, right: 16 }}
            accessibilityLabel="Lewati pengenalan"
          >
            <Text style={styles.skipText}>Lewati</Text>
          </TouchableOpacity>
        </View>

        {/* Real Storybook Illustration Artwork (No abstract floating bubbles) */}
        <Animated.View
          style={[
            styles.illustrationWrapper,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Image
            source={current.image}
            style={styles.illustrationImage}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Shallow Horizontal Elliptical Curve Boundary to Bottom Canvas */}
        <View style={styles.waveContainer}>
          <Svg
            width={width}
            height={curveHeight}
            viewBox={`0 0 ${width} ${curveHeight}`}
            style={styles.waveSvg}
          >
            <Path d={ellipticalCurvePath} fill="#FFFFFF" />
          </Svg>
        </View>
      </View>

      {/* 2. BOTTOM CARD & ACTION AREA (Text lowered with generous top breathing room) */}
      <View style={styles.bottomArea}>
        {/* Title & Subtitle (Positioned comfortably in lower card) */}
        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={styles.titleText}>{current.title}</Text>
          <Text style={styles.subtitleText}>{current.subtitle}</Text>
        </Animated.View>

        {/* Interactive Controls (Pill & Dots Indicator + Chunky Pill CTA) */}
        <View style={styles.actionContainer}>
          {/* Elongated Pill & Rounded Dots Indicator */}
          <View style={styles.indicatorRow}>
            {slides.map((_, idx) => {
              const isActive = currentSlide === idx;
              return (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.7}
                  onPress={() => handleGoToSlide(idx)}
                  hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
                  style={[
                    styles.indicatorItem,
                    isActive
                      ? [styles.indicatorActive, { backgroundColor: current.themeColor }]
                      : styles.indicatorInactive,
                  ]}
                  accessibilityLabel={`Menuju slide ${idx + 1}`}
                />
              );
            })}
          </View>

          {/* Large Rounded Pill CTA Button */}
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={handleNext}
            style={[
              styles.continueButton,
              {
                backgroundColor: current.themeColor,
                shadowColor: current.themeColor,
              },
            ]}
            accessibilityRole="button"
            accessibilityLabel={isLast ? 'Mulai Sekarang' : 'Lanjutkan'}
          >
            <Text style={styles.continueButtonText}>
              {isLast ? 'Mulai Sekarang' : 'Lanjutkan'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  /* Top Section (~53% height + 18px vertical shift) */
  topArea: {
    width: width,
    height: Math.round(height * 0.53) + 18, // Geser ilustrasi beserta lengkungan bawahnya 18px ke bawah
    position: 'relative',
    overflow: 'hidden',
  },
  topBar: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderRadius: 16,
    paddingHorizontal: 4,
    paddingVertical: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  skipBtn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
    letterSpacing: 0.1,
  },

  /* Storybook Illustration Image Artwork */
  illustrationWrapper: {
    width: '100%',
    height: '100%',
    marginTop: 24, // Geser objek ilustrasi sedikit ke bawah mengikuti komposisi baru
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },

  /* Shallow Elliptical Curve Divider (Bentuk Elips Horizontal Dipertahankan) */
  waveContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 44,
  },
  waveSvg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },

  /* Bottom Content & Navigation Section */
  bottomArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 42, // Menyesuaikan posisi teks mengikuti posisi baru ilustrasi
    paddingBottom: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 8,
    marginTop: 10, // Spacing seimbang antara lengkungan kurva elips dan heading
  },
  titleText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
    letterSpacing: -0.2,
  },
  subtitleText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
    textAlign: 'center',
    maxWidth: 310,
  },

  /* Actions Area */
  actionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 22,
  },
  indicatorItem: {
    height: 6,
    borderRadius: 3,
  },
  indicatorActive: {
    width: 32, // Elongated rounded pill from reference
  },
  indicatorInactive: {
    width: 12, // Rounded short dot from reference
    backgroundColor: '#CBD5E1',
  },

  /* Button */
  continueButton: {
    width: '100%',
    height: 52,
    borderRadius: 26, // Full rounded pill shape from reference
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 8,
    elevation: 4,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.2,
  },
});
