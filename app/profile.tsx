import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Animated, Modal } from 'react-native';
import { Settings, Edit3, ChevronRight, Package, ChevronLeft, Info, Lightbulb, HelpCircle, LogOut, Trash2, Share2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image as ExpoImage } from 'expo-image';

export default function ProfileScreen() {
  const [showSettings, setShowSettings] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    if (showShareSheet) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showShareSheet]);

  const closeModal = () => {
    setShowShareSheet(false);
  };

  if (showSettings) {
    return <SettingsScreen onBack={() => setShowSettings(false)} />;
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.container}>
          {/* Fixed Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Profile</Text>
            <View style={styles.headerIcons}>
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => setShowShareSheet(true)}
              >
                <Share2 size={22} color="#2c2c2c" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.headerIcon}
                onPress={() => setShowSettings(true)}
              >
                <Settings size={22} color="#2c2c2c" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {/* User Information Block */}
            <View style={styles.userInfoCard}>
              <View style={styles.avatarSection}>
                <View style={styles.avatar}>
                  <ExpoImage 
                    source={require('../assets/images/Profilelumin.svg')} 
                    style={styles.avatarImage}
                    tintColor="#ffffff"
                    contentFit="contain"
                  />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userEmail}>[Email]</Text>
                  <Text style={styles.userGreeting}>Hello World</Text>
                </View>
              </View>
              
            </View>

            {/* Try On Credits Section */}
            <View style={styles.creditsSection}>
              <View style={styles.creditsInfo}>
                <Text style={styles.creditsText}>0 Try-On Credits Left</Text>
              </View>
              <TouchableOpacity style={styles.getMoreButton}>
                <Text style={styles.getMoreText}>Get More</Text>
              </TouchableOpacity>
            </View>

            {/* Orders Tab */}
            <TouchableOpacity style={styles.ordersSection}>
              <View style={styles.ordersLeft}>
                <Package size={20} color="#2c2c2c" />
                <Text style={styles.ordersTitle}>Orders</Text>
              </View>
              <ChevronRight size={20} color="#2c2c2c" />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Body Profile Section */}
            <View style={[styles.profileSection, { marginTop: 10 }]}>
              <Text style={styles.sectionTitle}>MY PROFILE</Text>
              <View style={styles.attributesList}>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Age</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Occupation</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Gender</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Body Shape</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Skin Tone</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Hair Type</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
                <View style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Shopping Platforms</Text>
                  <Text style={styles.attributeValue}>—</Text>
                </View>
              </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Your Style Profile Section */}
            <View style={[styles.profileSection, { marginTop: 10 }]}>
              <Text style={styles.sectionTitle}>YOUR STYLE PROFILE</Text>
              <View style={styles.attributesList}>
                <TouchableOpacity style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Color Analysis</Text>
                  <ChevronRight size={16} color="#2c2c2c" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Body Shape</Text>
                  <ChevronRight size={16} color="#2c2c2c" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.attributeItem}>
                  <Text style={styles.attributeText}>Face Shape</Text>
                  <ChevronRight size={16} color="#2c2c2c" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Bottom margin */}
            <View style={styles.bottomMargin} />
          </ScrollView>
        </View>
      </SafeAreaView>

      {/* Share Modal Popup - Rendered at root level */}
      {showShareSheet && (
        <Modal
          visible={showShareSheet}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <TouchableOpacity 
              style={styles.modalBackdrop}
              onPress={closeModal}
            />
            <Animated.View
              style={[styles.modalContent, { transform: [{ scale: scaleAnim }] }]}
            >
              <View style={styles.shareImageContainer}>
                <Image 
                  source={require('../assets/images/shareimage.jpg')} 
                  style={styles.shareBackgroundImage}
                  resizeMode="cover"
                />
                <View style={styles.shareTextOverlay}>
                  <Text style={styles.shareTitle}>Love Lumin? Share it</Text>
                  <Text style={styles.shareSubtitle}>Help your friends unleash their full glowing potential.</Text>
                </View>
                <TouchableOpacity style={styles.shareButton}>
                  <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </View>
        </Modal>
      )}
    </>
  );
}

// Settings Screen Component
function SettingsScreen({ onBack }: { onBack: () => void }) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { justifyContent: 'flex-start', alignItems: 'flex-end' }]}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBack}
          >
            <ChevronLeft size={24} color="#2c2c2c" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* CONTACT Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONTACT</Text>
            <View style={styles.optionsList}>
              <TouchableOpacity style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <Info size={20} color="#2c2c2c" />
                  <Text style={styles.optionText}>Report an issue</Text>
                </View>
                <ChevronRight size={20} color="#2c2c2c" style={styles.chevronRight} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <Lightbulb size={20} color="#2c2c2c" />
                  <Text style={styles.optionText}>Suggest new feature</Text>
                </View>
                <ChevronRight size={20} color="#2c2c2c" style={styles.chevronRight} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <HelpCircle size={20} color="#2c2c2c" />
                  <Text style={styles.optionText}>FAQs</Text>
                </View>
                <ChevronRight size={20} color="#2c2c2c" style={styles.chevronRight} />
              </TouchableOpacity>
            </View>
          </View>

          {/* ACCOUNT ACTIONS Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>ACCOUNT ACTIONS</Text>
            <View style={styles.optionsList}>
              <TouchableOpacity style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <LogOut size={20} color="#2c2c2c" />
                  <Text style={styles.optionText}>Sign Out</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.optionItem}>
                <View style={styles.optionLeft}>
                  <Trash2 size={20} color="#ef4444" />
                  <Text style={[styles.optionText, { color: '#ef4444' }]}>Delete Account</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
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
  headerIcon: {
    padding: 5,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  userInfoCard: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 0,
    height: 120,
    marginBottom: 24,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 300,
    borderWidth: 5,
    borderColor: '#e5e7eb',
    backgroundColor: '#e9d5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userDetails: {
    flex: 1,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c2c2c',
    fontFamily: 'undefined',
    marginBottom: 6,
  },
  userGreeting: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'undefined',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2c2c2c',
    fontFamily: 'NataSans',
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 0,
    paddingHorizontal:6,
    marginBottom: 20,
  },
  
  attributesList: {
    gap: 16,
  },
  attributeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  attributeText: {
    fontSize: 14,
    color: '#2c2c2c',
    fontFamily: 'undefined',
  },
  attributeValue: {
    fontSize: 14,
    color: '#6b7280',
    fontFamily: 'undefined',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 16,
  },
  bottomMargin: {
    height: 50, // Adjust as needed for the bottom margin
  },
  creditsSection: {
    backgroundColor: '#fff',
    borderRadius: 0,
    padding: 0,
    paddingHorizontal: 6,
    marginBottom: 20,
    
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditsInfo: {
    flex: 1,
  },
  creditsText: {
    fontSize: 14,
    color: '#2c2c2c',
    fontFamily: 'undefined',
  },
  getMoreButton: {
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  getMoreText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'undefined',
  },
  ordersSection: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ordersLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ordersTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c2c2c',
    fontFamily: 'undefined',
  },
  backButton: {
    padding: 0,
    marginRight: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c2c2c',
    fontFamily: 'PlayfairDisplay',
    marginBottom: 16,
  },
  optionsList: {
    gap: 14,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 14,
    color: '#2c2c2c',
    fontFamily: 'undefined',
  },
  chevronRight: {
    marginLeft: 'auto',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.76)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 28,
    padding: 0,
    width: '90%',
    alignItems: 'center',
    
  },
  shareContent: {
    flex: 1,
  },
  shareImageContainer: {
    width: '100%',
    height: 340,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 0,
    position: 'relative', // Added for absolute positioning
  },
  shareBackgroundImage: {
    width: '100%',
    height: '100%',
  },
  shareTextOverlay: {
    position: 'absolute',
    bottom: 0,
    height: 170,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.4)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.3)',
    borderRightWidth: 1,
    borderRightColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 9,
  },
  shareTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c2c2c',
    fontFamily: 'PlayfairDisplay',
    marginBottom: 5,
  },
  shareSubtitle: {
    fontSize: 14,
    color: '#2c2c2c',
    fontFamily: 'undefined',
  },
  shareButton: {
    position: 'absolute',
    bottom: 20,
    width: '90%',
    left: '5%',
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    zIndex: 1,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
    fontFamily: 'undefined',
  },
});
