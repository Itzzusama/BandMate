import { StyleSheet, View } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomButton from "../../../components/CustomButton";
import ArtistDetailCard from "../../../components/ArtistDetailCard";
import { SongsImgs } from "../../../assets/images/songs";
import SummaryCard from "./molecules/SummaryCard";
import AboutArtist from "./molecules/AboutArtist";
import LatestRelease from "./molecules/LatestRelease";
import Divider from "./molecules/Divider";
import MusicStyles from "./molecules/MusicStyles";
import LookingFor from "./molecules/LookingFor";
import Availability from "./molecules/Availability";
import Levels from "./molecules/Levels";
import PopularRelease from "./molecules/PopularRelease";
import FansOf from "./molecules/FansOf";

const releaseData = [
  {
    img: SongsImgs.img1,
    title: "AM",
    des: "2013 • Album",
  },
  {
    img: SongsImgs.img2,
    title: "Favorite Worst Nightmare",
    des: "2007 • Album",
  },
  {
    img: SongsImgs.img3,
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
  return (
    <ScreenWrapper
      paddingHorizontal={0.1}
      paddingBottom={0.1}
      scrollEnabled
      footerUnScrollable={() => (
        <CustomButton title={"Connect"} marginBottom={50} width="94%" />
      )}
    >
      <ArtistDetailCard />
      <SummaryCard match={64} inCommon={4} monthlyViews={528} />
      <AboutArtist
        name={"About Viktor"}
        bio={
          "Band with 8 years of experience. Looking to find musicians for jam sessions. Influenced by rock, indie, and alternative music mostly into 90s era."
        }
      />
      <LatestRelease />
      <Divider />
      <MusicStyles />
      <Divider />
      <Levels />
      <Divider />
      <LookingFor />
      <Divider />
      <Availability />
      <PopularRelease title={"Popular releases"} data={releaseData} />
      <PopularRelease title={"Popular releases"} data={releaseData} />
      <FansOf />
      <PopularRelease title={"Songs Viktor Knows"} data={songsData} showDots />
    </ScreenWrapper>
  );
};

export default Detail;

const styles = StyleSheet.create({});
