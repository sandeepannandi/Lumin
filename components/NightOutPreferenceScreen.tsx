import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { ChevronLeft, Check } from 'lucide-react-native';

const { width } = Dimensions.get('window');

type Props = {
	onComplete?: () => void;
	onBack?: () => void;
};

const CASUAL_OPTIONS: { name: string; image: any }[] = [
	{ name: 'Dresses', image: require('../assets/images/dresses.jpg') },
	{ name: 'Tops', image: require('../assets/images/tops.jpg') },
	{ name: 'Trousers', image: require('../assets/images/trousers.jpg') },
	{ name: 'Skirts', image: require('../assets/images/skirts.jpg') },
	{ name: 'Jeans', image: require('../assets/images/jeans.jpg') },
	{ name: 'Accessories', image: require('../assets/images/accessories.jpg') },
	{ name: 'Footwear', image: require('../assets/images/footwear.jpg') },
	{ name: 'Bags', image: require('../assets/images/bags.jpg') },
	{ name: 'Kurti', image: require('../assets/images/kurti.jpg') },
	{ name: 'Saree', image: require('../assets/images/saree.jpg') },
	{ name: 'Casual', image: require('../assets/images/casual.jpg') },
	{ name: 'Office', image: require('../assets/images/office.jpg') },
	{ name: 'College', image: require('../assets/images/college.jpg') },
	{ name: 'Travel', image: require('../assets/images/travel.jpg') },
	{ name: 'Party', image: require('../assets/images/party.jpg') },
	{ name: 'Night Out', image: require('../assets/images/nightout.jpg') },
	{ name: 'Birthday', image: require('../assets/images/birthday.jpg') },
	{ name: 'Gym', image: require('../assets/images/gym.jpg') },
];

export default function NightOutPreferenceScreen({ onComplete, onBack }: Props) {
	const [selected, setSelected] = useState<string[]>([]);

	const toggleSelection = (name: string) => {
		setSelected((prev) => {
			if (prev.includes(name)) {
				return prev.filter((n) => n !== name);
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
				<Text style={styles.label}>WHAT IS YOUR TASTE FOR NIGHT OUTS? <Text style={styles.required}>*</Text></Text>
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
		paddingBottom: 96,
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
	noteBelow: { marginTop: 16, alignItems: 'center', justifyContent: 'center' },
	noteText: { fontSize: 12, color: '#6b7280' },
});


