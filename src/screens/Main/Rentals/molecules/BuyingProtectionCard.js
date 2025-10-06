import { Image, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import ErrorComponent from "../../../../components/ErrorComponent";

const BuyingProtectionCard = ({
  title = "Buying Protection",
  details = [],
  isBorder,
}) => {
  return (
    <View
      style={[
        styles.card,
        isBorder && {
          padding: 12,
          borderWidth: 1,
          borderColor: COLORS.inputBg,
          marginTop: 4,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.rowGap}>
          <Image source={PNGIcons.modalIcon2} style={styles.icon} />
          <CustomText
            label={title}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
        </View>

        <Icons name={"chevron-down"} size={20} />
      </View>

      <View style={styles.warningBox}>
        <ErrorComponent
          color={"#A57A3A"}
          errorTitle={
            "Please keep all conversations within the platform to protect your purchases."
          }
        />
      </View>

      <View style={styles.locationCard}>
        <CustomText
          label={"Payment Protection"}
          fontSize={16}
          fontFamily={fonts.medium}
          lineHeight={16 * 1.4}
        />
        <CustomText
          label={
            "Your payment won’t be available to sellers until you finally receive your delivery or for a maximum of 2 weeks after the delivery date."
          }
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          marginTop={8}
          marginBottom={8}
        />
        <View style={styles.rowBetween}>
          <CustomText
            label={"Learn more"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
          <Image source={PNGIcons.forward} style={styles.arrow} />
        </View>
      </View>

      <View style={styles.locationCard}>
        <CustomText
          label={"Multiple Payment Methods"}
          fontSize={16}
          fontFamily={fonts.medium}
          lineHeight={16 * 1.4}
        />
        <View style={styles.paymentRow}>
          <Image source={PNGIcons.visa} style={styles.paymentIcon} />
          <Image source={PNGIcons.mastercard} style={styles.paymentIcon} />
          <Image source={PNGIcons.paypal} style={styles.paymentIcon} />
        </View>
        <View style={styles.rowBetween}>
          <CustomText
            label={"Learn more"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
          <Image source={PNGIcons.forward} style={styles.arrow} />
        </View>
      </View>
    </View>
  );
};

export default BuyingProtectionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  icon: {
    height: 20,
    width: 20,
    tintColor: COLORS.primaryColor,
  },
  warningBox: {
    backgroundColor: "#A57A3A0A",
    padding: 8,
    borderRadius: 12,
  },
  locationCard: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    marginTop: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    height: 24,
    width: 24,
  },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    gap: 8,
  },
  paymentIcon: {
    height: 24,
    width: 38,
    resizeMode: "contain",
  },
});
