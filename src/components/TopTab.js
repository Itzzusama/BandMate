import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import CustomText from "./CustomText";

import fonts from "../assets/fonts";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";

const TopTab = ({
  tab,
  setTab,
  tabNames,
  rounded,
  marginBottom,
  marginTop,
  image,
  images, // New prop for array of images
  height,
  paddingVertical,
  paddingHorizontal = 14,
  fontFamily = fonts.semiBold,
  scrollViewPaddingHorizontal = 0,
  activeColor,
  imgMarginRight
}) => {
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
          }}
        >
          {tabNames?.map((tabName, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setTab(index)}
              style={[
                styles.roundedContainer,
                {
                  backgroundColor:
                    tab == index
                      ? activeColor || COLORS.primaryColor
                      : "transparent",
                  height: height || 34,
                  paddingVertical: paddingVertical,
                  paddingHorizontal: paddingHorizontal,
                },
              ]}
            >
              {(image || (images && images[index])) && (
                <Image
                  source={
                    images && images[index]
                      ? images[index]
                      : image || Images.car
                  }
                  style={{
                    height: 14,
                    width: 14,
                    marginRight:imgMarginRight,
                    tintColor:
                      tab == index ? COLORS.white : COLORS.primaryColor,
                  }}
                />
              )}
              <CustomText
                label={tabName}
                lineHeight={14 * 1.4}
                fontFamily={fontFamily}
                textTransform="capitalize"
                color={rounded && tab == index ? COLORS.white : COLORS.black}
              />
              {tab === index && !rounded && <View style={styles.indicator} />}
            </TouchableOpacity>
          ))}
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
    marginRight: 8,
    borderWidth: 1.2,
    borderColor: COLORS.lightGray,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
    paddingHorizontal: 14,
    borderRadius: 99,
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
