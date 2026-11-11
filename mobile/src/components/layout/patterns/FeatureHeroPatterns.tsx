import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect, G, Line } from 'react-native-svg';

interface PatternProps {
  opacity?: number;
}

/**
 * 1. MOOD PATTERN
 * Themes: Emotions, facial expressions, mental calm, clouds, sun, heart, gentle leaves
 */
export const MoodPattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Sun & rays on top right */}
          <Circle cx="320" cy="38" r="14" />
          <Line x1="320" y1="18" x2="320" y2="12" />
          <Line x1="320" y1="58" x2="320" y2="64" />
          <Line x1="300" y1="38" x2="294" y2="38" />
          <Line x1="340" y1="38" x2="346" y2="38" />
          <Line x1="306" y1="24" x2="302" y2="20" />
          <Line x1="334" y1="52" x2="338" y2="56" />

          {/* Happy smile face */}
          <Circle cx="280" cy="115" r="18" />
          <Circle cx="274" cy="111" r="1.8" fill="#FFFFFF" />
          <Circle cx="286" cy="111" r="1.8" fill="#FFFFFF" />
          <Path d="M 273 118 Q 280 126 287 118" />

          {/* Calm cloud */}
          <Path d="M 32 48 A 12 12 0 0 1 52 38 A 16 16 0 0 1 76 44 A 10 10 0 0 1 80 54 L 32 54 Z" />

          {/* Heart of self-compassion */}
          <Path d="M 345 165 C 345 160 338 155 332 160 C 324 167 332 178 345 186 C 358 178 366 167 358 160 C 352 155 345 160 345 165 Z" />

          {/* Sprout of emotional growth */}
          <Path d="M 220 38 Q 220 22 228 16" />
          <Path d="M 226 26 Q 235 24 233 16 Q 225 18 226 26 Z" />
          <Path d="M 222 30 Q 212 28 214 20 Q 222 22 222 30 Z" />

          {/* Peaceful wave arcs */}
          <Path d="M 170 185 Q 185 178 200 185 T 230 185" />
          <Path d="M 180 195 Q 195 188 210 195 T 240 195" />

          {/* Sparkles */}
          <Path d="M 145 28 L 148 34 L 154 37 L 148 40 L 145 46 L 142 40 L 136 37 L 142 34 Z" />
          <Path d="M 362 96 L 364 100 L 368 102 L 364 104 L 362 108 L 360 104 L 356 102 L 360 100 Z" />
          <Path d="M 40 140 L 42 144 L 46 146 L 42 148 L 40 152 L 38 148 L 34 146 L 38 144 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 2. CERITA PATTERN
 * Themes: Communication, speech bubbles, listening ear, handshake, safe support
 */
export const CeritaPattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Primary speech bubble */}
          <Path d="M 285 30 H 325 A 8 8 0 0 1 333 38 V 52 A 8 8 0 0 1 325 60 H 305 L 295 68 V 60 H 285 A 8 8 0 0 1 277 52 V 38 A 8 8 0 0 1 285 30 Z" />
          <Line x1="290" y1="42" x2="318" y2="42" />
          <Line x1="290" y1="48" x2="310" y2="48" />

          {/* Secondary response bubble */}
          <Path d="M 325 72 H 350 A 6 6 0 0 1 356 78 V 88 A 6 6 0 0 1 350 94 H 342 L 336 100 V 94 H 325 A 6 6 0 0 1 319 88 V 78 A 6 6 0 0 1 325 72 Z" />

          {/* Listening ear outline */}
          <Path d="M 265 125 A 14 14 0 0 1 279 139 C 279 152 268 156 268 164" />
          <Path d="M 268 135 A 6 6 0 0 1 274 141 C 274 146 270 148 268 150" />

          {/* Soundwave of voice counseling */}
          <Line x1="160" y1="38" x2="160" y2="46" />
          <Line x1="166" y1="34" x2="166" y2="50" />
          <Line x1="172" y1="30" x2="172" y2="54" />
          <Line x1="178" y1="35" x2="178" y2="49" />
          <Line x1="184" y1="39" x2="184" y2="45" />

          {/* Supportive interlocking hands motif */}
          <Path d="M 320 152 Q 330 142 342 148 L 350 156 Q 345 165 335 160 Z" />
          <Path d="M 335 160 Q 325 170 315 162 L 310 155 Q 316 148 324 153 Z" />

          {/* Confidential shield with heart */}
          <Path d="M 45 40 L 60 34 L 75 40 V 54 C 75 64 60 72 60 72 C 60 72 45 64 45 54 Z" />
          <Path d="M 60 46 C 60 44 57 42 55 44 C 52 46 55 50 60 54 C 65 50 68 46 65 44 C 63 42 60 44 60 46 Z" />

          {/* Sparkles */}
          <Path d="M 225 24 L 227 28 L 231 30 L 227 32 L 225 36 L 223 32 L 219 30 L 223 28 Z" />
          <Path d="M 368 115 L 370 119 L 374 121 L 370 123 L 368 127 L 366 123 L 362 121 L 366 119 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 3. BELAJAR PATTERN
 * Themes: Books, graduation cap (toga), pencil, lightbulb ideas, bookmark, reading
 */
export const BelajarPattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Graduation Cap (Toga) - Prominent motif from reference */}
          <Path d="M 315 28 L 348 40 L 315 52 L 282 40 Z" />
          <Path d="M 295 45 V 58 C 295 64 304 68 315 68 C 326 68 335 64 335 58 V 45" />
          <Path d="M 342 42 V 62 L 346 68" />

          {/* Open Book */}
          <Path d="M 285 146 Q 268 138 250 140 V 162 Q 268 160 285 168 Q 302 160 320 162 V 140 Q 302 138 285 146 Z" />
          <Line x1="285" y1="146" x2="285" y2="168" />
          <Line x1="258" y1="147" x2="276" y2="149" />
          <Line x1="258" y1="153" x2="276" y2="155" />
          <Line x1="294" y1="149" x2="312" y2="147" />
          <Line x1="294" y1="155" x2="312" y2="153" />

          {/* Pencil */}
          <Path d="M 220 28 L 236 44 L 210 70 L 198 72 L 200 60 Z" />
          <Line x1="228" y1="36" x2="208" y2="56" />

          {/* Idea Lightbulb */}
          <Path d="M 345 96 A 11 11 0 1 1 355 96 C 354 100 351 103 351 107 H 349 C 349 103 346 100 345 96 Z" />
          <Line x1="348" y1="110" x2="352" y2="110" />
          <Line x1="349" y1="113" x2="351" y2="113" />
          {/* Light rays */}
          <Line x1="350" y1="78" x2="350" y2="82" />
          <Line x1="334" y1="88" x2="338" y2="90" />
          <Line x1="366" y1="88" x2="362" y2="90" />

          {/* Bookmark Ribbon */}
          <Path d="M 45 40 H 60 V 70 L 52.5 62 L 45 70 Z" />

          {/* Reading Glasses */}
          <Circle cx="175" cy="182" r="10" />
          <Circle cx="205" cy="182" r="10" />
          <Path d="M 185 182 Q 190 178 195 182" />
          <Line x1="165" y1="180" x2="158" y2="175" />
          <Line x1="215" y1="180" x2="222" y2="175" />

          {/* Sparkles */}
          <Path d="M 140 32 L 142 36 L 146 38 L 142 40 L 140 44 L 138 40 L 134 38 L 138 36 Z" />
          <Path d="M 370 145 L 372 148 L 375 149 L 372 150 L 370 153 L 368 150 L 365 149 L 368 148 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 4. BERMAIN PATTERN
 * Themes: Gamepad controller, puzzle piece, dice, stars, playful curiosity
 */
export const BermainPattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Game Controller */}
          <Path d="M 285 45 C 295 40 335 40 345 45 C 352 50 355 65 348 78 L 340 85 C 334 88 328 82 325 76 L 320 68 H 310 L 305 76 C 302 82 296 88 290 85 L 282 78 C 275 65 278 50 285 45 Z" />
          {/* D-Pad on controller */}
          <Line x1="292" y1="58" x2="300" y2="58" />
          <Line x1="296" y1="54" x2="296" y2="62" />
          {/* Action buttons on controller */}
          <Circle cx="330" cy="55" r="2" fill="#FFFFFF" />
          <Circle cx="336" cy="61" r="2" fill="#FFFFFF" />

          {/* Puzzle piece */}
          <Path d="M 320 135 H 332 C 332 131 336 128 340 128 C 344 128 348 131 348 135 H 360 V 147 C 364 147 367 151 367 155 C 367 159 364 163 360 163 V 175 H 348 C 348 171 344 168 340 168 C 336 168 332 171 332 175 H 320 V 163 H 324 C 328 163 331 159 331 155 C 331 151 328 147 324 147 H 320 Z" />

          {/* Pair of Dice */}
          <Rect x="245" y="125" width="22" height="22" rx="4" />
          <Circle cx="251" cy="131" r="1.5" fill="#FFFFFF" />
          <Circle cx="256" cy="136" r="1.5" fill="#FFFFFF" />
          <Circle cx="261" cy="141" r="1.5" fill="#FFFFFF" />

          {/* Achievement Trophy */}
          <Path d="M 45 42 H 65 V 54 C 65 60 60 64 55 64 C 50 64 45 60 45 54 Z" />
          <Path d="M 45 46 H 39 C 37 46 36 50 38 54 C 40 57 43 57 45 56" />
          <Path d="M 65 46 H 71 C 73 46 74 50 72 54 C 70 57 67 57 65 56" />
          <Line x1="55" y1="64" x2="55" y2="70" />
          <Line x1="48" y1="70" x2="62" y2="70" />

          {/* Dynamic Play/Arrow Motif */}
          <Path d="M 210 35 L 222 42 L 210 49 Z" />

          {/* Sparkles & Stars */}
          <Path d="M 145 30 L 148 35 L 153 37 L 148 39 L 145 44 L 142 39 L 137 37 L 142 35 Z" />
          <Path d="M 370 95 L 372 98 L 375 99 L 372 100 L 370 103 L 368 100 L 365 99 L 368 98 Z" />
          <Path d="M 185 175 L 187 178 L 190 179 L 187 180 L 185 183 L 183 180 L 180 179 L 183 178 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 5. SUPPORTIF PATTERN
 * Themes: Community group, friendship circle, megaphone voice, solidarity, unity
 */
export const SupportifPattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 220"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Group of 3 friends */}
          {/* Center figure */}
          <Circle cx="315" cy="38" r="9" />
          <Path d="M 302 58 C 302 51 308 47 315 47 C 322 47 328 51 328 58" />
          {/* Left figure */}
          <Circle cx="295" cy="42" r="7" />
          <Path d="M 284 59 C 284 53 289 50 295 50 C 298 50 301 51 303 53" />
          {/* Right figure */}
          <Circle cx="335" cy="42" r="7" />
          <Path d="M 327 53 C 329 51 332 50 335 50 C 341 50 346 53 346 59" />

          {/* Megaphone (Suara Aksi Remaja) */}
          <Path d="M 325 130 L 348 118 V 146 L 325 134 H 315 V 130 Z" />
          <Path d="M 321 134 V 142 L 317 141 V 134" />
          <Path d="M 354 125 A 8 8 0 0 1 354 139" />
          <Path d="M 360 120 A 15 15 0 0 1 360 144" />

          {/* Hand clasp / high five motif */}
          <Path d="M 255 135 L 265 125 L 275 132 L 265 142 Z" />
          <Line x1="262" y1="128" x2="268" y2="134" />

          {/* Community Heart Emblem */}
          <Path d="M 55 40 C 55 36 50 32 45 36 C 39 42 45 50 55 58 C 65 50 71 42 65 36 C 60 32 55 36 55 40 Z" />

          {/* Solidarity banner curve */}
          <Path d="M 180 35 Q 200 45 220 35" />
          <Path d="M 180 41 Q 200 51 220 41" />

          {/* Sparkles & Starbursts */}
          <Path d="M 140 30 L 143 35 L 148 37 L 143 39 L 140 44 L 137 39 L 132 37 L 137 35 Z" />
          <Path d="M 370 75 L 372 78 L 375 79 L 372 80 L 370 83 L 368 80 L 365 79 L 368 78 Z" />
          <Path d="M 210 180 L 212 184 L 216 185 L 212 186 L 210 190 L 208 186 L 204 185 L 208 184 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 6. PROFILE PATTERN
 * Themes: Personal identity, self-growth, sparkles of achievement, shield of safety, heart of self-compassion, award medal, gentle swirls
 */
export const ProfilePattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 240"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Identity ID card motif on top left */}
          <Rect x="30" y="28" width="34" height="26" rx="4" />
          <Circle cx="40" cy="38" r="4" />
          <Line x1="48" y1="36" x2="58" y2="36" />
          <Line x1="48" y1="42" x2="55" y2="42" />

          {/* Award Medal / Rosette on top right */}
          <Circle cx="335" cy="40" r="13" />
          <Circle cx="335" cy="40" r="8" />
          <Path d="M 330 52 L 326 68 L 335 63 L 344 68 L 340 52" />

          {/* Shield of Privacy / Keamanan Diri */}
          <Path d="M 42 120 V 132 C 42 140 48 146 55 149 C 62 146 68 140 68 132 V 120 L 55 116 Z" />
          <Path d="M 51 132 L 54 135 L 60 129" />

          {/* Self-love Heart */}
          <Path d="M 335 125 C 335 120 328 116 322 120 C 315 126 322 136 335 144 C 348 136 355 126 348 120 C 342 116 335 120 335 125 Z" />

          {/* Growth plant / Sprout */}
          <Path d="M 320 185 Q 320 170 328 164" />
          <Path d="M 326 174 Q 335 172 333 164 Q 325 166 326 174 Z" />
          <Path d="M 322 178 Q 312 176 314 168 Q 322 170 322 178 Z" />

          {/* Smiling expression badge */}
          <Circle cx="75" cy="185" r="14" />
          <Circle cx="70" cy="182" r="1.5" fill="#FFFFFF" />
          <Circle cx="80" cy="182" r="1.5" fill="#FFFFFF" />
          <Path d="M 70 188 Q 75 194 80 188" />

          {/* Gentle energy waves / arcs */}
          <Path d="M 175 25 Q 195 18 215 25" />
          <Path d="M 180 33 Q 195 26 210 33" />

          {/* Sparkles & Starbursts */}
          <Path d="M 130 35 L 133 40 L 138 42 L 133 44 L 130 49 L 127 44 L 122 42 L 127 40 Z" />
          <Path d="M 260 38 L 262 42 L 266 43 L 262 45 L 260 48 L 258 45 L 254 43 L 258 42 Z" />
          <Path d="M 365 85 L 367 88 L 370 89 L 367 90 L 365 93 L 363 90 L 360 89 L 363 88 Z" />
          <Path d="M 30 85 L 32 88 L 35 89 L 32 90 L 30 93 L 28 90 L 25 89 L 28 88 Z" />
          <Path d="M 195 170 L 197 173 L 200 174 L 197 175 L 195 178 L 193 175 L 190 174 L 193 173 Z" />
        </G>
      </Svg>
    </View>
  );
};

/**
 * 7. HOME HERO PATTERN
 * Themes: Welcoming companionship, empathy, smile face, speech bubble, sparkles, growth sprout, gentle waves
 */
export const HomePattern: React.FC<PatternProps> = ({ opacity = 0.16 }) => {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 390 320"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={opacity}>
          {/* Friendly sun & rays on top right */}
          <Circle cx="330" cy="36" r="13" />
          <Line x1="330" y1="17" x2="330" y2="11" />
          <Line x1="330" y1="55" x2="330" y2="61" />
          <Line x1="311" y1="36" x2="305" y2="36" />
          <Line x1="349" y1="36" x2="355" y2="36" />
          <Line x1="317" y1="23" x2="313" y2="19" />
          <Line x1="343" y1="49" x2="347" y2="53" />

          {/* Gentle companionship speech bubble on top middle */}
          <Path d="M 185 20 H 225 A 8 8 0 0 1 233 28 V 40 A 8 8 0 0 1 225 48 H 207 L 199 55 V 48 H 185 A 8 8 0 0 1 177 40 V 28 A 8 8 0 0 1 185 20 Z" />
          <Circle cx="195" cy="34" r="1.5" fill="#FFFFFF" />
          <Circle cx="205" cy="34" r="1.5" fill="#FFFFFF" />
          <Circle cx="215" cy="34" r="1.5" fill="#FFFFFF" />

          {/* Happy smile face badge */}
          <Circle cx="50" cy="110" r="16" />
          <Circle cx="44" cy="106" r="1.8" fill="#FFFFFF" />
          <Circle cx="56" cy="106" r="1.8" fill="#FFFFFF" />
          <Path d="M 44 113 Q 50 120 56 113" />

          {/* Emotional growth sprout */}
          <Path d="M 345 110 Q 345 94 353 88" />
          <Path d="M 351 98 Q 360 96 358 88 Q 350 90 351 98 Z" />
          <Path d="M 347 102 Q 337 100 339 92 Q 347 94 347 102 Z" />

          {/* Heart of empathy / self-care */}
          <Path d="M 335 180 C 335 174 327 169 320 174 C 311 182 320 193 335 202 C 350 193 359 182 350 174 C 343 169 335 174 335 180 Z" />

          {/* Gentle supportive wave curves */}
          <Path d="M 30 190 Q 55 178 80 190 T 130 190" />
          <Path d="M 45 202 Q 70 190 95 202 T 145 202" />

          {/* Sparkles / starbursts */}
          <Path d="M 140 28 L 143 34 L 149 37 L 143 40 L 140 46 L 137 40 L 131 37 L 137 34 Z" />
          <Path d="M 290 85 L 292 89 L 296 91 L 292 93 L 290 97 L 288 93 L 284 91 L 288 89 Z" />
          <Path d="M 365 240 L 367 244 L 371 246 L 367 248 L 365 252 L 363 248 L 359 246 L 363 244 Z" />
          <Path d="M 25 260 L 27 263 L 30 264 L 27 265 L 25 268 L 23 265 L 20 264 L 23 263 Z" />
          <Path d="M 180 140 L 182 143 L 185 144 L 182 145 L 180 148 L 178 145 L 175 144 L 178 143 Z" />
        </G>
      </Svg>
    </View>
  );
};

