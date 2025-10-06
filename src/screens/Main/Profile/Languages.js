import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useState } from "react";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import ImageFast from "../../../components/ImageFast";
import Divider from "../../../components/Divider";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";

import { Images } from "../../../assets/images";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";

const Languages = ({ navigation }) => {
  const [selectedLanguages, setSelectedLanguages] = useState("");
  console.log(selectedLanguages);

  const handleSelectLanguage = (language) => {
    setSelectedLanguages(language);
  };

  const languages = [
    {
      flag: Images.albania,
      country: "Albania",
      language: "Albanian",
      nativeName: "Shqiptar",
    },
    {
      flag: Images.china,
      country: "China",
      language: "Mandarin Chinese",
      nativeName: "普通话 (Pǔtōnghuà)",
    },
    {
      flag: Images.usa,
      country: "USA",
      language: "English (US)",
      nativeName: "English (US)",
    },
    { country: "France", language: "French", nativeName: "Français" },
    { country: "Germany", language: "German", nativeName: "Deutsch" },
    { country: "Spain", language: "Spanish", nativeName: "Español" },
    { country: "Italy", language: "Italian", nativeName: "Italiano" },
    { country: "Japan", language: "Japanese", nativeName: "日本語 (Nihongo)" },
    { country: "Russia", language: "Russian", nativeName: "Русский (Russkiy)" },
    {
      country: "Saudi Arabia",
      language: "Arabic",
      nativeName: "العربية (Al-‘Arabiyyah)",
    },
    { country: "India", language: "Hindi", nativeName: "हिन्दी (Hindī)" },
    { country: "Pakistan", language: "Urdu", nativeName: "اُردُو" },
    {
      country: "South Korea",
      language: "Korean",
      nativeName: "한국어 (Hangugeo)",
    },
    { country: "Greece", language: "Greek", nativeName: "Ελληνικά (Elliniká)" },
    { country: "Thailand", language: "Thai", nativeName: "ไทย (Phasa Thai)" },
    { country: "Vietnam", language: "Vietnamese", nativeName: "Tiếng Việt" },
    { country: "Turkey", language: "Turkish", nativeName: "Türkçe" },
    { country: "Portugal", language: "Portuguese", nativeName: "Português" },
    {
      country: "Iran",
      language: "Persian (Farsi)",
      nativeName: "فارسی (Fārsi)",
    },
    {
      country: "Bangladesh",
      language: "Bengali",
      nativeName: "বাংলা (Bangla)",
    },
  ];

  const renderItem = ({ item }) => {
    const isLast = item === languages[languages.length - 1];
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.languageCard}
          onPress={() => {
            handleSelectLanguage(item?.language);
            navigation.goBack();
          }}
        >
          <View style={styles.textContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              {item?.flag && (
                <ImageFast
                  source={item?.flag}
                  style={{ width: 20, height: 20 }}
                  resizeMode={"contain"}
                />
              )}
              <CustomText
                label={item?.language}
                fontSize={16}
                fontFamily={fonts.bold}
                color={COLORS.black}
              />
            </View>
            <CustomText
              label={item?.nativeName}
              fontSize={12}
              fontFamily={fonts.medium}
              color={COLORS.gray}
            />
          </View>

          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor:
                selectedLanguages === item?.language
                  ? COLORS.blue
                  : COLORS.inputBg,
              padding: 10,
              borderWidth: 1,
              borderColor:
                selectedLanguages === item?.language
                  ? COLORS.white
                  : COLORS.gray,

              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
        {!isLast && <Divider marginVertical={10} />}
      </>
    );
  };

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header title={"App Languages"} textColor={COLORS.black} />
      )}
    >
      <View style={{ flexDirection: "row", gap: 10, marginVertical: 10 }}>
        <Icons family={"Fontisto"} name={"world"} size={20} />
        <CustomText
          label={"Select your preferred app language"}
          fontSize={14}
          fontFamily={fonts.medium}
          color={COLORS.gray}
        />
      </View>

      <FlatList
        data={languages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ gap: 10, paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      />
    </ScreenWrapper>
  );
};

export default Languages;

const styles = StyleSheet.create({
  languageCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
