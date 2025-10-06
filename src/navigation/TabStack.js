import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "@react-native-community/blur";

import ProDashboard from "../screens/Main/VehicleDashboard/ProDashboard";
import Profile from "../screens/Main/Profile";
import FAQNews from "../screens/Main/FAQNews";
import Chat from "../screens/Main/Chat/Chat";
import Home from "../screens/Main/Home";

import ImageFast from "../components/ImageFast";

import { useHomeSheet } from "../context/HomeSheetContext";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = (props) => (
  <TouchableOpacity
    style={styles.customButtonContainer}
    onPress={props.onPress}
    activeOpacity={0.7}
  >
    <ImageFast source={Images.buzz} style={styles.buzz} />
  </TouchableOpacity>
);

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { isHomeSheetOpen } = useHomeSheet();

  // Hide tab bar when HomeSheet is open
  if (isHomeSheetOpen) {
    return null;
  }
  return (
    <View style={[styles.tabMainContainer, { height: 90 + insets.bottom }]}>
      <ImageFast
        removeLoading
        source={Images.tabBG}
        style={styles.tabBG}
        resizeMode="cover"
      />
      {/* <ImageFast
        removeLoading
        source={Images.tabBG}
        style={styles.tabBG}
        resizeMode="cover"
      /> */}

      <View style={styles.tabContentContainer}>
        <BlurView
          style={{
            height: "100%",
            width: "110%",
            // borderRadius: 100,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          blurType="light"
          blurAmount={26}
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
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

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
                  return Images.blurhome;
                case "Chat":
                  return Images.blurInbox;
                case "Dashboard":
                  return Images.blurdash;
                case "FAQ & News":
                  return Images.blurFaq;
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
                  { backgroundColor: isFocused ? "#FFFFFF" : "transparent" },
                ]}
                activeOpacity={0.6}
                onPress={onPress}
              >
                <Image
                  source={getIcon()}
                  style={[
                    styles.icon,
                    {
                      tintColor: isFocused ? COLORS.primaryColor : "#fff",
                    },
                  ]}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
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
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Dashboard" component={ProDashboard} />
      <Tab.Screen name="FAQ & News" component={FAQNews} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  buzz: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  customButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconMainContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContentContainer: {
    backgroundColor: "#FFFFFF14",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 10,
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
  tabBG: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
  },
});
