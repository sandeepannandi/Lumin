import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');

export default function ForgotPasswordScreen({ onBack }: { onBack?: () => void }) {
  const [email, setEmail] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      {/* Top image section with floating back button */}
      <View style={styles.topSection}>
        <Image source={require('../assets/images/reset.jpg')} style={styles.topImage} />
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Svg
          width={width}
          height={60}
          viewBox={`0 0 ${width} 60`}
          style={styles.waveSvg}
        >
          <Path
            d={`M0,40 Q${width / 2},80 ${width},40 L${width},60 L0,60 Z`}
            fill="#fff"
          />
        </Svg>
      </View>
      
      {/* Title and underline */}
      <Text style={styles.title}>Reset your password</Text>
      <View style={styles.underline} />
      
      {/* Instructions */}
      <Text style={styles.instructions}>
        Please enter your email and we will send an{"\n"}OTP code in the next step to reset your password.
      </Text>
      
      {/* Email input */}
      <TextInput
        style={styles.simpleInput}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      {/* Continue button */}
      <TouchableOpacity style={styles.continueBtn}>
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 0 : 0,
    paddingHorizontal: 0,
  },
  topSection: {
    width: '100%',
    height: 350,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  topImage: {
    width: '100%',
    height: 350,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  waveSvg: {
    position: 'absolute',
    bottom: -1,
    left: 0,
  },
  backBtn: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 1,
    padding: 3,
    backgroundColor: 'rgba(44,44,44,0.5)', 
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2c2c2c',
    marginLeft: 24,
    marginTop: 8,
    fontFamily: 'PlayfairDisplay',
    marginBottom: 2,
  },
  underline: {
    width: 60,
    height: 1.5,
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 24,
  },
  instructions: {
    color: '#2c2c2c',
    fontSize: 14,
    marginHorizontal: 24,
    marginBottom: 28,
    lineHeight: 24,
    fontFamily: 'sans-serif',
  },
  simpleInput: {
    backgroundColor: '#f7f7f7',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2c2c2c',
    marginHorizontal: 24,
    marginBottom: 14,
  },
  continueBtn: {
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 14,
    width: '86%',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    marginTop: 8,
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
    height: 52,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
}); 