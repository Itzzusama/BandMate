import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import StopDistance from "./StopDistance";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripSteps = ({
  startAddress = {},
  endAddress = {},
  steps = [],
  orderData = {},
  vehicle = {},
  metadata = {},
  onAddPress,
  loading = false,
}) => {
  const finalArray = [startAddress, ...steps, endAddress];

  const totalDistance = [metadata?.totalDistance, ...orderData?.totalDistance];
  const totalTime = [metadata?.totalDuration, ...orderData?.totalTime];

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.dotContainer}>
          {finalArray?.map((_, i) => (
            <View key={i}>
              <View style={[styles.circleIndicator]}>
                <CustomText
                  label={i + 1}
                  color={COLORS.black}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.semiBold}
                />
              </View>
              {i === finalArray?.length - 1 ? null : (
                <View style={styles.stepLine} />
              )}
            </View>
          ))}
        </View>
        <View style={styles.contentContainer}>
          {finalArray?.map((item, index) => (
            <>
              <View key={item.id} style={styles.AddressContainer}>
                <View style={{ width: "85%" }}>
                  <CustomText
                    fontSize={16}
                    color={COLORS.black}
                    lineHeight={16 * 1.4}
                    fontFamily={fonts.medium}
                    label={
                      index == 0
                        ? "PICKUP"
                        : index == finalArray?.length - 1
                        ? "ENDING IN"
                        : "TO"
                    }
                  />
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icons
                      family="MaterialIcons"
                      name="location-pin"
                      size={16}
                    />
                    <CustomText
                      fontSize={16}
                      color={COLORS.black}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.medium}
                      label={item?.address}
                      numberOfLines={1}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.iconContainer}>
                  <Image
                    source={index == 0 ? PNGIcons.map : PNGIcons.edit}
                    style={{ width: 18, height: 18 }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ height: 70, width: "100%" }}>
                <StopDistance
                  distanceLabel={totalDistance[index]}
                  etaLabel={totalTime}
                  vehicle={vehicle}
                  index={index}
                />
              </View>
            </>
          ))}
        </View>
      </View>
      <CustomButton
        width="90%"
        borderRadius={12}
        icon={PNGIcons.plus}
        title="Add A Step"
        color={COLORS.black}
        alignSelf="flex-end"
        backgroundColor={"#1212120A"}
        marginTop={10}
        onPress={onAddPress}
        loading={loading}
      />
      <View style={styles.warningBox}>
        <Icons name="info" family="Feather" color={COLORS.warning} />
        <CustomText
          label="The arrival time is an estimation based on the distance of your trip and could vary depending on several factors such as traffic, accidents, etc."
          fontSize={12}
          marginTop={-3}
          marginRight={10}
          color={COLORS.warning}
        />
      </View>
    </View>
  );
};

export default TripSteps;

const styles = StyleSheet.create({
  dotContainer: {
    width: "11%",
    marginTop: 4,
  },
  contentContainer: {
    width: "89%",
  },
  circleIndicator: {
    width: 32,
    height: 32,
    zIndex: 2,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1212120A",
  },
  stepLine: {
    width: 1,
    height: 82,
    marginRight: 10,
    marginVertical: 8,
    alignSelf: "center",
    backgroundColor: "#12121229",
  },

  AddressContainer: {
    height: 56,
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1212120A",
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#A57A3A0A",
    padding: 8,
    columnGap: 5,
    borderRadius: 12,
    marginTop: 15,
  },
  iconContainer: {
    backgroundColor: "#1212120A",
    height: 32,
    width: 32,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
