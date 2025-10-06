import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ImageFast from "../../../../components/ImageFast";
import CustomText from "../../../../components/CustomText";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const MenuItem = ({ imgSource, label, onCardPress }) => {
  return (
    <TouchableOpacity
      onPress={onCardPress}
      style={[styles.row, { marginTop: 12 }]}
    >
      <View style={[styles.row, { flex: 1 }]}>
        <View style={styles.imageBg}>
          <ImageFast
            source={imgSource}
            style={{ height: 20, width: 20 }}
            resizeMode={"contain"}
          />
        </View>

        <CustomText
          label={label || "Item"}
          marginLeft={16}
          fontSize={16}
          fontFamily={fonts.medium}
        />
      </View>

      <View style={styles.imageBg}>
        <ImageFast
          source={PNGIcons.forward}
          style={{ height: 24, width: 24 }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  imageBg: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 99,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
