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

const CreatePassword = ({ setState, state, currentIndex, setCurrentIndex }) => {
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

  const NextStepData = () => {
    const err = errorCheck(pass);
    if (err) return;
    setState({ ...state, password: pass });
    if (currentIndex < 11) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "A1";
    for (let i = 0; i < 6; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    newPassword = newPassword
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");

    setPass(newPassword);
    setMinLength(false);
    setHasUppercase(false);
    setHasDigit(false);
    setMinSuccess(true);
    setUpperSuccess(true);
    setDigitSuccess(true);
  };

  return (
    <ScreenWrapper
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <AuthFooter
            onPress={()=>navigation.navigate("ConfirmPassword")}
            onBackPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <AuthHeader
        title="Confirm password"
        subtitle="Confirm your password"
        step={2}
        totalSteps={3}
      />
      <View>
        <CustomText
          label="Create a password"
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

        <TouchableOpacity style={[styles.item, { marginTop: -5 }]}>
          <CustomText
            onPress={generatePassword}
            label="Generate a password for me"
            color={COLORS.darkPurple}
            fontFamily={fonts.semiBold}
            fontSize={12}
          />
          <ImageFast
            style={{ height: 10, width: 10, marginLeft: 5 }}
            source={Images.uparrow}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <ErrorComponent
          errorTitle="Minimum 8 characters."
          isValid={minSuccess}
          error={minLength}
          color={minSuccess ? "#64CD75" : minLength ? "#EE1045" : COLORS.gray1}
        />
        <ErrorComponent
          errorTitle="Minimum 1 uppercase"
          isValid={upperSuccess}
          error={hasUppercase}
          color={
            upperSuccess ? "#64CD75" : hasUppercase ? "#EE1045" : COLORS.gray1
          }
        />
        <ErrorComponent
          errorTitle="Minimum 1 digit"
          isValid={digitSuccess}
          error={hasDigit}
          color={digitSuccess ? "#64CD75" : hasDigit ? "#EE1045" : COLORS.gray1}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
