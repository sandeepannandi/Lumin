import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image, Animated } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = {
	onComplete?: () => void;
	onBack?: () => void;
};

const STYLE_OPTIONS: { name: string; image: any }[] = [
	{ name: 'Low Neck', image: require('../assets/images/lowneck.jpg') },
	{ name: 'Off Shoulder', image: require('../assets/images/offshoulder.jpg') },
	{ name: 'Backless', image: require('../assets/images/backless.jpg') },
	{ name: 'Above The Knee', image: require('../assets/images/abovetheknee.webp') },
	{ name: 'Cropped', image: require('../assets/images/cropped.jpg') },
	{ name: 'Bodycon', image: require('../assets/images/bodycon.webp') },
	{ name: 'Sleeveless', image: require('../assets/images/sleeveless.jpg') },
	

];

export default function StylesNeverWearScreen({ onComplete, onBack }: Props) {
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
			<View style={styles.header}>
				<Text style={styles.headline}>Tell Us About Yourself</Text>
			</View>

			<ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
				<Text style={styles.label}>STYLES YOU <Text style={{ color: '#ff2d2d' }}>NEVER</Text> WEAR? <Text style={styles.required}>*</Text></Text>
				<View style={styles.imageGrid}>
					{STYLE_OPTIONS.map((option, index) => {
						const isSelected = selected.includes(option.name);
						return (
							<TouchableOpacity key={index} style={styles.imageBox} onPress={() => toggleSelection(option.name)}>
								<View style={styles.imageContainer}>
									<Image source={option.image} style={styles.optionImage} resizeMode="cover" />
									{isSelected && (
										<View style={styles.selectionOverlay}>
											<Check size={28} color="#2c2c2c" />
										</View>
									)}
								</View>
								<Text style={styles.optionLabel}>{option.name}</Text>
							</TouchableOpacity>
						);
					})}
				</View>
			</ScrollView>

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
	imageGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 3, marginTop: 6, marginBottom: 18 },
	imageBox: {
		width: (width - 12) / 3,
		backgroundColor: 'transparent',
		borderRadius: 2,
		padding: 0,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	imageContainer: {
		width: '100%',
		aspectRatio: 1,
		borderRadius: 2,
		overflow: 'hidden',
	},
	selectionOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.5)', alignItems: 'center', justifyContent: 'center', borderRadius: 2 },
	optionImage: { width: '100%', height: '100%' },
	optionLabel: { fontSize: 11, color: '#2c2c2c', marginTop: 6, marginBottom: 12 },
	buttonRow: { paddingHorizontal: 18, paddingBottom: 70, paddingTop: 20, backgroundColor: '#fdfced', borderTopWidth: 0, borderTopColor: '#e5e5e5', flexDirection: 'column', alignItems: 'stretch' },
	buttonsRow: { flexDirection: 'row', alignItems: 'flex-start' },
	backBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 28, paddingHorizontal: 0, paddingVertical: 0, width: 52, height: 52, justifyContent: 'center', borderWidth: 0, marginRight: 10, borderColor: '#e5e5e5' },
	continueBtn: { backgroundColor: '#2c2c2c', borderRadius: 28, boxShadow: '0 0 12px rgba(255, 105, 180, 0.4)', paddingVertical: 14, alignItems: 'center', flex: 1, height: 52 },
	continueBtnDisabled: { backgroundColor: '#e5e5e5' },
	continueBtnText: { color: '#ffffff', fontWeight: '600', fontSize: 16 },
	continueBtnTextDisabled: { color: '#9CA3AF' },
	noteBelow: { marginTop: 16, alignItems: 'center', justifyContent: 'center' },
	noteText: { fontSize: 12, color: '#6b7280' },
	toastWrapper: { position: 'absolute', left: 0, right: 0, bottom: 224, alignItems: 'center' },
	toastContainer: { backgroundColor: '#404040', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 10 },
	toastText: { color: '#ffffff', fontSize: 12, fontWeight: '500' },
});


