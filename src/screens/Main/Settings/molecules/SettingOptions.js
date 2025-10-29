import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SettingIcons } from "../../../../assets/images/settingIcons";

import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const data = [
  {
    title: "Analytics",
    screen: "",
    icon: SettingIcons.graph,
  },
  {
    title: "Payment method",
    screen: "",
    icon: SettingIcons.payment,
  },
  {
    title: "Notifications",
    screen: "",
    icon: SettingIcons.noti,
  },
  {
    title: "Change my password",
    screen: "",
    icon: SettingIcons.noti,
  },
  {
    title: "Two factors authentication",
    screen: "",
    icon: SettingIcons.compare,
  },
];

const SettingOptions = () => {
  return data.map((item, index) => (
    <Pressable style={styles.container} key={index}>
      <View style={styles.row}>
        <Image source={item.icon} style={styles.icon} />
        <View>
          <CustomText
            label={item.title}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          {item.title == "Analytics" && (
            <CustomText
              label={"Only with Platinum"}
              fontFamily={fonts.medium}
              fontSize={14}
              lineHeight={14 * 1.4}
              color={"#FFFFFF7A"}
            />
          )}
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

export default SettingOptions;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.cardColor,
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
