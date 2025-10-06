import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CountryBottomSheet from "../../../components/CountryBottomSheet";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImageCustom from "../../../components/UploadImageCustom";
import { COLORS } from "../../../utils/COLORS";
import { uploadAndGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import ToggleCard from "../MoveOut/molecules/ToggleCard";

const EditVehicle = ({ route }) => {
  const currentVehicle = route.params?.currentVehicle;

  const navigation = useNavigation();

  const [showCountrySheet, setShowCountrySheet] = useState(false);
  const camera = useRef(null);
  const [imageModal, setImageModal] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const [formData, setFormData] = useState({
    country: { code: "dz", label: "Algérie" },
    state: "",
    city: "",
    currentState: "",
    brand: "",
    model: "",
    type: "",
    transmission: "",
    color: "",
    plateNumber: "",
    mileage: "",
    isOlderThan1981: false,
    isTestPassed: false,
    vin: "",
    date: new Date(),
    file: "",
    isAutonomous: currentVehicle?.isAutonomous || false,
  });

  const [errors, setErrors] = useState({});
  const [fileLoading, setFileLoading] = useState(null);

  const [brandOptions, setBrandOptions] = useState([]);
  const [modelOptions, setModelOptions] = useState([]);

  // Initialize form data from currentVehicle if available
  useEffect(() => {
    if (currentVehicle) {
      // Helper function to get country code from registeredIN
      const getCountryFromCode = (code) => {
        // You might want to maintain a proper mapping, but for now using a simple approach
        const countryMapping = {
          PK: { code: "pk", label: "Pakistan" },
          US: { code: "us", label: "United States" },
          CA: { code: "ca", label: "Canada" },
          UK: { code: "gb", label: "United Kingdom" },
          DE: { code: "de", label: "Germany" },
          FR: { code: "fr", label: "France" },
        };
        return (
          countryMapping[code] || {
            code: code?.toLowerCase() || "dz",
            label: code || "Unknown",
          }
        );
      };

      setFormData({
        country: getCountryFromCode(currentVehicle.registeredIN),
        isAutonomous: currentVehicle?.isAutonomous,
        state: currentVehicle.state || "",
        city: currentVehicle.city || "",
        currentState: currentVehicle.currentState || "",
        brand: currentVehicle.brand || "",
        model: currentVehicle.model || "",
        type: currentVehicle.type || "",
        transmission: currentVehicle.transmission || "",
        color: currentVehicle.color || "",
        plateNumber: currentVehicle.plateNumber || "",
        Mileage: currentVehicle.Mileage?.toString() || "",
        isOlderThan1981: currentVehicle.isVehicleOlder || false,
        isTestPassed: currentVehicle.vehicleTestPassed || false,
        vin: currentVehicle.vin || "",
        date: currentVehicle.vehicleTestPassedDate
          ? new Date(currentVehicle.vehicleTestPassedDate)
          : new Date(),
        file: currentVehicle.vehicleDocuments?.[0]
          ? { file: currentVehicle.vehicleDocuments[0] }
          : "",
      });
    }
  }, [currentVehicle]);

  const currentStateOptions = ["Brand New", "Like New", "Good", "Poor"];
  const vehicleTypes = ["car", "motorcycle", "truck"];

  useEffect(() => {
    const fetchMakes = async () => {
      let type = formData.type || "car";
      const res = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/${type}?format=json`
      );
      setBrandOptions(res.data?.Results?.map(({ MakeName }) => MakeName));
    };
    fetchMakes();
  }, [formData.type]);

  useEffect(() => {
    if (!formData.brand) return;
    const fetchModels = async () => {
      const res = await axios.get(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${formData.brand}?format=json`
      );

      setModelOptions(res.data.Results.map(({ Model_Name }) => Model_Name));
    };
    fetchModels();
  }, [formData.brand]);

  const transmissionOptions = ["manual", "automatic", "semi-automatic"];

  const colorOptions = ["Red", "Blue", "Black", "White", "Silver", "Gray"];

  // Build full error map for given form values
  const buildErrors = (values) => {
    const newErrors = {};

    if (!values.country?.code)
      newErrors.countryError = "Please select a country";
    if (!values.state || values.state.trim().length < 2)
      newErrors.stateError = "State must be at least 2 characters";
    if (!values.city || values.city.trim().length < 2)
      newErrors.cityError = "City must be at least 2 characters";
    if (!values.currentState)
      newErrors.currentStateError = "Please select current state";
    if (!values.type) newErrors.typeError = "Please select vehicle type";
    if (!values.brand) newErrors.brandError = "Please select a brand";
    if (!values.model) newErrors.modelError = "Please select a model";
    if (!values.transmission)
      newErrors.transmissionError = "Please select transmission type";
    if (!values.color) newErrors.colorError = "Please select a color";
    if (!values.plateNumber || values.plateNumber.trim().length < 3)
      newErrors.plateNumberError = "Plate number must be at least 3 characters";
    if (!values.mileage || values.mileage.trim() === "")
      newErrors.mileageError = "Please enter current mileage";
    else if (isNaN(values.mileage) || parseInt(values.mileage) < 0)
      newErrors.mileageError = "Please enter a valid mileage";
    if (!values.vin || values.vin.trim().length !== 17)
      newErrors.vinError = "VIN must be exactly 17 characters";
    if (values.isTestPassed && !values.date)
      newErrors.dateError = "Please select test date";

    return newErrors;
  };

  // Real-time error clearing at field level
  const validateField = (field, value, current) => {
    const v = { ...current, [field]: value };

    if (field === "state" && (!value || value.trim().length < 2))
      return "State must be at least 2 characters";
    if (field === "city" && (!value || value.trim().length < 2))
      return "City must be at least 2 characters";
    if (field === "currentState" && !value)
      return "Please select current state";
    if (field === "type" && !value) return "Please select vehicle type";
    if (field === "brand" && !value) return "Please select a brand";
    if (field === "model" && !value) return "Please select a model";
    if (field === "transmission" && !value)
      return "Please select transmission type";
    if (field === "color" && !value) return "Please select a color";
    if (field === "plateNumber" && (!value || value.trim().length < 3))
      return "Plate number must be at least 3 characters";
    if (field === "mileage") {
      if (!value || value.trim() === "") return "Please enter current mileage";
      if (isNaN(value) || parseInt(value) < 0)
        return "Please enter a valid mileage";
    }
    if (field === "vin" && (!value || value.trim().length !== 17))
      return "VIN must be exactly 17 characters";
    if (field === "date" && v.isTestPassed && !value)
      return "Please select test date";
    if (field === "country" && (!value || !value.code))
      return "Please select a country";

    return "";
  };

  const errorCheck = useMemo(() => {
    return () => {
      const newErrors = buildErrors(formData);
      setErrors(newErrors);
    };
  }, [formData]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    // Real-time field-level validation and clearing
    const fieldErrorKey = `${field}Error`;
    const message = validateField(field, value, formData);
    setErrors((prev) => ({ ...prev, [fieldErrorKey]: message }));

    // Special handling: if toggling test passed off, clear date error
    if (field === "isTestPassed" && !value) {
      setErrors((prev) => ({ ...prev, dateError: "" }));
    }
  };

  const handleColorSelect = (selectedColor) => {
    handleInputChange("color", selectedColor);
  };

  const handleDeleteVehiclePaper = () => {
    setFormData({ ...formData, file: "" });
  };

  const handleCapture = async () => {
    try {
      if (!camera?.current) {
        return;
      }
      const photo = await camera?.current?.takePhoto({ flash: "off" });
      let filePath = photo?.path;
      if (!filePath?.startsWith("file://")) {
        filePath = `file://${filePath}`;
      }
      setImgLoading(true);
      const url = await uploadAndGetUrl({ path: filePath });
      if (url) {
        setFormData({ ...formData, file: { file: url } });
      }
      setImgLoading(false);
      setImageModal(false);
    } catch (error) {
      console.log(error, "in vehicle paper capture");
      setImgLoading(false);
    }
  };

  const handleViewDocument = () => {
    if (formData.file?.file) {
      const url = formData.file.file;
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            Linking.openURL(url);
          } else {
            Alert.alert("Error", "Cannot open this document");
          }
        })
        .catch((err) => {
          console.error("Error opening document:", err);
          Alert.alert("Error", "Failed to open document");
        });
    }
  };

  const inputFields = [
    {
      field: "state",
      label: "STATE",
      value: formData.state,
      error: errors?.stateError,
      placeholder: "Enter State",
    },
    {
      field: "city",
      label: "CITY",
      value: formData.city,
      error: errors?.cityError,
      placeholder: "Enter City",
    },
    {
      field: "plateNumber",
      label: "PLATE NUMBER",
      value: formData.plateNumber,
      error: errors?.plateNumberError,
      placeholder: "DBX 132",
    },
    {
      field: "mileage",
      label: "CURRENT MILEAGE",
      value: formData.mileage,
      placeholder: "Km XXX XXX XX",
      error: errors?.mileageError,
      kt: "number-pad",
    },
    {
      field: "vin",
      label: "VIN",
      value: formData.vin,
      error: errors?.vinError,
      kt: "number-pad",
    },
    {
      field: "date",
      label: "WHEN DID YOU PASS THE TEST?",
      value: formData.date,
      placeholder: "Jul 13, 2025",
      error: errors?.dateError,
    },
  ];

  const dropdownFields = [
    {
      field: "currentState",
      label: "CURRENT STATE",
      value: formData.currentState,
      options: currentStateOptions,
      placeholder: "Select current state",
      error: errors?.currentStateError,
    },
    {
      field: "type",
      label: "Vehicle Type",
      value: formData.type,
      options: vehicleTypes,
      placeholder: "Select Vehicle Type",
      error: errors?.typeError,
      onPress: () =>
        navigation.navigate("VehicleType", {
          onSelectType: (val) => handleInputChange("type", val),
        }),
    },
    {
      field: "brand",
      label: "BRAND",
      value: formData.brand,
      options: brandOptions,
      placeholder: "Select brand",
      error: errors?.brandError,
      onPress: () => {
        if (formData?.type) {
          navigation.navigate("VehicleMake", {
            options: brandOptions,
            onSelectBrand: (val) => handleInputChange("brand", val),
          });
        } else {
          ToastMessage("Please Select Vehicle Type", "error");
        }
      },
    },
    {
      field: "model",
      label: "MODEL",
      value: formData.model,
      options: modelOptions,
      placeholder: "Select model",
      error: errors?.modelError,
      onPress: () => {
        if (formData?.type && formData?.brand) {
          navigation.navigate("VehicleModal", {
            models: modelOptions,
            onSelectModel: (val) => handleInputChange("model", val),
          });
        } else {
          ToastMessage("Please Select Vehicle Type or Brand", "error");
        }
      },
    },
    {
      field: "transmission",
      label: "TRANSMISSION",
      value: formData.transmission,
      options: transmissionOptions,
      placeholder: "Select transmission",
      error: errors?.transmissionError,
    },
    {
      field: "color",
      label: "COLOR",
      // value: formData.color,
      options: colorOptions,
      placeholder: !formData.color && "Select color",
      error: errors?.colorError,
      isColor: true,
      onPress: () =>
        navigation.navigate("SelectAColor", {
          onColorSelect: handleColorSelect,
        }),
    },
  ];

  const createVehicle = async () => {
    // navigation.navigate("VehicleImageOnboarding");
    const newErrors = buildErrors(formData);
    setErrors(newErrors);

    const hasAnyError = Object.values(newErrors).some((m) => m && m.length > 0);
    if (hasAnyError) {
      console.log("here---->");

      return;
    }

    const body = {
      registeredIN:
        formData.country?.code?.toUpperCase() || formData.country?.label,
      isAutonomous: formData?.isAutonomous,
      state: formData.state,
      city: formData.city,
      currentState: formData.currentState,
      type: formData.type,
      brand: formData.brand,
      model: formData.model,
      transmission: formData.transmission,
      color: formData.color,
      plateNumber: formData.plateNumber,
      vehicleTestPassed: formData.isTestPassed,
      vehicleTestPassedDate: formData.date
        ? formData.date.toISOString().split("T")[0]
        : null,
      isVehicleOlder: formData.isOlderThan1981,
      vin: formData.vin,
      vehicleDocuments: [formData.file?.file],
      Mileage: formData.mileage ? parseInt(formData.mileage) : 0,
      isEdit: currentVehicle ? true : false,
      vehicleImages: currentVehicle?.vehicleImages || [],
      vehicleId: currentVehicle?._id,
      ...(currentVehicle && { _id: currentVehicle.id }),
    };

    navigation.navigate("VehicleImageOnboarding", {
      body,
    });
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={currentVehicle ? "Edit Vehicle" : "Create A Vehicle"} />
      )}
    >
      <AuthSlider min={1} max={3} marginTop={1} marginBottom={18} />

      <View style={styles.container}>
        <CustomText
          label="Vehicle General Info"
          fontSize={24}
          fontFamily={fonts.semiBold}
          color={COLORS.black}
        />
        <CustomText
          label="Please inform your vehicle details as detailed on your official vehicle papers/documents."
          color={COLORS.subtitle}
          marginBottom={16}
          marginTop={-6}
        />

        <TouchableOpacity
          style={[
            styles.countrySelector,
            errors.countryError && { borderColor: COLORS.red, borderWidth: 1 },
          ]}
          onPress={() => setShowCountrySheet(true)}
        >
          <View>
            <CustomText
              label={"Registered In"}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={formData.country ? COLORS.black : COLORS.inputLabel}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {formData.country && (
                <Image
                  source={{
                    uri: `https://flagcdn.com/w40/${formData.country.code.toLowerCase()}.png`,
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

              <View>
                <CustomText
                  label={
                    formData.country ? formData.country.label : "Select country"
                  }
                  color={formData.country ? COLORS.black : COLORS.inputLabel}
                  fontSize={16}
                  fontFamily={fonts.medium}
                />
              </View>
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
            marginTop={4}
            marginBottom={8}
          />
        )}

        <CountryBottomSheet
          visible={showCountrySheet}
          onClose={() => setShowCountrySheet(false)}
          selectedCountry={formData.country}
          onSelectCountry={(country) => {
            setFormData({ ...formData, country });
            const msg = validateField("country", country, formData);
            setErrors((prev) => ({ ...prev, countryError: msg }));
          }}
        />
        {inputFields.slice(0, 2).map((input, index) => (
          <CustomInput
            key={`input-${index}`}
            withLabel={input.label}
            value={input.value}
            onChangeText={(text) => handleInputChange(input.field, text)}
            placeholder={input.placeholder}
            marginBottom={index == 1 ? 1 : 8}
            error={input.error}
          />
        ))}

        <View style={styles.border} />

        <ToggleCard
          label1={"IS IT AN AUTONOmoUS VEHICLE?"}
          isEnabled={formData.isAutonomous}
          setIsEnabled={(value) => handleInputChange("isAutonomous", value)}
        />

        {dropdownFields.map((dropdown, index) => (
          <CustomDropdown
            key={`dropdown-${index}`}
            withLabel={dropdown.label}
            value={dropdown.value}
            setValue={(value) => handleInputChange(dropdown.field, value)}
            data={dropdown.options}
            placeholder={dropdown.placeholder}
            marginBottom={8}
            onPress={dropdown.onPress}
            error={dropdown.error}
            isColor={dropdown.isColor}
            colorBg={formData.color}
          />
        ))}

        {inputFields.slice(2, 4).map((input, index) => (
          <CustomInput
            key={`input-remaining-${index}`}
            withLabel={input.label}
            value={input.value}
            onChangeText={(text) => handleInputChange(input.field, text)}
            placeholder={input.placeholder}
            marginBottom={8}
            error={input.error}
            keyboardType={input.kt}
          />
        ))}

        <ToggleCard
          label1={"HAS YOUR VEHICLE PASSED THE TEST?"}
          isEnabled={formData.isTestPassed}
          setIsEnabled={(value) => handleInputChange("isTestPassed", value)}
        />
        {formData.isTestPassed && (
          <CustomDatePicker
            withLabel={inputFields[5]?.label}
            value={inputFields[5]?.value}
            setValue={(value) =>
              handleInputChange(inputFields[5]?.field, value)
            }
            maxDate={new Date()}
            marginBottom={8}
            error={inputFields[5]?.error}
          />
        )}

        <ToggleCard
          label1={"IS YOUR VEHICLE OLDER THAN 1981?"}
          isEnabled={formData.isOlderThan1981}
          setIsEnabled={(value) => handleInputChange("isOlderThan1981", value)}
        />

        <CustomInput
          withLabel={inputFields[4].label}
          value={inputFields[4].value}
          onChangeText={(text) => handleInputChange(inputFields[4].field, text)}
          placeholder={inputFields[4].placeholder || "Enter VIN"}
          error={inputFields[4].error}
          keyboardType={"number-pad"}
        />

        <View style={styles.border} />

        {formData?.file ? (
          <View style={styles.uploadedFileContainer}>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <CustomText
                label={"Vehicle Paper"}
                lineHeight={14 * 1.4}
                marginRight={8}
                fontFamily={fonts.medium}
                onPress={handleViewDocument}
                textDecorationLine={"underline"}
              />

              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleDeleteVehiclePaper}
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
            style={styles.attachmentButton}
            onPress={() => setImageModal(true)}
          >
            {fileLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <>
                <Image
                  source={PNGIcons.plus || Images.plus}
                  style={styles.plusIcon}
                />
                <View style={{ alignItems: "center" }}>
                  <CustomText label="PDF only. 20MB." fontSize={12} />
                  <CustomText
                    label="Join Vehicle Paper"
                    fontSize={16}
                    fontFamily={fonts.medium}
                    marginTop={-4}
                  />
                </View>
              </>
            )}
          </TouchableOpacity>
        )}

        <UploadImageCustom
          camera={camera}
          images={formData?.file?.file ? [formData.file.file] : []}
          onDelete={handleDeleteVehiclePaper}
          imageModal={imageModal}
          imgLoading={imgLoading}
          handleCapture={handleCapture}
          setImageModal={setImageModal}
          handleChange={async (e) => {
            setFileLoading(true);
            const url = await uploadAndGetUrl(e);
            if (url) {
              setFormData({ ...formData, file: { file: url } });
            }
            setFileLoading(false);
          }}
        />

        {/* Action Buttons */}
        <CustomButton
          title={currentVehicle ? "Update Vehicle" : "Continue"}
          marginTop={24}
          marginBottom={24}
          onPress={createVehicle}
        />

        {!currentVehicle && (
          <CustomButton
            title="Save As Draft"
            backgroundColor={COLORS.lightGray}
            color={COLORS.black}
            marginBottom={24}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default EditVehicle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginRight: 10,
    borderRadius: 2,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  dropdownSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  vinInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -8,
    marginBottom: 16,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  attachmentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    // height: 51,
    marginTop: 6,
    justifyContent: "center",
  },
  plusIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  border: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: 16,
  },

  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  uploadedFileContainer: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    marginTop: 6,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "20",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  viewIcon: {
    color: COLORS.primary,
    fontSize: 14,
  },
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    color: COLORS.red,
    fontSize: 18,
  },
});
