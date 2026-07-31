import { Image, StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import { SettingIcons } from "../../../../assets/images/settingIcons";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const PlansCard = ({ plan, onPress }) => {
  const isFree = plan === "Free Tier" || plan === "Free";
  const isExtra =
    plan === "Super Likes" || plan === "Boosts" || plan === "Rewinds";

  const getImage = () => {
    if (isFree) return SettingIcons.free;
    else if (plan === "Pro") return SettingIcons.pro;
    else if (plan === "Silver") return SettingIcons.silver;
    else if (plan === "Gold") return SettingIcons.gold;
    else if (plan === "Platinum") return SettingIcons.platinum;
    else if (plan === "Super Likes") return PNGIcons.btn3;
    else if (plan === "Boosts") return PNGIcons.btn5;
    else if (plan === "Rewinds") return PNGIcons.btn1;
  };

  const color =
    plan === "Silver"
      ? "#A4A4A4"
      : plan === "Gold"
      ? "#AA9757"
      : plan === "Pro"
      ? "#007BFF"
      : plan === "Super Likes"
      ? "#007AFE"
      : plan === "Boosts"
      ? "#8400E7"
      : plan === "Rewinds"
      ? "#FF4B4B"
      : "#7B64F4";

  const price =
    plan === "Silver"
      ? "9.99"
      : plan === "Gold"
      ? "15.99"
      : plan === "Pro"
      ? "199.99"
      : "29.99";

  const text = isFree
    ? "Essentials"
    : plan === "Super Likes"
    ? "Stand out & get 3x more matches"
    : plan === "Boosts"
    ? "Be the top profile in your area"
    : plan === "Rewinds"
    ? "Undo your last swipe anytime"
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
            fontSize={24}
            fontFamily={fonts.medium}
            lineHeight={28 * 1.4}
            color={COLORS.white}
          />
        </View>
        {isExtra ? (
          <View style={[styles.freePlanBadge, { backgroundColor: color }]}>
            <CustomText
              label={"Extra"}
              fontSize={10}
              fontFamily={fonts.medium}
              color={COLORS.white}
            />
          </View>
        ) : isFree ? (
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
          color={"#FFFFFFCC"}
        />
      </View>
    </View>
  );

  const gradientColors = isFree
    ? [COLORS.cardColor, COLORS.cardColor]
    : [COLORS.black, color];

  return (
    <LinearGradient
      key={plan}
      colors={gradientColors}
      locations={[0.79, 0.98]}
      angle={126}
      useAngle={true}
      style={[
        styles.container,
        {
          borderWidth: isFree ? 0 : 1,
          backgroundColor: isFree ? COLORS.cardColor : undefined,
        },
      ]}
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
    marginTop: 2,
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
