import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const timezoneOptions = [
  {
    title: "Current Timezone (UTC+1)",
    des: "Berlin, Paris, Rome",
    isCurrent: true,
  },
  {
    title: "UTC+0",
    des: "London, Lisbon, Accra",
  },
  {
    title: "UTC+2",
    des: "Athens, Bucharest, Cairo",
  },
  {
    title: "UTC+3",
    des: "Moscow, Istanbul, Nairobi",
  },
  {
    title: "UTC+5:30",
    des: "New Delhi, Mumbai",
  },
  {
    title: "UTC+8",
    des: "Beijing, Singapore, Perth",
  },
  {
    title: "UTC+9",
    des: "Tokyo, Seoul",
  },
  {
    title: "UTC+10",
    des: "Sydney, Melbourne",
  },
  {
    title: "UTC-8",
    des: "Los Angeles, Vancouver",
  },
  {
    title: "UTC-5",
    des: "New York, Toronto, Lima",
  },
  {
    title: "UTC-3",
    des: "São Paulo, Buenos Aires",
  },
  {
    title: "UTC+12",
    des: "Auckland, Wellington",
  },
  {
    title: "UTC+14",
    des: "Kiritimati (Christmas Island, Kiribati)",
  },
];

const PreferredTimezone = ({ navigation, route }) => {
  const initialSelected =
    route?.params?.selected || "Current Timezone (UTC+1)";
  const [selected, setSelected] = useState(initialSelected);

  const handleSelect = (item) => {
    setSelected(item.title);
    if (route?.params?.onSelect) {
      route.params.onSelect(item.title);
    }
  };

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      paddingHorizontal={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Timezone"} />}
    >
      {timezoneOptions.map((item, index) => {
        const isSelected = selected === item.title;
        return (
          <Pressable
            key={index}
            style={[
              styles.container,
              index === timezoneOptions.length - 1 && { borderBottomWidth: 0 },
            ]}
            onPress={() => handleSelect(item)}
          >
            {item.isCurrent ? (
              <View style={styles.iconContainer}>
                <Icons
                  family={"Ionicons"}
                  name={"location-sharp"}
                  size={20}
                  color={COLORS.btnColor}
                />
              </View>
            ) : null}

            <View style={{ flex: 1, paddingRight: 12 }}>
              <CustomText
                label={item.title}
                fontSize={16}
                fontFamily={fonts.medium}
                color={COLORS.white}
              />
              {item.des ? (
                <CustomText
                  label={item.des}
                  fontSize={14}
                  fontFamily={fonts.regular}
                  color={COLORS.white3}
                  marginTop={2}
                />
              ) : null}
            </View>

            <View
              style={[
                styles.radioOuter,
                isSelected && styles.radioOuterSelected,
              ]}
            >
              {isSelected && <View style={styles.radioDot} />}
            </View>
          </Pressable>
        );
      })}
    </ScreenWrapper>
  );
};

export default PreferredTimezone;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: COLORS.inputBg,
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
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
