import React, { useRef, useState } from "react";
import { Text } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";

import NameSelection from "./NameSelection";
import ResetPassword from "./ResetPassword";
import FirstName from "./FirstName";
import Password from "./Password";
import UserType from "./UserType";
import SurName from "./SurName";
import OtpCode from "./OtpCode";
import Gender from "./Gender";
import Email from "./Email";
import DOB from "./DOB";
import AuthFooter from "../../../components/Auth/AuthFooter";

const SignUpScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const stepRef = useRef(null);
  const steps = [
    "DOB",
    "UserType",
    "FirstName",
    "SurName",
    "NameSelection",
    "Gender",
    "Email",
    "OtpCode",
    "Password",
    "ConfirmPassword",
  ];
  const init = {
    email: "", // email@example.com
    password: "", // 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
    dob: "", // 1990-01-01
    pin: "", // 4 digit pin
    first_name: "", // only alphabets
    sur_name: "", // only alphabets
    nameDisplayPreference: "", // ["first", "sur"]
    allowdPersonalizedAds: false, // true, false
    allowdMarketingEmails: false, // true, false
    notificationPreferences: { email: false, push: false, sms: false }, // { email: true || false, push: true || false, sms: true || false }
    gender: "", // ["MALE", "FEMALE", "OTHER", "UNISEX", "PREFER_NOT_TO_SAY"]
    role: "", // ["user", "admin","professional", "moderator", "business", "support"]
    phone: "", // 10 digits
    verifyVia: "sms", // ["sms", "whatsapp"]
  };
  const [state, setState] = useState(init);

  const StepView = ({ currentIndex }) => {
    switch (currentIndex) {
      case 1:
        return (
          <DOB
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 2:
        return (
          <UserType
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 3:
        return (
          <FirstName
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 4:
        return (
          <SurName
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 5:
        return (
          <NameSelection
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 6:
        return (
          <Gender
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 7:
        return (
          <Email
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 8:
        return (
          <OtpCode
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 9:
        return (
          <Password
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case 10:
        return (
          <ResetPassword
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      default:
        return <Text>No View</Text>;
    }
  };

  return (
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      footerUnScrollable={() =>
          <AuthFooter
          paddingHorizontal={12}
            onPress={() => stepRef.current?.submit?.()}
            onBackPress={() => stepRef.current?.back?.()}
          />
      }
    >
      <AuthHeader
        step={currentIndex}
        totalSteps={steps?.length}
        subtitle={
          currentIndex === 1
            ? "Date of Birth"
            : currentIndex === 2
            ? "Choose your user type"
            : currentIndex === 3
            ? "Firstname"
            : currentIndex === 4
            ? "Surname"
            : currentIndex === 5
            ? "Addressing"
            : currentIndex === 6
            ? "Gender"
            : currentIndex === 7
            ? "Email"
            : currentIndex === 8
            ? "Verifying your email"
            : currentIndex === 9
            ? "Creating a strong password"
            : "Confirming password"
        }
      />
      <StepView currentIndex={currentIndex} />
    </ScreenWrapper>
  );
};

export default SignUpScreens;
