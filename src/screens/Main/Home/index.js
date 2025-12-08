import {
  ActivityIndicator,
  Dimensions,
  Platform,
  StyleSheet,
  View,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../assets/fonts";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { get } from "../../../services/ApiRequest";
import HomeCard from "./molecules/HomeCard";
import HomeHeader from "./molecules/HomeHeader";
import { useSelector } from "react-redux";

const Home = ({ navigation }) => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  const isFocus = useIsFocused();
  const [tab, setTab] = useState("For You");
  const [profileData, setProfileData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const getUserProfile = async (selectedTab = tab) => {
    try {
      let url = "matching/recommendations";

      if (selectedTab === "Nearby") {
        url += "?distance=2";
      }

      const response = await get(url);

      setProfileData(response.data?.recommendations || []);
      setRefreshing(false);
    } catch (error) {
      console.log("getUserProfile error", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [tab]);

  return (
    <ScreenWrapper
      translucent
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      headerUnScrollable={() => (
        <HomeHeader
          onFilterPress={() => navigation.navigate("FilterScreen")}
          onNotificationPress={() => navigation.navigate("Notification")}
        />
      )}
    >
      <LinearGradient
        colors={["#131E1F", "#121212"]}
        locations={[1, 0]}
        style={styles.gradientContainer}
      >
        {profileData?.length > 0 && (
          <TopTabWithBG
            alignSelf="center"
            tabNames={["For You", "Nearby"]}
            tab={tab}
            setTab={setTab}
            marginBottom={0.1}
            marginTop={12}
            height={40}
            activeFontFamily={fonts.medium}
            width={"55%"}
          />
        )}

        {refreshing ? (
          <View
            style={{
              height:
                Platform.OS == "ios"
                  ? screenHeight * 0.56 + 30
                  : screenHeight * 0.55 + 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size={"large"} />
          </View>
        ) : (
          <HomeCard
            data={profileData}
            getUserProfile={getUserProfile}
            tab={tab}
          />
        )}
      </LinearGradient>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
});
