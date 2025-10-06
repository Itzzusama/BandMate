import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback, useRef, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import BottomSheetComponent from "../../../../components/BottomSheetComponent";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import AuthFooter from "../../../../components/Auth/AuthFooter";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import VehicleCard from "../../Dashboard/molecules/VehicleCard";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const AirplaneFinal = () => {
  const sheetRef = useRef(null);

  const [region, setRegion] = useState({
    latitude: 38.7946,
    longitude: 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const array = [
    {
      subtitle: "Driver is ready when your flight lands, even if it's delayed",
    },
    {
      subtitle: "Up to 60 minutes of wait time after you land",
    },
    {
      subtitle:
        "Book your ride up to 30 days in advance so you know you're set once you land",
    },
  ];

  const openSheet = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  return (
    <ScreenWrapper translucent paddingHorizontal={0.1}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        style={styles.map}
        region={region}
        onMapReady={openSheet}
      />
      <BottomSheetComponent
        ref={sheetRef}
        snapPoints={["13%", "50%", "75%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <ScrollView contentContainerStyle={{ paddingHorizontal: 12 }}>
          <ImageFast
            source={PNGIcons.aeroplane}
            style={{ height: 48, width: 48, alignSelf: "center" }}
          />
          <CustomText
            label={"Your ride, ready when you land"}
            fontSize={24}
            lineHeight={24 * 1.4}
            fontFamily={fonts.semiBold}
            marginTop={8}
          />
          <CustomText
            label={"Few benefits:"}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={1.4 * 14}
            marginBottom={14}
            marginTop={10}
          />
          {array.map((item, index) => (
            <VehicleCard
              key={index}
              subHeading={item.subtitle}
              isChange
              color={COLORS.primaryColor}
              backgroundColor={"#E1DEFD"}
            />
          ))}

          <AuthFooter
            btnTitle={"Let's go!"}
            isMain
            marginTop={24}
            title={
              "The easiest and most affordable way to reach your destination."
            }
          />
        </ScrollView>
      </BottomSheetComponent>
    </ScreenWrapper>
  );
};

export default AirplaneFinal;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
