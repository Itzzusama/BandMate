import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import ErrorComponent from "../../../components/ErrorComponent";
import { put } from "../../../services/ApiRequest";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../utils/ToastMessage";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";
import { Images } from "../../../assets/images";

const LEVELS = ["Beginner", "Intermediate", "Advanced", "Legend"];

const Level = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const { isHome } = route?.params || {};
  const instruments = route?.params?.selectedInstruments || [];

  const [selectedLevels, setSelectedLevels] = useState({});
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useSelector((state) => state.users);
  const [step, setStep] = useState(userData?.role == "band" ? 11 : 12);
  const totalSteps = userData?.role == "band" ? 15 : 16;

  // Load user default levels when editing profile
  useEffect(() => {
    if (isHome && userData?.Instruments?.length > 0) {
      const preSelected = {};

      userData.Instruments.forEach((item) => {
        preSelected[item.instrument] = item.level;
      });

      setSelectedLevels(preSelected);
    }
  }, [isHome, userData]);
  const errorCheck = (levels) => {
    const allSelected = instruments.every((inst) => levels[inst]);
    if (allSelected) {
      setError("");
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      return "";
    } else {
      setShowSuccess(false);
      setError("Please select a level for each instrument.");
      return "Please select a level for each instrument.";
    }
  };

  const selectLevel = (instrument, level) => {
    setSelectedLevels((prev) => {
      const updated = { ...prev, [instrument]: level };
      errorCheck(updated);
      return updated;
    });
  };

  const handleNext = async () => {
    const err = errorCheck(selectedLevels);
    if (err) return;

    setIsLoading(true);
    const instrumentWithLevel = instruments.map((inst) => ({
      instrument: inst,
      level: selectedLevels[inst],
    }));

    try {
      const res = await put("user/profile", {
        Instruments: instrumentWithLevel,
      });

      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
        ToastMessage(
          "Your instruments have been updated successfully!",
          "success",
        );
        if (isHome) {
          navigation.navigate("MainStack", {
            screen: "Detail",
            params: {
              images:
                userData?.pictures?.length > 0
                  ? userData?.pictures
                  : [Images.user],
              myPage: true,
            },
          });
        } else {
          navigation.navigate("Genres");
        }
      }
    } catch (err) {
      console.log("Error saving instruments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => navigation.goBack();

  return (
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      headerUnScrollable={() => isHome && <Header title={"Edit Levels"} />}
      footerUnScrollable={() =>
        isHome ? (
          <View style={{ padding: 12 }}>
            <CustomButton
              title={"Submit"}
              marginBottom={24}
              onPress={handleNext}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        ) : (
          <AuthFooter
            paddingHorizontal={12}
            onPress={handleNext}
            onBackPress={handleBack}
            btnLoading={isLoading}
          />
        )
      }
    >
      {!isHome && (
        <AuthHeader
          step={step}
          totalSteps={totalSteps}
          subtitle="Select your level for each instrument"
        />
      )}

      <View style={styles.container}>
        <CustomText
          label="Let others know your level."
          fontFamily={fonts.abril}
          fontSize={32}
          lineHeight={32 * 1.1}
          marginTop={12}
        />

        <CustomText
          label="Tell us about your musical skills and level."
          fontSize={12}
          marginBottom={18}
          color={COLORS.white2}
        />

        {instruments.map((instrument) => (
          <View key={instrument} style={{ marginBottom: 12 }}>
            <CustomText
              label={instrument}
              fontFamily={fonts.medium}
              fontSize={17}
              color={COLORS.white}
              marginBottom={10}
            />

            <View style={styles.levelRow}>
              {LEVELS.map((level) => {
                const isSelected = selectedLevels[instrument] === level;
                return (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.levelButton,
                      {
                        backgroundColor: isSelected ? COLORS.white : "#313131",
                        borderColor: isSelected ? COLORS.white : "transparent",
                      },
                    ]}
                    onPress={() => selectLevel(instrument, level)}
                    activeOpacity={0.8}
                  >
                    <CustomText
                      label={level}
                      color={isSelected ? COLORS.black : COLORS.white}
                      fontFamily={fonts.medium}
                      fontSize={12}
                      textAlign="center"
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
        {!isHome && (
          <ErrorComponent
            errorTitle={
              showSuccess
                ? "All levels selected!"
                : error || "Please complete all selections"
            }
            error={error}
            isValid={showSuccess}
            color={showSuccess ? "#64CD75" : error ? "#EE1045CC" : COLORS.gray2}
            marginBottom={12}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default Level;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  levelRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  levelButton: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
