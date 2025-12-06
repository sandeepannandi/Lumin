import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Animated } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = {
	onComplete?: () => void;
	onBack?: () => void;
};

const CASUAL_OPTIONS: { name: string; image: any }[] = [
	{ name: 'Casual 1', image: require('../assets/images/casualoutfit1.webp') },
	{ name: 'Casual 2', image: require('../assets/images/casualoutfit2.webp') },
	{ name: 'Casual 3', image: require('../assets/images/casualoutfit3.webp') },
	{ name: 'Casual 4', image: require('../assets/images/casualoutfit4.webp') },
	{ name: 'Casual 5', image: require('../assets/images/casualoutfit5.webp') },
	{ name: 'Casual 6', image: require('../assets/images/casualoutfit6.webp') },
	{ name: 'Casual 7', image: require('../assets/images/casualoutfit7.webp') },
	{ name: 'Casual 8', image: require('../assets/images/casualoutfit8.webp') },
	{ name: 'Casual 9', image: require('../assets/images/casualoutfit9.webp') },
	{ name: 'Casual 10', image: require('../assets/images/casualoutfit10.webp') },
	{ name: 'Casual 11', image: require('../assets/images/casualoutfit11.webp') },
	{ name: 'Casual 12', image: require('../assets/images/casualoutfit12.webp') },
	{ name: 'Casual 13', image: require('../assets/images/casualoutfit13.webp') },
	{ name: 'Casual 14', image: require('../assets/images/casualoutfit14.webp') },
	{ name: 'Casual 15', image: require('../assets/images/casualoutfit15.webp') },
	{ name: 'Casual 16', image: require('../assets/images/casualoutfit16.webp') },
	{ name: 'Casual 17', image: require('../assets/images/casualoutfit17.webp') },
	{ name: 'Casual 18', image: require('../assets/images/casualoutfit18.webp') },
];

export default function CasualPreferenceScreen({ onComplete, onBack }: Props) {
	const [selected, setSelected] = useState<string[]>([]);
	const [toastVisible, setToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const toastOpacity = useRef(new Animated.Value(0));

	const showToast = (message: string) => {
		setToastMessage(message);
		setToastVisible(true);
		Animated.timing(toastOpacity.current, { toValue: 1, duration: 200, useNativeDriver: true }).start(() => {
			setTimeout(() => {
				Animated.timing(toastOpacity.current, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => {
					setToastVisible(false);
				});
			}, 1400);
		});
	};

	const toggleSelection = (name: string) => {
		setSelected((prev) => {
			if (prev.includes(name)) {
				return prev.filter((n) => n !== name);
			}
			if (prev.length >= 5) {
				showToast('You can select up to 5 items');
				return prev;
			}
			return [...prev, name];
		});
	};

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}> 
				<Text style={styles.headline}>Tell Us About Yourself</Text>
			</View>

			{/* Content */}
			<ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
				<Text style={styles.label}>WHAT DO YOU PREFER FOR CASUAL OUTINGS? <Text style={styles.required}>*</Text></Text>
				<View style={styles.imageGrid}>
					{CASUAL_OPTIONS.map((option, index) => {
						const isSelected = selected.includes(option.name);
						return (
							<TouchableOpacity
								key={index}
								style={[styles.imageBox]}
								onPress={() => toggleSelection(option.name)}
							>
								<Image source={option.image} style={styles.optionImage} resizeMode="cover" />
								{isSelected && (
									<View style={styles.selectionOverlay}>
										<Check size={28} color="#2c2c2c" />
									</View>
								)}
							</TouchableOpacity>
						);
					})}
				</View>
			</ScrollView>

			{/* Footer Buttons */}
			<View style={styles.buttonRow}>
				<View style={styles.buttonsRow}>
					<TouchableOpacity style={styles.backBtn} onPress={onBack}>
						<ChevronLeft size={20} color="#2c2c2c" />
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.continueBtn, selected.length < 3 && styles.continueBtnDisabled]}
						onPress={onComplete}
						disabled={selected.length < 3}
					>
						<Text style={[styles.continueBtnText, selected.length < 3 && styles.continueBtnTextDisabled]}>Continue</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.noteBelow}>
					<Text style={styles.noteText}>Select at least 3 images</Text>
				</View>
			</View>
		{toastVisible && (
			<View style={styles.toastWrapper} pointerEvents="none">
				<Animated.View style={[styles.toastContainer, { opacity: toastOpacity.current }]}> 
					<Text style={styles.toastText}>{toastMessage}</Text>
				</Animated.View>
			</View>
		)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: '#fdfced' },
	header: { paddingHorizontal: 18, paddingTop: 38, paddingBottom: 0, backgroundColor: '#fdfced' },
	headline: { fontSize: 24, fontWeight: '600', color: '#2c2c2c', textAlign: 'center', marginBottom: 18, fontFamily: 'PlayfairDisplay' },
	scrollContent: { flex: 1, paddingHorizontal: 2 },
	label: { fontSize: 12, color: '#2c2c2c', fontWeight: '500', marginTop: 12, marginBottom: 6, textAlign: 'center' },
	required: { color: '#2c2c2c', fontWeight: '600' },
	imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 3, marginTop: 6, marginBottom: 206 },
	imageBox: {
		width: (width - 12) / 3,
		aspectRatio: 1,
		backgroundColor: 'transparent',
		borderRadius: 2,
		padding: 0,
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
	},
	selectionOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center', borderRadius: 2 },
	optionImage: { width: '100%', height: '160%', borderRadius: 2 },
	buttonRow: {
		paddingHorizontal: 18,
		paddingBottom: 70,
		paddingTop: 20,
		backgroundColor: '#fdfced',
		borderTopWidth: 0,
		borderTopColor: '#e5e5e5',
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	buttonsRow: { flexDirection: 'row', alignItems: 'flex-start' },
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
	continueBtn: {
		backgroundColor: '#2c2c2c',
		borderRadius: 28,
        boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)',
		paddingVertical: 14,
		alignItems: 'center',
		flex: 1,
		height: 52,
	},
	continueBtnDisabled: { backgroundColor: '#e5e5e5' },
	continueBtnText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
	continueBtnTextDisabled: { color: '#9CA3AF' },
	noteInRow: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	noteBelow: { marginTop: 16, alignItems: 'center', justifyContent: 'center' },
	noteText: { fontSize: 12, color: '#6b7280' },
	toastWrapper: { position: 'absolute', left: 0, right: 0, bottom: 224, alignItems: 'center' },
	toastContainer: { backgroundColor: '#404040', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
	toastText: { color: '#ffffff', fontSize: 12, fontWeight: '500' },
});


