import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, Platform } from 'react-native';
import { Bookmark, CheckCircle2 } from 'lucide-react-native';
import { borderRadius } from '../../theme';

interface FloatingToastProps {
  message: string | null;
  onDismiss?: () => void;
  icon?: 'bookmark' | 'check';
  bottomOffset?: number;
}

export const FloatingToast: React.FC<FloatingToastProps> = ({
  message,
  onDismiss,
  icon = 'bookmark',
  bottomOffset = 96,
}) => {
  const isNativeDriver = Platform.OS !== 'web';
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (message) {
      // Animate in
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: isNativeDriver,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: isNativeDriver,
        }),
      ]).start();

      const timer = setTimeout(() => {
        // Animate out
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 220,
            easing: Easing.in(Easing.ease),
            useNativeDriver: isNativeDriver,
          }),
          Animated.timing(translateY, {
            toValue: 15,
            duration: 220,
            useNativeDriver: isNativeDriver,
          }),
        ]).start(() => {
          if (onDismiss) onDismiss();
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <View
      style={[styles.overlay, { bottom: bottomOffset }]}
      pointerEvents="none"
    >
      <Animated.View
        style={[
          styles.toastCard,
          {
            opacity,
            transform: [{ translateY }],
          },
        ]}
      >
        {icon === 'bookmark' ? (
          <Bookmark size={15} color="#93C5FD" fill="#93C5FD" />
        ) : (
          <CheckCircle2 size={15} color="#86EFAC" />
        )}
        <Text style={styles.toastText}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 99999,
    elevation: 99999,
  },
  toastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0F172A',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: borderRadius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#334155',
  },
  toastText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

