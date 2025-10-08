import { StyleSheet, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import ErrorComponent from "../../../../components/ErrorComponent";

const LocationCard = () => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.selectMap, ,]}
        //   onPress={handleMapSelection}
      >
        <View style={styles.row}>
          <Image source={PNGIcons.map} style={styles.map} />
          <CustomText
            label="Select On The Map"
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            marginLeft={8}
          />
        </View>
        <Icons
          name="keyboard-arrow-right"
          family="MaterialIcons"
          size={24}
          color={COLORS.white2}
        />
      </TouchableOpacity>
      <ErrorComponent
        errorTitle={
          "Subscribe to the Gold plan at least to access this feature."
        }
        marginTop={12}
        color={COLORS.golden}
      />
    </View>
  );
};

export default LocationCard;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#272727",
  },
  selectMap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  map: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
