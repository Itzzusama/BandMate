import { BlurView } from "@react-native-community/blur";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import Blur from "../components/Blur";
import CustomText from "../components/CustomText";
import Icons from "../components/Icons";
import ImageFast from "../components/ImageFast";
import { COLORS } from "../utils/COLORS";

import Home from "../screens/Main/Home";
import HomePremium from "../screens/Main/HomePremium";
import Event from "../screens/Main/Event";
import SocialFeeds from "../screens/Main/SocialFeeds";
import Chat from "../screens/Main/Chat/Chat";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={styles.customButtonContainer}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <ImageFast source={Images.profile} style={styles.buzz} />
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const [menuOpen, setMenuOpen] = useState(false);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const scaleAnim1 = useRef(new Animated.Value(0)).current; // Event
  const translateY1 = useRef(new Animated.Value(0)).current;
  const scaleAnim2 = useRef(new Animated.Value(0)).current; // Post
  const translateY2 = useRef(new Animated.Value(0)).current;

  const toggleMenu = useCallback(() => {
    if (!menuOpen) {
      setMenuOpen(true);
      Animated.parallel([
        Animated.spring(rotateAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim1, {
          toValue: 1,
          delay: 40,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(translateY1, {
          toValue: 0,
          delay: 40,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(scaleAnim2, {
          toValue: 1,
          delay: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(translateY2, {
          toValue: 0,
          delay: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(rotateAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim1, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(translateY1, {
          toValue: 15,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(scaleAnim2, {
          toValue: 0,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.spring(translateY2, {
          toValue: 15,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
      ]).start(() => {
        setMenuOpen(false);
      });
    }
  }, [menuOpen]);

  const handleOptionPress = (screenName) => {
    Animated.parallel([
      Animated.spring(rotateAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim1, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(translateY1, {
        toValue: 15,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(scaleAnim2, {
        toValue: 0,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
      Animated.spring(translateY2, {
        toValue: 15,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }),
    ]).start(() => {
      setMenuOpen(false);
      navigation.navigate(screenName);
    });
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "135deg"],
  });

  return (
    <>
      {/* Full Screen Overlay Backdrop with Bottom Gradient */}
      {menuOpen && (
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: overlayOpacity,
              bottom: -(90 + insets.bottom),
            },
          ]}
        >
          <LinearGradient
            colors={[`${COLORS.black}B3`, `${COLORS.btnColor}`]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            activeOpacity={1}
            onPress={toggleMenu}
          />
        </Animated.View>
      )}

      {/* Floating Menu Options */}
      {menuOpen && (
        <View style={[styles.menuContainer, { bottom: 82 + insets.bottom }]}>
          {/* Option 1: Event */}
          <Animated.View
            style={[
              styles.menuOptionWrapper,
              {
                marginBottom: 14,
                transform: [{ translateY: translateY1 }, { scale: scaleAnim1 }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuOption}
              activeOpacity={0.8}
              onPress={() => handleOptionPress("CreateEvent")}
            >
              <CustomText
                label="Event"
                fontSize={24}
                fontFamily={fonts.semiBold}
                marginRight={12}
                color={COLORS.white}
              />
              <View style={styles.menuButton}>
                <Image
                  source={Images.event}
                  style={styles.menuIcon}
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Option 2: Post */}
          <Animated.View
            style={[
              styles.menuOptionWrapper,
              {
                marginBottom: 0,
                transform: [{ translateY: translateY2 }, { scale: scaleAnim2 }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.menuOption}
              activeOpacity={0.8}
              onPress={() => handleOptionPress("PublishPost")}
            >
              <CustomText
                label="Post"
                fontSize={24}
                fontFamily={fonts.semiBold}
                marginRight={12}
                color={COLORS.white}
              />
              <View style={styles.menuButton}>
                <Icons
                  family="Feather"
                  name="edit-3"
                  size={20}
                  color={COLORS.white}
                />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {/* Bottom Tab Bar */}
      <View style={[styles.tabMainContainer, { height: 90 + insets.bottom }]}>
        <View style={styles.tabContentContainer}>
          <BlurView
            style={StyleSheet.absoluteFillObject}
            blurType="light"
            blurAmount={16}
            reducedTransparencyFallbackColor="#FFFFFF14"
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              padding: 4,
            }}
          >
            {state.routes.map((route, index) => {
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const getIcon = () => {
                switch (route.name) {
                  case "Home":
                  case "HomePremium":
                    return Images.blurhome;
                  case "Chat":
                    return Images.blurInbox;
                  case "Feeds":
                    return Images.feeds;
                  case "Events":
                    return Images.event;
                  case "Settings":
                    return Images.setting;
                  default:
                    return null;
                }
              };

              if (route.name === "Profile") {
                return <CustomTabBarButton key={route.key} onPress={onPress} />;
              }

              return (
                <TouchableOpacity
                  key={route.key}
                  style={[
                    styles.iconMainContainer,
                    isFocused && { backgroundColor: COLORS.white },
                  ]}
                  activeOpacity={0.6}
                  onPress={onPress}
                >
                  {getIcon() && (
                    <Image
                      source={getIcon()}
                      resizeMode="contain"
                      style={[
                        styles.icon,
                        { tintColor: isFocused ? COLORS.black : "#FFFFFF7A" },
                      ]}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Plus Button with Rotation Animation */}
        <Animated.View
          style={[
            styles.plusButton,
            {
              bottom: 20 + insets.bottom,
            },
          ]}
        >
          <Blur reducedTransparency="#FFFFFF14" />
          <TouchableOpacity
            style={styles.plusButtonTouchable}
            activeOpacity={0.7}
            onPress={toggleMenu}
          >
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <Icons
                family="Feather"
                name="plus"
                size={24}
                color={COLORS.white}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

const TabStack = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="HomePremium" component={HomePremium} />
      <Tab.Screen name="Feeds" component={SocialFeeds} />
      <Tab.Screen name="Events" component={Event} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  buzz: {
    width: 46,
    height: 46,
    borderRadius: 99,
  },
  customButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconMainContainer: {
    width: 48,
    height: 48,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContentContainer: {
    backgroundColor: COLORS?.light?.inputBackground || "rgba(255,255,255,0.08)",
    borderRadius: 100,
    alignSelf: "flex-start",
    marginTop: 10,
    marginLeft: 20,
    height: 56,
    overflow: "hidden",
  },
  tabMainContainer: {
    paddingTop: 10,
    width: "100%",
    position: "absolute",
    zIndex: 999,
    bottom: 0,
  },
  plusButton: {
    position: "absolute",
    right: 20,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#FFFFFF35",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  plusButtonTouchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: -screenHeight,
    left: 0,
    right: 0,
    height: screenHeight * 2,
    zIndex: 998,
  },
  menuContainer: {
    position: "absolute",
    right: 20,
    zIndex: 999,
    alignItems: "flex-end",
  },
  menuOptionWrapper: {
    alignItems: "flex-end",
  },
  menuOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuButton: {
    width: 48,
    height: 48,
    borderRadius: 99,
    backgroundColor: COLORS.btnColor,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIcon: {
    width: 22,
    height: 22,
    tintColor: COLORS.white,
  },
});
