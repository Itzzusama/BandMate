import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import CustomText from "../../../../components/CustomText";
import TopTab from "../../../../components/TopTab";
import TransactionItem from "./TransactionItem";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import fonts from "../../../../assets/fonts";
import { useNavigation } from "@react-navigation/native";
import { get } from "../../../../services/ApiRequest";
import NoDataFound from "../../../../components/NoDataFound";

const LatestTransactions = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

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
  useEffect(() => {
    getRecentTransactions();
  }, []);

  const filterButtons = ["All", "Categories", "Sellers", "Countries"];
  const filterImages = [
    PNGIcons.catAll,
    PNGIcons.cat2,
    PNGIcons.cat3,
    PNGIcons.cat4,
  ];

  // const transactions = [
  //   {
  //     id: 1,
  //     name: "Dmytro Beztsinnyi",
  //     amount: "50Cr",
  //     date: "Jul 15 2025 12:48",
  //     avatar: "D",
  //     avatarColor: "#8B5CF6",
  //     showBadge: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Dmytro Beztsinnyi",
  //     amount: "50Cr",
  //     date: "Jul 8 2025 12:48",
  //     avatar: "D",
  //     avatarColor: "#8B5CF6",
  //     showBadge: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Dmytro Beztsinnyi",
  //     amount: "50Cr",
  //     date: "Jul 1 2025 12:47",
  //     avatar: "D",
  //     avatarColor: "#8B5CF6",
  //     showBadge: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Dmytro Beztsinnyi",
  //     amount: "50Cr",
  //     date: "Jun 24 2025 12:47",
  //     avatar: "D",
  //     avatarColor: "#8B5CF6",
  //     showBadge: true,
  //   },
  //   {
  //     id: 5,
  //     name: "Dmytro Beztsinnyi",
  //     amount: "50Cr",
  //     date: "Jun 17 2025 12:47",
  //     avatar: "D",
  //     avatarColor: "#8B5CF6",
  //     showBadge: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Dmytro Beztsinnyi",
  //     amount: "50Cr",
  //     date: "Jun 10 2025 12:47",
  //     avatar: "D",
  //     avatarColor: "#8B5CF6",
  //     showBadge: true,
  //   },
  // ];

  return (
    <View style={styles.section}>
      <CustomText
        label="Latest Transactions"
        fontFamily={fonts.semiBold}
        fontSize={20}
        lineHeight={20 * 1.4}
        color={COLORS.black}
        marginBottom={8}
      />

      <TopTab
        rounded
        tabNames={filterButtons}
        tab={selectedFilter}
        setTab={setSelectedFilter}
        images={filterImages}
        marginBottom={8}
      />

      <FlatList
        data={recentTransactions?.slice(0, 5) || []}
        ListEmptyComponent={() => (
          <NoDataFound title={"No Transaction Found"} />
        )}
        keyExtractor={(item) => item?._id}
        renderItem={({ item: tx }) => {
          const amountRaw =
            (tx?.amount && (tx.amount.$numberDecimal || tx.amount)) || 0;
          const amount = `${Number(amountRaw).toFixed(2)}$ `;
          const dateISO = tx?.processedAt || tx?.createdAt;
          const date = dateISO
            ? new Date(dateISO).toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "";
          const rawName =
            tx?.secondaryUser?.email ||
            tx?.user?.email ||
            tx?.virtualCard?.name ||
            "Transfer";
          const displayName = String(rawName).includes("@")
            ? String(rawName).split("@")[0]
            : String(rawName);
          const avatar = String(displayName).charAt(0).toUpperCase() || "T";

          return (
            <TransactionItem
              name={displayName}
              amount={amount}
              date={date}
              avatar={avatar}
              // avatarColor={transaction.avatarColor}
              // showBadge={transaction.showBadge}
              onPress={() =>
                navigation.navigate("DetailPage", { transaction: tx })
              }
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 20,
    padding: 16,
  },
});

export default LatestTransactions;
