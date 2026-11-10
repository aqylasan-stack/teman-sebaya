import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
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
import { buildCurrentWeekStats } from '../utils/date';

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
  loginWithGoogle: (googleData?: { email?: string; name?: string; photoUrl?: string }) => { status: 'success' | 'onboarding_needed' };
  register: (email: string, pass: string, name?: string) => boolean;
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

interface RegisteredAccount {
  email: string;
  password?: string;
  profile: UserProfile;
  moodEntries: MoodEntry[];
  moodCheckinSkippedDate: string | null;
}

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Navigation state - starts at splash per PRD & User Flow
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [currentTab, setCurrentTab] = useState<TabType>('beranda');
  const [screenStack, setScreenStack] = useState<ScreenType[]>(['splash']);
  const [screenParams, setScreenParams] = useState<Record<string, any>>({});

  // Auth & User State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  // Registered user accounts database for persistent login/register separation
  const [registeredAccounts, setRegisteredAccounts] = useState<RegisteredAccount[]>([
    {
      email: 'anya.sebaya@teman.id',
      password: 'password123',
      profile: {
        ...initialUser,
        isOnboarded: true,
      },
      moodEntries: initialMoodEntries,
      moodCheckinSkippedDate: null,
    },
    {
      email: 'anya.sebaya@gmail.com',
      password: '',
      profile: {
        ...initialUser,
        email: 'anya.sebaya@gmail.com',
        provider: 'google',
        isOnboarded: true,
      },
      moodEntries: initialMoodEntries,
      moodCheckinSkippedDate: null,
    },
  ]);

  // Mood State (Hanya diisi data riil dari akun yang sedang aktif, kosong secara default)
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [moodCheckinSkippedDate, setMoodCheckinSkippedDate] = useState<string | null>(null);

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

  // ==============================================================
  // AUTH ACTIONS: FLOW 1 (LOGIN) & FLOW 2 (REGISTER)
  // ==============================================================

  // FLOW 1 — LOGIN (B. Email & Password)
  const login = (email: string, _pass: string) => {
    const cleanEmail = (email || initialUser.email).trim().toLowerCase();

    // Ambil akun pengguna yang sudah tersimpan
    const existing = registeredAccounts.find(
      (a) => a.email.toLowerCase() === cleanEmail
    );

    const userProfile: UserProfile = existing
      ? existing.profile
      : {
          ...initialUser,
          email: cleanEmail,
          isOnboarded: true,
        };

    const userMoods: MoodEntry[] = existing
      ? existing.moodEntries
      : cleanEmail.includes('anya')
      ? initialMoodEntries
      : [];

    const userSkippedDate = existing ? existing.moodCheckinSkippedDate : null;

    setIsAuthenticated(true);
    setUser(userProfile);
    setMoodEntries(userMoods);
    setMoodCheckinSkippedDate(userSkippedDate);

    // KETENTUAN PENTING:
    // Login TIDAK BOLEH mengulang onboarding untuk pengguna lama.
    // Lanjutkan ke Mood Check-in sebelum Beranda.
    setCurrentScreen('daily_mood_checkin');
    setCurrentTab('beranda');
    setScreenStack(['daily_mood_checkin']);
    return true;
  };

  // FLOW 1 — LOGIN (A. Login with Google)
  const loginWithGoogle = (googleData?: { email?: string; name?: string; photoUrl?: string }) => {
    const email = (googleData?.email || 'anya.sebaya@gmail.com').trim().toLowerCase();
    const name = googleData?.name || (email.includes('anya') ? 'Anya Sebaya' : '');

    const existing = registeredAccounts.find(
      (a) => a.email.toLowerCase() === email
    );

    if (existing && existing.profile.isOnboarded) {
      // Pengguna lama Google dengan profil lengkap:
      // Jangan meminta mengisi ulang informasi. Langsung ke Mood Check-in sebelum Beranda!
      setIsAuthenticated(true);
      setUser(existing.profile);
      setMoodEntries(existing.moodEntries || []);
      setMoodCheckinSkippedDate(existing.moodCheckinSkippedDate || null);

      setCurrentScreen('daily_mood_checkin');
      setCurrentTab('beranda');
      setScreenStack(['daily_mood_checkin']);
      return { status: 'success' as const };
    }

    // Jika pengguna baru atau profil wajib belum lengkap (misal usia/birthDate belum ada):
    // Hanya minta data yang benar-benar belum dimiliki!
    const newGoogleUser: UserProfile = existing?.profile || {
      id: `usr_g_${Date.now()}`,
      name: name,
      nickname: name ? name.split(' ')[0] : '',
      pseudonym: name ? `${name.split(' ')[0]} (Anonim)` : 'Teman Baru (Anonim)',
      email: email,
      avatarInitials: name
        ? name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
        : 'G',
      joinedDate: 'Nov 2026',
      isAnonymous: true,
      schoolOrOrg: 'PIK-R Binaan',
      interests: ['Kelola Stres', 'Emosi'],
      activeStreakDays: 1,
      moodEntriesCount: 0,
      challengesCompleted: 0,
      allowAiMoodAccess: false,
      dailyReminderEnabled: true,
      dailyReminderTime: '20:00 WIB',
      isOnboarded: false,
      provider: 'google',
    };

    setRegisteredAccounts((prev) => [
      ...prev.filter((a) => a.email.toLowerCase() !== email),
      {
        email,
        profile: newGoogleUser,
        moodEntries: [],
        moodCheckinSkippedDate: null,
      },
    ]);

    setIsAuthenticated(true);
    setUser(newGoogleUser);
    setMoodEntries([]);
    setMoodCheckinSkippedDate(null);

    // Bawa ke onboarding (Step 1 Age Verification jika nama sudah didapat dari Google)
    // Jangan meminta pengguna mengisi nama dua kali!
    setCurrentScreen('thoriq_onboarding');
    setScreenStack(['thoriq_onboarding']);
    return { status: 'onboarding_needed' as const };
  };

  // FLOW 2 — REGISTER (Form Register: Email & Password)
  const register = (email: string, pass: string, _optionalName?: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // Buat profil pengguna baru yang belum di-onboard
    // Field nama diisi nanti pada tahap onboarding "What Should We Call You?"
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: '',
      nickname: '',
      pseudonym: 'Teman Baru (Anonim)',
      email: cleanEmail || 'teman@baru.id',
      avatarInitials: cleanEmail ? cleanEmail.slice(0, 2).toUpperCase() : 'TB',
      joinedDate: 'Nov 2026',
      isAnonymous: true,
      schoolOrOrg: 'PIK-R Binaan',
      interests: ['Kelola Stres', 'Emosi'],
      activeStreakDays: 1,
      moodEntriesCount: 0,
      challengesCompleted: 0,
      allowAiMoodAccess: false,
      dailyReminderEnabled: true,
      dailyReminderTime: '20:00 WIB',
      isOnboarded: false,
      provider: 'email',
    };

    setRegisteredAccounts((prev) => [
      ...prev.filter((a) => a.email.toLowerCase() !== cleanEmail),
      {
        email: cleanEmail,
        password: pass,
        profile: newUser,
        moodEntries: [],
        moodCheckinSkippedDate: null,
      },
    ]);

    setIsAuthenticated(true);
    setUser(newUser);
    // PENTING: Pengguna baru yang mendaftar TIDAK memiliki catatan mood sebelumnya!
    setMoodEntries([]);
    setMoodCheckinSkippedDate(null);

    // KETENTUAN PENTING:
    // Register harus menyelesaikan onboarding sebelum masuk Beranda.
    // Mulai dari Perkenalan Maskot (Step 0)
    setCurrentScreen('thoriq_onboarding');
    setScreenStack(['thoriq_onboarding']);
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setMoodEntries([]);
    setMoodCheckinSkippedDate(null);
    setIsLogoutDialogOpen(false);
    setCurrentScreen('login');
    setScreenStack(['login']);
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...partial };

      // Simpan perubahan profil agar tersimpan persisten di registeredAccounts
      setRegisteredAccounts((accs) =>
        accs.map((a) =>
          a.email.toLowerCase() === updated.email.toLowerCase()
            ? { ...a, profile: updated }
            : a
        )
      );

      return updated;
    });
  };

  // Mood State & Helpers
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
    const todayKey = getTodayDateKey();
    setMoodCheckinSkippedDate(todayKey);

    if (user?.email) {
      setRegisteredAccounts((accs) =>
        accs.map((a) =>
          a.email.toLowerCase() === user.email.toLowerCase()
            ? {
                ...a,
                moodCheckinSkippedDate: todayKey,
              }
            : a
        )
      );
    }
  };

  const resetMoodCheckinToday = () => {
    setMoodCheckinSkippedDate(null);
    setMoodEntries((prev) => {
      const updated = prev.filter((entry) => !isToday(entry.timestamp));
      if (user?.email) {
        setRegisteredAccounts((accs) =>
          accs.map((a) =>
            a.email.toLowerCase() === user.email.toLowerCase()
              ? {
                  ...a,
                  moodEntries: updated,
                  moodCheckinSkippedDate: null,
                  profile: {
                    ...a.profile,
                    moodEntriesCount: updated.length,
                  },
                }
              : a
          )
        );
      }
      return updated;
    });
  };

  const isMoodCheckinSkippedToday =
    moodCheckinSkippedDate === getTodayDateKey() && !todayMood;

  // Mutual exclusive 3 states: 'completed' | 'skipped' | 'not_started'
  const dailyMoodStatus: 'completed' | 'skipped' | 'not_started' = todayMood
    ? 'completed'
    : isMoodCheckinSkippedToday
    ? 'skipped'
    : 'not_started';

  // Ritme mingguan kalender (Senin s/d Minggu) tersinkron otomatis,
  // menjamin hari-hari masa depan yang belum tiba berstatus kosong secara alami.
  const weeklyStats = useMemo<MoodDayStat[]>(
    () => buildCurrentWeekStats(moodEntries, todayMood),
    [moodEntries, todayMood]
  );

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
    setMoodEntries((prev) => {
      const updated = [newEntry, ...prev.filter((e) => !isToday(e.timestamp))];
      if (user?.email) {
        setRegisteredAccounts((accs) =>
          accs.map((a) =>
            a.email.toLowerCase() === user.email.toLowerCase()
              ? {
                  ...a,
                  moodEntries: updated,
                  moodCheckinSkippedDate: null,
                  profile: {
                    ...a.profile,
                    moodEntriesCount: updated.length,
                  },
                }
              : a
          )
        );
      }
      return updated;
    });

    setMoodCheckinSkippedDate(null);

    // Update streak & count
    if (user) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              moodEntriesCount: prev.moodEntriesCount + 1,
            }
          : null
      );
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
        loginWithGoogle,
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

