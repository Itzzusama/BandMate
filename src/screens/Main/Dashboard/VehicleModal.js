import React, { useRef, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import AuthFooter from "../../../components/Auth/AuthFooter";
import ImageFast from "../../../components/ImageFast";
import { Images } from "../../../assets/images";
import { PNGIcons } from "../../../assets/images/icons";
import CustomText from "../../../components/CustomText";
import fonts from "../../../assets/fonts";
import { COLORS } from "../../../utils/COLORS";

const FOCUSED_SIZE = 170;
const UNFOCUSED_SIZE = 120;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = FOCUSED_SIZE;
const SNAP_INTERVAL = ITEM_WIDTH;

const VehicleModal = ({ navigation, route }) => {
  const models = route?.params?.models || [];
  const onSelectModel = route?.params?.onSelectModel;
  const [activeIndex, setActiveIndex] = useState(1);
  const flatListRef = useRef(null);


  
  useEffect(() => {
    // Scroll to the initial position (index 1) after component mounts
    setTimeout(() => {
      if (flatListRef.current && models.length > 1) {
        flatListRef.current.scrollToOffset({
          offset: 1 * SNAP_INTERVAL,
          animated: false,
        });
      }
    }, 100);
  }, []);

  console.log("models", models);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);
    setActiveIndex(index);
  };

  const handleConfirm = () => {
    const selected = models[activeIndex];
    if (typeof onSelectModel === "function") onSelectModel(selected);
    navigation.goBack();
  };

  
  const SIDE_PADDING = (SCREEN_WIDTH - ITEM_WIDTH) / 2;

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Select A Model"} />}
      footerUnScrollable={() => (
        <View style={{ padding: 12 }}>
          <AuthFooter
            btnTitle={"Confirm"}
            isMain
            title={
              "The easiest and most affordable way to reach your destination."
            }
            onPress={handleConfirm}
          />
        </View>
      )}
    >
      <View style={styles.container}>
        <View style={styles.sliderContainer}>
          <FlatList
            ref={flatListRef}
            horizontal
            data={models}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            snapToInterval={SNAP_INTERVAL}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{
              paddingHorizontal: SIDE_PADDING,
            }}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const isFocused = index === activeIndex;
              const size = isFocused ? FOCUSED_SIZE : UNFOCUSED_SIZE;

              return (
                <View
                  style={[
                    styles.itemContainer,
                    { width: ITEM_WIDTH }, // Fixed width for all items
                  ]}
                >
                  <View
                    style={[
                      styles.box,
                      {
                        width: size,
                        height: size,
                        opacity: isFocused ? 1 : 0.6, // Add opacity for better visual hierarchy
                      },
                    ]}
                  >
                    <ImageFast
                      source={Images.carModal3d}
                      style={styles.carImage}
                      resizeMode="contain"
                    />
                  </View>
                  {isFocused && ( // Only show text for focused item
                    <CustomText
                      label={item}
                      fontFamily={fonts.medium}
                      fontSize={16}
                      lineHeight={16 * 1.4}
                      marginTop={6}
                      color={COLORS.black} // Ensure text color is visible
                    />
                  )}
                </View>
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default VehicleModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  sliderContainer: {
    height: FOCUSED_SIZE + 40, // Add extra height for text
  },
  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    borderRadius: 12,
    // backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  carImage: {
    width: "100%",
    height: "100%",
  },
});
