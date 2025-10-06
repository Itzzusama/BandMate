import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomInput from "../../../components/CustomInput";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AuthHeader from "../../../components/Auth/AuthHeader";

const ProviderBank = () => {
  const navigation = useNavigation();
  const init = {
    firstName: "",
    lastName: "",
    sex: "",
    dateOfBirth: null,
    idNumber: "",
    expirationDate: null,
    placeOfOrigin: "",
  };

  const inits = {
    firstNameError: "",
    lastNameError: "",
    sexError: "",
    dateOfBirthError: "",
    idNumberError: "",
    expirationDateError: "",
    placeOfOriginError: "",
  };

  const [errors, setErrors] = useState(inits);
  const [state, setState] = useState(init);

  const array = [
    {
      id: 1,
      label: "Full First Name",
      placeholder: "Enter your first name",
      value: state.firstName,
      onChange: (text) => setState({ ...state, firstName: text }),
      error: errors?.firstNameError,
    },
    {
      id: 2,
      label: "Full Last Name",
      placeholder: "Enter your last name",
      value: state.lastName,
      onChange: (text) => setState({ ...state, lastName: text }),
      error: errors?.lastNameError,
    },
    {
      id: 3,
      label: "Sex",
      placeholder: "Enter your sex",
      value: state.sex,
      onChange: (text) => setState({ ...state, sex: text }),
      error: errors?.sexError,
    },
  ];

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = {};

      if (!state.firstName) {
        newErrors.firstNameError = "Please enter your first name";
      }

      if (!state.lastName) {
        newErrors.lastNameError = "Please enter your last name";
      }

      if (!state.sex) {
        newErrors.sexError = "Please enter your sex";
      }

      if (!state.dateOfBirth) {
        newErrors.dateOfBirthError = "Please select your date of birth";
      }

      if (!state.idNumber) {
        newErrors.idNumberError = "Please enter your ID number";
      }

      if (!state.expirationDate) {
        newErrors.expirationDateError = "Please select expiration date";
      }

      if (!state.placeOfOrigin) {
        newErrors.placeOfOriginError = "Please enter your place of origin";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  }, [state]);

  // useEffect(() => {
  //   errorCheck();
  // }, [errorCheck]);

  const handleSubmit = () => {
    // if (errorCheck()) {
    navigation.navigate("AsPro");
    // }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <View style={{ paddingHorizontal: 15 }}>
          <AuthHeader title="Banking data" isback />
        </View>
      )}
    >
      <CustomText
        label={"ID Verification"}
        color={COLORS.black}
        fontSize={24}
        fontFamily={fonts.semiBold}
        marginTop={20}
      />
      <CustomText
        label={
          "Please enter your identity information as mentioned on your official documents."
        }
        color={COLORS.subtitle}
        fontSize={14}
        marginBottom={20}
        fontFamily={fonts.regular}
      />

      {array?.map((item) => (
        <View key={item.id}>
          <CustomInput
            withLabel={item.label}
            placeholder={item.placeholder}
            value={item.value}
            onChangeText={item.onChange}
            error={item.error}
          />
        </View>
      ))}

      <CustomDatePicker
        withLabel="Date of Birth"
        value={state.dateOfBirth}
        setValue={(date) => setState({ ...state, dateOfBirth: date })}
        error={errors.dateOfBirthError}
        labelColor={COLORS.black}
        type="date"
        maxDate={new Date()}
      />

      <CustomInput
        withLabel="ID Number"
        placeholder="Enter your ID number"
        value={state.idNumber}
        onChangeText={(text) => setState({ ...state, idNumber: text })}
        error={errors.idNumberError}
      />

      <CustomDatePicker
        withLabel="Date d'expiration"
        value={state.expirationDate}
        setValue={(date) => setState({ ...state, expirationDate: date })}
        error={errors.expirationDateError}
        labelColor={COLORS.black}
        type="date"
      />

      <CustomInput
        withLabel="Place of Origin"
        placeholder="Enter your place of origin"
        value={state.placeOfOrigin}
        onChangeText={(text) => setState({ ...state, placeOfOrigin: text })}
        error={errors.placeOfOriginError}
      />

      <CustomButton title={"Confirm"} onPress={handleSubmit} marginTop={32} />
      <CustomButton
        title={"Later"}
        backgroundColor={"#1212120A"}
        marginTop={10}
        color={COLORS.black}
        marginBottom={30}
        onPress={() => navigation.goBack()}
      />
    </ScreenWrapper>
  );
};

export default ProviderBank;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  circle: {
    backgroundColor: COLORS.darkPurple,
    height: 24,
    width: 24,
    borderRadius: 100,
  },
});
