import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const ListHeader = ({ title = "You matched with Catie on Jan 4, 2023" }) => {
  return (
    <View style={styles.box}>
      <View style={styles.border} />
      <CustomText
        fontSize={12}
        color={COLORS.white}
        fontFamily={fonts.regular}
        label={title}
      />
      <View style={styles.border} />
    </View>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  box: {
    // backgroundColor: COLORS.inputBg,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
    marginTop: 10,
  },
  border: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.inputBg,
  },
});
