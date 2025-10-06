import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";

import fonts from "../../../assets/fonts";

const StepTwo = forwardRef(({ currentIndex, setCurrentIndex, state, setState }, ref) => {
  const [firstName, setFirstName] = useState(state?.first_name || "");
  const [error, setError] = useState("");

  const errorCheck = (val) => {
    setFirstName(val);
    let newErrors = "";
    const nameRegex = /^[A-Za-z\s'-]{2,30}$/;
    if (!val.trim()) {
      newErrors = "Please enter your first name";
    } else if (!nameRegex.test(val.trim())) {
      newErrors =
        "Please enter a valid first name (letters only, 2–30 characters)";
    }
    return newErrors;
  };

  const submit = () => {
    const err = errorCheck(firstName);
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setState({ ...state, first_name: firstName.trim() });
    if (currentIndex < 10) {
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
          label="What’s your firstname?"
          fontFamily={fonts.semiBold}
          fontSize={24}
          lineHeight={24*1.4}
          marginTop={12}
          letterSpacing={-1}
          marginBottom={6}
        />
        <CustomInput
          placeholder="E.g. James"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (error) {
              const newError = errorCheck(text);
              if (!newError) {
                setError("");
              }
            }
          }}
          error={error}
        />
        <ErrorComponent errorTitle="This will appear on your profile." marginBottom={2}/>
        <ErrorComponent errorTitle="Inappropriate names are forbidded." />
      </View>
    </View>
  );
});

export default StepTwo;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
