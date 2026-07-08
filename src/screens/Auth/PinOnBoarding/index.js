import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces"; // ✅ Import modal

const PinOnBoarding = ({ route }) => {
  const { state } = route?.params || {};
  const navigation = useNavigation();

  const [googleModalVisible, setGoogleModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <ScreenWrapper
      footerUnScrollable={() => (
        <View style={{ padding: 12, marginBottom: 24 }}>
          <CustomButton
            title="Create a PIN Code"
            marginBottom={8}
            leftView={
              <Image
                source={Images.lock2}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: "contain",
                  marginRight: 5,
                }}
              />
            }
            onPress={() => navigation.navigate("PinCode", { state })}
          />

          <CustomButton
            title="Later"
            backgroundColor={COLORS.cardColor}
            color={COLORS.white}
            fontFamily={fonts.medium}
            onPress={() =>
              navigation.navigate("GooglePlaces", { fromSignup: true })
            }
          />
        </View>
      )}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 30,
        }}
      >
        <ImageFast
          source={Images.number}
          style={{ height: 80, width: 80 }}
          resizeMode="contain"
        />
        <CustomText
          label="PIN Code"
          fontSize={32}
          marginTop={26}
          fontFamily={fonts.semiBold}
        />
        <CustomText
          label="Would you like to make your next login fast and highly secured?"
          color={COLORS.white2}
          textAlign="center"
          marginTop={12}
        />
      </View>
    </ScreenWrapper>
  );
};

export default PinOnBoarding;
