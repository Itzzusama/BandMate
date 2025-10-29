import { StyleSheet } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import HomeCard from "./molecules/HomeCard";
import HomeHeader from "./molecules/HomeHeader";
import TopTabWithBG from "../../../components/TopTabWithBG";
import { useState } from "react";
import fonts from "../../../assets/fonts";

const Home = ({ navigation }) => {
  const [tab, setTab] = useState("For You");
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
      <HomeCard />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
