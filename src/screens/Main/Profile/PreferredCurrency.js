import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import { getPreference, setPreference } from "./preferencesStorage";

const PreferredCurrency = () => {
  const [selected, setSelected] = useState(null);

  const currencies = [
    { id: 1, name: "US Dollar", sub: "USD" },
    { id: 2, name: "Euro", sub: "EUR" },
    { id: 3, name: "British Pound", sub: "GBP" },
    { id: 4, name: "Swiss Franc", sub: "CHF" },
    { id: 5, name: "Japanese Yen", sub: "JPY" },
    { id: 6, name: "Chinese Yuan", sub: "CNY" },
    { id: 7, name: "Canadian Dollar", sub: "CAD" },
    { id: 8, name: "Australian Dollar", sub: "AUD" },
    { id: 9, name: "Indian Rupee", sub: "INR" },
    { id: 10, name: "Singapore Dollar", sub: "SGD" },
    { id: 11, name: "Hong Kong Dollar", sub: "HKD" },
    { id: 12, name: "United Arab Emirates Dirham", sub: "AED" },
    { id: 13, name: "Brazilian Real", sub: "BRL" },
    { id: 14, name: "South African Rand", sub: "ZAR" },
    { id: 15, name: "Turkish Lira", sub: "TRY" },
  ];

  useEffect(() => {
    (async () => {
      const saved = await getPreference("currency");
      if (saved?.id) setSelected(saved.id);
    })();
  }, []);

  const onSelect = async (item) => {
    setSelected(item.id);
    await setPreference("currency", item);
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Set Preferred Currency"} />}
    >
      {currencies.map((item) => (
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

export default PreferredCurrency;

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


