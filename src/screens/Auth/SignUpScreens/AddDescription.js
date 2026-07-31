import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";

import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import { get, put } from "../../../services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import { ToastMessage } from "../../../utils/ToastMessage";
import CustomButton from "../../../components/CustomButton";
import Header from "../../../components/Header";

const MAX_LENGTH = 150;

const AddDescription = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.users);
  const route = useRoute();
  const { fromScreen } = route?.params || {};
  const [step, setStep] = useState(userData?.role == "band" ? 15 : 16);
  const totalSteps = userData?.role == "band" ? 15 : 16;
  const [description, setDescription] = useState(userData?.profile?.bio || "");
  const [error, setError] = useState("");
  const [prevError, setPrevError] = useState("");
  const [showSuccessColor, setShowSuccessColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateDescription = (val) => {
    let newError = "";
    if (val.trim().length > MAX_LENGTH) {
      newError = `Description must be less than ${MAX_LENGTH} characters.`;
    }
    return newError;
  };

  const handleNext = async () => {
    const err = validateDescription(description);
    if (err) {
      setError(err);
      return;
    }

    setError("");
    try {
      setIsLoading(true);

      const res = await put("user/profile", {
        profile: { bio: description.trim() },
      });

      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
        console.log(res?.data?.user);
        ToastMessage("Profile updated successfully!", "success");
        if (fromScreen == "Home") {
          navigation.goBack();
        } else {
          navigation.navigate("PinOnBoarding");
        }
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.log("Error updating bio:", err);
      setError("Something went wrong while saving description.");
      ToastMessage(err?.data?.message || err?.message || "Something went wrong while saving description.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  useEffect(() => {
    if (prevError && !error) {
      setShowSuccessColor(true);
      const timer = setTimeout(() => setShowSuccessColor(false), 2000);
      return () => clearTimeout(timer);
    }
    setPrevError(error);
  }, [error]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() =>
        fromScreen == "Home" && <Header title={"Edit Bio"} />
      }
      footerUnScrollable={() =>
        fromScreen == "Home" ? (
          <View style={{ padding: 12 }}>
            <CustomButton
              title={"Submit"}
              marginBottom={24}
              onPress={handleNext}
              disabled={isLoading || !description.trim()}
            />
          </View>
        ) : (
          <AuthFooter
            paddingHorizontal={12}
            onPress={handleNext}
            onBackPress={handleBack}
            btnLoading={isLoading}
            btnDisabled={!description.trim()}
          />
        )
      }
    >
      {fromScreen != "Home" && (
        <AuthHeader
          step={step}
          totalSteps={totalSteps}
          subtitle="Tell others about you"
        />
      )}

      <View style={styles.container}>
        <View>
          <CustomText
            label="Tell us more about you"
            fontFamily={fonts.abril}
            fontSize={22}
            marginTop={12}
            marginBottom={2}
          />
          <CustomText
            label="Tell others about yourself"
            color={COLORS.white2}
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={12}
          />

          <CustomInput
            placeholder="E.g. We are a rock n roll band fans of the 80’s era..."
            value={description}
            multiline
            paddingVertical={10}
            height={104}
            editable={!isLoading}
            showErrorMessage={false}
            onChangeText={(text) => {
              setDescription(text);
              if (error) {
                const newError = validateDescription(text);
                if (!newError) setError("");
              }
            }}
            error={error}
          />

          <ErrorComponent
            errorTitle={`Maximum ${description.length}/${MAX_LENGTH} characters.`}
            color={
              error
                ? "#EE1045"
                : showSuccessColor
                ? COLORS.success
                : COLORS.white2
            }
            error={error}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddDescription;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
