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

const PreferredServiceProviders = () => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const options = [
    { id: 1, name: "Both", sub: "Show both companies and freelancers" },
    { id: 2, name: "Companies", sub: "Only show companies" },
    { id: 3, name: "Freelancers", sub: "Only show freelancers" },
  ];

  useEffect(() => {
    (async () => {
      const saved = await getPreference("serviceProviders");
      if (saved?.id) setSelected(saved.id);
    })();
  }, []);

  const onSelect = async (item) => {
    setSelected(item.id);
    await setPreference("serviceProviders", item);
    const value = (item.name || "").toLowerCase();
    const mapped = value.includes("companies")
      ? "companies"
      : value.includes("freelancers")
      ? "freelancers"
      : "both";
    dispatch(updateUserProfile({ serviceProviders: mapped }));
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header title={"Service Providers Preference"} />
      )}
    >
      {options.map((item) => (
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

export default PreferredServiceProviders;

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
