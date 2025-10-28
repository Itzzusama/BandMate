import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHomeSheet } from "../context/HomeSheetContext";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import ImageFast from "../components/ImageFast";

import Chat from "../screens/Main/Chat/Chat";
import Home from "../screens/Main/Home";
import Event from "../screens/Main/Event";
import SocialFeeds from "../screens/Main/SocialFeeds";
import Settings from "../screens/Main/Settings";

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

  if (isHomeSheetOpen) {
    return null;
  }

  return (
    <View style={[styles.tabMainContainer, { height: 90 + insets.bottom }]}>
      <View style={styles.tabContentContainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
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
                case "Feeds":
                  return Images.feeds;
                case "Events":
                  return Images.event;
                case "Settings":
                  return Images.setting; // ✅ use your settings icon here
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
                    route.name == "Home" && styles.icon2,
                    route.name == "Settings" && styles.icon3,
                    {
                      tintColor: isFocused ? COLORS.black : COLORS.white3,
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
      <Tab.Screen name="Feeds" component={SocialFeeds} />
      <Tab.Screen name="Events" component={Event} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};

export default TabStack;

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  icon2: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  icon3: {
    width: 28,
    height: 28,
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
    width: 56,
    height: 56,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContentContainer: {
    backgroundColor: "#252525",
    borderRadius: 100,
    alignSelf: "center",
    marginTop: 10,
    height: 64,
    overflow: "hidden",
  },
  tabMainContainer: {
    paddingTop: 10,
    width: "100%",
    position: "absolute",
    zIndex: 999,
    bottom: 0,
  },
});
