import {
  StyleSheet,
  View,
  Image,
  Pressable,
  Linking,
  Platform,
} from "react-native";
import React from "react";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import { Images } from "../../../../assets/images";
import MapView, { Marker } from "react-native-maps";

const LATITUDE = 46.2276;
const LONGITUDE = 6.1318;

const EventLocation = () => {
  const openDirections = () => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?daddr=${LATITUDE},${LONGITUDE}`,
      android: `http://maps.google.com/maps?daddr=${LATITUDE},${LONGITUDE}`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.mainContainer}>
      <CustomText
        label={"Where Will It Happen"}
        fontFamily={fonts.semiBold}
        fontSize={22}
        lineHeight={22 * 1.4}
      />

      <View style={[styles.row, { marginVertical: 4 }]}>
        <Image source={Images.event} style={styles.icon} />
        <CustomText
          label={"Copernik Stadium"}
          fontSize={16}
          fontFamily={fonts.medium}
          lineHeight={16 * 1.4}
          marginLeft={6}
        />
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={{ latitude: LATITUDE, longitude: LONGITUDE }} />
        </MapView>
      </View>

      <View style={[styles.addressContainer, styles.row]}>
        <View style={{ flex: 1 }}>
          <CustomText
            label={"ADDRESS"}
            color={COLORS.white2}
            fontFamily={fonts.medium}
            fontSize={12}
            textTransform={"uppercase"}
          />
          <View style={[styles.row, { marginTop: 2, width: "90%" }]}>
            <Image
              source={Images.LocationPin}
              style={[styles.icon, { tintColor: COLORS.white }]}
            />
            <CustomText
              label={"Chemin du Centurion 11, 1209, Geneva"}
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
              marginLeft={6}
              numberOfLines={1}
            />
          </View>
        </View>

        <Pressable style={styles.DirectIocnWraper} onPress={openDirections}>
          <Image
            source={Images.LocationArrow}
            style={[styles.icon, { tintColor: COLORS.btnColor }]}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default EventLocation;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    paddingTop: 8,
  },

  mapWrapper: {
    height: 351,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: COLORS.cardColor,
    marginTop: 8,
    marginBottom: 8,
  },

  map: {
    flex: 1,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  icon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    tintColor: COLORS.white,
  },

  addressContainer: {
    height: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.cardColor,
  },

  DirectIocnWraper: {
    backgroundColor: COLORS.btnSoftColor,
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
});
