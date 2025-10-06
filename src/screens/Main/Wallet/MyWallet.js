import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

// Import molecules
import { useIsFocused, useNavigation } from "@react-navigation/native";
import CurrencyRepartition from "./molecules/CurrencyRepartition";
import LatestTransactions from "./molecules/LatestTransactions";
import ScheduledPayments from "./molecules/ScheduledPayments";
import SubscriptionCard from "./molecules/SubscriptionCard";
import { ToastMessage } from "../../../utils/ToastMessage";
import TreasurySection from "./molecules/TreasurySection";
import { PNGIcons } from "../../../assets/images/icons";
import ControlSection from "./molecules/ControlSection";
import ImageFast from "../../../components/ImageFast";
import TransferItem from "./molecules/TransferItem";
import WalletHeader from "./molecules/WalletHeader";
import { get } from "../../../services/ApiRequest";
import BalanceCard from "./molecules/BalanceCard";
import VirtualCard from "./molecules/VirtualCard";
import TopTab from "../../../components/TopTab";
import Icons from "../../../components/Icons";
import GiftCard from "./molecules/GiftCard";
import { getProfile } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setTotalBalance } from "../../../store/reducer/usersSlice";
import NoDataFound from "../../../components/NoDataFound";
import { Images } from "../../../assets/images";
import RefugeCard from "./molecules/RefugeCard";

const MyWallet = () => {
  const isFocus = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [vcCards, setVcCards] = useState([]);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const userData = useSelector((state) => state.users.userData);
  const { totalWalletBalance } = useSelector((state) => state.users);

  const AVATAR_SIZE_RECENT = 72;
  const AVATAR_SIZE_LIST = 48;

  const getVcCard = async () => {
    try {
      const response = await get("virtual-cards");

      if (response.data.success) {
        const apiCards = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        setVcCards(apiCards);
      } else {
        ToastMessage("No Card Found", "error");
      }
    } catch (error) {
      ToastMessage("No Card Found", "error");
    }
  };

  const getRecentTransactions = async () => {
    try {
      const response = await get("transactions/recent?limit=15");
      if (response?.data?.success) {
        const apiTxns = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];
        setRecentTransactions(apiTxns);
      } else {
        setRecentTransactions([]);
      }
    } catch (error) {
      setRecentTransactions([]);
    }
  };

  const totalBalance = useMemo(() => {
    const sum = vcCards.reduce((accumulator, card) => {
      const rawBalance =
        (card?.balance && (card.balance.$numberDecimal || card.balance)) || 0;
      const numericBalance = Number(rawBalance);
      return accumulator + (isNaN(numericBalance) ? 0 : numericBalance);
    }, 0);

    const fixed = Number(sum).toFixed(2);
    const formatted = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Dispatch here
    dispatch(setTotalBalance(formatted));

    // Return formatted value for usage
    return formatted;
  }, [vcCards, dispatch]);

  useEffect(() => {
    getVcCard();
    getRecentTransactions();
  }, [isFocus]);

  return (
    <ScreenWrapper
      scrollEnabled
      translucent
      paddingHorizontal={0.1}
      backgroundColor="#202020"
    >
      <WalletHeader
        balance={totalWalletBalance}
        onWithdraw={() =>
          userData?.stripeAccountVerified
            ? navigation.navigate("WithdrawCredits")
            : navigation.navigate("StripeConnect")
        }
      />

      <View style={styles.container}>
        {/* Balance Cards */}
        <View style={styles.balanceCardsContainer}>
          <BalanceCard
            title="Available funds"
            amount="$1030.75"
            subtitle="1,160.62 Cr"
          />
          <BalanceCard
            title="Pending funds"
            amount="$2664.30"
            subtitle="3,000.00 Cr"
            isActive={true}
          />
        </View>

        {/* My Balance Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CustomText
              label="My Balance"
              fontFamily={fonts.semiBold}
              fontSize={20}
              lineHeight={20 * 1.4}
              color={COLORS.primaryColor}
            />
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderRadius: 99,
                height: 32,
                width: 32,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#EBEAEC",
              }}
              onPress={() => navigation.navigate("RequestCredit")}
              // onPress={() => navigation.navigate("CreateVC")}
              // onPress={() => navigation.navigate("PaymentMethod")}
            >
              <CustomText
                label="+"
                fontSize={16}
                color={COLORS.primaryColor}
                lineHeight={16 * 1.4}
              />
            </TouchableOpacity>
          </View>

          {/* Virtual Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.cardsScrollView}
          >
            {vcCards.map((card, index) => {
              const balanceDecimal =
                (card?.balance &&
                  (card.balance.$numberDecimal || card.balance)) ||
                0;
              const balanceString = `${Number(balanceDecimal).toFixed(2)}`;
              const name = card?.name || "Virtual";
              const icon = `${String(name).charAt(0).toUpperCase()}.`;
              const expiry = card?.details?.expiryDate
                ? "" + card.details.expiryDate
                : "Never";
              const colors =
                index % 3 === 0
                  ? ["#1430FA", "#007BFF", "#007BFF"]
                  : index % 3 === 1
                  ? ["#37B874", "#37B874", "#64CD75"]
                  : ["#4D2292", "#4D2292", "#7272B5"];

              return (
                <VirtualCard
                  key={card?._id || `${name}-${index}`}
                  type={name}
                  balance={balanceString}
                  currency="SC"
                  expiryDate={expiry}
                  colors={colors}
                  icon={icon}
                  selected={selectedCardId === card?._id}
                  onPress={() => setSelectedCardId(card?._id)}
                />
              );
            })}
          </ScrollView>

          {/* Card Action Buttons */}
          <View style={styles.cardActions}>
            <TouchableOpacity
              onPress={() => navigation.navigate("CreateVC")}
              style={styles.actionButton}
            >
              <CustomText
                label="+"
                fontFamily={fonts.medium}
                fontSize={16}
                lineHeight={16 * 1.4}
                color={COLORS.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const selected =
                  vcCards.find((c) => c?._id === selectedCardId) || vcCards[0];
                if (!selected) {
                  ToastMessage("No Card Found", "error");
                  return;
                }
                navigation.navigate("SendCredits", { card: selected });
              }}
              style={styles.actionButton}
            >
              <Icons
                name={"arrow-up"}
                family={"Feather"}
                color={COLORS.primaryColor}
                size={16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const selected =
                  vcCards.find((c) => c?._id === selectedCardId) || vcCards[0];
                if (!selected) {
                  ToastMessage("No Card Found", "error");
                  return;
                }
                navigation.navigate("AddCredits", { card: selected });
              }}
              style={styles.actionButton}
            >
              <Icons
                name={"arrow-down"}
                family={"Feather"}
                color={COLORS.primaryColor}
                size={16}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                const selected =
                  vcCards.find((c) => c?._id === selectedCardId) || vcCards[0];
                if (!selected) {
                  ToastMessage("No Card Selected", "error");
                  return;
                }
                navigation.navigate("BlockACard", { card: selected });
              }}
              style={[styles.actionButton, styles.deleteButton]}
            >
              <ImageFast
                source={PNGIcons.block}
                style={{ height: 16, width: 16 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={[1, 2, 3]}
          horizontal
          ListEmptyComponent={() => (
            <NoDataFound title={"No Transaction Found"} />
          )}
          keyExtractor={(item) => String(item)}
          renderItem={({ item, index }) => <RefugeCard isChange={index == 1} />}
        />

        {/* Recent Transfers */}
        <View
          style={[
            styles.section,
            { paddingHorizontal: 12, paddingBottom: 0.1 },
          ]}
        >
          <CustomText
            label="Recent Transfers"
            fontFamily={fonts.semiBold}
            fontSize={20}
            lineHeight={20 * 1.4}
            color={COLORS.primaryColor}
            marginBottom={8}
          />

          <FlatList
            data={[1, 2, 3]}
            horizontal
            ListEmptyComponent={() => (
              <NoDataFound title={"No Transaction Found"} />
            )}
            keyExtractor={(item) => String(item)}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.85}
                style={{
                  marginRight: 12,
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Image
                  source={{
                    uri:
                      item?.avatarUri ||
                      "https://picsum.photos/seed/" + item + "/100",
                  }}
                  style={{ height: 64, width: 64, borderRadius: 99 }}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 8,
                  }}
                >
                  <CustomText
                    label={"Friend"}
                    fontFamily={fonts.medium}
                    fontSize={10}
                    lineHeight={10 * 1.4}
                  />
                  <ImageFast
                    source={Images.verifyStar}
                    style={{ height: 10, width: 10, marginLeft: 2 }}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Treasury Section */}
        <TreasurySection incomes outcomes />

        {/* Control Section */}
        <ControlSection />

        {/* Currency Repartition */}
        <CurrencyRepartition
          onPress={() => console.log("Currency repartition pressed")}
        />

        {/* Latest Transactions */}

        <LatestTransactions />

        {/* Credit Actions */}
        {/* <View style={styles.section}>
          <CreditActionCard
            icon="arrow-down"
            title="Credits withdrawal"
            amount="$6.99"
            subtitle="Get it now!"
            backgroundColor={COLORS.black}
            onPress={() => navigation.navigate("WithdrawCredits")}
          />
          <CreditActionCard
            icon="arrow-up"
            title="Credits Refill"
            amount="$6.99"
            subtitle="Get it now!"
            backgroundColor={COLORS.black}
            onPress={() => navigation.navigate("AddCredits")}
          />
        </View> */}

        {/* Gift Cards */}
        <GiftCard onPress={() => console.log("Gift card pressed")} />

        {/* My Subscriptions */}
        <SubscriptionCard onPress={() => console.log("Subscription pressed")} />

        {/* Scheduled Payments */}
        <ScheduledPayments />

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  balanceCardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 8,
    gap: 6,
  },
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 20,
    padding: 8,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  cardsScrollView: {
    marginBottom: 16,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actionButton: {
    width: 80,
    height: 32,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    backgroundColor: "#FCD9E1",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: COLORS.black,
  },
  bottomSpacing: {
    height: 20,
  },
});

export default MyWallet;
