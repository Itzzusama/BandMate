import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import MenuItem from "../VehicleDashboard/molecules/MenuItem";

const ParkingSettings = () => {
  const navigation = useNavigation();
  const array = [
    {
      id: 1,
      label: "General Info",
      image: PNGIcons.generalInfo,
      onPress: () => navigation.navigate("ServiceProvided"),
    },
    {
      id: 1,
      label: "Services Provided",
      image: PNGIcons.serviceProvider,
      onPress: () => navigation.navigate("ServiceProvided"),
    },
    {
      id: 2,
      label: "Access Management",
      image: PNGIcons.key,
      onPress: () => navigation.navigate("ManageAccess"),
    },
    {
      id: 3,
      label: "My Availabilites",
      image: PNGIcons.myAvai,
      onPress: () => navigation.navigate("MyAvailibility"),
    },
    {
      id: 4,
      label: "Features",
      image: PNGIcons.option,
      onPress: () => navigation.navigate("OptionProvided"),
    },
    {
      id: 4.1,
      label: "Booking Options",
      image: PNGIcons.option,
      onPress: () => navigation.navigate("ParkingBooking"),
    },
    {
      id: 5,
      label: "FAQ ",
      image: PNGIcons.faq,
      onPress: () => navigation.navigate("VehicleFaq"),
    },
    {
      id: 6,
      label: "Policies & Rules",
      image: PNGIcons.PolicyNRules,

      onPress: () => navigation.navigate("PolicyAndRules"),
    },
    {
      id: 7,
      label: "Pricing ",
      image: PNGIcons.pricing,
      onPress: () => navigation.navigate("Pricing"),
    },
    {
      id: 8,
      label: "Delete This Parking",
      image: Images.binRed,
      onPress: () => navigation.navigate("Pricing"),
    },
  ];
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Tesla Model 3"} />}
    >
      {/* <VehicleTopCard  /> */}
      {array?.map((item, index) => {
        return (
          <MenuItem
            key={index}
            imgSource={item.image}
            label={item.label}
            onCardPress={item?.onPress}
          />
        );
      })}

      <CustomButton
        title="Parking Security"
        marginTop={24}
        marginBottom={12}
        fontFamily={fonts.medium}
        onPress={() => navigation.navigate("SecurityFeature")}
      />
      <CustomButton
        title="Location Equipment"
        backgroundColor={COLORS.lightGray}
        color={COLORS.black}
        fontFamily={fonts.medium}
        marginBottom={24}
        onPress={() => navigation.navigate("LocationEquipment")}
      />
    </ScreenWrapper>
  );
};

export default ParkingSettings;

const styles = StyleSheet.create({});
