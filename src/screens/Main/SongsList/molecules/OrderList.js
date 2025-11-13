import { Image, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
const OrderList = () => {
  return (
    <View style={[styles.container, styles.row]}>
      <View style={[styles.row, { flex: 1 }]}>
        <Image style={styles.img} source={PNGIcons.arrowUpDown} />
        <CustomText label={"A-Z"} fontSize={12} fontFamily={fonts.medium} />
      </View>
      <Image style={styles.img} source={PNGIcons.grid} />
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderTopWidth: 4,
    borderColor: COLORS.cardColor,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  img: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
});
