import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { getPreference } from "./preferencesStorage";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../utils/constants";

const Preferences = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.users.userData);

  const [subs, setSubs] = useState({
    currency: "US Dollars",
    language: "English",
    addressing: "Friendly",
    serviceProviders: "Both",
    map: "Google Maps",
    units: "Metric",
    temperature: "Celsius (°C)",
    firstDay: "Monday",
    dateFormat: "DD/MM/YYYY",
  });

  useEffect(() => {
    if (!isFocused) return;
    (async () => {
      const [
        currency,
        language,
        addressing,
        serviceProviders,
        map,
        units,
        temperature,
        firstDay,
        dateFormat,
      ] = await Promise.all([
        getPreference("currency"),
        getPreference("language"),
        getPreference("addressing"),
        getPreference("serviceProviders"),
        getPreference("map"),
        getPreference("units"),
        getPreference("temperature"),
        getPreference("firstDay"),
        getPreference("dateFormat"),
      ]);
      setSubs((prev) => ({
        ...prev,
        currency: currency?.name || currency?.sub || prev.currency,
        language: language?.name || language?.sub || prev.language,
        addressing: addressing?.name || prev.addressing,
        serviceProviders: serviceProviders?.name || prev.serviceProviders,
        map: map?.name || prev.map,
        units: units?.name || prev.units,
        temperature: temperature?.name || prev.temperature,
        firstDay: firstDay?.name || prev.firstDay,
        dateFormat: dateFormat?.name || prev.dateFormat,
      }));
    })();
  }, [isFocused]);

  useEffect(() => {
    dispatch(getProfile());
  }, [isFocused]);

  const tabs = [
    {
      id: 1,
      name: "Set Preferred Currency",
      sub: subs.currency,
      onPress: () => navigation.navigate("PreferredCurrency"),
    },
    {
      id: 2,
      name: "Set Preferred Language",
      sub: subs.language,
      onPress: () => navigation.navigate("PreferredLanguage"),
    },
    {
      id: 3,
      name: "Set Preferred Addressing",
      sub: subs.addressing,
      onPress: () => navigation.navigate("PreferAddressing"),
    },
    {
      id: 4,
      name: "Service Providers Preference",
      sub: subs.serviceProviders,
      onPress: () => navigation.navigate("PreferredServiceProviders"),
    },
    {
      id: 5,
      name: "Map",
      sub: subs.map,
      onPress: () => navigation.navigate("PreferredMap"),
    },
    {
      id: 6,
      name: "Units",
      sub: subs.units,
      onPress: () => navigation.navigate("PreferredUnits"),
    },
    {
      id: 7,
      name: "Temperature Scale",
      sub: subs.temperature,
      onPress: () => navigation.navigate("PreferredTemperature"),
    },
    {
      id: 8,
      name: "First Day of The Week",
      sub: subs.firstDay,
      onPress: () => navigation.navigate("PreferredFirstDayOfWeek"),
    },
    {
      id: 9,
      name: "Date Format",
      sub: subs.dateFormat,
      onPress: () => navigation.navigate("PreferredDateFormat"),
    },
  ];

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Advanced Settings"} />}
    >
      {tabs.map((tab, index) => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={tab.onPress}
          key={index}
          style={styles.card1}
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
              name="chevron-right"
              family="Entypo"
              size={22}
              color={COLORS.gray}
            />
          </View>
        </TouchableOpacity>
      ))}
    </ScreenWrapper>
  );
};

export default Preferences;

const styles = StyleSheet.create({
  bg2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: COLORS.inputBg,
    padding: 14,
    borderRadius: 16,
  },

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
