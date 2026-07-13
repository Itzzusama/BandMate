import { StyleSheet, View, FlatList } from "react-native";
import EventSkeleton from "../../../components/EventSkeleton";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "./molecules/Header";
import ToggleButtons from "./molecules/ToggleButtons";
import EventOrganizer from "./molecules/EventOrganizer";
import EventDetailCard from "./molecules/EventDetailCard";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import FilterModal from "./molecules/FilterModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get } from "../../../services/ApiRequest";
import { useSelector } from "react-redux";

const Event = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state?.users?.userData);

  const [openFilter, setOpenFilter] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const [filters, setFilters] = useState({});

  const getEvents = async () => {
    setLoading(true);

    try {
      const params = {};

      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.startDateFrom) params.startDateFrom = filters.startDateFrom;
      if (filters.startDateTo) params.startDateTo = filters.startDateTo;
      if (filters.minDistance) params.minDistance = filters.minDistance;
      if (filters.maxDistance) params.maxDistance = filters.maxDistance;

      if (filters.minDistance || filters.maxDistance) {
        params.lat = user?.address?.location?.coordinates[1];
        params.lng = user?.address?.location?.coordinates[0];
      }

      const queryString = Object.entries(params)
        .map(
          ([key, val]) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(val)}`,
        )
        .join("&");

      const url = queryString ? `events?${queryString}` : "events";

      const res = await get(url);
      if (res?.data?.success) {
        setEvents(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [filters]);

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
        <EventSkeleton />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id || item._id}
          contentContainerStyle={{ paddingBottom: insets.bottom + 70 }}
          renderItem={({ item }) => (
            <EventDetailCard
              data={item}
              marginBottom={10}
              onPress={() =>
                navigation.navigate("EventDetail", { id: item?._id })
              }
            />
          )}
        />
      )}

      <FilterModal
        isVisible={openFilter}
        onModalClose={() => setOpenFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </ScreenWrapper>
  );
};

export default Event;

const styles = StyleSheet.create({});
