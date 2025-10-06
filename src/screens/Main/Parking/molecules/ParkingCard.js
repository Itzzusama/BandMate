import { Dimensions, Image, StyleSheet, View } from "react-native";

import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const { width } = Dimensions.get("window");
const ParkingCard = ({ price }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={[styles.row, { marginTop: 5, marginLeft: 10, gap: 4 }]}>
        <ImageFast
          source={Images.user}
          style={styles.profile}
          resizeMode="contain"
        />
        <CustomText
          label={"Viktor Sola"}
          fontSize={12}
          fontFamily={fonts.medium}
          lineHeight={12 * 1.4}
          color={COLORS.white}
        />
      </View>
      <View style={styles.contentContainer}>
        <View>
          <CustomText
            label="Pedro Garage"
            fontSize={14}
            fontFamily={fonts.semiBold}
            lineHeight={14 * 1.4}
          />
          <View>
            <View style={[styles.row, { gap: 4, marginTop: 6 }]}>
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
            <View style={[styles.row, { gap: 3, marginTop: 6 }]}>
              <Image source={PNGIcons.pin} style={styles.pinIcon} />
              <CustomText
                label="235 Zemljak Crest Apt. 102"
                fontSize={10}
                color={COLORS.subtitle}
                lineHeight={10 * 1.4}
              />
            </View>
            <View
              style={[
                styles.row,
                { justifyContent: "space-between", marginTop: 6 },
              ]}
            >
              <View style={[styles.row, { gap: 3 }]}>
                <Image source={Images.ParkingIcon} style={styles.ParkingIcn} />
                <CustomText
                  label="24 Spots"
                  fontSize={10}
                  fontFamily={fonts.medium}
                  color={COLORS.black}
                  lineHeight={10 * 1.4}
                />
              </View>

              <View style={[styles.row, { gap: 3 }]}>
                <Image source={Images.ParkingIcon} style={styles.ParkingIcn} />
                <CustomText
                  label="24 Spots"
                  fontSize={10}
                  fontFamily={fonts.medium}
                  color={COLORS.black}
                  lineHeight={10 * 1.4}
                />
              </View>
            </View>
          </View>
        </View>
        <ImageFast
          source={PNGIcons.dala}
          style={styles.dala}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default ParkingCard;

const styles = StyleSheet.create({
  mainContainer: {
    width: width - 130,
    height: 152,
    backgroundColor: "#776A3D",
    borderRadius: 12,
    marginRight: 10,
  },

  profile: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },

  dala: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF29",
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 122,
    paddingVertical: 12,
    flexDirection: "row",
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
  ParkingIcn: {
    width: 14,
    height: 14,
    marginLeft: -2,
    resizeMode: "contain",
  },
});
