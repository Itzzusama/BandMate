import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { Image } from "react-native";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("AdvancedSettings")}>
        <CustomText
          label={"My Profile"}
          fontSize={32}
          lineHeight={32 * 1.4}
          fontFamily={fonts.abril}
        />
        <View style={styles.row}>
          <Image source={PNGIcons.preference} style={styles.icon} />
          <CustomText
            label={"Manage your preferences"}
            fontSize={14}
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
            marginLeft={4}
            color={COLORS.white3}
          />
        </View>
      </Pressable>
      <TouchableOpacity
        style={styles.crossIconWrapper}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Image source={PNGIcons.white_cross} style={styles.crossIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 12,
    width: 12,
    tintColor: COLORS.white3,
  },
  crossIconWrapper: {
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 50,
    borderRadius: 99,
  },
  crossIcon: {
    height: 22,
    width: 22,
    resizeMode: "contain",
    tintColor: COLORS.white,
  },
});
