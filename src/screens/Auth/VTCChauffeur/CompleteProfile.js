import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ScreenWrapper from "../../../components/ScreenWrapper";
import CustomText from "../../../components/CustomText";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import { Images } from "../../../assets/images";
import Icons from "../../../components/Icons";
import CustomButton from "../../../components/CustomButton";

const CompleteProfile = () => {
  const navigation = useNavigation();
  const inset = useSafeAreaInsets();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setProgress(1), 1500),
      setTimeout(() => setProgress(2), 3500),
    ];
    return () => timers.forEach(clearTimeout);
  }, [navigation]);

  return (
    <ScreenWrapper
      statusBarColor="transparent"
      barStyle="light-content"
      backgroundImage={Images.id_bg}
      translucent
    >
      <Image
        source={PNGIcons.mag}
        style={[styles.img, { marginTop: inset.top + 3 }]}
      />

      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <CustomText
          label="Just a moment..."
          fontSize={32}
          color={COLORS.white}
          lineHeight={32 * 1.4}
          fontFamily={fonts.semiBold}
          marginTop={2}
          textAlign="center"
        />
        <CustomText
          label="We are analysing your pictures."
          color={COLORS.gray1}
          fontSize={15}
          lineHeight={15 * 1.5}
          marginBottom={10}
          textAlign="center"
        />
      </View>

      <View style={styles.statusContainer}>
        <View style={styles.statusBox}>
          <Icons
            name="checkcircle"
            family="AntDesign"
            color="#4ADE80"
            size={18}
            style={{ marginRight: 8 }}
          />
          <CustomText
            label="Documents uploaded"
            fontSize={16}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
        </View>

        <View style={styles.statusBox}>
          <Icons
            name="checkcircle"
            family="AntDesign"
            color="#4ADE80"
            size={20}
            style={{ marginRight: 8 }}
          />
          <CustomText
            label="Selfie uploaded"
            fontSize={16}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
        </View>

        <View
          style={[
            styles.statusBox,
            progress < 2 ? styles.activeBox : styles.doneBox,
          ]}
        >
          <Icons
            name={progress < 2 ? "clockcircleo" : "checkcircle"}
            family="AntDesign"
            color={progress < 2 ? "#D1D5DB" : "#4ADE80"}
            size={20}
            style={{ marginRight: 8 }}
          />
          <CustomText
            label={progress < 2 ? "Analysing documents" : "All good!"}
            fontSize={16}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
        </View>
      </View>

      <View
        style={[
          styles.bottomContainer,
          {
            paddingBottom: inset.bottom > 0 ? inset.bottom + 12 : 20,
            bottom: inset.bottom + 24,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          style={[styles.backButton, { backgroundColor: COLORS.inputBg }]}
        >
          <Image
            source={PNGIcons.ovalBack}
            style={{ height: 48, width: 48 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <CustomButton
          title="Complete Verification"
          width="84%"
          onPress={() => navigation.navigate("Success")}
        />
      </View>
    </ScreenWrapper>
  );
};

export default CompleteProfile;

const styles = StyleSheet.create({
  img: {
    height: 300,
    width: 300,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 80, // space above bottom button
  },
  statusBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    width: "62%",
    marginBottom: 14,
  },
  activeBox: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  doneBox: {
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: 16,
  },
  backButton: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 99,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
});
