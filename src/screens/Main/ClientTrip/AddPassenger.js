import { useState } from "react";
import { StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import CustomButton from "../../../components/CustomButton";
import CustomInput from "../../../components/CustomInput";
import CustomPhoneInput from "../../../components/CustomPhoneInput";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { COLORS } from "../../../utils/COLORS";

const AddPassenger = () => {
  const [CurrentTab, setCurrentTab] = useState("Ms.");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const phoneValidationCheck = (phoneValue) => {
    let newErrors = "";
    if (!phoneValue || phoneValue.trim().length === 0) {
      newErrors = "Please enter your phone number";
    } else {
      if (phoneValue.length < 7) {
        newErrors = "Please enter a valid phone number";
      } else {
        newErrors = "";
      }
    }
    return newErrors;
  };
  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      backgroundColor="#F6F6F6"
      headerUnScrollable={() => (
        <Header
          title={"Add A Passenger"}
          onHelpPress={() => console.log("help")}
        />
      )}
    >
      <View style={[styles.addressContainer, { marginTop: 12 }]}>
        <CustomText
          label={"Formal Addressing"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
        <TopTabWithBG
          tab={CurrentTab}
          paddingVertical={8}
          setTab={setCurrentTab}
          tabNames={["Ms.", "Mr."]}
          marginBottom={0.1}
          marginTop={5}
        />
      </View>
      <View style={[styles.addressContainer, { marginTop: 4 }]}>
        <CustomText
          label={"Firstname"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
        <CustomInput marginTop={10} placeholder={"E.g. James"} />
        <View style={styles.Row}>
          <ErrorComponent errorTitle={"This will appear on your profile."} />
          <CustomText fontFamily={fonts.regular} fontSize={12} label={"0/32"} />
        </View>
        <ErrorComponent
          marginTop={5}
          errorTitle={"Inappropriate names are forbidden."}
        />
      </View>
      <View style={[styles.addressContainer, { marginTop: 4 }]}>
        <CustomText
          label={"Surname"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          lineHeight={18 * 1.4}
        />
        <CustomInput  marginTop={10} placeholder={"E.g. Johansson"} />
        <View style={styles.Row}>
          <ErrorComponent errorTitle={"This will appear on your profile."} />
          <CustomText fontFamily={fonts.regular} fontSize={12} label={"0/32"} />
        </View>
        <ErrorComponent
          marginTop={4}
          errorTitle={"Inappropriate names are forbidden."}
        />
      </View>

      <View style={[styles.addressContainer, { marginTop: 4 }]}>
        <CustomText
          label={"Contacts"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          marginBottom={12}
          lineHeight={18 * 1.4}
        />
        <CustomPhoneInput
          withLabel={"Phone Number"}
          value={phone}
          isIcon
          setValue={(text) => {
            setPhone(text);
            if (phoneError) {
              const newError = phoneValidationCheck(text);
              if (!newError) {
                setPhoneError("");
              }
            }
          }}
          marginTop={0.1}
          showCheck
          marginBottom={0.1}
        />
        <CustomInput
        Isicon
          marginTop={8}
          withLabel={"Email Address"}
          placeholder={"abc@gmail.com"}
        />
        <ErrorComponent
          marginTop={4}
          numberOfLines={2}
          TextWidth={"75%"}
          errorTitle={
            "Phone: Facilitating communication between the Chauffeur and the final customer."
          }
        />
        <ErrorComponent
          marginTop={5}
          errorTitle={"Email: Used for providing the customer’s Trip details."}
        />
      </View>
      <View style={[styles.addressContainer, { marginTop: 4 }]}>
        <CustomText
          label={"Additional Remarks"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          marginBottom={12}
          lineHeight={18 * 1.4}
        />
        <CustomInput
          marginTop={8}
          multiline={true}
          height={160}
          withLabel={"ADD A REMARK (OPTIONAL)"}
          placeholder={"I like it to be raw meat, please."}
        />
        <ErrorComponent errorTitle={"0/200 characters."} />
      </View>
      <View style={[styles.addressContainer, { marginTop: 4 }]}>
        <CustomText
          label={"Important"}
          fontFamily={fonts.semiBold}
          fontSize={18}
          marginBottom={12}
          lineHeight={18 * 1.4}
        />
        <CustomInput
          marginTop={8}
          multiline={true}
          height={160}
          withLabel={"TERMS OF SERVICES"}
          placeholder={
            "Under aged passengers should always be accompanied by an adult or their legal tutor(s)."
          }
        />
      </View>

      <View style={{ paddingHorizontal: 12 }}>
        <CustomButton title={"Add Customer"} marginTop={12} />
        <CustomButton
          backgroundColor={"#1212120A"}
          color={COLORS.black}
          title={"Cancel"}
          marginTop={8}
          marginBottom={34}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddPassenger;

const styles = StyleSheet.create({
  addressContainer: {
    backgroundColor: "#fff",
    padding: 12,
  },

  Row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
