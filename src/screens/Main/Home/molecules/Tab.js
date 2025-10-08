import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import { useEffect, useRef } from "react";

import CustomBlurComponent from "../../../../components/CustomBlurComponent";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { useNavigation } from "@react-navigation/native";

const Tab = ({ tab, setTab }) => {
  const navigation = useNavigation();
  const earningsOpacity = useRef(new Animated.Value(tab === 0 ? 0 : 1)).current;
  const filterOpacity = useRef(new Animated.Value(tab === 0 ? 0 : 1)).current;
  const earningsTranslateX = useRef(
    new Animated.Value(tab === 0 ? -20 : 0)
  ).current;
  const filterTranslateX = useRef(
    new Animated.Value(tab === 0 ? 20 : 0)
  ).current;

  const tab0Scale = useRef(new Animated.Value(tab === 0 ? 1.1 : 1)).current;
  const tab1Scale = useRef(new Animated.Value(tab === 1 ? 1.1 : 1)).current;

  useEffect(() => {
    const duration = 300;
    const easing = Animated.timing;

    if (tab === 0) {
      Animated.parallel([
        easing(earningsOpacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        easing(filterOpacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        easing(earningsTranslateX, {
          toValue: -20,
          duration,
          useNativeDriver: true,
        }),
        easing(filterTranslateX, {
          toValue: 20,
          duration,
          useNativeDriver: true,
        }),
        easing(tab0Scale, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        easing(tab1Scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        easing(earningsOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        easing(filterOpacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        easing(earningsTranslateX, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        easing(filterTranslateX, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
        easing(tab0Scale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        easing(tab1Scale, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [tab]);

  const handleTabPress = (index) => {
    setTab(index);
  };

  return (
    <View style={styles.mainContainer}>
      <Animated.View
        style={{
          width: 72,
          opacity: earningsOpacity,
          transform: [{ translateX: earningsTranslateX }],
        }}
      >
        <CustomBlurComponent
          width={72}
          height={49}
          borderRadius={12}
          reducedTransparencyFallbackColor="#FFFFFF"
          blurAmount={16}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Deliveries")}>
            <CustomText
              label="$20.00"
              fontFamily={fonts.medium}
              lineHeight={16.8}
            />
            <CustomText
              label="Earnings"
              fontFamily={fonts.medium}
              fontSize={10}
              color="#1212127A"
              lineHeight={12}
            />
          </TouchableOpacity>
        </CustomBlurComponent>
      </Animated.View>

      <CustomBlurComponent
        height={50}
        width={90}
        alignSelf="center"
        reducedTransparencyFallbackColor="#FFFFFF"
        blurAmount={16}
      >
        <View style={styles.row}>
          {[PNGIcons.profile, PNGIcons.case].map((item, i) => (
            <Animated.View
              key={item}
              style={{
                transform: [{ scale: i === 0 ? tab0Scale : tab1Scale }],
              }}
            >
              <TouchableOpacity
                style={ [styles.iconContainer,{backgroundColor:tab==i ? COLORS.black:'transparent'}]}
                activeOpacity={0.6}
                onPress={() => handleTabPress(i)}
              >
                <Animated.Image
                  source={item}
                  style={[
                    styles.profile,
                    {
                      tintColor: tab == i ? COLORS.white : COLORS.black,
                    },
                  ]}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </CustomBlurComponent>

      <Animated.View
        style={{
          width: 48,
          opacity: filterOpacity,
          transform: [{ translateX: filterTranslateX }],
        }}
      >
        <CustomBlurComponent
          width={48}
          height={48}
          reducedTransparencyFallbackColor="#FFFFFF"
          blurAmount={16}
        >
          <ImageFast
            source={PNGIcons.filter}
            style={styles.icon}
            resizeMode="contain"
          />
        </CustomBlurComponent>
      </Animated.View>
    </View>
  );
};

export default Tab;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },

  iconContainer: {
    width: 31,
    height: 31,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  icon: {
    width: 24,
    height: 24,
  },
  profile: {
    width: 18,
    height: 18,
    resizeMode: "contain",
  },
});
