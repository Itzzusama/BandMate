import React, { useState } from "react";
import { View, Alert } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { useNavigation, useRoute } from "@react-navigation/native";
import PhotosCover from "./molecules/PhotosCover";

const Branding = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventData } = route?.params;
  const [media, setMedia] = useState([]);

  const handleContinue = () => {
    if (media.length === 0) {
      Alert.alert("Add at least one photo", "Please upload a cover photo.");
      return;
    }

    navigation.navigate("FoodBeverage", { media, isMedia: true, eventData });
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <>
          <Header title={"New event"} />
          <View style={{ marginHorizontal: 12 }}>
            <AuthSlider
              min={2}
              max={3}
              gap={4}
              marginTop={8}
              marginBottom={7}
            />
          </View>
        </>
      )}
      footerUnScrollable={() => (
        <View style={{ padding: 12, marginBottom: 24 }}>
          <CustomButton
            title="Continue"
            marginBottom={8}
            onPress={handleContinue}
          />

          <CustomButton
            title="Save As Draft"
            backgroundColor={COLORS.cardColor}
            color={COLORS.white}
          />
        </View>
      )}
      scrollEnabled
    >
      <CustomText
        label={"Branding"}
        fontSize={24}
        fontFamily={fonts.semiBold}
        lineHeight={24 * 1.4}
        marginTop={8}
      />

      <CustomText
        label={
          "Please inform your Event’s details as accurately as possible here below:"
        }
        fontSize={14}
        lineHeight={14 * 1.4}
        color={COLORS.white2}
        marginBottom={16}
      />

      <PhotosCover media={media} setMedia={setMedia} />
    </ScreenWrapper>
  );
};

export default Branding;
