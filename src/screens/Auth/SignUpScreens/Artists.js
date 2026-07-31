import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import SearchInput from "../../../components/SearchInput";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import Icons from "../../../components/Icons";
import { put } from "../../../services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import { sortAlphabetically } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";
import ConnentAccount from "../../Main/Detail/molecules/ConnentAccount";

import {
  loginWithSpotify,
  checkSpotifyTokenValidity,
} from "../../../services/spotifyAuthService";
import { SPOTIFY_ARTIST_IDS } from "../../../services/spotifyArtistIds";

const DEFAULT_ARTISTS = [
  {
    id: "1dfeR4HaWDbWqFHLkxsg1d",
    name: "Queen",
    img: {
      uri: "https://i.scdn.co/image/b040846ceba13c3e9c125d68389491094e7f2982",
    },
  },
  {
    id: "3WrFJ7ztbogyGnTHbHJFl2",
    name: "The Beatles",
    img: {
      uri: "https://i.scdn.co/image/6b2a709752ef9c7aaf0d270344157f6cd2e0f1a7",
    },
  },
  {
    id: "0k17h0D3J5VfsdmQ1iZtE9",
    name: "Pink Floyd",
    img: {
      uri: "https://i.scdn.co/image/d011c95081cd9a329e506abd7ded47535d524a07",
    },
  },
  {
    id: "36QJpDe2go2KgaRleHCDTp",
    name: "Led Zeppelin",
    img: {
      uri: "https://i.scdn.co/image/207803ce008388d3427a685254f9de6a8f61dc2e",
    },
  },
  {
    id: "3fMbdgg4jU18AjLCKBhRSm",
    name: "Michael Jackson",
    img: {
      uri: "https://i.scdn.co/image/ab6761610000e5eb0e08ea2c4d6789fbf5cbe0aa",
    },
  },
  {
    id: "7Ey4PD4MYsKc5I2dolUwbH",
    name: "Metallica",
    img: {
      uri: "https://i.scdn.co/image/ab6761610000e5eb69a0a9c2a434c6f26a95471d",
    },
  },
  {
    id: "6XyY86QOPPrYVGvF9ch6wz",
    name: "Linkin Park",
    img: {
      uri: "https://i.scdn.co/image/ab6761610000e5eb811f3b785b6ef52632f49d27",
    },
  },
  {
    id: "53XhwfbYqKCa1cC15pYq2q",
    name: "Imagine Dragons",
    img: {
      uri: "https://i.scdn.co/image/ab6761610000e5eb920dc1f617550de8388f368e",
    },
  },
  {
    id: "6olE6TJLqED3rqDCT0FyPh",
    name: "Nirvana",
    img: {
      uri: "https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36",
    },
  },
  {
    id: "0L8ExT028jH3ddEcZwqJJ5",
    name: "Red Hot Chili Peppers",
    img: {
      uri: "https://i.scdn.co/image/ab6761610000e5eb5fdb0b89e2881970c0e87e7e",
    },
  },
];

const Artists = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { fromScreen } = route?.params || {};
  const { userData } = useSelector((state) => state.users);

  const [spotifyArtists, setSpotifyArtists] = useState([]);
  const [loadingSpotify, setLoadingSpotify] = useState(false);
  const [selectedArtists, setSelectedArtists] = useState(
    route?.params?.fromScreen == "Home" && !route?.params?.isEvent
      ? userData?.Artists
      : [],
  );
  const [error, setError] = useState("");
  const [prevError, setPrevError] = useState("");
  const [showSuccessColor, setShowSuccessColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSpotify, setHasSpotify] = useState(false);
  const { accessToken } = useSelector((state) => state?.spotifyAuth);
  const [searchQuery, setSearchQuery] = useState("");

  const displayedArtists =
    spotifyArtists.length > 0
      ? spotifyArtists
      : sortAlphabetically(DEFAULT_ARTISTS);
  const filteredArtists = displayedArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    AsyncStorage.getItem("spToken").then((t) => {
      setHasSpotify(!!t);
    });
  }, []);
  const step = userData?.role === "band" ? 13 : 14;
  const totalSteps = userData?.role === "band" ? 15 : 16;

  useEffect(() => {
    setSpotifyArtists(DEFAULT_ARTISTS);

    checkTokenAndFetch();
  }, [accessToken]);

  const checkTokenAndFetch = async () => {
    const token = await AsyncStorage.getItem("spToken");
    if (token) getSpotifyArtists();
  };

  useEffect(() => {
    if (searchQuery) {
      const delayDebounce = setTimeout(() => {
        AsyncStorage.getItem("spToken").then((token) => {
          if (token) {
            getSpotifyArtists(searchQuery);
          }
        });
      }, 500);
      return () => clearTimeout(delayDebounce);
    } else {
      checkTokenAndFetch();
    }
  }, [searchQuery]);
  useEffect(() => {
    if (prevError && !error) {
      setShowSuccessColor(true);
      const timer = setTimeout(() => setShowSuccessColor(false), 2000);
      return () => clearTimeout(timer);
    }
    setPrevError(error);
  }, [error]);

  const CLEAN_PATTERNS = [
    /top/i,
    /best/i,
    /hits/i,
    /playlist/i,
    /mix/i,
    /various/i,
    /^\d+$/,
    /^\d{4}/,
  ];

  const isValidArtist = (name) => {
    return !CLEAN_PATTERNS.some((pattern) => pattern.test(name));
  };
  const getSpotifyArtists = async (query = "top artists", limit = 40) => {
    try {
      setLoadingSpotify(true);
      let token = await dispatch(checkSpotifyTokenValidity());
      console.log("=========>", token);
      const idsQuery = SPOTIFY_ARTIST_IDS.join(",");
      const res = await fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${encodeURIComponent(
          query,
        )}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      if (data?.artists?.items?.length > 0) {
        const cleaned = data.artists.items
          .filter(
            (artist) =>
              artist.name &&
              artist.images?.[0]?.url &&
              isValidArtist(artist.name),
          )
          .map((artist) => ({
            id: artist.id,
            name: artist.name,
            img: { uri: artist.images[0].url },
          }));

        setSpotifyArtists(cleaned.length > 0 ? cleaned : DEFAULT_ARTISTS);
      } else {
        setSpotifyArtists(DEFAULT_ARTISTS);
      }
    } catch (err) {
      console.error("Spotify fetch artists error:", err);

      setSpotifyArtists(DEFAULT_ARTISTS);
    } finally {
      setLoadingSpotify(false);
    }
  };

  const toggleArtist = (artist) => {
    setSelectedArtists((prev) => {
      const exists = prev.find((a) => a.spotifyId === artist.id);
      if (exists) {
        return prev.filter((a) => a.spotifyId !== artist.id);
      } else {
        return [
          ...prev,
          {
            artist: artist.name,
            image: artist.img.uri,
            spotifyId: artist.id,
          },
        ];
      }
    });
  };

  const errorCheck = () => {
    if (selectedArtists.length < 3) return "Please choose at least 3 artists.";
    return "";
  };
  const handleNext = async () => {
    const err = errorCheck();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (route?.params?.isEvent) {
      console.log(selectedArtists);
      route?.params?.onSelect(selectedArtists);
      navigation.goBack();
      return;
    }
    setIsLoading(true);

    try {
      const res = await put("user/profile", { Artists: selectedArtists });

      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
        ToastMessage("Your favorite artists have been added!", "success");
        if (route?.params?.fromScreen == "Home") {
          navigation.goBack();
        } else {
          navigation.navigate("AddPictures");
        }
      }
    } catch (err) {
      console.log(err);
      ToastMessage(err?.data?.message || err?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() =>
        fromScreen === "Home" && (
          <Header
            title={route?.params?.isEvent ? "Add Artists" : "Edit Artists"}
          />
        )
      }
      footerUnScrollable={() =>
        fromScreen === "Home" ? (
          <View style={{ padding: 12 }}>
            <CustomButton
              title={"Submit"}
              marginBottom={24}
              onPress={handleNext}
              btnLoading={isLoading}
              disabled={isLoading || selectedArtists.length < 3}
            />
          </View>
        ) : (
          <AuthFooter
            paddingHorizontal={12}
            onPress={handleNext}
            onBackPress={handleBack}
            btnLoading={isLoading}
            btnDisabled={selectedArtists.length < 3}
          />
        )
      }
    >
      {fromScreen !== "Home" && (
        <AuthHeader
          step={step}
          totalSteps={totalSteps}
          subtitle="Pick your favorite artists"
        />
      )}

      <View style={styles.container}>
        <CustomText
          label="Choose 3 or more artists you like."
          fontFamily={fonts.abril}
          fontSize={32}
          lineHeight={32 * 1.1}
          marginTop={12}
        />
        <CustomText
          label="Tell us about your musical idols."
          fontSize={12}
          color={COLORS.white2}
          marginBottom={12}
        />

        <SearchInput
          placeholder="E.g. Coldplay, Bowie, Blur..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          isCross
          isClear={() => setSearchQuery("")}
        />

        <CustomText
          label="Just enter names or connect Spotify to auto-fill"
          fontSize={12}
          color={COLORS.white2}
          marginBottom={12}
          marginTop={4}
        />

        {!accessToken && (
          <ConnentAccount
            accName="Spotify"
            onPress={() => dispatch(loginWithSpotify())}
            bottom={12}
            disabled={loadingSpotify}
          />
        )}
        {loadingSpotify && (
          <ActivityIndicator
            color={COLORS.btnColor}
            style={{ marginBottom: 12 }}
          />
        )}

        <ErrorComponent
          errorTitle={`Choose at least ${selectedArtists.length}/3`}
          color={
            error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.white2
          }
          isValid={showSuccessColor}
          error={error}
          color1={error ? "#EE1045" : showSuccessColor ? "#64CD75" : ""}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <View style={styles.grid}>
            {filteredArtists.length > 0 ? (
              filteredArtists.map((artist) => {
                const isSelected = selectedArtists.some(
                  (a) => a.spotifyId === artist.id,
                );
                return (
                  <TouchableOpacity
                    key={artist.name}
                    style={styles.card}
                    onPress={() => toggleArtist(artist)}
                    activeOpacity={0.8}
                  >
                    <View
                      style={[
                        styles.imageWrapper,
                        {
                          borderColor: isSelected
                            ? COLORS.btnColor
                            : COLORS.black,
                          borderWidth: isSelected ? 3 : 0,
                        },
                      ]}
                    >
                      <Image
                        source={artist.img}
                        style={styles.artistImage}
                        resizeMode="cover"
                      />
                      {isSelected && (
                        <View style={styles.overlay}>
                          <Icons
                            family="MaterialCommunityIcons"
                            name={"check-circle"}
                            size={36}
                            color={COLORS.btnColor}
                          />
                        </View>
                      )}
                    </View>

                    <CustomText
                      label={artist.name}
                      fontSize={12}
                      color={COLORS.white}
                      fontFamily={fonts.medium}
                      textAlign="center"
                      marginTop={4}
                      numberOfLines={2}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <View style={styles.noResultsContainer}>
                <CustomText
                  label="No artists found matching your search."
                  color={COLORS.white2}
                  fontSize={14}
                  fontFamily={fonts.regular}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Artists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  card: {
    width: "33.33%",
    alignItems: "center",
    marginBottom: 12,
  },
  imageWrapper: {
    borderRadius: 100,
    overflow: "hidden",
    height: 116,
    width: 116,
    justifyContent: "center",
    alignItems: "center",
  },
  artistImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.45)",
    width: "100%",
    height: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  noResultsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    width: "100%",
  },
});
