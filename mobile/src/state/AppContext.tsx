import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  TabType,
  ScreenType,
  UserProfile,
  MoodEntry,
  MoodDayStat,
  ChatMessage,
  Counselor,
  BookingSession,
  Article,
  CommunityGroup,
  YouthEvent,
  PrimaryEmotion,
} from '../types';
import {
  initialUser,
  initialMoodEntries,
  weeklyMoodStats,
  counselorsList,
  initialBooking,
  educationalArticles,
  communityGroups as initialGroups,
  youthEvents,
} from '../data/seedData';

interface AppContextProps {
  // Navigation
  currentScreen: ScreenType;
  currentTab: TabType;
  screenParams: Record<string, any>;
  navigateTo: (screen: ScreenType, params?: Record<string, any>) => void;
  switchTab: (tab: TabType, params?: Record<string, any>) => void;
  goBack: () => void;

  // Auth & Profile
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (partial: Partial<UserProfile>) => void;

  // Mood
  moodEntries: MoodEntry[];
  todayMood: MoodEntry | null;
  dailyMoodStatus: 'completed' | 'skipped' | 'not_started';
  skipMoodCheckinToday: () => void;
  resetMoodCheckinToday: () => void;
  saveMood: (
    primaryEmotion: PrimaryEmotion,
    secondaryEmotions: string[],
    note: string,
    contextTags: string[]
  ) => void;
  weeklyStats: MoodDayStat[];

  // Story & Counseling
  chatMessages: ChatMessage[];
  sendAiMessage: (text: string) => void;
  counselors: Counselor[];
  bookings: BookingSession[];
  createBooking: (booking: Omit<BookingSession, 'id'>) => void;

  // Learning
  articles: Article[];
  toggleBookmark: (articleId: string) => void;

  // Community
  communityList: CommunityGroup[];
  toggleJoinCommunity: (groupId: string) => void;
  eventsList: YouthEvent[];

  // Modals
  isCrisisModalOpen: boolean;
  openCrisisModal: () => void;
  closeCrisisModal: () => void;

  isLogoutDialogOpen: boolean;
  openLogoutDialog: () => void;
  closeLogoutDialog: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Navigation state - starts at splash per PRD & User Flow
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [currentTab, setCurrentTab] = useState<TabType>('beranda');
  const [screenStack, setScreenStack] = useState<ScreenType[]>(['splash']);
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});

  // Auth & User starts unauthenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Mood
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(initialMoodEntries);
  const [weeklyStats, setWeeklyStats] = useState<MoodDayStat[]>(weeklyMoodStats);

  // Story & Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_001',
      sender: 'ai',
      senderName: 'Teman Akses',
      text: 'Halo, Teman! Terima kasih sudah mampir. Ruang ini adalah tempat aman untukmu bercerita atau meluapkan pikiran tanpa dihakimi. Apa yang sedang kamu rasakan hari ini?',
      timestamp: '08:30',
    },
  ]);
  const [counselors] = useState<Counselor[]>(counselorsList);
  const [bookings, setBookings] = useState<BookingSession[]>([initialBooking]);

  // Learning
  const [articles, setArticles] = useState<Article[]>(educationalArticles);

  // Community
  const [communityList, setCommunityList] = useState<CommunityGroup[]>(initialGroups);
  const [eventsList] = useState<YouthEvent[]>(youthEvents);

  // Modals
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  // Navigation handlers
  const navigateTo = (screen: ScreenType, params: Record<string, any> = {}) => {
    setScreenStack((prev) => [...prev, screen]);
    setScreenParams(params);
    setCurrentScreen(screen);
  };

  const switchTab = (tab: TabType, params?: Record<string, any>) => {
    setCurrentTab(tab);
    setCurrentScreen('main');
    setScreenStack(['main']);
    if (params) {
      setScreenParams(params);
    }
  };

  const goBack = () => {
    if (screenStack.length > 1) {
      const nextStack = [...screenStack];
      nextStack.pop();
      const prevScreen = nextStack[nextStack.length - 1];
      setScreenStack(nextStack);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('main');
    }
  };

  // Auth Actions
  const login = (email: string, _pass: string) => {
    setIsAuthenticated(true);
    setUser({
      ...initialUser,
      email: email || initialUser.email,
    });
    // Alur khusus pengguna yang berhasil login: Daily Mood Check-in 3 tahap
    setCurrentScreen('daily_mood_checkin');
    setCurrentTab('beranda');
    setScreenStack(['daily_mood_checkin']);
    return true;
  };

  const register = (name: string, email: string, _pass: string) => {
    setIsAuthenticated(true);
    setUser({
      ...initialUser,
      name: name || 'Teman Baru',
      pseudonym: `${name || 'Teman Baru'} (Anonim)`,
      email: email || 'teman@baru.id',
    });
    setCurrentScreen('thoriq_onboarding');
    setScreenStack(['thoriq_onboarding']);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsLogoutDialogOpen(false);
    setCurrentScreen('login');
    setScreenStack(['login']);
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...partial } : null));
  };

  // Mood State & Helpers
  const [moodCheckinSkippedDate, setMoodCheckinSkippedDate] = useState<string | null>(null);

  const isToday = (dateIsoOrStr: string): boolean => {
    try {
      const entryDate = new Date(dateIsoOrStr);
      const now = new Date();
      return (
        entryDate.getFullYear() === now.getFullYear() &&
        entryDate.getMonth() === now.getMonth() &&
        entryDate.getDate() === now.getDate()
      );
    } catch {
      return false;
    }
  };

  const getTodayDateKey = (): string => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  };

  // Actual today's mood entry based on user's local date
  const todayMood = moodEntries.find((entry) => isToday(entry.timestamp)) || null;

  const skipMoodCheckinToday = () => {
    setMoodCheckinSkippedDate(getTodayDateKey());
  };

  const resetMoodCheckinToday = () => {
    setMoodCheckinSkippedDate(null);
    setMoodEntries((prev) => prev.filter((entry) => !isToday(entry.timestamp)));
  };

  const isMoodCheckinSkippedToday =
    moodCheckinSkippedDate === getTodayDateKey() && !todayMood;

  // Mutual exclusive 3 states: 'completed' | 'skipped' | 'not_started'
  const dailyMoodStatus: 'completed' | 'skipped' | 'not_started' = todayMood
    ? 'completed'
    : isMoodCheckinSkippedToday
    ? 'skipped'
    : 'not_started';

  const saveMood = (
    primaryEmotion: PrimaryEmotion,
    secondaryEmotions: string[],
    note: string,
    contextTags: string[]
  ) => {
    const now = new Date();
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')} WIB`;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const dateFormatted = `${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]} ${now.getFullYear()}`;

    const newEntry: MoodEntry = {
      id: `mood_${Date.now()}`,
      timestamp: now.toISOString(),
      dateString: dateFormatted,
      timeString: timeFormatted,
      primaryEmotion,
      secondaryEmotions,
      note,
      contextTags,
      intensity: 4,
    };

    // Filter out any existing today entry so user only records once per day (or updates existing)
    setMoodEntries((prev) => [newEntry, ...prev.filter((e) => !isToday(e.timestamp))]);

    // Update streak if needed
    if (user) {
      setUser({
        ...user,
        moodEntriesCount: user.moodEntriesCount + 1,
      });
    }
  };

  // Chat Actions
  const sendAiMessage = (userText: string) => {
    if (!userText.trim()) return;

    const now = new Date();
    const timeFormatted = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}_u`,
      sender: 'user',
      senderName: user?.pseudonym || 'Kamu',
      text: userText,
      timestamp: timeFormatted,
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Empathetic, safeguarding AI response
    setTimeout(() => {
      let aiReply =
        'Terima kasih sudah mau berbagi. Wajar sekali merasa begitu saat banyak hal bertumpuk di pikiranmu. Tarik napas perlahan... Apakah kamu ingin menceritakan hal yang membebani, atau mau coba latihan pernapasan singkat dulu?';
      let isBreathing = false;
      let isCrisis = false;

      const lower = userText.toLowerCase();
      if (
        lower.includes('mati') ||
        lower.includes('bunuh diri') ||
        lower.includes('tak sanggup lagi') ||
        lower.includes('melukai') ||
        lower.includes('darurat')
      ) {
        aiReply =
          'Aku mendengar betapa beratnya situasi yang sedang kamu hadapi saat ini. Keselamatan dan dirimu sangat berharga. Sebagai asisten AI, aku memiliki keterbatasan dan ingin memastikan kamu mendapatkan pendampingan nyata yang aman. Silakan hubungi layanan darurat SEJIWA 119 Ext 8 atau konselor sebaya kami.';
        isCrisis = true;
      } else if (
        lower.includes('napas') ||
        lower.includes('cemas') ||
        lower.includes('panik') ||
        lower.includes('relaksasi')
      ) {
        aiReply =
          'Mari luangkan 1 menit untuk menenangkan diri bersama. Ikuti ritme pernapasan terpandu di bawah ini agar detak jantungmu kembali rileks.';
        isBreathing = true;
      } else if (lower.includes('sekolah') || lower.includes('tugas') || lower.includes('lelah')) {
        aiReply =
          'Beban akademik dan ekspektasi lingkungan memang sering kali membuat pundak terasa berat. Ingatlah bahwa nilaimu tidak menentukan seluruh harga dirimu sebagai manusia. Kamu sudah berjuang sebaik mungkin hari ini.';
      }

      const aiMsg: ChatMessage = {
        id: `msg_${Date.now()}_a`,
        sender: 'ai',
        senderName: 'Teman Akses',
        text: aiReply,
        timestamp: timeFormatted,
        isBreathingPrompt: isBreathing,
        isCrisisNotice: isCrisis,
      };

      setChatMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  // Booking Actions
  const createBooking = (bookingData: Omit<BookingSession, 'id'>) => {
    const newBooking: BookingSession = {
      id: `bk_${Date.now()}`,
      ...bookingData,
    };
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Learning Actions
  const toggleBookmark = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) =>
        art.id === articleId ? { ...art, isSaved: !art.isSaved } : art
      )
    );
  };

  // Community Actions
  const toggleJoinCommunity = (groupId: string) => {
    setCommunityList((prev) =>
      prev.map((grp) =>
        grp.id === groupId
          ? {
              ...grp,
              isJoined: !grp.isJoined,
              memberCount: grp.isJoined ? grp.memberCount - 1 : grp.memberCount + 1,
            }
          : grp
      )
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        currentTab,
        screenParams,
        navigateTo,
        switchTab,
        goBack,
        isAuthenticated,
        user,
        login,
        register,
        logout,
        updateProfile,
        moodEntries,
        todayMood,
        dailyMoodStatus,
        skipMoodCheckinToday,
        resetMoodCheckinToday,
        saveMood,
        weeklyStats,
        chatMessages,
        sendAiMessage,
        counselors,
        bookings,
        createBooking,
        articles,
        toggleBookmark,
        communityList,
        toggleJoinCommunity,
        eventsList,
        isCrisisModalOpen,
        openCrisisModal: () => setIsCrisisModalOpen(true),
        closeCrisisModal: () => setIsCrisisModalOpen(false),
        isLogoutDialogOpen,
        openLogoutDialog: () => setIsLogoutDialogOpen(true),
        closeLogoutDialog: () => setIsLogoutDialogOpen(false),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

