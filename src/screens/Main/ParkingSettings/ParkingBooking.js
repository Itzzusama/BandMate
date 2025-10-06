import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import BookingOptionCard from "./molecules/BookingOptionCard";

const ParkingBooking = () => {
  const array = [
    {
      id: 1,
      title: "Instant Booking",
      subTitle:
        "Customers can book without sending a request and waiting on your approval.",
      information: "Quickly get bookings without managing requests.",
    },
    {
      id: 2,
      title: "Self check-in",
      subTitle: "Faciliate the access to the vehicle on client’s arrival.",
      information: "If well setup much more convenient for you.",
    },
    {
      id: 3,
      title: "Only allow experienced client",
      subTitle:
        "Only allow customers with more than 5 completed rental bookins to book from you.",
      information: "Safer but less reach.",
    },
  ];
  const selfCheckIn = [
    {
      id: 1,
      title: "Access Using A Card",
      subTitle: "Guests can access the parking spot using a card.",
      information: "Card will only be provided to guests after booking.",

      value: "The Classic Big Tasty is back!",
      withLabel: "GIVE MORE INFORMATION",
      multiline: true,
    },
    {
      id: 2,
      title: "Access Using A Key",
      subTitle: "The key is stored in a safe, which guests can open.",
      information:
        "This passcode will only be provided to guests after booking.",

      value: "The Classic Big Tasty is back!",
      withLabel: "GIVE MORE INFORMATION",
      multiline: true,
    },
    {
      id: 3,
      title: "Access Using A Code",
      subTitle:
        "The key is stored in a safe, which guests can open using a passcode.",
      information:
        "This passcode will only be provided to guests after booking.",
      value: "The Classic Big Tasty is back!",
      withLabel: "GIVE MORE INFORMATION",
      multiline: true,
    },
    {
      id: 4,
      title: "Access using a smart lock",
      subTitle: "A lock that opens through a mobile app.",
      information: "Minimal rental period",
      value: "The Classic Big Tasty is back!",
      withLabel: "GIVE MORE INFORMATION",
    },
  ];
  const moreArray = [
    {
      id: 1,
      title: "Host greets You",
      subTitle:
        "A host or a co-host will meet guests to provide access to the parking spot.",
      information: "More effort but much more appreciated by guests.",
    },
    {
      id: 2,
      title: "Building Staff",
      subTitle:
        "A building staff member or similar will meet guests to provide access to the parking spot.",
      information: "Friendly and more comfortable for you.",
    },
  ];
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"My Booking Options"} />}
    >
      <CustomText
        label="Booking Options"
        fontSize={24}
        fontFamily={fonts.medium}
        color={COLORS.black}
        marginTop={10}
      />

      {array.map((item, index) => (
        <BookingOptionCard
          label={item.title}
          subTitle={item.subTitle}
          errorTitle={item.information}
        />
      ))}

      <CustomText
        label="Self check-in"
        fontSize={24}
        fontFamily={fonts.medium}
        color={COLORS.black}
        marginTop={10}
      />
      {selfCheckIn.map((item, index) => (
        <BookingOptionCard
          label={item.title}
          subTitle={item.subTitle}
          errorTitle={item.information}
          input
          value={item.value}
          withLabel={item.withLabel}
          multiLine={item.multiline}
          height={item.id != 4 && 150}
        />
      ))}
      <CustomText
        label="More options"
        fontSize={24}
        fontFamily={fonts.medium}
        color={COLORS.black}
        marginTop={10}
      />
      {moreArray.map((item, index) => (
        <BookingOptionCard
          label={item.title}
          subTitle={item.subTitle}
          errorTitle={item.information}
        />
      ))}
    </ScreenWrapper>
  );
};

export default ParkingBooking;

const styles = StyleSheet.create({});
