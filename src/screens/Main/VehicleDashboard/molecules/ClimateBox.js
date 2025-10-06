import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const ClimateBox = ({ stat }) => {
  return (
    <View style={styles.statCard}>
      <CustomText
        fontSize={12}
        label={stat?.label}
        color={COLORS.gray3}
        lineHeight={12 * 1.4}
        fontFamily={fonts.medium}
      />
      <CustomText
        marginTop={5}
        fontSize={20}
        label={stat?.value}
        lineHeight={20 * 1.4}
        fontFamily={fonts.semiBold}
      />
      <View style={[styles.row]}>
        <CustomText
          fontSize={10}
          label={stat?.growth}
          color={COLORS.green1}
          fontFamily={fonts.semiBold}
        />
        <Icons
          size={12}
          family={"Feather"}
          name={"trending-up"}
          color={COLORS.green1}
        />
      </View>
      <CustomText
        fontSize={10}
        label={stat?.sub}
        color={COLORS.gray3}
        lineHeight={10 * 1.4}
        fontFamily={fonts.medium}
      />
    </View>
  );
};

export default ClimateBox;

const styles = StyleSheet.create({
  statCard: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 8,
    width: "49%",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    marginTop: 8,
  },
});
