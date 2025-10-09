import React, { useRef, useState, useMemo } from "react";
import { Text } from "react-native";

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

const SignUpScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const stepRef = useRef(null);

  const init = {
    email: "",
    password: "",
    dob: "",
    pin: "",
    first_name: "",
    sur_name: "",
    nameDisplayPreference: "",
    allowdPersonalizedAds: false,
    allowdMarketingEmails: false,
    notificationPreferences: { email: false, push: false, sms: false },
    gender: "",
    role: "", // ["artist","band"]
    phone: "",
    verifyVia: "sms",
    bandName: "",
    bandMembers: "",
    membersAge: "",
  };

  const [state, setState] = useState(init);

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
        "Instruments",
        "Level",
        "Genres",
        "Artists",
        "Pictures",
        "About you",
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
  }, [state.role]);

  const totalSteps = steps.length;

  const StepView = ({ stepName }) => {
    switch (stepName) {
      case "Date of Birth":
        return (
          <DOB
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Choose your user type":
        return (
          <UserType
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Band's name":
        return (
          <BandName
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Band's members":
        return (
          <BandMembers
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Age range":
        return (
          <AgeRange
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Instruments":
        return (
          <Instruments
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Level":
        return (
          <Level
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case "Genres":
        return (
          <Genres
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case "Artists":
        return (
          <Artists
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Firstname":
        return (
          <FirstName
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Surname":
        return (
          <SurName
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Gender":
        return (
          <Gender
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Addressing":
        return (
          <NameSelection
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Email":
        return (
          <Email
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Verifying your email":
        return (
          <OtpCode
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Creating a strong password":
        return (
          <Password
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );

      case "Confirming password":
        return (
          <ResetPassword
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case "Pictures":
        return (
          <AddPictures
            ref={stepRef}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            state={state}
            setState={setState}
          />
        );
      case "About you":
        return (
          <AddDescription
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
      footerUnScrollable={() => (
        <AuthFooter
          paddingHorizontal={12}
          onPress={() => stepRef.current?.submit?.()}
          onBackPress={() => stepRef.current?.back?.()}
        />
      )}
    >
      <AuthHeader
        step={currentIndex}
        totalSteps={totalSteps}
        subtitle={steps[currentIndex - 1]}
      />
      <StepView stepName={steps[currentIndex - 1]} />
    </ScreenWrapper>
  );
};

export default SignUpScreens;
