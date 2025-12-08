import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "./molecules/Header";
import EventDetailCard from "./molecules/EventDetailCard";
import SearchEventHeader from "./molecules/SearchEventHeader";
import { COLORS } from "../../../utils/COLORS";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get } from "../../../services/ApiRequest";

const tabs = ["Rock", "Pop", "Jazz", "Blues", "Rap"];

const SearchEvent = () => {
  const [selectedTab, setSelectedTab] = useState("Rock");
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const insets = useSafeAreaInsets();

  const getEvents = async (genre, search) => {
    try {
      let url = `events?genres=${genre}`;

      if (search?.trim()) {
        url += `&search=${search.trim()}`;
      }

      const res = await get(url);

      if (res?.data?.success) {
        setEvents(res?.data?.data || []);
      }
    } catch (err) {
      console.log("Search Event Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getEvents(selectedTab, query);
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedTab, query]);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => (
        <View>
          <SearchEventHeader query={query} setQuery={setQuery} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabContainer}
          >
            {tabs.map((tab) => {
              const isSelected = tab === selectedTab;
              return (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setSelectedTab(tab)}
                  activeOpacity={0.8}
                  style={[
                    styles.tabButton,
                    isSelected && styles.tabButtonSelected,
                  ]}
                >
                  <CustomText
                    label={tab}
                    color={isSelected ? COLORS.white : COLORS.white3}
                    fontFamily={fonts.medium}
                    fontSize={14}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    >
      <View>
        {loading && (
          <ActivityIndicator
            size="large"
            color={COLORS.white}
            style={{ marginTop: 20 }}
          />
        )}

        {!loading && (
          <FlatList
            data={!loading ? events : []}
            keyExtractor={(item, index) => item?._id || index.toString()}
            renderItem={({ item, index }) => (
              <EventDetailCard
                data={item}
                marginBottom={
                  index === events.length - 1 ? insets.bottom + 10 : 0
                }
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: insets.bottom + 10,
            }}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default SearchEvent;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 2,
    gap: 8,
    marginBottom: 8,
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 100,
    backgroundColor: "transparent",
  },
  tabButtonSelected: {
    backgroundColor: COLORS.cardColor,
    borderColor: COLORS.cardColor,
  },
});
