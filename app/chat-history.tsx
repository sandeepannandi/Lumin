import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatHistoryScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Chat History</Text>
          <TouchableOpacity style={styles.headerIcon}>
            <ShoppingBag size={22} color="#2c2c2c" />
          </TouchableOpacity>
        </View>

        {/* Main Content (Empty State for now) */}
        <View style={styles.mainContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/wardrobe.jpg')}
              style={styles.mainImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.textSection}>
            <Text style={styles.subText}>Your past conversations will appear here</Text>
          </View>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.buttonText}>Ask Lumin</Text>
          </TouchableOpacity>
        </View>
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
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: '80%',
    height: 250,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 10,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subText: {
    fontSize: 13,
    width: 260,
    color: '#6B7280',
    fontFamily: 'undefined',
    textAlign: 'center',
  },
  mainButton: {
    backgroundColor: '#2c2c2c',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 28,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'undefined',
    textAlign: 'center',
  },
});


