import { Dimensions, Image, StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";

import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";

const { width } = Dimensions.get("window");
const Card = ({ price }) => {
  return (
    <View style={styles.mainContainer}>
      <ImageFast
        source={PNGIcons.dala}
        style={styles.dala}
        resizeMode="contain"
      />
      <View style={styles.contentContainer}>
        <View style={[styles.row, { gap: 4 }]}>
          <Icons family="AntDesign" name="star" size={14} />
          <CustomText
            label="4.7"
            fontSize={12}
            fontFamily={fonts.semiBold}
            lineHeight={12 * 1.4}
          />
          <CustomText
            label="(1.2k) (1.2k rentals)"
            fontSize={10}
            fontFamily={fonts.medium}
            lineHeight={10 * 1.4}
            color={COLORS.subtitle}
          />
        </View>
        <CustomText
          label="Chevrolet Silverado"
          fontSize={16}
          fontFamily={fonts.semiBold}
          lineHeight={16 * 1.4}
          marginTop={4}
          marginBottom={2}
        />
        <View style={[styles.row, { gap: 3 }]}>
          <Image source={PNGIcons.pin} style={styles.pinIcon} />

          <CustomText
            label="Geneva"
            fontSize={12}
            color={COLORS.subtitle}
            lineHeight={12 * 1.4}
          />
        </View>
        <CustomText
          label={`"$${price}/Day"`}
          fontSize={12}
          fontFamily={fonts.semiBold}
          lineHeight={12 * 1.4}
          marginTop={4}
        />
        <CustomText
          label="$70/ est. total"
          fontSize={12}
          color={COLORS.subtitle}
          lineHeight={12 * 1.4}
          marginTop={2}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 24,
    marginRight: 10,
  },
  dala: {
    width: "39%",
    height: 120,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF29",
  },
  contentContainer: {
    width: "59%",
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinIcon: {
    width: 14,
    height: 14,
    marginLeft: -2,
    tintColor: COLORS.black,
    resizeMode: "contain",
  },
});
