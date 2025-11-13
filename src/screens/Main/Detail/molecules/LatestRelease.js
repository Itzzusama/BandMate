import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import ImageFast from "../../../../components/ImageFast";
import EditButton from "./EditButton";
import {
  checkSpotifyTokenValidity,
  loginWithSpotify,
  spotifyDataService,
} from "../../../../services/spotifyAuthService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

const LatestRelease = ({ myPage, artistId }) => {
  const [latestRelease, setLatestRelease] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!artistId) return;

    const fetchLatestRelease = async () => {
      try {
        setLoading(true);

        const albums = await spotifyDataService.getArtistAlbums(artistId);
        if (albums?.length > 0) {
          const sorted = albums.sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          );
          setLatestRelease(sorted[0]);
        }
      } catch (err) {
        console.log("Error fetching latest release:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRelease();
  }, [artistId]);

  if (loading) {
    return (
      <ActivityIndicator
        color={COLORS.btnColor}
        style={{ marginVertical: 20 }}
      />
    );
  }

  if (!latestRelease) {
    return; //<CustomText label="No releases found." color={COLORS.white2} />;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          { marginBottom: 8, justifyContent: "space-between" },
        ]}
      >
        <CustomText
          label={"Latest release"}
          fontFamily={fonts.medium}
          color={COLORS.white}
          fontSize={17}
          lineHeight={17 * 1.4}
        />
        {myPage && <EditButton />}
      </View>

      <TouchableOpacity activeOpacity={0.7}>
        <ImageFast
          source={{ uri: latestRelease.images[0]?.url }}
          style={styles.imgStyle}
        >
          <LinearGradient
            colors={["#14141499", "#14141440", "#14141499"]}
            start={{ x: 0.5, y: 1 }}
            end={{ x: 0.5, y: 0 }}
            style={styles.bottomGradient}
          />

          <CustomText
            label={`Posted by ${latestRelease.artists[0]?.name}`}
            fontFamily={fonts.medium}
            color={COLORS.white}
            fontSize={14}
            lineHeight={14 * 1.4}
            marginTop={26}
            marginLeft={18}
          />

          <View style={styles.bottomContent}>
            <View style={styles.bottonRow}>
              <View style={styles.row}>
                <Image
                  source={{ uri: latestRelease.images[0]?.url }}
                  style={styles.thumbnail}
                />
                <View style={{ flex: 1 }}>
                  <CustomText
                    label={latestRelease.name}
                    fontFamily={fonts.medium}
                    color={COLORS.white}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                  <CustomText
                    label={latestRelease.album_type}
                    fontFamily={fonts.medium}
                    color={COLORS.white2}
                    fontSize={12}
                    lineHeight={12 * 1.4}
                  />
                </View>
              </View>
              <Image source={PNGIcons.forward} style={styles.forwardIcon} />
            </View>
          </View>
        </ImageFast>
      </TouchableOpacity>
    </View>
  );
};

export default LatestRelease;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingBottom: 18,
  },
  imgStyle: {
    width: "100%",
    height: 261,
    resizeMode: "cover",
    borderRadius: 12,
  },
  bottomGradient: {
    ...StyleSheet.absoluteFillObject,
    bottom: 0,
  },
  bottomContent: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
    paddingHorizontal: 18,
  },
  bottonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  thumbnail: {
    height: 54,
    width: 54,
    resizeMode: "contain",
    marginRight: 16,
  },
  forwardIcon: {
    height: 28,
    width: 28,
    tintColor: COLORS.white2,
  },
});
