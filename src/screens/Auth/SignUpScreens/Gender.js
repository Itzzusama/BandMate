import { StyleSheet, View } from "react-native";
import { forwardRef, useImperativeHandle, useState } from "react";

import CustomDropdown from "../../../components/CustomDropdown";
import ErrorComponent from "../../../components/ErrorComponent";
import CustomText from "../../../components/CustomText";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const StepFive = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [gender, setGender] = useState(state?.gender || "");
    const [showSuccessColor, setShowSuccessColor] = useState(false);
    const genderOptions = ["Male", "Female", "Unisex"];

    const [error, setError] = useState("");
    const errorCheck = (val) => {
      setGender(val);
      let newErrors = "";
      if (!val) {
        newErrors = "Please select an option.";
        setError(newErrors);
        setShowSuccessColor(false);
      } else {
        setShowSuccessColor(true);
        newErrors = "";
        setError(newErrors);
        setTimeout(() => {
          setShowSuccessColor(false);
        }, 2000);
      }
      return newErrors;
    };

    const submit = () => {
      const err = errorCheck(gender);
      if (err) return;

      setState({ ...state, gender: gender.trim().toUpperCase() });
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
            label="What is your gender?"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
            marginBottom={6}
          />
          <CustomDropdown
            data={genderOptions}
            value={gender}
            setValue={setGender}
            error={error}
            placeholder="E.g. Male"
          />
          {error ? null : (
            <ErrorComponent
              error={error}
              isValid={showSuccessColor}
              color={showSuccessColor ? "#64CD75" : COLORS.gray1}
              errorTitle={
                showSuccessColor ? "Valid Gender" : "Please Select an Option"
              }
              marginTop={-8}
            />
          )}
        </View>
      </View>
    );
  }
);

export default StepFive;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
