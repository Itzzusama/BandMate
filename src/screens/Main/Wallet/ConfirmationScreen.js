import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useMemo } from "react";
import { Image, StyleSheet, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";

const CARD_W = 343;
const CARD_H = 434;

const ConfirmationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route?.params || {};
  const amount = params?.amount;
  const recipient = params?.recipient;
  const updatedSenderCard = params?.updatedSenderCard;
  const referenceId = params?.referenceId || `T${Date.now()}`;
  const createdAtIso = params?.createdAt || new Date().toISOString();

  const created = useMemo(() => {
    const d = new Date(createdAtIso);
    const dateStr = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
    const timeStr = d.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { dateStr, timeStr };
  }, [createdAtIso]);

  const displayAmount = useMemo(() => {
    if (!amount && amount !== 0) return "$0.00";
    try {
      return `$${Number(amount).toFixed(2)}`;
    } catch {
      return `$${amount}`;
    }
  }, [amount]);

  const recipientName = useMemo(() => {
    return (
      recipient?.display_name ||
      [recipient?.first_name, recipient?.sur_name].filter(Boolean).join(" ") ||
      recipient?.name ||
      recipient?.fullName ||
      recipient?.email ||
      "Friend"
    );
  }, [recipient]);

  return (
    <ScreenWrapper translucent backgroundImage={Images.confirmBg}>
      <View style={styles.cardContainer}>
        <View style={{ width: CARD_W, height: CARD_H }}>
          <ImageFast
            loading={false}
            source={Images.confirmCard}
            style={styles.card}
          />

          {/* Check badge */}
          <View style={styles.badgeWrap}>
            <View style={styles.badgeInner}>
              <Icons
                name="check"
                family="Feather"
                size={26}
                color={COLORS.white}
              />
            </View>
          </View>

          <View style={styles.content}>
            <Image
              source={{ uri: "https://picsum.photos/seed/jelena/80" }}
              style={styles.avatar}
            />

            <CustomText
              label={`Credits successfully\nsent to ${recipientName}`}
              textAlign="center"
              fontFamily={fonts.semiBold}
              fontSize={24}
              lineHeight={24 * 1.2}
            />

            <View style={styles.metaRow}>
              <View style={styles.metaChip}>
                <Icons
                  name="info"
                  family="Feather"
                  size={12}
                  color={COLORS.black}
                />
                <CustomText
                  label={`#${referenceId}`}
                  marginLeft={6}
                  fontFamily={fonts.medium}
                  fontSize={12}
                  lineHeight={12 * 1.4}
                  color={COLORS.black}
                />
              </View>
              <CustomText
                label="·"
                color={COLORS.gray1}
                marginRight={4}
                lineHeight={14 * 1.4}
              />
              <CustomText
                label={created.dateStr}
                color={COLORS.gray1}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
              <CustomText
                label="·"
                color={COLORS.gray1}
                marginRight={4}
                marginLeft={4}
                lineHeight={14 * 1.4}
              />

              <CustomText
                label={created.timeStr}
                color={COLORS.gray1}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
              />
            </View>

            <CustomText
              label={displayAmount}
              fontFamily={fonts.semiBold}
              fontSize={64}
              lineHeight={64 * 1.2}
              marginTop={40}
              textAlign="center"
            />

            <CustomText
              label="What you own me"
              color={COLORS.gray1}
              fontFamily={fonts.medium}
              fontSize={12}
              lineHeight={12 * 1.6}
              marginTop={14}
              textAlign="center"
            />

            {/* Close button */}
            <CustomButton
              title="Close"
              width="100%"
              height={44}
              borderRadius={12}
              marginTop={24}
              backgroundColor={COLORS.black}
              color={COLORS.white}
              onPress={() => {
                navigation.reset({ index: 0, routes: [{ name: "MainStack" }] });
              }}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default ConfirmationScreen;

const styles = StyleSheet.create({
  card: {
    height: CARD_H,
    width: CARD_W,
    position: "absolute",
    top: 0,
    left: 0,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrap: {
    position: "absolute",
    top: -26,
    left: CARD_W / 2 - 32,
    width: 64,
    height: 64,
    borderRadius: 99,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#1212120A",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#3556FF",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    bottom: 16,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignSelf: "center",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 99,
    marginRight: 4,
  },
});
