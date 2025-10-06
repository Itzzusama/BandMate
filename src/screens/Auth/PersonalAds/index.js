import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import React, { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";

import { put } from "../../../services/ApiRequest";
import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const PersonalAds = ({ route }) => {
  const navigation = useNavigation();
  const push = route.params?.push;
  const [loading, setLoading] = useState(false);
  const onContinue = async () => {
    try {
      setLoading(true);
      const res = await put("user/profile", {
        notificationPreferences: {
          push: push,
          email: false,
          sms: false,
        },
        allowdPersonalizedAds: true,
      });
      if (res?.data) {
        navigation.navigate("OnBoarding3");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      paddingHorizontal={24}
      backgroundImage={Images.addBG}
      imageBottom={0}
      footerUnScrollable={() => (
        <View style={{ padding: 14, marginBottom: 20 }}>
          <CustomButton
            title="Continue"
            marginBottom={8}
            onPress={onContinue}
            loading={loading}
            isBoarder
            secondBorderColor={COLORS.gray2}
          />
          <CustomButton
            title="Maybe Later"
            backgroundColor="#1212120A"
            color={COLORS.primaryColor}
            onPress={() => navigation.navigate("OnBoarding3")}
            disabled={loading}
          />
        </View>
      )}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ImageFast
          source={Images.Switch}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
        <CustomText
          label={`Allowed\n personalized ads`}
          fontSize={32}
          lineHeight={28 * 1.4}
          marginTop={12}
          fontFamily={fonts.semiBold}
          textAlign="center"
        />
        <View style={{width:"80%"}}>

        <CustomText
          label={
            "We care about your privacy and want to maximize your chances of coming across products or services that appeal to you."
          }
          color={COLORS.gray1}
          textAlign="center"
          marginTop={10}
        />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default PersonalAds;

const styles = StyleSheet.create({});
