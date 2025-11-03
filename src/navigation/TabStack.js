// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { useHomeSheet } from "../context/HomeSheetContext";
// import { Images } from "../assets/images";
// import { COLORS } from "../utils/COLORS";
// import ImageFast from "../components/ImageFast";

// import Chat from "../screens/Main/Chat/Chat";
// import Home from "../screens/Main/Home";
// import Event from "../screens/Main/Event";
// import SocialFeeds from "../screens/Main/SocialFeeds";
// import Settings from "../screens/Main/Settings";
// import Icons from "../components/Icons";

// const Tab = createBottomTabNavigator();

// const CustomTabBarButton = (props) => (
//   <TouchableOpacity
//     style={styles.customButtonContainer}
//     onPress={props.onPress}
//     activeOpacity={0.7}
//   >
//     <ImageFast source={Images.buzz} style={styles.buzz} />
//   </TouchableOpacity>
// );

// const CustomTabBar = ({ state, descriptors, navigation }) => {
//   const insets = useSafeAreaInsets();
//   const { isHomeSheetOpen } = useHomeSheet();

//   if (isHomeSheetOpen) {
//     return null;
//   }

//   return (
//     <View style={[styles.tabMainContainer, { height: 90 + insets.bottom }]}>
//       <View style={styles.tabContentContainer}>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "space-between",
//             gap: 6,
//             padding: 4,
//           }}
//         >
//           {state.routes.map((route, index) => {
//             const { options } = descriptors[route.key];
//             const label =
//               options.tabBarLabel !== undefined
//                 ? options.tabBarLabel
//                 : options.title !== undefined
//                 ? options.title
//                 : route.name;

//             const isFocused = state.index === index;

//             const onPress = () => {
//               const event = navigation.emit({
//                 type: "tabPress",
//                 target: route.key,
//                 canPreventDefault: true,
//               });

//               if (!isFocused && !event.defaultPrevented) {
//                 navigation.navigate(route.name);
//               }
//             };

//             const getIcon = () => {
//               switch (route.name) {
//                 case "Home":
//                   return Images.blurhome;
//                 case "Chat":
//                   return Images.blurInbox;
//                 case "Feeds":
//                   return Images.feeds;
//                 case "Events":
//                   return Images.event;
//                 case "Settings":
//                   return Images.setting; // ✅ use your settings icon here
//                 default:
//                   return null;
//               }
//             };

//             if (route.name === "Profile") {
//               return <CustomTabBarButton key={route.key} onPress={onPress} />;
//             }

//             return (
//               <TouchableOpacity
//                 key={route.key}
//                 style={[
//                   styles.iconMainContainer,
//                   { backgroundColor: isFocused ? "#FFFFFF" : "transparent" },
//                 ]}
//                 activeOpacity={0.6}
//                 onPress={onPress}
//               >
//                 <Image
//                   source={getIcon()}
//                   style={[
//                     styles.icon,
//                     route.name == "Home" && styles.icon2,
//                     route.name == "Settings" && styles.icon3,
//                     {
//                       tintColor: isFocused ? COLORS.black : COLORS.white3,
//                     },
//                   ]}
//                 />
//               </TouchableOpacity>
//             );
//           })}
//         </View>
//       </View>

//       <TouchableOpacity
//         style={[styles.plusButton, { bottom: 20 + insets.bottom }]}
//         activeOpacity={0.7}
//         onPress={() => navigation.navigate("PublishPost")}
//       >
//         <Icons family="Feather" name="plus" size={20} color={COLORS.white} />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const TabStack = () => {
//   return (
//     <Tab.Navigator
//       tabBar={(props) => <CustomTabBar {...props} />}
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: false,
//       }}
//     >
//       <Tab.Screen name="Home" component={Home} />
//       <Tab.Screen name="Feeds" component={SocialFeeds} />
//       <Tab.Screen name="Events" component={Event} />
//       <Tab.Screen name="Chat" component={Chat} />
//     </Tab.Navigator>
//   );
// };

// export default TabStack;

// const styles = StyleSheet.create({
//   icon: {
//     width: 22,
//     height: 22,
//     resizeMode: "contain",
//   },
//   buzz: {
//     width: 46,
//     height: 46,
//     borderRadius: 99,
//   },
//   customButtonContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   iconMainContainer: {
//     width: 48,
//     height: 48,
//     borderRadius: 99,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   tabContentContainer: {
//     backgroundColor: "#252525",
//     borderRadius: 100,
//     alignSelf: "flex-start",
//     marginTop: 10,
//     marginLeft: 20,
//     height: 56,
//     overflow: "hidden",
//   },
//   tabMainContainer: {
//     paddingTop: 10,
//     width: "100%",
//     position: "absolute",
//     zIndex: 999,
//     bottom: 0,
//   },
//   plusButton: {
//     position: "absolute",
//     right: 20,
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     backgroundColor: "#FFFFFF35",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "rgba(255,255,255,0.16)",
//   },
//   tabBG: {
//     width: "100%",
//     height: "100%",
//     position: "absolute",
//     bottom: 0,
//   },
// });

import { BlurView } from "@react-native-community/blur";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Images } from "../assets/images";
import ImageFast from "../components/ImageFast";
import { COLORS } from "../utils/COLORS";

import Home from "../screens/Main/Home";
import Event from "../screens/Main/Event";
import Icons from "../components/Icons";
import SocialFeeds from "../screens/Main/SocialFeeds";
import Chat from "../screens/Main/Chat/Chat";
import SampleScreen from "../screens/Main/Home/molecules/SampleScreen";

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

  return (
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
            const { options } = descriptors[route.key];
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
      {/* Right-most plus button */}
      <TouchableOpacity
        style={[styles.plusButton, { bottom: 20 + insets.bottom }]}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("PublishPost")}
      >
        <Icons family="Feather" name="plus" size={20} color={COLORS.white} />
      </TouchableOpacity>
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
    backgroundColor: COLORS?.light?.inputBackground,
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
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  tabBG: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
  },
});
