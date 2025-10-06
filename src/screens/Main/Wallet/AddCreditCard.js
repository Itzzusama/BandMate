import { StyleSheet, View, Image } from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomInput from "../../../components/CustomInput";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomButton from "../../../components/CustomButton";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import Icons from "../../../components/Icons";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";

const AddCreditCard = ({ navigation }) => {
  const [formData, setFormData] = useState({
    cardHolder: "Viktor Sola",
    cardNumber: "+31 XXX XXX XX",
    expiryDate: null,
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumberError: "We couldn't find this card.",
  });

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

    if (!formData.cardHolder.trim()) {
      newErrors.cardHolderError = "Card holder name is required";
    }
    if (!formData.cardNumber.trim() || formData.cardNumber.includes("XXX")) {
      newErrors.cardNumberError = "Valid card number is required";
    }
    if (!formData.expiryDate) {
      newErrors.expiryDateError = "Expiry date is required";
    }
    if (!formData.cvv.trim() || formData.cvv.length !== 3) {
      newErrors.cvvError = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCard = () => {
    if (validateForm()) {
      console.log("Card added:", formData);
      // Handle add card logic here
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Add A Credit Card"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <View style={styles.infoContainer}>
            <Icons
              name={"info"}
              family={"Feather"}
              size={12}
              marginRight={4}
              color={COLORS.gray2}
            />
            <CustomText
              label={"We will save this card for future transactions."}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
              fontFamily={fonts.regular}
            />
          </View>
          <CustomButton title={"Add Card"} onPress={handleAddCard} />
        </View>
      )}
    >
      <CustomText
        label={"Add A Credit Card"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={"Please inform your credit card details below."}
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
      />

      <View style={styles.securityContainer}>
        <Image
          source={PNGIcons.Sheild}
          style={{ height: 14, width: 14, marginRight: 4 }}
        />
        <CustomText
          label={"Processed securely by PCI DSS"}
          lineHeight={14 * 1.4}
          color={COLORS.darkPurple}
          fontFamily={fonts.medium}
        />
      </View>

      <CustomInput
        withLabel={"CARD HOLDER"}
        value={formData.cardHolder}
        onChangeText={(text) => handleInputChange("cardHolder", text)}
        placeholder={"Enter card holder name"}
        marginBottom={8}
        error={errors.cardHolderError}
      />

      <CustomPhoneInput
        withLabel={"CARD NUMBER"}
        value={formData.cardNumber}
        setValue={(value) => handleInputChange("cardNumber", value)}
        placeholder={"XXX XXX XX"}
        marginBottom={8}
        // error={errors.cardNumberError}
        defaultCode="DZ"
        // showCheck={true}
      />

      <View style={styles.rowContainer}>
        <View style={styles.halfWidth}>
          <CustomDatePicker
            withLabel={"EXPIRY DATE"}
            value={formData.expiryDate}
            setValue={(date) => handleInputChange("expiryDate", date)}
            placeholder={"MM/YYYY"}
            type="date"
            marginBottom={16}
            error={errors.expiryDateError}
          />
        </View>
        <View style={styles.halfWidth}>
          <CustomInput
            withLabel={"CVV"}
            value={formData.cvv}
            onChangeText={(text) => handleInputChange("cvv", text)}
            placeholder={"3 Digits"}
            marginBottom={16}
            error={errors.cvvError}
            keyboardType="numeric"
            maxLength={3}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default AddCreditCard;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  securityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfWidth: {
    width: "48%",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
});
