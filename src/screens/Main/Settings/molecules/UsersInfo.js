import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Images } from "../../../../assets/images";
import { Image } from "react-native";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomButton from "../../../../components/CustomButton";
const UsersInfo = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.user3} style={styles.avatar} />
      <CustomText
        label={"Hi Viktor"}
        fontFamily={fonts.medium}
        fontSize={32}
        lineHeight={32 * 1.4}
        marginTop={10}
      />
      <View style={styles.row}>
        <CustomText
          label={"username"}
          fontFamily={fonts.medium}
          lineHeight={14 * 1.4}
          color={COLORS.white3}
          marginRight={4}
        />
        <Image source={PNGIcons.scan} style={styles.icon} />
      </View>
      <CustomButton
        title={"View My Page"}
        width={128}
        height={40}
        backgroundColor={COLORS.cardColor}
        marginTop={20}
        customText={{
          fontSize: 14,
          fontFamily: fonts.medium,
          color: COLORS.btnColor,
        }}
      />
    </View>
  );
};

export default UsersInfo;

const styles = StyleSheet.create({
  container: {
    paddingTop: 23,
    paddingVertical: 32,
    alignItems: "center",
  },
  avatar: {
    height: 80,
    width: 80,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
});
