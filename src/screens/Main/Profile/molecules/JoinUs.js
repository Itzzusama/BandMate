import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";

const JoinUs = ({ onPress }) => {
  const icons = [Images.insta, Images.x, Images.facebook, Images.discord];
  return (
    <View>
      <CustomText
        label={"Join Us Now"}
        fontSize={18}
        fontFamily={fonts.medium}
        marginTop={20}
        marginBottom={16}
        lineHeight={21}
      />

      <View style={styles.container}>
        {icons.map((icon, i) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            key={i}
            style={styles.iconBg}
          >
            <ImageFast
              source={icon}
              style={styles.icon}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default JoinUs;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconBg: {
    width: 80,
    height: 80,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.inputBg,
  },
  icon: {
    width: 32,
    height: 32,
  },
});
