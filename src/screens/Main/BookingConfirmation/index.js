import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";

import Header from "../../../components/Header";
import ApplyPromoCard from "../Rentals/molecules/ApplyPromoCard";
import BodyCard from "../Rentals/molecules/BodyCard";
import BuyingProtectionCard from "../Rentals/molecules/BuyingProtectionCard";
import DateRangeCard from "../Rentals/molecules/DateRangeCard";
import DescriptionCard from "../Rentals/molecules/DescriptionCard";
import PickUpAndReturn from "../Rentals/molecules/PickUpAndReturn";
import PlanOptionCard from "../Rentals/molecules/PlanOptionCard";
import PopularRentalCard from "../Rentals/molecules/PopularRentalCard";
import StandardRentalCard from "../Rentals/molecules/StandardRentalCard";
import UserInfoCard from "../Rentals/molecules/UserInfoCard";
import VehicleDetailCard from "../Rentals/molecules/VehicleDetailCard";

import { PNGIcons } from "../../../assets/images/icons";
import WeatherCard from "../VehicleDashboard/molecules/WeatherCard";
import ApplicationSubmitCard from "../VehicleDashboard/molecules/ApplicationSubmitCard";
import ShareSpot from "./molecules/ShareSpot";
import { Images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import Divider from "../../../components/Divider";
import TipCard from "./molecules/TipCard";
import BetterPlaceCard from "./molecules/BetterPlaceCard";
import GenevaCard from "./molecules/GenevaCard";

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
];
const CancellationPolicy = [
  {
    subtitle: "Available from August 19th",
    title: "Flexible",
    price: "$25.00",
    extraPrice: "Most customers will pay extra for this.",
    includedText: "Contains Peanuts",
  },
];
const BookingConfirmation = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title={"Booking Confirmation"} />}
    >
      <View style={styles.mainContainer}>
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

        <BodyCard />
        <DescriptionCard />

        <VehicleDetailCard
          title={"Rental Conditions & Policies"}
          details={conditionArray}
          isInfo
        />

        <StandardRentalCard
          title={"My Extras"}
          options={bottomOptions}
          isChange
        />
        <StandardRentalCard
          title={"Cancellation Policy"}
          options={CancellationPolicy}
          isChange
        />

        <GenevaCard />

        <Divider thickness={4} marginVertical={16} />

        <BuyingProtectionCard />

        <Divider thickness={4} marginVertical={16} />
        <ApplyPromoCard isBorder={false} />
        <Divider thickness={4} marginVertical={16} />

        <BetterPlaceCard
          header
          marginBottom={8}
          title1={"Give 1% of your trip"}
          title2={"To Orphan Children in Croatia"}
        />
        <BetterPlaceCard
          isChange
          title1={"1% goes to planting trees worldwide!"}
          title2={"With this trip you plan 10 trees"}
        />
        <Divider thickness={4} marginVertical={16} />

        <TipCard />

        <Divider thickness={4} marginVertical={16} />

        <ShareSpot
          width="49%"
          label={"My Receipt & Invoice"}
          height={70}
          text
          array={[
            { image: PNGIcons.invoice, text: "Receipt" },
            { image: PNGIcons.receipt, text: "Invoice" },
          ]}
        />
        <ShareSpot
          width="32%"
          label={"Extras"}
          array={[PNGIcons.d1, PNGIcons.star, PNGIcons.refreshBlack]}
        />
        <ShareSpot
          width="23%"
          array={[Images.insta, Images.x, Images.facebook, Images.discord]}
        />

        <View style={styles.footerButton}>
          <CustomButton
            title={"Leave"}
            icon={Images.camera}
            // secondText={"+$0.50 per additional minute."}
          />
          <CustomButton
            title={"Cancel Trip"}
            secondText={"Will imply a 50% Cancellation fee"}
            fontFamily={fonts.regular}
            color={"#EE1045"}
            backgroundColor={COLORS.lightGray}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default BookingConfirmation;

const styles = StyleSheet.create({
  carMain: {
    width: "100%",
    height: 400,
  },

  header: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 999,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  footerButton: {
    paddingHorizontal: 12,
    gap: 8,
    marginBottom: Platform.OS == "android" ? 12 : 20,
  },
});
