import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const AdvancedNotification = () => {
  const [data, setData] = useState([
    {
      type: "Matching",
      description: "Choose which notifications you’d like to receive",
      options: [
        {
          name: "New Matches",
          des: "Disappears after being read",
          isEnabled: false,
        },
        {
          name: "Profile Likes",
          des: "When someone likes your profiles",
          isEnabled: false,
        },
        {
          name: "Nearby Musicians",
          des: "When someone likes your profiles",
          isEnabled: false,
        },
        {
          name: "Instrument Matches",
          des: "When someone likes your profiles",
          isEnabled: false,
        },
      ],
    },
    {
      type: "Subscription & Offers",
      description: "Updates about your subscription and special deals",
      options: [
        {
          name: "Subscription Status",
          des: "Updates about your subscription",
          isEnabled: false,
        },
        {
          name: "Special Offers",
          des: "Exclusive deals and discounts",
          isEnabled: false,
        },
        {
          name: "Premium Features",
          des: "Updates about new premium features",
          isEnabled: false,
        },
      ],
    },
    {
      type: "Events & Updates",
      description: "Stay informed about app updates and local events",
      options: [
        {
          name: "App Updates",
          des: "New features about app updates and local events",
          isEnabled: false,
        },
        {
          name: "Local Events",
          des: "Music events in your area",
          isEnabled: false,
        },
        {
          name: "Jam Session",
          des: "Upcoming jam session reminders",
          isEnabled: false,
        },
      ],
    },
    {
      type: "Engagement",
      description: "Activity updates and profile engagement",
      options: [
        {
          name: "Profile Views",
          des: "When someone views your profile",
          isEnabled: false,
        },
        {
          name: "Messages",
          des: "New messages from matches",
          isEnabled: false,
        },
        {
          name: "Activity Reminders",
          des: "Reminders to check new matches",
          isEnabled: false,
        },
      ],
    },
    {
      type: "Collaboration",
      description: "Activity updates and profile engagement",
      options: [
        {
          name: "Profile Views",
          des: "When someone views your profile",
          isEnabled: false,
        },
        {
          name: "Messages",
          des: "New messages from matches",
          isEnabled: false,
        },
        {
          name: "Activity Reminders",
          des: "Reminders to check new matches",
          isEnabled: false,
        },
      ],
    },
  ]);
  const insets = useSafeAreaInsets();
  const handleToggle = (sectionIndex, optionIndex) => {
    setData((prev) =>
      prev.map((section, i) =>
        i === sectionIndex
          ? {
              ...section,
              options: section.options.map((opt, j) =>
                j === optionIndex ? { ...opt, isEnabled: !opt.isEnabled } : opt
              ),
            }
          : section
      )
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Advanced Settings"} />}
    >
      <View style={{ marginBottom: insets.bottom }}>
        {data.map((section, sectionIndex) => (
          <View key={sectionIndex} style={{ marginBottom: 16 }}>
            <CustomText
              label={section.type}
              color={COLORS.white}
              fontFamily={fonts.semiBold}
              fontSize={20}
              lineHeight={20 * 1.4}
              marginTop={8}
            />
            <CustomText
              label={section.description}
              color={COLORS.white2}
              fontFamily={fonts.regular}
              fontSize={14}
              marginBottom={18}
            />

            <View style={styles.card}>
              {section.options.map((option, optionIndex) => (
                <View
                  key={optionIndex}
                  style={[
                    styles.optionRow,
                    optionIndex < section.options.length - 1 && styles.divider,
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <CustomText
                      label={option.name}
                      color={COLORS.white}
                      fontFamily={fonts.medium}
                      fontSize={16}
                      marginBottom={2}
                    />
                    <CustomText
                      label={option.des}
                      color={COLORS.white2}
                      fontFamily={fonts.regular}
                      fontSize={14}
                    />
                  </View>

                  <CustomSwitch
                    value={option.isEnabled}
                    setValue={() => handleToggle(sectionIndex, optionIndex)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default AdvancedNotification;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardColor,
    borderRadius: 16,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingVertical: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBg,
  },
});
