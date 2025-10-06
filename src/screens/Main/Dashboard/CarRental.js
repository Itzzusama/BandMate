import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useCallback, useRef, useState } from "react";

import BottomSheetComponent from "../../../components/BottomSheetComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";

import VehicleCard from "./molecules/VehicleCard";

import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const CarRental = () => {
  const sheetRef = useRef(null);
  const navigation = useNavigation();

  const [region, setRegion] = useState({
    latitude: 38.7946,
    longitude: 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });
  const array = [
    {
      title: "Vehicle Has Insurance",
      subtitle: "Be mindful of the vehicle that you are about to rent.",
      image: PNGIcons.insurance,
    },
    {
      title: "Vehicle Had No Previous Damage",
      subtitle:
        "Enjoying your rental experience is important, allow yourself a small break to enjoy your journey.",
      cost: "From $450/mo",
      onPress: () => navigation.navigate("CarRental"),
      image: PNGIcons.carCheck,
    },
    {
      title: "Vehicle Is Clean And Shiny",
      subtitle:
        "It is important for customers to be able to enjoy their rental experiences. Make sure to have a good looking vehicle both on the outside and inside.",
      cost: "From $3,500",
      image: PNGIcons.sun,
    },
  ];
  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  return (
    <ScreenWrapper paddingHorizontal={0.1} translucent>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        style={styles.map}
        region={region}
        onMapReady={openSheet}
      />

      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["20%", "50%", "75%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <View style={{ paddingHorizontal: 10 }}>
          <CustomText
            label="Rental Requirements"
            fontSize={24}
            fontFamily={fonts.semiBold}
          />
          <CustomText
            label="There are some guidelines to follow to start generating revenues with your vehicle through rental, and they are stated here below:"
            fontSize={16}
            fontFamily={fonts.medium}
            marginBottom={10}
            color={COLORS.gray1}
            marginTop={-4}
          />
          <CustomText
            label="Few REQUIREMENTS:"
            fontFamily={fonts.medium}
            marginBottom={12}
            color={COLORS.gray1}
          />
          {array.map((item, index) => (
            <VehicleCard
              key={index}
              title={item.title}
              subHeading={item.subtitle}
              cost={item.cost}
              onPress={item.onPress}
              image={item.image}
              isChange
            />
          ))}
        </View>
        <View style={{ padding: 10, paddingBottom: 40 }}>
          <AuthFooter
            btnTitle="Understood"
            title="The easiest and most affordable way to reach your destination."
            isMain
          />
        </View>
      </BottomSheetComponent>
    </ScreenWrapper>
  );
};

export default CarRental;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
