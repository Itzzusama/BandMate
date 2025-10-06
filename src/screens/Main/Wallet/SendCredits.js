import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import AmountSelectionButtons from "../../../components/AmountSelectionButtons";
import CustomButton from "../../../components/CustomButton";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import fonts from "../../../assets/fonts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import WalletInput from "../../../components/WalletInput";
import { get, post } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";

const SendCredits = ({ route }) => {
  const navigation = useNavigation();
  const genre = ["Personal VC", "Friend VC"];
  const [State, setState] = useState({});
  const [customAmount, setCustomAmount] = useState("");
  const [selectedAmount, setSelectedAmount] = useState("");

  // User cards (debit from)
  const [cards, setCards] = useState([]);
  const [cardsLoading, setCardsLoading] = useState(false);
  const [senderCardId, setSenderCardId] = useState("");
  const [senderCardName, setSenderCardName] = useState("");
  const [senderCardBalance, setSenderCardBalance] = useState(0);

  // Friend selection and friend cards (credit to)
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [friendCards, setFriendCards] = useState([]);
  const [friendCardsLoading, setFriendCardsLoading] = useState(false);
  const [receiverCardId, setReceiverCardId] = useState("");
  const [receiverCardName, setReceiverCardName] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    fetchUserCards();
  }, []);

  const fetchUserCards = async () => {
    try {
      setCardsLoading(true);
      const res = await get("virtual-cards");
      if (res?.data?.success) {
        setCards(res?.data?.data || []);
      } else {
        ToastMessage("Failed to load cards", "error");
      }
    } catch (e) {
      ToastMessage("Failed to load cards", "error");
    } finally {
      setCardsLoading(false);
    }
  };

  const openFriends = () => {
    navigation.navigate("FriendsScreen", {
      onSelectFriend: async (friend) => {
        setSelectedFriend(friend);
        setReceiverCardId("");
        setReceiverCardName("");
        await fetchFriendCards(friend?._id || friend?.id);
      },
    });
  };

  const fetchFriendCards = async (friendId) => {
    if (!friendId) return;
    try {
      setFriendCardsLoading(true);
      const res = await get(
        `virtual-cards/friend-cards/${friendId}?status=ACTIVE`
      );

      if (res?.data?.success) {
        setFriendCards(res?.data?.data || []);
      } else {
        ToastMessage("Failed to load friend's cards", "error");
      }
    } catch (e) {
      ToastMessage("Failed to load friend's cards", "error");
    } finally {
      setFriendCardsLoading(false);
    }
  };

  const resolveAmount = () => {
    if (selectedAmount) {
      const num = parseFloat(selectedAmount.replace(/[^0-9.]/g, ""));
      return isNaN(num) ? 0 : num;
    }
    const num = parseFloat((customAmount || "").replace(/,/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const handleSubmit = async () => {
    if (!senderCardId) {
      ToastMessage("Please select your card", "error");
      return;
    }
    if (!selectedFriend) {
      ToastMessage("Please select a friend", "error");
      return;
    }
    if (!receiverCardId) {
      ToastMessage("Please select friend's card", "error");
      return;
    }
    const amount = resolveAmount();
    if (!amount || amount <= 0) {
      ToastMessage("Enter a valid amount", "error");
      return;
    }

    const availableBalance =
      typeof senderCardBalance === "number" && !isNaN(senderCardBalance)
        ? senderCardBalance
        : (() => {
            const selected = cards.find(
              (c) =>
                (c?._id || c?.id) === senderCardId || c?.name === senderCardName
            );
            const balRaw =
              selected?.balance?.$numberDecimal ?? selected?.balance;
            const balNum =
              typeof balRaw === "string"
                ? parseFloat(balRaw)
                : Number(balRaw ?? 0);
            return isNaN(balNum) ? 0 : balNum;
          })();

    if (amount > availableBalance) {
      ToastMessage("Insufficient funds in the selected card", "error");
      return;
    }

    try {
      setSubmitLoading(true);
      const body = {
        senderCardId,
        receiverCardId,
        amount,
      };
      const res = await post("virtual-cards/transfer-payment", body);
      if (res?.data?.success) {
        const updatedSenderCard = res?.data?.data;
        navigation.navigate("ConfirmationScreen", {
          type: "transfer",
          amount,
          recipient: selectedFriend,
          receiverCardId,
          senderCardId,
          updatedSenderCard,
          referenceId: `T${Date.now()}`,
          createdAt: new Date().toISOString(),
        });
      } else {
        ToastMessage(res?.data?.message || "Transfer failed", "error");
      }
    } catch (e) {
      ToastMessage("Transfer failed", "error");
    } finally {
      setSubmitLoading(false);
    }
  };

  const multiAmounts = ["$25", "$50", "$100", "$250", "$500"];

  const getSelectedCard = () => {
    return cards.find(
      (c) => (c?._id || c?.id) === senderCardId || c?.name === senderCardName
    );
  };

  const getSelectedCardBalance = () => {
    const bal =
      typeof senderCardBalance === "number" && !isNaN(senderCardBalance)
        ? senderCardBalance
        : (() => {
            const selected = getSelectedCard();
            const balRaw =
              selected?.balance?.$numberDecimal ?? selected?.balance;
            const balNum =
              typeof balRaw === "string"
                ? parseFloat(balRaw)
                : Number(balRaw ?? 0);
            return isNaN(balNum) ? 0 : balNum;
          })();
    return bal;
  };

  const formatCredits = (num) => {
    try {
      return Number(num || 0).toLocaleString();
    } catch {
      return String(num || 0);
    }
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Send Credits"} />}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <CustomButton
            title={submitLoading ? "Sending..." : "Send Credits Now"}
            onPress={handleSubmit}
            disabled={submitLoading}
          />
          <CustomButton
            title={"Cancel"}
            backgroundColor={COLORS.inputBg}
            color={COLORS.black}
            marginTop={8}
          />
        </View>
      )}
    >
      <CustomText
        marginTop={16}
        label={"Send Credits"}
        fontFamily={fonts.semiBold}
        fontSize={24}
        lineHeight={24 * 1.4}
      />
      <CustomText
        label={"You don’t have any messages yet."}
        color={COLORS.subtitle}
        fontFamily={fonts.regular}
        fontSize={14}
        marginBottom={15}
        lineHeight={14 * 1.4}
      />

      <CustomDropdown
        withLabel={"Debit From"}
        placeholder="Select your VC"
        data={cards.map((c) => c?.name)}
        value={senderCardName}
        setValue={(value) => {
          const card = cards.find((c) => c?.name === value);
          setSenderCardName(value);
          setSenderCardId(card?._id || "");
          const balRaw = card?.balance?.$numberDecimal ?? card?.balance;
          const balNum =
            typeof balRaw === "string"
              ? parseFloat(balRaw)
              : Number(balRaw ?? 0);
          setSenderCardBalance(isNaN(balNum) ? 0 : balNum);
        }}
        loading={cardsLoading}
        marginBottom={6}
      />

      <View style={[styles.row]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />

        <CustomText
          label={`Currently:`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
        <CustomText
          label={`${formatCredits(
            getSelectedCardBalance()
          )} (SC) Sola Credits.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.darkPurple}
          fontFamily={fonts.medium}
          marginLeft={2}
        />
      </View>

      <Divider marginVertical={20} />

      <WalletInput
        withLabel={"Custom Amount"}
        placeholder={"15.00"}
        value={customAmount}
        onChangeText={(text) => setCustomAmount(text)}
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
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
      </View>

      <Divider marginVertical={20} />

      <CustomDropdown
        withLabel={"Credit To Friend"}
        placeholder="Select a friend"
        data={
          selectedFriend
            ? [
                selectedFriend?.name ||
                  selectedFriend?.fullName ||
                  selectedFriend?.email,
              ]
            : []
        }
        value={
          selectedFriend?.name ||
          selectedFriend?.fullName ||
          selectedFriend?.email
        }
        setValue={() => {}}
        onPress={openFriends}
        marginBottom={6}
      />

      {selectedFriend && (
        <CustomDropdown
          withLabel={"Friend's Card"}
          placeholder="Select friend's VC"
          data={friendCards.map((c) => c.name)}
          value={receiverCardName}
          setValue={(value) => {
            const card = friendCards.find((c) => c.name === value);
            setReceiverCardName(value);
            setReceiverCardId(card?._id || "");
          }}
          loading={friendCardsLoading}
          marginBottom={6}
        />
      )}

      <View style={[styles.row, { marginBottom: 20 }]}>
        <Icons
          name={"info"}
          family={"Feather"}
          size={12}
          marginRight={4}
          color={COLORS.gray2}
        />

        <CustomText
          label={`Funds will be transferred Instantly.`}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          fontFamily={fonts.regular}
        />
      </View>
    </ScreenWrapper>
  );
};

export default SendCredits;

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
    backgroundColor: COLORS.white,
    marginBottom: Platform.OS == "ios" ? 24 : 12,
  },
});
