import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import Header from "./molecules/Header";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <ScreenWrapper
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header />}
    ></ScreenWrapper>
  );
};

export default Settings;

const styles = StyleSheet.create({});
