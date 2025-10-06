import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import CustomPhoneInput from "../../../components/CustomPhoneInput";
import ErrorComponent from "../../../components/ErrorComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";

import useLocation from "../../../utils/useLocation";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import {
  setIsEmail,
  setLocation,
  setLoginValue,
} from "../../../store/reducer/usersSlice";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { getCurrentLocation } = useLocation();
  const getLocation = async () => {
    const location = await getCurrentLocation();
    if (location) {
      dispatch(setLocation(location));
    }
  };

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isType, setType] = useState("Phone Number");
  const [showPhoneSuccessColor, setShowPhoneSuccessColor] = useState(false);
  const [showEmailSuccessColor, setShowEmailSuccessColor] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const errorCheck = (val, cond) => {
    let newErrors = "";
    if (cond) {
      setEmail(val);
    }
    if (!val.trim()) {
      newErrors = "Please enter your email";
    } else if (!emailRegex.test(val.trim())) {
      newErrors = "Please enter a valid email address";
    } else {
      newErrors = "";
      setShowEmailSuccessColor(true);
      setTimeout(() => {
        setShowEmailSuccessColor(false);
      }, 2000);
    }
    return newErrors;
  };

  const handleContinue = () => {
    if (isType === "Phone Number") {
      const phoneErr = phoneValidationCheck(phone);
      if (phoneErr) {
        setPhoneError(phoneErr);
        return;
      }
      setPhoneError("");
      dispatch(setLoginValue(phone));
      dispatch(setIsEmail(false));
      navigation.navigate("LoginPass");
    } else {
      const emailErr = errorCheck(email);
      if (emailErr) {
        setEmailError(emailErr);
        return;
      }
      setEmailError("");
      dispatch(setLoginValue(email));
      dispatch(setIsEmail(true));
      navigation.navigate("LoginPass");
    }
  };
  const phoneValidationCheck = (phoneValue) => {
    let newErrors = "";
    if (!phoneValue || phoneValue.trim().length === 0) {
      newErrors = "Please enter your phone number";
    } else {
      if (phoneValue.length < 7) {
        newErrors = "Please enter a valid phone number";
      } else {
        newErrors = "";
      }
    }
    return newErrors;
  };

  const handlePhoneValidationChange = (isValid) => {
    if (isValid) {
      setPhoneError("");
      if (phoneError) {
        setShowPhoneSuccessColor(true);
        setTimeout(() => {
          setShowPhoneSuccessColor(false);
        }, 2000);
      }
    } else {
      setShowPhoneSuccessColor(false);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          title={
            isType == "Phone Number"
              ? "Enter Your Phone Number"
              : "Enter Your Email"
          }
        />
      )}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <AuthFooter onPress={handleContinue} />
        </View>
      )}
    >
      <View style={styles.tab}>
        {["Phone Number", "Email"].map((item, i) => (
          <CustomButton
            key={i}
            title={item}
            height={32}
            width="49%"
            fontSize={14}
            fontFamily={fonts.regular}
            onPress={() => {
              setType(item);
              setEmail("");
              setPhone("");
              setEmailError("");
              setPhoneError("");
              setShowEmailSuccessColor(false);
              setShowPhoneSuccessColor(false);
            }}
            backgroundColor={item == isType ? COLORS.black : "#1212120A"}
            color={item == isType ? COLORS.white : COLORS.black}
            marginTop={20}
          />
        ))}
      </View>
      <CustomText
        label={
          isType == "Phone Number"
            ? "What is your phone number?"
            : "What is your email?"
        }
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={16}
        marginBottom={6}
      />

      {isType == "Phone Number" ? (
        <>
          <CustomPhoneInput
            value={phone}
            setValue={(text) => {
              setPhone(text);
              if (phoneError) {
                const newError = phoneValidationCheck(text);
                if (!newError) {
                  setPhoneError("");
                }
              }
            }}
            withLabel="PHONE NUMBER"
            error={phoneError}
            onValidationChange={(isValid) => {
              handlePhoneValidationChange(isValid);
              if (isValid && phoneError) {
                setPhoneError("");
              }
            }}
          />
          <ErrorComponent
            errorTitle={
              showPhoneSuccessColor
                ? "Valid Phone Number."
                : "Please enter a valid phone number."
            }
            error={phoneError}
            isValid={showPhoneSuccessColor}
            color={
              showPhoneSuccessColor
                ? "#64CD75"
                : phoneError
                ? "#EE1045CC"
                : COLORS.gray2
            }
          />
          <ErrorComponent
            errorTitle={
              showPhoneSuccessColor
                ? "Valid verification code."
                : "We will later use this phone number to verify your account."
            }
            error={phoneError}
            isValid={showPhoneSuccessColor}
            marginTop={2}
            color={
              showPhoneSuccessColor
                ? "#64CD75"
                : phoneError
                ? "#EE1045CC"
                : COLORS.gray2
            }
          />
        </>
      ) : (
        <>
          <CustomInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              // Agar error hai to real-time check karo
              if (emailError) {
                const newError = errorCheck(text, true);
                if (!newError) {
                  setEmailError("");
                }
              }
            }}
            error={emailError}
            marginBottom={5}
            placeholder="E.g. abc@email.com"
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <ErrorComponent
            errorTitle={
              showEmailSuccessColor
                ? "Valid email address."
                : "Please enter a valid email address."
            }
            error={emailError}
            isValid={showEmailSuccessColor}
            color={
              showEmailSuccessColor
                ? "#64CD75"
                : emailError
                ? "#EE1045CC"
                : COLORS.gray2
            }
          />
          <ErrorComponent
            errorTitle={
              showEmailSuccessColor
                ? "Valid verification code."
                : "We will later use this email to verify your account."
            }
            error={emailError}
            isValid={showEmailSuccessColor}
            marginTop={2}
            color={
              showEmailSuccessColor
                ? "#64CD75"
                : emailError
                ? "#EE1045CC"
                : COLORS.gray2
            }
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    height: 200,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  circle: {
    backgroundColor: "#4347FF",
    height: 24,
    width: 24,
    borderRadius: 100,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  locationContainer: {
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  locationInfo: {
    marginBottom: 4,
  },
});
