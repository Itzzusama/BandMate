import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const DescriptionCard = ({ startDate, endDate, setStartDate, setEndDate }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <CustomText
          label={"About This Location"}
          fontFamily={fonts.semiBold}
          fontSize={16}
          lineHeight={16 * 1.4}
        />

        <Icons name={"chevron-down"} size={20} />
      </View>

      <View style={styles.locationCard}>
        <View style={[styles.row, { justifyContent: "flex-start" }]}>
          <Icons
            name={"language"}
            family={"Ionicons"}
            size={12}
            color={COLORS.darkPurple}
          />

          <CustomText
            label={"TRANSLATE ALL REVIEWS"}
            fontFamily={fonts.medium}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={COLORS.darkPurple}
            marginLeft={2}
          />
        </View>

        <CustomText
          fontFamily={fonts.medium}
          color={COLORS.gray1}
          lineHeight={14 * 1.4}
          label={
            "Located in the heart of downtown, this premium parking facility offers 200+ covered spots with state-of-the-art security systems, electric vehicle charging stations, and easy access to major business districts and entertainment venues. The facility features modern payment systems, real-time availability tracking, and professional staff on-site 24/7."
          }
        />
        <CustomText
          fontFamily={fonts.medium}
          color={COLORS.darkPurple}
          fontSize={12}
          lineHeight={12 * 1.4}
          label={"READ MORE"}
        />
      </View>
    </View>
  );
};

export default DescriptionCard;

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
  arrow: {
    height: 24,
    width: 24,
  },
  locationCard: {
    borderRadius: 12,
    marginTop: 8,
  },
  icon: {
    height: 32,
    width: 32,
  },
});
