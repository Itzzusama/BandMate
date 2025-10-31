import React, { useEffect, useState } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { gyroscope, setUpdateIntervalForType, SensorTypes } from "react-native-sensors";

setUpdateIntervalForType(SensorTypes.gyroscope, 50); // update every 50ms

const GyroView = () => {
  const translateX = new Animated.Value(0);
  const translateY = new Animated.Value(0);

  useEffect(() => {
    const subscription = gyroscope.subscribe(({ x, y }) => {
      Animated.spring(translateX, {
        toValue: x * 50, // sensitivity
        useNativeDriver: true,
      }).start();

      Animated.spring(translateY, {
        toValue: y * 50,
        useNativeDriver: true,
      }).start();
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          {
            transform: [{ translateX }, { translateY }],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "orange",
    borderRadius: 10,
  },
});

export default GyroView;
