import React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export interface FeatureIconProps {
  size?: number;
  color?: string; // Icon fill color (defaults to #FFFFFF)
  accentColor?: string; // Feature primary accent for inner cutouts/details
}

/**
 * 1. Teman Mood: Filled smiley face with crisp smiling facial features
 */
export const FilledMoodIcon: React.FC<FeatureIconProps> = ({
  size = 22,
  color = '#FFFFFF',
  accentColor = '#059669',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Solid face circle */}
      <Circle cx="12" cy="12" r="9.5" fill={color} />
      {/* Eyes */}
      <Circle cx="9" cy="10" r="1.3" fill={accentColor} />
      <Circle cx="15" cy="10" r="1.3" fill={accentColor} />
      {/* Gentle smile */}
      <Path
        d="M8.5 14.2c.9 1.8 2.1 2.6 3.5 2.6s2.6-.8 3.5-2.6"
        stroke={accentColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
};

/**
 * 2. Teman Cerita: Filled chat bubble with conversation dots
 */
export const FilledCeritaIcon: React.FC<FeatureIconProps> = ({
  size = 22,
  color = '#FFFFFF',
  accentColor = '#2563EB',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Solid speech bubble */}
      <Path
        d="M12 3.5C6.75 3.5 2.5 7.15 2.5 11.65c0 2.55 1.4 4.82 3.58 6.28-.2 1.4-.84 2.8-1.84 3.65 2.07.08 4.07-.76 5.48-1.86.76.18 1.55.28 2.28.28 5.25 0 9.5-3.65 9.5-8.15S17.25 3.5 12 3.5z"
        fill={color}
      />
      {/* 3 Message dots */}
      <Circle cx="8" cy="11.5" r="1.3" fill={accentColor} />
      <Circle cx="12" cy="11.5" r="1.3" fill={accentColor} />
      <Circle cx="16" cy="11.5" r="1.3" fill={accentColor} />
    </Svg>
  );
};

/**
 * 3. Teman Belajar: Filled open book with page line details
 */
export const FilledBelajarIcon: React.FC<FeatureIconProps> = ({
  size = 22,
  color = '#FFFFFF',
  accentColor = '#D97706',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Left page */}
      <Path
        d="M3.5 5.5C3.5 4.67 4.17 4 5 4h6v15H5c-.83 0-1.5-.67-1.5-1.5V5.5z"
        fill={color}
      />
      {/* Right page */}
      <Path
        d="M13 4h6c.83 0 1.5.67 1.5 1.5V17.5c0 .83-.67 1.5-1.5 1.5h-6V4z"
        fill={color}
      />
      {/* Left page lines */}
      <Path
        d="M5.5 7.5H9.5M5.5 11H9.5M5.5 14.5H9.5"
        stroke={accentColor}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* Right page lines */}
      <Path
        d="M14.5 7.5H18.5M14.5 11H18.5M14.5 14.5H18.5"
        stroke={accentColor}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

/**
 * 4. Teman Bermain: Filled gamepad with D-pad & action buttons
 */
export const FilledBermainIcon: React.FC<FeatureIconProps> = ({
  size = 22,
  color = '#FFFFFF',
  accentColor = '#7C3AED',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Solid Gamepad body */}
      <Path
        d="M17.5 6H6.5A4.5 4.5 0 0 0 2 10.5c0 1.7.7 5.7 1.2 7.2.3.9 1.1 1.5 2.1 1.3 1.1-.2 2.1-1.3 2.7-2h8c.6.7 1.6 1.8 2.7 2 1 .2 1.8-.4 2.1-1.3.5-1.5 1.2-5.5 1.2-7.2A4.5 4.5 0 0 0 17.5 6z"
        fill={color}
      />
      {/* D-pad cross */}
      <Path
        d="M6 12h4M8 10v4"
        stroke={accentColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Action buttons */}
      <Circle cx="15.5" cy="10.8" r="1.15" fill={accentColor} />
      <Circle cx="17.5" cy="12.8" r="1.15" fill={accentColor} />
    </Svg>
  );
};

/**
 * 5. Teman Supportif: Filled silhouettes of two people in community (Clean solid group)
 */
export const FilledSupportifIcon: React.FC<FeatureIconProps> = ({
  size = 22,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Left peer head & body */}
      <Circle cx="8" cy="8" r="3.2" fill={color} />
      <Path
        d="M8 13c-2.4 0-7 1.2-7 3.6V19h14v-2.4c0-2.4-4.6-3.6-7-3.6z"
        fill={color}
      />
      {/* Right companion peer head & body */}
      <Circle cx="16" cy="8" r="3.2" fill={color} />
      <Path
        d="M16 13c-.3 0-.64.02-1 .06 1.2.9 2 2.1 2 3.64V19h6v-2.4c0-2.4-4.6-3.6-7-3.6z"
        fill={color}
      />
    </Svg>
  );
};

/**
 * 6. Teman Akses: Filled digital sparkles / stars
 */
export const FilledAksesIcon: React.FC<FeatureIconProps> = ({
  size = 22,
  color = '#FFFFFF',
}) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Main 4-point sparkle */}
      <Path
        d="M12 2l2.3 6.7L21 11l-6.7 2.3L12 20l-2.3-6.7L3 11l6.7-2.3L12 2z"
        fill={color}
      />
      {/* Small top-right accent star */}
      <Path
        d="M19 2l.9 2.1L22 5l-2.1.9L19 8l-.9-2.1L16 5l2.1-.9L19 2z"
        fill={color}
      />
    </Svg>
  );
};

