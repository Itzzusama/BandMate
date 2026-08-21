import { StyleSheet } from "react-native";

import { getPalette } from "@somesoap/react-native-image-palette";
import { useEffect, useState } from "react";

import fonts from "../../../assets/fonts";
import HomeSkeleton from "../../../components/HomeSkeleton";
import ScreenWrapper from "../../../components/ScreenWrapper";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { get } from "../../../services/ApiRequest";
import PremiumCard from "./molecules/PremiumCard";
import PremiumHeader from "./molecules/PremiumHeader";
import { getProfile } from "../../../utils/constants";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import LinearGradient from "react-native-linear-gradient";

const HomePremium = ({ navigation }) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();

  const [primaryColor, setPrimaryColor] = useState("#131E1F");
  const [tab, setTab] = useState("For You");
  const [profileData, setProfileData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  // Managed here so ScreenWrapper's backgroundImage updates in sync
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getUserProfile = async (selectedTab = tab, loading) => {
    try {
      let url = "matching/matches";
      if (selectedTab === "Nearby") {
        url += "?distance=2";
      }
      const response = await get(url);
      console.log(
        "response.data?.recommendations----",
        response.data?.recommendations?.length,
      );

      setProfileData(response.data?.recommendations || []);
      setCurrentIndex(0);
      setCurrentImageIndex(0);
      setRefreshing(false);
    } catch (error) {
      console.log("getUserProfile error", error);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [tab]);

  useEffect(() => {
    dispatch(getProfile());
  }, [isFocus]);

  useEffect(() => {
    const extractColor = async () => {
      try {
        const image =
          profileData?.[currentIndex]?.pictures?.[currentImageIndex] ||
          profileData?.[0]?.pictures?.[0] ||
          null;

        if (!image) return;

        const palette = await getPalette(image);
        const color =
          palette?.darkVibrant ||
          palette?.vibrant ||
          palette?.dominant ||
          "#131E1F";
        setPrimaryColor(color);
      } catch (err) {
        setPrimaryColor("#131E1F");
      }
    };

    extractColor();
  }, [profileData, currentIndex, currentImageIndex]);

  // Current profile image URI → passed as backgroundImage to ScreenWrapper
  const currentImageUri =
    profileData?.[currentIndex]?.pictures?.[currentImageIndex] ||
    profileData?.[currentIndex]?.pictures?.[0] ||
    null;

  return (
    <ScreenWrapper
      translucent
      paddingHorizontal={0}
      paddingBottom={0}
      backgroundImage={currentImageUri ? { uri: currentImageUri } : undefined}
      removeLoading
    >
      <LinearGradient
        colors={[
          "rgba(0, 0, 0, 0.85)",
          "rgba(0, 0, 0, 0.55)",
          "rgba(0, 0, 0, 0.20)",
          "transparent",
        ]}
        locations={[0, 0.35, 0.7, 1]}
        style={styles.topGradient}
        pointerEvents="none"
      />
      <LinearGradient
        colors={[
          "transparent",
          "rgba(0, 0, 0, 0.25)",
          "rgba(0, 0, 0, 0.70)",
          "rgba(0, 0, 0, 0.95)",
        ]}
        locations={[0, 0.25, 0.65, 1]}
        style={styles.bottomGradient}
        pointerEvents="none"
      />

      <PremiumHeader
        onFilterPress={() => navigation.navigate("FilterScreen")}
        onNotificationPress={() => navigation.navigate("Notification")}
      />
      {profileData?.length > 0 && !refreshing && (
        <TopTabWithBG
          alignSelf="center"
          tabNames={["For You", "Nearby"]}
          tab={tab}
          setTab={setTab}
          marginBottom={0}
          marginTop={10}
          height={40}
          activeFontFamily={fonts.medium}
          width={"55%"}
        />
      )}

      {refreshing ? (
        <HomeSkeleton />
      ) : (
        <PremiumCard
          data={profileData}
          getUserProfile={getUserProfile}
          tab={tab}
          primaryColor={primaryColor}
          setPrimaryColor={setPrimaryColor}
          setProfileData={setProfileData}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          currentImageIndex={currentImageIndex}
          setCurrentImageIndex={setCurrentImageIndex}
        />
      )}
    </ScreenWrapper>
  );
};

export default HomePremium;

const styles = StyleSheet.create({
  topGradient: {
    height: "38%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    // zIndex: 1,
  },
  bottomGradient: {
    height: "55%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    // zIndex: 1,
  },
});
