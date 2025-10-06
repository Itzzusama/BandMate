import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import { getPreference, setPreference } from "./preferencesStorage";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../utils/constants";

const PreferredLanguage = () => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const languages = [
    { id: 1, name: "English", sub: "EN" },
    { id: 2, name: "Spanish", sub: "ES" },
    { id: 3, name: "French", sub: "FR" },
    { id: 4, name: "German", sub: "DE" },
    { id: 5, name: "Portuguese", sub: "PT" },
    { id: 6, name: "Chinese (Simplified)", sub: "ZH" },
    { id: 7, name: "Japanese", sub: "JA" },
    { id: 8, name: "Hindi", sub: "HI" },
    { id: 9, name: "Arabic", sub: "AR" },
    { id: 10, name: "Russian", sub: "RU" },
    { id: 11, name: "Italian", sub: "IT" },
    { id: 12, name: "Korean", sub: "KO" },
    { id: 13, name: "Turkish", sub: "TR" },
    { id: 14, name: "Dutch", sub: "NL" },
    { id: 15, name: "Swedish", sub: "SV" },
  ];

  useEffect(() => {
    (async () => {
      const saved = await getPreference("language");
      if (saved?.id) setSelected(saved.id);
    })();
  }, []);

  const onSelect = async (item) => {
    setSelected(item.id);
    await setPreference("language", item);
    const code = (item.sub || item.name || "").toString().toLowerCase();
    dispatch(updateUserProfile({ language: code }));
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Set Preferred Language"} />}
    >
      {languages.map((item) => (
        <View
          key={item.id}
          style={styles.card1}
          onTouchEnd={() => onSelect(item)}
        >
          <View style={styles.textContainer}>
            <CustomText
              label={item?.name}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={item?.sub}
              fontSize={14}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.gray2}
            />
          </View>
          <View style={styles.rightIcon}>
            <Icons
              family="MaterialCommunityIcons"
              name={selected === item.id ? "radiobox-marked" : "radiobox-blank"}
              size={28}
              color={selected === item.id ? COLORS.darkPurple : COLORS.gray2}
            />
          </View>
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default PreferredLanguage;

const styles = StyleSheet.create({
  card1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
  },
  textContainer: {
    flex: 1,
  },
  rightIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
});


