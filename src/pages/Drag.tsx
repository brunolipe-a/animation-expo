import React from 'react';
import { View, Text } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const Drag: React.FC = () => {
  const posX = useSharedValue(0)
  const posY = useSharedValue(0)

  const gestureHandler = useAnimatedGestureHandler({
    onStart(event, ctx) {
      ctx.posX = posX.value
      ctx.posY = posY.value
    },
    onActive(event, ctx) {
      posX.value = (ctx.posX as number) + event.translationX
      posY.value = (ctx.posY as number) + event.translationY
    },
    onEnd() {
      posX.value = withSpring(0)
      posY.value = withSpring(0)
    }
  })

  const positionStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: posX.value },
      { translateY: posY.value }
    ]
  }))

  return (
    <View style={{ flex: 1 }} >
      <PanGestureHandler
        onGestureEvent={gestureHandler}
      >
        <Animated.View style={[{ width: 120, height: 120, backgroundColor: 'blue' }, positionStyle]} />
      </PanGestureHandler>
    </View>
  );
}

export default Drag;