import { StyleSheet, View, ScrollView } from "react-native";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const CATEGORIES = ["Child"];
const GENDERS = ["Boy", "Girl"];
const RELATIONSHIPS = ["Legal Guardian", "Parent", "Relative"];
const VALIDITY_OPTIONS = ["Custom", "Forever"];

const CardAccess = ({ navigation }) => {
  const today = new Date();

  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
    firstName: Yup.string()
      .matches(/^[A-Za-z][A-Za-z\s\-']*$/, "Enter a valid first name")
      .max(50, "Max 50 characters")
      .required("Legal Firstname is required"),
    lastName: Yup.string()
      .matches(/^[A-Za-z][A-Za-z\s\-']*$/, "Enter a valid surname")
      .max(50, "Max 50 characters")
      .required("Legal Surname is required"),
    gender: Yup.string().required("Gender is required"),
    relationship: Yup.string().required("Relationship is required"),
    grantTo: Yup.string().required("Please select a friend"),
    validity: Yup.string().required("Validity is required"),
    startDate: Yup.date()
      .nullable()
      .required("Start date is required")
      .min(
        new Date(today.getFullYear(), today.getMonth(), today.getDate()),
        "Start date cannot be in the past"
      ),
    endDate: Yup.date()
      .nullable()
      .when("validity", {
        is: (v) => v === "Custom",
        then: (schema) =>
          schema
            .required("End date is required")
            .min(Yup.ref("startDate"), "End date must be after start date"),
        otherwise: (schema) => schema.nullable(),
      }),
  });

  const formik = useFormik({
    initialValues: {
      category: "",
      firstName: "",
      lastName: "",
      gender: "",
      relationship: "",
      grantTo: "",
      validity: "Custom",
      startDate: null,
      endDate: null,
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: (values) => {
      // submit or navigate forward with values
      navigation?.navigate?.("VCSuccess", { cardAccess: values });
    },
  });

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Card Access"} />}
    >
      <CustomText
        label={"Card Access"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={8}
      />
      <CustomText
        label={"Differentiate Virtual Cards with names."}
        color={COLORS.gray1}
        fontFamily={fonts.regular}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={16}
      />

      <CustomDropdown
        data={CATEGORIES}
        value={formik.values.category}
        setValue={(v) => {
          formik.setFieldValue("category", v);
          if (formik.errors.category)
            formik.setFieldError("category", undefined);
        }}
        withLabel={"Category"}
        error={formik.errors.category}
        placeholder={"Select category"}
        marginBottom={16}
      />

      <CustomInput
        withLabel={"Legal Firstname"}
        value={formik.values.firstName}
        placeholder={"Johnny"}
        onChangeText={(t) => {
          formik.setFieldValue("firstName", t);
          if (formik.errors.firstName)
            formik.setFieldError("firstName", undefined);
        }}
        error={formik.errors.firstName}
        marginBottom={16}
      />

      <CustomInput
        withLabel={"Legal Surname"}
        value={formik.values.lastName}
        placeholder={"Davidson"}
        onChangeText={(t) => {
          formik.setFieldValue("lastName", t);
          if (formik.errors.lastName)
            formik.setFieldError("lastName", undefined);
        }}
        error={formik.errors.lastName}
        marginBottom={16}
      />

      <CustomDropdown
        data={GENDERS}
        value={formik.values.gender}
        setValue={(v) => {
          formik.setFieldValue("gender", v);
          if (formik.errors.gender) formik.setFieldError("gender", undefined);
        }}
        withLabel={"Gender"}
        error={formik.errors.gender}
        placeholder={"Select gender"}
        marginBottom={16}
      />

      <CustomDropdown
        data={RELATIONSHIPS}
        value={formik.values.relationship}
        setValue={(v) => {
          formik.setFieldValue("relationship", v);
          if (formik.errors.relationship)
            formik.setFieldError("relationship", undefined);
        }}
        withLabel={"Your Relationship"}
        error={formik.errors.relationship}
        placeholder={"Select relationship"}
        marginBottom={16}
      />

      <CustomDropdown
        data={[]}
        value={formik.values.grantTo || "Anna"}
        setValue={(v) => {
          formik.setFieldValue("grantTo", typeof v === "string" ? v : v?.title);
          if (formik.errors.grantTo) formik.setFieldError("grantTo", undefined);
        }}
        withLabel={"Grant Access To"}
        error={formik.errors.grantTo}
        onPress={() => {
          // Placeholder navigation to a picker
          navigation?.navigate?.("GrantAccess", {
            onSelect: (name) => formik.setFieldValue("grantTo", name),
          });
        }}
        showIcon
        placeholder={"Select a friend"}
        marginBottom={16}
      />

      <CustomDropdown
        data={VALIDITY_OPTIONS}
        value={formik.values.validity}
        setValue={(v) => {
          formik.setFieldValue("validity", v);
          if (formik.errors.validity)
            formik.setFieldError("validity", undefined);
        }}
        withLabel={"Validity"}
        error={formik.errors.validity}
        placeholder={"Select validity"}
        marginBottom={16}
      />

      <CustomDatePicker
        value={formik.values.startDate}
        setValue={(d) => {
          formik.setFieldValue("startDate", d);
          if (formik.errors.startDate)
            formik.setFieldError("startDate", undefined);
          // Also validate endDate if present
          if (formik.values.endDate) formik.validateField("endDate");
        }}
        withLabel={"Starting On"}
        placeholder={"Starting On"}
        error={formik.errors.startDate}
        maxDate={null}
        isIcon
        marginBottom={16}
      />

      {formik.values.validity === "Custom" && (
        <CustomDatePicker
          value={formik.values.endDate}
          setValue={(d) => {
            formik.setFieldValue("endDate", d);
            if (formik.errors.endDate)
              formik.setFieldError("endDate", undefined);
          }}
          withLabel={"Ending On"}
          placeholder={"Ending On"}
          error={formik.errors.endDate}
          maxDate={null}
          isIcon
          marginBottom={16}
        />
      )}

      <View style={{ height: 12 }} />

      <CustomButton
        title={"Continue"}
        onPress={formik.handleSubmit}
        backgroundColor={COLORS.black}
        width={"100%"}
        height={56}
        borderRadius={16}
      />

      <CustomButton
        title={"Cancel"}
        onPress={() => navigation?.goBack?.()}
        isBoarder
        secondBorderColor={"#12121229"}
        backgroundColor={"transparent"}
        color={COLORS.black}
        width={"100%"}
        height={56}
        borderRadius={16}
        marginTop={12}
      />
    </ScreenWrapper>
  );
};

export default CardAccess;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
});
