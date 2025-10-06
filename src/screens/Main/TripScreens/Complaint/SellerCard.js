import { Image, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const SellerCard = () => {
  return (
    <View style={[styles.row, { gap: 12 }]}>
      <ImageFast
        source={Images.user}
        style={{ height: 40, width: 40, borderRadius: 99 }}
      />
      <View>
        <CustomText
          label={"Seller Name"}
          fontSize={16}
          fontFamily={fonts.medium}
          lineHeight={16 * 1.4}
        />
        <View style={[styles.row, { gap: 4 }]}>
          <Image source={PNGIcons.star} style={{ height: 12, width: 12 }} />
          <CustomText
            label={"4.5"}
            fontSize={12}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label={"250 Trips"}
            fontSize={12}
            color={COLORS.gray1}
            lineHeight={12 * 1.4}
          />
        </View>
      </View>
    </View>
  );
};

export default SellerCard;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
