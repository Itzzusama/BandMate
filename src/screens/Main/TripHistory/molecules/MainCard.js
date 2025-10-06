import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import ReportCard from "./ReportCard";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const MainCard = ({ borderBottomColor }) => {
  return (
    <View>
      <View style={styles.date}>
        <CustomText
          label="Lundi, 16 juillet 2025"
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
      </View>
      <View style={styles.price}>
        <View style={styles.row}>
          <ImageFast
            source={PNGIcons.bike}
            style={styles.bike}
            resizeMode="contain"
          />
          <View>
            <CustomText
              label="$12 DA"
              fontFamily={fonts.semiBold}
              fontSize={18}
              lineHeight={18 * 1.4}
              color={COLORS.black}
            />
            <View style={[styles.row, { gap: 4 }]}>
              <CustomText
                label="DELIVERED"
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
              <View style={styles.dot} />
              <CustomText
                label="8MIN 59SEC"
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
              <View style={styles.dot} />

              <CustomText
                label="1.1 KM"
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
            </View>
          </View>
        </View>
        <CustomText
          label="14:43"
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
      </View>
      <View style={[styles.row, { gap: 4 }]}>
        <ImageFast
          source={PNGIcons.hand}
          style={styles.hand}
          resizeMode="contain"
        />
        <CustomText
          label="$2.00 TIP"
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          fontSize={12}
          lineHeight={12 * 1.4}
        />
      </View>
      <CustomText
        label="Itinerary"
        fontFamily={fonts.medium}
        fontSize={18}
        lineHeight={18 * 1.4}
        marginTop={10}
        marginBottom={5}
      />
      <View style={styles.mapContainer}>
        <MapView
          provider={PROVIDER_GOOGLE}
          mapType="terrain"
          style={styles.map}
          region={{
            latitude: 38.7946,
            longitude: 106.5348,
            latitudeDelta: 0.055,
            longitudeDelta: 0.055,
          }}
        />
      </View>
      <ReportCard borderBottomColor={borderBottomColor} />
    </View>
  );
};

export default MainCard;

const styles = StyleSheet.create({
  date: {
    backgroundColor: "#1212120A",
    padding: 12,
    borderRadius: 10,
    width: "100%",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  bike: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 100,
  },
  dot: {
    width: 1,
    height: 8,
    backgroundColor: "#12121229",
    borderRadius: 100,
  },
  hand: {
    width: 12,
    height: 12,
  },
  mapContainer: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
