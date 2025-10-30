import { StyleSheet, Image, View } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";

const TendingTopic = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <CustomText
          label={"TRENDING"}
          color={COLORS.gray2}
          fontFamily={fonts.medium}
        />
        <CustomText
          label={"TOPICS"}
          color={COLORS.white}
          marginLeft={4}
          fontFamily={fonts.medium}
        />
      </View>
      <View style={styles.wrapper}>
        {[1, 2, 3, 4, 5, 6, 7].map((i, index) => (
          <View style={styles.cardBg}>
            <CustomText
              label={`#${"Crypto"}`}
              fontSize={12}
              color={COLORS.gray2}
              fontFamily={fonts.medium}
            />
          </View>
        ))}
      </View>
      <View style={[styles.wrapper, { marginTop: 8 }]}>
        {[1, 2, 3, 4, 5, ].map((i, index) => (
          <View
            style={[
              styles.cardBg,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <Image source={Images.stock} style={{ height: 14, width: 14 }} />
            <CustomText
              label={`${"Basketball"}`}
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.buttonColor}
              marginLeft={4}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default TendingTopic;

const styles = StyleSheet.create({
  mainContainer: { padding: 12, backgroundColor: COLORS.black },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  wrapper: {
    gap: 4,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
  },
  cardBg: {
    backgroundColor: COLORS.inputBg,
    padding: 10,
    borderRadius: 99,
  },
});
