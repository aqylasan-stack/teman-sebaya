export interface UserProfile {
  id: string;
  name: string;
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
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token?: string;
}

