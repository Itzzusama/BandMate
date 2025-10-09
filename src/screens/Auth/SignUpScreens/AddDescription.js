import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";

import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";

import fonts from "../../../assets/fonts";
import { useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

const MAX_LENGTH = 150;

const AddDescription = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const navigation = useNavigation();
    const [description, setDescription] = useState(state?.description || "");
    const [error, setError] = useState("");
    const [prevError, setPrevError] = useState("");
    const [showSuccessColor, setShowSuccessColor] = useState(false);

    const onboardingCount = useSelector(count);

    const validateDescription = (val) => {
      let newError = "";
      if (!val.trim()) {
        newError = "Please enter your description.";
      } else if (val.trim().length > MAX_LENGTH) {
        newError = `Description must be less than ${MAX_LENGTH} characters.`;
      }
      return newError;
    };

    const submit = () => {
      const err = validateDescription(description);
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, description: description.trim() });
      navigation.navigate("Success");
      // if (currentIndex < onboardingCount) {
      //   navigation.navigate("Success");
      //   setCurrentIndex(currentIndex + 1);
      // }
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    // ✅ Color feedback logic
    useEffect(() => {
      if (prevError && !error) {
        setShowSuccessColor(true);
        const timer = setTimeout(() => {
          setShowSuccessColor(false);
        }, 2000);
        return () => clearTimeout(timer);
      }
      setPrevError(error);
    }, [error]);

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <View>
          <CustomText
            label="Tell us more about you"
            fontFamily={fonts.abril}
            fontSize={24}
            lineHeight={24 * 1.4}
            marginTop={12}
            marginBottom={2}
          />
          <CustomText
            label="Tell others about yourself (optional)"
            color={COLORS.white2}
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={12}
          />

          <CustomInput
            placeholder="E.g. We are a rock n roll band fans of the 80’s era..."
            value={description}
            multiline
            paddingVertical={10}
            height={104}
            onChangeText={(text) => {
              setDescription(text);
              if (error) {
                const newError = validateDescription(text);
                if (!newError) setError("");
              }
            }}
            error={error}
          />

          <ErrorComponent
            errorTitle={`Maximum ${description.length}/${MAX_LENGTH} characters.`}
          />
        </View>
      </View>
    );
  }
);

export default AddDescription;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
  },
  footerRow: {
    marginTop: 4,
  },
});
