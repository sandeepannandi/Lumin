import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const BODY_SHAPES = [
  { name: 'Apple', image: require('../assets/images/applebodyshape.webp') },
  { name: 'Pear', image: require('../assets/images/pearbodyshape.webp') },
  { name: 'Hourglass', image: require('../assets/images/hourglassbodyshape.webp') },
  { name: 'Triangle', image: require('../assets/images/trianglebodyshape.webp') },
  { name: 'Rectangle', image: require('../assets/images/rectanglebodyshape.webp') }
];
const BODY_SIZES = ['Petite', 'Skinny', 'Average', 'Athletic', 'Plus-size'];
const SKIN_TONES = [
  { name: 'Very Fair', color: '#FFDBB4' },
  { name: 'Fair', color: '#EDB98A' },
  { name: 'Light', color: '#D08B5B' },
  { name: 'Medium', color: '#AE5D29' },
  { name: 'Medium-Dark', color: '#8D4A43' },
  { name: 'Dark', color: '#5C3836' },
  { name: 'Very Dark', color: '#2D1810' }
];

export default function BodyDetailsScreen({ onComplete, onBack }: { onComplete?: () => void; onBack?: () => void }) {
  const [bodyShape, setBodyShape] = useState('');
  const [bodySize, setBodySize] = useState('');
  const [skinTone, setSkinTone] = useState('');

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>Tell Us About Yourself</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Body Shape */}
        <Text style={styles.label}>BODY SHAPE <Text style={styles.required}>*</Text></Text>
        <View style={styles.imageGrid}>
          {BODY_SHAPES.map((shape, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.imageBox,
                bodyShape === shape.name && styles.selectedImageBox
              ]}
              onPress={() => setBodyShape(shape.name)}
            >
              <Image source={shape.image} style={styles.shapeImage} />
              <Text style={[
                styles.imageLabel,
                bodyShape === shape.name && styles.selectedImageLabel
              ]}>
                {shape.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Body Size */}
        <Text style={[styles.label, { marginTop: 34 }]}>BODY SIZE <Text style={styles.required}>*</Text></Text>
        <View style={styles.rowWrap}>
          {BODY_SIZES.map((size, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.chip,
                bodySize === size && styles.chipActive
              ]}
              onPress={() => setBodySize(size)}
            >
              <Text style={[
                styles.chipText,
                bodySize === size && styles.chipTextActive
              ]}>
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Skin Tone */}
        <Text style={styles.label}>SKIN TONE <Text style={styles.required}>*</Text></Text>
        <View style={styles.skinToneGrid}>
          {SKIN_TONES.map((tone, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.skinToneBox,
                skinTone === tone.name && styles.selectedSkinToneBox
              ]}
              onPress={() => setSkinTone(tone.name)}
            >
              <View style={[
                styles.skinToneCircle,
                { backgroundColor: tone.color }
              ]} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Fixed Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backBtn} onPress={onBack}>
          <ChevronLeft size={20} color="#2c2c2c" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.continueBtn, 
            (!bodyShape || !bodySize || !skinTone) && styles.continueBtnDisabled
          ]} 
          onPress={onComplete}
          disabled={!bodyShape || !bodySize || !skinTone}
        >
          <Text style={[
            styles.continueBtnText,
            (!bodyShape || !bodySize || !skinTone) && styles.continueBtnTextDisabled
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfced',
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 38,
    paddingBottom: 0,
    backgroundColor: '#fdfced',
  },
  headline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 18,
    fontFamily: 'PlayfairDisplay',
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 18,
  },
  label: {
    fontSize: 12,
    color: '#2c2c2c',
    fontWeight: '500',
    marginTop: 12,
    marginBottom: 6,
  },
  required: {
    color: '#2c2c2c',
    fontWeight: '600',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
    marginTop: 6,
    marginBottom: 6,
  },
  imageBox: {
    width: (width - 80) / 3,
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedImageBox: {
    borderColor: '#2c2c2c',
    backgroundColor: '#fff',
  },
  shapeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 0,
  },
  imageLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: '#2c2c2c',
    textAlign: 'center',
  },
  selectedImageLabel: {
    color: '#2c2c2c',
    fontWeight: '500',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chipActive: {
    backgroundColor: '#2c2c2c',
  },
  chipText: {
    color: '#2c2c2c',
    fontWeight: '500',
    fontSize: 14,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'sans-serif',
  },
  skinToneCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  skinToneGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 6,
    marginTop: 6,
    marginBottom: 6,
  },
  skinToneBox: {
    width: (width - 100) / 7,
    aspectRatio: 1,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedSkinToneBox: {
    borderColor: '#2c2c2c',
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
    marginBottom: 100,
    paddingVertical: 0,
    backgroundColor: '#fdfced',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 28,
    paddingHorizontal: 0,
    paddingVertical: 0,
    width: 52,
    height: 52,
    justifyContent: 'center',
    borderWidth: 0,
    marginRight: 10,
    borderColor: '#e5e5e5',
  },
  backBtnText: {
    color: '#2c2c2c',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 4,
  },
  continueBtn: {
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    flex: 2,
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
    height: 52,
  },
  continueBtnDisabled: {
    backgroundColor: '#e5e5e5',
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
  },
  continueBtnText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
  continueBtnTextDisabled: {
    color: '#9CA3AF',
  },
});
