import { Image, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const PickUpAndReturn = ({}) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.row}>
          <CustomText
            label={"Pickup & Return"}
            fontFamily={fonts.semiBold}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          <Image
            source={Images.newLoc}
            style={{ height: 16, width: 16, marginLeft: 4 }}
          />
        </View>

        <Icons name={"chevron-down"} size={20} />
      </View>
      <View style={[styles.locationCard, { marginTop: 12 }]}>
        <View style={{ width: "85%" }}>
          <CustomText
            label={"From"}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={COLORS.gray1}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 16, width: 16, tintColor: COLORS.primaryColor }}
              source={PNGIcons.pin}
            />
            <CustomText
              label={"Chemin du Centurion 11, 1209, Geneva"}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
              marginLeft={4}
              numberOfLines={1}
            />
          </View>
        </View>

        <Image source={Images.directionBg} style={styles.icon} />
      </View>

      <View style={styles.locationCard}>
        <View style={{ width: "87%" }}>
          <CustomText
            label={"Where To"}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={COLORS.gray1}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{ height: 16, width: 16, tintColor: COLORS.primaryColor }}
              source={PNGIcons.pin}
            />
            <CustomText
              label={"Chemin du Centurion 11, 1209, Geneva"}
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
              marginLeft={4}
              numberOfLines={1}
            />
          </View>
        </View>

        <Image source={Images.directionBg} style={styles.icon} />
      </View>
    </View>
  );
};

export default PickUpAndReturn;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  arrow: {
    height: 24,
    width: 24,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.lightGray,
    marginTop: 8,
  },
  icon: {
    height: 32,
    width: 32,
  },
});
