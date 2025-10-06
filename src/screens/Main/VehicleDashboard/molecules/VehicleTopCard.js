import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import CustomButton from "../../../../components/CustomButton";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";

const { width: screenWidth } = Dimensions.get("window");

const VehicleTopCard = ({
  mainTag = "MAIN VEHICLE",
  plate = "GE 555 555",
  carImages = [],
  carName = "Tesla Model 3",
  carType = "Sedan • Electric",
  priceChange = "+$547",
  pricePeriod = "This week",
  isEdit,
  onEditPress,
  onCardPress,
  onSellPress,
  width,
  onDellPress,
  isBook,
  onBookPress,
  onCalenderPress,
  isOrder,
  onOrderPress,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState(carImages);
  const translateX = useRef(new Animated.Value(0)).current;
  const cardWidth = width || 320;
  const imageWidth = 200; // Fixed image width from styles

  // Reset animation and index when images change
  useEffect(() => {
    setCurrentIndex(0);
    translateX.setValue(0);
  }, [carImages]);

  // Create PanResponder for swipe gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Only respond to horizontal swipes
      return (
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10
      );
    },
    onPanResponderGrant: () => {
      // Set the offset to the current value when gesture starts
      translateX.setOffset(translateX._value);
    },
    onPanResponderMove: (evt, gestureState) => {
      // Update the animated value during gesture
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      // Flatten the offset
      translateX.flattenOffset();

      const threshold = imageWidth * 0.3; // 30% of image width
      const velocity = gestureState.vx;

      let newIndex = currentIndex;

      // Determine swipe direction and check bounds
      if (gestureState.dx < -threshold || velocity < -0.5) {
        // Swipe left - next image
        if (currentIndex < images.length - 1) {
          newIndex = currentIndex + 1;
        }
      } else if (gestureState.dx > threshold || velocity > 0.5) {
        // Swipe right - previous image
        if (currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
      }

      // Animate to the target position
      const targetX = -newIndex * imageWidth;

      Animated.spring(translateX, {
        toValue: targetX,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      setCurrentIndex(newIndex);
    },
  });

  // Function to handle indicator tap
  const handleIndicatorPress = (index) => {
    if (index !== currentIndex && index >= 0 && index < images.length) {
      const targetX = -index * imageWidth;

      Animated.spring(translateX, {
        toValue: targetX,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();

      setCurrentIndex(index);
    }
  };

  // Don't render if no images
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onCardPress}
        disabled={!onCardPress}
        style={[styles.card, { width: cardWidth }]}
      >
        <View style={styles.row}>
          <View style={styles.tagRow}>
            <View style={styles.mainTag}>
              <ImageFast
                source={Images.car}
                style={{ height: 18, width: 18 }}
              />
              <CustomText
                label={mainTag}
                fontSize={12}
                textTransform={"uppercase"}
                color={COLORS.primaryColor}
                fontFamily={fonts.semiBold}
                marginTop={3}
                marginLeft={4}
              />
            </View>
          </View>
          <View style={styles.plateTag}>
            <CustomText
              label={plate}
              fontSize={12}
              color={COLORS.white}
              fontFamily={fonts.semiBold}
            />
          </View>
        </View>

        {/* Swipeable Image Container */}
        <View style={styles.imageContainer} {...panResponder.panHandlers}>
          <Animated.View
            style={[
              styles.imageRow,
              {
                transform: [{ translateX }],
              },
            ]}
          >
            {images.map((imageUri, index) => (
              <ImageFast
                key={index}
                source={{ uri: imageUri }}
                style={styles.carImage}
                resizeMode="cover"
              />
            ))}
          </Animated.View>
        </View>

        <View style={styles.infoRow}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            <CustomText
              label={priceChange}
              color={COLORS.green}
              fontSize={10}
              fontFamily={fonts.medium}
            />
            <Image
              source={PNGIcons.arrowUp}
              style={{
                height: 5,
                width: 8,
                marginBottom: 4,
                marginHorizontal: 2,
              }}
            />
            <CustomText
              label={pricePeriod}
              color={COLORS.gray3}
              fontSize={10}
            />
          </View>
          <CustomText
            label={carName}
            fontSize={18}
            fontFamily={fonts.medium}
            marginTop={-6}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: -6,
            }}
          >
            <CustomText
              label={carType}
              fontSize={14}
              color={COLORS.gray3}
              fontFamily={fonts.medium}
            />

            {/* Dynamic Indicators - Only show if more than 1 image */}
            {images.length > 1 && (
              <View style={styles.indicatorContainer}>
                {images.map((_, index) => {
                  const isSelected = index === currentIndex;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleIndicatorPress(index)}
                      style={[
                        styles.indicator,
                        {
                          height: isSelected ? 16 : 6,
                          backgroundColor: isSelected
                            ? COLORS.primaryColor
                            : "#d2d2d2",
                        },
                      ]}
                      activeOpacity={0.7}
                    />
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {isEdit && (
        <View style={styles.editContainer}>
          <CustomButton
            title={"Edit Vehicle"}
            color={COLORS.primaryColor}
            backgroundColor={COLORS.lightGray}
            width="43%"
            borderRadius={12}
            fontSize={14}
            height={40}
            rightIcon={PNGIcons.edit}
            onPress={onEditPress}
          />
          <CustomButton
            title={"Sell This Vehicle"}
            width="43%"
            color={COLORS.white}
            backgroundColor={COLORS.darkPurple}
            borderRadius={12}
            fontSize={14}
            height={40}
            icon={PNGIcons.sell}
            onPress={onSellPress}
          />
          <TouchableOpacity onPress={onDellPress} activeOpacity={0.7}>
            <ImageFast
              source={PNGIcons.delButton}
              style={{ height: 40, width: 40 }}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
      )}
      {isBook && (
        <View style={styles.editContainer}>
          <CustomButton
            title={"Book Now"}
            color={COLORS.primaryColor}
            backgroundColor={COLORS.lightGray}
            width="88%"
            fontSize={16}
            height={40}
            onPress={onBookPress}
          />

          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              backgroundColor: COLORS.lightGray,
              borderRadius: 99,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={onCalenderPress}
            activeOpacity={0.7}
          >
            <ImageFast
              source={Images.smallCalender}
              style={{ height: 16, width: 16 }}
            />
          </TouchableOpacity>
        </View>
      )}
      {isOrder && (
        <View style={styles.editContainer}>
          <CustomButton
            title={"Order"}
            color={COLORS.primaryColor}
            backgroundColor={COLORS.lightGray}
            fontSize={14}
            height={40}
            onPress={onOrderPress}
          />
        </View>
      )}
      {isEdit && (
        <View
          style={{
            height: 1,
            backgroundColor: COLORS.lightGray,
            marginVertical: 16,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    marginRight: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  mainTag: {
    flexDirection: "row",
    alignItems: "center",
  },
  plateTag: {
    backgroundColor: COLORS.primaryColor,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imageContainer: {
    width: 200,
    height: 100,
    alignSelf: "center",
    overflow: "hidden",
  },
  imageRow: {
    flexDirection: "row",
  },
  carImage: {
    width: 200,
    height: 100,
    marginTop: 5,
  },
  infoRow: {
    marginTop: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    width: 6,
    borderRadius: 56,
    marginHorizontal: 3,
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default VehicleTopCard;
