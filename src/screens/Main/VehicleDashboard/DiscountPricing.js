import ScreenWrapper from "../../../components/ScreenWrapper";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../../../components/Header";
import { useState, useMemo, useEffect } from "react";
import { COLORS } from "../../../utils/COLORS";
import CustomInput from "./../../../components/CustomInput";
import CollapseableCard from "./molecules/CollaspeableCard";
import HighlightedText from "./molecules/HighlightedText";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import CustomSwitch from "../../../components/CustomSwitch";
import Divider from "../../../components/Divider";
import CustomButton from "../../../components/CustomButton";
import { put } from "../../../services/ApiRequest";
import { useNavigation } from "@react-navigation/native";

const DiscountPricing = ({route}) => {
  const navigation = useNavigation();
  const item = route.params?.currentVehicle;
  console.log("item?.DiscountsPricing",item?.DiscountsPricing);

  const [collapsed, setCollapsed] = useState(true);
  const [extraDrivers, setextraDrivers] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    firstOrderDiscount: {
      enable: false,
      discount: "",
    },
    earlyBirdsDiscount: {
      enable: false,
      customer: "",
      discount: "",
    },
    streakDiscount: {
      enable: false,
      customer: "",
      discount: "",
    },
    lastMinuteDiscount: {
      enable: false,
      customer: "",
      discount: "",
    },
    rentalPeriod: {
      weeklydiscount: "",
      monthlydiscount: "",
      yearlydiscount: "",
    },
  });

  const [errors, setErrors] = useState({});

  // Build full error map for given form values
  const buildErrors = (values) => {
    const newErrors = {};

    // First Order Discount validation
    if (values.firstOrderDiscount.enable && (!values.firstOrderDiscount.discount || values.firstOrderDiscount.discount.trim() === "")) {
      newErrors.firstOrderDiscountError = "Please enter discount percentage";
    } else if (values.firstOrderDiscount.enable && (isNaN(values.firstOrderDiscount.discount) || parseInt(values.firstOrderDiscount.discount) < 0 || parseInt(values.firstOrderDiscount.discount) > 100)) {
      newErrors.firstOrderDiscountError = "Discount must be between 0-100";
    }

    // Early Birds Discount validation
    if (values.earlyBirdsDiscount.enable) {
      if (!values.earlyBirdsDiscount.customer || values.earlyBirdsDiscount.customer.trim() === "") {
        newErrors.earlyBirdsCustomerError = "Please enter number of customers";
      } else if (isNaN(values.earlyBirdsDiscount.customer) || parseInt(values.earlyBirdsDiscount.customer) < 1) {
        newErrors.earlyBirdsCustomerError = "Must be at least 1 customer";
      }
      
      if (!values.earlyBirdsDiscount.discount || values.earlyBirdsDiscount.discount.trim() === "") {
        newErrors.earlyBirdsDiscountError = "Please enter discount percentage";
      } else if (isNaN(values.earlyBirdsDiscount.discount) || parseInt(values.earlyBirdsDiscount.discount) < 0 || parseInt(values.earlyBirdsDiscount.discount) > 100) {
        newErrors.earlyBirdsDiscountError = "Discount must be between 0-100";
      }
    }

    // Streak Discount validation
    if (values.streakDiscount.enable) {
      if (!values.streakDiscount.customer || values.streakDiscount.customer.trim() === "") {
        newErrors.streakCustomerError = "Please enter minimum orders";
      } else if (isNaN(values.streakDiscount.customer) || parseInt(values.streakDiscount.customer) < 1) {
        newErrors.streakCustomerError = "Must be at least 1 order";
      }
      
      if (!values.streakDiscount.discount || values.streakDiscount.discount.trim() === "") {
        newErrors.streakDiscountError = "Please enter discount percentage";
      } else if (isNaN(values.streakDiscount.discount) || parseInt(values.streakDiscount.discount) < 0 || parseInt(values.streakDiscount.discount) > 100) {
        newErrors.streakDiscountError = "Discount must be between 0-100";
      }
    }

    // Last Minute Discount validation
    if (values.lastMinuteDiscount.enable) {
      if (!values.lastMinuteDiscount.customer || values.lastMinuteDiscount.customer.trim() === "") {
        newErrors.lastMinuteCustomerError = "Please enter days prior booking";
      } else if (isNaN(values.lastMinuteDiscount.customer) || parseInt(values.lastMinuteDiscount.customer) < 1) {
        newErrors.lastMinuteCustomerError = "Must be at least 1 day";
      }
      
      if (!values.lastMinuteDiscount.discount || values.lastMinuteDiscount.discount.trim() === "") {
        newErrors.lastMinuteDiscountError = "Please enter discount percentage";
      } else if (isNaN(values.lastMinuteDiscount.discount) || parseInt(values.lastMinuteDiscount.discount) < 0 || parseInt(values.lastMinuteDiscount.discount) > 100) {
        newErrors.lastMinuteDiscountError = "Discount must be between 0-100";
      }
    }

    // Rental Period validation
    if (!values.rentalPeriod.weeklydiscount || values.rentalPeriod.weeklydiscount.trim() === "") {
      newErrors.weeklyDiscountError = "Please enter weekly discount";
    } else if (isNaN(values.rentalPeriod.weeklydiscount) || parseInt(values.rentalPeriod.weeklydiscount) < 0 || parseInt(values.rentalPeriod.weeklydiscount) > 100) {
      newErrors.weeklyDiscountError = "Weekly discount must be between 0-100";
    }

    if (!values.rentalPeriod.monthlydiscount || values.rentalPeriod.monthlydiscount.trim() === "") {
      newErrors.monthlyDiscountError = "Please enter monthly discount";
    } else if (isNaN(values.rentalPeriod.monthlydiscount) || parseInt(values.rentalPeriod.monthlydiscount) < 0 || parseInt(values.rentalPeriod.monthlydiscount) > 100) {
      newErrors.monthlyDiscountError = "Monthly discount must be between 0-100";
    }

    if (!values.rentalPeriod.yearlydiscount || values.rentalPeriod.yearlydiscount.trim() === "") {
      newErrors.yearlyDiscountError = "Please enter yearly discount";
    } else if (isNaN(values.rentalPeriod.yearlydiscount) || parseInt(values.rentalPeriod.yearlydiscount) < 0 || parseInt(values.rentalPeriod.yearlydiscount) > 100) {
      newErrors.yearlyDiscountError = "Yearly discount must be between 0-100";
    }

    return newErrors;
  };

  // Real-time error clearing at field level
  const validateField = (field, value, current) => {
    const keys = field.split('.');
    const updatedData = { ...current };
    
    if (keys.length === 2) {
      updatedData[keys[0]] = { ...updatedData[keys[0]], [keys[1]]: value };
    } else {
      updatedData[field] = value;
    }

    const newErrors = buildErrors(updatedData);
    const errorKey = `${field.replace('.', '')}Error`;
    
    return newErrors[errorKey] || "";
  };

  const handleInputChange = (field, value) => {
    const keys = field.split('.');
    
    if (keys.length === 2) {
      setFormData(prev => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }

    // Real-time field-level validation and clearing
    const fieldErrorKey = `${field.replace('.', '')}Error`;
    const message = validateField(field, value, formData);
    setErrors((prev) => ({ ...prev, [fieldErrorKey]: message }));
  };

  const handleSwitchChange = (field, value) => {
    const keys = field.split('.');
    
    setFormData(prev => ({
      ...prev,
      [keys[0]]: {
        ...prev[keys[0]],
        [keys[1]]: value,
      },
    }));

    // Clear related errors when switch is turned off
    if (!value) {
      const section = keys[0];
      setErrors((prev) => {
        const newErrors = { ...prev };
        if (section === 'firstOrderDiscount') {
          delete newErrors.firstOrderDiscountError;
        } else if (section === 'earlyBirdsDiscount') {
          delete newErrors.earlyBirdsCustomerError;
          delete newErrors.earlyBirdsDiscountError;
        } else if (section === 'streakDiscount') {
          delete newErrors.streakCustomerError;
          delete newErrors.streakDiscountError;
        } else if (section === 'lastMinuteDiscount') {
          delete newErrors.lastMinuteCustomerError;
          delete newErrors.lastMinuteDiscountError;
        }
        return newErrors;
      });
    }
  };

  // Initialize form data from route params if available
  useEffect(() => {
    if (item?.DiscountsPricing) {
      const discountData = item.DiscountsPricing;
      setFormData({
        firstOrderDiscount: {
          enable: discountData.FirstOrderDiscounts?.enable || false,
          discount: discountData.FirstOrderDiscounts?.discount?.toString() || "",
        },
        earlyBirdsDiscount: {
          enable: discountData.EarlyBirdsDiscounts?.enable || false,
          customer: discountData.EarlyBirdsDiscounts?.customer?.toString() || "",
          discount: discountData.EarlyBirdsDiscounts?.discount?.toString() || "",
        },
        streakDiscount: {
          enable: discountData.StreakDiscounts?.enable || false,
          customer: discountData.StreakDiscounts?.customer?.toString() || "",
          discount: discountData.StreakDiscounts?.discount?.toString() || "",
        },
        lastMinuteDiscount: {
          enable: discountData.LastMinuteDiscounts?.enable || false,
          customer: discountData.LastMinuteDiscounts?.customer?.toString() || "",
          discount: discountData.LastMinuteDiscounts?.discount?.toString() || "",
        },
        rentalPeriod: {
          weeklydiscount: discountData.RentalPeriod?.weeklydiscount?.toString() || "",
          monthlydiscount: discountData.RentalPeriod?.monthlydiscount?.toString() || "",
          yearlydiscount: discountData.RentalPeriod?.yearlydiscount?.toString() || "",
        },
      });
    }
  }, [item]);

  const handleSubmit = async () => {
    // Synchronous validation to prevent submitting with errors
    const newErrors = buildErrors(formData);
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((m) => m && m.length > 0);
    if (hasAnyError) {
      return;
    }

    if (!item?.id || !item?.DiscountsPricing?._id) {
      console.error("Missing vehicle ID or discount ID");
      return;
    }

    setLoading(true);

    const body = {
      FirstOrderDiscounts: {
        enable: formData.firstOrderDiscount.enable,
        discount: formData.firstOrderDiscount.enable ? parseInt(formData.firstOrderDiscount.discount) || 0 : 0,
      },
      EarlyBirdsDiscounts: {
        enable: formData.earlyBirdsDiscount.enable,
        customer: formData.earlyBirdsDiscount.enable ? parseInt(formData.earlyBirdsDiscount.customer) || 0 : 0,
        discount: formData.earlyBirdsDiscount.enable ? parseInt(formData.earlyBirdsDiscount.discount) || 0 : 0,
      },
      StreakDiscounts: {
        enable: formData.streakDiscount.enable,
        customer: formData.streakDiscount.enable ? parseInt(formData.streakDiscount.customer) || 0 : 0,
        discount: formData.streakDiscount.enable ? parseInt(formData.streakDiscount.discount) || 0 : 0,
      },
      LastMinuteDiscounts: {
        enable: formData.lastMinuteDiscount.enable,
        customer: formData.lastMinuteDiscount.enable ? parseInt(formData.lastMinuteDiscount.customer) || 0 : 0,
        discount: formData.lastMinuteDiscount.enable ? parseInt(formData.lastMinuteDiscount.discount) || 0 : 0,
      },
      RentalPeriod: {
        weeklydiscount: parseInt(formData.rentalPeriod.weeklydiscount) || 0,
        monthlydiscount: parseInt(formData.rentalPeriod.monthlydiscount) || 0,
        yearlydiscount: parseInt(formData.rentalPeriod.yearlydiscount) || 0,
      },
    };

    try {
      const url = `vehicles/${item.id}/discounts-pricing/${item.DiscountsPricing._id}`;
      const response = await put(url, body);
      
      if (response.error) {
        console.error("API Error:", response.error);
      } else {
        console.log("Success:======>", response.data);
        navigation.goBack();
      }
    } catch (error) {
      console.error("Submit Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Pricing"} marginBottom={30} />}
    >
      <CollapseableCard
        showSwitch
        title="Discounts"
        subtitle="Make yourself attractive to customers."
        collapsed={collapsed}
        toggleCollapse={() => setCollapsed(!collapsed)}
        switchValue={formData.firstOrderDiscount.enable}
        setSwitchValue={(value) => handleSwitchChange('firstOrderDiscount.enable', value)}
        switchLabel="Do you Offer First Order Discounts?"
        switchSubLabel="When a customer make a first order with you he gets a discounted price."
        highlight={
          <HighlightedText
            textAfter={"of Professional use it"}
            highlightedText="87%"
            highlightFontFamily={fonts.semiBold}
            highlightColor={COLORS.darkPurple}
            fontSize={12}
            align="left"
            marginBottom={8}
          />
        }
        showInputs={formData.firstOrderDiscount.enable}
        inputFields={[
          {
            component: (
              <CustomInput 
                withLabel="Discount (%)" 
                value={formData.firstOrderDiscount.discount}
                onChangeText={(text) => handleInputChange('firstOrderDiscount.discount', text)}
                keyboardType="number-pad"
                placeholder="Enter discount percentage"
                error={errors.firstOrderDiscountError}
              />
            ),
          },
        ]}
        error={null}
      />

      {collapsed && (
        <>
          <View>
            <View style={[styles.switchSty]}>
              <View style={{ width: "85%" }}>
                <CustomText
                  label={"Do you Offer Early Birds Discounts?"}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  lineHeight={16 * 1.4}
                />
                <CustomText
                  label={
                    "E.g. The first 10 customers that order from you get a discounted price."
                  }
                  color={COLORS.gray1}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                />
              </View>
              <CustomSwitch 
                value={formData.earlyBirdsDiscount.enable} 
                setValue={(value) => handleSwitchChange('earlyBirdsDiscount.enable', value)} 
              />
            </View>
            <HighlightedText
              textAfter={"of professional use it."}
              highlightedText="87%"
              fontSize={12}
              highlightFontFamily={fonts.semiBold}
              highlightColor={COLORS.darkPurple}
              align="left"
              marginBottom={10}
            />
          </View>
          {formData.earlyBirdsDiscount.enable && (
            <>
              <CustomInput 
                withLabel="How Many Customers" 
                value={formData.earlyBirdsDiscount.customer}
                onChangeText={(text) => handleInputChange('earlyBirdsDiscount.customer', text)}
                keyboardType="number-pad"
                placeholder="Enter number of customers"
                error={errors.earlyBirdsCustomerError}
              />
              <CustomInput 
                withLabel="Discount (%)" 
                value={formData.earlyBirdsDiscount.discount}
                onChangeText={(text) => handleInputChange('earlyBirdsDiscount.discount', text)}
                keyboardType="number-pad"
                placeholder="Enter discount percentage"
                error={errors.earlyBirdsDiscountError}
              />
            </>
          )}

          <Divider marginBottom={18} />

          <View>
            <View style={[styles.switchSty]}>
              <View style={{ width: "85%" }}>
                <CustomText
                  label={"Do you Offer Streak Discounts?"}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  lineHeight={16 * 1.4}
                />
                <CustomText
                  label={
                    "E.g. When a loyal customer makes a certain amount of repeated orders with you he gets a discounted price from you."
                  }
                  color={COLORS.gray1}
                  fontSize={12}
                  fontFamily={fonts.regular}
                  lineHeight={12 * 1.4}
                />
              </View>
              <CustomSwitch 
                value={formData.streakDiscount.enable} 
                setValue={(value) => handleSwitchChange('streakDiscount.enable', value)} 
              />
            </View>
            <HighlightedText
              textAfter={"of professional use it."}
              highlightedText="96%"
              fontSize={12}
              align="left"
              marginBottom={10}
            />
          </View>

          {formData.streakDiscount.enable && (
            <>
              <CustomInput 
                withLabel="MINIMUM AMOUNT OF ORDERS" 
                value={formData.streakDiscount.customer}
                onChangeText={(text) => handleInputChange('streakDiscount.customer', text)}
                keyboardType="number-pad"
                placeholder="Enter minimum orders"
                error={errors.streakCustomerError}
              />
              <CustomInput 
                withLabel="Discount (%)" 
                value={formData.streakDiscount.discount}
                onChangeText={(text) => handleInputChange('streakDiscount.discount', text)}
                keyboardType="number-pad"
                placeholder="Enter discount percentage"
                error={errors.streakDiscountError}
              />
            </>
          )}

          <Divider marginBottom={18} />

          <View>
            <View style={[styles.switchSty]}>
              <View style={{ width: "85%" }}>
                <CustomText
                  label={"Do you Offer Last Minute Discounts?"}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  lineHeight={16 * 1.4}
                />
                <CustomText
                  label={
                    "E.g. The first 10 customers that order from you get a discounted price."
                  }
                  color={COLORS.gray1}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                />
              </View>
              <CustomSwitch 
                value={formData.lastMinuteDiscount.enable} 
                setValue={(value) => handleSwitchChange('lastMinuteDiscount.enable', value)} 
              />
            </View>
            <HighlightedText
              textAfter={"of professional use it."}
              highlightedText="87%"
              fontSize={12}
              align="left"
              marginBottom={10}
            />
          </View>

          {formData.lastMinuteDiscount.enable && (
            <>
              <CustomInput 
                withLabel="HOW MANY DAYS PRIOR BOOKING" 
                value={formData.lastMinuteDiscount.customer}
                onChangeText={(text) => handleInputChange('lastMinuteDiscount.customer', text)}
                keyboardType="number-pad"
                placeholder="Enter days prior booking"
                error={errors.lastMinuteCustomerError}
              />
              <CustomInput 
                withLabel="Discount (%)" 
                value={formData.lastMinuteDiscount.discount}
                onChangeText={(text) => handleInputChange('lastMinuteDiscount.discount', text)}
                keyboardType="number-pad"
                placeholder="Enter discount percentage"
                error={errors.lastMinuteDiscountError}
              />
            </>
          )}

          <Divider marginVertical={16} />
        </>
      )}

      <CollapseableCard
        title="Rental Period"
        subtitle="Setup discounts based on time-periods."
        collapsed={extraDrivers}
        toggleCollapse={() => setextraDrivers(!extraDrivers)}
        showInputs={true}
        inputFields={[
          {
            component: (
              <CustomInput
                withLabel="Weekly Discount"
                value={formData.rentalPeriod.weeklydiscount}
                onChangeText={(text) => handleInputChange('rentalPeriod.weeklydiscount', text)}
                keyboardType="number-pad"
                placeholder="Enter weekly discount %"
                error={errors.weeklyDiscountError}
                marginBottom={8}
                marginTop={8}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  textBefore={
                    "Granted if rental equals or exceeds a 7 days period."
                  }
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                />
                <HighlightedText
                  textAfter={"of professional use it."}
                  highlightedText="96%"
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Equals to"}
                  highlightedText="$1,235.25"
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
              </>
            ),
          },
          {
            component: (
              <CustomInput 
                withLabel="Monthly Discount" 
                value={formData.rentalPeriod.monthlydiscount}
                onChangeText={(text) => handleInputChange('rentalPeriod.monthlydiscount', text)}
                keyboardType="number-pad"
                placeholder="Enter monthly discount %"
                error={errors.monthlyDiscountError}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  textBefore={
                    "Granted if rental equals or exceeds a 30 days period."
                  }
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                />
                <HighlightedText
                  textAfter={"of professional use it."}
                  highlightedText="96%"
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Equals to"}
                  highlightedText="$1,235.25"
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
              </>
            ),
          },
          {
            component: (
              <CustomInput 
                withLabel="Yearly Discount" 
                value={formData.rentalPeriod.yearlydiscount}
                onChangeText={(text) => handleInputChange('rentalPeriod.yearlydiscount', text)}
                keyboardType="number-pad"
                placeholder="Enter yearly discount %"
                error={errors.yearlyDiscountError}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  textBefore={
                    "Granted if rental equals or exceeds a 365 days period."
                  }
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                />
                <HighlightedText
                  textAfter={"of professional use it."}
                  highlightedText="96%"
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
                <HighlightedText
                  textBefore={"Equals to"}
                  highlightedText="$1,235.25"
                  fontSize={12}
                  align="left"
                  marginBottom={10}
                  marginTop={-10}
                />
              </>
            ),
          },
        ]}
        error={null}
      />
      
      {/* Submit Button */}
      <CustomButton
        title={loading ? "Saving..." : "Save Changes"}
        marginTop={24}
        marginBottom={24}
        onPress={handleSubmit}
        disabled={loading}
        backgroundColor={loading ? COLORS.gray : COLORS.primary}
      />
     
    </ScreenWrapper>
  );
};

export default DiscountPricing;

const styles = StyleSheet.create({
  switchSty: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
