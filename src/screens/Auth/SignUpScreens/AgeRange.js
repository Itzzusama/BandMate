import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import fonts from "../../../assets/fonts";
import MultiRangeSlider from "../../../components/RangeSliderTwoWay";
import { count } from "../../../store/reducer/appSlice";
import { useSelector } from "react-redux";

const AgeRange = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const onboardingCount = useSelector(count);
    const [ageRange, setAgeRange] = useState({
      start: state?.ageRange?.start || 18,
      end: state?.ageRange?.end || 50,
    });

    useEffect(() => {
      if (!state?.membersAge) {
        setState((prev) => ({ ...prev, membersAge: ageRange }));
      }
    }, []);

    const [error, setError] = useState("");

    const errorCheck = () => {
      let newError = "";
      if (ageRange.start < 16) {
        newError = "You must be at least 16 years old to use this app.";
      }
      return newError;
    };

    const submit = () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }
      setError("");

      setState({ ...state, membersAge: ageRange });
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
        <CustomText
          label="Age range"
          fontFamily={fonts.abril}
          fontSize={24}
          lineHeight={24 * 1.4}
          marginTop={12}
          marginBottom={-3}
        />

        <MultiRangeSlider
          min={16}
          max={80}
          step={1}
          initialLowValue={ageRange.start}
          initialHighValue={ageRange.end}
          onValuesChange={(low, high) => setAgeRange({ start: low, end: high })}
        />

        {error ? (
          <ErrorComponent errorTitle={error} />
        ) : (
          <ErrorComponent errorTitle="Only permanent members." />
        )}
      </View>
    );
  }
);

export default AgeRange;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
