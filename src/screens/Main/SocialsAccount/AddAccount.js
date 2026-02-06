import { Image, StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import fonts from "../../../assets/fonts";
import ErrorComponent from "../../../components/ErrorComponent";
import CustomInput from "../../../components/CustomInput";
import { put } from "../../../services/ApiRequest";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../utils/ToastMessage";

const AddAccount = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { name, img } = route.params;

  const [value, setValue] = useState("");
  const [errorTitle, setErrorTitle] = useState("Enter your username");
  const [isError, setIsError] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const hasSubmitted = useRef(false);

  /**
   * Validation logic (same pattern as ResetPassword)
   */
  const validate = (text) => {
    setValue(text);

    if (!text) {
      setErrorTitle("Please enter username");
      setIsError(true);
      setIsValid(false);
      return;
    }

    if (text.length < 3) {
      setErrorTitle("Username too short");
      setIsError(true);
      setIsValid(false);
      return;
    }

    if (text.includes(" ")) {
      setErrorTitle("Username should not contain spaces");
      setIsError(true);
      setIsValid(false);
      return;
    }

    setErrorTitle("Valid username");
    setIsError(false);
    setIsValid(true);
  };

  /**
   * Auto-submit with debounce
   */
  useEffect(() => {
    if (!isValid) return;
    if (hasSubmitted.current) return;

    const timer = setTimeout(async () => {
      try {
        hasSubmitted.current = true;

        const payload = {
          profile: {
            socialLinks: {
              [name]: value,
            },
          },
        };

        const res = await put("user/profile", payload);

        if (res?.data?.success) {
          dispatch(setUserData(res.data.user));
          ToastMessage("Account saved successfully", "success");
          setTimeout(() => {
            navigation.goBack();
          }, 500);
        }
      } catch (err) {
        setErrorTitle("Something went wrong");
        setIsError(true);
        setIsValid(false);
        hasSubmitted.current = false;
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [isValid, value]);

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header
          title={`Add Your ${name}`}
          fontFamily={fonts.abril}
          fontSize={24}
        />
      )}
    >
      <View style={styles.row}>
        <Image source={img} style={styles.icon} />
        <View style={{ flex: 1 }}>
          <CustomInput
            height={44}
            placeholder={`Enter your ${name} username`}
            value={value}
            onChangeText={validate}
            autoCapitalize="none"
            isValid={isValid}
          />
        </View>
      </View>

      <ErrorComponent
        error={isError}
        isValid={isValid}
        errorTitle={errorTitle}
        color={isValid ? "#64CD75" : isError ? "#EE1045" : ""}
        marginTop={6}
      />
    </ScreenWrapper>
  );
};

export default AddAccount;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    height: 32,
    width: 32,
    marginBottom: 6,
  },
});
