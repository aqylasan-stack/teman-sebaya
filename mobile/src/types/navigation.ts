export type TabType = 'beranda' | 'mood' | 'cerita' | 'belajar' | 'profil';

export type ScreenType =
  // Onboarding & Auth
  | 'splash'
  | 'onboarding'
  | 'onboarding_complete'
  | 'login'
  | 'register'
  | 'otp_verification'
  | 'registration_success'
  | 'forgot_password'
  | 'verify_code'
  | 'create_new_password'
  | 'password_reset_success'
  | 'age_consent'
  | 'thoriq_onboarding'
  // Main Tabs (via tab bar)
  | 'main'
  // Sub-screens
  | 'mood_selection'
  | 'daily_mood_checkin'
  | 'mood_stats'
  | 'mood_analysis'
  | 'ai_chat'
  | 'teman_akses'
  | 'service_info'
  | 'counselor_directory'
  | 'counselor_detail'
  | 'counselor_booking'
  | 'article_detail'
  | 'quiz'
  | 'game_butterfly'
  | 'game_feelings'
  | 'game_dilemma'
  | 'test_psikologi'
  | 'test_intro'
  | 'test_questionnaire'
  | 'test_result'
  | 'mental_game_hub'
  | 'teman_bermain'
  | 'game_category_list'
  | 'game_detail'
  | 'mental_game_detail'
  | 'mental_game_play'
  | 'mental_game_result'
  | 'community_pikr'
  | 'community_genre'
  | 'community_events'
  | 'teman_supportif'
  | 'edit_profile'
  | 'jadwal_cerita'
  | 'privacy_settings'
  | 'notification_settings'
  | 'about_app';

export interface NavigationState {
  currentScreen: ScreenType;
  currentTab: TabType;
  previousScreen?: ScreenType;
  params?: Record<string, any>;
}

