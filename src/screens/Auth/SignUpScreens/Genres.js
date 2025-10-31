import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
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
import { GenresImgs } from "../../../assets/images/genrsImg";
import Icons from "../../../components/Icons";
import { put } from "../../../services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import { useDispatch } from "react-redux";
import { ToastMessage } from "../../../utils/ToastMessage";

const instrumentCategories = [
  { name: "Afrobeat", color: "#B16138", img: GenresImgs.img21 },
  { name: "Ambient", color: "#E80F5C", img: GenresImgs.img21 },
  { name: "Alternative", color: "#006450", img: GenresImgs.img1 },
  { name: "Bluegrass", color: "#8C67AB", img: GenresImgs.img19 },
  { name: "Blues", color: "#1D3264", img: GenresImgs.img3 },
  { name: "Bossa Nova", color: "#B16138", img: GenresImgs.img21 },
  { name: "Classical", color: "#0F73EC", img: GenresImgs.img9 },
  { name: "Country", color: "#26856B", img: GenresImgs.img5 },
  { name: "Dubstep", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "EDM", color: "#477D94", img: GenresImgs.img7 },
  { name: "Experimental", color: "#E0128B", img: GenresImgs.img14 },
  { name: "Folk", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Funk", color: "#608108", img: GenresImgs.img11 },
  { name: "Gospel", color: "#B16138", img: GenresImgs.img21 },
  { name: "Hip Hop", color: "#016450", img: GenresImgs.img4 },
  { name: "Indie Rock", color: "#608109", img: GenresImgs.img16 },
  { name: "Jazz", color: "#8400E7", img: GenresImgs.img2 },
  { name: "K-Pop", color: "#E81529", img: GenresImgs.img17 },
  { name: "Latin Music", color: "#E0128C", img: GenresImgs.img18 },
  { name: "Metal", color: "#8E66AC", img: GenresImgs.img10 },
  { name: "Pop", color: "#503751", img: GenresImgs.img6 },
  { name: "Progressive\nRock", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Psychedelic\nRock", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Punk Rock", color: "#477D95", img: GenresImgs.img15 },
  { name: "R & B", color: "#777777", img: GenresImgs.img12 },
  { name: "Reggae", color: "#B16138", img: GenresImgs.img8 },
  { name: "Rock", color: "#DC158C", img: GenresImgs.img },
  { name: "Ska", color: "#E80F5C", img: GenresImgs.img20 },
  { name: "Sould", color: "#8D67AB", img: GenresImgs.img13 },
  { name: "Trap", color: "#B16138", img: GenresImgs.img21 },
];

const Genres = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState, setIsLoading }, ref) => {
    const { width } = useWindowDimensions();
    const CARD_WIDTH = (width - 36) / 2;
    const CARD_HEIGHT = 100;
    const dispatch = useDispatch();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [error, setError] = useState("");
    const [prevError, setPrevError] = useState("");
    const [showSuccessColor, setShowSuccessColor] = useState(false);

    // ✅ dynamic color fade (green when success)
    useEffect(() => {
      if (prevError && !error) {
        setShowSuccessColor(true);
        const timer = setTimeout(() => setShowSuccessColor(false), 2000);
        return () => clearTimeout(timer);
      }
      setPrevError(error);
    }, [error]);

    const toggleGenre = (genreName) => {
      setSelectedGenres((prev) => {
        const updated = prev.includes(genreName)
          ? prev.filter((g) => g !== genreName)
          : [...prev, genreName];

        if (updated.length < 3) {
          // setError("Please choose at least 3 genres.");
        } else {
          setError("");
        }

        return updated;
      });
    };

    const errorCheck = () => {
      let newErrors = "";
      if (selectedGenres.length < 3) {
        newErrors = "Please choose at least 3 genres.";
      }
      return newErrors;
    };

    const submit = async () => {
      const err = errorCheck();
      if (err) {
        setError(err);
        return;
      }
      setError("");
      setIsLoading(true);
      try {
        const res = await put("user/profile", {
          Genres: selectedGenres,
        });
        console.log(res?.data);
        if (res?.data?.success) {
          setState({ ...state, genres: selectedGenres });
          setCurrentIndex(currentIndex + 1);
          dispatch(setUserData(res?.data?.user));
          ToastMessage("Your music genres have been saved!", "success");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    const back = () => {
      if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
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
          <Image
            source={genre.img}
            style={styles.genreImage}
            resizeMode="contain"
          />
          {isSelected && (
            <View style={styles.icon}>
              <Icons
                family="MaterialCommunityIcons"
                name={"check-circle"}
                size={20}
                color={COLORS.white}
              />
            </View>
          )}
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
            lineHeight={32 * 1.1}
            marginTop={12}
            marginBottom={6}
          />
          <CustomText
            label="Tell us about your musical influences and interests"
            fontSize={12}
            lineHeight={12 * 1.4}
            marginBottom={18}
            color={COLORS.white2}
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

          <ErrorComponent
            errorTitle={`Choose at least ${selectedGenres.length}/3`}
            color={
              error ? "#EE1045" : showSuccessColor ? "#64CD75" : COLORS.white2
            }
            isValid={showSuccessColor}
            error={error}
            color1={error ? "#EE1045" : showSuccessColor ? "#64CD75" : ""}
          />

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
    borderRadius: 12,
    padding: 12,
    paddingTop: 4,
    marginBottom: 2,
    position: "relative",
    overflow: "hidden",
  },
  genreImage: {
    position: "absolute",
    bottom: -3,
    right: 0,
    width: 70,
    height: 98,
  },
  icon: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
