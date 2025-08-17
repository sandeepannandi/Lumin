import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

const { width } = Dimensions.get('window');

interface Step {
  image: any;
  headline: string;
  subtitle: string;
  shadowColor?: string;
}

export default function OnboardingCarousel({ step, steps, onGetStarted, onStepChange }: {
  step: number;
  steps: Step[];
  onGetStarted: () => void;
  onStepChange?: (newStep: number) => void;
}) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ x: step * width, animated: true });
    }
  }, [step]);

  const progress = ((step + 1) / steps.length) * 100;

  const handleMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newStep = Math.round(e.nativeEvent.contentOffset.x / width);
    if (onStepChange && newStep !== step) {
      onStepChange(newStep);
    }
  };

  return (
    <View style={styles.container}>
     
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: 0, alignItems: 'flex-start' }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {steps.map((item, idx) => (
          <View key={idx} style={{ width, alignItems: 'center' }}>
            <View style={[styles.imageWrapper, { shadowColor: item.shadowColor || '#ac765d' }] }>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
              {/* Dots overlay */}
              <View style={styles.dotsContainer}>
                {steps.map((_, dotIdx) => (
                  <View
                    key={dotIdx}
                    style={[styles.dot, dotIdx === step ? styles.activeDot : styles.inactiveDot]}
                  />
                ))}
              </View>
            </View>
            <View style={{ width: '100%' }}>
              <Text style={styles.headline}>{item.headline}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.button} onPress={onGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    paddingTop: 0,
    paddingHorizontal: 0,
    justifyContent: 'flex-start',
  },
  progressBarContainer: {
    width: '100%',
    height: 6,
    marginTop: 0,
    marginBottom: 8,
    position: 'relative',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  progressBarBg: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#eee',
  },
  progressBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6F61',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    height: 580,
    borderBottomLeftRadius: 184,
    borderBottomRightRadius: 184,
    overflow: 'hidden',
    backgroundColor: 'none',
    alignSelf: 'center',
    shadowColor: '#ac765d',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 40,
    elevation: 50,
    marginTop: 0,
    paddingTop: 0,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headline: {
    fontSize: 32,
    fontFamily: 'PlayfairDisplay',
    fontWeight: '600',
    color: '#2c2c2c',
    marginTop: 18,
    marginBottom: 6,
    textAlign: 'left',
    letterSpacing: 0,
    marginHorizontal: 26,
  },
  subtitle: {
    fontSize: 16,
    color: '#2c2c2c',
    marginBottom: 32,
    textAlign: 'left',
    fontWeight: '400',
    marginHorizontal: 26,
  },
  buttonGroup: {
    width: '90%',
    alignItems: 'center',
    marginBottom: 36,
    position: 'absolute',
    bottom: 0,
    left: '5%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    marginHorizontal: 2,
    backgroundColor: '#ccc',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: '#2c2c2c',
    marginHorizontal: 2,
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
}); 