import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import CountryFlag from "react-native-country-flag";
import Icons from "../../../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CURRENCIES = [
  { code: "US", name: "US Dollars", symbol: "$ USD", amount: "$ 1,000.00" },
  { code: "EU", name: "Euro", symbol: "€ EUR", amount: "€ 1,000.00" },
  { code: "GB", name: "British Pound", symbol: "£ GBP", amount: "£ 1,000.00" },
  { code: "AL", name: "Albanian Lek", symbol: "ALL", amount: "100.00 ALL" },
  { code: "AE", name: "UAE Dirham", symbol: "AED", amount: "1,000.00 Dh" },
  { code: "CN", name: "Chinese Yuan", symbol: "¥ CNY", amount: "¥ 1,000.00" },
  { code: "IN", name: "Indian Rupee", symbol: "₹ INR", amount: "₹ 1,000.00" },
  { code: "PK", name: "Pakistani Rupee", symbol: "Rs PKR", amount: "Rs 1,000.00" },
  { code: "BD", name: "Bengali Taka", symbol: "৳ BDT", amount: "৳ 1,000.00" },
  { code: "PT", name: "Portuguese Euro", symbol: "€ EUR", amount: "€ 1,000.00" },
  { code: "RU", name: "Russian Ruble", symbol: "₽ RUB", amount: "₽ 1,000.00" },
  { code: "JP", name: "Japanese Yen", symbol: "¥ JPY", amount: "¥ 1,000" },
  { code: "SA", name: "Saudi Riyal", symbol: "SAR", amount: "1,000.00 SAR" },
  { code: "FR", name: "French Euro", symbol: "€ EUR", amount: "€ 1,000.00" },
  { code: "DE", name: "German Euro", symbol: "€ EUR", amount: "€ 1,000.00" },
  { code: "KR", name: "South Korean Won", symbol: "₩ KRW", amount: "₩ 1,000" },
  { code: "CA", name: "Canadian Dollar", symbol: "$ CAD", amount: "$ 1,000.00" },
  { code: "AU", name: "Australian Dollar", symbol: "$ AUD", amount: "$ 1,000.00" },
];

const PreferredCurrency = ({ navigation, route }) => {
  const initialSelected = route?.params?.selected || "US Dollars";
  const [selected, setSelected] = useState(initialSelected);
  const insets = useSafeAreaInsets();

  const handleSelect = (item) => {
    setSelected(item.name);
    if (route?.params?.onSelect) {
      route.params.onSelect(item.name);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title={"Preferred Currency"} />}
    >
      <View style={{ marginBottom: insets.bottom }}>
        <View style={styles.topRow}>
          <Icons
            name="payments"
            size={16}
            color={COLORS.gray1}
            family={"MaterialIcons"}
          />
          <Text style={styles.subTitle}>
            Select your preferred app currency
          </Text>
        </View>

        {CURRENCIES.map((item, index) => {
          const isSelected =
            selected === item.name || selected === `${item.name} (${item.symbol})`;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.row,
                {
                  borderBottomColor:
                    index === CURRENCIES.length - 1
                      ? "transparent"
                      : COLORS.inputBg,
                },
              ]}
              onPress={() => handleSelect(item)}
              activeOpacity={0.7}
            >
              <View style={styles.leftContainer}>
                <View style={styles.roundFlagContainer}>
                  <CountryFlag
                    isoCode={item.code}
                    size={20}
                    style={styles.roundFlag}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.currencyName,
                      {
                        color: isSelected ? COLORS.white : COLORS.white2,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                  <Text style={styles.symbolText}>{item.amount}</Text>
                </View>
              </View>

              <View
                style={[
                  styles.radioOuter,
                  isSelected && styles.radioOuterSelected,
                ]}
              >
                {isSelected && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

export default PreferredCurrency;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.gray1,
    fontFamily: fonts.regular,
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundFlagContainer: {
    height: 20,
    width: 20,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 12,
  },
  roundFlag: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
  },
  currencyName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: COLORS.white,
  },
  symbolText: {
    fontSize: 13,
    color: COLORS.white3,
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.white3,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: COLORS.btnColor,
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.btnColor,
  },
});
