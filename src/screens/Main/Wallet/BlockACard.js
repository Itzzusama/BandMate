import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "../ParkingSettings/molecules/ToggleCard";
import CustomButton from "../../../components/CustomButton";
import { useNavigation, useRoute } from "@react-navigation/native";
import { put } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";

const BlockACard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const card = route?.params?.card;
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize toggle based on incoming card status
    if (card?.status === "BLOCKED") {
      setIsToggleOn(true);
    } else if (card?.status === "ACTIVE") {
      setIsToggleOn(false);
    }
  }, [card]);

  const handleUpdateStatus = async () => {
    if (!card?._id) {
      ToastMessage("Missing card id", "error");
      return;
    }
    try {
      setLoading(true);
      const body = { status: isToggleOn ? "BLOCKED" : "ACTIVE" };
      const res = await put(`virtual-cards/update-status/${card?._id}`, body);
      if (res?.data?.success) {
        ToastMessage("Card status updated", "success");
        navigation.goBack();
      } else {
        ToastMessage(res?.data?.message || "Failed to update status", "error");
      }
    } catch (e) {
      ToastMessage("Failed to update status", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsToggleOn(false);
    setOtp("");
    navigation.goBack();
  };
  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Block Card"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={loading ? "Updating..." : "Confirm"}
            onPress={handleUpdateStatus}
            disabled={loading}
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            marginTop={8}
            onPress={handleCancel}
          />
        </View>
      )}
    >
      <CustomText
        label={"Are you sure you want to block this card?"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        textTransform={"default"}
      />
      <CustomText
        label={
          "You can unlock your card at anytime. No one will be able to use this card when blocked."
        }
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        textTransform={"default"}
        marginBottom={10}
      />

      <ToggleCard
        label="Block this Card"
        switchValue={isToggleOn}
        setSwitchValue={() => setIsToggleOn(!isToggleOn)}
      />

      {/* PIN flow removed as per new requirement */}
    </ScreenWrapper>
  );
};

export default BlockACard;

const styles = StyleSheet.create({
  footer: {
    padding: 12,
    marginBottom: Platform.OS == "android" ? 12 : 20,
  },
  otpContainer: {
    marginTop: 16,
  },
});
