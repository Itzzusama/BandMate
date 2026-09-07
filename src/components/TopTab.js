import { BlurView } from "@react-native-community/blur";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import CustomText from "./CustomText";

const TopTab = ({
  tab,
  setTab,
  tabNames,
  tabIcons,
  isIconMode,
  rounded,
  marginBottom,
  marginTop,
  image,
  images,
  height,
  paddingVertical,
  paddingHorizontal = 14,
  fontFamily = fonts.medium,
  scrollViewPaddingHorizontal = 0,
  activeColor = COLORS.white,
  imgMarginRight,
  borderRadius = 8,
  oval,
  borderWidth,
  borderColor,
  ovalBg = "#FFFFFF0A",
  activeTintColor = COLORS.black,
  inactiveTintColor = COLORS.white,
  isBlur,
}) => {
  const finalActiveColor = activeColor || COLORS.white;
  const finalActiveTintColor = activeTintColor || COLORS.black;
  const finalInactiveTintColor = inactiveTintColor || COLORS.white;

  const textOpacity = useRef(new Animated.Value(1)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isIconMode) {
      textOpacity.setValue(0);
      iconOpacity.setValue(1);
    } else {
      textOpacity.setValue(1);
      iconOpacity.setValue(0);
    }
  }, [isIconMode, textOpacity, iconOpacity]);

  const getActiveTextColor = () => {
    if (
      finalActiveColor === "white" ||
      finalActiveColor === "#FFFFFF" ||
      finalActiveColor === "#fff" ||
      finalActiveColor === COLORS.white
    ) {
      return COLORS.black;
    }
    return COLORS.white;
  };

  return (
    <>
      {rounded ? (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginBottom,
            marginTop,
            paddingHorizontal: scrollViewPaddingHorizontal,
            gap: 6,
          }}
        >
          {tabNames?.map((tabName, index) => {
            const iconName = tabIcons?.[index];
            const isActive = tab === index;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setTab(index)}
                style={[
                  styles.roundedContainer,
                  {
                    borderWidth: borderWidth ?? 0,
                    borderColor: borderColor ?? "transparent",
                    borderRadius: borderRadius || 8,
                    backgroundColor: isActive
                      ? finalActiveColor
                      : ovalBg || "#FFFFFF0A",
                    height: height || 34,
                    paddingVertical: paddingVertical,
                    paddingHorizontal: paddingHorizontal,
                    overflow: isBlur ? "hidden" : "visible",
                  },
                ]}
              >
                {isBlur && (
                  <BlurView
                    blurType="dark"
                    blurAmount={16}
                    style={{
                      backgroundColor: "rgba(47, 47, 47, 0.1)",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: borderRadius || 8,
                    }}
                  />
                )}

                {/* Optional Image */}
                {!tabIcons && (image || (images && images[index])) && (
                  <Image
                    source={
                      images && images[index]
                        ? images[index]
                        : image || Images.car
                    }
                    style={{
                      height: 14,
                      width: 14,
                      marginRight: imgMarginRight,
                      tintColor: isActive
                        ? finalActiveTintColor
                        : finalInactiveTintColor,
                    }}
                  />
                )}

                {/* Optional Material Icon */}
                {tabIcons && iconName ? (
                  <Animated.View
                    style={{
                      opacity: iconOpacity,
                      position: "absolute",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    pointerEvents={isIconMode ? "auto" : "none"}
                  >
                    <MaterialIcons
                      name={iconName}
                      size={18}
                      color={isActive ? COLORS.black : COLORS.white}
                    />
                  </Animated.View>
                ) : null}

                {/* Text Label */}
                {tabName?.length > 0 ? (
                  <Animated.View style={{ opacity: textOpacity }}>
                    <CustomText
                      label={tabName}
                      lineHeight={14 * 1.4}
                      fontSize={14}
                      fontFamily={fontFamily}
                      textTransform="capitalize"
                      color={
                        oval
                          ? COLORS.buttonColor
                          : isActive
                          ? getActiveTextColor()
                          : finalInactiveTintColor
                      }
                    />
                  </Animated.View>
                ) : null}

                {isActive && !rounded && <View style={styles.indicator} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      ) : (
        <View style={[styles.mainContainer]}>
          {tabNames?.map((tabName, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setTab(index)}
              style={[styles.item, tab === index && styles.activeTab]}
            >
              <CustomText
                label={tabName}
                fontFamily={fontFamily}
                textTransform="capitalize"
                color={tab === index ? COLORS.white : COLORS.white3}
              />
              {tab === index && <View style={styles.indicator} />}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </>
  );
};

export default TopTab;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  roundedContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 14,
  },
  item: {
    flex: 1,
    alignItems: "center",
  },
  activeTab: {},
  indicator: {
    width: "90%",
    height: 3,
    borderRadius: 100,
    backgroundColor: COLORS.primaryColor,
    marginTop: 3,
  },
});
