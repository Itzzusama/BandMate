import { useIsFocused, useRoute } from "@react-navigation/native";
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
import { Images } from "../../../assets/images";

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
  const isFocus = useIsFocused();

  const images = route.params?.images;

  const img = images[0];

  const myPage = route?.params?.myPage;

  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    if (!img) return;
    getPalette(img)
      .then((palette) => {
        if (palette?.vibrant) setBgColor(palette.darkVibrant);
      })
      .catch(() => {});
  }, [isFocus]);

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
        name={"About Viktor"}
        bio={
          "Band with 8 years of experience. Looking to find musicians for jam sessions. Influenced by rock, indie, and alternative music mostly into 90s era."
        }
        myPage={myPage}
      />
      <LatestRelease myPage={myPage} />
      <Language myPage={myPage} />
      <MusicStyles myPage={myPage} />

      <Levels myPage={myPage} />

      <LookingFor myPage={myPage} />

      <Availability myPage={myPage} />
      <PopularRelease
        title={"Popular releases"}
        data={releaseData}
        myPage={myPage}
      />
      <DiscograpghyBtn />
      <PopularRelease
        title={"Popular releases"}
        data={releaseData}
        myPage={myPage}
      />
      <DiscograpghyBtn />
      <FansOf myPage={myPage} />
      <PopularRelease
        title={"Songs Viktor Knows"}
        data={songsData}
        showDots
        myPage={myPage}
      />
    </ScreenWrapper>
  );
};

export default Detail;

const styles = StyleSheet.create({});
