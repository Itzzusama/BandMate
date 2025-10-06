import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTabWithBG from "../../../components/TopTabWithBG";
import UploadImage from "../../../components/UploadImage";
import { post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { COUNTRIES, uploadFileGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useSelector } from "react-redux";

const getCountry = (name) => {
  const country = COUNTRIES?.find((c) => c?.label === name);
  return country;
};

const VTCChauffeur = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState("Independent");
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(null);
  const [countrySheet, setCountrySheet] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [businessLoading, setBusinessLoading] = useState(false);
  const [showCountrySheet, setShowCountrySheet] = useState(false);

  const { vtcBusiness, vtcIndependent } = useSelector((store) => store?.users);

  const [independentFormData, setIndependentFormData] = useState({
    email: vtcIndependent?.email || "",
    lat: vtcIndependent?.address?.lat || "",
    lng: vtcIndependent?.address?.long || "",
    city: vtcIndependent?.address?.city || "",
    state: vtcIndependent?.address?.region || "",
    street: vtcIndependent?.address?.street || "",
    companyName: vtcIndependent?.companyName || "",
    zipCode: vtcIndependent?.address?.postalCode || "",
    address: vtcIndependent?.address?.addressName || "",
    floor: vtcIndependent?.address?.apartmentNumber || "",
    country: getCountry(vtcIndependent?.address?.country) || null,
    vtcLicense: vtcIndependent?.vehicleDocuments?.[1]
      ? { file: vtcIndependent?.vehicleDocuments?.[1] }
      : "",
    phoneNumber: "",
    criminalRecord: vtcIndependent?.vehicleDocuments?.[0]
      ? { file: vtcIndependent?.vehicleDocuments?.[0] }
      : "",
    drivingLicense: vtcIndependent?.vehicleDocuments?.[0]
      ? { file: vtcIndependent?.vehicleDocuments?.[0] }
      : "",
    buildingNumber: vtcIndependent?.address?.buildingNumber || "",
  });

  const [businessFormData, setBusinessFormData] = useState({
    lat: "",
    lng: "",
    kbis: "",
    city: "",
    floor: "",
    state: "",
    email: "",
    tinVat: "",
    street: "",
    website: "",
    address: "",
    zipCode: "",
    country: null,
    vtcLicense: "",
    phoneNumber: "",
    registeredAs: "",
    businessName: "",
    businessSize: "",
    streetNumber: "",
    driverLicense: "",
    proofOfAddress: "",
    buildingNumber: "",
    incorporatedIn: null,
    proofOfInsurance: "",
    cleanCriminalRecord: "",
    businessRegistration: "",
    dateOfIncorporation: new Date("1996-07-12"),
  });

  const [errors, setErrors] = useState({});
  const [businessErrors, setBusinessErrors] = useState({});

  // Build full error map for Independent form
  const buildIndependentErrors = (values) => {
    const newErrors = {};

    if (!values.phoneNumber || values.phoneNumber.trim().length < 10)
      newErrors.phoneNumberError = "Please enter a valid phone number";
    if (
      !values.email ||
      values.email.trim().length < 5 ||
      !values.email.includes("@")
    )
      newErrors.emailError = "Please enter a valid email address";
    if (!values.country?.code)
      newErrors.countryError = "Please select a country";
    if (!values.state || values.state.trim().length < 2)
      newErrors.stateError = "State must be at least 2 characters";
    if (!values.city || values.city.trim().length < 2)
      newErrors.cityError = "City must be at least 2 characters";
    if (!values.zipCode || values.zipCode.trim().length < 3)
      newErrors.zipCodeError = "Please enter a valid zip code";
    if (!values.street || values.street.trim().length < 3)
      newErrors.streetError = "Please enter a valid street address";
    if (!values.buildingNumber || values.buildingNumber.trim().length < 1)
      newErrors.buildingNumberError = "Please enter building number";
    if (!values.floor || values.floor.trim().length < 1)
      newErrors.floorError = "Please enter floor number";

    return newErrors;
  };

  const buildBusinessErrors = (values) => {
    const newErrors = {};

    if (!values.incorporatedIn?.code)
      newErrors.incorporatedInError = "Please select incorporation country";
    if (!values.registeredAs)
      newErrors.registeredAsError = "Please select registration type";
    if (!values.businessName || values.businessName.trim().length < 2)
      newErrors.businessNameError =
        "Business name must be at least 2 characters";
    if (!values.dateOfIncorporation)
      newErrors.dateOfIncorporationError = "Please select incorporation date";
    const kbisRegex = /^([0-9A-Z]{9,}|RCS\s+[A-Za-zÀ-ÿ]+\s+\d{9,})$/;
    if (!values.kbis || !kbisRegex.test(values.kbis.trim())) {
      newErrors.kbisError =
        "Invalid KBIS/RCS format (expected: 123A456B789 or RCS Paris 123456789)";
    }

    if (!values.tinVat || values.tinVat.trim().length < 5)
      newErrors.tinVatError =
        "TIN/VAT number must be at least 5 characters long";
    if (!values.businessSize)
      newErrors.businessSizeError = "Please select business size";

    const websiteRegex = /^https?:\/\/[^\s$.?#].[^\s]*$/i;
    if (!values.website || !websiteRegex.test(values.website.trim())) {
      newErrors.websiteError = "Invalid website URL (must include http/https)";
    }
    if (!values.phoneNumber || values.phoneNumber.trim().length < 10)
      newErrors.phoneNumberError = "Please enter a valid phone number";
    if (
      !values.email ||
      values.email.trim().length < 5 ||
      !values.email.includes("@")
    )
      newErrors.emailError = "Please enter a valid email address";
    if (!values.country?.code)
      newErrors.countryError = "Please select a country";
    if (!values.state || values.state.trim().length < 2)
      newErrors.stateError = "State must be at least 2 characters";
    if (!values.city || values.city.trim().length < 2)
      newErrors.cityError = "City must be at least 2 characters";
    if (!values.zipCode || values.zipCode.trim().length < 3)
      newErrors.zipCodeError = "Please enter a valid zip code";
    if (!values.street || values.street.trim().length < 3)
      newErrors.streetError = "Please enter a valid street address";
    if (!values.streetNumber || values.streetNumber.trim().length < 1)
      newErrors.streetNumberError = "Please enter street number";
    if (!values.buildingNumber || values.buildingNumber.trim().length < 1)
      newErrors.buildingNumberError = "Please enter building number";
    if (!values.floor || values.floor.trim().length < 1)
      newErrors.floorError = "Please enter floor number";

    return newErrors;
  };

  // Real-time error clearing at field level for Independent form
  const validateIndependentField = (field, value, current) => {
    if (field === "companyName" && (!value || value.trim().length < 2))
      return "Company name must be at least 2 characters";
    if (field === "phoneNumber" && (!value || value.trim().length < 10))
      return "Please enter a valid phone number";
    if (
      field === "email" &&
      (!value || value.trim().length < 5 || !value.includes("@"))
    )
      return "Please enter a valid email address";
    if (field === "country" && (!value || !value.code))
      return "Please select a country";
    if (field === "state" && (!value || value.trim().length < 2))
      return "State must be at least 2 characters";
    if (field === "city" && (!value || value.trim().length < 2))
      return "City must be at least 2 characters";
    if (field === "zipCode" && (!value || value.trim().length < 3))
      return "Please enter a valid zip code";
    if (field === "street" && (!value || value.trim().length < 3))
      return "Please enter a valid street address";
    if (field === "buildingNumber" && (!value || value.trim().length < 1))
      return "Please enter building number";
    if (field === "floor" && (!value || value.trim().length < 1))
      return "Please enter floor number";

    return "";
  };

  // Real-time error clearing at field level for Business form
  const validateBusinessField = (field, value, current) => {
    if (field === "incorporatedIn" && (!value || !value.code))
      return "Please select incorporation country";
    if (field === "registeredAs" && !value)
      return "Please select registration type";
    if (field === "businessName" && (!value || value.trim().length < 2))
      return "Business name must be at least 2 characters";
    if (field === "dateOfIncorporation" && !value)
      return "Please select incorporation date";
    if (field === "kbis" && (!value || value.trim().length < 3))
      return "Please enter valid KBIS number";
    if (field === "tinVat" && (!value || value.trim().length < 3))
      return "Please enter valid TIN/VAT number";
    if (field === "businessSize" && !value)
      return "Please select business size";
    if (field === "website" && (!value || value.trim().length < 5))
      return "Please enter a valid website";
    if (field === "phoneNumber" && (!value || value.trim().length < 10))
      return "Please enter a valid phone number";
    if (
      field === "email" &&
      (!value || value.trim().length < 5 || !value.includes("@"))
    )
      return "Please enter a valid email address";
    if (field === "country" && (!value || !value.code))
      return "Please select a country";
    if (field === "state" && (!value || value.trim().length < 2))
      return "State must be at least 2 characters";
    if (field === "city" && (!value || value.trim().length < 2))
      return "City must be at least 2 characters";
    if (field === "zipCode" && (!value || value.trim().length < 3))
      return "Please enter a valid zip code";
    if (field === "street" && (!value || value.trim().length < 3))
      return "Please enter a valid street address";
    if (field === "streetNumber" && (!value || value.trim().length < 1))
      return "Please enter street number";
    if (field === "buildingNumber" && (!value || value.trim().length < 1))
      return "Please enter building number";
    if (field === "floor" && (!value || value.trim().length < 1))
      return "Please enter floor number";

    return "";
  };

  const handleIndependentInputChange = (field, value) => {
    setIndependentFormData({
      ...independentFormData,
      [field]: value,
    });

    // Real-time field-level validation and clearing
    const fieldErrorKey = `${field}Error`;
    const message = validateIndependentField(field, value, independentFormData);
    setErrors((prev) => ({ ...prev, [fieldErrorKey]: message }));
  };

  const handleBusinessInputChange = (field, value) => {
    setBusinessFormData({
      ...businessFormData,
      [field]: value,
    });

    // Real-time field-level validation and clearing
    const fieldErrorKey = `${field}Error`;
    const message = validateBusinessField(field, value, businessFormData);
    setBusinessErrors((prev) => ({ ...prev, [fieldErrorKey]: message }));
  };

  const handleIndependentFileUpload = async (res, field) => {
    setFileLoading(field);
    try {
      const url = await uploadFileGetUrl(res);
      setIndependentFormData({ ...independentFormData, [field]: url });
    } catch (error) {
      console.error("File upload error:", error);
      Alert.alert("Error", "Failed to upload file");
    }
    setFileLoading(null);
  };

  const handleBusinessFileUpload = async (res, field) => {
    setFileLoading(field);
    try {
      const url = await uploadFileGetUrl(res);
      setBusinessFormData({ ...businessFormData, [field]: url });
    } catch (error) {
      console.error("File upload error:", error);
      Alert.alert("Error", "Failed to upload file");
    }
    setFileLoading(null);
  };

  const handleIndependentContinue = async () => {
    try {
      const newErrors = buildIndependentErrors(independentFormData);

      setErrors(newErrors);

      const hasAnyError = Object.values(newErrors).some(
        (m) => m && m.length > 0
      );
      if (hasAnyError) {
        return;
      } else if (!independentFormData?.address) {
        return ToastMessage("Please select address", "error");
      } else if (!independentFormData?.criminalRecord) {
        return ToastMessage("Please upload criminal record", "error");
      } else if (!independentFormData?.drivingLicense) {
        return ToastMessage("Please upload driving license", "error");
      } else if (!independentFormData?.vtcLicense) {
        return ToastMessage("Please upload VTC license", "error");
      }

      setLoading(true);

      const body = {
        email: independentFormData?.email,
        phone: independentFormData?.phoneNumber,
        nationality: "Switzerland",
        vehicleDocuments: [
          independentFormData?.drivingLicense?.file,
          independentFormData?.vtcLicense?.file,
        ],
        legalDocuments: [independentFormData?.criminalRecord?.file],
        address: {
          addressName: independentFormData?.address,
          lat: independentFormData?.lat,
          long: independentFormData?.lng,
          country:
            independentFormData?.country?.label || independentFormData?.country,
          city: independentFormData?.city,
          region: independentFormData?.state,
          street: independentFormData?.street,
          postalCode: independentFormData?.zipCode,
          buildingNumber: independentFormData?.buildingNumber,
          apartmentNumber: independentFormData?.floor,
          formattedAddress: independentFormData?.address,
        },
      };

      let res;

      if (vtcIndependent?._id) {
        delete body.address;
        res = await put(`vtc/driver/${vtcIndependent?._id}`, body);
      } else {
        res = await post("vtc/register", body);
      }

      if (res.data?.success) {
        ToastMessage(res?.data?.message, "success");
        if (res?.data?.data?.isVerified) {
          navigation.goBack();
        } else {
          navigation.navigate("VerifyIdentity", {
            type: tab?.toLowerCase(),
            id: res.data?.data?._id,
          });
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error, "in vtc");
      setLoading(false);
    }
  };

  const handleBusinessContinue = async () => {
    try {
      const newErrors = buildBusinessErrors(businessFormData);
      setBusinessErrors(newErrors);
      const hasAnyError = Object.values(newErrors).some(
        (m) => m && m.length > 0
      );

      if (hasAnyError) {
        return;
      } else if (!businessFormData?.address) {
        return ToastMessage("Please select address", "error");
      } else if (!businessFormData?.businessRegistration) {
        return ToastMessage("Please upload registration certificate", "error");
      } else if (!businessFormData?.proofOfAddress) {
        return ToastMessage("Please upload proof of address", "error");
      } else if (!businessFormData?.proofOfInsurance) {
        return ToastMessage("Please upload proof of insurance", "error");
      } else if (!businessFormData?.driverLicense) {
        return ToastMessage("Please upload driving license", "error");
      } else if (!businessFormData?.vtcLicense) {
        return ToastMessage("Please upload VTC license", "error");
      } else if (!businessFormData?.cleanCriminalRecord) {
        return ToastMessage("Please upload clean crimanal record", "error");
      }

      setBusinessLoading(true);

      const body = {
        email: businessFormData?.email,
        phone: businessFormData?.phoneNumber,
        nationality: "Switzerland",
        legalDocuments: [
          businessFormData?.vtcLicense?.file,
          businessFormData?.driverLicense?.file,
          businessFormData?.proofOfAddress?.file,
          businessFormData?.proofOfInsurance?.file,
          businessFormData?.cleanCriminalRecord?.file,
          businessFormData?.businessRegistration?.file,
        ],
        companyAddress: {
          addressName: "Home",
          lat: businessFormData?.lat,
          long: businessFormData?.lng,
          country:
            businessFormData?.country?.label || businessFormData?.country,
          region: "New York",
          city: businessFormData?.city,
          street: businessFormData?.street,
          postalCode: businessFormData?.zipCode,
          buildingNumber: businessFormData?.buildingNumber,
          apartmentNumber: businessFormData?.floor,
          companyAddress: businessFormData?.address,
        },
        IncorporationIN: businessFormData?.incorporatedIn?.label,
        registeredAs: businessFormData?.registeredAs,
        businessName: businessFormData?.businessName,
        website: businessFormData?.website,
        dateOfIncorporation: businessFormData?.dateOfIncorporation,
        KBIS: businessFormData?.kbis,
        taxId: businessFormData?.tinVat,
        businessSize: businessFormData?.businessSize,
      };

      const res = await post("vtc/register-business", body);
      if (res.data?.success) {
        ToastMessage(res?.data?.message, "success");
        navigation.navigate("VerifyIdentity", {
          type: tab?.toLowerCase(),
          id: res.data?.data?._id,
        });
      }
      setBusinessLoading(false);
    } catch (error) {
      console.log(error?.response?.data, "in business vtc");
      setBusinessLoading(false);
    }
  };

  const handleCancel = () => navigation.goBack();

  const renderIndependentFileUpload = (field, label, description) => {
    const fileUrl = independentFormData[field];

    return (
      <UploadImage
        handleChange={async (res) => handleIndependentFileUpload(res, field)}
        renderButton={(onPress) =>
          fileUrl ? (
            <View style={styles.uploadedFileContainer}>
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <CustomText
                  label={label}
                  marginRight={8}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.medium}
                  textDecorationLine={"underline"}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() =>
                    setIndependentFormData({
                      ...independentFormData,
                      [field]: "",
                    })
                  }
                >
                  <Image
                    source={Images.binRed}
                    style={{ height: 18, width: 18 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={onPress}
              style={styles.attachmentButton}
              disabled={fileLoading === field}
            >
              {fileLoading === field ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <>
                  <View style={styles.plusContainer}>
                    <Image
                      source={PNGIcons.plus || Images.plus}
                      style={styles.plusIcon}
                    />
                  </View>
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <CustomText
                      label={description}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                    />
                    <CustomText
                      label={label}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.medium}
                      marginTop={-4}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>
          )
        }
      />
    );
  };

  const renderBusinessFileUpload = (field, label, description) => {
    const fileUrl = businessFormData[field];

    return (
      <UploadImage
        handleChange={async (res) => handleBusinessFileUpload(res, field)}
        renderButton={(onPress) =>
          fileUrl ? (
            <View style={styles.uploadedFileContainer}>
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <CustomText
                  label={label}
                  lineHeight={14 * 1.4}
                  marginRight={8}
                  fontFamily={fonts.medium}
                  textDecorationLine={"underline"}
                />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() =>
                    setBusinessFormData({ ...businessFormData, [field]: "" })
                  }
                >
                  <Image
                    source={Images.binRed}
                    style={{ height: 18, width: 18 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              onPress={onPress}
              style={styles.attachmentButton}
              disabled={fileLoading === field}
            >
              {fileLoading === field ? (
                <ActivityIndicator size="large" color={COLORS.primary} />
              ) : (
                <>
                  <View style={styles.plusContainer}>
                    <Image
                      source={PNGIcons.plus || Images.plus}
                      style={styles.plusIcon}
                    />
                  </View>
                  <View style={{ alignItems: "center", flex: 1 }}>
                    <CustomText
                      label={description}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                    />
                    <CustomText
                      label={label}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.medium}
                      marginTop={-4}
                    />
                  </View>
                </>
              )}
            </TouchableOpacity>
          )
        }
      />
    );
  };

  // Dropdown options for Business form
  const registeredAsOptions = [
    "Limited Liable Company",
    "Corporation",
    "Partnership",
    "Sole Proprietorship",
    "LLC",
    "S-Corp",
    "C-Corp",
  ];

  const businessSizeOptions = [
    "1-5 employees",
    "6-10 employees",
    "11-25 employees",
    "26-50 employees",
    "51-100 employees",
    "100+ employees",
  ];

  // Independent form field arrays
  const independentInputFields = [
    {
      field: "email",
      label: "EMAIL",
      value: independentFormData.email,
      error: errors?.emailError,
      placeholder: "Enter email address",
      keyboardType: "email-address",
    },
    {
      field: "state",
      label: "STATE",
      value: independentFormData.state,
      error: errors?.stateError,
      placeholder: "Enter state",
    },
    {
      field: "city",
      label: "CITY",
      value: independentFormData.city,
      error: errors?.cityError,
      placeholder: "Enter city",
    },
    {
      field: "zipCode",
      label: "ZIP CODE",
      value: independentFormData.zipCode,
      error: errors?.zipCodeError,
      placeholder: "Enter zip code",
      keyboardType: "number-pad",
    },
    {
      field: "street",
      label: "STREET",
      value: independentFormData.street,
      error: errors?.streetError,
      placeholder: "Enter street address",
    },
    {
      field: "buildingNumber",
      label: "BUILDING NUMBER",
      value: independentFormData.buildingNumber,
      error: errors?.buildingNumberError,
      placeholder: "Enter building number",
      keyboardType: "numeric",
    },
    {
      field: "floor",
      label: "FLOOR",
      value: independentFormData.floor,
      error: errors?.floorError,
      placeholder: "Enter floor",
      keyboardType: "numeric",
    },
  ];

  // Business form field arrays
  const businessInputFields = [
    {
      field: "businessName",
      label: "BUSINESS NAME",
      value: businessFormData.businessName,
      error: businessErrors?.businessNameError,
      placeholder: "Enter business name",
    },
    {
      field: "kbis",
      label: "KBIS",
      value: businessFormData.kbis,
      error: businessErrors?.kbisError,
      placeholder: "Enter KBIS number",
    },
    {
      field: "tinVat",
      label: "TIN/VAT",
      value: businessFormData.tinVat,
      error: businessErrors?.tinVatError,
      placeholder: "Enter TIN/VAT number",
    },
    {
      field: "website",
      label: "WEBSITE",
      value: businessFormData.website,
      error: businessErrors?.websiteError,
      placeholder: "Enter website URL",
      keyboardType: "url",
    },
    {
      field: "email",
      label: "EMAIL",
      value: businessFormData.email,
      error: businessErrors?.emailError,
      placeholder: "Enter email address",
      keyboardType: "email-address",
    },
    {
      field: "state",
      label: "STATE",
      value: businessFormData.state,
      error: businessErrors?.stateError,
      placeholder: "Enter state",
    },
    {
      field: "city",
      label: "CITY",
      value: businessFormData.city,
      error: businessErrors?.cityError,
      placeholder: "Enter city",
    },
    {
      field: "zipCode",
      label: "ZIP CODE",
      value: businessFormData.zipCode,
      error: businessErrors?.zipCodeError,
      placeholder: "Enter zip code",
      keyboardType: "number-pad",
    },
    {
      field: "street",
      label: "STREET",
      value: businessFormData.street,
      error: businessErrors?.streetError,
      placeholder: "Enter street address",
    },
    {
      field: "streetNumber",
      label: "STREET NUMBER",
      value: businessFormData.streetNumber,
      error: businessErrors?.streetNumberError,
      placeholder: "Enter street number",
    },
    {
      field: "buildingNumber",
      label: "BUILDING NUMBER",
      value: businessFormData.buildingNumber,
      error: businessErrors?.buildingNumberError,
      placeholder: "Enter building number",
    },
    {
      field: "floor",
      label: "FLOOR",
      value: businessFormData.floor,
      error: businessErrors?.floorError,
      placeholder: "Enter floor",
    },
  ];

  const businessDropdownFields = [
    {
      field: "registeredAs",
      label: "REGISTERED AS",
      value: businessFormData.registeredAs,
      options: registeredAsOptions,
      placeholder: "Select registration type",
      error: businessErrors?.registeredAsError,
    },
    {
      field: "businessSize",
      label: "BUSINESS SIZE",
      value: businessFormData.businessSize,
      options: businessSizeOptions,
      placeholder: "Select business size",
      error: businessErrors?.businessSizeError,
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Registration"} />}
    >
      <TopTabWithBG
        tabNames={["Independent", "Business"]}
        tab={tab}
        setTab={setTab}
        marginBottom={0.1}
      />

      {tab === "Independent" ? (
        <View style={styles.container}>
          <CustomText
            label="VTC Driver Form"
            fontSize={24}
            lineHeight={24 * 1.4}
            fontFamily={fonts.semiBold}
            marginTop={32}
          />
          <CustomText
            label="Please enter your establishment address as mentioned on your official documents."
            color={COLORS.gray1}
            fontSize={14}
            lineHeight={14 * 1.4}
            marginBottom={24}
          />

          {/* Personal Details Section */}
          <CustomText
            label="Personal Details"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={8}
          />

          <CustomPhoneInput
            withLabel="Phone Number"
            value={independentFormData.phoneNumber}
            setValue={(value) =>
              handleIndependentInputChange("phoneNumber", value)
            }
            placeholder="XXX XXX XX"
            marginBottom={8}
            error={errors?.phoneNumberError}
          />

          <CustomInput
            withLabel="EMAIL"
            value={independentFormData.email}
            onChangeText={(text) => handleIndependentInputChange("email", text)}
            placeholder="Enter email address"
            error={errors?.emailError}
            keyboardType="email-address"
            marginBottom={0.1}
          />
          <Divider marginVertical={24} />
          {/* Address Section */}
          <CustomText
            label="Address"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={8}
          />
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setLocationModal(true)}
          >
            <CustomInput
              editable={false}
              withLabel={"Address"}
              placeholder={"Select Address"}
              value={independentFormData?.address}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.countrySelector,
              errors.countryError && {
                borderColor: COLORS.red,
                borderWidth: 1,
              },
            ]}
            onPress={() => setShowCountrySheet(true)}
          >
            <View>
              <CustomText
                label="COUNTRY OF RESIDENCE"
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.inputLabel}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {independentFormData?.country && (
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${independentFormData?.country?.code?.toLowerCase()}.png`,
                    }}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 10,
                      borderRadius: 4,
                    }}
                    resizeMode="contain"
                  />
                )}
                <CustomText
                  label={
                    independentFormData.country
                      ? independentFormData.country.label
                      : "Select country"
                  }
                  color={
                    independentFormData.country
                      ? COLORS.black
                      : COLORS.inputLabel
                  }
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <Icons
              style={{ color: COLORS.black, fontSize: 20 }}
              family="Entypo"
              name="chevron-down"
            />
          </TouchableOpacity>
          {errors.countryError && (
            <CustomText
              label={errors.countryError}
              color={COLORS.red}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginTop={4}
              marginBottom={8}
            />
          )}

          {independentInputFields.slice(2).map((input, index) => (
            <CustomInput
              key={`independent-input-${index}`}
              withLabel={input.label}
              value={input.value}
              onChangeText={(text) =>
                handleIndependentInputChange(input.field, text)
              }
              placeholder={input.placeholder}
              marginBottom={8}
              error={input.error}
              keyboardType={input.keyboardType}
            />
          ))}

          <Divider marginVertical={24} />

          {/* Legal Documents Section */}
          <CustomText
            label="Legal Documents"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={16}
          />

          {renderIndependentFileUpload(
            "criminalRecord",
            "Attach Criminal Record",
            "PDF only. 20MB."
          )}

          <Divider marginVertical={24} />

          {/* Vehicles Section */}
          <CustomText
            label="Vehicles"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={16}
          />

          {renderIndependentFileUpload(
            "drivingLicense",
            "Upload Your Driving License",
            "PDF only. 20MB."
          )}

          {renderIndependentFileUpload(
            "vtcLicense",
            "Upload Your VTC License",
            "PDF only. 20MB."
          )}

          {/* Action Buttons */}
          <CustomButton
            title="Continue"
            marginTop={32}
            loading={loading}
            marginBottom={12}
            onPress={handleIndependentContinue}
          />

          <CustomButton
            title="Cancel"
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            marginBottom={24}
            onPress={() => navigation.navigate("VerifyIdentity")}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <CustomText
            label="VTC Business Form"
            fontSize={24}
            lineHeight={24 * 1.4}
            fontFamily={fonts.medium}
            marginTop={32}
          />
          <CustomText
            label="Please enter your establishment address as mentioned on your official documents."
            color={COLORS.gray1}
            fontSize={14}
            lineHeight={14 * 1.4}
            marginBottom={24}
          />

          {/* General Details Section */}
          <CustomText
            label="General Details"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={8}
          />

          <TouchableOpacity
            style={[
              styles.countrySelector,
              businessErrors?.incorporatedInError && {
                borderColor: COLORS.red,
                borderWidth: 1,
              },
            ]}
            onPress={() => setCountrySheet(true)}
          >
            <View>
              <CustomText
                label="INCORPORATED IN"
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.inputLabel}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {businessFormData.incorporatedIn && (
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${businessFormData.incorporatedIn.code.toLowerCase()}.png`,
                    }}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 10,
                      borderRadius: 4,
                    }}
                    resizeMode="contain"
                  />
                )}
                <CustomText
                  label={
                    businessFormData.incorporatedIn
                      ? businessFormData.incorporatedIn.label
                      : "Select country"
                  }
                  color={
                    businessFormData.incorporatedIn
                      ? COLORS.black
                      : COLORS.inputLabel
                  }
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <Icons
              style={{ color: COLORS.black, fontSize: 20 }}
              family="Entypo"
              name="chevron-down"
            />
          </TouchableOpacity>
          {businessErrors?.incorporatedInError && (
            <CustomText
              label={businessErrors?.incorporatedInError}
              color={COLORS.red}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginTop={4}
              marginBottom={8}
            />
          )}

          {businessDropdownFields.map((dropdown, index) => (
            <CustomDropdown
              key={`business-dropdown-${index}`}
              withLabel={dropdown.label}
              value={dropdown.value}
              setValue={(value) =>
                handleBusinessInputChange(dropdown.field, value)
              }
              data={dropdown.options}
              placeholder={dropdown.placeholder}
              marginBottom={8}
              error={dropdown.error}
            />
          ))}

          <CustomDatePicker
            withLabel="DATE OF INCORPORATION"
            value={businessFormData.dateOfIncorporation}
            setValue={(value) =>
              handleBusinessInputChange("dateOfIncorporation", value)
            }
            maxDate={new Date()}
            marginBottom={8}
            error={businessErrors?.dateOfIncorporationError}
          />

          {businessInputFields.slice(0, 3).map((input, index) => (
            <CustomInput
              key={`business-input-${index}`}
              withLabel={input.label}
              value={input.value}
              keyboardType={input?.keyboardType}
              onChangeText={(text) =>
                handleBusinessInputChange(input.field, text)
              }
              placeholder={input.placeholder}
              marginBottom={8}
              error={input.error}
            />
          ))}

          {/* Contacts Section */}
          <CustomText
            label="Contacts"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={8}
            marginTop={24}
          />

          <CustomInput
            withLabel="WEBSITE"
            value={businessFormData.website}
            onChangeText={(text) => handleBusinessInputChange("website", text)}
            placeholder="Enter website URL"
            marginBottom={8}
            error={businessErrors?.websiteError}
          />

          <CustomPhoneInput
            withLabel="PHONE NUMBER"
            value={businessFormData.phoneNumber}
            setValue={(value) =>
              handleBusinessInputChange("phoneNumber", value)
            }
            placeholder="XXX XXX XX"
            marginBottom={8}
            error={businessErrors?.phoneNumberError}
          />

          <CustomInput
            withLabel="EMAIL"
            value={businessFormData.email}
            onChangeText={(text) => handleBusinessInputChange("email", text)}
            placeholder="Enter email address"
            marginBottom={0.1}
            error={businessErrors?.emailError}
            keyboardType="email-address"
          />

          <Divider marginVertical={24} />
          {/* Company's Address Section */}
          <CustomText
            label="Company's Address"
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            marginBottom={8}
          />

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => setLocationModal(true)}
          >
            <CustomInput
              editable={false}
              withLabel={"Address"}
              placeholder={"Select Address"}
              value={businessFormData?.address}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.countrySelector,
              businessErrors?.countryError && {
                borderColor: COLORS.red,
                borderWidth: 1,
              },
            ]}
            onPress={() => setShowCountrySheet(true)}
          >
            <View>
              <CustomText
                label="COUNTRY"
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.inputLabel}
              />
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {businessFormData.country && (
                  <Image
                    source={{
                      uri: `https://flagcdn.com/w40/${businessFormData.country.code.toLowerCase()}.png`,
                    }}
                    style={{
                      height: 20,
                      width: 20,
                      marginRight: 10,
                      borderRadius: 4,
                    }}
                    resizeMode="contain"
                  />
                )}
                <CustomText
                  label={
                    businessFormData.country
                      ? businessFormData.country.label
                      : "Select country"
                  }
                  color={
                    businessFormData.country ? COLORS.black : COLORS.inputLabel
                  }
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>
            </View>
            <Icons
              style={{ color: COLORS.black, fontSize: 20 }}
              family="Entypo"
              name="chevron-down"
            />
          </TouchableOpacity>
          {businessErrors?.countryError && (
            <CustomText
              label={businessErrors.countryError}
              color={COLORS.red}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginTop={4}
              marginBottom={8}
            />
          )}

          {businessInputFields.slice(5).map((input, index) => (
            <CustomInput
              key={`business-address-input-${index}`}
              withLabel={input.label}
              value={input.value}
              onChangeText={(text) =>
                handleBusinessInputChange(input.field, text)
              }
              placeholder={input.placeholder}
              marginBottom={8}
              error={input.error}
              keyboardType={input.keyboardType}
            />
          ))}

          <Divider marginVertical={24} />

          {/* Legal Documents Section */}
          <CustomText
            label="Legal Documents"
            fontSize={18}
            lineHeight={18 * 1.4}
            marginBottom={16}
            fontFamily={fonts.medium}
          />

          {renderBusinessFileUpload(
            "businessRegistration",
            "Business Registration Certificate",
            "PDF only. 20MB."
          )}
          {renderBusinessFileUpload(
            "proofOfAddress",
            "Proof Of Address",
            "PDF only. 20MB."
          )}
          {renderBusinessFileUpload(
            "proofOfInsurance",
            "Proof Of Insurance",
            "PDF only. 20MB."
          )}
          {renderBusinessFileUpload(
            "driverLicense",
            "Driver License",
            "PDF only. 20MB."
          )}
          {renderBusinessFileUpload(
            "vtcLicense",
            "VTC License",
            "PDF only. 50MB."
          )}
          {renderBusinessFileUpload(
            "cleanCriminalRecord",
            "Clean Criminal Record",
            "PDF only. 50MB."
          )}

          {/* Action Buttons */}
          <CustomButton
            title="Continue"
            marginTop={32}
            marginBottom={12}
            loading={businessLoading}
            onPress={handleBusinessContinue}
          />

          <CustomButton
            title="Cancel"
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            marginBottom={24}
            onPress={handleCancel}
          />
        </View>
      )}

      <CountryBottomSheet
        visible={showCountrySheet}
        onClose={() => setShowCountrySheet(false)}
        selectedCountry={
          tab === "Independent"
            ? independentFormData.country
            : businessFormData.country
        }
        onSelectCountry={(country) => {
          if (tab === "Independent") {
            setIndependentFormData({ ...independentFormData, country });
            const msg = validateIndependentField(
              "country",
              country,
              independentFormData
            );
            setErrors((prev) => ({ ...prev, countryError: msg }));
          } else {
            setBusinessFormData({ ...businessFormData, country });
            const msg = validateBusinessField(
              "country",
              country,
              businessFormData
            );
            setBusinessErrors((prev) => ({ ...prev, countryError: msg }));
          }
        }}
      />

      <CountryBottomSheet
        visible={countrySheet}
        onClose={() => setCountrySheet(false)}
        selectedCountry={businessFormData.incorporatedIn}
        onSelectCountry={(country) => {
          setBusinessFormData({ ...businessFormData, incorporatedIn: country });
          const msg = validateBusinessField(
            "incorporatedIn",
            country,
            businessFormData
          );
          setBusinessErrors((prev) => ({ ...prev, incorporatedIn: msg }));
        }}
      />

      <CustomModalGooglePlaces
        isVisible={locationModal}
        onClose={() => setLocationModal(false)}
        onLocationSelect={(e) => {
          const country = COUNTRIES?.find((c) => c?.label === e?.country);

          if (tab === "Independent") {
            const updated = {
              ...independentFormData,
              city: e?.city,
              state: e?.state,
              country,
              lat: e?.latitude,
              lng: e?.longitude,
              address: e?.address,
            };
            setIndependentFormData(updated);
            setErrors(buildIndependentErrors(updated));
          } else {
            const updated = {
              ...businessFormData,
              city: e?.city,
              state: e?.state,
              country,
              lat: e?.latitude,
              lng: e?.longitude,
              address: e?.address,
            };
            setBusinessFormData(updated);
            setBusinessErrors(buildBusinessErrors(updated));
          }
        }}
      />
    </ScreenWrapper>
  );
};

export default VTCChauffeur;

const styles = StyleSheet.create({
  container: {},
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
  },
  phoneSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    // justifyContent:"space-between",
  },
  plusContainer: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 99,
  },
  plusIcon: {
    width: 16,
    height: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadedFileContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    marginTop: 6,
  },
  removeButton: {
    padding: 4,
  },
});
