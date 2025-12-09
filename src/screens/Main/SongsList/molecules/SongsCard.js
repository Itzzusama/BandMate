import { Image, Pressable, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { SongsImgs } from "../../../../assets/images/songs";
import { useDispatch } from "react-redux";
import { post } from "../../../../services/ApiRequest";
import { clampRGBA } from "react-native-reanimated/lib/typescript/Colors";

const SongsCard = ({ songGroup }) => {
  const dispatch = useDispatch();
  const [addedSongs, setAddedSongs] = useState({});

  if (!songGroup?.songs?.length) return null;

  const handleAddSong = async (track) => {
    try {
      setAddedSongs((prev) => ({ ...prev, [track.id]: true }));

      const payload = {
        song: {
          title: track.title,
          artist: songGroup.artistName,
          album: track.album || "",
          spotifyId: track.id,
          duration: track.duration || 0,
          image: track.img || "",
          releaseDate: track.releaseDate || "",
          genre: track.genre || "",
        },
      };

      const res = await post("user/add-favorite-song", payload);

      if (res?.data?.success) {
        console.log(res?.data?.message);
      }
    } catch (err) {
      console.error("Add favorite song error:", err);
      // rollback UI change on failure
      setAddedSongs((prev) => ({ ...prev, [track.spotifyId]: false }));
    }
  };

  return (
    <View style={styles.container}>
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

      {songGroup.songs.map((track, index) => {
        console.log(track);
        const isAdded = addedSongs[track.id] || false;
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

            <Pressable onPress={() => handleAddSong(track)}>
              <Icons
                family={isAdded ? "MaterialCommunityIcons" : "Feather"}
                name={isAdded ? "check-circle" : "plus-circle"}
                size={24}
                color={isAdded ? COLORS.btnColor : COLORS.white2}
              />
            </Pressable>
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
