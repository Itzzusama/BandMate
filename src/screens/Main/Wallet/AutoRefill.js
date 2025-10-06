import { useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import AmountSelectionButtons from "../../../components/AmountSelectionButtons";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import WalletInput from "../../../components/WalletInput";
import { COLORS } from "../../../utils/COLORS";
import ToggleCard from "../MoveOut/molecules/ToggleCard";
import Divider from "../../../components/Divider";

const AutoRefill = ({ navigation }) => {
  const [automaticRefillEnabled, setAutomaticRefillEnabled] = useState(false);
  const [programmedRefillEnabled, setProgrammedRefillEnabled] = useState(false);
  const [customAmount1, setCustomAmount1] = useState("15.00");
  const [selectedAmount1, setSelectedAmount1] = useState("$25");
  const [customAmount2, setCustomAmount2] = useState("15.00");
  const [selectedAmount2, setSelectedAmount2] = useState("$25");
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");

  const multiAmounts = ["$25", "$50", "$100", "$250", "$500"];
  const periodOptions = ["Weekly", "Monthly", "Quarterly"];

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Automatic Refill"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={"Automatic Refill"}
            onPress={() => navigation.goBack()}
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
        label={"Set Automatic Refill"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={
          "Define how much you want to refill when your balance falls below $15."
        }
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={20}
      />

      <ToggleCard
        label1={"Enable"}
        isEnabled={automaticRefillEnabled}
        setIsEnabled={setAutomaticRefillEnabled}
      />

      {automaticRefillEnabled && (
        <View style={styles.refillSection}>
          <WalletInput
            withLabel={"CUSTOM AMOUNT"}
            placeholder={"15.00"}
            value={customAmount1}
            onChangeText={(text) => setCustomAmount1(text)}
            keyboardType="numeric"
            showCurrencySymbol={true}
            currencySymbol="$"
            currencySymbolColor={COLORS.black}
            currencySymbolFontSize={40}
            inputFontSize={40}
            borderRadius={16}
          />

          <AmountSelectionButtons
            amounts={multiAmounts}
            selectedAmount={selectedAmount1}
            onSelectAmount={setSelectedAmount1}
            onCustomAmountChange={setCustomAmount1}
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
              color={COLORS.gray1}
              marginTop={2}
              fontFamily={fonts.regular}
            />
          </View>

          <View style={[styles.row, { marginTop: 4 }]}>
            <Icons
              name={"info"}
              family={"Feather"}
              size={12}
              marginRight={4}
              color={COLORS.gray2}
            />
            <CustomText
              label={`Last month expenses: `}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
              fontFamily={fonts.regular}
            />
            <CustomText
              label={`80,700 (SC) Sola Credits.`}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.darkPurple}
              fontFamily={fonts.medium}
            />
          </View>
        </View>
      )}

      <Divider marginVertical={20} />

      <CustomText
        label={"Set Programmed Refill"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
      />
      <CustomText
        label={
          "Define how much you want to refill each week or each month for your own spending."
        }
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={20}
      />

      <ToggleCard
        label1={"Enable"}
        isEnabled={programmedRefillEnabled}
        setIsEnabled={setProgrammedRefillEnabled}
      />

      {programmedRefillEnabled && (
        <View style={styles.refillSection}>
          <WalletInput
            withLabel={"CUSTOM AMOUNT"}
            placeholder={"15.00"}
            value={customAmount2}
            onChangeText={(text) => setCustomAmount2(text)}
            keyboardType="numeric"
            showCurrencySymbol={true}
            currencySymbol="$"
            currencySymbolColor={COLORS.black}
            currencySymbolFontSize={40}
            inputFontSize={40}
            borderRadius={16}
          />

          <AmountSelectionButtons
            amounts={multiAmounts}
            selectedAmount={selectedAmount2}
            onSelectAmount={setSelectedAmount2}
            onCustomAmountChange={setCustomAmount2}
            containerStyle={{ marginTop: -2 }}
          />

          <View style={[styles.row, { marginTop: 6 }]}>
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
              color={COLORS.gray1}
              marginTop={2}
              fontFamily={fonts.regular}
            />
          </View>

          <View style={[styles.row]}>
            <Icons
              name={"info"}
              family={"Feather"}
              size={12}
              marginRight={4}
              color={COLORS.gray2}
            />
            <CustomText
              label={`Last month expenses: `}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
              marginTop={2}
              fontFamily={fonts.regular}
            />
            <CustomText
              label={`80,700 (SC) Sola Credits.`}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.darkPurple}
              fontFamily={fonts.medium}
              marginTop={2}
            />
          </View>

          <Divider marginVertical={20} />

          <CustomDropdown
            withLabel={"PERIOD"}
            placeholder="Monthly"
            data={periodOptions}
            value={selectedPeriod}
            setValue={setSelectedPeriod}
            containerStyle={{ marginTop: 20 }}
          />

          <View style={[styles.row, { marginTop: -10, marginBottom: 20 }]}>
            <Icons
              name={"info"}
              family={"Feather"}
              size={12}
              marginRight={4}
              color={COLORS.gray2}
            />
            <CustomText
              label={`Refill will occur on the 1st day of each month`}
              fontSize={12}
              lineHeight={12 * 1.4}
              color={COLORS.gray1}
              marginTop={2}
              fontFamily={fonts.regular}
            />
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default AutoRefill;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  footer: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    marginBottom: Platform.OS == "ios" ? 20 : 0,
  },
  refillSection: {
    marginTop: 16,
  },
});
