import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { useApp } from '../../state/AppContext';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const isNativeDriver = Platform.OS !== 'web';

  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // 1. Energetic bounce entrance animation
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 350,
        easing: Easing.out(Easing.ease),
        useNativeDriver: isNativeDriver,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3.8, // Playful bounce with satisfying spring overshoot
        tension: 40,
        useNativeDriver: isNativeDriver,
      }),
    ]).start();

    // 2. Automatic transition after 2.2s display
    const timeout = setTimeout(() => {
      handleExit();
    }, 2200);

    return () => clearTimeout(timeout);
  }, [opacityAnim, scaleAnim]);

  const handleExit = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 280,
        easing: Easing.in(Easing.ease),
        useNativeDriver: isNativeDriver,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 280,
        easing: Easing.out(Easing.ease),
        useNativeDriver: isNativeDriver,
      }),
    ]).start(() => {
      navigateTo('onboarding');
    });
  };

  return (
    <TouchableWithoutFeedback onPress={handleExit}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={require('../../../assets/branding/logo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  logoImage: {
    width: 190,
    height: 190,
  },
});
