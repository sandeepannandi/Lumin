import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function AnimatedSplashScreen({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const subtitleOpacity = useSharedValue(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      subtitleOpacity.value = withTiming(1, { duration: 600 });
    }, 700);
    return () => clearTimeout(timeout);
  }, []);
  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/lottie/splash.json')}
        autoPlay
        loop={false}
        resizeMode="cover"
        style={styles.lottie}
        onAnimationFinish={onAnimationComplete}
      />
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.title}>lumin</Text>
        <Animated.Text style={[styles.subtitle, subtitleAnimatedStyle]}>
          Your AI GlowUp Assistant
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8D6E5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  lottie: {
    position: 'absolute',
    width: width * 1.3,
    height: height * 1.3,
    top: -(height * 0.15),
    left: -(width * 0.15),
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 6,
    fontFamily: 'PlayfairDisplay',
  },
  subtitle: {
    fontSize: 14,
    color: '#2c2c2c',
    fontWeight: '400',
    fontFamily: 'sans-serif',
  },
}); 