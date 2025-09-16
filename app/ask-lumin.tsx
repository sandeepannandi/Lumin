import React, { Profiler, useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { ShoppingBag, History, Image, Send, X, ImagePlus, PersonStanding, User, SendHorizonal } from 'lucide-react-native';
import { Image as ExpoImage } from 'expo-image';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface AskLuminProps {
  onNavigateToChatHistory?: () => void;
  autoFocusOnMount?: boolean;
  onNavigateToBag?: () => void;
}

export default function AskLuminScreen({ onNavigateToChatHistory, autoFocusOnMount, onNavigateToBag }: AskLuminProps) {
  const [message, setMessage] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (autoFocusOnMount && inputRef.current) {
      // Delay slightly to ensure screen is ready
      const t = setTimeout(() => {
        try { inputRef.current?.focus(); } catch {}
      }, 50);
      return () => clearTimeout(t);
    }
  }, [autoFocusOnMount]);

  const knowYourselfItems = [
    { id: 1, title: 'Colour Analysis', icon: '🎨' },
    { id: 2, title: 'Body Shape', icon: '👤' },
    { id: 3, title: 'Face Shape', icon: '😊' },
  ];

  const featuresItems = [
    { id: 1, title: 'Fit Check - Does it look good?', image: require('../assets/images/fitcheck.jpg') },
    { id: 2, title: 'Does this hairstyle suit me?', image: require('../assets/images/hairstyle.jpg') },
    { id: 3, title: 'Accessorize your outfit', image: require('../assets/images/accesorize.jpg') },
    { id: 4, title: 'Improve facial features', image: require('../assets/images/facial.jpg')},
    { id: 5, title: 'Find the best product', image: require('../assets/images/products.jpg') },
  ];

  const sendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat with Lumin</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerIcon} onPress={onNavigateToBag}>
            <ShoppingBag size={22} color="#2c2c2c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon} onPress={onNavigateToChatHistory}>
            <History size={22} color="#2c2c2c" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Know Yourself Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Know Yourself</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.chipsContainer}
            contentContainerStyle={styles.chipsContentContainer}
          >
            {knowYourselfItems.map((item) => (
              <TouchableOpacity key={item.id} style={styles.chip}>
                <Text style={styles.chipIcon}>{item.icon}</Text>
                <Text style={styles.chipText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.featuresContainer}
            contentContainerStyle={styles.featuresContentContainer}
          >
            {featuresItems.map((item) => (
              <TouchableOpacity key={item.id} style={[styles.featureCard,]}>
                <View style={styles.featureImageContainer}>
                  <ExpoImage source={item.image} style={styles.featureImage} />
                </View>
                <Text style={styles.featureText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="Ask Lumin"
              placeholderTextColor="#9CA3AF"
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
              autoFocus={!!autoFocusOnMount}
            />
            {message.trim() && (
              <TouchableOpacity 
                style={styles.clearButton}
                onPress={() => setMessage('')}
              >
                <X size={10} color="#FF0000" />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.leftButtonsContainer}>
              <TouchableOpacity style={styles.imageButton}>
                <ImagePlus size={18} color="#2c2c2c" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.personalizeButton}>
                <User size={18} color="#2c2c2c" />
                <Text style={styles.personalizeText}>Personalize</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              style={[styles.sendButton, message.trim() ? styles.sendButtonActive : styles.sendButtonInactive]} 
              onPress={sendMessage}
              disabled={!message.trim()}
            >
              <SendHorizonal size={18} fill="#2c2c2c" color={message.trim() ? "#2c2c2c" : "#2c2c2c"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c2c2c',
    fontFamily: 'PlayfairDisplay',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 0,
  },
  section: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: 'PlayfairDisplay',
    color: '#2c2c2c',
    marginBottom: 12,
  },
          chipsContainer: {
      marginBottom: 0,
      paddingTop: 6,
      paddingBottom: 4,
    },
    chipsContentContainer: {
      paddingHorizontal: 20,
      paddingRight: 16,
    },
     chip: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#f8f9fa',
     paddingHorizontal: 16,
     paddingVertical: 6,
     marginRight: 10,
     borderWidth: 0,
     shadowColor: '#000000',
     shadowOffset: { width: 2, height: 2 },
     shadowOpacity: 0.1,
     shadowRadius: 3,
     elevation: 2,
     borderRadius: 28,
     borderColor: '#e5e7eb',
  },
  chipIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  chipText: {
    fontSize: 13,
    color: '#2c2c2c',
    fontWeight: '400',
  },
  featuresContainer: {
    marginBottom: 8,
  },
  featuresContentContainer: {
    paddingHorizontal: 20,
    paddingRight: 0,
  },
  featureCard: {
    width: 100,
    height: 180,
    borderRadius: 12,
    marginRight: 10,
    overflow: 'hidden',
  },
  featureImageContainer: {
    width: '100%',
    height: '70%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  featureText: {
    fontSize: 11,
    color: '#2c2c2c',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 2,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
  },
  inputArea: {
    paddingHorizontal:0,
    paddingVertical: 0,
    backgroundColor: 'transparent',
    borderTopWidth: 1,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    borderTopColor: '#f3f4f6',
  },
  inputContainer: {
    backgroundColor: '#f3f4f6',
    borderRadius: 0,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 0,
    borderColor: '#e5e7eb',
    height: 120,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  textInputContainer: {
    flex: 1,
    paddingVertical: 8,
    position: 'relative',
  },
  textInput: {
    fontSize: 15,
    color: '#2c2c2c',
    maxHeight: 80,
    paddingVertical: 0,
    paddingRight: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  leftButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  imageButton: {
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 500,
    marginRight: 0,
  },
  personalizeButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  personalizeText: {
    fontSize: 12,
    color: '#2c2c2c',
    fontWeight: '400',
  },
  clearButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    borderRadius: 500,
    borderColor: 'red',
    borderWidth: 1,
    padding: 2,
    zIndex: 1,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: '#fff',
  },
  sendButtonInactive: {
    backgroundColor: '#fff',
  },
});
