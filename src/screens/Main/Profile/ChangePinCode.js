import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useEffect, useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import OTPComponent from "../../../components/OTP";
import Header from "../../../components/Header";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import AuthFooter from "../../../components/Auth/AuthFooter";

const ChangePinCode = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const onContinue = () => {
    if (!otp) {
      setError("Please enter PIN code");
    } else if (otp.length < 4) {
      setError("Please enter a valid PIN code");
    } else {
      setError("");
      navigation.navigate("ConfirmPinCode", { pin: otp });
    }
  };
  useEffect(() => {
    if (error && otp?.length == 4) {
      setError("");
    }
  }, [otp?.length]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title="PIN Code" />}
      footerUnScrollable={() => (
        <View style={{ padding: 14, marginBottom: 10 }}>
          <AuthFooter />
        </View>
      )}
    >
      <CustomText
        label="Define a PIN Code"
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={40}
      />
      <CustomText
        label="Please enter a PIN code that you will be able to remember and do not share it with someone else."
        color={COLORS.gray1}
        marginBottom={40}
      />

      <OTPComponent
        value={otp}
        setValue={setOtp}
        error={error}
        marginBottom={40}
      />
    </ScreenWrapper>
  );
};

export default ChangePinCode;
