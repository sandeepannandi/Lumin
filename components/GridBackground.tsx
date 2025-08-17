import React from 'react';
import { View, StyleSheet } from 'react-native';

interface GridBackgroundProps {
  children?: React.ReactNode;
  gridSize?: number;
  gridColor?: string;
  backgroundColor?: string;
}

export default function GridBackground({ 
  children, 
  gridSize = 30, 
  gridColor = '#e4e4e7',
  backgroundColor = '#ffffff'
}: GridBackgroundProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      {/* Grid Pattern */}
      <View style={[styles.grid, { 
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundColor: 'transparent'
      }]}>
        {/* Vertical lines */}
        <View style={[styles.verticalLines, { 
          width: '100%', 
          height: '100%',
          position: 'absolute'
        }]}>
          {Array.from({ length: Math.ceil(400 / gridSize) + 1 }).map((_, index) => (
            <View
              key={`v-${index}`}
              style={[
                styles.gridLine,
                {
                  left: index * gridSize,
                  backgroundColor: gridColor,
                  width: 1,
                  height: '100%'
                }
              ]}
            />
          ))}
        </View>
        
        {/* Horizontal lines */}
        <View style={[styles.horizontalLines, { 
          width: '100%', 
          height: '100%',
          position: 'absolute'
        }]}>
          {Array.from({ length: Math.ceil(800 / gridSize) + 1 }).map((_, index) => (
            <View
              key={`h-${index}`}
              style={[
                styles.gridLine,
                {
                  top: index * gridSize,
                  backgroundColor: gridColor,
                  height: 1,
                  width: '100%'
                }
              ]}
            />
          ))}
        </View>
      </View>
      
             {/* Radial gradient overlay effect */}
       <View style={styles.radialOverlay} />
       
       {/* Top blur fade */}
       <View style={styles.topBlur} />
       
       {/* Bottom blur fade */}
       <View style={styles.bottomBlur} />
       
       {/* Content */}
       <View style={styles.content}>
         {children}
       </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  grid: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    bottom:400, // Reduced height - grid won't cover the bottom 200px
  },
  gridLine: {
    position: 'absolute',
  },
  verticalLines: {
    position: 'absolute',
    bottom: 30,
  },
  horizontalLines: {
    position: 'absolute',
    bottom: 500,
  },
  radialOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    // Note: React Native doesn't support mask-image, so we use a subtle overlay
  },
  topBlur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 26,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 2,
  },
  bottomBlur: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex: 2,
  },
  content: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});
