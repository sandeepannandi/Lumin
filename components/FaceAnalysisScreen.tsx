import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import CameraUploadIcon from './CameraUploadIcon';

export default function FaceAnalysisScreen({ onComplete, onBack }: { onComplete?: () => void; onBack?: () => void }) {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions to upload images.');
      return false;
    }
    return true;
  };

  const handleImageUpload = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        setUploadedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>Tell Us About Yourself</Text>
        <Text style={styles.instructionText}>UPLOAD AN IMAGE TO ANALYZE FACE SHAPE <Text style={{ color: '#2C2C2C' }}>*</Text></Text>
      </View>

      {/* Image Upload Box */}
      <TouchableOpacity style={[styles.uploadBox, uploadedImage && styles.uploadBoxWithImage]} onPress={handleImageUpload}>
        {uploadedImage ? (
          <Image source={{ uri: uploadedImage }} style={styles.previewImage} resizeMode="cover" />
        ) : (
          <CameraUploadIcon />
        )}
      </TouchableOpacity>

      {/* Bottom Panel */}
      <View style={styles.bottomPanel}>
        <View style={styles.card}>
          <Image source={require('../assets/images/tryoutimg.jpg')} style={styles.avatar} resizeMode="cover" />
          <View style={styles.cardTextWrap}>
            <Text style={styles.cardTitle}>Try out with this image</Text>
            <Text style={styles.cardSubtitle}>Witness how our AI recommends you color preference</Text>
          </View>
          <TouchableOpacity style={styles.chevronButton}>
            <ChevronRight size={22} color="#2C2C2C" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Fixed Buttons */}
      <View style={styles.buttonRow}>
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ChevronLeft size={20} color="#2c2c2c" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.continueBtn} onPress={onComplete}>
            <Text style={styles.continueBtnText}>Okay with all</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const BORDER = '#3b5cff';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfced' },
  header: { paddingHorizontal: 18, paddingTop: 38, paddingBottom: 0, backgroundColor: '#fdfced' },
  headline: { fontSize: 24, fontWeight: '600', color: '#2c2c2c', textAlign: 'center', marginBottom: 18, fontFamily: 'PlayfairDisplay' },
  instructionText: { fontSize: 12, color: '#2c2c2c', textAlign: 'center', marginTop: 12, fontWeight: 500, marginBottom: 6 },
  uploadBox: {
    marginTop: 14,
    marginHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#2c2c2c',
    borderStyle: 'dashed',
    height: 430,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  uploadBoxWithImage: {
    borderWidth: 0,
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12
  },
  bottomPanel: { flex: 1, marginTop: 16, backgroundColor: 'transparent', borderTopLeftRadius: 18, borderTopRightRadius: 18, paddingTop: 18, paddingBottom: 20 },
  card: { marginHorizontal: 20, backgroundColor: '#ffffff', borderRadius: 20, paddingVertical: 20, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', shadowColor: 'transparent', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, marginRight: 12 },
  cardTextWrap: { flex: 1, marginRight: 10 },
  cardTitle: { color: '#2C2C2C', fontSize: 14, marginBottom: 4, fontWeight: '500' },
  cardSubtitle: { color: '#2C2C2C', fontSize: 12, marginBottom: 0, fontWeight: '400' },
  chevronButton: { padding: 2 },
  buttonRow: { paddingHorizontal: 18, paddingBottom: 70, paddingTop: 20, backgroundColor: '#fdfced', borderTopWidth: 0, borderTopColor: '#e5e5e5', flexDirection: 'column', alignItems: 'stretch' },
  buttonsRow: { flexDirection: 'row', alignItems: 'flex-start' },
  backBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 28, paddingHorizontal: 0, paddingVertical: 0, width: 52, height: 52, justifyContent: 'center', borderWidth: 0, marginRight: 10, borderColor: '#e5e5e5' },
  continueBtn: { backgroundColor: '#2c2c2c', borderRadius: 28, boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)', paddingVertical: 14, alignItems: 'center', flex: 1, height: 52 },
  continueBtnText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
});
