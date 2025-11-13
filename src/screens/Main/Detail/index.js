import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SongsImgs } from "../../../assets/images/songs";
import ArtistDetailCard from "../../../components/ArtistDetailCard";
import CustomButton from "../../../components/CustomButton";
import ScreenWrapper from "../../../components/ScreenWrapper";
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

import { getPalette } from "@somesoap/react-native-image-palette";

import { useDispatch, useSelector } from "react-redux";
import {
  getLatestReleases,
  getTopTracks,
} from "../../../services/spotifyAuthService";

const releaseData = [
  {
    img: SongsImgs.img3,
    title: "AM",
    des: "2013 • Album",
  },
  {
    img: SongsImgs.img2,
    title: "Favorite Worst Nightmare",
    des: "2007 • Album",
  },
  {
    img: SongsImgs.img1,
    title: "Whatever People Say I Am, That's What I'm Not",
    des: "2006 • Album",
  },
];
const songsData = [
  {
    img: SongsImgs.img1,
    title: "Live Forever - Remastered",
    des: "Oasis",
  },
  {
    img: SongsImgs.img2,
    title: "This Charming Man - 2011 Remaste",
    des: "The Smith",
  },
  {
    img: SongsImgs.img3,
    title: "Lucky Man",
    des: "The Verve",
  },
];
const Detail = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const isFocus = useIsFocused();
  const images = route.params?.images;
  const img = images[0];
  const myPage = route?.params?.myPage;
  const artistId = "7dGJo4pcD2V6oG8kP0tJRR";
  const [bgColor, setBgColor] = useState("");
  const { userData } = useSelector((state) => state.users);
  const [latestReleases, setLatestReleases] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!img) return;
    getPalette(img)
      .then((palette) => {
        if (palette?.vibrant) setBgColor(palette.darkVibrant);
      })
      .catch(() => {});
  }, [isFocus]);

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

    if (artistId) {
      fetchArtistData();
    }
  }, [dispatch, artistId]);

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={myPage ? 12 : 0.1}
      scrollEnabled
      backgroundColor={bgColor}
      footerUnScrollable={() =>
        !myPage && (
          <View style={{ padding: 12 }}>
            <CustomButton title={"Connect"} marginBottom={24} />
          </View>
        )
      }
    >
      <ArtistDetailCard images={images} color={bgColor} />
      <SummaryCard match={64} inCommon={4} monthlyViews={528} />
      <AboutArtist
        name={"About " + userData?.first_name}
        bio={userData?.profile?.bio}
        myPage={myPage}
      />
      <LatestRelease myPage={myPage} artistId={artistId} />
      <Language myPage={myPage} />
      <MusicStyles myPage={myPage} />

      <Levels myPage={myPage} />

      <LookingFor myPage={myPage} />

      <Availability myPage={myPage} />
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
      <FansOf myPage={myPage} />
      <PopularRelease
        title={`Songs ${userData?.first_name} Knows`}
        data={topTracks}
        showDots
        myPage={myPage}
        name={"Spotify"}
        onSeeAllPress={() => navigation.navigate("SongsList")}
      />
    </ScreenWrapper>
  );
};

export default Detail;

const styles = StyleSheet.create({});
