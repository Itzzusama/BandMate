import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useImperativeHandle, useState } from "react";

import ErrorComponent from "../../../components/ErrorComponent";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

import { setUserData } from "../../../store/reducer/usersSlice";
import { setRefreshToken, setToken } from "../../../store/reducer/AuthConfig";
import { post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { count } from "../../../store/reducer/appSlice";

const ResetPassword = forwardRef(
  ({ currentIndex, setCurrentIndex, state }, ref) => {
    const onboardingCount = useSelector(count);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [password, setPassword] = useState("");
    const [showSuccessColor, setShowSuccessColor] = useState(false);

    const [error, setError] = useState("Please re-enter your password");
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);

    const submit = async () => {
      if (!password) {
        setError("Please enter your password");
        setIsError(true);
        setShowSuccessColor(false);
        return;
      } else if (state?.password !== password) {
        setError("Password do not match");
        setIsError(true);
        setShowSuccessColor(false);
        return;
      } else {
        setError("Password match");

        const { verifyVia, ...cleanState } = state;
        let finalState = cleanState;

        if (finalState?.phone) {
          const { email, ...rest } = finalState;
          finalState = rest;
        } else if (finalState?.email) {
          const { phone, ...rest } = finalState;
          finalState = rest;
        }
        const forBand = {
          ageRange: finalState.membersAge,
          members: finalState.bandMembers,
          bandName: finalState.bandName,
        };
        const payload = {
          role: finalState.role,
          dob: finalState.dob,
          first_name: finalState.first_name || "unknown",
          sur_name: finalState.sur_name || "unknown",
          nameDisplayPreference: finalState.nameDisplayPreference || "first",
          gender: finalState.gender || "MALE",
          password: finalState.password,
          fcmToken: "123445",
          ...(finalState.email && { email: finalState.email }),
          ...(finalState.phone && { phone: finalState.phone }),
          ...(finalState.role === "band" && {
            ...forBand,
          }),
        };
        console.log("📌 Final Payload Sent to API:", payload);
        try {
          setLoading(true);
          const response = await post("auth/register", payload);
          if (response?.data) {
            dispatch(setUserData(response?.data?.user));
            dispatch(setToken(response?.data?.tokens?.accessToken));
            dispatch(setRefreshToken(response?.data?.tokens?.refreshToken));

            if (state.role === "band") {
              if (currentIndex < onboardingCount) {
                setCurrentIndex(currentIndex + 1);
              }
            } else {
              navigation.navigate("Success");
            }
          }

          setLoading(false);
        } catch (error) {
          setLoading(false);
          setError(error?.response?.data?.message);
          setIsError(true);
        }
      }
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back, isLoading: loading }));

    const errorCheck = (pwd) => {
      setPassword(pwd);
      if (!pwd) {
        setError("Please enter your password");
        setShowSuccessColor(false);
        setIsError(true);
        return;
      } else if (state?.password !== pwd) {
        setError("Password do not match");
        setShowSuccessColor(false);
        setIsError(true);
      } else {
        setError("Password match");
        setIsError(false);
        setShowSuccessColor(true);
        setTimeout(() => {
          setShowSuccessColor(false);
        }, 2000);
      }
    };

    return (
      <View style={{ justifyContent: "space-between", flex: 1 }}>
        <View>
          <CustomText
            label="Confirm password"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={20}
          />
          <CustomInput
            value={password}
            onChangeText={(text) => errorCheck(text)}
            marginTop={4}
            marginBottom={8}
            placeholder="********"
            secureTextEntry
            isValid={showSuccessColor}
          />

          <ErrorComponent
            error={isError}
            isValid={showSuccessColor}
            errorTitle={error}
            color={showSuccessColor ? "#64CD75" : isError ? "#EE1045" : ""}
          />
        </View>
      </View>
    );
  }
);

export default ResetPassword;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
});
