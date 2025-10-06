import { useState, useRef } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Animated,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import AuthFooter from "../../../components/Auth/AuthFooter";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useNavigation } from "@react-navigation/native";

const VehicleImageOnboarding = ({ route }) => {
  const body = route.params?.body;

  const navigation = useNavigation();
  const requirements = [
    {
      id: 1,
      title: "Shoot During Daytime",
      subtitle:
        "Take photos in daylight for the best lighting. Natural daylight helps show your vehicle accurately, making it more attractive and trustworthy to potential renters.",
      img: PNGIcons.r1,
    },
    {
      id: 2,
      title: "Shoot In A Scenic Place",
      subtitle:
        "Choose a clean, attractive, or interesting background for your photos. A nice setting makes your vehicle stand out and gives customers a sense of the kind of experience they can expect.",
      img: PNGIcons.r2,
    },
    {
      id: 3,
      title: "Keep Photos Clear & Horizontal",
      subtitle:
        "Make sure your photos are sharp and taken in landscape (horizontal) orientation. Clear, properly framed images help customers fully see and evaluate the vehicle before making a booking.",
      img: PNGIcons.r3,
    },
    {
      id: 4,
      title: "always Pay Attention To Your Surrounding",
      subtitle:
        "Before taking photos, check that the area around your vehicle is tidy and safe. Remove any clutter or distractions so the focus stays on your vehicle and the presentation looks professional.",
      img: PNGIcons.r4,
    },
    {
      id: 5,
      title: "AI Usage is not Authorized",
      subtitle:
        "Do not use generative AI or artificial enhancements for your vehicle photos. Customers must see the real condition of the vehicle; only genuine, unedited images are permitted.",
      img: PNGIcons.r5,
    },
  ];

  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0.3)).current;

  const handleButtonPress = () => {
    if (!isExpanded) {
      Animated.timing(animatedHeight, {
        toValue: 0.78, // 78% expanded height
        duration: 400,
        useNativeDriver: false,
      }).start();
      setIsExpanded(true);
    } else {
      navigation.navigate("UploadVehicle", {
        body,
      });
    }
  };

  const handleBackPress = () => {
    if (isExpanded) {
      Animated.timing(animatedHeight, {
        toValue: 0.3,
        duration: 400,
        useNativeDriver: false,
      }).start();
      setIsExpanded(false);
    } else {
      navigation.goBack();
    }
  };
  return (
    <ScreenWrapper
      translucent
      backgroundImage={Images.VehicleImageOnboarding}
      headerUnScrollable={() => (
        <Header
          title={"Upload Images"}
          marginTop={Platform.OS == "android" ? 20 : 70}
          iconBackgroundColor={"rgba(0, 0, 0, 0.04)"}
          borderWidth={1}
          borderColor={"#ACC1B0"}
        />
      )}
      footerUnScrollable={() => (
        <Animated.View
          style={[
            styles.Container,
            {
              height: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        >
          <BlurView
            style={styles.blurBackground}
            blurType="dark"
            blurAmount={10}
          />
          <View style={styles.contentContainer}>
            <CustomText
              label={
                isExpanded ? "Rental Requirements" : "Presentation is Key!"
              }
              color={COLORS.white}
              fontSize={24}
              lineHeight={24 * 1.4}
              fontFamily={fonts.semiBold}
            />
            <CustomText
              label={
                isExpanded
                  ? "There are some tips to follow to maximize your earnings with your vehicle through rental."
                  : "Make sure to make your vehicle stand out."
              }
              color={COLORS.gray2}
              lineHeight={14 * 1.4}
              marginBottom={16}
            />

            {isExpanded && (
              <>
                <CustomText
                  label={"OUR RECOMMeNDATION:"}
                  color={COLORS.gray2}
                  lineHeight={14 * 1.4}
                  marginBottom={16}
                />

                <FlatList
                  data={requirements}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) =>
                    item && item.id ? item.id.toString() : index.toString()
                  }
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                  renderItem={({ item, index }) => (
                    <View key={item.id} style={styles.reqCard}>
                      <Image source={item.img} style={styles.image} />
                      <View style={styles.textContainer}>
                        <CustomText
                          label={item.title}
                          fontSize={16}
                          lineHeight={16 * 1.4}
                          fontFamily={fonts.medium}
                          color={COLORS.white}
                        />
                        <CustomText
                          label={item.subtitle}
                          fontSize={12}
                          lineHeight={12 * 1.4}
                          fontFamily={fonts.medium}
                          color={COLORS.gray2}
                          marginTop={4}
                        />
                      </View>
                    </View>
                  )}
                />
              </>
            )}

            <AuthFooter
              btnTitle={isExpanded ? "Understood" : "Check out the Guide"}
              isBoarder
              btnBackgroundColor={COLORS.darkPurple}
              secondBorderColor={COLORS.white}
              isMain
              titleSize={12}
              iconColor={COLORS.lightGray}
              title={
                "The easiest and most affordable way to reach your destination."
              }
              textColor={COLORS.gray2}
              iconBackgroundColor={"#FFFFFF0A"}
              btnFamily={fonts.medium}
              btnSize={16}
              onPress={handleButtonPress}
              marginBottom={isExpanded && Platform.OS === "ios" ? 80 : 70}
              onBackPress={handleBackPress}
              backImage={PNGIcons.ovalGray}
            />
          </View>
        </Animated.View>
      )}
    ></ScreenWrapper>
  );
};

export default VehicleImageOnboarding;

const styles = StyleSheet.create({
  Container: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    overflow: "hidden",
  },
  blurBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    flex: 1,
  },
  reqCard: {
    padding: 12,
    flexDirection: "row",

    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    marginBottom: 8,
  },
  textContainer: {
    marginLeft: 12,
    width: "80%",
  },
  image: {
    height: 48,
    width: 48,
  },
});
