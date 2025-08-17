import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AnimatedSplashScreen from '../components/AnimatedSplashScreen';
import OnboardingCarousel from '../components/OnboardingCarousel';
import LoginScreen from '../components/LoginScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import UserDetailsScreen from '../components/UserDetailsScreen';
import MainAppScreen from './MainAppScreen';
import { useFonts } from 'expo-font';

// Prevent splash from showing again after first time in this app session
let splashShownFlag = false;
// Track onboarding completion in this app session
let onboardingDoneFlag = false;

const ONBOARDING_STEPS = [
  {
    image: require('../assets/images/fashion2.png'),
    headline: 'Discover Fashion via AI Chat',
    subtitle: 'Because your style deserves smart advice.',
    shadowColor: '#ac765d',
  },
  {
    image: require('../assets/images/shop.png'),
    headline: 'Shop the Look',
    subtitle: 'Find and buy outfits curated just for you.',
    shadowColor: '#ac765d',
  },
  {
    image: require('../assets/images/trackskin.png'),
    headline: 'Track Your Skin',
    subtitle: 'Analyze and monitor your skin progress with AI.',
    shadowColor: '#ac765d',
  },
  {
    image: require('../assets/images/hairstyles.png'),
    headline: 'Personalized Hairstyles',
    subtitle: 'Discover styles that suit your face shape.',
    shadowColor: '#ac765d',
  },
];

export default function RootLayout() {
  // All hooks at the top!
  const [showSplash, setShowSplash] = useState(!splashShownFlag);
  const [showOnboarding, setShowOnboarding] = useState(!onboardingDoneFlag);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay': require('../assets/fonts/playfair.ttf'),
  });

  // Auto-advance onboarding every 4 seconds unless on last page
  useEffect(() => {
    if (showOnboarding && !showSplash && onboardingStep < ONBOARDING_STEPS.length - 1) {
      const timer = setTimeout(() => {
        setOnboardingStep((prev) => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showOnboarding, showSplash, onboardingStep]);

  // Only this return is allowed before all hooks
  if (!fontsLoaded) return null;

  if (showSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => {
          splashShownFlag = true;
          setShowSplash(false);
        }}
      />
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingCarousel
        step={onboardingStep}
        steps={ONBOARDING_STEPS}
        onGetStarted={() => {
          setShowOnboarding(false);
          setShowLogin(true);
        }}
        onStepChange={setOnboardingStep}
      />
    );
  }

  if (showLogin) {
    if (showForgotPassword) {
      return <ForgotPasswordScreen onBack={() => setShowForgotPassword(false)} />;
    }
    if (showUserDetails) {
      return (
        <UserDetailsScreen
          onComplete={() => {
            // Mark onboarding as done for this session and show main app
            onboardingDoneFlag = true;
            setShowUserDetails(false);
            setShowLogin(false);
            setShowOnboarding(false);
            setShowMainApp(true);
          }}
        />
      );
    }
    return (
      <LoginScreen
        onBack={() => {
          setShowLogin(false);
          setShowOnboarding(true);
        }}
        onForgotPassword={() => setShowForgotPassword(true)}
        onLoginSuccess={() => setShowUserDetails(true)}
      />
    );
  }

  // Show main app after user details completion
  if (showMainApp) {
    return <MainAppScreen />;
  }

  // Fallback: render nothing here
  return null;
} 