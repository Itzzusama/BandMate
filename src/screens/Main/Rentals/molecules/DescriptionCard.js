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
          label={"Description"}
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
            "Makeupe is a modern beauty shopping app designed to transform the way users discover and buy makeup products. With advanced features like AR Makeup Try-On, users can virtually try products, ensuring they find the perfect shade and match before purchasing. Whether you’re a beginner exploring new products or a beauty enthusiast looking for the latest trends, Makeupe offers an intuitive shopping experience with personalized recommendations, detailed product insights, and seamless navigation."
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
