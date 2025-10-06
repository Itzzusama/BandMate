import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";
import { Images } from "../../../assets/images";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";

const CreateVC = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [cardName, setCardName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const nameError = useMemo(() => {
    const trimmed = cardName.trim();
    if (trimmed.length === 0) return "Please enter a card name";
    if (trimmed.length > 20) return "Name must be 20 characters or less";
    return "";
  }, [cardName]);

  const createVirtualCard = async () => {
    if (nameError) {
      return;
    }
    setLoading(true);

    try {
      // Optionally include name if API supports it in future
      const response = await post("virtual-cards", { name: cardName });
      if (response.data?.success) {
        setLoading(false);
        ToastMessage(response.data?.message, "success");
        navigation.goBack();
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      backgroundImage={Images.vcBg}
      headerUnScrollable={() => <Header title={"New Virtual Card"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={"Continue"}
            onPress={() => {
              setSubmitted(true);

              createVirtualCard();
            }}
            loading={loading}
            disabled={loading}
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.lightGray}
            color={COLORS.primaryColor}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <CustomText
        label={"Label Card"}
        fontSize={24}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
        marginTop={18}
      />
      <CustomText
        lineHeight={14 * 1.4}
        label={"Differentiate Virtual Cards with names."}
      />

      <CustomInput
        value={cardName}
        onChangeText={setCardName}
        withLabel={"NAME CARD"}
        marginTop={16}
        maxLength={20}
        cardInfo={`${cardName.length}/20 characters.`}
        error={submitted ? nameError : ""}
        autoCapitalize="words"
        placeholder="Enter card name"
      />
    </ScreenWrapper>
  );
};

export default CreateVC;

const styles = StyleSheet.create({
  footer: {
    padding: 12,
    gap: 8,
    marginBottom: Platform.OS == "ios" ? 90 : 0,
  },
});
