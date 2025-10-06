import { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";
import fonts from "../../../assets/fonts";
import AmountSelectionButtons from "../../../components/AmountSelectionButtons";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import WalletInput from "../../../components/WalletInput";
import { COLORS } from "../../../utils/COLORS";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";

const RequestCredit = ({ navigation }) => {
  // Dropdown options
  const vcOptions = ["Personal VC", "Friend VC"];
  const whenOptions = ["Now", "Later", "Scheduled"];
  
  // State management
  const [formData, setFormData] = useState({
    requestFrom: "",
    when: "",
  });
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const multiAmounts = ["$25", "$50", "$100", "$250", "$500"];

  // Dropdown configuration for array-based rendering
  const dropdownFields = [
    {
      key: "requestFrom",
      label: "Request from",
      placeholder: "Select your VC",
      data: vcOptions,
      value: formData.requestFrom,
      error: errors.requestFrom,
    },
    {
      key: "when",
      label: "When",
      placeholder: "Now",
      data: whenOptions,
      value: formData.when,
      error: errors.when,
    },
  ];

  // Form handlers
  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  // Validation functions
  const validateAmount = () => {
    if (!customAmount && !selectedAmount) {
      setErrors(prev => ({
        ...prev,
        amount: "Please select or enter an amount",
      }));
      return false;
    }

    if (customAmount) {
      const amount = parseFloat(customAmount);
      if (isNaN(amount) || amount <= 0) {
        setErrors(prev => ({
          ...prev,
          amount: "Please enter a valid amount",
        }));
        return false;
      }
    }

    clearError("amount");
    return true;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.requestFrom) {
      newErrors.requestFrom = "Please select request source";
    }

    if (!formData.when) {
      newErrors.when = "Please select when to request";
    }

    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  // API call for credit request
  const submitCreditRequest = async (requestData) => {
    setIsLoading(true);
    
    try {
      const response = await post("wallet/request-credit", requestData);
      
      if (response.data?.success) {
        ToastMessage("Credit request submitted successfully", "success");
        console.log("Credit request response:", response.data);
        
        // Reset form
        setFormData({ requestFrom: "", when: "" });
        setCustomAmount("");
        setSelectedAmount("");
        setErrors({});
        
        // Navigate back or to success screen
        navigation.goBack();
      } else {
        ToastMessage(response.data?.message || "Credit request failed", "error");
      }
    } catch (error) {
      console.error("Credit request error:", error);
      ToastMessage("An error occurred while processing your request", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    const isAmountValid = validateAmount();
    const isFormValid = validateForm();

    if (isAmountValid && isFormValid) {
      const requestData = {
        requestFrom: formData.requestFrom,
        when: formData.when,
        amount: parseFloat(customAmount || selectedAmount.replace("$", "")),
        requestDate: new Date().toISOString(),
      };

      console.log("Credit request data:", requestData);
      
      // Show confirmation dialog
      Alert.alert(
        "Confirm Credit Request",
        `Are you sure you want to request $${requestData.amount} from ${formData.requestFrom}?`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Confirm",
            onPress: () => submitCreditRequest(requestData),
          },
        ]
      );
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Request Credits"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={isLoading ? "Processing..." : "Request Credits Now"}
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
        marginTop={28}
        label={"Request Credits"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
      />
      <CustomText
        label={"Request credits from your VC or friends"}
        color={COLORS.subtitle}
        fontFamily={fonts.regular}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={15}
      />

      {/* Render dropdowns using array */}
      {dropdownFields.map((field, index) => (
        <View key={field.key}>
          <CustomDropdown
            withLabel={field.label}
            placeholder={field.placeholder}
            data={field.data}
            value={field.value}
            setValue={(value) => handleFormChange(field.key, value)}
            error={field.error}
          />
          
          {/* Info text for each dropdown */}
          {field.key === "requestFrom" && (
            <View style={[styles.row, { marginTop: -5 }]}>
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
                marginTop={2}
                fontFamily={fonts.regular}
              />
              <CustomText
                label={`80,700 (SC) Sola Credits.`}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.darkPurple}
                fontFamily={fonts.medium}
                marginLeft={2}
                marginTop={3}
              />
            </View>
          )}

          {field.key === "when" && (
            <View style={[styles.row, { marginTop: -10, marginBottom: 20 }]}>
              <Icons
                name={"info"}
                family={"Feather"}
                size={12}
                marginRight={4}
                color={COLORS.gray2}
              />
              <CustomText
                label={`Up to 3 months in advance.`}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.gray1}
                marginTop={2}
                fontFamily={fonts.regular}
              />
            </View>
          )}

          {index === 0 && <Divider marginVertical={20} />}
        </View>
      ))}

      {/* Amount Section */}
      <WalletInput
        withLabel={"Custom Amount"}
        placeholder={"15.00"}
        value={customAmount}
        onChangeText={(text) => {
          setCustomAmount(text);
          clearError("amount");
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
          clearError("amount");
        }}
        onCustomAmountChange={(amount) => {
          setCustomAmount(amount);
          clearError("amount");
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
          label={`Define how much you want to request.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
      </View>

      <Divider marginVertical={20} />
    </ScreenWrapper>
  );
};

export default RequestCredit;

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
    marginVertical: 12,
    backgroundColor: COLORS.white,
  },
});
