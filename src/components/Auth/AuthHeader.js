import { StyleSheet, View } from "react-native";
import CustomText from "../CustomText";
import Icons from "../Icons";
import fonts from "../../assets/fonts";
import { COLORS } from "../../utils/COLORS";
import AuthSlider from "./AuthSlider";

const AuthHeader = ({
  title = "Registration",
  subtitle = "Choose your user type",
  step = 1,
  totalSteps = 6,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.left}>
          <CustomText
            label={title}
            fontFamily={fonts.semiBold}
            fontSize={20}
            lineHeight={25}
            color={COLORS.authHeader}
          />
          <CustomText
            label={subtitle}
            fontFamily={fonts.regular}
            fontSize={14}
            lineHeight={22}
            color={COLORS.gray1}
          />
        </View>
        <View style={styles.right}>
          <CustomText
            label={`${step}/${totalSteps}`}
            fontFamily={fonts.semiBold}
            fontSize={16}
            marginRight={10}
            color={COLORS.authHeader}
          />
          <View style={styles.infoCircle}>
            <Icons
              family="MaterialIcons"
              name="info-outline"
              size={24}
              color={COLORS.black}
            />
          </View>
        </View>
      </View>
      <AuthSlider min={step || 1} max={totalSteps || 6} marginTop={12} />
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: COLORS.white,
    paddingTop: 24,
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flex: 1,
  },
  right: {
    flexDirection: "row",
    // alignItems: "center",
  },
  infoCircle: {
    width: 44,
    height: 44,
    borderRadius: 99,
    backgroundColor: "#12121214",
    alignItems: "center",
    justifyContent: "center",
  },
});
