import { StatusBar } from 'expo-status-bar';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, interpolate, Extrapolate } from 'react-native-reanimated'
import React from 'react';
import { StyleSheet, View } from 'react-native';

import heroImage from '../assets/hero.png'

export default function Initial() {
  const titlePosition = useSharedValue(30)
  const imagePosition = useSharedValue(-30)


  const titleStyle = useAnimatedStyle(() => ({
    transform: [ {
      translateY: titlePosition.value
    }],
    opacity: interpolate(titlePosition.value, [30, 0], [0, 1], Extrapolate.CLAMP)
  }))
  const heroStyle = useAnimatedStyle(() => ({
    transform: [ {
      translateY: imagePosition.value
    }],
    opacity: interpolate(imagePosition.value, [-30, 0], [0, 1], Extrapolate.CLAMP)
  }))

  function handleClick() {
    imagePosition.value = -30
    titlePosition.value = 30

    imagePosition.value = withTiming(0, 
      { 
        duration: 500,
        easing: Easing.ease
      }, 
      () => {
        titlePosition.value = 
          withTiming(0, 
            { 
              duration: 1000,
              easing: Easing.bounce
            }
          )
        
      }
    )
  }

  return (
    <View style={styles.container} onTouchStart={handleClick}>
      <Animated.Image style={[styles.hero, heroStyle]} source={heroImage} />
      <Animated.Text style={[styles.title, titleStyle]}>Bem-vindo ao app!</Animated.Text>
      <StatusBar style="light" translucent animated />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: "bold",
    color: '#FFF',
    fontSize: 32
  },
  hero: {
    width: 288,
    height: 200,
    marginBottom: 40
  }
});
