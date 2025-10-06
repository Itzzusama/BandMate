import { StyleSheet, View } from "react-native";

import DriverInfoCard from "../../../../components/DriverInfoCard";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripVehicleInfo = ({ vehicle, acceptedBy }) => {
  return (
    <View>
      <View style={[styles.row, { marginBottom: 15 }]}>
        <View style={styles.orderNum}>
          <Icons
            name="plus-circle"
            family="FontAwesome"
            size={22}
            color={COLORS.red}
          />
          <CustomText
            label={vehicle?.plateNumber || ""}
            color={COLORS.black}
            fontFamily={fonts.semiBold}
            fontSize={22}
            lineHeight={22 * 1.4}
          />
        </View>

        <View style={[styles.rowItem, { gap: 8 }]}>
          <CustomText
            label="0 saved this Chauffeur"
            color="#121212A3"
            fontFamily={fonts.regular}
            fontSize={12}
            lineHeight={12 * 1.4}
          />
          <View style={styles.likeDislike}>
            <Icons name="heart" family="Feather" size={20} />
          </View>
        </View>
      </View>
      <DriverInfoCard vehicle={vehicle} acceptedBy={acceptedBy} />
    </View>
  );
};

export default TripVehicleInfo;

const styles = StyleSheet.create({
  orderNum: {
    backgroundColor: "#1212120A",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  likeDislike: {
    backgroundColor: "#1212120A",
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowItem: {
    alignItems: "center",
    flexDirection: "row",
  },
});
