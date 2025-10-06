import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import CollapseableCard from "./molecules/CollaspeableCard";
import HighlightedText from "./molecules/HighlightedText";

const TripGeneralPricing = ({ route }) => {
  const navigation = useNavigation();
  const item = route.params?.currentVehicle;
  const averagePricing  = route.params?.averagePricing;
  console.log("item---", averagePricing);

  // UI state
  const [collapsedGeneral, setCollapsedGeneral] = useState(true);
  const [collapsedMileage, setCollapsedMileage] = useState(true);
  const [collapsedPassengers, setCollapsedPassengers] = useState(true);
  const [collapsedLuggage, setCollapsedLuggage] = useState(true);
  const [collapsedPets, setCollapsedPets] = useState(true);
  const [autoAdapt, setAutoAdapt] = useState(true);
  const [loading, setLoading] = useState(false);

  // Consolidated form data state
  const [formData, setFormData] = useState({
    currency: "US Dollars",
    basePrice: "",
    ppkmless10km: "",
    ppkmgrater10km: "",
    ppkmless10kmNight: "",
    ppkmgrater10kmNight: "",
    ppkmless10kmWeekend: "",
    ppkmgrater10kmWeekend: "",
    ppkmless10kmWeekendNight: "",
    ppkmgrater10kmWeekendNight: "",
    pets: "",
    mileage: {
      model: "Limited",
      price: "",
    },
    passengers: {
      model: "Limited",
      price: "",
      extraStartingFrom: "",
    },
    luggage: {
      model: "Limited",
      price: "",
      extraStartingFrom: "",
    },
    autoAdapt: false,
  });

  const [errors, setErrors] = useState({});

  // Helpers to use market averages and compute diffs
  const basicMarket = averagePricing?.averagePricing?.basicPricing || {};

  const getMarketRate = (fieldKey) => {
    const map = {
      basePrice: "basePrice",
      ppkmless10km: "perKmLessThan10km",
      ppkmgrater10km: "perKmGreaterThan10km",
      ppkmless10kmNight: "perKmLessThan10kmNight",
      ppkmgrater10kmNight: "perKmGreaterThan10kmNight",
      ppkmless10kmWeekend: "perKmLessThan10kmWeekend",
      ppkmgrater10kmWeekend: "perKmGreaterThan10kmWeekend",
      ppkmless10kmWeekendNight: "perKmLessThan10kmWeekendNight",
      ppkmgrater10kmWeekendNight: "perKmGreaterThan10kmWeekendNight",
    };
    const marketKey = map[fieldKey];
    return marketKey ? basicMarket[marketKey] : undefined;
  };

  const formatCurrency = (value) => {
    if (value === undefined || value === null || value === "") return "--";
    const num = Number(value);
    if (Number.isNaN(num)) return "--";
    return `$${num.toFixed(2)}`;
  };

  const percentDiff = (userValue, marketValue) => {
    const u = parseFloat(userValue);
    const m = parseFloat(marketValue);
    if (Number.isNaN(u) || Number.isNaN(m) || m === 0) return "";
    const pct = ((u - m) / m) * 100;
    const rounded = Math.round(pct);
    const sign = rounded > 0 ? "+" : "";
    return `${sign}${rounded}%`;
  };

  const currencies = [
    "US Dollar (USD)",
    "Euro (EUR)",
    "British Pound Sterling (GBP)",
    "Japanese Yen (JPY)",
    "Swiss Franc (CHF)",
    "Canadian Dollar (CAD)",
    "Australian Dollar (AUD)",
    "New Zealand Dollar (NZD)",
    "Chinese Yuan Renminbi (CNY)",
    "Hong Kong Dollar (HKD)",
    "Singapore Dollar (SGD)",
    "Swedish Krona (SEK)",
    "Norwegian Krone (NOK)",
    "Danish Krone (DKK)",
    "Indian Rupee (INR)",
    "Brazilian Real (BRL)",
    "Russian Ruble (RUB)",
    "South African Rand (ZAR)",
    "Mexican Peso (MXN)",
    "Turkish Lira (TRY)",
  ];

  const mileageModels = ["Limited", "Unlimited"];

  // Build full error map for given form values
  const buildErrors = (values) => {
    const newErrors = {};

    // Price validations - all prices must be positive numbers
    if (!values.basePrice || values.basePrice.trim() === "") {
      newErrors.basePriceError = "Please enter base price";
    } else if (isNaN(values.basePrice) || parseFloat(values.basePrice) < 0) {
      newErrors.basePriceError = "Base price must be a positive number";
    }

    if (!values.ppkmless10km || values.ppkmless10km.trim() === "") {
      newErrors.ppkmless10kmError = "Please enter price per km <10km";
    } else if (
      isNaN(values.ppkmless10km) ||
      parseFloat(values.ppkmless10km) < 0
    ) {
      newErrors.ppkmless10kmError = "Price must be a positive number";
    }

    if (!values.ppkmgrater10km || values.ppkmgrater10km.trim() === "") {
      newErrors.ppkmgrater10kmError = "Please enter price per km >10km";
    } else if (
      isNaN(values.ppkmgrater10km) ||
      parseFloat(values.ppkmgrater10km) < 0
    ) {
      newErrors.ppkmgrater10kmError = "Price must be a positive number";
    }

    if (!values.ppkmless10kmNight || values.ppkmless10kmNight.trim() === "") {
      newErrors.ppkmless10kmNightError =
        "Please enter night price per km <10km";
    } else if (
      isNaN(values.ppkmless10kmNight) ||
      parseFloat(values.ppkmless10kmNight) < 0
    ) {
      newErrors.ppkmless10kmNightError = "Price must be a positive number";
    }

    if (
      !values.ppkmgrater10kmNight ||
      values.ppkmgrater10kmNight.trim() === ""
    ) {
      newErrors.ppkmgrater10kmNightError =
        "Please enter night price per km >10km";
    } else if (
      isNaN(values.ppkmgrater10kmNight) ||
      parseFloat(values.ppkmgrater10kmNight) < 0
    ) {
      newErrors.ppkmgrater10kmNightError = "Price must be a positive number";
    }

    if (
      !values.ppkmless10kmWeekend ||
      values.ppkmless10kmWeekend.trim() === ""
    ) {
      newErrors.ppkmless10kmWeekendError =
        "Please enter weekend price per km <10km";
    } else if (
      isNaN(values.ppkmless10kmWeekend) ||
      parseFloat(values.ppkmless10kmWeekend) < 0
    ) {
      newErrors.ppkmless10kmWeekendError = "Price must be a positive number";
    }

    if (
      !values.ppkmgrater10kmWeekend ||
      values.ppkmgrater10kmWeekend.trim() === ""
    ) {
      newErrors.ppkmgrater10kmWeekendError =
        "Please enter weekend price per km >10km";
    } else if (
      isNaN(values.ppkmgrater10kmWeekend) ||
      parseFloat(values.ppkmgrater10kmWeekend) < 0
    ) {
      newErrors.ppkmgrater10kmWeekendError = "Price must be a positive number";
    }

    if (
      !values.ppkmless10kmWeekendNight ||
      values.ppkmless10kmWeekendNight.trim() === ""
    ) {
      newErrors.ppkmless10kmWeekendNightError =
        "Please enter weekend night price per km <10km";
    } else if (
      isNaN(values.ppkmless10kmWeekendNight) ||
      parseFloat(values.ppkmless10kmWeekendNight) < 0
    ) {
      newErrors.ppkmless10kmWeekendNightError =
        "Price must be a positive number";
    }

    if (
      !values.ppkmgrater10kmWeekendNight ||
      values.ppkmgrater10kmWeekendNight.trim() === ""
    ) {
      newErrors.ppkmgrater10kmWeekendNightError =
        "Please enter weekend night price per km >10km";
    } else if (
      isNaN(values.ppkmgrater10kmWeekendNight) ||
      parseFloat(values.ppkmgrater10kmWeekendNight) < 0
    ) {
      newErrors.ppkmgrater10kmWeekendNightError =
        "Price must be a positive number";
    }

    // Mileage validations
    if (!values.mileage.price || values.mileage.price.trim() === "") {
      newErrors.mileagePriceError = "Please enter mileage price";
    } else if (
      isNaN(values.mileage.price) ||
      parseFloat(values.mileage.price) < 0
    ) {
      newErrors.mileagePriceError = "Price must be a positive number";
    }

    // if (
    //   !values.mileage.extraStartingFrom ||
    //   values.mileage.extraStartingFrom.trim() === ""
    // ) {
    //   newErrors.mileageExtraError = "Please enter mileage extra starting point";
    // } else if (
    //   isNaN(values.mileage.extraStartingFrom) ||
    //   parseInt(values.mileage.extraStartingFrom) < 1
    // ) {
    //   newErrors.mileageExtraError = "Must be at least 1";
    // }

    // Passengers validations
    if (!values.passengers.price || values.passengers.price.trim() === "") {
      newErrors.passengersPriceError = "Please enter passenger price";
    } else if (
      isNaN(values.passengers.price) ||
      parseFloat(values.passengers.price) < 0
    ) {
      newErrors.passengersPriceError = "Price must be a positive number";
    }

    if (
      !values.passengers.extraStartingFrom ||
      values.passengers.extraStartingFrom.trim() === ""
    ) {
      newErrors.passengersExtraError =
        "Please enter passenger extra starting point";
    } else if (
      isNaN(values.passengers.extraStartingFrom) ||
      parseInt(values.passengers.extraStartingFrom) < 1
    ) {
      newErrors.passengersExtraError = "Must be at least 1";
    }

    // Luggage validations
    if (!values.luggage.price || values.luggage.price.trim() === "") {
      newErrors.luggagePriceError = "Please enter luggage price";
    } else if (
      isNaN(values.luggage.price) ||
      parseFloat(values.luggage.price) < 0
    ) {
      newErrors.luggagePriceError = "Price must be a positive number";
    }

    if (
      !values.luggage.extraStartingFrom ||
      values.luggage.extraStartingFrom.trim() === ""
    ) {
      newErrors.luggageExtraError = "Please enter luggage extra starting point";
    } else if (
      isNaN(values.luggage.extraStartingFrom) ||
      parseInt(values.luggage.extraStartingFrom) < 1
    ) {
      newErrors.luggageExtraError = "Must be at least 1";
    }

    // Pets validation
    if (!values.pets || values.pets.trim() === "") {
      newErrors.petsError = "Please enter pet fees";
    } else if (isNaN(values.pets) || parseFloat(values.pets) < 0) {
      newErrors.petsError = "Pet fees must be a positive number";
    }

    return newErrors;
  };

  // Real-time error clearing at field level
  const validateField = (field, value, current) => {
    const keys = field.split(".");
    const updatedData = { ...current };

    if (keys.length === 2) {
      updatedData[keys[0]] = { ...updatedData[keys[0]], [keys[1]]: value };
    } else {
      updatedData[field] = value;
    }

    const newErrors = buildErrors(updatedData);
    const errorKey = `${field.replace(".", "")}Error`;

    return newErrors[errorKey] || "";
  };

  const handleInputChange = (field, value) => {
    const keys = field.split(".");

    if (keys.length === 2) {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: {
          ...prev[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }

    // Real-time field-level validation and clearing
    const fieldErrorKey = `${field.replace(".", "")}Error`;
    const message = validateField(field, value, formData);
    setErrors((prev) => ({ ...prev, [fieldErrorKey]: message }));
  };

  // Initialize form data from route params if available
  useEffect(() => {
    if (item?.GeneralPricing) {
      const pricingData = item.GeneralPricing;
      setFormData({
        currency: pricingData.currency || "US Dollars",
        basePrice: pricingData.basePrice?.toString() || "",
        ppkmless10km: pricingData.ppkmless10km?.toString() || "",
        ppkmgrater10km: pricingData.ppkmgrater10km?.toString() || "",
        ppkmless10kmNight: pricingData.ppkmless10kmNight?.toString() || "",
        ppkmgrater10kmNight: pricingData.ppkmgrater10kmNight?.toString() || "",
        ppkmless10kmWeekend: pricingData.ppkmless10kmWeekend?.toString() || "",
        ppkmgrater10kmWeekend:
          pricingData.ppkmgrater10kmWeekend?.toString() || "",
        ppkmless10kmWeekendNight:
          pricingData.ppkmless10kmWeekendNight?.toString() || "",
        ppkmgrater10kmWeekendNight:
          pricingData.ppkmgrater10kmWeekendNight?.toString() || "",
        pets: pricingData.PetsFee?.toString() || "",
        mileage: {
          model: pricingData.Mileage?.model || "Limited",
          price: pricingData.Mileage?.price?.toString() || "",
          extraStartingFrom:
            pricingData.Mileage?.extraStartingFrom?.toString() || "",
        },
        passengers: {
          model: pricingData.Passengers?.model || "Limited",
          price: pricingData.Passengers?.price?.toString() || "",
          extraStartingFrom:
            pricingData.Passengers?.extraStartingFrom?.toString() || "",
        },
        luggage: {
          model: pricingData.Luggage?.model || "Limited",
          price: pricingData.Luggage?.price?.toString() || "",
          extraStartingFrom:
            pricingData.Luggage?.extraStartingFrom?.toString() || "",
        },
        autoAdapt: pricingData.autoAdapt || false,
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

    if (!item?.id) {
      console.error("Missing vehicle ID");
      return;
    }

    setLoading(true);

    const body = {
      basePrice: parseFloat(formData.basePrice) || 0,
      ppkmless10km: parseFloat(formData.ppkmless10km) || 0,
      ppkmgrater10km: parseFloat(formData.ppkmgrater10km) || 0,
      ppkmless10kmNight: parseFloat(formData.ppkmless10kmNight) || 0,
      ppkmgrater10kmNight: parseFloat(formData.ppkmgrater10kmNight) || 0,
      ppkmless10kmWeekend: parseFloat(formData.ppkmless10kmWeekend) || 0,
      ppkmgrater10kmWeekend: parseFloat(formData.ppkmgrater10kmWeekend) || 0,
      ppkmless10kmWeekendNight:
        parseFloat(formData.ppkmless10kmWeekendNight) || 0,
      ppkmgrater10kmWeekendNight:
        parseFloat(formData.ppkmgrater10kmWeekendNight) || 0,
      PetsFee: parseFloat(formData.pets) || 0,
      Mileage: {
        model: formData.mileage.model,
        price: parseFloat(formData.mileage.price) || 0,
      },
      Passengers: {
        model: formData.passengers.model,
        price: parseFloat(formData.passengers.price) || 0,
        extraStartingFrom: parseInt(formData.passengers.extraStartingFrom) || 0,
      },
      Luggage: {
        model: formData.luggage.model,
        price: parseFloat(formData.luggage.price) || 0,
        extraStartingFrom: parseInt(formData.luggage.extraStartingFrom) || 0,
      },
    };

    try {
      let response;

      if (item?.GeneralPricing?._id) {
        // Update existing pricing (PUT request)
        const url = `vehicles/${item.id}/general-pricing/${item.GeneralPricing._id}`;
        response = await put(url, body);
      } else {
        // Create new pricing (POST request)
        const url = `vehicles/${item.id}/general-pricing`;
        response = await post(url, body);
      }

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
      headerUnScrollable={() => <Header title={"General Pricing"} />}
    >
      <CollapseableCard
        title="General Pricing"
        subtitle="Setup now a limit or make it unlimited."
        collapsed={collapsedGeneral}
        toggleCollapse={() => setCollapsedGeneral(!collapsedGeneral)}
        switchValue={autoAdapt}
        setSwitchValue={setAutoAdapt}
        highlight={
          <View>
            <CustomText
              label="$34.33"
              fontSize={48}
              lineHeight={48 * 1.4}
              fontFamily={fonts.semiBold}
              marginTop={20}
            />
            <CustomText
              label={"$1.25 + $1.50 x 10"}
              color={COLORS.gray2}
              fontSize={12}
              lineHeight={12 * 1.4}
            />

            <HighlightedText
              textBefore="Current price for 10km Trip day-time."
              fontSize={12}
              align="left"
              marginTop={4}
            />
            <HighlightedText
              highlightedText={"+26%"}
              textAfter={"of the Chauffeurs' market."}
              fontSize={12}
              align="left"
              highlightColor={COLORS.darkPurple}
            />
            <HighlightedText
              textBefore={"Current average market price is at"}
              highlightedText={"$1.50/km"}
              fontSize={12}
              align="left"
            />
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "80%" }}>
                <CustomText
                  label={"Auto-Adapt To Market Price"}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  lineHeight={16 * 1.4}
                />
                <CustomText
                  label={"Stress-free, easily gain customers."}
                  color={COLORS.gray1}
                  lineHeight={12 * 1.4}
                  fontSize={12}
                />
              </View>
              <CustomSwitch
                value={formData.autoAdapt}
                setValue={(value) => handleInputChange("autoAdapt", value)}
              />
            </View>
          </View>
        }
        showInputs
        inputFields={[
          {
            component: (
              <CustomDropdown
                withLabel="CURRENCY"
                data={currencies}
                value={formData.currency}
                setValue={(value) => handleInputChange("currency", value)}
                placeholder="Select Currency"
                marginBottom={8}
                marginTop={20}
              />
            ),
          },
          {
            component: (
              <CustomInput
                withLabel="BASE PRICE"
                value={formData.basePrice}
                onChangeText={(text) => handleInputChange("basePrice", text)}
                keyboardType="decimal-pad"
                placeholder="Enter base price"
                error={errors.basePriceError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.basePrice,
                    getMarketRate("basePrice")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(getMarketRate("basePrice"))}
                  fontSize={12}
                  align="left"
                />
                <Divider marginVertical={26} />
              </>
            ),
          },

          {
            component: (
              <CustomText
                label="During The Day"
                fontFamily={fonts.semiBold}
                fontSize={16}
                marginTop={6}
                marginBottom={6}
              />
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER <10KM"}
                value={formData.ppkmless10km}
                onChangeText={(text) => handleInputChange("ppkmless10km", text)}
                keyboardType="decimal-pad"
                placeholder="Enter price per km"
                error={errors.ppkmless10kmError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmless10km,
                    getMarketRate("ppkmless10km")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmless10km")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER >10KM"}
                value={formData.ppkmgrater10km}
                onChangeText={(text) =>
                  handleInputChange("ppkmgrater10km", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter price per km"
                error={errors.ppkmgrater10kmError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmgrater10km,
                    getMarketRate("ppkmgrater10km")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmgrater10km")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },

          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER <10KM DURING WEEKENDS"}
                value={formData.ppkmless10kmWeekend}
                onChangeText={(text) =>
                  handleInputChange("ppkmless10kmWeekend", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter weekend price per km"
                error={errors.ppkmless10kmWeekendError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmless10kmWeekend,
                    getMarketRate("ppkmless10kmWeekend")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmless10kmWeekend")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER >10KM DURING WEEKENDS"}
                value={formData.ppkmgrater10kmWeekend}
                onChangeText={(text) =>
                  handleInputChange("ppkmgrater10kmWeekend", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter weekend price per km"
                error={errors.ppkmgrater10kmWeekendError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmgrater10kmWeekend,
                    getMarketRate("ppkmgrater10kmWeekend")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmgrater10kmWeekend")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },

          {
            component: (
              <CustomText
                label="During The Night"
                fontFamily={fonts.semiBold}
                fontSize={16}
                marginTop={6}
                marginBottom={6}
              />
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER <10KM DURING NIGHT"}
                value={formData.ppkmless10kmNight}
                onChangeText={(text) =>
                  handleInputChange("ppkmless10kmNight", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter night price per km"
                error={errors.ppkmless10kmNightError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmless10kmNight,
                    getMarketRate("ppkmless10kmNight")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmless10kmNight")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER >10KM DURING NIGHT"}
                value={formData.ppkmgrater10kmNight}
                onChangeText={(text) =>
                  handleInputChange("ppkmgrater10kmNight", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter night price per km"
                error={errors.ppkmgrater10kmNightError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmgrater10kmNight,
                    getMarketRate("ppkmgrater10kmNight")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmgrater10kmNight")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },

          {
            component: (
              <CustomText
                label="During The Night - Weekends Nights"
                fontFamily={fonts.semiBold}
                fontSize={16}
                marginTop={6}
                marginBottom={6}
              />
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER <10KM DURING WEEKENDS NIGHTS"}
                value={formData.ppkmless10kmWeekendNight}
                onChangeText={(text) =>
                  handleInputChange("ppkmless10kmWeekendNight", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter weekend night price per km"
                error={errors.ppkmless10kmWeekendNightError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmless10kmWeekendNight,
                    getMarketRate("ppkmless10kmWeekendNight")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmless10kmWeekendNight")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },
          {
            component: (
              <CustomInput
                withLabel={"PRICE PER KILOMETER >10KM DURING WEEKENDS NIGHTS"}
                value={formData.ppkmgrater10kmWeekendNight}
                onChangeText={(text) =>
                  handleInputChange("ppkmgrater10kmWeekendNight", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter weekend night price per km"
                error={errors.ppkmgrater10kmWeekendNightError}
                marginBottom={6}
              />
            ),
            infoText: (
              <>
                <HighlightedText
                  highlightedText={percentDiff(
                    formData.ppkmgrater10kmWeekendNight,
                    getMarketRate("ppkmgrater10kmWeekendNight")
                  )}
                  textAfter={"of the Chauffeurs' market."}
                  fontSize={12}
                  align="left"
                />
                <HighlightedText
                  textBefore={"Current market rate is of"}
                  highlightedText={formatCurrency(
                    getMarketRate("ppkmgrater10kmWeekendNight")
                  )}
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                />
              </>
            ),
          },
        ]}
      />

      <CollapseableCard
        title="Mileage"
        subtitle="Setup now a limit or make it unlimited."
        collapsed={collapsedMileage}
        toggleCollapse={() => setCollapsedMileage(!collapsedMileage)}
        showInputs
        inputFields={[
          {
            component: (
              <>
                <CustomDropdown
                  withLabel="MODEL"
                  data={mileageModels}
                  value={formData.mileage.model}
                  setValue={(value) =>
                    handleInputChange("mileage.model", value)
                  }
                  placeholder="Select Model"
                  marginBottom={1}
                  marginTop={12}
                />
                <HighlightedText
                  textBefore="This will limit the total mileage count per day."
                  fontSize={12}
                  align="left"
                  marginBottom={12}
                  marginTop={2}
                />
              </>
            ),
          },

          {
            component: (
              <CustomInput
                withLabel="PRICE PER ADDITIONAL MILE"
                value={formData.mileage.price}
                onChangeText={(text) =>
                  handleInputChange("mileage.price", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter price per mile"
                error={errors.mileagePriceError}
                marginBottom={1}
              />
            ),
            infoText: (
              <HighlightedText
                textBefore="Count once the mileage limit as been exceeded."
                fontSize={12}
                align="left"
              />
            ),
          },
        ]}
      />

      <CollapseableCard
        title="Passengers"
        subtitle="Setup now a limit or make it unlimited."
        collapsed={collapsedPassengers}
        toggleCollapse={() => setCollapsedPassengers(!collapsedPassengers)}
        showInputs
        inputFields={[
          {
            component: (
              <>
                <CustomDropdown
                  withLabel="MODEL"
                  data={mileageModels}
                  value={formData.passengers.model}
                  setValue={(value) =>
                    handleInputChange("passengers.model", value)
                  }
                  placeholder="Select Model"
                  marginBottom={1}
                  marginTop={12}
                />
                <HighlightedText
                  textBefore="This will limit the total passenger count per trip."
                  fontSize={12}
                  align="left"
                  marginTop={2}
                />
              </>
            ),
          },
          {
            component: (
              <>
                <Divider marginVertical={12} />
                <CustomInput
                  withLabel="EXTRA STARTING FROM"
                  value={formData.passengers.extraStartingFrom}
                  onChangeText={(text) =>
                    handleInputChange("passengers.extraStartingFrom", text)
                  }
                  keyboardType="number-pad"
                  placeholder="Enter starting point"
                  error={errors.passengersExtraError}
                  marginBottom={1}
                />
              </>
            ),
            infoText: (
              <HighlightedText
                textBefore="Exceeding this limit will result in extra fees for main customer."
                fontSize={12}
                align="left"
                marginBottom={12}
              />
            ),
          },
          {
            component: (
              <CustomInput
                withLabel="PRICE PER ADDITIONAL PASSENGER"
                value={formData.passengers.price}
                onChangeText={(text) =>
                  handleInputChange("passengers.price", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter price per passenger"
                error={errors.passengersPriceError}
                marginBottom={1}
              />
            ),
            infoText: (
              <HighlightedText
                textBefore="Count once the passenger limit has been exceeded."
                fontSize={12}
                align="left"
              />
            ),
          },
        ]}
      />

      <CollapseableCard
        title="Luggage"
        subtitle="Setup now a limit or make it unlimited."
        collapsed={collapsedLuggage}
        toggleCollapse={() => setCollapsedLuggage(!collapsedLuggage)}
        showInputs
        inputFields={[
          {
            component: (
              <>
                <CustomDropdown
                  withLabel="MODEL"
                  data={mileageModels}
                  value={formData.luggage.model}
                  setValue={(value) =>
                    handleInputChange("luggage.model", value)
                  }
                  placeholder="Select Model"
                  marginBottom={1}
                  marginTop={12}
                />
                <HighlightedText
                  textBefore="This will limit the total luggage count per passenger."
                  fontSize={12}
                  align="left"
                  marginTop={2}
                />
              </>
            ),
          },
          {
            component: (
              <>
                <Divider marginVertical={12} />
                <CustomInput
                  withLabel="OFFERED LUGGAGE PER PASSENGER"
                  value={formData.luggage.extraStartingFrom}
                  onChangeText={(text) =>
                    handleInputChange("luggage.extraStartingFrom", text)
                  }
                  keyboardType="number-pad"
                  placeholder="Enter luggage limit"
                  error={errors.luggageExtraError}
                  marginBottom={1}
                />
              </>
            ),
            infoText: (
              <HighlightedText
                textBefore="Exceeding this limit will result in extra fees for main customer."
                fontSize={12}
                align="left"
                marginBottom={12}
              />
            ),
          },
          {
            component: (
              <CustomInput
                withLabel="PRICE PER ADDITIONAL LUGGAGE"
                value={formData.luggage.price}
                onChangeText={(text) =>
                  handleInputChange("luggage.price", text)
                }
                keyboardType="decimal-pad"
                placeholder="Enter price per luggage"
                error={errors.luggagePriceError}
                marginBottom={1}
              />
            ),
            infoText: (
              <HighlightedText
                textBefore="Count once the luggage limit has been exceeded."
                fontSize={12}
                align="left"
              />
            ),
          },
        ]}
      />
      <CollapseableCard
        title="Pets"
        subtitle="What are your fees for pets?"
        collapsed={collapsedPets}
        toggleCollapse={() => setCollapsedPets(!collapsedPets)}
        showInputs
        inputFields={[
          {
            component: (
              <CustomInput
                withLabel="PET FEES PER PET"
                value={formData.pets}
                onChangeText={(text) => handleInputChange("pets", text)}
                keyboardType="decimal-pad"
                placeholder="Enter price per pet"
                error={errors.petsError}
                marginBottom={1}
              />
            ),
            infoText: (
              <HighlightedText
                textBefore="Customers with pet will need to pay an extra."
                fontSize={12}
                align="left"
              />
            ),
          },
        ]}
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

export default TripGeneralPricing;

const styles = StyleSheet.create({});
