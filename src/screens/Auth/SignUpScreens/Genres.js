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
import { GenresImgs } from "../../../assets/images/genrsImg";

const instrumentCategories = [
  { name: "Rock", color: "#DC158C", img: GenresImgs.img },
  { name: "Alternative", color: "#006450", img: GenresImgs.img1 },
  { name: "Jazz", color: "#8400E7", img: GenresImgs.img2 },
  { name: "Blues", color: "#1D3264", img: GenresImgs.img3 },
  { name: "Hip Hop", color: "#608109", img: GenresImgs.img4 },
  { name: "Country", color: "#26856B", img: GenresImgs.img5 },
  { name: "Pop", color: "#503751", img: GenresImgs.img6 },
  { name: "EDM", color: "#477D94", img: GenresImgs.img7 },
  { name: "Reggae", color: "#477D95", img: GenresImgs.img8 },
  { name: "Classical", color: "#0F73EC", img: GenresImgs.img9 },
  { name: "Metal", color: "#8E66AC", img: GenresImgs.img10 },
  { name: "Funk", color: "#608108", img: GenresImgs.img11 },
  { name: "R & B", color: "#777777", img: GenresImgs.img12 },
  { name: "Soul", color: "#8D67AB", img: GenresImgs.img13 },
  { name: "Experimental", color: "#E0128B", img: GenresImgs.img14 },
  { name: "Punk Rock", color: "#477D95", img: GenresImgs.img15 },
  { name: "Indie Rock", color: "#016450", img: GenresImgs.img16 },
  { name: "K-Pop", color: "#E81529", img: GenresImgs.img17 },
  { name: "Latin Music", color: "#E0128C", img: GenresImgs.img18 },
  { name: "Bluegrass", color: "#8C67AB", img: GenresImgs.img19 },
  { name: "Psychedelic\nRock", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Gospel", color: "#B16138", img: GenresImgs.img21 },
  { name: "Afrobeat", color: "#B16138", img: GenresImgs.img21 },
  { name: "Ska", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Folk", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Trap", color: "#B16138", img: GenresImgs.img21 },
  { name: "Bossa Nova", color: "#B16138", img: GenresImgs.img21 },
  { name: "Dubstep", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Progressive\nRock", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Ambient", color: "#B16138", img: GenresImgs.img21 },
];

const Genres = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const { width } = useWindowDimensions();
    const CARD_WIDTH = (width - 36) / 2; // consistent spacing on all screens
    const CARD_HEIGHT = 100;

    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState("Choose at least 0/3");

    const toggleGenre = (genreName) => {
      setSelectedGenres((prev) => {
        if (prev.includes(genreName)) {
          return prev.filter((g) => g !== genreName);
        } else {
          return [...prev, genreName];
        }
      });
    };

    const errorCheck = () => {
      let newErrors = "";
      if (selectedGenres.length < 3) {
        newErrors = "Please choose at least 3 genres.";
      }
      return newErrors;
    };

    const submit = () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setState({ ...state, genres: selectedGenres });
      setCurrentIndex(currentIndex + 1);
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    const renderGenreCard = (genre) => {
      const isSelected = selectedGenres.includes(genre.name);

      return (
        <TouchableOpacity
          key={genre.name}
          style={[
            styles.card,
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              backgroundColor: genre.color,
              borderColor: isSelected ? COLORS.white : "transparent",
              borderWidth: isSelected ? 2 : 0,
            },
          ]}
          onPress={() => toggleGenre(genre.name)}
          activeOpacity={0.8}
        >
          <CustomText
            label={genre.name}
            color={COLORS.white}
            fontSize={16}
            fontFamily={fonts.medium}
          />

          {/* ✅ Image at bottom-right corner */}
          <Image
            source={genre.img}
            style={styles.genreImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      );
    };

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <CustomText
            label="Choose 3 or more genres you like."
            fontFamily={fonts.abril}
            fontSize={32}
            lineHeight={30 * 1.4}
            marginTop={12}
            marginBottom={6}
          />

          <SearchInput placeholder={"E.g. Blues, Techno, Pop..."} />

          <CustomText
            label="Just enter a name."
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={12}
            color={COLORS.white2}
            marginTop={4}
          />

          <ErrorComponent errorTitle={error} />

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20, marginTop: 20 }}
          >
            <View style={styles.row}>
              {instrumentCategories.map((genre) => renderGenreCard(genre))}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
);

export default Genres;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  card: {
    borderRadius: 4,
    padding: 12,
    paddingTop: 4,
    marginBottom: 2,
    position: "relative",
    overflow: "hidden",
  },
  icon: {
    position: "absolute",
    top: 10,
    right: 8,
  },
  genreImage: {
    position: "absolute",
    bottom: -3,
    right: 0,
    width: 70,
    height: 98,
  },
});
