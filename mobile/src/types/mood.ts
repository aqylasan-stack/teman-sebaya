export type PrimaryEmotion =
  | 'Bahagia'
  | 'Sedih'
  | 'Marah'
  | 'Biasa Saja'
  | 'Tenang'
  | 'Lelah'
  | 'Cemas';

export interface MoodEntry {
  id: string;
  timestamp: string; // ISO or formatted date
  dateString: string; // e.g. "09 Nov 2026"
  timeString: string; // e.g. "08:30 WIB"
  primaryEmotion: PrimaryEmotion;
  secondaryEmotions: string[];
  note: string;
  contextTags: string[]; // e.g. "Sekolah", "Keluarga", "Teman", "Diri Sendiri", "Tidur"
  intensity: number; // 1 to 5
}

export interface MoodDayStat {
  dayName: string; // 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'
  primaryEmotion?: PrimaryEmotion;
  percentage: number;
}

