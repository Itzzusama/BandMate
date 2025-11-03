import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import ArtistDetailCard from "../../../components/ArtistDetailCard";
import { SongsImgs } from "../../../assets/images/songs";
import SummaryCard from "./molecules/SummaryCard";
import AboutArtist from "./molecules/AboutArtist";
import LatestRelease from "./molecules/LatestRelease";
import MusicStyles from "./molecules/MusicStyles";
import LookingFor from "./molecules/LookingFor";
import Availability from "./molecules/Availability";
import Levels from "./molecules/Levels";
import PopularRelease from "./molecules/PopularRelease";
import FansOf from "./molecules/FansOf";
import DiscograpghyBtn from "./molecules/DiscograpghyBtn";
import { useRoute } from "@react-navigation/native";
import Language from "./molecules/Language";

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
const Detail = ({ navigation }) => {
  const route = useRoute();
  const { myPage } = route?.params || {};

  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      footerUnScrollable={() =>
        myPage ? (
          <View style={{ padding: 12 }} />
        ) : (
          <View style={{ padding: 12 }}>
            <CustomButton title={"Connect"} marginBottom={24} />
          </View>
        )
      }
    >
      <ArtistDetailCard />
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
