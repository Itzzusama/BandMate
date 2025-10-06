import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const OrderDetailsBox = () => {
  return (
    <View style={styles.box}>
      <CustomText
        fontSize={18}
        marginBottom={10}
        lineHeight={18 * 1.4}
        label={"Order Details"}
        fontFamily={fonts.medium}
      />
      <View style={styles.row}>
        <CustomText
          fontSize={12}
          label={"Subtotal"}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
        <CustomText
          fontSize={16}
          label={"$2.00"}
          lineHeight={12 * 1.4}
          fontFamily={fonts.semiBold}
        />
      </View>
      <View style={styles.row}>
        <CustomText
          fontSize={12}
          label={"Distance"}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
        <CustomText
          fontSize={16}
          label={"$2.00"}
          lineHeight={12 * 1.4}
          fontFamily={fonts.semiBold}
        />
      </View>
      <View style={[styles.row, { marginBottom: 0 }]}>
        <CustomText
          fontSize={12}
          label={"Discount"}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
        <CustomText
          fontSize={16}
          label={"$-2.00"}
          lineHeight={12 * 1.4}
          color={COLORS.green1}
          fontFamily={fonts.semiBold}
        />
      </View>
      <View style={styles.line} />
      <View style={[styles.row, { marginBottom: 0 }]}>
        <CustomText
          fontSize={12}
          label={"Platform fee (15%)"}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
        />
        <CustomText
          fontSize={16}
          label={"$2.00"}
          lineHeight={12 * 1.4}
          fontFamily={fonts.semiBold}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          label={"planting trees (1%)"}
        />
        <CustomText
          fontSize={16}
          label={"$2.00"}
          lineHeight={12 * 1.4}
          fontFamily={fonts.semiBold}
        />
      </View>
      <View style={styles.row}>
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          label={"support communities (1%)"}
        />
        <CustomText
          fontSize={16}
          label={"$2.00"}
          lineHeight={12 * 1.4}
          fontFamily={fonts.semiBold}
        />
      </View>
    </View>
  );
};

export default OrderDetailsBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 12,
    paddingVertical: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: "#1212120A",
    marginVertical: 15,
  },
});
