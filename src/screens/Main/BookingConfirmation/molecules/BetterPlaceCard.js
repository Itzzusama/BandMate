import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const BetterPlaceCard = ({
  label,
  selected,
  onSelect,
  header,
  marginBottom,
  isChange,
  title1,
  title2,
}) => {
  const title = label || "Make The World A Better Place";

  return (
    <View style={[styles.mainContainer, { marginBottom }]}>
      {/* Top Row */}
      {header && (
        <View style={[styles.row, { marginBottom: 8 }]}>
          <Image source={PNGIcons.heartFill} style={styles.tip} />
          <CustomText
            label={title}
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
      )}

      {/* Image */}
      <ImageFast source={Images.airport} style={styles.airport} />

      {/* Bottom Row */}
      <View style={[styles.row]}>
        <Image
          source={isChange ? Images.PlantTree : PNGIcons.flag}
          style={styles.flag}
        />
        <View style={styles.textContainer}>
          <CustomText
            label={title1}
            fontSize={14}
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
            color={isChange ? "#04724D" : COLORS.primaryColor}
          />
          <CustomText
            label={title2}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
            color={COLORS.gray2}
          />
        </View>

        <TouchableOpacity onPress={onSelect} style={styles.radioOuter}>
          {selected && <View style={styles.radioInner} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BetterPlaceCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  tip: {
    height: 18,
    width: 18,
    marginRight: 4,
  },
  airport: {
    height: 240,
    width: "100%",
    borderRadius: 12,
    marginBottom: 8,
  },
  flag: {
    height: 24,
    width: 24,
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.gray2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary || "#000",
  },
});
