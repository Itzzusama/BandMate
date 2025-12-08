import React, { useEffect, useEffectEvent, useState } from "react";
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { TOP_LANGUAGES } from "../../../utils/TOP_LANGUAGES";
import CountryFlag from "react-native-country-flag";
import Icons from "../../../components/Icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { setUserData } from "../../../store/reducer/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastMessage } from "../../../utils/ToastMessage";
import { put } from "../../../services/ApiRequest";
const AppLanguage = ({ navigation }) => {
  const { userData } = useSelector((state) => state.users);
  console.log(userData);
  const [selectedLang, setSelectedLang] = useState("");
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userData?.profile?.language) {
      const userLanguage = userData.profile.language;

      const foundLanguage = TOP_LANGUAGES.find(
        (lang) =>
          lang.language.toLowerCase() === userLanguage.toLowerCase() ||
          lang.native.toLowerCase().includes(userLanguage.toLowerCase())
      );

      if (foundLanguage) {
        setSelectedLang(foundLanguage.language);
      }
    }
  }, [userData]);
  const handleSelectLanguage = async (language) => {
    setSelectedLang(language);
    setLoading(true);

    const body = {
      profile: {
        language: language.toLowerCase(),
      },
    };
    try {
      const response = await put("user/profile", body);

      if (response?.data?.success) {
        dispatch(setUserData(response.data.user));
        ToastMessage("Language updated", "success");
        setLoading(false);
        navigation.goBack();
      } else {
        ToastMessage("Failed to update profile", "error");
        setLoading(false);
      }
    } catch (error) {
      console.error("Network error:", error);
      ToastMessage("Failed to update language", "error");
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"App Language"} />}
    >
      <View style={{ marginBottom: insets.bottom }}>
        <View style={styles.topRow}>
          <Icons
            name="language"
            size={16}
            color={COLORS.gray1}
            family={"MaterialIcons"}
          />
          <Text style={styles.subTitle}>
            Select your preferred app language
          </Text>
        </View>

        {TOP_LANGUAGES.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.row,
              {
                borderBottomColor:
                  index === TOP_LANGUAGES.length - 1
                    ? "transparent"
                    : "rgba(255,255,255,0.08)",
              },
            ]}
            onPress={() => handleSelectLanguage(item.language)}
            activeOpacity={0.7}
            disabled={loading || selectedLang === item.language}
          >
            <View style={styles.langLeft}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.roundFlagContainer}>
                    <CountryFlag
                      isoCode={item.code}
                      size={20}
                      style={styles.roundFlag}
                    />
                  </View>
                  <Text
                    style={[
                      styles.langName,
                      {
                        color:
                          selectedLang === item.language
                            ? COLORS.white
                            : COLORS.white2,
                      },
                    ]}
                  >
                    {item.language}
                  </Text>
                </View>

                <Text style={styles.nativeText}>{item.native}</Text>
              </View>
            </View>

            <View
              style={[
                styles.radioOuter,
                selectedLang === item.language && styles.radioOuterSelected,
              ]}
            >
              {selectedLang === item.language && (
                <View style={styles.radioDot} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
};

export default AppLanguage;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 15,
  },
  subTitle: {
    fontSize: 14,
    color: COLORS.gray1,
    fontFamily: fonts.regular,
    marginLeft: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  langLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  roundFlagContainer: {
    height: 16,
    width: 16,
    borderRadius: 14,
    overflow: "hidden",
    marginRight: 8,
  },
  roundFlag: {
    height: "100%",
    width: "100%",
    borderRadius: 14,
  },
  langName: {
    fontSize: 16,
    fontFamily: fonts.medium,
    color: COLORS.white2,
  },
  nativeText: {
    fontSize: 12,
    color: COLORS.white3,
    fontFamily: fonts.regular,
    marginTop: 2,
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 99,
    borderWidth: 2,
    borderColor: COLORS.gray1,
    justifyContent: "center",
    alignItems: "center",
  },
  radioOuterSelected: {
    borderColor: COLORS.btnColor,
  },
  radioDot: {
    height: 12,
    width: 12,
    borderRadius: 99,
    backgroundColor: COLORS.btnColor,
  },
});
