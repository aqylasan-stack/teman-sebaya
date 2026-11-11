import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, G, Line } from 'react-native-svg';

interface GameplayPatternProps {
  opacity?: number;
}

/**
 * 1. BUTTERFLY EFFECT PATTERN (Category: 'karakter')
 * Themes: Pilihan, percabangan, konsekuensi, kupu-kupu, kompas, riak sebab-akibat
 */
export const ButterflyEffectPattern: React.FC<GameplayPatternProps> = ({
  opacity = 0.18,
}) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <G
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={opacity}
        >
          {/* Main Butterfly Silhouette (Top Right) */}
          <Path d="M 330 50 C 342 32 365 32 370 48 C 374 62 355 72 334 62" />
          <Path d="M 330 50 C 318 32 295 32 290 48 C 286 62 305 72 326 62" />
          <Path d="M 330 62 C 340 70 355 82 350 95 C 345 106 332 98 330 76" />
          <Path d="M 330 62 C 320 70 305 82 310 95 C 315 106 328 98 330 76" />
          <Line x1="330" y1="42" x2="330" y2="76" strokeWidth="2.0" />
          <Path d="M 328 42 Q 324 34 318 32" />
          <Path d="M 332 42 Q 336 34 342 32" />

          {/* Smaller Fluttering Butterfly (Top Left) */}
          <Path d="M 45 60 C 52 48 66 48 70 58 C 72 66 60 74 46 66" />
          <Path d="M 45 60 C 38 48 24 48 20 58 C 18 66 30 74 44 66" />
          <Line x1="45" y1="54" x2="45" y2="72" />

          {/* Branching Decision Path (Persimpangan Pilihan) */}
          <Path d="M 195 24 V 50 L 165 80 M 195 50 L 225 80" />
          <Circle cx="165" cy="80" r="3.5" fill="#FFFFFF" />
          <Circle cx="225" cy="80" r="3.5" fill="#FFFFFF" />
          <Circle cx="195" cy="24" r="3.5" fill="#FFFFFF" />

          {/* Ripple Effect (Riak Sebab-Akibat / Concentric Rings) */}
          <Circle cx="250" cy="140" r="14" strokeDasharray="3 3" />
          <Circle cx="250" cy="140" r="26" strokeDasharray="4 4" />
          <Circle cx="250" cy="140" r="40" strokeDasharray="5 5" />
          <Circle cx="250" cy="140" r="2.5" fill="#FFFFFF" />

          {/* Compass Rose (Arah Moral / Pertimbangan Hidup) */}
          <Circle cx="65" cy="160" r="16" />
          <Line x1="65" y1="138" x2="65" y2="182" />
          <Line x1="43" y1="160" x2="87" y2="160" />
          <Path d="M 65 144 L 69 160 L 65 176 L 61 160 Z" />

          {/* Sparkles of Curiosity */}
          <Path d="M 120 38 L 123 44 L 129 47 L 123 50 L 120 56 L 117 50 L 111 47 L 117 44 Z" />
          <Path d="M 285 22 L 287 26 L 291 28 L 287 30 L 285 34 L 283 30 L 279 28 L 283 26 Z" />
          <Path d="M 130 135 L 132 138 L 135 139 L 132 140 L 130 143 L 128 140 L 125 139 L 128 138 Z" />
          <Path d="M 360 170 L 362 174 L 366 176 L 362 178 L 360 182 L 358 178 L 354 176 L 358 174 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 2. NAME THAT FEELING PATTERN (Category: 'resiliensi')
 * Themes: Ekspresi, emosi, interaksi sosial, spektrum wajah, detak hati, cermin diri
 */
export const NameThatFeelingPattern: React.FC<GameplayPatternProps> = ({
  opacity = 0.18,
}) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <G
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={opacity}
        >
          {/* Happy Face (Top Right) */}
          <Circle cx="330" cy="55" r="18" />
          <Circle cx="324" cy="51" r="1.8" fill="#FFFFFF" />
          <Circle cx="336" cy="51" r="1.8" fill="#FFFFFF" />
          <Path d="M 323 58 Q 330 66 337 58" />

          {/* Surprised / Wondering Face (Top Left) */}
          <Circle cx="55" cy="65" r="16" />
          <Circle cx="50" cy="60" r="1.8" fill="#FFFFFF" />
          <Circle cx="60" cy="60" r="1.8" fill="#FFFFFF" />
          <Circle cx="55" cy="70" r="3.5" />

          {/* Calm / Peaceful Face (Bottom Right) */}
          <Circle cx="340" cy="160" r="16" />
          <Path d="M 333 158 Q 336 155 339 158" />
          <Path d="M 341 158 Q 344 155 347 158" />
          <Path d="M 336 166 Q 340 169 344 166" />

          {/* Heartbeat Pulse Line (Denyut Emosi) */}
          <Path d="M 120 50 H 145 L 152 35 L 160 65 L 168 42 L 175 50 H 200" />

          {/* Empathy Heart */}
          <Path d="M 270 35 C 270 28 262 22 254 28 C 244 37 254 50 270 60 C 286 50 296 37 286 28 C 278 22 270 28 270 35 Z" />

          {/* Emotional Weather: Cloud & Sun */}
          <Path d="M 70 145 A 10 10 0 0 1 88 138 A 14 14 0 0 1 110 144 A 8 8 0 0 1 114 152 L 70 152 Z" />
          <Circle cx="120" cy="132" r="8" />
          <Line x1="120" y1="120" x2="120" y2="116" />
          <Line x1="132" y1="126" x2="135" y2="123" />
          <Line x1="134" y1="138" x2="138" y2="140" />

          {/* Rainbow Arc (Spektrum Perasaan) */}
          <Path d="M 180 165 A 35 35 0 0 1 250 165" strokeDasharray="3 3" />
          <Path d="M 188 165 A 27 27 0 0 1 242 165" />
          <Path d="M 196 165 A 19 19 0 0 1 234 165" strokeDasharray="2 2" />

          {/* Sparkles */}
          <Path d="M 230 35 L 232 39 L 236 41 L 232 43 L 230 47 L 228 43 L 224 41 L 228 39 Z" />
          <Path d="M 28 120 L 30 124 L 34 126 L 30 128 L 28 132 L 26 128 L 22 126 L 26 124 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 3. DIGITAL DILEMMA PATTERN (Category: 'relasi')
 * Themes: Teknologi, komunikasi digital, media sosial, smartphone, wifi, notifikasi, keamanan privasi
 */
export const DigitalDilemmaPattern: React.FC<GameplayPatternProps> = ({
  opacity = 0.18,
}) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <G
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={opacity}
        >
          {/* Smartphone Outline (Top Right) */}
          <Rect x="305" y="30" width="34" height="60" rx="8" />
          <Line x1="316" y1="36" x2="328" y2="36" />
          <Circle cx="322" cy="82" r="2.5" />
          {/* Inner chat bubble on screen */}
          <Rect x="312" y="44" width="18" height="10" rx="3" />
          <Rect x="314" y="58" width="18" height="10" rx="3" />

          {/* Wi-Fi Waves (Top Center) */}
          <Path d="M 180 42 A 18 18 0 0 1 210 42" />
          <Path d="M 186 48 A 10 10 0 0 1 204 48" />
          <Circle cx="195" cy="54" r="2" fill="#FFFFFF" />

          {/* Notification Bell with Badge (Top Left) */}
          <Path d="M 50 48 C 50 42 54 38 60 38 C 66 38 70 42 70 48 V 56 L 74 60 H 46 L 50 56 Z" />
          <Circle cx="60" cy="65" r="2.5" />
          <Circle cx="69" cy="38" r="3" fill="#FFFFFF" />

          {/* Social Media Heart / Like Bubble */}
          <Path d="M 105 50 H 130 A 6 6 0 0 1 136 56 V 68 A 6 6 0 0 1 130 74 H 115 L 108 80 V 74 H 105 A 6 6 0 0 1 99 68 V 56 A 6 6 0 0 1 105 50 Z" />
          <Path d="M 117 59 C 117 57 114 55 112 57 C 109 60 113 65 117 68 C 121 65 125 60 122 57 C 120 55 117 57 117 59 Z" />

          {/* Privacy Lock (Batasan Sehat Medsos) */}
          <Rect x="48" y="145" width="26" height="20" rx="4" />
          <Path d="M 54 145 V 137 A 7 7 0 0 1 68 137 V 145" />
          <Circle cx="61" cy="154" r="2" fill="#FFFFFF" />
          <Line x1="61" y1="156" x2="61" y2="160" />

          {/* Network Node Connections */}
          <Circle cx="310" cy="150" r="4" fill="#FFFFFF" />
          <Circle cx="350" cy="135" r="4" />
          <Circle cx="345" cy="170" r="4" fill="#FFFFFF" />
          <Line x1="314" y1="149" x2="346" y2="137" />
          <Line x1="314" y1="151" x2="341" y2="168" />
          <Line x1="350" y1="139" x2="346" y2="166" />

          {/* Digital Sparkles */}
          <Path d="M 255 35 L 257 39 L 261 41 L 257 43 L 255 47 L 253 43 L 249 41 L 253 39 Z" />
          <Path d="M 155 145 L 157 149 L 161 151 L 157 153 L 155 157 L 153 153 L 149 151 L 153 149 Z" />
        </G>
      </Svg>
    </View>
  );
};

