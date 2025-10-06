import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ImageFast from "../../../../components/ImageFast";

import { Images } from "../../../../assets/images";

const BottomTab = () => {
  const navigation = useNavigation();

  const onNavigate = (name) => {
    navigation.navigate("MainStack", {
      screen: "TabStack",
      params: { screen: name },
    });
  };
  const Item = ({ icon, onPress, isActive }) => {
    return (
      <TouchableOpacity
        style={[
          styles.iconMainContainer,
          { backgroundColor: isActive ? "#FFFFFF" : "transparent" },
        ]}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <Image
          source={icon}
          style={[
            styles.icon,
            { tintColor: isActive ? "#121212;" : "#FFFFFFA3" },
          ]}
        />
      </TouchableOpacity>
    );
  };
  const CustomTabBarButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <ImageFast source={Images.buzz} style={styles.buzz} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.tabMainContainer}>
      <ImageFast
        removeLoading
        source={Images.tabBG}
        style={styles.tabBG}
        resizeMode="cover"
      />
      <View style={styles.tabContentContainer}>
        <Item
          isActive
          icon={Images.blurhome}
          onPress={() => onNavigate("Home")}
        />
        <Item icon={Images.blurInbox} onPress={() => onNavigate("Inbox")} />
        <Item icon={Images.blurdash} onPress={() => onNavigate("Dashboard")} />
        <Item icon={Images.blurFaq} onPress={() => onNavigate("FAQ & News")} />

        <CustomTabBarButton onPress={() => onNavigate("Profile")} />
      </View>
    </View>
  );
};

export default BottomTab;

const styles = StyleSheet.create({
  iconMainContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContentContainer: {
    backgroundColor: "#dad8d3a3",
    padding: 4,
    borderRadius: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignSelf: "center",
    gap: 8,
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  tabMainContainer: {
    paddingTop: 10,
    width: "100%",
    height: 110,
    position: "absolute",
    zIndex: 999,
    bottom: 0,
    width: "100%",
  },
  buzz: {
    width: 48,
    height: 48,
    borderRadius: 100,
  },
  tabBG: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
  },
});
