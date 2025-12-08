import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { PaymnetsImages } from "../../../../assets/images/paymnets";
import ErrorComponent from "../../../../components/ErrorComponent";
import { Images } from "../../../../assets/images";
import Icons from "../../../../components/Icons";

const paymentIcons = [
  PaymnetsImages.visa,
  PaymnetsImages.amex,
  PaymnetsImages.mastercard,
  PaymnetsImages.maestro,
  PaymnetsImages.discover,
  PaymnetsImages.unionpay,
  PaymnetsImages.bitcoin,
  PaymnetsImages.jcb,
  PaymnetsImages.paypal,
  PaymnetsImages.diners,
];

const PaymentCard = () => {
  return (
    <View style={styles.card}>
      {/* ✅ HEADER */}
      <TouchableOpacity style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            source={Images.verified}
            style={{ height: 20, width: 20, tintColor: COLORS.white }}
          />
          <CustomText
            label="Buying Protection"
            fontFamily={fonts.semiBold}
            fontSize={16}
          />
        </View>

        <Icons
          family={"Entypo"}
          name={"chevron-down"}
          color={COLORS.white2}
          size={22}
        />
      </TouchableOpacity>

      <View style={styles.infoPill}>
        <ErrorComponent
          errorTitle={
            "Please keep all conversations within the platform to protect your purchases."
          }
          color={"#A57A3A"}
        />
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        {/* ✅ PAYMENT PROTECTION */}
        <CustomText
          label="Payment Protection"
          fontFamily={fonts.semiBold}
          fontSize={16}
          marginTop={20}
        />

        <CustomText
          label="Your payment won’t be available to sellers until you finally receive your delivery or for a maximum of 2 weeks after the delivery date."
          color={COLORS.gray1}
          fontSize={12}
          lineHeight={12 * 1.4}
          marginTop={8}
        />

        {/* ✅ LEARN MORE */}
        <TouchableOpacity style={styles.learnRow}>
          <CustomText
            label="Learn More"
            fontFamily={fonts.medium}
            fontSize={12}
          />
          <Icons
            color={COLORS.white2}
            size={22}
            family={"Entypo"}
            name={"chevron-right"}
          />
        </TouchableOpacity>

        {/* ✅ PAYMENT METHODS */}
        <CustomText
          label="Multiple Payment Methods"
          fontFamily={fonts.medium}
          fontSize={16}
          marginTop={24}
        />

        <View style={styles.iconsGrid}>
          {paymentIcons.map((icon, index) => (
            <Image source={icon} style={styles.icon} resizeMode="contain" />
          ))}
        </View>

        {/* ✅ LEARN MORE */}
        <TouchableOpacity style={styles.learnRow}>
          <CustomText label="Learn More" fontFamily={fonts.medium} />
          <Icons
            color={COLORS.white2}
            size={22}
            family={"Entypo"}
            name={"chevron-right"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentCard;

const styles = StyleSheet.create({
  card: {
    padding: 12,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  shieldIcon: {
    height: 26,
    width: 26,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
  },

  infoPill: {
    backgroundColor: "#A57A3A0A",
    padding: 8,
    borderRadius: 12,
    marginTop: 12,
  },

  learnRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },

  iconsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14,
  },

  iconBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    width: 48,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 36,
    height: 24,
  },
});
