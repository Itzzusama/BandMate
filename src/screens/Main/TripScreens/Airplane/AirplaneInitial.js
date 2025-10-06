import { useCallback, useEffect, useRef, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useDispatch } from "react-redux";

import { setVisibleBottomSheet } from "../../../../store/reducer/bottomSheetSlice";
import BottomSheetComponent from "../../../../components/BottomSheetComponent";
import SimpleProgressBar from "../../../../components/RangeSlider";
import ScreenWrapper from "../../../../components/ScreenWrapper";
import AuthFooter from "../../../../components/Auth/AuthFooter";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import VehicleCard from "../../Dashboard/molecules/VehicleCard";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const AirplaneInitial = () => {
  const dispatch = useDispatch();
  const sheetRef = useRef();

  const [region, setRegion] = useState({
    latitude: 38.7946,
    longitude: 106.5348,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setVisibleBottomSheet(true));
    }, 100);

    return () => clearTimeout(timer);
  }, []);

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
        snapPoints={["12%", "50%", "68%"]}
        initialIndex={-1}
        onChange={(index) => console.log(index)}
        enablePanDownToClose={false}
      >
        <View style={{ paddingHorizontal: 10, paddingBottom: 40 }}>
          <View style={styles.row}>
            <ImageFast
              source={PNGIcons.aeroplane}
              style={{ height: 48, width: 48, marginRight: 12 }}
            />
            <CustomText
              label="Your ride, ready when you land"
              fontSize={24}
              lineHeight={24 * 1.4}
              fontFamily={fonts.semiBold}
            />
          </View>
          <CustomText
            label="Few benefits:"
            fontFamily={fonts.medium}
            color={COLORS.gray1}
            lineHeight={1.4 * 14}
            marginBottom={14}
            marginTop={10}
          />
          <ImageBackground
            source={Images.airport}
            style={{
              height: 350,
              width: 350,
              alignSelf: "center",
              justifyContent: "flex-end",
              padding: 16,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <VehicleCard
              isChange
              cardBg={COLORS.white}
              color={COLORS.primaryColor}
              backgroundColor="#E1DEFD"
              subHeading="Driver is ready when your flight lands, even if it's delayed"
            />

            <SimpleProgressBar
              min={1}
              max={3}
              marginTop={10}
              bg={COLORS.gray}
            />
          </ImageBackground>

          <AuthFooter
            marginTop={24}
            btnTitle="Let's go!"
            isMain
            title="The easiest and most affordable way to reach your destination."
          />
        </View>
      </BottomSheetComponent>
    </ScreenWrapper>
  );
};

export default AirplaneInitial;

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
});
