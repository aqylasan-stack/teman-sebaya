export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'counselor';
  senderName: string;
  text: string;
  timestamp: string;
  isBreathingPrompt?: boolean;
  isCrisisNotice?: boolean;
  recommendedArticleId?: string;
  recommendedArticleTitle?: string;
}

export interface CounselorReview {
  id: string;
  clientInitials: string;
  tier: string;
  verdict: string;
  date: string;
  comment: string;
}

export interface Counselor {
  id: string;
  name: string;
  role: 'Konselor Sebaya PIK-R' | 'Psikolog Klinis Mitra' | string;
  institution: string; // e.g. "PIK-R Garuda Muda Karawang" | "Klinik Remaja Mitra"
  rating: number;
  reviewCount: number;
  tags: string[]; // e.g. "Stres Belajar", "Pertemanan", "Literasi Emosi"
  about: string;
  isAvailableToday: boolean;
  availableSlots: string[];
  initials?: string;
  experience?: string;
  totalSessions?: number;
  positiveRatingPct?: number;
  hasVideoCall?: boolean;
  reviews?: CounselorReview[];
  availableDays?: string[];
  availableTimeSlots?: {
    morning?: boolean;
    afternoon?: boolean;
    evening?: boolean;
  };
}

export interface BookingSession {
  id: string;
  counselorId: string;
  counselorName: string;
  counselorRole: string;
  date: string;
  timeSlot: string;
  mode: 'Chat' | 'Audio' | 'Video';
  status: 'Menunggu' | 'Selesai' | 'Dibatalkan';
  notes?: string;
}

