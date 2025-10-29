import React from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import { EventImages } from "../../../../assets/images/eventImages";
import { PNGIcons } from "../../../../assets/images/icons";
import Icons from "../../../../components/Icons";

const EventDetailCard = ({ marginBottom }) => {
  return (
    <View style={[styles.container, { marginBottom: marginBottom }]}>
      <View style={styles.dateContainer}>
        <CustomText
          label="MAR"
          fontSize={16}
          color={COLORS.white3}
          lineHeight={16 * 1.4}
          textAlign="center"
        />
        <CustomText
          label="31"
          color={COLORS.white}
          fontSize={30}
          lineHeight={30 * 1.4}
          fontFamily={fonts.semiBold}
          textAlign="center"
        />
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.imageWrapper}>
          <ImageFast source={EventImages.eventImg2} style={styles.img}>
            <Image source={PNGIcons.logo} style={styles.icon} />
          </ImageFast>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Image
            source={EventImages.singer}
            style={{ height: 62, width: 62, marginTop: 10 }}
          />

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.remindBtn}>
              <Image source={PNGIcons.bell_plus} style={styles.icon2} />
              <CustomText
                label="Remind Me"
                color={COLORS.gray6}
                fontSize={14}
                marginTop={7}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.infoBtn}>
              <Icons
                family="MaterialIcons"
                name="info-outline"
                size={23}
                color={COLORS.white}
              />
              <CustomText
                label="Info"
                color={COLORS.gray6}
                fontSize={14}
                marginTop={7}
              />
            </TouchableOpacity>
          </View>
        </View>

        <CustomText
          label="COMING ON 31 MARCH"
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.white}
          marginTop={8}
          lineHeight={14 * 1.4}
          textTransform="uppercase"
        />

        <CustomText
          label="Kill Boksoon"
          fontSize={28}
          fontFamily={fonts.abril}
          color={COLORS.white}
          lineHeight={28 * 1.4}
        />

        <View style={styles.genreRow}>
          <Icons
            family="MaterialCommunityIcons"
            name="music-note"
            size={14}
            color={COLORS.gray6}
          />
          <CustomText
            label="ROCK, R’N’B, POP"
            fontSize={12}
            color={COLORS.gray6}
            fontFamily={fonts.medium}
            marginLeft={7}
          />
        </View>

        <CustomText
          label="At work, she’s a renowned assassin. At home, she’s a single mom to a teenage daughter. Killing? That’s easy. It’s parenting that’s the hard part."
          fontSize={12}
          color={COLORS.gray6}
          lineHeight={12 * 1.3}
          marginTop={6}
        />

        <View style={styles.tagsRow}>
          {[
            "Violent",
            "Suspenseful",
            "Asian Action",
            "Hired Killers",
            "Korean",
          ].map((tag, index, arr) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <CustomText
                label={tag}
                fontSize={12}
                color={COLORS.gray6}
                lineHeight={12 * 1.2}
              />
              {index !== arr.length - 1 && (
                <CustomText
                  label=" • "
                  fontSize={12}
                  color={COLORS.white}
                  lineHeight={12 * 1.2}
                />
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default EventDetailCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderTopWidth: 4,
    borderTopColor: COLORS.cardColor,
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: 45,
  },
  rightContainer: {
    flex: 1,
    marginLeft: 10,
  },
  imageWrapper: {
    position: "relative",
  },
  img: {
    width: "100%",
    height: 170,
    borderRadius: 8,
    resizeMode: "cover",
  },
  imageHeader: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    margin: 12,
  },
  imageOverlay: {
    position: "absolute",
    bottom: 12,
    left: 12,
  },
  btnRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
  remindBtn: {
    alignItems: "center",
    backgroundColor: COLORS.cardColor,

    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 10,
  },
  infoBtn: {
    alignItems: "center",
    backgroundColor: COLORS.cardColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  genreRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  icon2: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
});
