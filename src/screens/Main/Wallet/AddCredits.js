import { useMemo, useState } from "react";
import {
  Alert,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import AmountSelectionButtons from "../../../components/AmountSelectionButtons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import WalletInput from "../../../components/WalletInput";
import { COLORS } from "../../../utils/COLORS";
import { post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const AddCredits = ({ navigation, route }) => {
  const card = route?.params?.card;
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const multiAmounts = ["$25", "$50", "$100", "$250", "$500"];

  const parsedAmount = useMemo(() => {
    const raw = customAmount || selectedAmount;
    if (!raw) return 0;
    const numeric = Number(String(raw).replace(/[^0-9.]/g, ""));
    return Number.isFinite(numeric) ? numeric : 0;
  }, [customAmount, selectedAmount]);

  const validate = () => {
    if (!card?._id) {
      ToastMessage("No selected card.", "error");
      return false;
    }
    if (!parsedAmount || parsedAmount <= 0) {
      ToastMessage("Enter a valid amount greater than $0", "error");
      return false;
    }
    return true;
  };

  const submitTopUp = async (paymentIntent) => {
    try {
      setLoading(true);
      const body = {
        cardId: card._id,
        amount: parsedAmount,
        paymentIntentId: paymentIntent,
      };

      const res = await post("virtual-cards/payment", body);
      if (res?.data?.success) {
        ToastMessage(res?.data?.message || "Payment requested", "success");
        navigation.goBack();
      } else {
        ToastMessage(res?.data?.message || "Request failed", "error");
      }
    } catch (e) {
      ToastMessage("Request failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const openPaymentSheet = async (paymentId, paymentIntent) => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(false);
    } else {
      console.log("paymentId---->", paymentIntent);
      submitTopUp(paymentIntent);
      // acceptRequest(paymentId);
    }
  };

  const onRequestPress = async () => {
    setLoading(true);
    if (!validate()) return;

    try {
      const body = {
        amount: parsedAmount,
        currency: "USD",
      };

      const res = await post("virtual-cards/create-stripe-paymentIntent", body);

      const { customer, ephemeralKey, paymentId, paymentIntent } =
        res.data?.data;
      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "Move, Inc.",
        allowsDelayedPaymentMethods: false,
        // returnURL: "https://move.sola-group.ch/api/",
      });
      if (!error) {
        openPaymentSheet(paymentId, paymentIntent);
      } else {
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      ToastMessage(error?.response?.data?.message || "Error");
      console.log("error here------123", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Add Credits"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={"Top Up Credits Now"}
            onPress={onRequestPress}
            loading={loading}
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            marginTop={8}
            onPress={() => navigation.goBack()}
          />
        </View>
      )}
    >
      <CustomText
        marginTop={16}
        label={"Top up!"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
      />
      <CustomText
        label={"You don’t have any messages yet."}
        color={COLORS.gray1}
        fontFamily={fonts.regular}
        fontSize={14}
        lineHeight={14 * 1.4}
      />
      <ImageBackground
        source={Images.cardCover}
        style={{ width: "100%", height: 200, marginTop: 20, marginBottom: 6 }}
      >
        <View style={styles.item}>
          <View>
            <CustomText
              label={card?.name || "Virtual"}
              fontFamily={fonts.medium}
              fontSize={32}
              lineHeight={32 * 1.4}
              color={COLORS.white}
            />
            <CustomText
              label={card?.details?.cardNumber || "Card Number"}
              fontSize={16}
              lineHeight={16 * 1.4}
              color={COLORS.white}
            />
          </View>
          <View>
            <CustomText
              label={"CVV: " + (card?.details?.cvv || "***")}
              fontFamily={fonts.regular}
              lineHeight={16 * 1.4}
              fontSize={16}
              color={COLORS.white}
            />
            <CustomText
              label={
                "Expiry: " +
                (card?.details?.expiryDate
                  ? String(card.details.expiryDate)
                  : "Never")
              }
              fontFamily={fonts.regular}
              fontSize={16}
              lineHeight={16 * 1.4}
              color={COLORS.white}
            />
          </View>
        </View>
      </ImageBackground>

      <View style={[styles.row]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />

        <CustomText
          label={`Selected card:`}
          lineHeight={12 * 1.4}
          fontSize={12}
          color={COLORS.gray2}
          fontFamily={fonts.regular}
        />
        <CustomText
          label={`${card?.name || "Virtual"}`}
          lineHeight={12 * 1.4}
          fontSize={12}
          color={COLORS.darkPurple}
          fontFamily={fonts.medium}
          marginLeft={2}
        />
      </View>

      <WalletInput
        withLabel={"Custom Amount"}
        placeholder={"15.00"}
        value={customAmount}
        onChangeText={(text) => setCustomAmount(text)}
        keyboardType="numeric"
        marginTop={20}
        showCurrencySymbol={true}
        currencySymbol="$"
        currencySymbolColor={COLORS.black}
        currencySymbolFontSize={40}
        inputFontSize={40}
        borderRadius={16}
      />

      <AmountSelectionButtons
        amounts={multiAmounts}
        selectedAmount={selectedAmount}
        onSelectAmount={setSelectedAmount}
        onCustomAmountChange={setCustomAmount}
        containerStyle={{ marginTop: -2 }}
      />

      <View style={[styles.row, { marginTop: 8 }]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />

        <CustomText
          label={`Define how much you want to refill.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray2}
          fontFamily={fonts.regular}
        />
      </View>
    </ScreenWrapper>
  );
};

export default AddCredits;

const styles = StyleSheet.create({
  item: {
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
    height: 200,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  footer: {
    paddingHorizontal: 12,
    marginVertical: 12,
    backgroundColor: COLORS.white,
    paddingBottom: Platform.OS == "ios" ? 20 : 0,
  },
});
