import { useState, useEffect } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import Border from "../../../components/Border";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { get, post } from "../../../services/ApiRequest";
import { ToastMessage } from "../../../utils/ToastMessage";
import ToggleCard from "../ParkingSettings/molecules/ToggleCard";

const SetupBudget = ({ navigation }) => {
  const userData = useSelector((state) => state.users.userData);
  const [budget, setBudget] = useState("4,000");
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [startingDate, setStartingDate] = useState(new Date("2025-07-01"));
  const [selectedCard, setSelectedCard] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(false);
  const [byCategoryEnabled, setByCategoryEnabled] = useState(false);
  const [categoryBudget, setCategoryBudget] = useState(null);

  const periodOptions = ["Weekly", "Monthly", "Daily"];

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    if (!userData?._id) return;

    try {
      setCardsLoading(true);
      const res = await get(`virtual-cards`);

      if (res?.data?.success) {
        setCards(res?.data?.data || []);
      } else {
        ToastMessage("Failed to load cards", "error");
      }
    } catch (error) {
      ToastMessage("Failed to load cards", "error");
    } finally {
      setCardsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!selectedCard) {
      ToastMessage("Please select a card", "error");
      return;
    }

    if (!budget || budget.trim() === "") {
      ToastMessage("Please enter budget amount", "error");
      return;
    }

    const budgetAmount = parseFloat(budget.replace(/,/g, ""));
    if (isNaN(budgetAmount) || budgetAmount <= 0) {
      ToastMessage("Please enter a valid budget amount", "error");
      return;
    }

    try {
      setLoading(true);
      const body = {
        budget: {
          resetPeriod: selectedPeriod.toUpperCase(),
          amount: budgetAmount,
          periodStart: startingDate.toISOString(),
        },
      };

      // If user enabled category budgets and we have one, include it
      if (byCategoryEnabled && categoryBudget) {
        body.budget.setBudgetByCategory = categoryBudget;
      }

      const res = await post(
        `virtual-cards/set-card-budget/${selectedCard}`,
        body
      );
      console.log("respons---->", res.data);

      if (res?.data?.success) {
        ToastMessage("Budget set successfully", "success");
        navigation.goBack();
      } else {
        ToastMessage(res?.data?.message || "Failed to set budget", "error");
      }
    } catch (error) {
      ToastMessage("Failed to set budget", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Set Your Budget"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={loading ? "Setting Budget..." : "Continue"}
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      )}
    >
      <CustomText
        label={"Set Your Budget"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
        marginTop={20}
      />
      <CustomText
        label={
          "Define how much you want to spend on weekly, or monthly basis. You can define your personal budget here below:"
        }
        color={COLORS.gray1}
        fontSize={14}
        lineHeight={14 * 1.4}
        marginBottom={32}
      />

      <CustomText
        label={"Details"}
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        marginBottom={16}
      />

      <CustomInput
        withLabel={"SET BUDGET"}
        placeholder={"4,000"}
        value={budget}
        onChangeText={setBudget}
        keyboardType="numeric"
        containerStyle={styles.budgetContainer}
        inputStyle={styles.budgetInput}
        labelStyle={styles.budgetLabel}
        rightText="Cr"
        rightTextStyle={styles.currencyText}
      />

      <View style={[styles.row, { marginBottom: 12 }]}>
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

      <CustomDropdown
        withLabel={"PERIOD"}
        placeholder="Monthly"
        data={periodOptions}
        value={selectedPeriod}
        setValue={setSelectedPeriod}
        marginBottom={6}
      />

      <CustomDropdown
        withLabel={"SELECT CARD"}
        placeholder="Select a card"
        data={cards.map((card) => card.name)}
        value={cards.find((card) => card.name === selectedCard)?.name || ""}
        setValue={(value) => {
          const card = cards.find((card) => card.name === value);
          setSelectedCard(card?._id || "");
        }}
        marginBottom={6}
        loading={cardsLoading}
      />

      <View style={[styles.row, { marginBottom: 12 }]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />
        <CustomText
          label={`Resets on the 1st of each month.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
      </View>

      <CustomDatePicker
        withLabel={"STARTING ON"}
        value={startingDate}
        setValue={setStartingDate}
        placeholder="Select Date"
        type="date"
        isIcon={true}
      />

      <Border marginVertical={16} />

      <ToggleCard
        label="Set budget by category"
        switchValue={byCategoryEnabled}
        setSwitchValue={() => setByCategoryEnabled(!byCategoryEnabled)}
      />
      {byCategoryEnabled && (
        <TouchableOpacity
          style={styles.categoryContainer}
          onPress={() =>
            navigation.navigate("BudgetByCategory", {
              onSelectCategoryBudget: (mapping) => setCategoryBudget(mapping),
            })
          }
        >
          <View style={styles.categoryContent}>
            <View style={styles.categoryIconContainer}>
              <ImageFast
                source={PNGIcons.WalletCategory}
                style={{ height: 32, width: 32 }}
              />
            </View>
            <CustomText
              label={"Set by Category"}
              lineHeight={16 * 1.4}
              fontSize={16}
              fontFamily={fonts.medium}
              color={COLORS.black}
              marginLeft={12}
            />
          </View>
          <Icons
            name={"chevron-right"}
            family={"Feather"}
            size={20}
            color={COLORS.gray2}
          />
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
};

export default SetupBudget;

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: COLORS.white,
    marginBottom: Platform.OS == "ios" ? 20 : 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  budgetContainer: {
    marginBottom: 8,
  },
  budgetInput: {
    fontSize: 32,
    fontFamily: fonts.semiBold,
    color: COLORS.black,
  },
  budgetLabel: {
    fontSize: 12,
    color: COLORS.gray4,
    fontFamily: fonts.medium,
    textTransform: "uppercase",
  },
  currencyText: {
    fontSize: 32,
    fontFamily: fonts.semiBold,
    color: COLORS.black,
  },

  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    height: 56,
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
  },
});
