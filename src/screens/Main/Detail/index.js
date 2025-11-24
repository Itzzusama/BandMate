import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import ArtistDetailCard from "../../../components/ArtistDetailCard";

import AboutArtist from "./molecules/AboutArtist";
import Availability from "./molecules/Availability";
import DiscograpghyBtn from "./molecules/DiscograpghyBtn";
import FansOf from "./molecules/FansOf";
import Language from "./molecules/Language";
import LatestRelease from "./molecules/LatestRelease";
import Levels from "./molecules/Levels";
import LookingFor from "./molecules/LookingFor";
import MusicStyles from "./molecules/MusicStyles";
import PopularRelease from "./molecules/PopularRelease";
import SummaryCard from "./molecules/SummaryCard";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getPalette } from "@somesoap/react-native-image-palette";
import { useDispatch, useSelector } from "react-redux";
import {
  getLatestReleases,
  getTopTracks,
} from "../../../services/spotifyAuthService";
import { BlurView } from "@react-native-community/blur";
import Icons from "../../../components/Icons";
import { PNGIcons } from "../../../assets/images/icons";

const HEADER_MAX_HEIGHT = 460;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const Detail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const images = route?.params?.images;
  const profile = route?.params?.profile;
  const img = images ? images : null;
  const myPage = route?.params?.myPage;
  const user = useSelector((state) => state?.users?.userData);
  const artistId = "7dGJo4pcD2V6oG8kP0tJRR";
  const [bgColor, setBgColor] = useState("#000");
  const [userData, setUserData] = useState(myPage ? user : profile);
  const [latestReleases, setLatestReleases] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const releaseData = [];
  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!img) return;
    getPalette(img)
      .then((palette) => {
        if (palette?.darkVibrant) setBgColor(palette.darkVibrant);
      })
      .catch(() => {});
  }, [isFocus, img]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        const releases = await getLatestReleases(dispatch, artistId);
        setLatestReleases(releases);

        const tracks = await getTopTracks(dispatch, artistId);
        setTopTracks(tracks);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (artistId) fetchArtistData();
  }, [dispatch, artistId]);

  const cardTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE * 0.6],
    extrapolate: "clamp",
  });

  const headerBgOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <Animated.View
        style={[
          styles.parallaxCardContainer,
          { transform: [{ translateY: cardTranslateY }] },
        ]}
      >
        <ArtistDetailCard images={images} color={bgColor} userData={userData} />
      </Animated.View>

      <Animated.ScrollView
        style={[styles.scrollViewContent]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View
          style={[
            styles.contentArea,
            { marginTop: HEADER_MAX_HEIGHT, backgroundColor: bgColor },
          ]}
        >
          <SummaryCard match={64} inCommon={4} monthlyViews={528} />
          <AboutArtist
            name={
              userData?.role === "solo"
                ? "About " + userData?.display_name
                : "About " + userData?.bandName
            }
            bio={userData?.profile?.bio}
            myPage={myPage}
          />
          {myPage && <LatestRelease myPage={myPage} artistId={artistId} />}
          <Language myPage={myPage} />
          <MusicStyles myPage={myPage} userData={userData} />
          <Levels myPage={myPage} />
          <LookingFor myPage={myPage} userData={userData} />
          <Availability myPage={myPage} />
          {myPage && (
            <>
              <PopularRelease
                title={"Popular releases"}
                data={latestReleases}
                myPage={myPage}
                name={"Spotify"}
              />
              <DiscograpghyBtn />
              <PopularRelease
                title={"Popular releases"}
                data={releaseData}
                myPage={myPage}
                name={"SoundCloud"}
              />
              <DiscograpghyBtn />
            </>
          )}
          <FansOf myPage={myPage} userData={userData} />
          <PopularRelease
            title={`Songs ${
              userData?.role === "solo"
                ? userData?.display_name
                : userData?.bandName
            } Knows`}
            data={topTracks}
            showDots
            myPage={myPage}
            name={"Spotify"}
            onSeeAllPress={() => navigation.navigate("SongsList")}
          />
        </View>
      </Animated.ScrollView>

      <View style={[styles.stickyHeader, { paddingTop: insets.top }]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.6}
            style={{
              height: 40,
              width: 40,
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <BlurView
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              blurType="materialDark"
              blurAmount={16}
              reducedTransparencyFallbackColor={bgColor}
            >
              <Icons
                name="chevron-back"
                family="Ionicons"
                color="rgba(255, 255, 255, 0.64)"
                size={14}
              />
            </BlurView>
          </TouchableOpacity>
        </View>

        <Image source={PNGIcons.qr} style={{ height: 48, width: 48 }} />
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flex: 1,
  },

  parallaxCardContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  contentArea: {
    backgroundColor: "#fff",
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,

    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 11,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingTop: 12,
  },
});
