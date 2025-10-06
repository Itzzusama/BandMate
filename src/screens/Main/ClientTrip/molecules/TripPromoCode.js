import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const TripPromoCode = () => {
  return (
    <View>
      <View style={[styles.row]}>
        <Image
          style={styles.icon}
          resizeMode={"contain"}
          tintColor={COLORS.black}
          source={Images.WhiteDiscount}
        />
        <CustomText
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          label={"Apply A Promotional Code"}
        />
      </View>
      <View style={styles.box}>
        <View>
          <View style={[styles.tagBox, styles.row]}>
            <Image
              style={styles.icon1}
              resizeMode={"contain"}
              tintColor={COLORS.white}
              source={Images.WhiteDiscount}
            />
            <CustomText
              fontSize={12}
              label={"-10%"}
              color={COLORS.white}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
          <CustomText
            fontSize={16}
            label={"WELCOME10"}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
        <TouchableOpacity>
          <Icons
            size={20}
            family={"Entypo"}
            color={"#121212A3"}
            name={"chevron-right"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripPromoCode;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  icon: {
    width: 17,
    height: 17,
    marginTop: 2,
  },
  icon1: {
    width: 12,
    height: 12,
  },
  tagBox: {
    backgroundColor: "#4347FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  box: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderColor: COLORS.inputBg,
    borderRadius: 12,
    marginTop: 12,
  },
});
