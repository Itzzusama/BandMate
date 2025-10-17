import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import Header from "./molecules/Header";
import ToggleButtons from "./molecules/ToggleButtons";
import EventOrganizer from "./molecules/EventOrganizer";
import EventDetailCard from "./molecules/EventDetailCard";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import FilterModal from "./molecules/FilterModal";

const Event = () => {
  const navigation = useNavigation();
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          onSearchPress={() => navigation.navigate("SearchEvent")}
          onFilterPress={() => setOpenFilter(true)}
          setOpenFilter={setOpenFilter}
        />
      )}
      footerUnScrollable={() => (
        <View style={{ padding: 12, paddingTop: 0 }}>
          <CustomButton title={"Connect"} marginBottom={24} />
        </View>
      )}
    >
      <ToggleButtons />
      <EventOrganizer />
      <EventDetailCard />
      <EventDetailCard />
      <EventDetailCard />

      <FilterModal
        isVisible={openFilter}
        onModalClose={() => setOpenFilter(false)}
      />
    </ScreenWrapper>
  );
};

export default Event;

const styles = StyleSheet.create({});
