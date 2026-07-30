import { StyleSheet, View } from "react-native";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import CustomDropdown from "../../../components/CustomDropdown";
import ErrorComponent from "../../../components/ErrorComponent";
import CustomText from "../../../components/CustomText";

import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";

const StepFive = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const onboardingCount = useSelector(count);
    const [gender, setGender] = useState(state?.gender || "");
    const [showSuccessColor, setShowSuccessColor] = useState(false);
    const genderOptions = ["Female", "Male", "Do not Specify"];

    const [error, setError] = useState("");
    const errorCheck = (val) => {
      setGender(val);
      let newErrors = "";
      if (!val) {
        newErrors = "Please select an option";
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
            label="What's your gender?"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
            marginBottom={6}
          />
          <CustomDropdown
            data={genderOptions}
            value={gender}
            setValue={(val) => {
              setGender(val);
              setState((prev) => ({
                ...prev,
                gender: val ? val.trim().toUpperCase() : "",
              }));
            }}
            error={error}
            showError={true}
            placeholder="E.g. Male"
            modalTitle="Select Gender"
          />
        </View>
      </View>
    );
  },
);

export default StepFive;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
