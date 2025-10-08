import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";

import fonts from "../../../assets/fonts";
import MultiRangeSlider from "../../../components/RangeSliderTwoWay";

const AgeRange = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [firstName, setFirstName] = useState(state?.first_name || "");
    const [error, setError] = useState("");

    const errorCheck = (val) => {
      setFirstName(val);
      let newErrors = "";

      if (!val.trim()) {
        newErrors = "Please enter your band name";
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
            label="Age range?"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
          />
          <MultiRangeSlider />

          <ErrorComponent errorTitle="Only permanent members." />
        </View>
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
