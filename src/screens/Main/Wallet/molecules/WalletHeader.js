import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const WalletHeader = ({ onStripePress, onWithdraw, balance }) => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("wallet");

  return (
    <View style={styles.container}>
      <View style={styles.gradientWrapper}>
        <LinearGradient
          colors={["#3556FF", "#4347FF", "#7A88FF", "#E9ECFF"]}
          locations={[0, 0.45, 0.82, 1]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.94 }}
        />
        <View style={styles.content}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.backIcon}
              onPress={() => navigation.goBack()}
            >
              <Icons
                name="keyboard-arrow-left"
                family="MaterialIcons"
                size={22}
                color={COLORS.white}
              />
            </TouchableOpacity>

            <View style={styles.headerToggle}>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeTab === "wallet" && styles.activeToggle,
                ]}
                onPress={() => setActiveTab("wallet")}
              >
                <View style={styles.tabContent}>
                  <Image
                    source={PNGIcons.wallet}
                    style={[
                      styles.tabIcon,
                      {
                        tintColor:
                          activeTab === "wallet" ? COLORS.black : COLORS.white,
                      },
                    ]}
                  />
                  <CustomText
                    label="My Wallet"
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    color={activeTab === "wallet" ? COLORS.black : COLORS.white}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  activeTab === "stats" && styles.activeToggle,
                ]}
                onPress={() => setActiveTab("stats")}
              >
                <View style={styles.tabContent}>
                  <Image
                    source={PNGIcons.stats}
                    style={[
                      styles.tabIcon,
                      {
                        tintColor:
                          activeTab === "stats" ? COLORS.black : COLORS.white,
                      },
                    ]}
                  />
                  <CustomText
                    label="Stats"
                    fontFamily={fonts.medium}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    color={activeTab === "stats" ? COLORS.black : COLORS.white}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Balance Display */}
          <View style={styles.balanceContainer}>
            <View style={styles.balanceRow}>
              <View style={styles.row}>
                <CustomText
                  label={balance || "1,160.62"}
                  fontFamily={fonts.semiBold}
                  fontSize={40}
                  lineHeight={40 * 1.4}
                  // lineHeight={40}
                  color={COLORS.white}
                />
                <CustomText
                  label="Cr"
                  fontFamily={fonts.semiBold}
                  fontSize={40}
                  marginLeft={3}
                  lineHeight={40 * 1.4}
                  // lineHeight={40}
                  color={"#FFFFFFA3"}
                />
              </View>
              <TouchableOpacity
                onPress={onStripePress}
                style={styles.currencyToggle}
              >
                <CustomText
                  label="USD"
                  fontFamily={fonts.medium}
                  lineHeight={14 * 1.4}
                />
                <Image
                  source={PNGIcons.refresh}
                  style={{ height: 12, width: 12 }}
                />
              </TouchableOpacity>
            </View>

            <CustomText
              label="Personal Virtual Card"
              fontFamily={fonts.medium}
              fontSize={16}
              lineHeight={16 * 1.4}
              color={COLORS.white}
            />

            <View style={styles.exchangeRow}>
              <CustomText
                label="Exchange rate now: $1.25"
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.white}
              />
              <Icons name={"arrow-down"} family={"Feather"} color={"#EE1045"} />

              <CustomText
                label="1.00 SC"
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={COLORS.white}
              />
              <Icons name={"arrow-up"} family={"Feather"} color={"#37B874"} />
            </View>

            <CustomText
              label="*Credits are set on the most stable currency in the world: Swiss Francs (CHF)"
              fontFamily={fonts.medium}
              fontSize={9}
              lineHeight={9 * 1.4}
              color={"#BABEFF"}
              marginTop={8}
            />
          </View>

          {/* Withdraw Button */}
          <CustomButton
            title="Withdraw balance"
            backgroundColor={COLORS.white}
            color={COLORS.primaryColor}
            fontFamily={fonts.medium}
            marginTop={16}
            height={40}
            onPress={onWithdraw}
            width="60%"
            alignSelf="flex-start"
            rightIcon={PNGIcons.rightUpArrow}
            rightIconHeight={10}
            rightIconWidth={10}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  gradientWrapper: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: "hidden",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 20,
    paddingTop: 70,
  },
  headerToggle: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 25,
    padding: 4,
    width: "70%",
    marginLeft: 16,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tabIcon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
  },
  activeToggle: {
    backgroundColor: COLORS.white,
  },
  balanceContainer: {
    marginTop: 16,
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  currencyToggle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: 9,
    paddingVertical: 6,
    gap: 4,
    borderRadius: 99,
  },
  exchangeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  backIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#596Bff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default WalletHeader;
