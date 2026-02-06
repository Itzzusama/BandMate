import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { SongsImgs } from "../../../../assets/images/songs";
import { useDispatch, useSelector } from "react-redux";
import { get, post } from "../../../../services/ApiRequest";
import { setUserData } from "../../../../store/reducer/usersSlice";

const SongsCard = ({ songGroup }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.userData);

  // 🔹 Per-song loader
  const [loadingMap, setLoadingMap] = useState({});

  if (!songGroup?.songs?.length) return null;

  // 🔹 Build favorite song id set (SOURCE OF TRUTH)
  const favoriteSongIds = useMemo(() => {
    return new Set(
      (user?.favoriteSongs || []).map((item) => item?.song?.spotifyId)
    );
  }, [user?.favoriteSongs]);

  const handleAddSong = async (track) => {
    const spotifyId = track.spotifyId || track.id;

    try {
      setLoadingMap((prev) => ({ ...prev, [spotifyId]: true }));

      const payload = {
        song: {
          title: track.title,
          artist: songGroup.artistName,
          album: track.album || "",
          spotifyId,
          duration: track.duration || "",
          image: track.img || "",
          releaseDate: track.releaseDate || "",
          genre: track.genre || "",
        },
      };

      const res = await post("user/add-favorite-song", payload);

      if (res?.data?.success) {
        const resp = await get("user/me");
        dispatch(setUserData(resp?.data?.data));
      }
    } catch (err) {
      console.log("Add song error:", err);
    } finally {
      setLoadingMap((prev) => ({ ...prev, [spotifyId]: false }));
    }
  };

  return (
    <View style={styles.container}>
      {/* Artist Header */}
      <View style={styles.nameContainer}>
        <View style={[styles.row, { flex: 1 }]}>
          <CustomText
            label={songGroup.artistName || "Unknown Artist"}
            fontSize={16}
            fontFamily={fonts.medium}
            color={COLORS.white}
          />
          <Icons
            family="MaterialIcons"
            name="verified"
            size={16}
            color="#1DA1F2"
          />
        </View>
      </View>

      {/* Songs */}
      {songGroup.songs.map((track, index) => {
        const spotifyId = track.spotifyId || track.id;
        const isAdded = favoriteSongIds.has(spotifyId);
        const isLoading = loadingMap[spotifyId];

        return (
          <View key={index} style={[styles.songsCard, styles.row]}>
            <View style={[styles.row, { gap: 12, flex: 1 }]}>
              <Image
                source={{ uri: track.img || SongsImgs.img2 }}
                style={styles.thumbnail}
              />
              <View style={{ width: "75%" }}>
                <CustomText
                  label={track.title || "Unknown Song"}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  color={COLORS.white}
                  numberOfLines={1}
                />
                <CustomText
                  label={track.duration || "0:00"}
                  fontSize={12}
                  color={COLORS.white2}
                />
              </View>
            </View>

            {isLoading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Pressable
                disabled={isLoading || isAdded}
                onPress={() => handleAddSong(track)}
              >
                <Icons
                  family={isAdded ? "MaterialCommunityIcons" : "Feather"}
                  name={isAdded ? "check-circle" : "plus-circle"}
                  size={24}
                  color={isAdded ? COLORS.btnColor : COLORS.white2}
                />
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default SongsCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: "100%",
  },
  nameContainer: {
    borderTopWidth: 4,
    borderBottomWidth: 4,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderColor: COLORS.cardColor,
    backgroundColor: COLORS.black,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  songsCard: {
    paddingBottom: 12,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  thumbnail: {
    height: 52,
    width: 52,
    borderRadius: 6,
    resizeMode: "cover",
  },
});
