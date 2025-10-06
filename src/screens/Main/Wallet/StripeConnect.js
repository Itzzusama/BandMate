import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "../../../utils/constants";

import WebView from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastMessage } from "../../../utils/ToastMessage";
import { COLORS } from "../../../utils/COLORS";
import { get, post } from "../../../services/ApiRequest";
import { getProfile } from "../../../utils/constants";

const StripeConnect = () => {
  const isFocus = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { userData } = useSelector((state) => state.users);

  const [accountLink, setAccountLink] = useState("");
  const [webView, showWebview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const token = useSelector((state) => state.authConfig.token);

  const createAccount = async () => {
    setLoading(true);
    try {
      const response = await get(
        `virtual-cards/create-stripe-account?token=${token}`
      );

      setAccountLink(response.data?.data?.url);
      showWebview(true);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (!userData?.accountId_verified) {
      createAccount();
    }
  }, [isFocus]);

  const handleVerifyUser = async (accountId) => {
    try {
      const response = await get("virtual-cards/verify-stripe-account");
      console.log("response===>", response.data);

      if (response.data?.success) {
        dispatch(getProfile());
        ToastMessage("Stripe verified successfully!");
        showWebview(false);
        navigation.replace("WithdrawCredits");
      } else {
        ToastMessage("User not verified!");
        console.log("Verification failed.");
        navigation.goBack();
      }
    } catch (error) {
      console.log("erooo---", error);
    }
  };

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    if (url.includes("account_id")) {
      const accountId = extractAccountIdFromUrl(url);
      handleVerifyUser(accountId); // Call the verification function with the extracted account ID
    }
  };

  const extractAccountIdFromUrl = (url) => {
    const accountId = url.split("account_id=")[1]?.split("&")[0]; // Modify this based on your URL structure
    return accountId?.trim();
  };

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      headerUnScrollable={() => <Header title={"Make Stripe Account"} />}
    >
      {webView && (
        <>
          {loading && (
            <ActivityIndicator
              size="large"
              color={COLORS.primaryColor}
              style={{
                marginTop: 50,
              }}
            />
          )}
          <WebView
            source={{ uri: accountLink }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={handleNavigationStateChange}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default StripeConnect;

const styles = StyleSheet.create({});
