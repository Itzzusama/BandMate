import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageFast from "../../../../components/ImageFast";
import { EventImages } from "../../../../assets/images/eventImages";
import CustomButton from "../../../../components/CustomButton";
import LinearGradient from "react-native-linear-gradient";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";

const EventOrganizer = () => {
  return (
    <ImageFast source={EventImages.imageBG} style={styles.container}>
      <View>
        <ImageFast
          source={EventImages.eventImg}
          style={styles.innerContainer}
          resizeMode={"stretch"}
        >
          <Image source={PNGIcons.logo} style={styles.logo} />
          <View style={styles.bottomContainer}>
            <CustomButton
              title={"But Tickets"}
              customText={{ fontSize: 14 }}
              width="46%"
              height={40}
              leftView={
                <Image source={EventImages.ticketIcon} style={styles.icon} />
              }
            />
            <LinearGradient
              colors={["#7B64F4", "#5AF9E1", "#FFFFFF", "#5AF9E1", "#7B64F4"]}
              style={styles.gradientContainer}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            >
              <View style={styles.innerGradinet}>
                <CustomText
                  label={"Learn More"}
                  fontSize={14}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.medium}
                />
              </View>
            </LinearGradient>
          </View>
        </ImageFast>
      </View>
    </ImageFast>
  );
};

export default EventOrganizer;

const styles = StyleSheet.create({
  container: {
    height: 455,
    width: "100%",
  },
  innerContainer: {
    marginVertical: 12,
    marginHorizontal: 12,
    resizeMode: "contain",
  },
  bottomContainer: {
    bottom: 16,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    marginRight: 3,
  },
  gradientContainer: {
    borderRadius: 100,
    height: 40,
    width: "46%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerGradinet: {
    backgroundColor: COLORS.black,
    height: 36,
    width: "97%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 28,
    height: 24,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 16,
  },
});
