import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SettingIcons } from "../../../../assets/images/settingIcons";

import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";

const RateApp = () => {
  return (
    <Pressable style={styles.container}>
      <View style={styles.row}>
        <Image source={SettingIcons.language} style={styles.icon} />
        <View>
          <CustomText
            label={"Rate this app"}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />

          <CustomText
            label={"4.9 rating on the Play Store & App Store"}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.4}
            color={"#FFFFFF7A"}
          />
        </View>
      </View>

      <Icons
        family={"Ionicons"}
        name={"chevron-forward-outline"}
        color={"#FFFFFF7A"}
        size={18}
      />
    </Pressable>
  );
};

export default RateApp;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,

    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
});
