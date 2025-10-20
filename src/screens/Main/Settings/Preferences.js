import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";

const Preferences = () => {
  return (
    <ScreenWrapper
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => <Header title={"Select Plan"} />}
    ></ScreenWrapper>
  );
};

export default Preferences;

const styles = StyleSheet.create({});
