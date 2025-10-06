import { useState } from "react";
import { StyleSheet, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";

import ApplyPromoCard from "./molecules/ApplyPromoCard";
import BuyingProtectionCard from "./molecules/BuyingProtectionCard";
import DateRangeCard from "./molecules/DateRangeCard";
import DescriptionCard from "./molecules/DescriptionCard";
import Header from "./molecules/Header";
import PlanOptionCard from "./molecules/PlanOptionCard";
import PopularRentalCard from "./molecules/PopularRentalCard";
import RatingAndReview from "./molecules/RatingAndReview";
import StandardRentalCard from "./molecules/StandardRentalCard";
import UserInfoCard from "./molecules/UserInfoCard";
import VehicleDetailCard from "./molecules/VehicleDetailCard";

import { PNGIcons } from "../../../assets/images/icons";

const conditionArray = [
  {
    name: "No smoking allowed",
    value: "",
    ischange: true,
    leftImage: PNGIcons.crossRed,
  },
  {
    name: "No animals allowed",
    value: "",
    ischange: true,
    leftImage: PNGIcons.crossRed,
  },
  {
    name: "No commercials or media production",
    value: "",
    ischange: true,
    leftImage: PNGIcons.crossRed,
  },
];

const bottomOptions = [
  {
    badgeLabel: "Most popular",
    badgeBg: "#4347FF29",
    badgeColor: "#4347FF",
    subtitle: "Available from August 19th",
    title: "Flexible",
    price: "$25.00",
    extraPrice: "You can get a refund up until Jan 23, 2025",
  },
  {
    subtitle: "Description",
    title: "Flexible or Non-Refundable",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
  },
  {
    subtitle: "Description",
    title: "Strict",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
  },
  {
    subtitle: "Description",
    title: "Strict or Non-Refundable ",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
  },
];
const CustomerTripDetail = ({ navigation }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <ScreenWrapper scrollEnabled paddingHorizontal={0.1} translucent>
      <Header />

      <View style={styles.mainContainer}>
        <UserInfoCard
          onPress={() => navigation.navigate("CustomerProfileDetails")}
        />

        <PlanOptionCard
          title={"Chevrolet Camaro ZL1"}
          subtitle={"Unlimited mileage • 5-doors • Manual"}
          rightTag={"Sponsored"}
          active
        />

        <StandardRentalCard
          tab
          isImage
          options={[
            {
              badgeLabel: "TRIAL PERIOD",
              badgeBg: "#7272B529",
              badgeColor: "#7272B5",
              subtitle: "Available from August 19th",
              title: "24h Rental",
              price: "$25.00",
              extraPrice: "+$2.00/additional kilometers",
              includedText: "2'500km included",
            },
            {
              badgeLabel: "MOST POPULAR",
              badgeBg: "#4347FF29",
              badgeColor: "#4347FF",
              title: "7 Day Rental",
              price: "+$25.00",
              extraPrice: "+$2.00/additional kilometers",
              includedText: "10'500km included",
            },
            {
              badgeLabel: "BEST PRICE",
              badgeBg: "#1D905329",
              badgeColor: "#1D9053",
              title: "30 Day Rental",
              price: "$25.00 $35.00",
              extraPrice: "+$2.00/additional kilometers",
              includedText: "Unlimited kilometers included",
            },
          ]}
        />

        <DateRangeCard
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <DescriptionCard />

        {/** Vehicle Info */}
        <VehicleDetailCard
          title={"General Information"}
          details={[
            { name: "Located In", value: "🇺🇸 United States of America" },
            { name: "City", value: "Los Angeles" },
            { name: "Location Type", value: "Indoor" },
            { name: "Parking Type", value: "Individual Garage" },
            { name: "Vehicle Type", value: "Cars" },
            { name: "Height Warning", value: "2m" },
          ]}
        />

        {/** Comfort & Convenience */}
        <VehicleDetailCard
          title={"Comfort & Convenience"}
          details={[
            { name: "Air Conditioning", value: "Yes" },
            { name: "Electric Chargers", value: "CHi2" },
            { name: "Parking Guidance Systems", value: "Yes" },
            { name: "License Plate Recognition Cameras", value: "Yes" },
            { name: "Sun Shades", value: "Yes" },
            { name: "Trash can(s)", value: "Yes" },
            { name: "Restroom(s)", value: "Yes" },
            { name: "Washing Station", value: "Yes" },
            { name: "Repair Tools", value: "Yes" },
            { name: "Wifi-Available", value: "Yes" },
          ]}
        />

        {/** Security */}
        <VehicleDetailCard
          title={"Security"}
          details={[
            { name: "Gate", value: "Yes" },
            { name: "Manual Barriers", value: "Huile de Poisson" },
            { name: "Automatic Barriers", value: "Crustacé, Poisson" },
            { name: "Intercom/Emergency Phone", value: "Adidas" },
            { name: "Fire Extinguisher", value: "AdiPure 16" },
            { name: "First Aid Medic Kit", value: "Barrés" },
            { name: "Security Camera(s)", value: "2 gélules par jour" },
            { name: "Security Guard(s)", value: "Capsule" },
          ]}
        />

        {/** Safety Features */}
        <VehicleDetailCard
          title={"Accessibility"}
          details={[
            { name: "Automatic Door(s)", value: "Yes" },
            { name: "Elevator(s)", value: "Huile de Poisson" },
            { name: "Wheel Chair Accessible", value: "Crustacé, Poisson" },
            { name: "Well-lit Area", value: "Adidas" },
          ]}
        />

        <VehicleDetailCard
          title={"Rental Conditions & Policies"}
          details={conditionArray}
          isInfo
        />

        <StandardRentalCard
          title={"Cancellation Policy"}
          options={bottomOptions}
          isChange
        />

        <ApplyPromoCard />

        <BuyingProtectionCard />

        <RatingAndReview />

        <PopularRentalCard />
        <PopularRentalCard label={"Popular Rentals"} />
      </View>
    </ScreenWrapper>
  );
};

export default CustomerTripDetail;

const styles = StyleSheet.create({
  carMain: {
    width: "100%",
    height: 400,
  },
  mainContainer: {
    padding: 6,
    backgroundColor: "#9f7d5b",
  },
  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 999,
  },
});
