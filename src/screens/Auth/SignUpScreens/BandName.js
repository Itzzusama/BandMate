import { forwardRef, useImperativeHandle, useState } from "react";
import { StyleSheet, View } from "react-native";

import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";

import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";

const BandStep1 = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [bandName, setBandName] = useState(state?.bandName || "");
    const [error, setError] = useState("");
    const onboardingCount = useSelector(count);
    const errorCheck = (val) => {
      setBandName(val);
      let newErrors = "";

      if (!val.trim()) {
        newErrors = "Please enter your band name";
      }
      return newErrors;
    };

    const submit = () => {
      const err = errorCheck(bandName);
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, bandName: bandName.trim() });
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
            label="What’s your Band’s name?"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
            marginBottom={6}
          />
          <CustomInput
            placeholder="E.g. The Rockers"
            value={bandName}
            onChangeText={(text) => {
              setBandName(text);
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

export default BandStep1;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
});
