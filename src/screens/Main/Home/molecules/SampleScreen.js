import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { getPalette } from "@somesoap/react-native-image-palette";

const IMAGE_SIZE = 320; // image size
const GLOW_SIZE = IMAGE_SIZE * 1.35; // 35% larger than image for glow

const SampleScreen = () => {
  const [bgColor, setBgColor] = useState("#C89053");
  const imageUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpPVyc4LETd6GWTNZWJCuiBWoEI3w5yHZeoA&s";

  useEffect(() => {
    getPalette(imageUrl).then((palette) => {
      if (palette?.vibrant) setBgColor(palette.vibrant);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Glow Background */}
      <View
        style={[
          styles.glowBg,
          {
            backgroundColor: bgColor + "50",
            shadowColor: bgColor,
            width: GLOW_SIZE,
            height: GLOW_SIZE,
          },
        ]}
      />

      <View style={styles.content}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.title}>SampleScreen</Text>
      </View>
    </View>
  );
};

export default SampleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
  },

  glowBg: {
    position: "absolute",
    opacity: 0.55,
    shadowOpacity: 0.9,
    shadowRadius: 60,
    shadowOffset: { width: 0, height: 0 },
    elevation: 80,
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 20,
    zIndex: 2,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    marginTop: 20,
    fontWeight: "600",
  },
});
