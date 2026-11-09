import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useApp } from '../state/AppContext';
import { BottomNavBar } from '../components/layout/BottomNavBar';
import { CrisisModal } from '../components/crisis/CrisisModal';
import { LogoutDialog } from '../components/profil/LogoutDialog';

// Onboarding & Auth screens
import { SplashScreen } from '../screens/onboarding/SplashScreen';
import { OnboardingScreen } from '../screens/onboarding/OnboardingScreen';
import { OnboardingCompleteScreen } from '../screens/onboarding/OnboardingCompleteScreen';
import { AgeConsentScreen } from '../screens/onboarding/AgeConsentScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { OtpVerificationScreen } from '../screens/auth/OtpVerificationScreen';
import { RegistrationSuccessScreen } from '../screens/auth/RegistrationSuccessScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { VerifyCodeScreen } from '../screens/auth/VerifyCodeScreen';
import { CreateNewPasswordScreen } from '../screens/auth/CreateNewPasswordScreen';
import { PasswordResetSuccessScreen } from '../screens/auth/PasswordResetSuccessScreen';

// Main Tab screens
import { HomeScreen } from '../screens/beranda/HomeScreen';
import { MoodScreen } from '../screens/mood/MoodScreen';
import { CeritaScreen } from '../screens/cerita/CeritaScreen';
import { BelajarScreen } from '../screens/belajar/BelajarScreen';
import { ProfileScreen } from '../screens/profil/ProfileScreen';

// Sub-screens
import { MoodSelectionScreen } from '../screens/mood/MoodSelectionScreen';
import { MoodStatsScreen } from '../screens/mood/MoodStatsScreen';
import { AIChatScreen } from '../screens/cerita/AIChatScreen';
import { BookingScreen } from '../screens/cerita/BookingScreen';
import { ArticleDetailScreen } from '../screens/belajar/ArticleDetailScreen';
import { BermainScreen } from '../screens/bermain/BermainScreen';
import { MentalGameHubScreen } from '../screens/bermain/MentalGameHubScreen';
import { MentalGamePlayScreen } from '../screens/bermain/MentalGamePlayScreen';
import { MentalGameResultScreen } from '../screens/bermain/MentalGameResultScreen';
import { SupportifScreen } from '../screens/supportif/SupportifScreen';
import { EditProfileScreen } from '../screens/profil/EditProfileScreen';
import { PrivacySettingsScreen } from '../screens/profil/PrivacySettingsScreen';

// Psychological Tests (matching WhatsApp screenshots)
import { TestPsikologiScreen } from '../screens/tests/TestPsikologiScreen';
import { TestIntroScreen } from '../screens/tests/TestIntroScreen';
import { TestQuestionnaireScreen } from '../screens/tests/TestQuestionnaireScreen';
import { TestResultScreen } from '../screens/tests/TestResultScreen';

export const RootNavigator: React.FC = () => {
  const { currentScreen, currentTab } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      // Entry & Auth
      case 'splash':
        return <SplashScreen />;
      case 'onboarding':
        return <OnboardingScreen />;
      case 'onboarding_complete':
        return <OnboardingCompleteScreen />;
      case 'age_consent':
        return <AgeConsentScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register':
        return <RegisterScreen />;
      case 'otp_verification':
        return <OtpVerificationScreen />;
      case 'registration_success':
        return <RegistrationSuccessScreen />;
      case 'forgot_password':
        return <ForgotPasswordScreen />;
      case 'verify_code':
        return <VerifyCodeScreen />;
      case 'create_new_password':
        return <CreateNewPasswordScreen />;
      case 'password_reset_success':
        return <PasswordResetSuccessScreen />;

      // Sub-screens
      case 'mood_selection':
        return <MoodSelectionScreen />;
      case 'mood_stats':
        return <MoodStatsScreen />;
      case 'ai_chat':
      case 'teman_akses':
        return <AIChatScreen />;
      case 'counselor_booking':
        return <BookingScreen />;
      case 'article_detail':
        return <ArticleDetailScreen />;
      case 'game_butterfly':
      case 'game_feelings':
      case 'game_dilemma':
      case 'mental_game_hub':
      case 'teman_bermain':
        return <MentalGameHubScreen />;
      case 'mental_game_play':
        return <MentalGamePlayScreen />;
      case 'mental_game_result':
        return <MentalGameResultScreen />;
      case 'test_psikologi':
        return <MentalGameHubScreen />;
      case 'test_intro':
        return <TestIntroScreen />;
      case 'test_questionnaire':
        return <TestQuestionnaireScreen />;
      case 'test_result':
        return <TestResultScreen />;
      case 'community_pikr':
      case 'community_genre':
      case 'community_events':
      case 'teman_supportif':
        return <SupportifScreen />;
      case 'edit_profile':
        return <EditProfileScreen />;
      case 'privacy_settings':
        return <PrivacySettingsScreen />;

      // Main 5-tab shell
      case 'main':
      default:
        switch (currentTab) {
          case 'beranda':
            return <HomeScreen />;
          case 'mood':
            return <MoodScreen />;
          case 'cerita':
            return <CeritaScreen />;
          case 'belajar':
            return <BelajarScreen />;
          case 'profil':
            return <ProfileScreen />;
          default:
            return <HomeScreen />;
        }
    }
  };

  const showBottomNav = currentScreen === 'main';

  return (
    <View style={styles.container}>
      {renderScreen()}
      {showBottomNav && <BottomNavBar />}

      {/* Global Modals */}
      <CrisisModal />
      <LogoutDialog />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
