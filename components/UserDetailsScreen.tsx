import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const AGES = ['<18', '18-25', '26-35', '36-45', '45+'];
const GENDERS = ['Female', 'Male', 'Other'];
const OCCUPATIONS = ['College Student', 'Working Professional', 'School Student', 'Other'];
const BRANDS = [
  [
    { name: 'H&M', logo: require('../assets/images/h&m.png') },
    { name: 'Myntra', logo: require('../assets/images/myntra.jpg') },
    { name: 'AJIO', logo: require('../assets/images/ajio.jpg') },
    { name: 'Nykaa', logo: require('../assets/images/nykaa.png') },
    { name: 'Sarvana', logo: require('../assets/images/sarvana.png') },
  ],
  [
    { name: 'Meesho', logo: require('../assets/images/meesho.png') },
    { name: 'Flipkart', logo: require('../assets/images/flipkart.png') },
    { name: 'Amazon', logo: require('../assets/images/amazon.png') },
    { name: 'Zudio', logo: require('../assets/images/zudio.jpg') },
    { name: 'Shopsy', logo: require('../assets/images/shopsy.jpeg') },
  ],
  [
    { name: 'ZARA', logo: require('../assets/images/zara.png') },
    { name: 'Nykaa', logo: require('../assets/images/nykaa.png') },
    { name: 'Mango', logo: require('../assets/images/mango.png') },
    { name: 'ONLY', logo: require('../assets/images/only.png') },
    { name: 'Urbanic', logo: require('../assets/images/urbanic.png') },
  ],
];

export default function UserDetailsScreen({ onComplete }: { onComplete?: () => void }) {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [brandRow, setBrandRow] = useState(-1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.headline}>Tell Us About Yourself</Text>
      {/* Age */}
      <Text style={styles.label}>AGE <Text style={styles.required}>*</Text></Text>
      <View style={styles.rowWrap}>
        {AGES.map(a => (
          <TouchableOpacity
            key={a}
            style={[styles.chip, age === a && styles.chipActive]}
            onPress={() => setAge(a)}
          >
            <Text style={[styles.chipText, age === a && styles.chipTextActive]}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Gender */}
      <Text style={styles.label}>GENDER <Text style={styles.required}>*</Text></Text>
      <View style={styles.rowWrap}>
        {GENDERS.map(g => (
          <TouchableOpacity
            key={g}
            style={[styles.chip, gender === g && styles.chipActive]}
            onPress={() => setGender(g)}
          >
            <Text style={[styles.chipText, gender === g && styles.chipTextActive]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Occupation */}
      <Text style={styles.label}>WHAT DO YOU DO? <Text style={styles.required}>*</Text></Text>
      <View style={styles.rowWrap}>
        {OCCUPATIONS.map(o => (
          <TouchableOpacity
            key={o}
            style={[styles.chip, occupation === o && styles.chipActive]}
            onPress={() => setOccupation(o)}
          >
            <Text style={[styles.chipText, occupation === o && styles.chipTextActive]}>{o}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Brands/Platforms */}
      <Text style={[styles.label, { marginBottom: 12 }]}>WHICH BRANDS OR SHOPPING PLATFORM DO YOU LIKE THE MOST? <Text style={styles.required}>*</Text></Text>
      {BRANDS.map((row, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.brandRow, brandRow === i && styles.brandRowActive]}
          onPress={() => setBrandRow(i)}
        >
          {row.map(b => (
            <View key={b.name} style={styles.brandCell}>
              <Image source={b.logo} style={styles.brandLogo} />
              <Text style={styles.brandName}>{b.name}</Text>
            </View>
          ))}
        </TouchableOpacity>
      ))}
      {/* Continue Button */}
      <TouchableOpacity style={styles.continueBtn} onPress={onComplete}>
        <Text style={styles.continueBtnText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdfced',
    paddingHorizontal: 18,
    paddingTop: 38,
  },
  headline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: 18,
    fontFamily: 'PlayfairDisplay',
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
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 28,
    marginBottom: 10,
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#ffffff',
  },
  brandRowActive: {
    borderColor: '#2c2c2c',
    backgroundColor: '#f5f5f5',
  },
  brandCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandLogo: {
    width: 30,
    height: 30,
    marginBottom: 2,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  brandName: {
    fontSize: 10,
    color: '#2c2c2c',
    textAlign: 'center',
  },
  continueBtn: {
    backgroundColor: '#2c2c2c',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 18,
    width: '100%',
    alignSelf: 'center',
    boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
    height: 52,
    marginBottom: 24,
  },
  continueBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 