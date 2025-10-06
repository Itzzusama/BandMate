import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import TreasuryItem from "./TreasuryItem";

const TreasurySection = ({ incomes, outcomes }) => {
  return (
    <View style={styles.container}>
      <CustomText
        label="Treasury"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.black}
      />

      {incomes && (
        <TreasuryItem
          title="Incomes"
          amount="$2,831.98"
          percentage="81%"
          isIncome={true}
          progress={100}
        />
      )}

      {outcomes && (
        <TreasuryItem
          title="Outcomes"
          amount="50.00$"
          percentage="19%"
          isIncome={false}
          progress={0.19}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    marginHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  forwardDesign: {
    height: 24,
    width: 24,
  },
});

export default TreasurySection;
