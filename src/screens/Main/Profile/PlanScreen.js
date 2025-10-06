import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import Icons from "../../../components/Icons";
import CustomButton from "../../../components/CustomButton";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";

const PlanScreen = () => {
  const [tab, setTab] = useState(0);

  const tabs = [
    { id: 0, label: "Free" },
    { id: 1, label: "Plus" },
    { id: 2, label: "Pro" },
  ];

  const features = [
    { icon: PNGIcons.plan1, text: "2 app icons" },
    { icon: PNGIcons.plan2, text: "2 themes" },
    {
      icon: PNGIcons.plan3,
      text: "2GB file uploads",
    },
    {
      icon: PNGIcons.plan4,
      text: "Secured & standard-quality voice and video calls (1:1 and group).",
    },
    {
      icon: PNGIcons.plan5,
      text: "Up to 6 participants in groups",
    },
  ];

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Select Plan"} />}
      paddingHorizontal={10}
      footerUnScrollable={() => (
        <CustomButton
          title={"Downgrade to Free"}
          backgroundColor={"#9B9B9B"}
          onPress={() => {}}
          marginBottom={14}
          width="90%"
        />
      )}
    >
      <View style={styles.tabsRow}>
        {tabs.map((t) => (
          <TouchableOpacity
            key={t.id}
            onPress={() => setTab(t.id)}
            style={[styles.tabChip, tab === t.id && styles.tabChipActive]}
          >
            <CustomText
              label={t.label}
              color={COLORS.primaryColor}
              fontSize={14}
              lineHeight={14 * 1.4}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[
          styles.planCard,
          {
            backgroundColor:
              tab == 0 ? COLORS.lightGray : tab == 1 ? "#4347FF" : "#776A3D",
          },
        ]}
      >
        <View style={styles.planHeaderRow}>
          <CustomText
            label={tab == 0 ? "Free Tier" : tab == 1 ? "Plus" : "Pro"}
            fontSize={36}
            fontFamily={fonts.medium}
            lineHeight={36 * 1.4}
            color={tab == 0 ? COLORS.primaryColor : COLORS.white}
          />
          {tab == 0 ? (
            <View style={styles.activePill}>
              <Icons
                family={"Feather"}
                name={"check"}
                size={12}
                color={COLORS.white}
              />
              <CustomText
                label={"Active"}
                color={COLORS.white}
                marginLeft={3}
                fontSize={10}
                lineHeight={10 * 1.4}
              />
            </View>
          ) : (
            <CustomText
              label={tab==1?"$4.99/mo":"$10.99/mo"}
              fontSize={24}
              lineHeight={24 * 1.4}
              fontFamily={fonts.medium}
              color={tab == 0 ? COLORS.primaryColor : COLORS.white}
            />
          )}
        </View>
        <CustomText
          label={
            tab == 0
              ? "Essentials"
              : tab == 1
              ? "Perfect for teams and small businesses"
              : "Perfect for Large Organizations"
          }
          fontSize={16}
          lineHeight={16 * 1.4}
          marginTop={18}
          fontFamily={fonts.medium}
          color={tab == 0 ? COLORS.primaryColor : COLORS.white}
        />
        <CustomText
          label={"Everything you need to start!"}
          color={tab == 0 ? "#121212CC" : COLORS.white}
          fontSize={12}
          lineHeight={12 * 1.4}
          marginTop={8}
        />
      </View>

      <CustomText
        label={"What You Get"}
        fontSize={17}
        lineHeight={17 * 1.4}
        fontFamily={fonts.medium}
        marginTop={14}
      />

      <View style={{ marginTop: 16 }}>
        {features.map((f, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Image source={f.icon} style={styles.featureIconBox} />
            <View style={{ flex: 1 }}>
              <CustomText
                label={f.text}
                fontSize={16}
                lineHeight={16 * 1.4}
                color={COLORS.primaryColor}
              />
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 16 }} />
    </ScreenWrapper>
  );
};

export default PlanScreen;

const styles = StyleSheet.create({
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 2,
  },
  tabChip: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tabChipActive: {
    backgroundColor: "#ECECEC",
  },
  planCard: {
    borderRadius: 16,
    padding: 16,
    paddingBottom: 24,
    marginTop: 12,
  },
  planHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  activePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 12,
    paddingVertical: 16,
    padding: 12,
    marginBottom: 8,
    gap: 7,
  },
  featureIconBox: {
    height: 24,
    width: 24,
  },
});
