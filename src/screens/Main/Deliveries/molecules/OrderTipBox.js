import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";

const OrderTipBox = () => {
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        label={"Tipping & Donations"}
      />
      <Pressable style={styles.card}>
        <View style={[styles.row, { paddingHorizontal: 6 }]}>
          <ImageFast style={styles.icon} source={Images.flag} />
          <View style={[styles.row1, { flex: 1 }]}>
            <View>
              <CustomText
                lineHeight={14 * 1.4}
                fontFamily={fonts.medium}
                label={"Give 1% of your trip"}
              />
              <CustomText
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.subtitle}
                fontFamily={fonts.medium}
                label={"To Children in Croatia"}
              />
            </View>
            <TouchableOpacity style={styles.outerCircle}>
              <View style={styles.circle} />
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default OrderTipBox;

const styles = StyleSheet.create({
  outerCircle: {
    borderWidth: 2,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#1212127A",
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 10,
    alignSelf: "center",
    backgroundColor: COLORS.black,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 50,
    marginRight: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
