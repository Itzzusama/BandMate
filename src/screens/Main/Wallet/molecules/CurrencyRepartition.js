import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import { PNGIcons } from "../../../../assets/images/icons";

const CurrencyRepartition = ({ onPress }) => {
  return (
    <View style={styles.section}>
      <CustomText
        label="Currency Repartition"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.black}
        marginBottom={16}
      />

      <View style={[styles.currencyItem, { marginBottom: 16 }]}>
        <View style={styles.currencyContent}>
          <View style={styles.iconRow}>
            <ImageFast
              source={PNGIcons.creditCard}
              style={{ height: 40, width: 40 }}
            />
            <View style={styles.textContainer}>
              <CustomText
                label="Credit card"
                fontFamily={fonts.medium}
                fontSize={14}
                lineHeight={14 * 1.4}
                color={COLORS.primaryColor}
              />
              <CustomText
                label="100.00$ - 2981.98%"
                fontSize={12}
                lineHeight={12 * 1.4}
                color={"#828282"}
              />
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: "85%", backgroundColor: COLORS.darkPurple },
              ]}
            />
          </View>
        </View>
        <Icons
          name="chevron-right"
          family="Feather"
          size={20}
          color={COLORS.gray1}
        />
      </View>

      <View style={styles.currencyItem}>
        <View style={styles.currencyContent}>
          <View style={styles.iconRow}>
            <ImageFast
              source={PNGIcons.solaCredit}
              style={{ height: 24, width: 24, marginLeft: 8 }}
              resizeMode={"contain"}
            />
            <View style={[styles.textContainer, { marginLeft: 14 }]}>
              <CustomText
                label="Sola credits"
                fontFamily={fonts.medium}
                fontSize={14}
                lineHeight={14 * 1.4}
                color={COLORS.primaryColor}
              />
              <CustomText
                label="2881.98$ - 85940.07%"
                fontFamily={fonts.regular}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={"#828282"}
              />
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: "95%", backgroundColor: COLORS.darkPurple },
              ]}
            />
          </View>
        </View>
        <Icons
          name="chevron-right"
          family="Feather"
          size={20}
          color={COLORS.gray1}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  currencyItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyContent: {
    flex: 1,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  textContainer: {
    marginLeft: 8,
    flex: 1,
  },
  solaIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 8,
    marginLeft: 42,
  },
  progressFill: {
    height: 8,
    borderRadius: 8,
  },
});

export default CurrencyRepartition;
