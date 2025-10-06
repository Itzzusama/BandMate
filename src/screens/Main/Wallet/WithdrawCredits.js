import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import AmountSelectionButtons from "../../../components/AmountSelectionButtons";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import WalletInput from "../../../components/WalletInput";
import { post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";

const WithdrawCredits = ({ navigation }) => {
  const genre = ["Personal VC", "Friend VC"];

  // Initial bank details state
  const initialBankState = {
    beneficiary_name: "",
    bank_name: "",
    iban: "",
    account_num: "",
    bic: "",
    bank_address: "",
  };

  // State management
  const [selectedVC, setSelectedVC] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [bankState, setBankState] = useState(initialBankState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handler to update bank state fields
  const handleBankStateChange = (field, value) => {
    setBankState((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // Clear specific error
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // Validation rules
  const validationRules = {
    beneficiary_name: (value) =>
      !value?.trim() ? "Beneficiary name is required" : null,
    bank_name: (value) => (!value?.trim() ? "Bank name is required" : null),
    iban: (value) => (!value?.trim() ? "IBAN is required" : null),
    account_num: (value) =>
      !value?.trim() ? "Account number is required" : null,
    bic: (value) => (!value?.trim() ? "BIC/SWIFT is required" : null),
    bank_address: (value) =>
      !value?.trim() ? "Bank address is required" : null,
  };

  // Validate bank details
  const validateBankDetails = () => {
    const newErrors = {};

    Object.keys(validationRules).forEach((field) => {
      const error = validationRules[field](bankState[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // Validate amount
  const validateAmount = () => {
    if (!customAmount && !selectedAmount) {
      setErrors((prev) => ({
        ...prev,
        amount: "Please select or enter an amount",
      }));
      return false;
    }

    if (customAmount) {
      const amount = parseFloat(customAmount);
      if (isNaN(amount) || amount <= 0) {
        setErrors((prev) => ({
          ...prev,
          amount: "Please enter a valid amount",
        }));
        return false;
      }
    }

    clearError("amount");
    return true;
  };

  // Validate VC selection
  const validateVCSelection = () => {
    if (!selectedVC) {
      setErrors((prev) => ({
        ...prev,
        vc: "Please select a VC type",
      }));
      return false;
    }
    clearError("vc");
    return true;
  };

  // API call for withdrawal
  const submitWithdrawal = async (withdrawalData) => {
    setIsLoading(true);

    try {
      const response = await post("wallet/withdraw", withdrawalData);

      if (response.data?.success) {
        ToastMessage("Withdrawal request submitted successfully", "success");
        console.log("Withdrawal response:", response.data);

        // Reset form
        setBankState(initialBankState);
        setCustomAmount("");
        setSelectedAmount("");
        setSelectedVC("");
        setErrors({});

        // Navigate back or to success screen
        navigation.goBack();
      } else {
        ToastMessage(
          response.data?.message || "Withdrawal request failed",
          "error"
        );
      }
    } catch (error) {
      console.error("Withdrawal error:", error);
      ToastMessage(
        "An error occurred while processing your withdrawal",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    const isAmountValid = validateAmount();
    const areBankDetailsValid = validateBankDetails();
    const isVCValid = validateVCSelection();

    if (isAmountValid && areBankDetailsValid && isVCValid) {
      // Prepare data for submission
      const withdrawalData = {
        vc_type: selectedVC,
        amount: parseFloat(customAmount || selectedAmount.replace("$", "")),
        bank_details: {
          ...bankState,
        },
        withdrawal_date: new Date().toISOString(),
      };

      console.log("Withdrawal data:", withdrawalData);

      // Show confirmation dialog
      Alert.alert(
        "Confirm Withdrawal",
        `Are you sure you want to withdraw $${withdrawalData.amount} from your ${selectedVC}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => submitWithdrawal(withdrawalData),
          },
        ]
      );
    }
  };

  const multiAmounts = ["$25", "$50", "$100", "$250", "$500"];

  // Bank details form configuration
  // Template for future forms: Each field object should have:
  // - key: state property name
  // - label: field label
  // - placeholder: input placeholder
  // - multiline: boolean for multiline input
  // - numberOfLines: number of lines for multiline (optional)
  // - keyboardType: keyboard type (optional)
  // - secureTextEntry: boolean for password fields (optional)
  const bankDetailsFields = [
    {
      key: "beneficiary_name",
      label: "Beneficiary Name",
      placeholder: "Enter beneficiary name",
      multiline: false,
    },
    {
      key: "bank_name",
      label: "Bank Name",
      placeholder: "Enter bank name",
      multiline: false,
    },
    {
      key: "iban",
      label: "IBAN",
      placeholder: "Enter IBAN",
      multiline: false,
    },
    {
      key: "account_num",
      label: "Account Number",
      placeholder: "Enter account number",
      multiline: false,
    },
    {
      key: "bic",
      label: "BIC/SWIFT",
      placeholder: "Enter BIC/SWIFT code",
      multiline: false,
    },
    {
      key: "bank_address",
      label: "Bank Address",
      placeholder: "Enter bank address",
      multiline: true,
      numberOfLines: 3,
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Withdraw Credits"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={isLoading ? "Processing..." : "Withdraw Now"}
            onPress={handleSubmit}
            disabled={isLoading}
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            marginTop={8}
            onPress={() => navigation.goBack()}
            disabled={isLoading}
          />
        </View>
      )}
    >
      <CustomText
        label={"Withdraw Credits"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={6}
      />
      <CustomText
        label={"You don’t have any messages yet."}
        color={COLORS.gray1}
        fontFamily={fonts.regular}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={20}
      />

      <CustomDropdown
        withLabel={"Debit from"}
        placeholder="Select your VC"
        data={genre}
        value={selectedVC}
        setValue={(value) => {
          setSelectedVC(value);
          clearError("vc");
        }}
        error={errors.vc}
      />

      <View style={[styles.row, { marginTop: -7 }]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />
        <CustomText
          label={`Currently:`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
        <CustomText
          label={`80,700 (SC) Sola Credits.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.darkPurple}
          fontFamily={fonts.medium}
          marginLeft={2}
        />
      </View>

      <Divider marginVertical={20} />

      <WalletInput
        withLabel={"Custom Amount"}
        placeholder={"15.00"}
        value={customAmount}
        onChangeText={(text) => {
          setCustomAmount(text);
          // Clear amount error if it exists
          if (errors.amount) {
            setErrors((prev) => ({
              ...prev,
              amount: null,
            }));
          }
        }}
        keyboardType="numeric"
        showCurrencySymbol={true}
        currencySymbol="$"
        currencySymbolColor={COLORS.black}
        currencySymbolFontSize={40}
        inputFontSize={40}
        borderRadius={16}
      />

      <AmountSelectionButtons
        amounts={multiAmounts}
        selectedAmount={selectedAmount}
        onSelectAmount={(amount) => {
          setSelectedAmount(amount);
          // Clear amount error if it exists
          if (errors.amount) {
            setErrors((prev) => ({
              ...prev,
              amount: null,
            }));
          }
        }}
        onCustomAmountChange={(amount) => {
          setCustomAmount(amount);
          // Clear amount error if it exists
          if (errors.amount) {
            setErrors((prev) => ({
              ...prev,
              amount: null,
            }));
          }
        }}
        containerStyle={{ marginTop: -2 }}
      />

      {errors.amount && (
        <CustomText
          label={errors.amount}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.error || "#FF3B30"}
          marginTop={4}
          fontFamily={fonts.regular}
        />
      )}

      <View style={[styles.row, { marginTop: 8 }]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />

        <CustomText
          label={`Define how much you want to refill.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
      </View>

      <Divider marginVertical={20} />

      {/* Bank Details Section */}
      <CustomText
        label={"Bank Details"}
        fontFamily={fonts.semiBold}
        fontSize={18}
        lineHeight={18 * 1.4}
        marginTop={10}
        marginBottom={16}
      />

      {bankDetailsFields.map((field, index) => (
        <CustomInput
          key={field.key}
          withLabel={field.label}
          placeholder={field.placeholder}
          value={bankState[field.key]}
          onChangeText={(text) => handleBankStateChange(field.key, text)}
          error={errors[field.key]}
          marginBottom={index === bankDetailsFields.length - 1 ? 20 : 12}
          multiline={field.multiline}
          numberOfLines={field.numberOfLines}
          keyboardType={field.keyboardType}
          secureTextEntry={field.secureTextEntry}
        />
      ))}
    </ScreenWrapper>
  );
};

export default WithdrawCredits;

const styles = StyleSheet.create({
  item: {
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  footer: {
    paddingHorizontal: 12,
    marginBottom: 10,
    // Shadow for iOS
    // shadowColor: 'rgba(18, 18, 18, 0.04)',
    // shadowOffset: { width: 0, height: -8 },
    // shadowOpacity: 1,
    // shadowRadius: 4,
    // Shadow for Android
    // elevation: 2,
  },
});
