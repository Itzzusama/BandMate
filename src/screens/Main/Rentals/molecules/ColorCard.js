import { Image, StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const ColorCard = () => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.row}>
          <CustomText
            label="Color"
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          <Image
            source={Images.color}
            style={{ height: 16, width: 16, marginLeft: 4 }}
          />
        </View>

        <Icons name={"chevron-down"} size={20} />
      </View>

      <View style={styles.locationCard}>
        <View
          style={{
            height: 40,
            width: 40,
            borderWidth: 2,
            borderColor: COLORS.primaryColor,
            borderRadius: 99,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: COLORS.primaryColor,
              borderRadius: 99,
              height: 32,
              width: 32,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ColorCard;

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
