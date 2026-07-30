import React, { useRef, useState, useMemo, useEffect } from "react";
import { Text } from "react-native";
import { useSelector } from "react-redux";

import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";

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
import BandName from "./BandName";
import BandMembers from "./BandMembers";
import AgeRange from "./AgeRange";
import Instruments from "./Instruments";
import Level from "./Level";
import Genres from "./Genres";
import Artists from "./Artists";
import AddPictures from "./AddPictures";
import AddDescription from "./AddDescription";
import { count } from "../../../store/reducer/appSlice";

const SignUpScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const stepRef = useRef(null);

  const user = useSelector((state) => state.users.userData);
  const token = useSelector((state) => state.authConfig.token);

  const init = {
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    pin: "",
    first_name: "",
    sur_name: "",
    nameDisplayPreference: "",
    allowdPersonalizedAds: false,
    allowdMarketingEmails: false,
    notificationPreferences: { email: false, push: false, sms: false },
    gender: "",
    role: "",
    phone: "",
    verifyVia: "sms",
    bandName: "",
    bandMembers: "",
    membersAge: "",
    Instruments: [],
    instrumentWithLevel: [],
    Artists: [],
    Genres: [],
    pictures: [],
    description: "",
  };

  const [state, setState] = useState(init);
  const [isLoading, setIsLoading] = useState(false);
  const onboardingCount = useSelector(count);
  const steps = useMemo(() => {
    if (state.role === "band") {
      return [
        "Date of Birth",
        "Choose your user type",
        "Band's name",
        "Band's members",
        "Age range",
        "Email",
        "Verifying your email",
        "Creating a strong password",
        "Confirming password",
      ];
    } else {
      return [
        "Date of Birth",
        "Choose your user type",
        "Firstname",
        "Surname",
        "Gender",
        "Addressing",
        "Email",
        "Verifying your email",
        "Creating a strong password",
        "Confirming password",
      ];
    }
  }, [state.role, user?.role]);

  const totalSteps = steps.length;

  useEffect(() => {
    const currentStep = steps[currentIndex - 1];

    let disabled = true;

    switch (currentStep) {
      case "Date of Birth":
        disabled = !state.dob;
        break;
      case "Choose your user type":
        disabled = !state.role;
        break;
      case "Band's name":
        disabled = !state.bandName || state.bandName.trim().length === 0;
        break;
      case "Band's members":
        disabled =
          !state.bandMembers ||
          isNaN(parseInt(state.bandMembers, 10)) ||
          parseInt(state.bandMembers, 10) < 2;
        break;
      case "Age range":
        disabled = !state.membersAge;
        break;
      case "Email":
        if (state.email) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          disabled = !emailRegex.test(state.email.trim());
        } else if (state.phone) {
          disabled = state.phone.trim().length < 7;
        } else {
          disabled = true;
        }
        break;
      case "Verifying your email":
        disabled = !state.pin || state.pin.trim().length < 6;
        break;
      case "Creating a strong password":
        disabled =
          !state.password ||
          state.password.length < 8 ||
          !/[A-Z]/.test(state.password) ||
          !/\d/.test(state.password);
        break;
      case "Confirming password":
        disabled =
          !state.confirmPassword || state.confirmPassword !== state.password;
        break;
      case "Firstname":
        disabled = !state.first_name || state.first_name.trim().length < 2;
        break;
      case "Surname":
        disabled = !state.sur_name || state.sur_name.trim().length < 2;
        break;
      case "Gender":
        disabled = !state.gender;
        break;
      case "Addressing":
        disabled = !state.nameDisplayPreference;
        break;
      default:
        disabled = false;
    }

    setIsDisabled(Boolean(disabled));
  }, [currentIndex, steps, state]);

  const renderStep = (stepName) => {
    const commonProps = {
      ref: stepRef,
      currentIndex,
      setCurrentIndex,
      state,
      setState,
      setIsLoading,
    };

    switch (stepName) {
      case "Date of Birth":
        return <DOB {...commonProps} />;
      case "Choose your user type":
        return <UserType {...commonProps} />;
      case "Band's name":
        return <BandName {...commonProps} />;
      case "Band's members":
        return <BandMembers {...commonProps} />;
      case "Age range":
        return <AgeRange {...commonProps} />;

      case "Firstname":
        return <FirstName {...commonProps} />;
      case "Surname":
        return <SurName {...commonProps} />;
      case "Gender":
        return <Gender {...commonProps} />;
      case "Addressing":
        return <NameSelection {...commonProps} />;
      case "Email":
        return <Email {...commonProps} />;
      case "Verifying your email":
        return <OtpCode {...commonProps} />;
      case "Creating a strong password":
        return <Password {...commonProps} />;
      case "Confirming password":
        return <ResetPassword {...commonProps} />;
      default:
        return <Text>No View</Text>;
    }
  };

  return (
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      footerUnScrollable={() => (
        <AuthFooter
          paddingHorizontal={12}
          onPress={() => stepRef.current?.submit?.()}
          onBackPress={() => stepRef.current?.back?.()}
          btnLoading={isLoading}
          btnDisabled={isDisabled}
        />
      )}
    >
      <AuthHeader
        step={currentIndex}
        totalSteps={onboardingCount}
        subtitle={steps[currentIndex - 1]}
      />
      {renderStep(steps[currentIndex - 1])}
    </ScreenWrapper>
  );
};

export default SignUpScreens;
