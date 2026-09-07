import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import fonts from "../../../../assets/fonts";
import {
  HomeBellSvg,
  HomeChatSvg,
  HomeSearchSvg,
} from "../../../../assets/svgs";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import TopTab from "../../../../components/TopTab";
import { COLORS } from "../../../../utils/COLORS";

export const CATEGORIES_LIST = [
  "Technology",
  "Politics",
  "Sports",
  "Music",
  "Fashion",
  "Entertainment",
  "Gaming",
  "Food",
  "Health",
];

const Header = ({ selectedCategory, onSelectCategory }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const unseenBadge = useSelector((state) => state.users?.unseenBadge);
  const hasUnreadNotification = Boolean(unseenBadge?.notification);

  const selectedTabIndex = useMemo(() => {
    if (!selectedCategory) return -1;
    return CATEGORIES_LIST.findIndex(
      (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
    );
  }, [selectedCategory]);

  const handleSelectTab = (index) => {
    if (index === null || index === undefined) {
      if (onSelectCategory) onSelectCategory(null);
      return;
    }
    const chosen = CATEGORIES_LIST[index];
    if (chosen === selectedCategory) {
      if (onSelectCategory) onSelectCategory(null);
    } else {
      if (onSelectCategory) onSelectCategory(chosen);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Top Header Row: Feed / Shorts & Icons */}
      <View style={styles.topRow}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (onSelectCategory) onSelectCategory(null);
            }}
          >
            <CustomText
              label="Feed"
              fontFamily={fonts.semiBold}
              fontSize={20}
              color={COLORS.white}
            />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              // Navigation or toggle if shorts screen is configured
            }}
          >
            <CustomText
              label="Shorts"
              fontFamily={fonts.semiBold}
              fontSize={20}
              color={COLORS.gray2}
              marginLeft={12}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("SearchScreen")}
          >
            <HomeSearchSvg width={38} height={38} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Notification")}
            style={styles.iconButton}
          >
            <HomeBellSvg width={38} height={38} color={COLORS.white} />
            {hasUnreadNotification && <View style={styles.notificationDot} />}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Chat")}
          >
            <HomeChatSvg width={38} height={38} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* TopTab Row: Compass Button + Category Pills */}
      <View style={styles.tabRow}>
        <TouchableOpacity
          onPress={() => {
            if (onSelectCategory) onSelectCategory(null);
          }}
          activeOpacity={0.7}
          style={[
            styles.compassButton,
            {
              backgroundColor:
                selectedCategory === null ? COLORS.white : "#FFFFFF0A",
            },
          ]}
        >
          <Icons
            family="MaterialCommunityIcons"
            name="compass"
            size={22}
            color={selectedCategory === null ? COLORS.black : COLORS.white}
          />
        </TouchableOpacity>

        <TopTab
          rounded
          setTab={handleSelectTab}
          tab={selectedTabIndex}
          borderRadius={8}
          height={34}
          tabNames={CATEGORIES_LIST}
          activeColor={COLORS.white}
          activeTintColor={COLORS.black}
          inactiveTintColor={COLORS.white}
          ovalBg="#FFFFFF0A"
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.black,
    paddingBottom: 6,
    zIndex: 10,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconButton: {
    position: "relative",
  },
  notificationDot: {
    position: "absolute",
    top: 4,
    right: 6,
    backgroundColor: COLORS.red,
    height: 8,
    width: 8,
    borderRadius: 99,
  },
  tabRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingHorizontal: 12,
    gap: 6,
    paddingBottom: 6,
  },
  compassButton: {
    height: 34,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
