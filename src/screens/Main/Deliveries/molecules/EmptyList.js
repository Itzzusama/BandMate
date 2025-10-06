import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import CustomButton from "../../../../components/CustomButton";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";

const EmptyList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgBox}>
        <Image source={PNGIcons.order} style={styles.img} />
      </View>
      <CustomText
        fontSize={24}
        lineHeight={24 * 1.4}
        label={"No Orders Yet"}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        marginTop={5}
        lineHeight={14 * 1.4}
        color={COLORS.subtitle}
        label={"See the full history of your orders in here."}
      />

      <TouchableOpacity style={styles.btn}>
        <Icons
          size={17}
          name={"plus"}
          family={"Feather"}
          color={COLORS.white}
        />
        <CustomText
          color={COLORS.white}
          lineHeight={14 * 1.4}
          fontFamily={fonts.medium}
          label={"Hungry? Let’s get it!"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  imgBox: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.lightGray,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  btn: {
    backgroundColor: COLORS.black,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
    height: 34,
    paddingHorizontal: 13,
    marginTop: 25,
  },
});
