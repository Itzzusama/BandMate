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

const PreferredFirstDayOfWeek = () => {
  const [selected, setSelected] = useState(null);
  const dispatch = useDispatch();

  const days = [
    { id: 1, name: "Monday" },
    { id: 2, name: "Sunday" },
    { id: 3, name: "Saturday" },
  ];

  useEffect(() => {
    (async () => {
      const saved = await getPreference("firstDay");
      if (saved?.id) setSelected(saved.id);
    })();
  }, []);

  const onSelect = async (item) => {
    setSelected(item.id);
    await setPreference("firstDay", item);
    const value = (item.name || "").toLowerCase();
    const mapped = value;
    dispatch(updateUserProfile({ firstDayofWeek: mapped }));
  };

  return (
    <ScreenWrapper headerUnScrollable={() => <Header title={"First Day of The Week"} />}>
      {days.map((item) => (
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

export default PreferredFirstDayOfWeek;

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


