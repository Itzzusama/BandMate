import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import CustomInput from "../../../components/CustomInput";
import CustomDatePicker from "../../../components/CustomDatePicker";
import Divider from "../../../components/Divider";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import CustomDropdown from "../../../components/CustomDropdown";
import ErrorComponent from "../../../components/ErrorComponent";
import CustomButton from "../../../components/CustomButton";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";

// Validation Schema
const validationSchema = Yup.object().shape({
  // Driver's Information
  licenseFullName: Yup.string().required("Full name is required"),
  dateOfBirth: Yup.date().required("Date of birth is required"),
  countryOfIssue: Yup.string().required("Country of issue is required"),
  licenseNumber: Yup.string().required("License number is required"),
  issueDate: Yup.date().required("Issue date is required"),
  expiryDate: Yup.date()
    .required("Expiry date is required")
    .min(Yup.ref("issueDate"), "Expiry date must be after issue date"),

  // Vehicle Information
  vehicleType: Yup.string().required("Vehicle type is required"),
  make: Yup.string().required("Make is required"),
  model: Yup.string().required("Model is required"),
  color: Yup.string().required("Color is required"),
  registeredIn: Yup.string().required("Registered country is required"),
  plateNumber: Yup.string().required("Plate number is required"),

  // Contact Information
  phone: Yup.string()
    .required("Phone number is required")
    .min(10, "Phone number must be at least 10 digits"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const FinalizingBooking = () => {
  // Initial values
  const initialValues = {
    // Driver's Information
    licenseFullName: "Viktor Sola",
    dateOfBirth: "",
    countryOfIssue: "",
    licenseNumber: "",
    issueDate: "",
    expiryDate: "",

    // Vehicle Information
    vehicleType: "",
    make: "",
    model: "",
    color: "",
    registeredIn: "",
    plateNumber: "GE 555 555",

    // Contact Information
    phone: "",
    email: "",
  };

  // Driver's Information Fields
  const driverInfoFields = [
    {
      component: CustomInput,
      name: "licenseFullName",
      label: "LICENSE FULL DRIVER's NAME",
      placeholder: "Enter full name",
      props: { marginTop: 16 },
    },
    {
      component: CustomDatePicker,
      name: "dateOfBirth",
      label: "DATE OF BIRTH",
      placeholder: "Select date of birth",
      props: { isIcon: true },
    },
  ];

  // License Details Fields
  const licenseFields = [
    {
      component: CustomPhoneInput,
      name: "countryOfIssue",
      label: "COUNTRY OF ISSUE",
      placeholder: "Select country",
    },
    {
      component: CustomPhoneInput,
      name: "licenseNumber",
      label: "LICENSE NUMBER",
      placeholder: "Enter license number",
    },
    {
      component: CustomDatePicker,
      name: "issueDate",
      label: "ISSUE DATE",
      placeholder: "Select issue date",
      props: { isIcon: true, marginBottom: 8 },
    },
    {
      component: CustomDatePicker,
      name: "expiryDate",
      label: "EXPIRY DATE",
      placeholder: "Select expiry date",
      props: { isIcon: true },
    },
  ];

  // Vehicle Fields
  const vehicleFields = [
    {
      component: CustomDropdown,
      name: "vehicleType",
      label: "VEHICLE TYPE",
      placeholder: "Select vehicle type",
      props: { data: ["Car", "Jeep"] },
    },
    {
      component: CustomDropdown,
      name: "make",
      label: "MAKE",
      placeholder: "Select make",
      props: { data: ["Sola", "Jeep"] },
    },
    {
      component: CustomDropdown,
      name: "model",
      label: "MODEL",
      placeholder: "Select model",
      props: { data: ["Patriot", "Jeep"] },
    },
    {
      component: CustomDropdown,
      name: "color",
      label: "Color",
      placeholder: "Select color",
      props: { data: ["Black", "Red"] },
    },
    {
      component: CustomDropdown,
      name: "registeredIn",
      label: "REGISTERED IN",
      placeholder: "Select country",
      props: { data: ["Switzerland", "India"] },
    },
    {
      component: CustomInput,
      name: "plateNumber",
      label: "PLATE NUMBER",
      placeholder: "Enter plate number",
    },
  ];

  // Contact Fields
  const contactFields = [
    {
      component: CustomPhoneInput,
      name: "phone",
      label: "PHONE NUMBER",
      placeholder: "Enter phone number",
    },
    {
      component: CustomInput,
      name: "email",
      label: "Email Address",
      placeholder: "E.g. abc@email.com",
      props: {
        autoCapitalize: "none",
        keyboardType: "email-address",
      },
    },
  ];

  // Render field based on component type
  const renderField = (fieldConfig, formik) => {
    const {
      component: Component,
      name,
      label,
      placeholder,
      props = {},
    } = fieldConfig;
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
      formik;

    const commonProps = {
      withLabel: label,
      value: values[name],
      error: touched[name] && errors[name],
      ...props,
    };

    switch (Component) {
      case CustomInput:
        return (
          <Component
            key={name}
            {...commonProps}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            placeholder={placeholder}
          />
        );

      case CustomDatePicker:
        return (
          <Component
            key={name}
            {...commonProps}
            onDateChange={(date) => setFieldValue(name, date)}
            placeholder={placeholder}
          />
        );

      case CustomPhoneInput:
        return (
          <Component
            key={name}
            {...commonProps}
            onChangeText={handleChange(name)}
            onBlur={handleBlur(name)}
            placeholder={placeholder}
          />
        );

      case CustomDropdown:
        return (
          <Component
            key={name}
            {...commonProps}
            onValueChange={(value) => setFieldValue(name, value)}
            placeholder={placeholder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Finalizing Booking"} />}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Form submitted:", values);
          // Handle form submission here
        }}
      >
        {(formik) => (
          <>
            <CustomText
              label={"General Information"}
              fontSize={24}
              lineHeight={24 * 1.4}
              marginTop={14}
              fontFamily={fonts.semiBold}
            />

            <CustomText
              label={"Please inform the details of this place."}
              fontSize={14}
              lineHeight={14 * 1.4}
              color={COLORS.gray1}
              marginTop={4}
            />
            <CustomText
              label={"SCAN YOUR DRIVING LICENSE"}
              fontSize={14}
              lineHeight={14 * 1.4}
              color={COLORS.darkPurple}
              fontFamily={fonts.medium}
              marginTop={8}
            />

            {/* Driver's Information Section */}
            <CustomText
              label={"Driver's Information"}
              fontSize={18}
              lineHeight={18 * 1.4}
              marginTop={16}
              fontFamily={fonts.medium}
            />

            {driverInfoFields.map((field) => renderField(field, formik))}

            <Divider marginVertical={12} />

            {licenseFields.map((field) => renderField(field, formik))}

            <View style={styles.warningBox}>
              <ErrorComponent
                errorTitle={
                  "Keep your official documents with you when picking the vehicle up at the parking for potential security checks."
                }
                TextWidth={"55%"}
                color={"#A57A3A"}
              />
            </View>
            {/* Vehicle Information Section */}
            <CustomText
              label={"Vehicle"}
              fontSize={18}
              lineHeight={18 * 1.4}
              marginTop={16}
              fontFamily={fonts.medium}
            />

            <View style={styles.imgCard}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <View
                  style={{
                    height: 6,
                    width: 6,
                    borderRadius: 99,
                    backgroundColor: "black",
                  }}
                />
                <ImageFast
                  source={PNGIcons.solaCredit}
                  style={{ height: 14, width: 14 }}
                />
                <ImageFast
                  source={PNGIcons.greenEnergy}
                  style={{ height: 14, width: 14 }}
                />
                <CustomText label={"Sola"} fontFamily={fonts.medium} />
                <CustomText label={"Patriot Car"} color={COLORS.gray1} />
              </View>

              <ImageFast
                style={{ height: 200, width: 330, alignSelf: "center" }}
                source={PNGIcons.tesla}
                resizeMode={"contain"}
              />

              <View
                style={{
                  padding: 8,
                  backgroundColor: COLORS.primaryColor,
                  borderRadius: 8,
                  alignItems: "center",
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 10,
                  left: 10,
                }}
              >
                <ImageFast
                  removeLoading
                  style={{ height: 12, width: 12 }}
                  source={PNGIcons.redPlus}
                />
                <CustomText
                  label={"GE 555 555"}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  fontFamily={fonts.semiBold}
                  color={COLORS.white}
                  marginLeft={4}
                />
              </View>
            </View>

            {vehicleFields.map((field) => renderField(field, formik))}

            <Divider marginVertical={32} />

            <CustomText
              label={"Contacts"}
              fontSize={18}
              lineHeight={18 * 1.4}
              fontFamily={fonts.medium}
              marginBottom={8}
            />

            {contactFields.map((field) => renderField(field, formik))}

            <CustomText
              label={"Important Remarks"}
              fontSize={18}
              lineHeight={18 * 1.4}
              marginTop={16}
              fontFamily={fonts.medium}
            />
            {/* Optional: Submit Button - Add if needed */}
          </>
        )}
      </Formik>
      <View style={styles.warningBox}>
        <ErrorComponent
          errorTitle={
            "Please try to arrive within 5 minutes of your scheduled time and departure."
          }
          color={"#A57A3A"}
        />
      </View>
      <View style={styles.warningBox}>
        <ErrorComponent
          TextWidth={"60%"}
          errorTitle={
            "Prepare this confirmation and your ID when picking the vehicle up in case of security checks."
          }
          color={"#A57A3A"}
        />
      </View>
      <View style={styles.warningBox}>
        <ErrorComponent
          TextWidth={"60%"}
          errorTitle={
            "Please inform the Host as soon as possible if you find yourself facing issues before, while or after the booking."
          }
          color={"#A57A3A"}
        />
      </View>
      <View style={styles.warningBox}>
        <ErrorComponent
          errorTitle={"Free cancellation up to 2h before check-in."}
          color={"#A57A3A"}
        />
      </View>

      <CustomButton
        title={"Submit Request"}
        secondText={"Total 12.50 Cr"}
        marginBottom={Platform.OS == "android" ? 12 : 36}
        marginTop={60}
      />
    </ScreenWrapper>
  );
};

export default FinalizingBooking;

const styles = StyleSheet.create({
  warningBox: {
    width: "100%",
    marginTop: 12,
    backgroundColor: "#A57A3A0A",
    padding: 8,
    borderRadius: 12,
  },

  imgCard: {
    backgroundColor: COLORS.lightGray,
    padding: 12,
    borderWidth: 2,
    borderColor: COLORS.primaryColor,
    borderRadius: 12,
    marginVertical: 16,
  },
});
