import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const DriverWaterModal = ({ visible, onDisable, loading }) => {
  const [quantity, setQuantity] = useState(1);
  return (
    <CustomModal isVisible={visible} onDisable={onDisable}>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.row}>
            <CustomText
              fontSize={24}
              lineHeight={24 * 1.4}
              label={"Water Bottle"}
              fontFamily={fonts.semiBold}
            />
            <TouchableOpacity onPress={onDisable} style={styles.icon}>
              <Icons name={"close"} family={"AntDesign"} />
            </TouchableOpacity>
          </View>
          <CustomText
            marginTop={15}
            marginBottom={20}
            textAlign={"center"}
            alignSelf={"center"}
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
            label={"Providing water bottles to guest is mandatory, why...?"}
          />

          <ImageFast
            source={Images.food1}
            style={styles.bottle}
            resizeMode={"contain"}
          />

          <TouchableOpacity style={styles.addIcon}>
            <Icons
              size={12}
              name={"plus"}
              color={COLORS.white}
              family={"FontAwesome"}
            />
          </TouchableOpacity>
          <CustomText
            fontSize={18}
            alignSelf={"center"}
            lineHeight={18 * 1.4}
            label={"Evian 0.33cl"}
            fontFamily={fonts.medium}
          />

          <CustomText
            fontSize={12}
            marginBottom={6}
            alignSelf={"center"}
            lineHeight={12 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={"Approved provider"}
          />
          <View style={styles.row1}>
            <Icons
              size={10}
              name={"user-alt"}
              color={COLORS.subtitle}
              family={"FontAwesome5"}
            />
            <CustomText
              fontSize={12}
              alignSelf={"center"}
              lineHeight={12 * 1.4}
              color={COLORS.subtitle}
              fontFamily={fonts.medium}
              label={`${quantity}x bottle per guest`}
            />
          </View>
          <CustomText
            marginTop={15}
            alignSelf={"center"}
            textAlign={"center"}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={
              "Because, move. is eager to provide a better & premium experience to both professionals and customers on our platform."
            }
          />
          <CustomText
            marginTop={20}
            alignSelf={"center"}
            textAlign={"center"}
            lineHeight={14 * 1.4}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
            label={
              "In this perspective, we are fighting for an ethical and unique approach to allow providers to retain 100% of their earnings and provide them with the most complete set of tools to work with the best conditions."
            }
          />

          <CustomButton
            fontSize={16}
            marginTop={15}
            loading={loading}
            title={"I Understand"}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default DriverWaterModal;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
    overflow: "hidden",
    marginVertical: "auto",
    height: "91%",
  },
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    height: "100%",
    paddingBottom: 0,
    overflow: "hidden",
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row1: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
    justifyContent: "center",
  },
  bottle: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
  },
  addIcon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: COLORS.red1,
    alignSelf: "center",
    width: 18,
    height: 18,
    marginBottom: 4,
  },
});
