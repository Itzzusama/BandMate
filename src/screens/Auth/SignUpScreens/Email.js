import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch } from "react-redux";

import CustomPhoneInput from "../../../components/CustomPhoneInput";
import ErrorComponent from "../../../components/ErrorComponent";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";

import { setIsEmail, setLoginValue } from "../../../store/reducer/usersSlice";
import { PNGIcons } from "../../../assets/images/icons";
import { post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const Email = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(true);
    const [email, setEmail] = useState(state?.email || "");
    const [phone, setPhone] = useState(state?.phone || "");
    const [showSuccessColor, setShowSuccessColor] = useState(false);
    const [showPhoneSuccessColor, setShowPhoneSuccessColor] = useState(false);
    const [error, setError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [isType, setType] = useState("Phone Number");
    const [verifyVia, setVerifyVia] = useState(state?.verifyVia || "sms");
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
      if (state?.email && state?.email.trim().length > 0) {
        setType("Email");
      }
      if (state?.phone && state?.phone.trim().length > 0) {
        setType("Phone Number");
      }
    }, [state]);
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
        setShowSuccessColor(true);
        setTimeout(() => {
          setShowSuccessColor(false);
        }, 2000);
      }
      return newErrors;
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

    const submit = async () => {
      let body = {};
      if (isType === "Phone Number") {
        const phoneErr = phoneValidationCheck(phone);
        if (phoneErr) {
          setPhoneError(phoneErr);
          return;
        }
        setPhoneError("");
        body = {
          phone: {
            number: phone.trim(),
            verifyVia,
          },
        };
      } else {
        const err = errorCheck(email);
        if (err) {
          setError(err);
          return;
        }
        setError("");
        body = {
          email: email.trim(),
        };
      }
      try {
        setLoading(true);
        const res = await post(`auth/send-otp`, body);
        if (res?.data) {
          Alert.alert(
            "OTP Received", // Title
            res.data?.result?.toString(), // Message
            [
              {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
              },
            ]
          );

          if (currentIndex < 10) {
            setCurrentIndex(currentIndex + 1);
          }
          if (isType == "Phone Number") {
            setState({ ...state, phone: phone.trim(), verifyVia, email: "" });
          } else {
            setState({
              ...state,
              email: email.trim(),
              phone: "",
              verifyVia: "sms",
            });
          }
        }

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View>
          <View
            style={[
              styles.row,
              styles.btnContainer,
              { justifyContent: "space-between" },
            ]}
          >
            {["Phone Number", "Email"].map((item, i) => (
              <CustomButton
                key={i}
                title={item}
                height={32}
                width="49%"
                fontSize={14}
                fontFamily={item == isType ? fonts.medium : fonts.regular}
                onPress={() => setType(item)}
                backgroundColor={item == isType ? COLORS.white : COLORS.inputBg}
                color={item == isType ? COLORS.black : COLORS.white2}
              />
            ))}
          </View>
          <CustomText
            label={`${
              state?.nameDisplayPreference === "first" ? "Hi " : "Hello "
            }${
              state?.nameDisplayPreference === "sur"
                ? state?.gender === "FEMALE"
                  ? "Ms."
                  : "Mr."
                : ""
            } ${
              state?.nameDisplayPreference === "first"
                ? state?.first_name
                : state?.sur_name
            }`}
            fontSize={16}
            color={COLORS.gray2}
            marginTop={20}
            lineHeight={16 * 1.4}
          />
          <CustomText
            label={
              isType == "Phone Number"
                ? "What is your phone number?"
                : "What is your email?"
            }
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginBottom={6}
            color={COLORS.white}
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
                marginBottom={2}
              />
              <ErrorComponent
                errorTitle={
                  showPhoneSuccessColor
                    ? "Valid verification code."
                    : "We will later use this phone number to verify your account."
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
              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: COLORS.inputBg,
                  marginBottom: 16,
                  marginTop: 18,
                }}
              />
              <TouchableOpacity
                style={[styles.card, { marginTop: 4 }]}
                activeOpacity={0.8}
                onPress={() => setVerifyVia("sms")}
              >
                <View style={styles.row}>
                  <View style={{ width: "90%" }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={PNGIcons.mess}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <CustomText
                        label="Verify Using sms"
                        fontFamily={fonts.medium}
                        fontSize={16}
                        lineHeight={16 * 1.4}
                      />
                    </View>

                    <CustomText
                      label="Receive a verification code on your phone using the sms method."
                      fontFamily={fonts.medium}
                      lineHeight={14 * 1.4}
                      color={COLORS.gray2}
                    />
                  </View>
                  <View style={{ width: "10%" }}>
                    <Icons
                      family="MaterialCommunityIcons"
                      name={
                        verifyVia == "sms" ? "check-circle" : "radiobox-blank"
                      }
                      size={20}
                      color={
                        verifyVia == "sms" ? COLORS.btnColor : COLORS.white3
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => setVerifyVia("whatsapp")}
              >
                <View style={styles.row}>
                  <View style={{ width: "90%" }}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        source={PNGIcons.whatsapp}
                        resizeMode="contain"
                        style={styles.icon}
                      />
                      <CustomText
                        label="Verify Using Whatsapp"
                        fontFamily={fonts.medium}
                        fontSize={16}
                        lineHeight={16 * 1.4}
                      />
                    </View>

                    <CustomText
                      label="Receive a verification code on your Whatsapp using data method."
                      fontFamily={fonts.medium}
                      lineHeight={14 * 1.4}
                      color={COLORS.gray2}
                    />
                  </View>
                  <View style={{ width: "10%" }}>
                    <Icons
                      family="MaterialCommunityIcons"
                      name={
                        verifyVia == "whatsapp"
                          ? "check-circle"
                          : "radiobox-blank"
                      }
                      size={20}
                      color={
                        verifyVia == "whatsapp"
                          ? COLORS.btnColor
                          : COLORS.white3
                      }
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <CustomInput
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) {
                    const newError = errorCheck(text, true);
                    if (!newError) {
                      setError("");
                    }
                  }
                }}
                withLabel={"EMAIL ADDRESS"}
                error={error}
                marginBottom={5}
                height={56}
                placeholder="E.g. abc@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />

              <ErrorComponent
                errorTitle={
                  showSuccessColor
                    ? "Valid email address."
                    : "Please enter a valid email address."
                }
                error={error}
                marginTop={error && -5}
                isValid={showSuccessColor}
                color={
                  showSuccessColor
                    ? "#64CD75"
                    : error
                    ? "#EE1045CC"
                    : COLORS.gray2
                }
                marginBottom={2}
              />
              <ErrorComponent
                errorTitle={
                  showSuccessColor
                    ? "Valid verification code."
                    : "We will later use this email to verify your account."
                }
                error={error}
                isValid={showSuccessColor}
                color={
                  showSuccessColor
                    ? "#64CD75"
                    : error
                    ? "#EE1045CC"
                    : COLORS.gray2
                }
              />

              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: COLORS.inputBg,
                  marginBottom: 16,
                  marginTop: 18,
                }}
              />
              <TouchableOpacity
                style={[styles.card]}
                activeOpacity={0.8}
                onPress={() => setSelected(true)}
              >
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <CustomText
                      label="I Want To"
                      fontFamily={fonts.medium}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                    />
                    <CustomText
                      label="receive the latest news about move, and promotional offers."
                      fontFamily={fonts.medium}
                      lineHeight={14 * 1.4}
                      color={COLORS.gray2}
                    />
                  </View>
                  <Icons
                    family="MaterialCommunityIcons"
                    name={selected ? "check-circle" : "radiobox-blank"}
                    size={20}
                    color={selected ? COLORS.btnColor : COLORS.white3}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.card}
                activeOpacity={0.8}
                onPress={() => setSelected(false)}
              >
                <View style={styles.row}>
                  <View style={{ flex: 1 }}>
                    <CustomText
                      label="I am Okay To"
                      fontFamily={fonts.medium}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                    />
                    <CustomText
                      label="have a more tailor-made experience while keeping my data anonymous to content providers."
                      fontFamily={fonts.medium}
                      lineHeight={14 * 1.4}
                      color={COLORS.gray2}
                    />
                  </View>
                  <Icons
                    family="MaterialCommunityIcons"
                    name={!selected ? "check-circle" : "radiobox-blank"}
                    size={20}
                    color={!selected ? COLORS.btnColor : COLORS.white3}
                  />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  }
);

export default Email;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 14,
    height: 14,
    marginRight: 6,
    tintColor: COLORS.white,
  },
  btnContainer: {
    marginTop: 12,
    padding: 4,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
  },
});
