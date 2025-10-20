import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImage from "../../../components/UploadImage";
import { post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { COUNTRIES, uploadFileGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useSelector } from "react-redux";
import ErrorComponent from "../../../components/ErrorComponent";
import SearchInput from "../../../components/SearchInput";

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
  const [showCountrySheet, setShowCountrySheet] = useState(false);

  const { vtcBusiness, vtcIndependent } = useSelector((store) => store?.users);

  // ✅ Independent form data
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

  // ✅ Separate states for city, region, postal code
  const [city, setCity] = useState(vtcIndependent?.address?.city || "");
  const [region, setRegion] = useState(vtcIndependent?.address?.region || "");
  const [postalCode, setPostalCode] = useState(
    vtcIndependent?.address?.postalCode || ""
  );

  const [errors, setErrors] = useState({});
  const [businessErrors, setBusinessErrors] = useState({});

  // 🔸 Validation helpers
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

  const handleIndependentInputChange = (field, value) => {
    setIndependentFormData({ ...independentFormData, [field]: value });
    const fieldErrorKey = `${field}Error`;
    const msg = validateIndependentField(field, value, independentFormData);
    setErrors((prev) => ({ ...prev, [fieldErrorKey]: msg }));
  };

  const handleIndependentFileUpload = async (res, field) => {
    setFileLoading(field);
    try {
      const url = await uploadFileGetUrl(res);
      setIndependentFormData({ ...independentFormData, [field]: url });
    } catch (error) {
      Alert.alert("Error", "Failed to upload file");
    }
    setFileLoading(null);
  };

  const handleIndependentContinue = async () => {
    navigation.navigate("VerifyIdentity", {
      type: tab?.toLowerCase(),
      id: "1233",
    });
  };

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
                <ActivityIndicator size={30} color={COLORS.white} />
              ) : (
                <>
                  <Icons
                    family={"Entypo"}
                    name={"plus"}
                    color={COLORS.white}
                    size={25}
                  />
                  <View style={{ alignItems: "center", marginLeft: 5 }}>
                    <CustomText
                      label={description}
                      fontSize={12}
                      lineHeight={12 * 1.4}
                      color={COLORS.gray3}
                    />
                    <CustomText
                      label={label}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      fontFamily={fonts.medium}
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

  // ✅ Updated input fields list with local states
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
      field: "region",
      label: "REGION",
      value: region,
      error: errors?.stateError,
      placeholder: "Enter region",
      onChange: (text) => {
        setRegion(text);
        setIndependentFormData({ ...independentFormData, state: text });
        const msg = validateIndependentField(
          "state",
          text,
          independentFormData
        );
        setErrors((prev) => ({ ...prev, stateError: msg }));
      },
    },
    {
      field: "city",
      label: "CITY",
      value: city,
      error: errors?.cityError,
      placeholder: "Enter city",
      onChange: (text) => {
        setCity(text);
        setIndependentFormData({ ...independentFormData, city: text });
        const msg = validateIndependentField("city", text, independentFormData);
        setErrors((prev) => ({ ...prev, cityError: msg }));
      },
    },
    {
      field: "postalCode",
      label: "POSTAL CODE",
      value: postalCode,
      error: errors?.zipCodeError,
      placeholder: "Enter postal code",
      keyboardType: "number-pad",
      onChange: (text) => {
        setPostalCode(text);
        setIndependentFormData({ ...independentFormData, zipCode: text });
        const msg = validateIndependentField(
          "zipCode",
          text,
          independentFormData
        );
        setErrors((prev) => ({ ...prev, zipCodeError: msg }));
      },
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
      label: "FLOOR (Optional)",
      value: independentFormData.floor,
      error: errors?.floorError,
      placeholder: "Enter floor",
      keyboardType: "numeric",
    },
  ];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Registration"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <CustomButton
            title="Continue"
            loading={loading}
            marginBottom={8}
            onPress={handleIndependentContinue}
          />

          <CustomButton
            title="Cancel"
            backgroundColor={COLORS.inputBg}
            color={COLORS.white}
            marginBottom={24}
            onPress={() => navigation.navigate("VerifyIdentity")}
          />
        </View>
      )}
    >
      <View style={styles.container}>
        <CustomText
          label="Shipping Address"
          fontSize={24}
          lineHeight={24 * 1.4}
          fontFamily={fonts.semiBold}
          marginTop={15}
        />
        <CustomText
          label="Please enter your home address as stated on your documents."
          color={COLORS.gray1}
          fontSize={14}
          lineHeight={14 * 1.4}
          marginBottom={16}
        />
        <SearchInput
          placeholder={"Search for an Address..."}
          borderRadius={999}
          marginBottom={20}
          isCross
        />

        {/* COUNTRY SELECTOR */}
        <TouchableOpacity
          style={[
            styles.countrySelector,
            {
              backgroundColor: errors.countryError
                ? "#EE10450A"
                : COLORS.inputBg,
            },
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
              color={errors.countryError ? COLORS.red : COLORS.inputLabel}
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
                    ? COLORS.white
                    : errors.countryError
                    ? COLORS.red
                    : COLORS.inputLabel
                }
                fontSize={16}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
          </View>
          <Icons
            style={{ color: COLORS.white, fontSize: 20 }}
            family="Entypo"
            name="chevron-down"
          />
        </TouchableOpacity>

        {errors.countryError && (
          <ErrorComponent
            errorTitle={errors.countryError}
            color="#EE1045"
            error={errors.countryError}
            marginBottom={8}
          />
        )}

        {/* DYNAMIC INPUTS */}
        {independentInputFields.map((input, index) => (
          <CustomInput
            key={`independent-input-${index}`}
            withLabel={input.label}
            value={input.value}
            onChangeText={
              input.onChange ||
              ((text) => handleIndependentInputChange(input.field, text))
            }
            placeholder={input.placeholder}
            marginBottom={8}
            error={input.error}
            keyboardType={input.keyboardType}
          />
        ))}

        <Divider marginVertical={12} />

        {renderIndependentFileUpload(
          "criminalRecord",
          "Attach a file",
          "PDF only. 20MB."
        )}
      </View>

      <CountryBottomSheet
        visible={showCountrySheet}
        onClose={() => setShowCountrySheet(false)}
        selectedCountry={independentFormData.country}
        onSelectCountry={(country) => {
          setIndependentFormData({ ...independentFormData, country });
          const msg = validateIndependentField(
            "country",
            country,
            independentFormData
          );
          setErrors((prev) => ({ ...prev, countryError: msg }));
        }}
      />

      <CustomModalGooglePlaces
        isVisible={locationModal}
        onClose={() => setLocationModal(false)}
        onLocationSelect={(e) => {
          const country = COUNTRIES?.find((c) => c?.label === e?.country);
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
          setCity(e?.city);
          setRegion(e?.state);
          setPostalCode(e?.postalCode);
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
    borderRadius: 12,
    padding: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    marginTop: 7,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadedFileContainer: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    marginTop: 6,
  },
  removeButton: {
    padding: 4,
  },
});
