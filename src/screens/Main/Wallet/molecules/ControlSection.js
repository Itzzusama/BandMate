import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import ControlItem from "./ControlItem";
import { PNGIcons } from "../../../../assets/images/icons";
import { useNavigation } from "@react-navigation/native";

const ControlSection = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <CustomText
        label="Keep Control over your Finance"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.black}
      />

      <ControlItem
        icon={PNGIcons.setBudget}
        title="Set your budget"
        subtitle="Take control of your spendings"
        onPress={() => navigation.navigate("SetupBudget")}
      />

      <ControlItem
        icon={PNGIcons.autoRefill}
        title="Set automatic refill"
        subtitle="Schedule and guarantee you can pay"
        onPress={() => navigation.navigate("AutoRefill")}
      />

      <ControlItem
        icon={PNGIcons.payUsingPin}
        title="Pay using a PIN code"
        subtitle="Secure your order with a secret PIN code"
        onPress={() => navigation.navigate("BlockPin")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
    marginHorizontal: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
});

export default ControlSection;
