import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import CountryFlag from "react-native-country-flag";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";

const SelectLocation = ({
  type = "loc",
  error,
  showSuccessColor,
  placeholder,
  value,
  onPress,
  code,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ flex: 1, marginTop: 8 }}>
        <CustomText
          label={type == "loc" ? "Location" : "Country"}
          color={
            error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.white3
          }
          fontFamily={fonts.medium}
          fontSize={12}
          textTransform={"uppercase"}
          lineHeight={12 * 1.4}
        />
        <View style={[styles.row, { gap: 4 }]}>
          {type == "loc" ? (
            <Image source={Images.LocationPin} style={styles.icon} />
          ) : (
            <View style={styles.roundFlagContainer}>
              <CountryFlag
                isoCode={code || "US"}
                size={20}
                style={styles.roundFlag}
              />
            </View>
          )}
          <CustomText
            label={value || placeholder}
            color={value ? COLORS.white : COLORS.white3}
            fontFamily={value ? fonts.medium : fonts.regular}
            fontSize={16}
            lineHeight={16 * 1.4}
            numberOfLines={1}
            marginRight={28}
          />
        </View>
      </View>
      <View style={{ alignSelf: "center" }}>
        {type == "loc" ? (
          <View style={styles.locationIcon}>
            <Image source={Images.LocationArrow} style={styles.icon} />
          </View>
        ) : (
          <Icons
            style={{ color: COLORS.white2, fontSize: 20 }}
            family="Entypo"
            name="chevron-down"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SelectLocation;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    marginBottom: 8,
    height: 56,
  },
  locationIcon: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: "#A1937529",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 1,
  },
  roundFlagContainer: {
    height: 16,
    width: 16,
    borderRadius: 14,
    overflow: "hidden",
  },
  roundFlag: {
    height: "100%",
    width: "100%",
    borderRadius: 14,
  },
});
