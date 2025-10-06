import { Pressable, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const TripInvoice = () => {
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        label={"My Receipt & Invoice"}
      />
      <View style={styles.row}>
        <Pressable style={styles.box}>
          <Icons name={"receipt"} family={"FontAwesome5"} size={25} />
          <CustomText
            marginTop={5}
            fontSize={12}
            label={"Receipt"}
            lineHeight={12 * 1.4}
            color={COLORS.subtitle}
          />
        </Pressable>
        <Pressable style={styles.box}>
          <Icons size={25} name={"receipt"} family={"MaterialDesignIcons"} />
          <CustomText
            marginTop={5}
            fontSize={12}
            label={"Invoice"}
            lineHeight={12 * 1.4}
            color={COLORS.subtitle}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default TripInvoice;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#1212120A",
    borderRadius: 12,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    width: "49%",
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
});
