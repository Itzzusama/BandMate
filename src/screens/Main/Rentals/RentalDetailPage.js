import { StyleSheet, View } from "react-native";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";

import BuyingProtectionCard from "./molecules/BuyingProtectionCard";
import StandardRentalCard from "./molecules/StandardRentalCard";
import PopularRentalCard from "./molecules/PopularRentalCard";
import VehicleDetailCard from "./molecules/VehicleDetailCard";
import PickUpAndReturn from "./molecules/PickUpAndReturn";
import DescriptionCard from "./molecules/DescriptionCard";
import RatingAndReview from "./molecules/RatingAndReview";
import PlanOptionCard from "./molecules/PlanOptionCard";
import ApplyPromoCard from "./molecules/ApplyPromoCard";
import DateRangeCard from "./molecules/DateRangeCard";
import UserInfoCard from "./molecules/UserInfoCard";
import ColorCard from "./molecules/ColorCard";
import BodyCard from "./molecules/BodyCard";
import Header from "./molecules/Header";

import { PNGIcons } from "../../../assets/images/icons";

const conditionArray = [
  {
    name: "No cross-border travel permission",
    value: "",
    ischange: true,
    leftImage: PNGIcons.crossRed,
  },
  {
    name: "No under 21 drivers",
    value: "",
    ischange: true,
    leftImage: PNGIcons.crossRed,
  },
  {
    name: "No smoking allowed",
    value: "",
    ischange: true,
    leftImage: PNGIcons.crossRed,
  },
  {
    name: "No off-roading",
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

  {
    name: "21 years old required",
    value: "",
    ischange: true,
    leftImage: PNGIcons.hammer,
  },
  {
    name: "Driving License B required",
    value: "",
    ischange: true,
    leftImage: PNGIcons.hammer,
  },
  {
    name: "Full-To-Full (Fuel Policy)",
    value: "",
    ischange: true,
    leftImage: PNGIcons.hammer,
  },
  {
    name: "Check in at 2pm – Check out at 10am",
    value: "",
    ischange: true,
    leftImage: PNGIcons.hammer,
  },
];

const bottomOptions = [
  {
    badgeLabel: "Most popular",
    badgeBg: "#4347FF29",
    badgeColor: "#4347FF",
    subtitle: "Available from August 19th",
    title: "Child Safety Seat",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    badgeLabel: "PET FRIENDLY",
    badgeBg: "#4347FF29",
    badgeColor: "#4347FF",
    subtitle: "Description",
    title: "Safe Pet Transportation cage",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    subtitle: "Description",
    title: "Cleaning Service After rental",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    subtitle: "Description",
    title: "Navigation Mount",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    badgeLabel: "Most popular",
    badgeBg: "#4347FF29",
    badgeColor: "#4347FF",
    subtitle: "Description",
    title: "Pre-Paid Fuel",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    badgeLabel: "Most popular",
    badgeBg: "#4347FF29",
    badgeColor: "#4347FF",
    subtitle: "Description",
    title: "Delivery At Pickup Location",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    subtitle: "Description",
    title: "Snow Chains",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    subtitle: "Description",
    title: "Ski Rack",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    subtitle: "Description",
    title: "Bike Rack",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
  {
    subtitle: "Description",
    title: "Unlimited Mileage",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
];
const RentalDetailPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <ScreenWrapper scrollEnabled paddingHorizontal={0.1} translucent>
      <Header />

      <View style={styles.mainContainer}>
        <UserInfoCard />

        <PlanOptionCard
          title={"Chevrolet Camaro ZL1"}
          subtitle={"Unlimited mileage • 5-doors • Manual"}
          rightTag={"Sponsored"}
          active
        />

        <StandardRentalCard
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

        <PickUpAndReturn
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

        <ColorCard />
        <BodyCard />
        <DescriptionCard />

        {/** Vehicle Info */}
        <VehicleDetailCard
          title={"Main Vehicle Information"}
          details={[
            { name: "Made in", value: "🇺🇸 United States of America" },
            { name: "Brand/Make", value: "Chevrolet" },
            { name: "Model", value: "Silverado" },
            { name: "Year of Registration", value: "2023" },
            { name: "Vehicle Type", value: "Sedan" },
            { name: "Exterior Color", value: "White" },
            { name: "Interior Color", value: "Black" },
            { name: "Drive Type", value: "FWD" },
            { name: "Fuel Type", value: "Diesel" },
            { name: "Transmission", value: "Automatic" },
            { name: "Engine Size", value: "2.5L" },
            { name: "Horsepower", value: "130 HP" },
            { name: "Number of Seats", value: "5" },
            { name: "Number of Doors", value: "5" },
          ]}
        />

        {/** Comfort & Convenience */}
        <VehicleDetailCard
          title={"Comfort & Convenience"}
          details={[
            { name: "Air Conditioning", value: "Yes" },
            { name: "Heated Seats", value: "Yes" },
            { name: "Leather Seats", value: "Yes" },
            { name: "Panoramic Sunroof", value: "Yes" },
            { name: "Power Windows", value: "Yes" },
            { name: "Power Door Locks", value: "Yes" },
            { name: "Keyless Entry", value: "Yes" },
            { name: "Push-to-Start", value: "Yes" },
            { name: "Cruise Control", value: "Yes" },
            { name: "Rain Sensor", value: "Yes" },
            { name: "Tinted windows", value: "Yes" },
            { name: "Foldable Rear Seats", value: "Yes" },
            { name: "USB Ports", value: "Yes" },
            { name: "Power Sockets", value: "Yes" },
            { name: "Auto Wipers", value: "Yes" },
          ]}
        />

        {/** Technology & Infotainment */}
        <VehicleDetailCard
          title={"Technology & Infotainment"}
          details={[
            { name: "Onboard GPS", value: "Yes" },
            { name: "Touchscreen Display", value: "Huile de Poisson" },
            { name: "Bluetooth", value: "Crustacé, Poisson" },
            { name: "AUX/USB Input", value: "Adidas" },
            { name: "Apple CarPlay", value: "AdiPure 16" },
            { name: "Android Auto", value: "Barrés" },
            { name: "Voice Command", value: "2 gélules par jour" },
            { name: "Premium Sound System", value: "Capsule" },
            { name: "Rear View Camera", value: "Garder à l’abri du soleil" },
            { name: "Front View Camera", value: "12-14 enfants" },
            { name: "Mirror Cameras", value: "1231155" },
            { name: "Parking Sensors", value: "1231155" },
            { name: "Dash Cam", value: "1 paire" },
          ]}
        />

        {/** Safety Features */}
        <VehicleDetailCard
          title={"Safety Features"}
          details={[
            { name: "Airbags", value: "Yes" },
            { name: "ABS", value: "Huile de Poisson" },
            { name: "ESP", value: "Crustacé, Poisson" },
            { name: "Tire Pressure Monitoring System", value: "Adidas" },
            { name: "Seatbelt Reminder", value: "AdiPure 16" },
            { name: "Lane Assistance", value: "Barrés" },
            { name: "Collision Warning", value: "2 gélules par jour" },
            { name: "Emergency Brake Assist", value: "Capsule" },
            {
              name: "Blind Spot Monitoring",
              value: "Garder à l’abri du soleil",
            },
            { name: "Child Seat Anchor Point (ISOFIX)", value: "Yes" },
            { name: "Traction Control", value: "1231155" },
            { name: "Hill-start & Cargo", value: "1231155" },
          ]}
        />

        <VehicleDetailCard
          title={"Luggage & Cargo"}
          details={[
            { name: "Trunk Size", value: "Yes" },
            { name: "Foldable Seats", value: "Huile de Poisson" },
            { name: "Roof Rack", value: "Crustacé, Poisson" },
            { name: "Underfloor Trunk Storage", value: "Adidas" },
            { name: "Tow Hook/Tow Bar", value: "AdiPure 16" },
          ]}
        />

        <VehicleDetailCard
          title={"Rental Conditions & Policies"}
          details={conditionArray}
          isInfo
        />

        <StandardRentalCard
          title={"These Make The Experience Better"}
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

export default RentalDetailPage;

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
