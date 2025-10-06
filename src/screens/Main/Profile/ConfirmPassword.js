import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";

import ErrorComponent from "../../../components/ErrorComponent";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import { useNavigation } from "@react-navigation/native";

const ConfirmPassword = ({
  setState,
  state,
  currentIndex,
  setCurrentIndex,
}) => {
  const navigation = useNavigation();
  const [minLength, setMinLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasDigit, setHasDigit] = useState(false);
  const [minSuccess, setMinSuccess] = useState(false);
  const [upperSuccess, setUpperSuccess] = useState(false);
  const [digitSuccess, setDigitSuccess] = useState(false);
  const [pass, setPass] = useState("");

  const errorCheck = (pwd) => {
    setPass(pwd);
    if (pwd.length >= 8) {
      setMinLength(true);
      setMinSuccess(true);
    } else {
      setMinLength(false);
      setMinSuccess(false);
    }
    if (/[A-Z]/.test(pwd)) {
      setHasUppercase(true);
      setUpperSuccess(true);
    } else {
      setHasUppercase(false);
      setUpperSuccess(false);
    }
    if (/\d/.test(pwd)) {
      setHasDigit(true);
      setDigitSuccess(true);
    } else {
      setHasDigit(false);
      setDigitSuccess(false);
    }
    if (!pwd.length >= 8 || !/[A-Z]/.test(pwd) || !/\d/.test(pwd)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ScreenWrapper
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <AuthFooter
            onPress={() => navigation.navigate("CreatePassword")}
            onBackPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <AuthHeader
        title="Change Your Password"
        subtitle="Confirm your password"
        step={3}
        totalSteps={3}
      />
      <View>
        <CustomText
          label="Enter Your Password"
          fontFamily={fonts.semiBold}
          fontSize={24}
          lineHeight={24 * 1.4}
          color={COLORS.primaryColor}
          marginTop={32}
        />
        <CustomInput
          value={pass}
          onChangeText={(text) => errorCheck(text)}
          marginTop={8}
          marginBottom={16}
          placeholder="************"
          secureTextEntry
        />
      </View>
    </ScreenWrapper>
  );
};

export default ConfirmPassword;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
