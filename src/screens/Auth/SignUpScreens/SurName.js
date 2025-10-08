import { StyleSheet, View } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

import ErrorComponent from "../../../components/ErrorComponent";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";

import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";

const SurName = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const onboardingCount = useSelector(count);
    const [lastName, setLastName] = useState(state?.sur_name || "");
    const [error, setError] = useState("");

    const errorCheck = (val) => {
      setLastName(val);
      let newErrors = "";
      const nameRegex = /^[A-Za-z\s'-]{2,30}$/;
      if (!val.trim()) {
        newErrors = "Please enter your last name";
      } else if (!nameRegex.test(val.trim())) {
        newErrors =
          "Please enter a valid last name (letters only, 2–30 characters)";
      }
      return newErrors;
    };

    const submit = () => {
      const err = errorCheck(lastName);
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, sur_name: lastName.trim() });
      if (currentIndex < onboardingCount) {
        setCurrentIndex(currentIndex + 1);
      }
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <View>
          <CustomText
            label="What's your surname?"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
            marginBottom={6}
          />
          <CustomInput
            placeholder="E.g. Johnson"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
              if (error) {
                const newError = errorCheck(text);
                if (!newError) {
                  setError("");
                }
              }
            }}
            error={error}
          />

          <ErrorComponent errorTitle="Inappropriate names are forbidded." />
        </View>
      </View>
    );
  }
);

export default SurName;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
