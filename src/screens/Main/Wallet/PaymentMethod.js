import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const PaymentMethod = ({ navigation }) => {
  const handlePaymentMethodSelect = (method) => {
    switch (method) {
      case "card":
        navigation.navigate("AddCreditCard");
        break;
      case "bank":
        navigation.navigate("BankDetail");
        break;
      case "apple":
        // Handle Apple Pay connection
        break;
    }
  };

  const handleContinue = () => {
    // Handle continue logic
    console.log("Continue pressed");
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Payment Method"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton title={"Continuer"} onPress={handleContinue} />
        </View>
      )}
    >
      <CustomText
        label={"Payment Methods"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
        marginBottom={4}
      />
      <CustomText
        label={"Add your favorite payment method from the options below."}
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={32}
      />

      {/* Credit/Debit Card Option */}
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentMethodSelect("card")}
        activeOpacity={0.7}
      >
        <View style={styles.optionContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <ImageFast
              source={PNGIcons.cardPurple}
              resizeMode={"contain"}
              style={styles.iconContainer}
            />
            <CustomText
              label={"Add A Debit/Credit Card"}
              fontFamily={fonts.semiBold}
              fontSize={16}
              lineHeight={16 * 1.4}
              marginBottom={4}
            />
          </View>
          <View style={styles.textContainer}>
            <CustomText
              label={
                "Link a credit card to refill your account easily. Might include credit card fees from your provider."
              }
              color={COLORS.gray1}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginBottom={8}
            />
            <View style={styles.feeTag}>
              <Icons
                name="info"
                family="Feather"
                size={10}
                color={COLORS.gray2}
                marginRight={4}
              />
              <CustomText
                label={"~5.5% fees"}
                color={COLORS.gray2}
                fontSize={10}
                lineHeight={10 * 1.4}
                fontFamily={fonts.medium}
              />
            </View>
          </View>
        </View>
        <ImageFast
          source={PNGIcons.forward}
          style={{ height: 24, width: 24 }}
        />
      </TouchableOpacity>

      {/* Bank Account Option */}
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentMethodSelect("bank")}
        activeOpacity={0.7}
      >
        <View style={styles.bankAppleContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <ImageFast
              source={PNGIcons.bankConnect}
              resizeMode={"contain"}
              style={styles.iconContainer}
            />
            <CustomText
              label={"Connect a bank account"}
              fontFamily={fonts.semiBold}
              fontSize={16}
              lineHeight={16 * 1.4}
              marginBottom={4}
            />
          </View>

          <View style={styles.textContainer}>
            <CustomText
              label={"Link a bank account to refill your account easily."}
              color={COLORS.gray1}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <ImageFast
            source={PNGIcons.forward}
            style={{ height: 24, width: 24 }}
          />
        </View>
      </TouchableOpacity>

      {/* Apple Pay Option */}
      <TouchableOpacity
        style={styles.paymentOption}
        onPress={() => handlePaymentMethodSelect("apple")}
        activeOpacity={0.7}
      >
        <View style={styles.bankAppleContent}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <ImageFast
              source={PNGIcons.applePay}
              style={{ height: 20, width: 29, marginRight: 8 }}
            />
            <CustomText
              label={"Connect Apple Pay"}
              fontFamily={fonts.semiBold}
              fontSize={16}
              lineHeight={16 * 1.4}
            />
          </View>
          <View style={styles.textContainer}>
            <CustomText
              label={"Use Apple Pay to pay for services."}
              color={COLORS.gray1}
              fontSize={12}
              lineHeight={12 * 1.4}
            />
          </View>
        </View>
        <View style={styles.arrowContainer}>
          <ImageFast
            source={PNGIcons.forward}
            style={{ height: 24, width: 24 }}
          />
        </View>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F6f6f6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  optionContent: {
    // flexDirection: "row",
    // alignItems: "center",
    // flex: 1,
  },
  bankAppleContent: {
    // flexDirection: "row",
    // alignItems: "center",
    // flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  applePayContainer: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray3,
  },
  plusIcon: {
    position: "absolute",
    top: -2,
    right: -2,
  },
  textContainer: {
    // flex: 1,
  },
  feeTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ededed",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  arrowContainer: {
    marginLeft: 12,
  },
});
