import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import AnimatedSplashScreen from '../components/AnimatedSplashScreen';
import OnboardingCarousel from '../components/OnboardingCarousel';
import LoginScreen from '../components/LoginScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen';
import UserDetailsScreen from '../components/UserDetailsScreen';
import BodyDetailsScreen from '../components/BodyDetailsScreen';
import CasualPreferenceScreen from '../components/CasualPreferenceScreen';
import WorkPreferenceScreen from '../components/WorkPreferenceScreen';
import NightOutPreferenceScreen from '../components/NightOutPreferenceScreen';
import NeverKeepPreferenceScreen from '../components/NeverKeepPreferenceScreen';
import StylesNeverWearScreen from '../components/StylesNeverWearScreen';
import FaceAnalysisScreen from '../components/FaceAnalysisScreen';
import MainAppScreen from './MainAppScreen';
import { useFonts } from 'expo-font';
import { Asset } from 'expo-asset';

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
  const [showCasualPreference, setShowCasualPreference] = useState(false);
  const [showWorkPreference, setShowWorkPreference] = useState(false);
  const [showNightOutPreference, setShowNightOutPreference] = useState(false);
  const [showNeverKeepPreference, setShowNeverKeepPreference] = useState(false);
  const [showStylesNeverWear, setShowStylesNeverWear] = useState(false);
  const [showFaceAnalysis, setShowFaceAnalysis] = useState(false);
  const [showMainApp, setShowMainApp] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const [firstImageReady, setFirstImageReady] = useState(false);
  const [loginAssetsReady, setLoginAssetsReady] = useState(false);
  const [firstLoginImageReady, setFirstLoginImageReady] = useState(false);
  const [splashAnimDone, setSplashAnimDone] = useState(false);
  
  // Separate animation values for each transition
  const userDetailsSlideAnim = useState(new Animated.Value(0))[0];
  const bodyDetailsSlideAnim = useState(new Animated.Value(0))[0];
  const casualPreferenceSlideAnim = useState(new Animated.Value(0))[0];
  const workPreferenceSlideAnim = useState(new Animated.Value(0))[0];
  const nightOutPreferenceSlideAnim = useState(new Animated.Value(0))[0];
  const neverKeepPreferenceSlideAnim = useState(new Animated.Value(0))[0];
  const stylesNeverWearSlideAnim = useState(new Animated.Value(0))[0];
  const faceAnalysisSlideAnim = useState(new Animated.Value(0))[0];
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

  // Animation functions for CasualPreference
  const slideInCasualPreference = (callback?: () => void) => {
    casualPreferenceSlideAnim.setValue(screenWidth);
    Animated.timing(casualPreferenceSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutCasualPreference = (callback?: () => void) => {
    Animated.timing(casualPreferenceSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Animation functions for WorkPreference
  const slideInWorkPreference = (callback?: () => void) => {
    workPreferenceSlideAnim.setValue(screenWidth);
    Animated.timing(workPreferenceSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutWorkPreference = (callback?: () => void) => {
    Animated.timing(workPreferenceSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Animation functions for NightOutPreference
  const slideInNightOutPreference = (callback?: () => void) => {
    nightOutPreferenceSlideAnim.setValue(screenWidth);
    Animated.timing(nightOutPreferenceSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutNightOutPreference = (callback?: () => void) => {
    Animated.timing(nightOutPreferenceSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Animation functions for NeverKeepPreference
  const slideInNeverKeepPreference = (callback?: () => void) => {
    neverKeepPreferenceSlideAnim.setValue(screenWidth);
    Animated.timing(neverKeepPreferenceSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutNeverKeepPreference = (callback?: () => void) => {
    Animated.timing(neverKeepPreferenceSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Animation functions for StylesNeverWear
  const slideInStylesNeverWear = (callback?: () => void) => {
    stylesNeverWearSlideAnim.setValue(screenWidth);
    Animated.timing(stylesNeverWearSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutStylesNeverWear = (callback?: () => void) => {
    Animated.timing(stylesNeverWearSlideAnim, {
      toValue: -screenWidth,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  // Animation functions for FaceAnalysis
  const slideInFaceAnalysis = (callback?: () => void) => {
    faceAnalysisSlideAnim.setValue(screenWidth);
    Animated.timing(faceAnalysisSlideAnim, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(callback);
  };

  const slideOutFaceAnalysis = (callback?: () => void) => {
    Animated.timing(faceAnalysisSlideAnim, {
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

  // Preload onboarding images during splash
  useEffect(() => {
    const preload = async () => {
      try {
        const imageModules = ONBOARDING_STEPS.map((s) => s.image);
        // Prioritize the first slide for instant display
        const [first, ...rest] = imageModules;
        await Asset.fromModule(first).downloadAsync();
        setFirstImageReady(true);
        // Continue preloading the remaining images in the background (no blocking)
        Promise.allSettled(rest.map((mod) => Asset.fromModule(mod).downloadAsync()))
          .then(() => setAssetsReady(true))
          .catch(() => setAssetsReady(true));

        // Preload Login screen assets: prioritize the main welcome image
        const loginHero = require('../assets/images/welcome.jpg');
        await Asset.fromModule(loginHero).downloadAsync();
        setFirstLoginImageReady(true);
        const loginRest = [
          require('../assets/images/google.png'),
          require('../assets/images/success.jpg'),
        ];
        Promise.allSettled(loginRest.map((mod) => Asset.fromModule(mod).downloadAsync()))
          .then(() => setLoginAssetsReady(true))
          .catch(() => setLoginAssetsReady(true));
      } catch (e) {
        // Ignore cache errors; continue
        setFirstImageReady(true);
        setAssetsReady(true);
        setFirstLoginImageReady(true);
        setLoginAssetsReady(true);
      }
    };
    preload();
  }, []);

  // When splash animation completes and the first image for the next screen is ready, proceed
  useEffect(() => {
    if (!splashAnimDone) return;

    // Decide which gate to use based on whether onboarding is done
    const needsOnboarding = !onboardingDoneFlag;
    const gateReady = needsOnboarding ? firstImageReady : firstLoginImageReady;

    if (gateReady) {
      splashShownFlag = true;
      setShowSplash(false);
      if (needsOnboarding) {
        setShowOnboarding(true);
      } else {
        setShowLogin(true);
      }
    }
  }, [splashAnimDone, firstImageReady, firstLoginImageReady]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  if (showSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => {
          setSplashAnimDone(true);
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
          onBack={() => {
            setShowLogin(false);
            setShowOnboarding(true);
          }}
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
            // Move to Casual Preference screen with overlapping transition
            setShowCasualPreference(true);
            slideInCasualPreference();
            slideOutBodyDetails(() => {
              setShowBodyDetails(false);
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

  if (showCasualPreference) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: casualPreferenceSlideAnim }] }
      ]}>
        <CasualPreferenceScreen
          onComplete={() => {
            // Move to Work Preference screen with overlapping transition
            setShowWorkPreference(true);
            slideInWorkPreference();
            slideOutCasualPreference(() => {
              setShowCasualPreference(false);
            });
          }}
          onBack={() => {
            // Go back to Body Details with overlapping transition
            setShowBodyDetails(true);
            bodyDetailsSlideAnim.setValue(-screenWidth);
            Animated.timing(bodyDetailsSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            Animated.timing(casualPreferenceSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowCasualPreference(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showWorkPreference) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: workPreferenceSlideAnim }] }
      ]}>
        <WorkPreferenceScreen
          onComplete={() => {
            // Move to Night Out Preference screen
            setShowNightOutPreference(true);
            slideInNightOutPreference();
            slideOutWorkPreference(() => {
              setShowWorkPreference(false);
            });
          }}
          onBack={() => {
            // Go back to Casual Preference with overlapping transition
            setShowCasualPreference(true);
            casualPreferenceSlideAnim.setValue(-screenWidth);
            Animated.timing(casualPreferenceSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            Animated.timing(workPreferenceSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowWorkPreference(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showNightOutPreference) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: nightOutPreferenceSlideAnim }] }
      ]}>
        <NightOutPreferenceScreen
          onComplete={() => {
            // Move to Never Keep Preference screen
            setShowNeverKeepPreference(true);
            slideInNeverKeepPreference();
            slideOutNightOutPreference(() => {
              setShowNightOutPreference(false);
            });
          }}
          onBack={() => {
            // Go back to Work Preference with overlapping transition
            setShowWorkPreference(true);
            workPreferenceSlideAnim.setValue(-screenWidth);
            Animated.timing(workPreferenceSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            Animated.timing(nightOutPreferenceSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowNightOutPreference(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showNeverKeepPreference) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: neverKeepPreferenceSlideAnim }] }
      ]}>
        <NeverKeepPreferenceScreen
          onComplete={() => {
            // Move to Styles Never Wear screen
            setShowStylesNeverWear(true);
            slideInStylesNeverWear();
            slideOutNeverKeepPreference(() => {
              setShowNeverKeepPreference(false);
            });
          }}
          onBack={() => {
            // Go back to Night Out Preference with overlapping transition
            setShowNightOutPreference(true);
            nightOutPreferenceSlideAnim.setValue(-screenWidth);
            Animated.timing(nightOutPreferenceSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            Animated.timing(neverKeepPreferenceSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowNeverKeepPreference(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showStylesNeverWear) {
    return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: stylesNeverWearSlideAnim }] }
      ]}>
        <StylesNeverWearScreen
          onComplete={() => {
            // Move to Face Analysis screen
            setShowFaceAnalysis(true);
            slideInFaceAnalysis();
            slideOutStylesNeverWear(() => {
              setShowStylesNeverWear(false);
            });
          }}
          onBack={() => {
            // Go back to Never Keep with overlapping transition
            setShowNeverKeepPreference(true);
            neverKeepPreferenceSlideAnim.setValue(-screenWidth);
            Animated.timing(neverKeepPreferenceSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            Animated.timing(stylesNeverWearSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowStylesNeverWear(false);
            });
          }}
        />
      </Animated.View>
    );
  }

  if (showFaceAnalysis) {
  return (
      <Animated.View style={[
        styles.container,
        { transform: [{ translateX: faceAnalysisSlideAnim }] }
      ]}>
        <FaceAnalysisScreen
          onComplete={() => {
            // Finish onboarding and go to main app
            onboardingDoneFlag = true;
            slideOutFaceAnalysis(() => {
              setShowFaceAnalysis(false);
              setShowLogin(false);
              setShowOnboarding(false);
              setShowMainApp(true);
            });
          }}
          onBack={() => {
            setShowStylesNeverWear(true);
            stylesNeverWearSlideAnim.setValue(-screenWidth);
            Animated.timing(stylesNeverWearSlideAnim, {
              toValue: 0,
              duration: 50,
              useNativeDriver: true,
            }).start();
            Animated.timing(faceAnalysisSlideAnim, {
              toValue: screenWidth,
              duration: 50,
              useNativeDriver: true,
            }).start(() => {
              setShowFaceAnalysis(false);
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