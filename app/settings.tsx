import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { ChevronLeft, Info, Lightbulb, HelpCircle, LogOut, Trash2, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface SettingsProps {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: SettingsProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { justifyContent: 'flex-start', alignItems: 'flex-end' }] }>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
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
              <TouchableOpacity style={styles.optionItem} onPress={() => Linking.openURL('https://tally.so/r/nPPyZd')}>
                <View style={styles.optionLeft}>
                  <Info size={20} color="#2c2c2c" />
                  <Text style={styles.optionText}>Report an issue</Text>
                </View>
                <ChevronRight size={20} color="#2c2c2c" style={styles.chevronRight} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionItem} onPress={() => Linking.openURL('https://tally.so/r/wLojjG')}>
                <View style={styles.optionLeft}>
                  <Lightbulb size={20} color="#2c2c2c" />
                  <Text style={styles.optionText}>Suggest new feature</Text>
                </View>
                <ChevronRight size={20} color="#2c2c2c" style={styles.chevronRight} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionItem} onPress={() => Linking.openURL('https://tally.so/r/mRrQQp')}>
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
  backButton: {
    padding: 0,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2c2c2c',
    fontFamily: 'PlayfairDisplay',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
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
});


