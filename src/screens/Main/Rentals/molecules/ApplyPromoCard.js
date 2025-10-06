import { Image, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const ApplyPromoCard = ({
  title = "Apply A Promo Code",
  details = [],
  isInfo,
  isBorder = true,
}) => {
  return (
    <View
      style={[
        styles.card,
        isBorder && {
          borderWidth: 1,
          borderColor: COLORS.inputBg,
          marginTop: 4,
          padding: 12,
        },
      ]}
    >
      <View style={styles.row}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Image source={PNGIcons.bookMark} style={{ height: 20, width: 20 }} />
          <CustomText
            label={title}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
        </View>

        <Icons name={"chevron-down"} size={20} />
      </View>

      <View style={styles.locationCard}>
        <View>
          <View style={styles.discountPill}>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <Image
                source={PNGIcons.bookMark}
                style={{ height: 12, width: 12, tintColor: COLORS.white }}
              />
              <CustomText
                label={"-20%"}
                color={COLORS.white}
                fontSize={12}
                lineHeight={12 * 1.4}
                marginLeft={2}
                fontFamily={fonts.medium}
              />
            </View>
          </View>

          <CustomText
            label={"WELCOME10"}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
        </View>
        <Image
          source={PNGIcons.forward}
          style={{ height: 24, width: 24, tintColor: COLORS.primaryColor }}
        />
      </View>
    </View>
  );
};

export default ApplyPromoCard;

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
  arrow: {
    height: 24,
    width: 24,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  icon: {
    height: 32,
    width: 32,
  },
  discountPill: {
    backgroundColor: "#1D9053",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: "flex-start",

    marginBottom: 4,
  },
});
