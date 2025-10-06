import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { BlurView } from "@react-native-community/blur";

const Header = () => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity activeOpacity={0.6} style={styles.backIcon}>
        <Icons
          name="keyboard-arrow-left"
          family="MaterialIcons"
          size={26}
          color={COLORS.darkPurple}
        />
      </TouchableOpacity>
      <View style={styles.titleContainer}>
        <CustomText
          label="FROM"
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
          marginBottom={2}
        />
        <View style={styles.row}>
          <Image source={PNGIcons.pin} style={styles.pinIcon} />
          <CustomText
            label="Chemin du Centurion 11, 1209, Gen"
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    marginTop: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backIcon: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    backgroundColor: "#FFFFFF",
    width: "84%",
    height: 56,
    borderRadius: 12,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    marginLeft: -2,
    tintColor: COLORS.black,
    resizeMode: "contain",
  },
});
