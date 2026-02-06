import { StyleSheet, View } from "react-native";
import React from "react";
import InfoCard from "./InfoCard";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import EditButton from "./EditButton";
import { useNavigation } from "@react-navigation/native";

const Availability = ({ myPage, userData }) => {
  const navigation = useNavigation();

  const availabilityMap = {
    weekdays: "Weekdays",
    weekends: "Weekends",
  };

  // ✅ Get only enabled availability
  const activeAvailability = Object.entries(userData?.Availability || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => availabilityMap[key]);

  return (
    <View style={{ paddingHorizontal: 12 }}>
      <View style={styles.rowContainer}>
        <CustomText
          label="Availability"
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />

        {myPage && (
          <EditButton onPress={() => navigation.navigate("Availability")} />
        )}
      </View>

      <View style={styles.row}>
        {activeAvailability.length > 0 ? (
          activeAvailability.map((item, index) => (
            <InfoCard key={index} name={item} />
          ))
        ) : (
          <CustomText
            label="Not specified"
            fontSize={13}
            color={COLORS.white2}
            marginBottom={20}
            marginTop={2}
          />
        )}
      </View>
    </View>
  );
};

export default Availability;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 4,
  },
});
