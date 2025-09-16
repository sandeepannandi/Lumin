import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './home';
import AskLuminScreen from './ask-lumin';
import WishlistScreen from './wishlist';
import ProfileScreen from './profile';
import HairScreen from './hair';
import SkinScreen from './skin';
import ChatHistoryScreen from './chat-history';

export default function MainAppScreen() {
  const [activeTab, setActiveTab] = useState('home');
  
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [fontsLoaded] = useFonts({
    'NataSans': require('../assets/fonts/NataSans-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  const animateTabTransition = (newTab: string) => {
    if (newTab === activeTab) return;

    // Update tab immediately to prevent blink
    setActiveTab(newTab);
    
    // Smooth fade transition without blank state
    Animated.timing(fadeAnim, {
      toValue: 0.3,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      // Quickly fade back to full opacity
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderTabContent = () => {
    const screens = {
      'home': <HomeScreen onNavigateToHair={() => animateTabTransition('hair')} onNavigateToSkin={() => animateTabTransition('skin')} onNavigateToChatHistory={() => animateTabTransition('chat-history')} />,
      'ask-lumin': <AskLuminScreen onNavigateToChatHistory={() => animateTabTransition('chat-history')} />,
      'wishlist': <WishlistScreen onNavigateToAskLumin={() => animateTabTransition('ask-lumin')} />,
      'profile': <ProfileScreen />,
      'hair': <HairScreen onBack={() => animateTabTransition('home')} onNavigateToSkin={() => animateTabTransition('skin')} onNavigateToChatHistory={() => animateTabTransition('chat-history')} />,
      'skin': <SkinScreen onBack={() => animateTabTransition('home')} onNavigateToChatHistory={() => animateTabTransition('chat-history')} />,
      'chat-history': <ChatHistoryScreen onBack={() => animateTabTransition('home')} />,
    };

    return (
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {screens[activeTab as keyof typeof screens]}
      </Animated.View>
    );
  };

  // Determine which tab should appear active in the UI
  const getActiveTabForUI = () => {
    return activeTab === 'hair' || activeTab === 'skin' ? 'home' : activeTab;
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Tab Content */}
        {renderTabContent()}

        {/* Custom Tab Bar */}
        <View style={styles.tabBar}>
          <View style={styles.tabWrapper}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => animateTabTransition('home')}
            >
              <Image
                source={getActiveTabForUI() === 'home' ? require('../assets/images/home.png') : require('../assets/images/homegray.png')}
                style={styles.tabIcon}
              />
              <Text style={[styles.tabLabel, getActiveTabForUI() === 'home' && styles.activeTabLabel]}>
                Home
              </Text>
            </TouchableOpacity>
            {getActiveTabForUI() === 'home' && <View style={styles.activeIndicator} />}
          </View>

          <View style={styles.tabWrapper}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => animateTabTransition('ask-lumin')}
            >
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require('../assets/lottie/fixedblur.json')}
                  autoPlay={true}
                  loop={true}
                  style={styles.lottieIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={[styles.tabLabel, getActiveTabForUI() === 'ask-lumin' && styles.activeTabLabel]}>
                Ask Lumin
              </Text>
            </TouchableOpacity>
            {getActiveTabForUI() === 'ask-lumin' && <View style={styles.activeIndicator} />}
          </View>

          <View style={styles.tabWrapper}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => animateTabTransition('wishlist')}
            >
              <Image
                source={getActiveTabForUI() === 'wishlist' ? require('../assets/images/like.png') : require('../assets/images/likegray.png')}
                style={styles.tabIcon}
              />
              <Text style={[styles.tabLabel, getActiveTabForUI() === 'wishlist' && styles.activeTabLabel]}>
                Wishlist
              </Text>
            </TouchableOpacity>
            {getActiveTabForUI() === 'wishlist' && <View style={styles.activeIndicator} />}
          </View>

          <View style={styles.tabWrapper}>
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => animateTabTransition('profile')}
            >
              <Image
                source={getActiveTabForUI() === 'profile' ? require('../assets/images/user.png') : require('../assets/images/usergray.png')}
                style={styles.tabIcon}
              />
              <Text style={[styles.tabLabel, getActiveTabForUI() === 'profile' && styles.activeTabLabel]}>
                Profile
              </Text>
            </TouchableOpacity>
            {getActiveTabForUI() === 'profile' && <View style={styles.activeIndicator} />}
          </View>
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingBottom: 8,
    paddingTop: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
    borderTopWidth: 0.3,
    borderTopColor: '#E5E7EB',
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
    height: 70,
  },
  tabWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 18,
    height: 18,
    marginBottom: 6,
  },
  lottieContainer: {
    width: 100,
    height: 20,
    marginBottom: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieIcon: {
    width: 100,
    height: 40,
  },
  tabLabel: {
    fontSize: 10.8,
    fontWeight: '400',
    color: '#9CA3AF',
    fontFamily: 'NataSans',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 1.5,
    backgroundColor: '#000000',
    borderRadius: 10,
  },
  activeTabLabel: {
    color: '#2c2c2c',
    fontFamily: 'NataSans',
  },
});
