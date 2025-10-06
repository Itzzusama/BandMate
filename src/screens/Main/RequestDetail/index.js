import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import CustomPhoneInput from "../../../components/CustomPhoneInput";
import ErrorComponent from "../../../components/ErrorComponent";
import LocationInput from "../../../components/LocationInput";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomToggle from "../../../components/CustomToggle";
import CustomButton from "../../../components/CustomButton";
import TopTabWithBG from "../../../components/TopTabWithBG";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import { PNGIcons } from "../../../assets/images/icons";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const RequestDetail = () => {
  const navigation = useNavigation();
  const [tab, setTab] = useState("Receive");
  const [tab2, setTab2] = useState("Later");
  const [isSelected, setIsSelected] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  return (
    <ScreenWrapper
      scrollEnabled
      paddingHorizontal={0.1}
      headerUnScrollable={() => (
        <Header title="Request Details" textColor={COLORS.black} onHelpPress />
      )}
    >
      <Divider thickness={4} />
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="Select An Option"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={12}
        />
        <TopTabWithBG
          tabNames={["Send", "Receive"]}
          tab={tab}
          setTab={setTab}
          marginVertical={0.1}
          activeHeight={38}
          activeFontFamily={fonts.semiBold}
        />
      </View>
      <Divider thickness={4} marginBottom={0.1} />
      <View style={styles.headingRow}>
        <View style={styles.center}>
          <CustomText
            label="Pickup & Drop-off"
            color={COLORS.black}
            fontSize={18}
            fontFamily={fonts.medium}
            marginRight={6}
          />
          <ImageFast
            source={Images.move}
            style={styles.headingIcon}
            resizeMode={"contain"}
          />
        </View>

        <Icons
          family="Feather"
          name="chevron-down"
          size={24}
          color={COLORS.black}
        />
      </View>
      <View style={{ paddingHorizontal: 12 }}>
        <LocationInput
          withLabel="From"
          placeholder="Chemin du Centurion 11, 1209, Geneva"
          rightIcon={{
            source: Images.from,
            style: styles.icon,
            color: COLORS.lowPurple,
          }}
          leftIcon
        />
        <LocationInput
          withLabel="Drop off"
          placeholder="Chemin du Centurion 11, 1209, Geneva"
          rightIcon={{
            source: Images.to,
            style: [{ width: 12, height: 12 }],
            color: COLORS.lowRed,
          }}
          leftIcon
        />
      </View>
      <Divider thickness={4} marginVertical={0.1} />
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="When Do You Need It"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginTop={12}
        />
        <TopTabWithBG
          tabNames={["Now", "Later"]}
          tab={tab2}
          setTab={setTab2}
          activeFontFamily={fonts.semiBold}
          activeHeight={38}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <CustomText
            label="Arriving at"
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <Icons
            family="MaterialCommunityIcons"
            onPress={() => setIsSelected(!isSelected)}
            name={isSelected ? "radiobox-marked" : "radiobox-blank"}
            size={24}
            color={isSelected ? COLORS.darkPurple : COLORS.gray2}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <LocationInput
            withLabel="ARRIVAL DATE"
            placeholder="Fri, Jul 12, 2025"
            width="48%"
            leftCalendar
          />

          <LocationInput
            withLabel="ARRIVAL TIME"
            placeholder="10:00 AM"
            width={"48%"}
            rightIcon={{
              source: Images.to,
              style: [{ width: 12, height: 12 }],
              color: COLORS.lowRed,
            }}
            leftClock
          />
        </View>
      </View>
      <Divider thickness={4} marginTop={0.1} />
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="Services I Will Need"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={12}
        />
        <View style={styles.card}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={PNGIcons.energyIcon}
              style={{
                width: 48,
                height: 48,
                tintColor: "#4347FF",
                borderRadius: 12,
                marginRight: 12,
              }}
              resizeMode="contain"
            />
            <View>
              <CustomText
                label="Large"
                lineHeight={16 * 1.4}
                fontSize={16}
                fontFamily={fonts.medium}
                numberOfLines={1}
              />
              <CustomText
                label="Weight ranging 500kg to 1T"
                color="#1212127A"
                lineHeight={12 * 1.4}
                fontSize={12}
                fontFamily={fonts.medium}
                numberOfLines={1}
              />

              <CustomText
                label="From $15"
                lineHeight={12 * 1.4}
                fontSize={12}
                fontFamily={fonts.medium}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <CustomText
              label="Edit"
              color={COLORS.black}
              fontSize={16}
              fontFamily={fonts.medium}
            />
            <Icons
              family="MaterialIcons"
              name="mode-edit"
              size={16}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
      <Divider thickness={4} />
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="Estimated Weight"
          fontSize={18}
          fontFamily={fonts.medium}
          marginBottom={12}
          lineHeight={18 * 1.4}
        />
        <CustomInput
          withLabel="AMOUNT (KG)"
          placeholder="45KG"
          error="Weight amount surpassing package option."
          marginBottom={4}
        />
      </View>
      <Divider thickness={4} />
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="Additional Remarks"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={12}
        />
        <CustomInput
          withLabel="ADD A REMARK (OPTIONAL)"
          placeholder="Enter your remark here"
          marginBottom={4}
          multiline={true}
          height={160}
        />
        <ErrorComponent errorTitle="0/500 Characters" />
      </View>
      <Divider thickness={4} />

      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="Contact"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={12}
        />
        <CustomPhoneInput
          withLabel="Phone Number"
          placeholder="XXX XXX XX"
          marginBottom={8}
          rightIcon={{
            source: Images.phone_num,
            style: [{ width: 14, height: 14 }],
            color: COLORS.lowPurple,
          }}
          value={phone}
          setValue={(text) => setPhone(text)}
        />
        <LocationInput
          withLabel="Email Address"
          placeholder="john@gmail.com"
          rightIcon={{
            source: Images.emailblue,
            style: styles.icon,
            color: COLORS.lowPurple,
          }}
          value={email}
          setValue={setEmail}
          marginBottom={6}
        />
        <ErrorComponent
          errorTitle={`This won’t be shared with your provider. It will be used\nto send you order confirmation and updates.`}
        />
      </View>
      <Divider thickness={4} />
      <View style={{ paddingHorizontal: 12 }}>
        <CustomText
          label="I Hereby Explicitly Confirm"
          fontSize={18}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
          marginBottom={12}
        />
        <View
          style={{
            width: "100%",
            height: 56,
            borderRadius: 12,
            padding: 12,
            backgroundColor: "#1212120A",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <View>
            <CustomText
              label="I HAVE NO ILLICIT GOODS"
              fontSize={12}
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              color="#121212A3"
            />
            <CustomText
              label="Yes"
              fontSize={16}
              lineHeight={16 * 1.4}
              fontFamily={fonts.medium}
            />
          </View>
          <CustomToggle
            activeColor={COLORS.black}
            inactiveColor={COLORS.gray5}
            value={true}
            setValue={() => {}}
          />
        </View>
        {[
          " • No WEAPON OF ANY SORT",
          " • No ILLICIT DRUGS",
          " • ANY OTHER ILLICIT GOODS BASED ON YOUR JURIDICTION",
        ].map((item) => (
          <CustomText
            key={item}
            label={item}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
            color="#121212A3"
            marginBottom={12}
          />
        ))}
      </View>
      <Divider thickness={4} marginVertical={0.1} />
      <View style={styles.footer}>
        <CustomButton
          title="Continue"
          onPress={() => navigation.navigate("ShippingSize")}
        />
        <CustomButton
          title="Save as Draft"
          backgroundColor={COLORS.inputBg}
          color={COLORS.black}
          marginTop={8}
        />
      </View>
    </ScreenWrapper>
  );
};

export default RequestDetail;

const styles = StyleSheet.create({
  icon: {
    width: 16,
    height: 16,
  },
  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  headingIcon: {
    width: 14,
    height: 14,
    marginBottom: 6,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    borderWidth: 1,
    borderColor: "#1212120A",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    width: 48,
    height: 48,
    tintColor: "#4347FF",
    borderRadius: 12,
    marginRight: 12,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  leftIcon: {
    backgroundColor: COLORS.lowPurple,
    borderRadius: 12,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBG: {
    width: 48,
    height: 48,
    backgroundColor: COLORS.inputBg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  bottomButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    backgroundColor: COLORS.inputBg,
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  footer: {
    padding: 12,
  },
});
