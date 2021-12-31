import React, { useState, useEffect } from 'react';
import { Animated, Text, View } from 'react-native';

const FadeInView = (props) => {
    const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

      React.useEffect(() => {
        Animated.timing(
            fadeAnim,
            {
                toValue: 200,
                // easing: Easing.back(),
                duration:500,//默认500毫秒
                // useNativeDriver:true
            }
        ).start();
      }, [])
   

    return (
        <Animated.View                 // Special animatable View
            style={{
                ...props.style,
                height: fadeAnim,         // Bind opacity to animated value
            }}
        >
            {props.children}
        </Animated.View>
    );
}

// You can then use your `FadeInView` in place of a `View` in your components:
export default () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FadeInView style={{ width: 250, height: 50, backgroundColor: 'powderblue' }}>
                <Text style={{ fontSize: 28, textAlign: 'center', margin: 10 }}>Fading in</Text>
            </FadeInView>
        </View>
    )
}
