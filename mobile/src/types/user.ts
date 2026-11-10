export interface UserProfile {
  id: string;
  name: string;
  nickname?: string;
  birthDate?: string;
  age?: number;
  ageCategory?: 'teen' | 'young_adult' | 'adult';
  city?: string;
  pseudonym: string;
  email: string;
  avatarInitials: string;
  joinedDate: string;
  isAnonymous: boolean;
  schoolOrOrg: string;
  interests: string[];
  activeStreakDays: number;
  moodEntriesCount: number;
  challengesCompleted: number;
  allowAiMoodAccess: boolean;
  dailyReminderEnabled: boolean;
  dailyReminderTime: string;
  initialEmotion?: string;
  isOnboarded?: boolean;
  provider?: 'email' | 'google';
  avatarUrl?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token?: string;
}

