import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";

import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";

const BandStep2 = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const onboardingCount = useSelector(count);
    const [bandMembers, setBandMembers] = useState(state?.bandMembers || "");
    const [error, setError] = useState("");

    const errorCheck = (val) => {
      const trimmed = val.trim();
      let newErrors = "";

      // Convert to integer for validation
      const num = parseInt(trimmed, 10);

      if (!trimmed) {
        newErrors = "Please enter the number of band members";
      } else if (isNaN(num)) {
        newErrors = "Please enter a valid number";
      } else if (num < 2) {
        newErrors = "A band must have at least 2 members";
      } else if (num > 20) {
        newErrors = "Please enter a reasonable number of members (max 20)";
      }

      setBandMembers(trimmed);
      return newErrors;
    };

    const submit = () => {
      const err = errorCheck(bandMembers);
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, bandMembers: bandMembers.trim() });
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
            label="How many band members do you have?"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
            marginBottom={6}
          />
          <CustomInput
            placeholder="E.g. 2 Members"
            value={bandMembers}
            onChangeText={(text) => {
              setBandMembers(text);
              if (error) {
                const newError = errorCheck(text);
                if (!newError) {
                  setError("");
                }
              }
            }}
            error={error}
          />

          <ErrorComponent errorTitle="Please only mention fixed members." />
        </View>
      </View>
    );
  }
);

export default BandStep2;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
