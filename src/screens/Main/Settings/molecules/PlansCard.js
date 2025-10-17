import React from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { SettingIcons } from "../../../../assets/images/settingIcons";
import Icons from "../../../../components/Icons";

const PlansCard = ({ plan, onPress }) => {
  const isFree = plan === "Free Tier";

  const getImage = () => {
    if (isFree) return SettingIcons.free;
    else if (plan === "Pro") return SettingIcons.pro;
    else if (plan === "Silver") return SettingIcons.silver;
    else if (plan === "Gold") return SettingIcons.gold;
    else if (plan === "Platinum") return SettingIcons.platinum;
  };

  const color =
    plan === "Silver"
      ? "#A4A4A4"
      : plan === "Gold"
      ? "#AA9757"
      : plan === "Pro"
      ? "#007BFF"
      : "#7B64F4";

  const price =
    plan === "Silver"
      ? "9.99"
      : plan === "Gold"
      ? "15.99"
      : plan === "Pro"
      ? "199.99"
      : "29.99";

  const text =
    plan === "Free Tier"
      ? "Essentials"
      : plan === "Silver"
      ? "Perfect for teams and small businesses"
      : "Perfect for Large Organizations";

  const renderContent = () => (
    <View style={styles.contentContainer}>
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Image source={getImage()} style={{ height: 24, width: 24 }} />
          <CustomText
            label={plan}
            fontSize={34}
            fontFamily={fonts.medium}
            lineHeight={36 * 1.4}
            color={COLORS.white}
          />
        </View>
        {plan === "Free Tier" ? (
          <View style={styles.freePlanBadge}>
            <Icons
              family={"Ionicons"}
              name={"checkmark"}
              size={12}
              color={"#121212"}
            />
            <CustomText
              label={"Active"}
              fontSize={10}
              fontFamily={fonts.medium}
              color={"#121212"}
            />
          </View>
        ) : (
          <>
            <CustomText
              label={`$${price}`}
              fontSize={24}
              fontFamily={fonts.bricolMed}
              color={COLORS.white}
            />
            <CustomText
              label={`/mo`}
              fontSize={24}
              fontFamily={fonts.bricolMed}
              color={COLORS.white3}
            />
          </>
        )}
      </View>
      {plan == "Platinum" ? (
        <View style={[styles.badge, { backgroundColor: "#EFE347" }]}>
          <CustomText
            label={"Most popular"}
            fontSize={10}
            fontFamily={fonts.medium}
            color={COLORS.black}
          />
        </View>
      ) : plan == "Pro" ? (
        <View style={[styles.badge, { backgroundColor: "#007BFF" }]}>
          <CustomText
            label={"Exclusive Program"}
            fontSize={10}
            fontFamily={fonts.medium}
            color={COLORS.black}
          />
        </View>
      ) : null}

      <View style={styles.bottomRow}>
        <CustomText
          label={text}
          fontSize={16}
          fontFamily={fonts.medium}
          lineHeight={16 * 1.4}
          color={"#FFFFFFE0"}
        />
        <CustomText
          label={"Everything you need to start!"}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={"#FFFFFFE0"}
        />
      </View>
    </View>
  );

  if (isFree) {
    return (
      <View style={[styles.container, { backgroundColor: COLORS.inputBg }]}>
        {renderContent()}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.black, color]}
      locations={[0.79, 0.98]}
      angle={126}
      useAngle={true}
      style={[styles.container, { borderWidth: 1 }]}
    >
      {renderContent()}
    </LinearGradient>
  );
};

export default PlansCard;

const styles = StyleSheet.create({
  container: {
    height: 135,
    borderRadius: 12,
    borderColor: "#FFFFFF0A",
    marginTop: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 8,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  bottomRow: {
    marginTop: 12,
  },
  badge: {
    paddingHorizontal: 6,
    height: 16,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    position: "absolute",
    top: 56,
    left: 16,
  },
  freePlanBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
    paddingVertical: 5,
    paddingRight: 12,
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
});
