import { StyleSheet, View, ActivityIndicator, FlatList } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import Header from "./molecules/Header";
import ToggleButtons from "./molecules/ToggleButtons";
import EventOrganizer from "./molecules/EventOrganizer";
import EventDetailCard from "./molecules/EventDetailCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import FilterModal from "./molecules/FilterModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get } from "../../../services/ApiRequest";

const Event = () => {
  const navigation = useNavigation();
  const [openFilter, setOpenFilter] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const getEvents = async () => {
    setLoading(true);
    try {
      const res = await get("events");
      if (res?.data?.success) {
        setEvents(res.data.data); // save API data
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

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
    >
      <ToggleButtons />
      <EventOrganizer />

      {loading ? (
        <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id || item._id}
          contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
          renderItem={({ item }) => (
            <EventDetailCard data={item} marginBottom={10} />
          )}
        />
      )}

      <FilterModal
        isVisible={openFilter}
        onModalClose={() => setOpenFilter(false)}
      />
    </ScreenWrapper>
  );
};

export default Event;

const styles = StyleSheet.create({});
