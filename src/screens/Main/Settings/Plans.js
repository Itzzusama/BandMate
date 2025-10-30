import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CopyrightFooter from "../../../components/CopyrightFooter";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { useState } from "react";
import CustomButton from "../../../components/CustomButton";
import PlansCard from "./molecules/PlansCard";
import ProPlanInfo from "./molecules/ProPlanInfo";
import Icons from "../../../components/Icons";
import {
  free_fearures,
  silver_fearures,
  gold_fearures,
  platinum_fearures,
  pro_fearures,
} from "../../../utils/constants";
import GoldPlanGift from "./molecules/GoldPlanGift";

const tabs = ["Free", "Silver", "Gold", "Platinum", "Pro"];

const Plans = () => {
  const [selectedTab, setSelectedTab] = useState("Free");

  const getFeatures = () => {
    switch (selectedTab) {
      case "Free":
        return free_fearures;
      case "Silver":
        return silver_fearures;
      case "Gold":
        return gold_fearures;
      case "Platinum":
        return platinum_fearures;
      case "Pro":
        return pro_fearures;
      default:
        return [];
    }
  };

  const features = getFeatures();

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => (
        <View>
          <Header title={"Select Plan"} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
          >
            {tabs.map((tab) => {
              const isSelected = tab === selectedTab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  activeOpacity={0.8}
                  style={[
                    styles.tabButton,
                    isSelected && styles.tabButtonSelected,
                  ]}
                >
                  <CustomText
                    label={tab}
                    color={isSelected ? COLORS.white : COLORS.white3}
                    fontFamily={fonts.medium}
                    fontSize={14}
                    marginTop={2}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          {selectedTab == "Gold" && <GoldPlanGift />}
          <CustomButton
            title={`Upgrade to ${selectedTab}`}
            textTransform={"none"}
            marginBottom={12}
          />
          <CopyrightFooter paddingBottom={30} paddingTop={0} />
        </View>
      )}
    >
      <PlansCard plan={selectedTab === "Free" ? "Free Tier" : selectedTab} />

      {selectedTab === "Pro" && <ProPlanInfo />}

      <CustomText
        label={"What You Get"}
        fontFamily={fonts.medium}
        lineHeight={17 * 1.5}
        marginTop={12}
        color={COLORS.white}
      />

      <View style={{ marginTop: 12 }}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Icons
              family={"Ionicons"}
              name={"checkmark-circle"}
              size={20}
              color={COLORS.btnColor}
            />
            <CustomText
              label={feature}
              color={COLORS.white}
              fontFamily={fonts.regular}
              fontSize={14}
              lineHeight={14 * 1.5}
            />
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default Plans;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    paddingVertical: 2,
    gap: 8,
    paddingHorizontal: 12,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  tabButtonSelected: {
    backgroundColor: COLORS.cardColor,
    borderColor: COLORS.cardColor,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: COLORS.cardColor,
    marginBottom: 8,
    gap: 10,
  },
});
