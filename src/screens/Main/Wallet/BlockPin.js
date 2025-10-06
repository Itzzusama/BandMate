import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import OTPComponent from "../../../components/OTP";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "../ParkingSettings/molecules/ToggleCard";

const BlockPin = () => {
  const navigation = useNavigation();
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [otp, setOtp] = useState("");

  const isValidOtp = otp.length === 4;

  const handleCreatePin = () => {
    if (isToggleOn && !isValidOtp) {
      // Show error or alert for invalid OTP
      return;
    }
    navigation.navigate("DefineAmount");
  };

  const handleCancel = () => {
    setIsToggleOn(false);
    setOtp("");
    navigation.goBack();
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Block Card"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={isToggleOn ? "Confirm PIN" : "Create PIN"}
            onPress={handleCreatePin}
            disabled={isToggleOn && !isValidOtp}
            backgroundColor={
              isToggleOn && !isValidOtp ? COLORS.lightGray : COLORS.primaryColor
            }
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            marginTop={8}
            onPress={handleCancel}
          />
        </View>
      )}
    >
      <CustomText
        label={"Use PIN code to pay"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        textTransform={"default"}
      />
      <CustomText
        label={
          "You can unlock your card at anytime. No one will be able to use this card when blocked."
        }
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        textTransform={"default"}
        marginBottom={10}
      />

      <ToggleCard
        label="Use PIN code to pay"
        switchValue={isToggleOn}
        setSwitchValue={() => setIsToggleOn(!isToggleOn)}
      />

      {isToggleOn && (
        <View style={styles.otpContainer}>
          <CustomText
            label="Enter PIN Code"
            fontFamily={fonts.semiBold}
            fontSize={20}
            lineHeight={20 * 1.4}
            textTransform={"default"}
            marginTop={24}
            marginBottom={8}
          />
          <CustomText
            label="Please enter your 4-digit PIN code to confirm blocking this card."
            color={COLORS.gray1}
            fontSize={14}
            lineHeight={14 * 1.4}
            textTransform={"default"}
            marginBottom={20}
          />
          <OTPComponent value={otp} setValue={setOtp} />
          {!isValidOtp && otp.length > 0 && (
            <CustomText
              label="Please enter a complete 4-digit PIN"
              color={COLORS.red}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginTop={8}
              textAlign="center"
            />
          )}
        </View>
      )}
    </ScreenWrapper>
  );
};

export default BlockPin;

const styles = StyleSheet.create({
  footer: {
    padding: 12,
  },
  otpContainer: {
    marginTop: 16,
  },
});
