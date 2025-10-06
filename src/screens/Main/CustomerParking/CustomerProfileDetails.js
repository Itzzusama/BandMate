import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTab from "../../../components/TopTab";
import ProfileCard from "./molecules/ProfileCard";
import VehicleTopCard from "../VehicleDashboard/molecules/VehicleTopCard";
import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import ImageFast from "../../../components/ImageFast";
import AchievementCard from "./molecules/AchievementCard";
import CustomButton from "../../../components/CustomButton";

const CustomerProfileDetails = () => {
  const [tab, setTab] = useState(0);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Know Viktor"} onHelpPress />}
    >
      <TopTab
        rounded
        tabNames={["Trips", "Shippings", "Deliveries", "Parkings"]}
        tab={tab}
        setTab={setTab}
      />
      <Divider thickness={4} marginBottom={2} />
      <CustomText
        label={"Professional"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={18 * 1.4}
        marginTop={4}
      />
      <ProfileCard />
      <Divider thickness={4} marginTop={2} marginBottom={6} />
      <CustomText
        label={"Achievements"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={18 * 1.4}
        marginTop={4}
        marginBottom={10}
      />
      <View style={styles.row}>
        <AchievementCard />
        <AchievementCard source={PNGIcons.star} title={"4.87"} sub={"Rating"} />
        <AchievementCard
          source={PNGIcons.A3}
          title={"456"}
          sub={"5-Stars Reviews"}
        />
      </View>

      <AchievementCard
        width="100%"
        source={PNGIcons.A4}
        title={"3 Years"}
        sub={"With move"}
        marginTop={8}
        marginBottom={12}
      />

      <Divider thickness={4} marginTop={2} marginBottom={6} />
      <CustomText
        label={"Viktor’s Parkings"}
        fontSize={18}
        fontFamily={fonts.medium}
        lineHeight={18 * 1.4}
        marginTop={4}
        marginBottom={10}
      />
      <VehicleTopCard
        isBook
        width={"100%"}
        plate={"BH3847"}
        carName={`Tesla Model S`}
        carType={"Seedan"}
        carImages={[PNGIcons.car1]}
        mainTag={"B652"}
      />
      <Divider marginTop={16} marginBottom={16} />

      {[1, 2, 3, 4, 5].map((item, index) => (
        <>
          <VehicleTopCard
            key={index}
            isOrder
            width={"100%"}
            plate={"BH3847"}
            carName={`Tesla Model S`}
            carType={"Seedan"}
            carImages={[PNGIcons.car1]}
            mainTag={"B652"}
          />
          <Divider marginTop={16} marginBottom={16} />
        </>
      ))}

      <View style={{ padding: 16, paddingTop: 8, gap: 8 }}>
        <CustomButton title={"Accept Offer"} />
        <CustomButton
          title={"Withdraw Request"}
          backgroundColor={COLORS.lightGray}
          color={COLORS.primaryColor}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CustomerProfileDetails;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
