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
            rightIcon={
              <Image
                source={Images.lock2}
                style={{
                  width: 18,
                  height: 18,
                  resizeMode: "contain",
                  marginLeft: 5,
                }}
              />
            }
            onPress={() => navigation.navigate("PinCode", { state })}
          />

          <CustomButton
            title="Later"
            backgroundColor={COLORS.cardColor}
            color={COLORS.white}
            onPress={() => setGoogleModalVisible(true)}
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
          lineHeight={32 * 1.4}
          marginTop={26}
          fontFamily={fonts.semiBold}
        />
        <CustomText
          label="Would you like to make your next login fast and highly secured?"
          color={COLORS.gray1}
          textAlign="center"
          marginTop={12}
          lineHeight={14 * 1.4}
        />
      </View>

      <CustomModalGooglePlaces
        isVisible={googleModalVisible}
        onClose={() => {
          setGoogleModalVisible(false);
          navigation.navigate("Success");
        }}
        onLocationSelect={(location) => {
          console.log("Selected location:", location);
          setSelectedLocation(location);
          setGoogleModalVisible(false);
          navigation.navigate("Success");
        }}
        initialValue={selectedLocation?.address || ""}
      />
    </ScreenWrapper>
  );
};

export default PinOnBoarding;
