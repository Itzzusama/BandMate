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

const SignUpScreens = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const stepRef = useRef(null);

  const user = useSelector((state) => state.users.userData);
  const token = useSelector((state) => state.authConfig.token);
  console.log(user);
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
  };

  const [state, setState] = useState(init);

  const steps = useMemo(() => {
    if (state.role === "band" || user?.role === "band") {
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
  }, [state.role, user?.role]);

  const totalSteps = steps.length;

  useEffect(() => {
    if (token && user?.role === "band") {
      const missingInstruments =
        !user?.Instruments || user.Instruments.length === 0;
      const missingGenres = !user?.Genres || user.Genres.length === 0;
      const missingArtists = !user?.Artists || user.Artists.length === 0;
      const missingImages = !user?.pictures || user.pictures.length === 0;
      let targetStepName = null;

      if (missingInstruments) {
        targetStepName = "Instruments";
      } else if (missingGenres) {
        targetStepName = "Genres";
      } else if (missingArtists) {
        targetStepName = "Artists";
      } else if (missingImages) {
        targetStepName = "Pictures";
      }

      if (targetStepName) {
        const targetIndex = steps.indexOf(targetStepName);
        if (targetIndex !== -1) {
          setCurrentIndex(targetIndex + 1);
        }
      }
    }
  }, [token, user, steps]);

  useEffect(() => {
    const currentStep = steps[currentIndex - 1];
    console.log("Current Step:", currentStep);
    console.log("Current State:", state);
  }, [state, currentIndex, steps]);

  const isButtonDisabled = () => {
    const currentStep = steps[currentIndex - 1];
    const shouldDisable = (() => {
      switch (currentStep) {
        case "Date of Birth":
          return !state.dob;
        case "Choose your user type":
          return !state.role;
        case "Band's name":
          return !state.bandName?.trim();
        case "Band's members":
          return !state.bandMembers?.trim();
        case "Age range":
          return !state.membersAge;
        case "Email":
          return !state.email?.trim();
        case "Verifying your email":
          return !state.pin?.trim();
        case "Creating a strong password":
          return !state.password?.trim();
        case "Confirming password":
          return !state.confirmPassword?.trim();
        case "Instruments":
          return !state.Instruments?.length === 0;
        case "Level":
          return !state.instrumentWithLevel?.length === 0;
        case "Genres":
          return !state.Genres?.length === 0;
        case "Artists":
          return !state.Artists?.length === 0;
        case "Firstname":
          return !state.first_name?.trim();
        case "Surname":
          return !state.sur_name?.trim();
        case "Gender":
          return !state.gender;
        case "Addressing":
          return !state.nameDisplayPreference?.trim();
        case "Pictures":
          return !state.pictures?.length === 0;
        case "About you":
          return !state.description?.trim();
        default:
          return false;
      }
    })();

    console.log(`Button disabled for ${currentStep}:`, shouldDisable);
    return shouldDisable;
  };
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
          btnDisabled={isButtonDisabled()}
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
