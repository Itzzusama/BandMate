import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomInput from "../../../components/CustomInput";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { getAllArtistsTopTracks } from "../../../services/spotifyAuthService";
import { fetchSpotifyArtistsWithFallback } from "../../../services/spotifyArtistIds";
import SongsCard from "./molecules/SongsCard";
import OrderList from "./molecules/OrderList";

const SongsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("All");
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [viewMode, setViewMode] = useState("list");

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);

        const artistIds = await fetchSpotifyArtistsWithFallback(
          dispatch,
          "top artists"
        );

        const data = await getAllArtistsTopTracks(dispatch, artistIds);

        setSongs(data);
      } catch (error) {
        console.error("❌ Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  const filteredSongs = songs
    .map((artist) => ({
      ...artist,
      songs: artist.songs
        .filter(
          (track) =>
            track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artist.artistName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          if (sortOrder === "asc") return a.title.localeCompare(b.title);
          return b.title.localeCompare(a.title);
        }),
    }))
    .filter((artist) => artist.songs.length > 0);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      headerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12 }}>
          <View style={styles.header}>
            <CustomInput
              search
              width="86%"
              height={44}
              borderRadius={100}
              marginBottom={0.1}
              onChangeText={(text) => setSearchQuery(text)}
              isClear={() => setSearchQuery("")}
              value={searchQuery}
              placeholder="Search for a Song or Artist..."
              autoFocus
              backgroundColor={COLORS.cardColor}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              activeOpacity={0.8}
              onPress={() => navigation.goBack()}
            >
              <Image
                source={PNGIcons.white_cross}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: COLORS.white2,
                }}
              />
            </TouchableOpacity>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {["All", "Added"].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tab,
                  {
                    backgroundColor:
                      item === tab ? COLORS.cardColor : COLORS.black,
                  },
                ]}
                onPress={() => setTab(item)}
                activeOpacity={0.6}
              >
                <CustomText
                  label={item}
                  fontSize={14}
                  fontFamily={fonts.medium}
                  color={tab === item ? COLORS.white : COLORS.white2}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    >
      {loading ? (
        <ActivityIndicator size="large" style={{ marginTop: 30 }} />
      ) : (
        <>
          <OrderList
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          <FlatList
            data={filteredSongs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <SongsCard songGroup={item} />}
            contentContainerStyle={{ paddingBottom: 50 }}
          />
        </>
      )}
    </ScreenWrapper>
  );
};

export default SongsList;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    borderRadius: 99,
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardColor,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
    marginRight: 6,
    marginTop: 16,
    marginBottom: 12,
  },
});
