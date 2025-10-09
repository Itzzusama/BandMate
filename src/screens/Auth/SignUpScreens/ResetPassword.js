import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { forwardRef, useImperativeHandle, useState } from "react";

import ErrorComponent from "../../../components/ErrorComponent";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

import { setUserData } from "../../../store/reducer/usersSlice";
import { setToken } from "../../../store/reducer/AuthConfig";
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
    console.log(state);
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
        setError("");
        if (state.role == "band") {
          if (currentIndex < onboardingCount) {
            setCurrentIndex(currentIndex + 1);
          }
        } else {
          navigation.navigate("Success");
        }
        // let { verifyVia, ...cleanState } = state;
        // let finalState = cleanState;

        // if (finalState?.phone) {
        //   let { email, ...data } = finalState;
        //   finalState = data;
        // } else if (finalState?.email) {
        //   let { phone, ...data } = finalState;
        //   finalState = data;
        // }

        // try {
        //   setLoading(true);
        //   const response = await post("auth/register", finalState);
        //   if (response?.data) {
        //     navigation.navigate("PinOnBoarding", { state: finalState });
        //     dispatch(setUserData(response?.data?.user));
        //     dispatch(setToken(response?.data?.tokens?.accessToken));
        //     await AsyncStorage.setItem(
        //       "token",
        //       response?.data?.tokens?.accessToken
        //     );
        //     await AsyncStorage.setItem(
        //       "refreshToken",
        //       response?.data?.tokens?.refreshToken
        //     );
        //   }

        //   setLoading(false);
        // } catch (error) {
        //   setLoading(false);
        //   setError(error?.response?.data?.message);
        //   setIsError(true);
        // }
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
        console.log("settt");
        setError("Valid Password");
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
            placeholder="************"
            secureTextEntry
            isValid={showSuccessColor}
          />

          <ErrorComponent
            error={isError}
            isValid={showSuccessColor}
            errorTitle={error}
            color={
              showSuccessColor ? "#64CD75" : isError ? "#EE1045" : COLORS.gray1
            }
          />
          {/* <ErrorComponent errorTitle={"Please re-enter your password"} /> */}
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
