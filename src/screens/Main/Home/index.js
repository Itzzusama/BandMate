import { StyleSheet } from "react-native";

import ScreenWrapper from "../../../components/ScreenWrapper";
import HomeCard from "./molecules/HomeCard";
import HomeHeader from "./molecules/HomeHeader";

const Home = ({ navigation }) => {
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
      <HomeCard />
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
