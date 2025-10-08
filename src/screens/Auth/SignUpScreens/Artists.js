import { forwardRef, useImperativeHandle, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Image,
} from "react-native";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import SearchInput from "../../../components/SearchInput";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import Icons from "../../../components/Icons";
import { ArtistImgs } from "../../../assets/images/artistImgs";

const artists = [
  { name: "Arctic Monkeys", img: ArtistImgs.img6 },
  { name: "Blur", img: ArtistImgs.img2 },
  { name: "Beastie Boys", img: ArtistImgs.img3 },
  { name: "Coldplay", img: ArtistImgs.img4 },
  { name: "David Bowie", img: ArtistImgs.img5 },
  { name: "Depeche Mode", img: ArtistImgs.img6 },
  { name: "Foo Fighters", img: ArtistImgs.img5 },
  { name: "Linkin Park", img: ArtistImgs.img2 },
  { name: "Oasis", img: ArtistImgs.img3 },
];

const Artists = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const { width } = useWindowDimensions();

    // 🧠 Dynamically decide number of columns based on screen width
    const SPACING = 12;
    const MIN_CARD_SIZE = 100;
    const numColumns = Math.max(
      3,
      Math.floor(width / (MIN_CARD_SIZE + SPACING * 2))
    );
    const CARD_SIZE = (width - SPACING * (numColumns + 1)) / numColumns;

    const [selectedArtists, setSelectedArtists] = useState([]);
    const [error, setError] = useState("Choose at least 0/3");

    const toggleArtist = (name) => {
      setSelectedArtists((prev) =>
        prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
      );
    };

    const errorCheck = () => {
      if (selectedArtists.length < 3)
        return "Please choose at least 3 artists.";
      return "";
    };

    const submit = () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, artists: selectedArtists });
      setCurrentIndex(currentIndex + 1);
    };

    const back = () => {
      if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <CustomText
          label="Choose 3 or more artists you like."
          fontFamily={fonts.abril}
          fontSize={32}
          lineHeight={30 * 1.4}
          marginTop={12}
        />
        <CustomText
          label="Tell us about your musical idols."
          fontSize={12}
          color={COLORS.white2}
          marginBottom={12}
          marginTop={8}
        />

        <SearchInput placeholder="E.g. Coldplay, Bowie, Blur..." />

        <CustomText
          label="Just enter names"
          fontSize={12}
          color={COLORS.white2}
          marginBottom={12}
          marginTop={4}
        />

        <ErrorComponent errorTitle={error} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 60,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View
            style={[
              styles.grid,
              {
                gap: SPACING,
                justifyContent: "center",
              },
            ]}
          >
            {artists.map((artist) => {
              const isSelected = selectedArtists.includes(artist.name);
              return (
                <TouchableOpacity
                  key={artist.name}
                  style={[styles.card, { width: CARD_SIZE }]}
                  onPress={() => toggleArtist(artist.name)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.imageWrapper,
                      {
                        width: CARD_SIZE,
                        height: CARD_SIZE,
                        borderColor: isSelected
                          ? COLORS.btnColor
                          : COLORS.black,
                        borderWidth: isSelected ? 2 : 0,
                      },
                    ]}
                  >
                    <Image
                      source={artist.img}
                      style={styles.artistImage}
                      resizeMode="contain"
                    />
                    {isSelected && (
                      <View style={styles.overlay}>
                        <Icons
                          family="MaterialCommunityIcons"
                          name={"check-circle"}
                          size={36}
                          color={COLORS.btnColor}
                        />
                      </View>
                    )}
                  </View>

                  <CustomText
                    label={artist.name}
                    fontSize={12}
                    color={COLORS.white}
                    fontFamily={fonts.medium}
                    textAlign="center"
                    marginTop={2}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
);

export default Artists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    alignItems: "center",
    marginBottom: -5,
  },
  imageWrapper: {
    borderRadius: 100,
    overflow: "hidden",
    position: "relative",
  },
  artistImage: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.45)",
    width: "100%",
    height: "100%",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});
