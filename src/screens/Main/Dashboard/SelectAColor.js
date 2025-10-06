import React, { useRef, useState, useEffect } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import ScreenWrapper from "../../../components/ScreenWrapper";
import Header from "../../../components/Header";
import AuthFooter from "../../../components/Auth/AuthFooter";

const FOCUSED_SIZE = 160;
const UNFOCUSED_SIZE = 120;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_SPACING = 20; // Consistent spacing between items

const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F"];

const SelectAColor = ({ navigation, route }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to the 2nd item (index 1) on component mount
    setTimeout(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: 1 * (FOCUSED_SIZE + ITEM_SPACING),
          animated: false,
        });
      }
    }, 100);
  }, []);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / (FOCUSED_SIZE + ITEM_SPACING));
    setActiveIndex(index);
  };

  const handleConfirm = () => {
    const selectedColor = colors[activeIndex];
    // Pass the selected color back to the previous screen
    if (route.params?.onColorSelect) {
      route.params.onColorSelect(selectedColor);
    }
    navigation.goBack();
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => <Header title={"Select A Color"} />}
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
            data={colors}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            snapToInterval={FOCUSED_SIZE + ITEM_SPACING}
            decelerationRate="fast"
            bounces={false}
            contentContainerStyle={{
              paddingHorizontal: (SCREEN_WIDTH - UNFOCUSED_SIZE) / 2,
            }}
            ItemSeparatorComponent={() => <View style={{ width: ITEM_SPACING }} />}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            renderItem={({ item, index }) => {
              const isFocused = index === activeIndex;
              const size = isFocused ? FOCUSED_SIZE : UNFOCUSED_SIZE;

              return (
                <View
                  style={[
                    styles.box,
                    {
                      width: size,
                      height: size,
                      backgroundColor: item,
                      marginVertical: isFocused
                        ? 0
                        : (FOCUSED_SIZE - UNFOCUSED_SIZE) / 2,
                    },
                  ]}
                />
              );
            }}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SelectAColor;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  sliderContainer: {
    height: FOCUSED_SIZE,
  },
  box: {
    borderRadius: 12,
  },
});
