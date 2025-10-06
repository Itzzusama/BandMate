import { ScrollView, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import CarCard from "../../VehicleMarketplace/molecules/CarCard";

const PopularRentalCard = ({ label }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.row}>
          <CustomText
            label={label || "You Might Like These"}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />

          <View style={styles.sponsorBadge}>
            <CustomText
              label={"Sponsor"}
              fontSize={12}
              fontFamily={fonts.medium}
              lineHeight={12 * 1.4}
            />
          </View>
        </View>

        <Icons name={"chevron-down"} size={20} />
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
      >
        <CarCard isRental />
        <CarCard isRental />
      </ScrollView>
    </View>
  );
};

export default PopularRentalCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sponsorBadge: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginLeft: 4,
  },
  scrollContent: {
    marginTop: 12,
  },
  arrow: {
    height: 24,
    width: 24,
  },
});
