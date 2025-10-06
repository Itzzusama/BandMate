import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import Icons from "../../../components/Icons";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";

const BankDetail = ({ navigation }) => {
  const [formData, setFormData] = useState({
    beneficiaryName: "Lamine Yamal",
    bankName: "UBS SA",
    iban: "XXXXXXXX",
    accountNumber: "XXXXXXXX",
    bicSwift: "14456",
    bankAddress: "Chemin de la paroisse",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    // Clear error when user starts typing
    if (errors[`${field}Error`]) {
      setErrors({
        ...errors,
        [`${field}Error`]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.beneficiaryName.trim()) {
      newErrors.beneficiaryNameError = "Beneficiary name is required";
    }
    if (!formData.bankName.trim()) {
      newErrors.bankNameError = "Bank name is required";
    }
    if (!formData.iban.trim()) {
      newErrors.ibanError = "IBAN is required";
    }
    if (!formData.accountNumber.trim()) {
      newErrors.accountNumberError = "Account number is required";
    }
    if (!formData.bicSwift.trim()) {
      newErrors.bicSwiftError = "BIC/SWIFT is required";
    }
    if (!formData.bankAddress.trim()) {
      newErrors.bankAddressError = "Bank address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirm = () => {
    if (validateForm()) {
      console.log("Bank details confirmed:", formData);
      // Handle confirmation logic here
    }
  };

  const handleLater = () => {
    navigation.goBack();
  };

  const inputFields = [
    {
      field: "beneficiaryName",
      label: "BENEFICIARY NAME",
      value: formData.beneficiaryName,
      error: errors.beneficiaryNameError,
      placeholder: "Enter beneficiary name",
    },
    {
      field: "bankName",
      label: "BANK NAME",
      value: formData.bankName,
      error: errors.bankNameError,
      placeholder: "Enter bank name",
    },
    {
      field: "iban",
      label: "IBAN",
      value: formData.iban,
      error: errors.ibanError,
      placeholder: "Enter IBAN",
    },
    {
      field: "accountNumber",
      label: "ACCOUNT NUMBER",
      value: formData.accountNumber,
      error: errors.accountNumberError,
      placeholder: "Enter account number",
    },
    {
      field: "bicSwift",
      label: "BIC/SWIFT",
      value: formData.bicSwift,
      error: errors.bicSwiftError,
      placeholder: "Enter BIC/SWIFT",
    },
    {
      field: "bankAddress",
      label: "BANK'S ADDRESS",
      value: formData.bankAddress,
      error: errors.bankAddressError,
      placeholder: "Enter bank address",
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Bank Details"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={"Confirmer"}
            onPress={handleConfirm}
            marginBottom={8}
          />
          <CustomButton
            title={"Plus tard"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            onPress={handleLater}
          />
        </View>
      )}
    >
      <CustomText
        label={"Bank Details"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={"Please inform your bank details below."}
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginTop={8}
        marginBottom={32}
      />

      {inputFields.map((input, index) => (
        <CustomInput
          key={input.field}
          withLabel={input.label}
          value={input.value}
          onChangeText={(text) => handleInputChange(input.field, text)}
          placeholder={input.placeholder}
          marginBottom={8}
          error={input.error}
        />
      ))}

      <View style={styles.infoContainer}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />
        <CustomText
          label={"Not your address."}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
      </View>
    </ScreenWrapper>
  );
};

export default BankDetail;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 24,
  },
});