import { StyleSheet, View } from "react-native";
import moment from "moment";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { PNGIcons } from "../../../../assets/images/icons";
import fonts from "../../../../assets/fonts";

const StopDistance = ({ distanceLabel, etaLabel, vehicle, index }) => {
  const calculateETA = () => {
    if (!etaLabel || !Array.isArray(etaLabel) || index < 0) {
      return "N/A";
    }

    let totalMinutes = 0;
    for (let i = 0; i <= index && i < etaLabel.length; i++) {
      totalMinutes += parseInt(etaLabel[i]) || 0;
    }

    const now = moment();
    const etaTime = now.add(totalMinutes, "minutes");

    return etaTime.format("h:mm A");
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <CustomText
          label={`${distanceLabel} KM`}
          fontSize={12}
          lineHeight={12 * 1.4}
          fontFamily={fonts.medium}
          color="#121212A3"
        />
        <CustomText
          label={`ETA ${calculateETA()}`}
          fontSize={12}
          lineHeight={12 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>
      <View style={styles.secondContainer}>
        <ImageFast
          source={
            vehicle?.vehicleImages?.length
              ? { uri: vehicle?.vehicleImages?.[0] }
              : PNGIcons.car1
          }
          style={styles.vehicleIcon}
        />
        <View
          style={[styles.colorCircle, { backgroundColor: vehicle?.color }]}
        />
        <CustomText
          label={vehicle?.color}
          fontSize={12}
          lineHeight={12 * 1.4}
          fontFamily={fonts.medium}
        />
        <CustomText
          label="•"
          fontSize={12}
          lineHeight={12 * 1.4}
          fontFamily={fonts.medium}
          color="#12121252"
        />
        <CustomText
          label={vehicle?.brand}
          fontSize={12}
          lineHeight={12 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>
    </>
  );
};

export default StopDistance;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  secondContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  vehicleIcon: {
    width: 35,
    height: 20,
  },
  colorCircle: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
});
