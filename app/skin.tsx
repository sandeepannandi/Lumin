import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { Image as RNImage } from 'react-native';
import LottieView from 'lottie-react-native';
import { ShoppingBag, History, Camera, ArrowRight, Heart, ArrowLeft, ChevronLeft } from 'lucide-react-native';
import GridBackground from '../components/GridBackground';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

interface SkinScreenProps {
  onBack?: () => void;
  onNavigateToHair?: () => void;
  onNavigateToHome?: () => void;
  onNavigateToChatHistory?: () => void;
  onNavigateToAskWithFocus?: () => void;
  onNavigateToBag?: () => void;
  onNavigateToVirtualTryOn?: () => void;
}

export default function SkinScreen({ onBack, onNavigateToHair, onNavigateToHome, onNavigateToChatHistory, onNavigateToAskWithFocus, onNavigateToBag, onNavigateToVirtualTryOn }: SkinScreenProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [showFloatingSearch, setShowFloatingSearch] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const suggestions = [
    'lumin',
    'for skin care',
    'your skin expert',
    'for skin products',
    'for skin advice',
    'for skin trends',
    'for skin routine'
  ];

  const featuredItems = [
    { id: 1, title: 'Summer Skin', subtitle: 'Light & Breezy', image: require('../assets/images/f1.png') },
    { id: 2, title: 'Winter Skin', subtitle: 'Cozy & Warm', image: require('../assets/images/f2.png') },
    { id: 3, title: 'Party Skin', subtitle: 'Elegant & Glamorous', image: require('../assets/images/f3.png') },
    { id: 4, title: 'Casual Skin', subtitle: 'Comfortable & Stylish', image: require('../assets/images/f4.png') },
    { id: 5, title: 'Office Skin', subtitle: 'Professional & Chic', image: require('../assets/images/f5.png') },
    { id: 6, title: 'Weekend Skin', subtitle: 'Relaxed & Trendy', image: require('../assets/images/f6.png') },
    { id: 7, title: 'Date Night Skin', subtitle: 'Romantic & Alluring', image: require('../assets/images/f7.png') },
    { id: 8, title: 'Travel Skin', subtitle: 'Versatile & Practical', image: require('../assets/images/f8.png') },
    { id: 9, title: 'Athleisure Skin', subtitle: 'Active & Fashionable', image: require('../assets/images/f9.png') },
    { id: 10, title: 'Evening Skin', subtitle: 'Sophisticated & Elegant', image: require('../assets/images/f10.png') },
    { id: 11, title: 'Street Skin', subtitle: 'Urban & Edgy', image: require('../assets/images/f11.png') }
  ];

  const slideAnim = useRef(new Animated.Value(0)).current;
  const featuredScrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        animateTextChange();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentTextIndex, isAnimating]);

  // Auto-scroll featured carousel every 4 seconds
  useEffect(() => {
    const featuredInterval = setInterval(() => {
      setCurrentFeaturedIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % featuredItems.length;
        // Scroll to the next item
        if (featuredScrollRef.current) {
          featuredScrollRef.current.scrollTo({
            x: nextIndex * Dimensions.get('window').width, // Full screen width
            animated: true
          });
        }
        return nextIndex;
      });
    }, 4000);

    return () => clearInterval(featuredInterval);
  }, [featuredItems.length]);

  const animateTextChange = () => {
    setIsAnimating(true);
    
    // Slide current text up and out
    Animated.timing(slideAnim, {
      toValue: -1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Change text
      setCurrentTextIndex((prev) => (prev + 1) % suggestions.length);
      
      // Reset position and slide new text in from bottom
      slideAnim.setValue(1);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <GridBackground gridSize={30} gridColor="#e4e4e7" backgroundColor="#ffffff">
      {/* Floating Search Bar */}
      {showFloatingSearch && (
        <View style={styles.floatingSearchBar}>
          <TouchableOpacity activeOpacity={0.9} onPress={onNavigateToAskWithFocus} style={styles.searchBar}>
            <View style={styles.searchLeft}>
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require('../assets/lottie/fixedblur.json')}
                  style={styles.lottieIcon}
                  autoPlay={true}
                  loop={true}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.placeholderContainer}>
                <Text style={styles.fixedText}>Ask </Text>
                <Animated.View style={[
                  styles.animatedTextContainer,
                  {
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [-10, 0, 10],
                      })
                    }]
                  }
                ]}>
                  <Text style={styles.animatedText}>
                    {suggestions[currentTextIndex]}
                  </Text>
                </Animated.View>
              </View>
            </View>
            <View style={styles.cameraButton}>
              <Camera size={22} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={(event) => {
          const currentScrollY = event.nativeEvent.contentOffset.y;
          setScrollY(currentScrollY);
          // Show floating search bar instantly when scrolled past header
          setShowFloatingSearch(currentScrollY > 50);
        }}
        scrollEventThrottle={0}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ChevronLeft size={22} color="#2c2c2c" />
            </TouchableOpacity>
            <Text style={styles.logo}>Skin Care</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={onNavigateToBag}>
              <ShoppingBag size={22} color="#2c2c2c" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={onNavigateToChatHistory}>
              <History size={22.8} color="#2c2c2c" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={onNavigateToAskWithFocus} style={styles.searchBar}>
            <View style={styles.searchLeft}>
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require('../assets/lottie/fixedblur.json')}
                  style={styles.lottieIcon}
                  autoPlay={true}
                  loop={true}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.placeholderContainer}>
                <Text style={styles.fixedText}>Ask </Text>
                <Animated.View style={[
                  styles.animatedTextContainer,
                  {
                    transform: [{
                      translateY: slideAnim.interpolate({
                        inputRange: [-1, 0, 1],
                        outputRange: [-10, 0, 10],
                      })
                    }]
                  }
                ]}>
                  <Text style={styles.animatedText}>
                    {suggestions[currentTextIndex]}
                  </Text>
                </Animated.View>
              </View>
            </View>
            <View style={styles.cameraButton}>
              <Camera size={22} color="#6B7280" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Category Section */}
        <View style={styles.categorySection}>
          <View style={styles.categoryContainer}>
            {/* First Row */}
            <View style={styles.categoryRow}>
              {[
                { name: 'Cleanser', image: require('../assets/images/cleanser.jpg') },
                { name: 'Moisturizer', image: require('../assets/images/moisturizer.jpg') },
                { name: 'Sunscreen', image: require('../assets/images/sunscreen.jpg') },
                { name: 'Serum', image: require('../assets/images/serum.jpg') },
              ].map((category, index) => (
                <TouchableOpacity key={index} style={styles.categoryItem}>
                  <View style={styles.categoryImageContainer}>
                    <RNImage source={category.image} style={[
                      styles.categoryImage,
                      category.name === 'Moisturizer' && styles.longBobImage
                    ]} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* Second Row */}
            <View style={styles.categoryRow}>
              {[
                { name: 'Toner', image: require('../assets/images/toner.jpg') },
                { name: 'Mask', image: require('../assets/images/mask.jpg') },
                { name: 'Exfoliator', image: require('../assets/images/exfoliator.jpg') }
              ].map((category, index) => (
                <TouchableOpacity key={index + 5} style={styles.categoryItem}>
                  <View style={styles.categoryImageContainer}>
                    <RNImage source={category.image} style={styles.categoryImage} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Also Discover Section */}
        <View style={styles.discoverSection}>
          <Text style={styles.discoverTitle}>Also Discover</Text>
          <View style={styles.discoverContainer}>
            <TouchableOpacity style={styles.discoverBox} onPress={async () => { try { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}; onNavigateToHair && onNavigateToHair(); }}>
              <View style={styles.discoverImageContainer}>
                <RNImage source={require('../assets/images/haircare.jpg')} style={styles.discoverImage} />
              </View>
              <Text style={styles.discoverName}>Hair Care</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discoverBox} onPress={async () => { try { await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}; onNavigateToHome && onNavigateToHome(); }}>
              <View style={styles.discoverImageContainer}>
                <RNImage source={require('../assets/images/fashion.jpg')} style={styles.discoverImage} />
              </View>
              <Text style={styles.discoverName}>Fashion</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section */}
        <View style={styles.featuredSection}>
         <Text style={styles.featuredTitle}>Featured</Text>
         <View style={styles.featuredCarouselContainer}>
            <ScrollView
              ref={featuredScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              snapToInterval={Dimensions.get('window').width}
              decelerationRate="fast"
              contentContainerStyle={styles.featuredContainer}
              onMomentumScrollEnd={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const newIndex = Math.round(offsetX / Dimensions.get('window').width);
                setCurrentFeaturedIndex(newIndex);
              }}
            >
             {featuredItems.map((item, index) => (
               <View key={item.id} style={styles.featuredItem}>
                 <Image source={item.image} style={styles.featuredImage} cachePolicy="memory-disk" />
               </View>
             ))}
           </ScrollView>
           
           {/* Page Indicator Dots Overlay */}
           <View style={styles.pageIndicatorOverlay}>
             {featuredItems.map((_, index) => (
               <View
                 key={index}
                 style={[
                   styles.pageIndicatorDot,
                   index === currentFeaturedIndex && styles.pageIndicatorDotActive
                 ]}
               />
             ))}
           </View>
         </View>
       </View>

        

        {/* Virtual Try-On Section */}
        <View style={styles.virtualTryOnSection}>
        <TouchableOpacity style={styles.virtualTryOnContainer} onPress={onNavigateToVirtualTryOn}>
            <RNImage source={require('../assets/images/skintryon.png')} style={styles.virtualTryOnBackground} />
            <View style={styles.virtualTryOnOverlay}>
              <Text style={styles.virtualTryOnTitle}>VIRTUAL TRY-ON</Text>
              <View style={styles.virtualTryOnSubtitleContainer}>
                <Text style={styles.virtualTryOnSubtitle}>Try Now</Text>
                <ArrowRight size={14} color="#ffffff" style={styles.arrowIcon} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* For You Section */}
        <View style={styles.forYouSection}>
          <Text style={styles.forYouTitle}>For You</Text>
          <View style={styles.staggeredGrid}>
            <View style={styles.leftColumn}>
              <TouchableOpacity style={styles.gridItem}>
                <RNImage source={require('../assets/images/wedding.jpg')} style={styles.gridImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Heart size={18} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridItem}>
                <RNImage source={require('../assets/images/party.jpg')} style={styles.gridImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Heart size={18} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridItem}>
                <RNImage source={require('../assets/images/college.jpg')} style={styles.gridImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Heart size={18} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
            <View style={styles.rightColumn}>
              <TouchableOpacity style={styles.gridItem}>
                <RNImage source={require('../assets/images/office.jpg')} style={styles.gridImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Heart size={18} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridItem}>
                <RNImage source={require('../assets/images/casual.jpg')} style={styles.gridImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Heart size={18} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity style={styles.gridItem}>
                <RNImage source={require('../assets/images/datenight.jpg')} style={styles.gridImage} />
                <TouchableOpacity style={styles.heartIcon}>
                  <Heart size={18} color="#ffffff" />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
      </GridBackground>
    </SafeAreaView>
  );
}

 const styles = StyleSheet.create({
   safeArea: {
     flex: 1,
   },
   container: {
     flex: 1,
   },
   scrollContainer: {
     flex: 1,
   },
   scrollContent: {
     paddingBottom: 100, // Add bottom padding to avoid overlap with tab bar
   },
   floatingSearchBar: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     zIndex: 1000,
     backgroundColor: '#ffffff',
     paddingTop: 30,
     paddingHorizontal: 16,
     paddingBottom: 20,
   },
   header: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     alignItems: 'center',
     paddingHorizontal: 20,
     paddingTop: 20,
     paddingBottom: 16,
   },
   headerLeft: {
     flexDirection: 'row',
     alignItems: 'center',
   },
   backButton: {
     padding: 0,
     marginRight: 10,
     marginTop: 4
   },
   logo: {
     fontSize: 24,
     fontWeight: '600',
     color: '#2c2c2c',
     fontFamily: 'PlayfairDisplay',
   },
   headerIcons: {
     flexDirection: 'row',
     alignItems: 'center',
     gap: 8,
   },
   iconButton: {
     padding: 5,
   },
   searchContainer: {
     paddingHorizontal: 16,
     paddingBottom: 10,
   },
   searchBar: {
     flexDirection: 'row',
     alignItems: 'center',
     backgroundColor: '#F8F9FA',
     borderRadius: 28,
     paddingHorizontal: 16,
     paddingVertical: 4,
     height: 50,
     borderWidth: 0,
     shadowColor: '#000000',
     shadowOpacity: 0.08,
     shadowRadius: 4,
     shadowOffset: { width: 0, height: 2 },
     elevation: 3,
   },
   searchLeft: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
   },
   lottieContainer: {
     width: 30,
     height: 50,
     marginRight: 8,
     justifyContent: 'center',
     alignItems: 'center',
   },
   lottieIcon: {
     width: 80,
     height: 80,
   },
   placeholderContainer: {
     flex: 1,
     flexDirection: 'row',
     alignItems: 'center',
     overflow: 'hidden',
     height: 30,
   },
   fixedText: {
     fontSize: 16,
     color: '#9CA3AF',
   },
   animatedTextContainer: {
     overflow: 'hidden',
     height: 22,
     justifyContent: 'center',
   },
   animatedText: {
     fontSize: 16,
     color: '#9CA3AF',
     lineHeight: 22,
   },
   cameraButton: {
     padding: 0,

   },
   content: {
     flex: 1,
     paddingHorizontal: 20,
     alignItems: 'center',
     justifyContent: 'center',
   },
   welcomeText: {
     fontSize: 18,
     color: '#6B7280',
   },
   categorySection: {
     paddingHorizontal: 0,
     paddingTop: 10,
   },
   categoryTitle: {
     fontSize: 20,
     fontWeight: '600',
     color: '#2c2c2c',
     marginBottom: 16,
     fontFamily: 'PlayfairDisplay',
   },
   categoryContainer: {
     flexDirection: 'column',
     gap: 10,
     paddingHorizontal: 20,
   },
   categoryRow: {
     flexDirection: 'row',
     gap: 10,
   },
   categoryItem: {
     alignItems: 'center',
     minWidth: 80,
   },
   categoryImageContainer: {
     width: 80,
     height: 85,
     borderRadius: 12,
     overflow: 'hidden',
     backgroundColor: '#f8f9fa',
     marginBottom: 6,
     shadowColor: '#000',
     shadowOpacity: 0.1,
     shadowRadius: 4,
     shadowOffset: { width: 0, height: 2 },
     elevation: 3,
   },
   categoryImage: {
     width: '100%',
     height: '150%',
     borderRadius: 12,
     resizeMode: 'cover',
   },
   longBobImage: {
     height: '100%',
   },
   categoryName: {
     fontSize: 11,
     fontWeight: '400',
     color: '#2c2c2c',
     textAlign: 'center',
     lineHeight: 16,
   },
   featuredSection: {
     paddingHorizontal: 0,
     paddingVertical: 20,
   },
   featuredTitle: {
     fontSize: 18,
     fontWeight: '600',
     color: '#2c2c2c',
     marginBottom: 16,
     textAlign: 'center',
     fontFamily: 'PlayfairDisplay',
   },
   featuredCarouselContainer: {
     position: 'relative',
   },
   featuredContainer: {
     paddingRight: 0,
   },
   featuredItem: {
     width: Dimensions.get('window').width,
     height: 300,
     marginRight: 0,
     overflow: 'hidden',
   },
   featuredImage: {
     width: '100%',
     height: '100%',
     resizeMode: 'cover',
   },
   pageIndicatorOverlay: {
     position: 'absolute',
     bottom: 10,
     left: 0,
     right: 0,
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     gap: 8,
     zIndex: 10,
   },
   pageIndicatorDot: {
     width: 5,
     height: 5,
     borderRadius: 40,
     backgroundColor: '#D1D5DB',
   },
   pageIndicatorDotActive: {
     backgroundColor: '#2c2c2c',
     width: 30,
     height: 4,
   },
   occasionSection: {
     paddingHorizontal: 0,
     paddingVertical: 10,
   },
   occasionTitle: {
     fontSize: 18,
     fontWeight: '600',
     color: '#2c2c2c',
     marginBottom: 16,
     textAlign: 'center',
     fontFamily: 'PlayfairDisplay',
   },
   occasionContainer: {
     paddingRight: 20,
     paddingLeft: 20,
   },
   occasionItem: {
     alignItems: 'center',
     marginRight: 0,
     minWidth: 100,
   },
   occasionImageContainer: {
     width: 90,
     height: 140,
     borderRadius: 12,
     overflow: 'hidden',
     backgroundColor: '#f8f9fa',
     marginBottom: 8,
   },
   occasionImage: {
     width: '100%',
     height: '100%',
     borderRadius: 12,
     resizeMode: 'cover',
   },
      occasionName: {
     fontSize: 11,
     fontWeight: '400',
     color: '#2c2c2c',
     textAlign: 'center',
     lineHeight: 16,
   },
   discoverSection: {
     paddingHorizontal: 20,
     paddingTop: 20,
     paddingBottom: 10,
   },
   discoverTitle: {
     fontSize: 18,
     fontWeight: '600',
     color: '#2c2c2c',
     marginBottom: 16,
     textAlign: 'center',
     fontFamily: 'PlayfairDisplay',
   },
   discoverContainer: {
     flexDirection: 'row',
     justifyContent: 'space-between',
     gap: 0,
   },
   discoverBox: {
     flex: 1,
     alignItems: 'center',
   },
   discoverImageContainer: {
     width: '90%',
     height: 180,
     borderRadius: 12,
     overflow: 'hidden',
     backgroundColor: '#f8f9fa',
     marginBottom: 8,
     
   },
   discoverImage: {
     width: '100%',
     height: '100%',
     borderRadius: 12,
     resizeMode: 'cover',
   },
      discoverName: {
     fontSize: 11,
     fontWeight: '400',
     color: '#2c2c2c',
     textAlign: 'center',
     lineHeight: 16,
   },
   virtualTryOnSection: {
     paddingHorizontal: 20,
     paddingVertical: 20,
   },
   virtualTryOnContainer: {
     width: '100%',
     height: 100,
     borderRadius: 12,
     overflow: 'hidden',
     position: 'relative',
     
   },
   virtualTryOnBackground: {
     width: '100%',
     height: '120%',
     resizeMode: 'cover',
   },
   virtualTryOnOverlay: {
     position: 'absolute',
     top: 0,
     left: 0,
     right: 0,
     bottom: 0,
     backgroundColor: 'rgba(0, 0, 0, 0.3)',
     justifyContent: 'center',
     alignItems: 'flex-start',
     paddingHorizontal: 20,
   },
   virtualTryOnTitle: {
     fontSize: 18,
     fontWeight: '600',
     color: '#ffffff',
     marginBottom: 4,
     textShadowColor: 'rgba(0, 0, 0, 0.5)',
     textShadowOffset: { width: 0, height: 1 },
     textShadowRadius: 2,
   },
        virtualTryOnSubtitle: {
      fontSize: 14,
      fontWeight: '400',
      color: '#ffffff',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
    virtualTryOnSubtitleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
          arrowIcon: {
       marginLeft: 2,
     },
     forYouSection: {
       paddingHorizontal: 10,
       paddingTop: 10,
     },
     forYouTitle: {
       fontSize: 18,
       fontWeight: '600',
       color: '#2c2c2c',
       marginBottom: 18,
       textAlign: 'center',
       fontFamily: 'PlayfairDisplay',
     },
     staggeredGrid: {
       flexDirection: 'row',
       gap: 6,
     },
     leftColumn: {
       flex: 1,
       gap: 16,
     },
     rightColumn: {
       flex: 1,
       gap: 16,
       marginTop: 0,
     },
     gridItem: {
       position: 'relative',
       borderRadius: 2,
       overflow: 'hidden',
       backgroundColor: '#f8f9fa',
       
     },
     gridImage: {
       width: '100%',
       height: 200,
       resizeMode: 'cover',
     },
     heartIcon: {
       position: 'absolute',
       top: 8,
       right: 8,
       backgroundColor: 'rgba(0, 0, 0, 0.3)',
       borderRadius: 500,
       padding: 6,
     },
});
