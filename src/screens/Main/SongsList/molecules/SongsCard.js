import { Image, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Icons from "../../../../components/Icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import { SongsImgs } from "../../../../assets/images/songs";

const SongsCard = ({ songGroup }) => {
  if (!songGroup?.songs?.length) return null;

  return (
    <View style={styles.container}>
      {/* 🎤 Artist Header */}
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

      {/* 🎶 Song List */}
      {songGroup.songs.map((track, index) => (
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
          <Pressable>
            <Icons
              family="MaterialCommunityIcons"
              name={"check-circle"}
              size={24}
              color={COLORS.btnColor}
            />
          </Pressable>
        </View>
      ))}
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
  },
  thumbnail: {
    height: 52,
    width: 52,
    borderRadius: 6,
    resizeMode: "cover",
  },
});
