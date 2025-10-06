import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import CustomInput from "../../../components/CustomInput";
import { regEmail } from "../../../utils/constants";
import Icons from "../../../components/Icons";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const ProviderRegistor = () => {
  const navigation = useNavigation();
  const init = {
    password: "",
    cpassword: "",
  };
  const inits = {
    passwordError: "",
    cpasswordError: "",
  };
  const [errors, setErrors] = useState(inits);
  const [state, setState] = useState(init);

  const generatePassword = () => {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    let hasUppercase = false;
    let hasDigit = false;
    password += "A";
    password += "1";
    for (let i = 0; i < 6; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    password = password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
    setState({ ...state, password, cpassword: "" });
  };

  const array = [
    {
      id: 1,
      label: "Create a Password",
      placeholder: "**************",
      value: state.password,
      onChange: (text) => setState({ ...state, password: text }),
      error: errors?.passwordError,
      autoCapitalize: "none",
      secureTextEntry: true,
      renderButton: () => (
        <TouchableOpacity style={[styles.item, { marginTop: -5 }]}>
          <CustomText
            onPress={generatePassword}
            label={"Generate a password for me"}
            color={COLORS.darkPurple}
            fontFamily={fonts.semiBold}
            fontSize={12}
          />
          <ImageFast
            style={{ height: 10, width: 10, marginLeft: 5 }}
            source={Images.uparrow}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      ),
    },
    {
      id: 2,
      label: "Confirm Password",
      placeholder: "**************",
      value: state.cpassword,
      onChange: (text) => setState({ ...state, cpassword: text }),
      error: errors?.cpasswordError,
      secureTextEntry: true,
    },
  ];

  const tools = ["Create a free account", "No card required", "Secured access"];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};
      const hasUpperCase = /[A-Z]/.test(state.password);
      const hasDigit = /[0-9]/.test(state.password);
      const isValidPassword =
        state.password &&
        state.password.length >= 8 &&
        hasUpperCase &&
        hasDigit;

      if (!state.password) {
        newErrors.passwordError = "Please enter Password";
      } else if (state.password.length < 8) {
        newErrors.passwordError = "Password must be 8 characters";
      } else if (!hasUpperCase || !hasDigit) {
        newErrors.passwordError = "8 characters.1 uppercase.1 digit.";
      }

      if (state.cpassword) {
        if (state.password !== state.cpassword) {
          newErrors.cpasswordError = "Passwords do not match";
        }
      }

      setErrors(newErrors);
    };
  }, [state]);

  const handleSubmit = () => {
    // if (errorCheck()) {
    // Handle form submission
    navigation.navigate("ProviderBank"); // Replace with your next screen
    // }
  };

  return (
    <ScreenWrapper scrollEnabled>
      <ImageFast
        source={Images.moveSignature}
        style={{ height: 77, marginTop: 20 }}
        resizeMode={"contain"}
      />
      <View
        style={[
          styles.item,
          { marginTop: 20, marginTop: 25, marginBottom: 25 },
        ]}
      >
        <View style={styles.circle} />
        <CustomText
          label={"Define a Password"}
          color={COLORS.gray}
          fontFamily={fonts.semiBold}
          fontSize={24}
          marginLeft={10}
          marginTop={5}
        />
      </View>

      {array?.map((item, index) => (
        <View key={[item?.id]}>
          <CustomInput
            withLabel={item.label}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            autoCapitalize={item.autoCapitalize}
            error={item.error}
            secureTextEntry={item.secureTextEntry}
            keyboardType={item.keyboardType}
            marginTop={item?.id === 2 ? 32 : 0}
          />
          {item.renderButton && item.renderButton()}
        </View>
      ))}
      <View style={styles.line} />
      <View
        style={[
          styles.item,
          { justifyContent: "center", gap: 10, marginBottom: 10 },
        ]}
      >
        <Icons
          name="instagram"
          family="Entypo"
          size={32}
          color={COLORS.darkPurple}
        />
        <Icons
          name="youtube"
          family="AntDesign"
          size={32}
          color={COLORS.darkPurple}
        />
      </View>

      {tools?.map((item) => {
        return (
          <View style={[styles.item, { marginTop: 20 }]}>
            <View style={styles.circle2}>
              <Icons
                name="done"
                family="MaterialIcons"
                size={20}
                color={COLORS.darkPurple}
              />
            </View>
            <CustomText
              label={item}
              marginLeft={10}
              color={"#1212127A"}
              fontFamily={fonts.medium}
              fontSize={14}
            />
          </View>
        );
      })}

      <View style={styles.policyContainer}>
        <View style={styles.policyRow}>
          <CustomText
            label="By signing up, you agree to our "
            color={COLORS.gray}
            fontFamily={fonts.medium}
            textAlign={"center"}
            fontSize={12}
          />
          <CustomText
            label="Privacy Policy"
            color={COLORS.darkPurple}
            fontFamily={fonts.semiBold}
            fontSize={12}
          />
          <CustomText
            label=", "
            color={COLORS.gray}
            fontFamily={fonts.medium}
            fontSize={12}
          />
          <CustomText
            label="Cookie Policy"
            color={COLORS.darkPurple}
            fontFamily={fonts.semiBold}
            fontSize={12}
          />
          <CustomText
            label=" and "
            color={COLORS.gray}
            fontFamily={fonts.medium}
            fontSize={12}
          />
          <CustomText
            label="Terms of Use"
            color={COLORS.darkPurple}
            fontFamily={fonts.semiBold}
            fontSize={12}
          />
          <CustomText
            label=". "
            color={COLORS.gray}
            fontFamily={fonts.medium}
            fontSize={12}
          />
        </View>
        <CustomText
          label="Our policies explain how we use your data to deliver, improve, and promote our service and our site, and how you can exercise your rights to control that use."
          color={COLORS.gray}
          fontFamily={fonts.medium}
          fontSize={12}
          style={{ marginTop: 5 }}
          textAlign={"center"}
        />
      </View>

      <CustomText
        label={`©2025 Sola Group. All rights reserved. Sola Group, SG, the Sola Group logo, move, "m", move (stylized), Joker logos are trademarks or registered of Sola Group in the USA and elsewhere. All other trademarks are the property of their respective owners.`}
        color={COLORS.gray}
        fontFamily={fonts.medium}
        textAlign={"center"}
        fontSize={12}
      />

      <View style={styles.line} />

      <ImageFast
        source={Images.Sheild}
        style={{ height: 20, marginBottom: 10 }}
        resizeMode={"contain"}
      />

      <CustomText
        label={`This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.`}
        color={COLORS.gray}
        fontFamily={fonts.medium}
        marginBottom={20}
        textAlign={"center"}
        fontSize={12}
      />

      <CustomButton title={"Confirm"} onPress={handleSubmit} marginTop={20} />
      <CustomButton
        title={"Later"}
        backgroundColor={"#1212120A"}
        marginTop={10}
        color={COLORS.black}
        marginBottom={30}
      />
    </ScreenWrapper>
  );
};

export default ProviderRegistor;

const styles = StyleSheet.create({
  circle: {
    backgroundColor: COLORS.darkPurple,
    height: 24,
    width: 24,
    borderRadius: 100,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
  },

  generateButton: {
    backgroundColor: COLORS.black,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  circle2: {
    backgroundColor: "#4347FF29",
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  policyContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  policyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  line: {
    backgroundColor: "#1212120A",
    height: 1,
    marginTop: 25,
    marginBottom: 30,
  },
});
