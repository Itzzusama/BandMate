import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SettingIcons } from "../../../../assets/images/settingIcons";

import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import CustomSwitch from "../../../../components/CustomSwitch";
import { COLORS } from "../../../../utils/COLORS";

const PreferencesOptions = () => {
  const [data, setData] = useState([
    {
      id: "mode",
      title: "Dark mode",
      icon: SettingIcons.contrast,
      isEnable: true,
    },
    {
      id: "availability",
      title: "Mark as unavailable",
      icon: SettingIcons.away,
      isEnable: false,
    },
    {
      id: "verification",
      title: "Only see verified profiles",
      des: "Only with Platinum",
      icon: SettingIcons.verified,
      isEnable: false,
    },
    {
      id: "likes",
      title: "Only show the ones I liked",
      des: "Only with Platinum",
      icon: SettingIcons.fav,
      isEnable: false,
    },
    {
      id: "language",
      title: "App Language",
      des: "English (US)",
      icon: SettingIcons.language,
      isEnable: false,
    },
    {
      id: "updates",
      title: "Automatic updates",
      icon: SettingIcons.update,
      isEnable: false,
    },
  ]);
  const handleToggle = (index) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isEnable: !item.isEnable } : item
      )
    );
  };
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
          {item.des && (
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
      {item.id == "language" ? (
        <Icons
          family={"Ionicons"}
          name={"chevron-forward-outline"}
          color={"#FFFFFF7A"}
          size={18}
        />
      ) : (
        <CustomSwitch
          value={item?.isEnable}
          setValue={() => handleToggle(index)}
        />
      )}
    </Pressable>
  ));
};

export default PreferencesOptions;

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
