import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Divider from "../../../components/Divider";
import CustomButton from "../../../components/CustomButton";

const Deliveries = () => {
  const mapRef = useRef(null);
  const [region, setRegion] = useState({
    latitude: 37.0902,
    longitude: -95.7129,
    latitudeDelta: 0.015,
    longitudeDelta: 0.015,
  });

  const onRegionChangeComplete = (newRegion) => {
    setRegion(newRegion);
  };

  const deliveryData = [
    {
      id: 1,
      price: "$12 DA",
      priceColor: COLORS.black,
      mapTitle: "Itinerary",
      rideStyle: styles.ride,
      showReport: true,
      showDivider: true,
    },
    {
      id: 2,
      price: "$12 DA",
      priceColor: "#64CD75",
      mapTitle: "Trajet réalisé",
      rideStyle: styles.rideSecond,
      showReport: false,
      showDivider: false,
    },
  ];

  const renderDeliveryItem = (item, index) => (
    <View key={item.id}>
      <View style={[styles.row, { marginTop: index === 0 ? 24 : 0 }]}>
        <View style={styles.head}>
          <ImageFast
            source={Images.Scoty}
            resizeMode={"contain"}
            style={styles.scooterIcon}
          />

          <View>
            <CustomText
              label={item.price}
              fontFamily={fonts.semiBold}
              fontSize={18}
              lineHeight={24}
              color={item.priceColor}
            />
            <View style={styles.item}>
              <CustomText
                label={"DELIVERED"}
                fontFamily={fonts.medium}
                fontSize={12}
                textTransform={"uppercase"}
                letterSpacing={-0.12}
                color={COLORS.subtitle}
              />
              <CustomText
                label={"|"}
                fontFamily={fonts.medium}
                fontSize={12}
                textTransform={"uppercase"}
                color={"#12121229"}
              />
              <CustomText
                label={"8min 59sec"}
                fontFamily={fonts.medium}
                fontSize={12}
                textTransform={"uppercase"}
                letterSpacing={-0.12}
                color={COLORS.subtitle}
              />
              <CustomText
                label={"|"}
                fontFamily={fonts.medium}
                fontSize={12}
                textTransform={"uppercase"}
                color={"#12121229"}
              />
              <CustomText
                label={"1.1 km"}
                fontFamily={fonts.medium}
                fontSize={12}
                letterSpacing={-0.12}
                textTransform={"uppercase"}
                color={COLORS.subtitle}
              />
            </View>
          </View>
        </View>
        <CustomText
          label={"14:43"}
          fontFamily={fonts.medium}
          fontSize={12}
          textTransform={"uppercase"}
          letterSpacing={-0.12}
          color={COLORS.subtitle}
        />
      </View>

      <View style={styles.tipContainer}>
        <ImageFast
          source={Images.handHeart}
          resizeMode={"contain"}
          style={styles.tipIcon}
        />
        <View style={styles.tipTextContainer}>
          <CustomText
            label={"$2.00"}
            fontFamily={fonts.medium}
            fontSize={12}
            textTransform={"uppercase"}
            letterSpacing={-0.12}
            color={COLORS.subtitle}
          />
          <CustomText
            label={"TIP"}
            fontFamily={fonts.medium}
            fontSize={12}
            textTransform={"uppercase"}
            letterSpacing={-0.12}
            color={COLORS.subtitle}
          />
        </View>
      </View>

      <CustomText
        label={item.mapTitle}
        fontFamily={fonts.medium}
        fontSize={18}
        lineHeight={24}
        color={COLORS.black}
        marginBottom={12}
      />

      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          mapType="terrain"
          style={styles.map}
          region={region}
          onMapReady={() => {
            mapRef.current?.animateToRegion(
              {
                latitude: 38.7946,
                longitude: 106.5348,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              },
              1000
            );
          }}
          onRegionChangeComplete={onRegionChangeComplete}
        />
      </View>

      <View style={item.rideStyle}>
        <View style={styles.rideIconContainer}>
          <View style={styles.icn}></View>
          <View style={styles.line}></View>
          <View style={styles.icn}></View>
        </View>
        <View>
          <View>
            <CustomText
              label={"McDonald's"}
              fontFamily={fonts.medium}
              fontSize={14}
              lineHeight={18}
              color={COLORS.black}
            />
            <CustomText
              label={"Alger, Algérie"}
              fontFamily={fonts.medium}
              fontSize={12}
              color={COLORS.subtitle}
            />
          </View>
          <View style={styles.destinationContainer}>
            <CustomText
              label={"McDonald's"}
              fontFamily={fonts.medium}
              fontSize={14}
              lineHeight={18}
              color={COLORS.black}
            />
            <CustomText
              label={"Alger, Algérie"}
              fontFamily={fonts.medium}
              fontSize={12}
              color={COLORS.subtitle}
            />
          </View>
        </View>
      </View>
      <View style={styles.report}>
        {item.showReport ? (
          <>
            <ImageFast
              source={Images.RideWarn}
              resizeMode={"contain"}
              style={{ width: 16, height: 16 }}
            />
            <CustomText
              label={"Report"}
              fontFamily={fonts.medium}
              fontSize={16}
              color={COLORS.black}
              lineHeight={24}
            />
          </>
        ) : (
          <CustomText
            label={"Signaler"}
            fontFamily={fonts.medium}
            fontSize={16}
            color={COLORS.black}
            lineHeight={24}
          />
        )}
      </View>

      {item.showDivider && <Divider marginVertical={24} />}
    </View>
  );

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"My Deliveries"} />}
      footerUnScrollable={() => (
        <CustomButton
          title={"Voir revenue"}
          width="90%"
          marginTop={40}
          marginBottom={40}
          backgroundColor={COLORS.inputBg}
          color={COLORS.black}
        />
      )}
    >
      <View style={styles.topGraph}>
        <CustomText
          label={"Lundi, 16 juillet 2025"}
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={24}
          color={COLORS.white}
        />
      </View>
      {deliveryData.map((item, index) => renderDeliveryItem(item, index))}

      <View style={[styles.topGraph, { marginTop: 40 }]}>
        <CustomText
          label={"Lundi, 16 juillet 2025"}
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={24}
          color={COLORS.white}
        />
      </View>
      {deliveryData.map((item, index) => renderDeliveryItem(item, index))}
    </ScreenWrapper>
  );
};

export default Deliveries;

const styles = StyleSheet.create({
  topGraph: {
    backgroundColor: COLORS.black,
    padding: 12,
    borderRadius: 12,
    marginTop: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  head: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "90%",
  },

  item: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },

  scooterIcon: {
    width: 40,
    height: 40,
  },

  tipContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
    marginBottom: 16,
  },

  tipIcon: {
    width: 14,
    height: 14,
  },

  tipTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  mapContainer: {
    height: 120,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  map: {
    height: 120,
    width: "100%",
  },

  ride: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#1212120A",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  icn: {
    backgroundColor: COLORS.black,
    height: 8,
    width: 8,
    borderRadius: 100,
  },

  line: {
    backgroundColor: "#12121229",
    height: 52,
    width: 1,
  },

  rideIconContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },

  destinationContainer: {
    marginTop: 10,
  },

  report: {
    backgroundColor: COLORS.inputBg,
    marginTop: 32,
    height: 32,
    width: 98,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 100,
    paddingHorizontal: 12,
    gap: 4,
  },

  rideSecond: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#12121229",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
});
