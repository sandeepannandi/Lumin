import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { ChevronLeft, Sparkles } from 'lucide-react-native';
import { SvgUri } from 'react-native-svg';
import { Asset } from 'expo-asset';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

interface VirtualTryOnProps {
  onBack?: () => void;
}

function LocalSvgIcon({ source, size = 18 }: { source: any; size?: number }) {
  const asset = Asset.fromModule(source);
  return (
    <View style={styles.iconCircle}>
      <SvgUri uri={asset.uri} width={size} height={size} fill="#ffffff" color="#ffffff" />
    </View>
  );
}

export default function VirtualTryOnScreen({ onBack }: VirtualTryOnProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <LinearGradient colors={['#FFFFFF', '#F3E5F5']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <ChevronLeft size={22} color="#2c2c2c" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Try Items on Yourself</Text>
          <View style={{ width: 22, height: 22 }} />
        </View>

        {/* Main Content */}
        <ScrollView contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>

          <View style={styles.rowsContainer}>
            {/* Row 1: Image left, Text right */}
            <View style={styles.row}>
              <View style={styles.rowImageWrap}>
                <Image source={require('../assets/images/accesorize.jpg')} style={styles.rowImage} resizeMode="cover" />
              </View>
              <View style={styles.rowTextWrap}>
                <View style={styles.rowTextHeader}>
                  <View style={styles.iconCircleDark}> 
                    <LocalSvgIcon source={require('../assets/images/profilescan.svg') } size={14} />
                  </View>
                </View>
                <Text style={styles.rowSubtitle}>Upload your selfie and full body image</Text>
              </View>
            </View>

            {/* Row 2: Text left, Image right */}
            <View style={styles.row}>
              <View style={styles.rowTextWrap}>
                <View style={styles.rowTextHeader}>
                  <View style={styles.iconCircleDark}>
                    <Sparkles size={14} color="#ffffff" />
                  </View>
                </View>
                <Text style={styles.rowSubtitle}>We'll build you avatar to match your face and body shape</Text>
              </View>
              <View style={styles.rowImageWrap}>
                <Image source={require('../assets/images/tryon.png')} style={styles.rowImage} resizeMode="cover" />
              </View>
            </View>

            {/* Row 3: Image left, Text right */}
            <View style={styles.row}>
              <View style={styles.rowImageWrap}>
                <Image source={require('../assets/images/shoppingbags.jpg')} style={styles.rowImage} resizeMode="cover" />
              </View>
              <View style={styles.rowTextWrap}>
                <View style={styles.rowTextHeader}>
                  <View style={styles.iconCircleDark}>
                    <Image source={require('../assets/images/hanger.png')} style={{ width: 18, height: 18 }} />
                  </View>
                </View>
                <Text style={styles.rowSubtitle}>Preview hairsyles, makeup, and accessories on your avatar</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
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
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 0,
    marginRight: 10,
    marginTop: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c2c2c',
    fontFamily: 'PlayfairDisplay',
    textAlign: 'center',
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexGrow: 1,
  },
  headline: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c2c2c',
    textAlign: 'center',
    marginTop: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 20,
  },
  rowsContainer: {
    gap: 0,
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: 52,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowImageWrap: {
    flex: 0.8,
    height: 160,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f3f4f6',
  },
  rowImage: {
    width: '100%',
    height: '100%',
  },
  rowTextWrap: {
    flex: 1,
  },
  rowTextHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  rowSubtitle: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
    lineHeight: 20,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleDark: {
    width: 24,
    height: 24,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  continueButton: {
    marginTop: 12,
    backgroundColor: '#2c2c2c',
    paddingVertical: 14,
    marginBottom: 18,
    borderRadius: 28,
    height: 52,
    alignItems: 'center',
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
  },
  continueText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});


