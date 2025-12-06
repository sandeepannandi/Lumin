import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, Platform, Image, Modal, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen({ onBack, onForgotPassword, onLoginSuccess }: { onBack?: () => void, onForgotPassword?: () => void, onLoginSuccess?: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isFormFilled = email.length > 0 && password.length > 0;

  return (
    <View style={styles.container}>
      {/* Top image section with wavy bottom */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Image source={require('../assets/images/welcome.webp')} style={styles.topImage} />
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
      {/* Login form section */}
      <View style={styles.formSection}>
        <Text style={styles.headline}>Welcome to lumin</Text>
        <View style={styles.underline} />
        {/* Email */}
        
          <TextInput
            style={styles.simpleInput}
            placeholder="Email"
            placeholderTextColor="#737A80"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        {/* Password */}
        
          <View style={styles.passwordInputRow}>
            <TextInput
              style={[styles.simpleInput, { flex: 1, marginBottom: 0 }]}
              placeholder="Password"
              placeholderTextColor="#737A80"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity
              style={styles.eyeIconBtn}
              onPress={() => setShowPassword((v) => !v)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#737A80"
              />
            </TouchableOpacity>
          </View>
        {/* Remember Me and Forgot Password */}
        <View style={styles.rowBetween}>
         
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginBtn, !isFormFilled && styles.loginBtnDisabled]}
          disabled={!isFormFilled}
          onPress={() => {
            console.log('Continue button pressed, showing success modal');
            setShowSuccess(true);
          }}
        >
          <Text style={[styles.loginBtnText, !isFormFilled && styles.loginBtnTextDisabled]}>Continue</Text>
        </TouchableOpacity>
        {/* Continue with Google Button */}
        <TouchableOpacity style={styles.googleBtn}>
          <Image source={require('../assets/images/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleBtnText}>Continue with Google</Text>
        </TouchableOpacity>
        {/* Terms and Privacy Text */}
        <Text style={styles.termsText}>
          By continuing I agree with Privacy Policy{"\n"}and Terms & Conditions
        </Text>
        {/* Sign up link */}
       
      </View>
      {/* Success Modal */}
      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
                 onShow={() => {
           console.log('Modal shown, will call onLoginSuccess in 1.8s');
           setTimeout(() => {
             console.log('Calling onLoginSuccess');
             setShowSuccess(false);
             if (onLoginSuccess) onLoginSuccess();
           }, 1800);
         }}
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModalBox}>
            {/* Rectangle with image at the top */}
            <View style={styles.successImageRect}>
              <Image source={require('../assets/images/success.jpg')} style={styles.successImage} />
                             <LottieView
                 source={require('../assets/lottie/sucess.json')}
                 autoPlay
                 loop={false}
                 style={styles.successLottie}
               />
            </View>
            {/* Sparkles */}
            
            {/* Checkmark */}
            
            <Text style={styles.successHeadline}>Log in Success</Text>
            <Text style={styles.successSubtext}>Please wait.{"\n"}You will be directed to the homescreen.</Text>
            <ActivityIndicator size="small" color="#2c2c2c" style={{ marginTop: 12 }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const PINK = '#ffb3b3';
const CORAL = '#ff6f61';
const DARK = '#2c2c2c';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PINK,
  },
  topSection: {
    width: '100%',
    height: 350,
    backgroundColor: 'transparent',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  topImage: {
    width: '100%',
    height: 380,
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
  formSection: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    paddingHorizontal: 24,
    paddingTop: 5,
    alignItems: 'stretch',
  },
  headline: {
    fontSize: 32,
    fontWeight: '600',
    color: DARK,
    marginTop: 12,
    marginBottom: 2,
    fontFamily: 'PlayfairDisplay',
  },
  underline: {
    width: 60,
    height: 1.5,
    backgroundColor: '#2c2c2c',
    borderRadius: 20,
    marginBottom: 22,
  },
  floatingLabelWrapper: {
    position: 'relative',
    marginBottom: 0,
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 12,
    color: '#737A80',
    zIndex: 1,
  },
  simpleInput: {
    backgroundColor: '#f7f7f7',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingVertical: 14,
    fontSize: 16,
    color: '#2c2c2c',
    marginBottom: 14,
  },
  passwordInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
    borderRadius: 28,
    paddingHorizontal: 0,
    marginBottom: 5,
  },
  eyeIconBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMeText: {
    color: CORAL,
    fontSize: 14,
    fontWeight: '500',
  },
  forgotText: {
    color: '#2c2c2c',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: 0.2,
  },
  forgotTextDisabled: {
    color: '#2c2c2c',
    opacity: 0.5,
  },
  loginBtn: {
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 14,
    height: 52,
    alignItems: 'center',
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
    marginTop: 18,
    marginBottom: 10,
  },
  loginBtnDisabled: {
    opacity: 0.6,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  loginBtnTextDisabled: {
    color: '#fff',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 8,
    width: '100%',
    height: 52,
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  googleBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.2,
    lineHeight: 24,
  },
  termsText: {
    color: '#737A80',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    fontWeight: '400',
    lineHeight: 22,
  },
  signupText: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  signupLink: {
    color: CORAL,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalBox: {
    width: 358,
    height: 350,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    padding: 28,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    position: 'relative',
  },
  successImageRect: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 18,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  successLottie: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 100,
    height: 100,
    marginLeft: -50,
    marginTop: -50,
    zIndex: 10,
    pointerEvents: 'none',
  },
  successCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3de6c1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  successHeadline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c2c2c',
    marginBottom: 8,
    lineHeight: 32,
    marginTop: 2,
    textAlign: 'center',
  },
  successSubtext: {
    color: '#2c2c2c',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 0,
    lineHeight: 24,
  },
  sparkle1: {
    position: 'absolute',
    left: 24,
    top: 18,
  },
  sparkle2: {
    position: 'absolute',
    right: 24,
    top: 18,
  },
  sparkle3: {
    position: 'absolute',
    right: 40,
    bottom: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 35,
    left: 20,
    zIndex: 1,
    padding: 3,
    backgroundColor: 'rgba(44,44,44,0.3)', // Added background for visibility
    borderRadius: 20,
  },
}); 