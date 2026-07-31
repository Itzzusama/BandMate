import { useNavigation } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, View } from "react-native";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { useSelector } from "react-redux";

const PILL_ITEMS = [
  {
    key: "rewinds",
    icon: PNGIcons.btn1,
    color: "#FF4B4B",
    bgColor: "#FF4B4B20",
  },
  {
    key: "superLikes",
    icon: PNGIcons.btn3,
    color: "#007AFE",
    bgColor: "#007AFE20",
  },
  {
    key: "boosts",
    icon: PNGIcons.btn5,
    color: "#8400E7",
    bgColor: "#8400E720",
  },
];

const HomeHeader = ({ onFilterPress, onNotificationPress }) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const user = useSelector((state) => state.users.userData);

  const [pillIndex, setPillIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setPillIndex((prev) => (prev + 1) % PILL_ITEMS.length);
        // Fade in
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentPill = PILL_ITEMS[pillIndex];
  const pillCount = user?.[currentPill.key] ?? 0;

  return (
    <View style={[styles.header, { marginTop: insets.top }]}>
      <Pressable onPress={() => navigation.navigate("Settings")}>
        <ImageFast
          source={user?.pictures[0] ? { uri: user?.pictures[0] } : Images.user}
          style={styles.profileImage}
        />
      </Pressable>

      <View style={styles.profileInfo}>
        <CustomText
          label={`Hi ${
            user?.role == "solo"
              ? user?.display_name
              : user?.bandName || "Myles"
          } 👋`}
          fontSize={17}
          lineHeight={17 * 1.4}
          color={COLORS.white}
          fontFamily={fonts.medium}
        />
        <CustomText
          label={"Hope you had a great day!"}
          fontSize={12}
          color={COLORS.white2}
          fontFamily={fonts.medium}
        />
      </View>

      <View style={styles.imageRow}>
        <Animated.View
          style={[
            styles.pill,
            {
              backgroundColor: currentPill.bgColor,
              borderColor: currentPill.color,
              opacity: fadeAnim,
            },
          ]}
        >
          <Image
            source={currentPill.icon}
            style={styles.pillIcon}
            resizeMode="contain"
          />
          <CustomText
            label={String(pillCount)}
            fontSize={13}
            lineHeight={13 * 1.4}
            color={COLORS.white}
            fontFamily={fonts.semiBold}
          />
        </Animated.View>
        <ImageFast
          removeLoading
          source={PNGIcons.notiBell}
          style={styles.image}
          onPress={onNotificationPress}
        />
        <ImageFast
          removeLoading
          onPress={onFilterPress}
          source={PNGIcons.filterBell}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
  },
  profileInfo: {
    marginLeft: 12,
    flex: 1,
  },
  image: {
    height: 40,
    width: 40,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    gap: 4,
  },
  pillIcon: {
    height: 20,
    width: 20,
  },
});
