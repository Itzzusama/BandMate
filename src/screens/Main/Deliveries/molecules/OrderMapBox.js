import { useMemo, useRef } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView from "react-native-maps";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const OrderMapBox = () => {
  const mapRef = useRef(null);

  const initialRegion = useMemo(
    () => ({
      latitude: 32.1475636,
      longitude: 74.19141239999999,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    }),
    []
  );

  return (
    <View>
      <View style={styles.row1}>
        <View style={styles.row}>
          <Icons name={"map"} family={"MaterialIcons"} size={16} />
          <CustomText
            fontSize={18}
            label={"Map"}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={22}
            family={"Entypo"}
            name={"chevron-down"}
            color={COLORS.subtitle}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.mapWrapper}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialRegion}
          region={initialRegion}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          showsScale={false}
        />
      </View>
    </View>
  );
};

export default OrderMapBox;

const styles = StyleSheet.create({
  mapWrapper: {
    width: "100%",
    height: 160,
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  row1: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
