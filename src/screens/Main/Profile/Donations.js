import { StyleSheet, TouchableOpacity, View } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const Donations = () => {
  const array = [
    {
      heading: "Donate For the Children of The World",
      desc: "Entrer vos détails et téléversez vos document (Passeport, pièce d’identité)",
      bgColor: "#4347FF",
    },
    {
      heading: "Donate For Climate Change",
      desc: "Entrer vos détails et téléversez vos document (Passeport, pièce d’identité)",
      bgColor: "#6ED07E",
    },
  ];
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title="Donations" textColor={COLORS.black} />
      )}
      footerUnScrollable={() => (
        <View style={{ margin: 12 }}>
          <CustomButton
            title="Confirm"
            // onPress={}
          />
          <CustomButton
            title="Cancel"
            backgroundColor={COLORS.inputBg}
            marginTop={8}
            color={COLORS.black}
            marginBottom={16}
            // onPress={}
          />
        </View>
      )}
    >
      {array.map((item, i) => (
        <TouchableOpacity
          key={i}
          activeOpacity={0.9}
          style={[styles.bg2, { backgroundColor: item.bgColor }]}
        >
          <View style={{ width: "85%" }}>
            <ImageFast
              resizeMode="contain"
              source={PNGIcons.list}
              style={styles.icon}
            />
            <CustomText
              label={item.heading}
              fontSize={18}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
              color={COLORS.white}
              marginBottom={8}
              marginTop={8}
            />
            <CustomText
              label={item.desc}
              color={COLORS.white}
              lineHeight={14 * 1.4}
            />
          </View>

          <Icons
            name="chevron-right"
            family="Entypo"
            size={24}
            color="#FFFFFFA3"
            style={{ marginRight: -5 }}
          />
        </TouchableOpacity>
      ))}
    </ScreenWrapper>
  );
};

export default Donations;

const styles = StyleSheet.create({
  bg2: {
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 32,
    height: 32,
  },
});
