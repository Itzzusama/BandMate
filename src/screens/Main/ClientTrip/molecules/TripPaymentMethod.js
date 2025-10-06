import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import CustomSwitch from "../../../../components/CustomSwitch";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const TripPaymentMethod = () => {
  const [roundPrice, setRoundPrice] = useState(true);
  const [isBusiness, setIsBusiness] = useState(true);
  return (
    <View>
      <CustomText
        fontSize={18}
        lineHeight={18 * 1.4}
        label={"Payment Method"}
        fontFamily={fonts.medium}
      />
      <View style={styles.box}>
        <View style={styles.iconCircle}>
          <Icons name={"credit-card"} family={"Entypo"} size={20} />
        </View>
        <View style={[styles.row, { flex: 1 }]}>
          <View>
            <CustomText
              fontSize={16}
              label={"Company"}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
            <CustomText
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              label={"80,750.00 credits"}
            />
          </View>
          <TouchableOpacity>
            <Icons
              name={"chevron-right"}
              family={"Feather"}
              size={20}
              color={COLORS.subtitle}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.row, styles.mt]}>
        <CustomText
          fontSize={16}
          lineHeight={16 * 1.4}
          label={"Round-up price"}
          fontFamily={fonts.medium}
        />
        <CustomSwitch value={roundPrice} setValue={setRoundPrice} />
      </View>
      <View style={[styles.row, styles.mt]}>
        <CustomText
          fontSize={16}
          lineHeight={16 * 1.4}
          fontFamily={fonts.medium}
          label={"Mark as Business"}
        />
        <CustomSwitch value={isBusiness} setValue={setIsBusiness} />
      </View>
    </View>
  );
};

export default TripPaymentMethod;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#1212120A",
    borderRadius: 12,
    padding: 8,
    marginTop: 20,
    flexDirection: "row",
    columnGap: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mt: {
    marginTop: 12,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});
