import React, { useState, useEffect } from "react";
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
import { put } from "../../../services/ApiRequest";
import { setUserData } from "../../../store/reducer/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastMessage } from "../../../utils/ToastMessage";
import { genres } from "../../../utils/constants";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";
import { useNavigation, useRoute } from "@react-navigation/native";
import Header from "../../../components/Header";
import CustomButton from "../../../components/CustomButton";

const Genres = () => {
  const { width } = useWindowDimensions();
  const CARD_WIDTH = (width - 36) / 2;
  const CARD_HEIGHT = 100;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { userData } = useSelector((state) => state.users);
  const [step, setStep] = useState(userData?.role == "band" ? 12 : 13);
  const totalSteps = userData?.role == "band" ? 15 : 16;
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [error, setError] = useState("");
  const [prevError, setPrevError] = useState("");
  const [showSuccessColor, setShowSuccessColor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const route = useRoute();

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
        setError("Please choose at least 3 genres.");
      } else {
        setError("");
      }

      return updated;
    });
  };

  const errorCheck = () => {
    if (selectedGenres.length < 3) {
      return "Please choose at least 3 genres.";
    }
    return "";
  };

  const handleNext = async () => {
    const err = errorCheck();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    if (route?.params?.fromScreen === "Event") {
      route?.params?.onSelect(selectedGenres);
      navigation.goBack();
      return;
    }
    setIsLoading(true);

    try {
      const res = await put("user/profile", {
        Genres: selectedGenres,
      });

      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
        ToastMessage("Your music genres have been saved!", "success");
        navigation.navigate("Artists");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

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
    <ScreenWrapper
      paddingBottom={12}
      scrollEnabled
      footerUnScrollable={() =>
        route?.params?.fromScreen === "Event" ? (
          <View style={{ padding: 12 }}>
            <CustomButton
              title={"Submit"}
              marginBottom={24}
              onPress={handleNext}
            />
          </View>
        ) : (
          <AuthFooter
            paddingHorizontal={12}
            onPress={handleNext}
            onBackPress={handleBack}
            btnLoading={isLoading}
          />
        )
      }
      headerUnScrollable={() =>
        route?.params?.fromScreen === "Event" && <Header title={"Add Genres"} />
      }
    >
      {route?.params?.fromScreen !== "Event" && (
        <AuthHeader
          step={step}
          totalSteps={totalSteps}
          subtitle="Select your favorite genres"
        />
      )}

      <View style={styles.container}>
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

        <SearchInput placeholder="E.g. Blues, Techno, Pop..." />

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
          marginBottom={16}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          <View style={styles.row}>
            {genres.map((genre) => renderGenreCard(genre))}
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

export default Genres;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
