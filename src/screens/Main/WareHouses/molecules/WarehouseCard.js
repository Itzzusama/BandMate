import { Dimensions, Image, StyleSheet, View } from "react-native";

import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const { width } = Dimensions.get("window");

const WarehouseCard = ({ price }) => {
  return (
    <View style={styles.card}>
      <View>
        <CustomText
          label="Pedro Garage"
          lineHeight={14 * 1.4}
          fontFamily={fonts.semiBold}
        />
        <View>
          <View style={[styles.row, { gap: 4, marginTop: 0 }]}>
            <Icons family="AntDesign" name="star" size={14} marginLeft={-3} />
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
            <Image
              source={PNGIcons.pin}
              style={styles.pinIcon}
              tintColor={COLORS.subtitle}
            />
            <CustomText
              fontSize={10}
              lineHeight={10 * 1.4}
              color={COLORS.subtitle}
              label="400m from the center"
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
              <Image source={PNGIcons.camp} style={styles.ParkingIcn} />
              <CustomText
                fontSize={10}
                marginTop={2}
                label="24 Spots"
                lineHeight={10 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>

            <View style={[styles.row, { gap: 3 }]}>
              <Image source={PNGIcons.camp} style={styles.ParkingIcn} />
              <CustomText
                fontSize={10}
                marginTop={2}
                label="24 Spots"
                lineHeight={10 * 1.4}
                fontFamily={fonts.medium}
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
  );
};

export default WarehouseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    justifyContent: "space-between",
    flexDirection: "row",
    marginRight: 10,
    width: width - 110,
    padding: 12,
    borderRadius: 8,
  },
  profile: {
    width: 20,
    height: 20,
    borderRadius: 100,
  },

  dala: {
    width: 58,
    height: 58,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF29",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  pinIcon: {
    width: 16,
    height: 16,
    marginLeft: -4,
    tintColor: COLORS.black,
    resizeMode: "contain",
  },
  ParkingIcn: {
    width: 13,
    height: 13,
    marginLeft: -2,
    resizeMode: "contain",
    marginRight: 3,
  },
});
