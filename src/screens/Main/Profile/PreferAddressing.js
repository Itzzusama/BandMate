import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import { KEYS, getPreference, setPreference } from "./preferencesStorage";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../../utils/constants";

const PreferAddressing = () => {
  const [selected, setSelected] = useState(null); // ✅ State for selected option
  const dispatch = useDispatch();

  const tabs = [
    {
      id: 1,
      name: "Friendly",
      sub: "E.g. Hi Ana, how was your day?",
    },
    {
      id: 2,
      name: "Corporate/Formal",
      sub: "E.g. Hello Mr. Johnson, how was your day?",
    },
  ];

  useEffect(() => {
    (async () => {
      const saved = await getPreference("addressing");
      if (saved?.id) setSelected(saved.id);
    })();
  }, []);

  const onSelect = async (item) => {
    setSelected(item.id);
    await setPreference("addressing", item);
    const value = (item.name || "").toLowerCase();
    // assuming API expects either 'friendly' or 'corporate' strings
    const mapped = value.includes("friendly") ? "friendly" : "corporate";
    dispatch(updateUserProfile({ addressing: mapped }));
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Set Preferred Addressing"} />}
    >
      {tabs.map((tab) => (
        <View
          key={tab.id}
          style={styles.card1}
          onTouchEnd={() => onSelect(tab)} 
        >
          <View style={styles.textContainer}>
            <CustomText
              label={tab?.name}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              label={tab?.sub}
              fontSize={14}
              lineHeight={14 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.gray2}
            />
          </View>
          <View style={styles.rightIcon}>
            <Icons
              family="MaterialCommunityIcons"
              name={selected === tab.id ? "radiobox-marked" : "radiobox-blank"}
              size={28}
              color={selected === tab.id ? COLORS.darkPurple : COLORS.gray2}
            />
          </View>
        </View>
      ))}
    </ScreenWrapper>
  );
};

export default PreferAddressing;

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
