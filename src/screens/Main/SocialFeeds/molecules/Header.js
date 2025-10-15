import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";

const Header = () => {
  const [selected, setSelected] = useState("feeds"); // "feeds" | "movie"

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8}>
        <Icons
          family={"Feather"}
          name={"search"}
          size={24}
          color={COLORS.white}
        />
      </TouchableOpacity>

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.imageContainer,
            selected === "feeds" && styles.selectedImg,
          ]}
          onPress={() => setSelected("feeds")}
        >
          <Image source={PNGIcons.feeds} style={styles.img} />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.imageContainer,
            selected === "movie" && styles.selectedImg,
          ]}
          onPress={() => setSelected("movie")}
        >
          <Image source={PNGIcons.movie} style={styles.img} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity activeOpacity={0.8}>
        <Image source={PNGIcons.inbox} style={{ height: 32, width: 32 }} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "#FFFFFF14",
    gap: 2,
  },
  imageContainer: {
    padding: 10,
    borderRadius: 100,
  },
  selectedImg: {
    backgroundColor: "#FFFFFF29",
  },
  img: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
});
