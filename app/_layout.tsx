import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import AnimatedSplashScreen from '../components/AnimatedSplashScreen';
import OnboardingCarousel from '../components/OnboardingCarousel';
import LoginScreen from '../components/LoginScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import UserDetailsScreen from '../components/UserDetailsScreen';
import BodyDetailsScreen from '../components/BodyDetailsScreen';
import MainAppScreen from './MainAppScreen';
import { useFonts } from 'expo-font';

const { width: screenWidth } = Dimensions.get('window');

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

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showBodyDetails, setShowBodyDetails] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  
  // Separate animation values for each transition
  const userDetailsSlideAnim = useState(new Animated.Value(0))[0];
  const bodyDetailsSlideAnim = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(1))[0];

  const [fontsLoaded] = useFonts({
    'PlayfairDisplay': require('../assets/fonts/playfair.ttf'),
    'NataSans': require('../assets/fonts/NataSans-Regular.ttf'),
  });

  // Animation functions for UserDetails
  const slideInUserDetails = (callback?: () => void) => {
    userDetailsSlideAnim.setValue(screenWidth);
    Animated.timing(userDetailsSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutUserDetails = (callback?: () => void) => {
    Animated.timing(userDetailsSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Animation functions for BodyDetails
  const slideInBodyDetails = (callback?: () => void) => {
    bodyDetailsSlideAnim.setValue(screenWidth);
    Animated.timing(bodyDetailsSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutBodyDetails = (callback?: () => void) => {
    Animated.timing(bodyDetailsSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const fadeIn = (callback?: () => void) => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const fadeOut = (callback?: () => void) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Handle splash screen
  useEffect(() => {
    if (!splashShownFlag) {
      splashShownFlag = true;
      setTimeout(() => {
        setShowSplash(false);
        if (!onboardingDoneFlag) {
          setShowOnboarding(true);
        } else {
          setShowLogin(true);
        }
      }, 3000);
    } else {
      setShowSplash(false);
      if (!onboardingDoneFlag) {
        setShowOnboarding(true);
      } else {
        setShowLogin(true);
      }
    }
  }, []);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

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
          onboardingDoneFlag = true;
          setShowOnboarding(false);
          setShowLogin(true);
        }}
        onStepChange={setOnboardingStep}
      />
    );
  }

  if (showLogin) {
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        <LoginScreen
          onLoginSuccess={() => {
            fadeOut(() => {
              setShowLogin(false);
              setShowUserDetails(true);
              slideInUserDetails();
            });
          }}
          onForgotPassword={() => {
            setShowForgotPassword(true);
          }}
        />
      </Animated.View>
    );
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordScreen
        onBack={() => {
          setShowForgotPassword(false);
        }}
      />
    );
  }

  if (showUserDetails) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: userDetailsSlideAnim }] }
      ]}>
        <UserDetailsScreen
          onComplete={() => {
            // Start sliding in the new screen immediately
            setShowBodyDetails(true);
            slideInBodyDetails();
            // Then slide out the current screen
            slideOutUserDetails(() => {
              setShowUserDetails(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showBodyDetails) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: bodyDetailsSlideAnim }] }
      ]}>
        <BodyDetailsScreen
          onComplete={() => {
            // Mark onboarding as done for this session and show main app
            onboardingDoneFlag = true;
            slideOutBodyDetails(() => {
              setShowBodyDetails(false);
              setShowLogin(false);
              setShowOnboarding(false);
              setShowMainApp(true);
            });
          }}
          onBack={() => {
            // Start sliding in the previous screen immediately
            setShowUserDetails(true);
            userDetailsSlideAnim.setValue(-screenWidth);
            Animated.timing(userDetailsSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            // Then slide out the current screen
            Animated.timing(bodyDetailsSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowBodyDetails(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showMainApp) {
    return <MainAppScreen />;
  }

  // Fallback: render nothing here
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 