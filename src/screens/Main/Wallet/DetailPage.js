import React, { useMemo, useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import Border from "../../../components/Border";
import CustomButton from "../../../components/CustomButton";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useRoute } from "@react-navigation/native";

const DetailPage = ({ navigation }) => {
  const [excludeAnalytics, setExcludeAnalytics] = useState(true);
  const route = useRoute();
  const tx = route?.params?.transaction;

  const {
    displayAmount,
    headerTitle,
    dateLabel,
    statusLabel,
    statusColor,
    paymentMethod,
    serviceLabel,
  } = useMemo(() => {
    const rawAmount =
      (tx?.amount && (tx.amount.$numberDecimal || tx.amount)) || 0;
    const numericAmount = Number(rawAmount);
    const currency = tx?.currency || "USD";
    const prefix = currency === "USD" ? "$" : "";
    const suffix = currency !== "USD" ? ` ${currency}` : "";
    const displayAmountLocal = `${prefix}${
      isNaN(numericAmount) ? "0.00" : numericAmount.toFixed(2)
    }${suffix}`;

    const idTail =
      typeof tx?._id === "string" && tx._id.length > 6
        ? tx._id.slice(-6)
        : tx?._id || "";
    const headerTitleLocal = idTail ? `TR${idTail}` : "Transaction";

    const dateISO = tx?.processedAt || tx?.createdAt;
    const dateLabelLocal = dateISO
      ? new Date(dateISO).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    const status = tx?.status || "";
    const statusColorLocal = status === "COMPLETED" ? "#37B874" : COLORS.gray1;
    const statusLabelLocal = status
      ? status.charAt(0) + status.slice(1).toLowerCase()
      : "";

    const cardNumber = tx?.virtualCard?.details?.cardNumber;
    let paymentMethodLocal = "";
    if (cardNumber) {
      const last4 = String(cardNumber).replace(/\s+/g, "").slice(-4);
      paymentMethodLocal = `VIRTUAL CARD **${last4}`;
    } else if (tx?.virtualCard?.name) {
      paymentMethodLocal = `${tx.virtualCard.name}`;
    }

    const serviceLabelLocal = tx?.type || "";

    return {
      displayAmount: displayAmountLocal,
      headerTitle: headerTitleLocal,
      dateLabel: dateLabelLocal,
      statusLabel: statusLabelLocal,
      statusColor: statusColorLocal,
      paymentMethod: paymentMethodLocal,
      serviceLabel: serviceLabelLocal,
    };
  }, [tx]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={headerTitle} />}
      footerUnScrollable={() => (
        <View style={styles.bottomBar}>
          <CustomButton
            title="Split The Bill"
            width={"100%"}
            height={48}
            backgroundColor={COLORS.black}
            color={COLORS.white}
            onPress={() => navigation.navigate("SplitBillUser")}
          />
        </View>
      )}
    >
      {/* Amount + meta */}
      <View style={styles.centerBlock}>
        <CustomText
          label={displayAmount}
          fontFamily={fonts.semiBold}
          fontSize={48}
          lineHeight={48 * 1.2}
          textAlign={"center"}
        />
        <CustomText
          label={headerTitle}
          fontFamily={fonts.medium}
          fontSize={18}
          lineHeight={18 * 1.4}
          textAlign={"center"}
        />
        <CustomText
          label={dateLabel}
          fontFamily={fonts.medium}
          color={COLORS.gray1}
          lineHeight={10 * 1.6}
          textAlign={"center"}
        />
      </View>

      {/* Order details heading */}
      <CustomText
        label={"ORDER DETAILS"}
        fontFamily={fonts.medium}
        lineHeight={14 * 1.6}
        color={COLORS.gray1}
        marginTop={20}
      />

      {/* Status + Receipt card */}
      <View style={[styles.card, { marginTop: 4 }]}>
        <View style={styles.rowBetween}>
          <CustomText
            label={"Status"}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <CustomText
            label={statusLabel}
            color={statusColor}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.6}
          />
        </View>
        <Border marginVertical={10} bgColor={"#12121214"} />
        <View style={styles.rowBetween}>
          <CustomText
            label={"Receipt"}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <TouchableOpacity style={styles.inlineRow} activeOpacity={0.8}>
            <Icons
              name={"download"}
              family={"Feather"}
              size={16}
              color={"#4347FF"}
            />
            <CustomText
              label={"Download"}
              color={"#4347FF"}
              fontFamily={fonts.medium}
              marginLeft={4}
              lineHeight={14 * 1.4}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Payment Method card */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <CustomText
            label={"Payment Method"}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <CustomText
            label={paymentMethod}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.6}
          />
        </View>
      </View>

      {/* Toggle row card */}
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <CustomText
            label={"Exclude from Analytics"}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <CustomSwitch
            value={excludeAnalytics}
            setValue={setExcludeAnalytics}
          />
        </View>
        <Border marginVertical={10} bgColor={"#12121214"} />

        <View style={styles.rowBetween}>
          <CustomText
            label={"Service"}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <CustomText
            label={serviceLabel}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
          />
        </View>
        <Border marginVertical={10} bgColor={"#12121214"} />

        <View style={styles.rowBetween}>
          <CustomText
            label={"Amount"}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />
          <CustomText
            label={displayAmount}
            fontSize={14}
            lineHeight={14 * 1.6}
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      {/* Action rows */}
      <TouchableOpacity activeOpacity={0.85} style={styles.actionRow}>
        <CustomText
          label={"Add A Note"}
          fontSize={14}
          lineHeight={14 * 1.6}
          fontFamily={fonts.medium}
          color={COLORS.gray1}
        />
        <Icons name={"chevron-right"} family={"Feather"} size={22} />
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.85} style={styles.actionRow}>
        <CustomText
          label={"Get support"}
          fontSize={14}
          lineHeight={14 * 1.6}
          fontFamily={fonts.medium}
          color={COLORS.gray1}
        />
        <Icons name={"chevron-right"} family={"Feather"} size={22} />
      </TouchableOpacity>

      {/* Bottom button */}
    </ScreenWrapper>
  );
};

export default DetailPage;

const styles = StyleSheet.create({
  centerBlock: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 16,
    // paddingVertical: 16,
    marginTop: 12,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionRow: {
    backgroundColor: COLORS.lightGray,
    padding: 14,
    borderRadius: 12,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomBar: {
    padding: 14,
    marginBottom: Platform.OS == "ios" ? 20 : 0,
  },
});
