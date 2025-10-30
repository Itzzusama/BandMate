import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SettingIcons } from "../../../../assets/images/settingIcons";

import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const data = [
  {
    id: "x",
    title: "Follow us on X",
    screen: "",
    icon: SettingIcons.x,
  },
  {
    title: "Follow us on Facebook",
    screen: "",
    icon: SettingIcons.facebook,
  },
  {
    title: "Follow us on Instagram",
    screen: "",
    icon: SettingIcons.Instagram,
  },
];

const CommunityOptions = () => {
  return data.map((item, index) => (
    <Pressable style={styles.container} key={index}>
      <View style={styles.row}>
        <View style={styles.iconWrapper}>
          <Image
            source={item.icon}
            style={[styles.icon, item.id == "x" && styles.xicon]}
          />
        </View>

        <View>
          <CustomText
            label={item.title}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
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
  ));
};

export default CommunityOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,

    borderBottomWidth: 1,
    borderColor: COLORS.inputBg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  xicon: {
    height: 12,
    width: 12,
    resizeMode: "contain",
  },
  iconWrapper: {
    height: 24,
    width: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    backgroundColor: COLORS.cardColor,
  },
});
