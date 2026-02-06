import React, { useMemo, useCallback } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView, Dimensions, StatusBar, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ImageFast from "./ImageFast";
import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";

const { width, height } = Dimensions.get("window");

const FocusAwareStatusBar = React.memo((props) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar barStyle="light-content" {...props} /> : null;
});

const Layout = React.memo(
  ({
    children,
    statusBarColor = COLORS.black,
    translucent = false,
    scrollEnabled = false,
    backgroundImage,
    backgroundColor = COLORS.black,
    header,
    footer,
    barStyle = "light-content",
    refreshControl,
    paddingBottom,
    nestedScrollEnabled,
    paddingHorizontal = 12,
    isAuth,
    paddingLeft,
    paddingRight,
    removeLoading,
    imageBottom = 70,
  }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    // Memoize back button handler
    const handleBackPress = useCallback(() => {
      if (navigation.canGoBack()) navigation.goBack();
    }, [navigation]);

    // Build the main content structure
    const contentView = useMemo(
      () => (
        <View
          style={{
            flex: 1,
            backgroundColor: backgroundImage ? "transparent" : backgroundColor,
            paddingTop: translucent ? 0 : insets.top,
            paddingBottom: paddingBottom,
          }}
        >
          <FocusAwareStatusBar
            barStyle={barStyle}
            backgroundColor={statusBarColor}
            translucent={translucent}
          />
          {!translucent && (
            <SafeAreaView style={{ backgroundColor: statusBarColor }} />
          )}

          {isAuth && (
            <ImageFast
              source={Images.backIcon}
              style={{ width: 41, height: 41, margin: 16 }}
              onPress={handleBackPress}
            />
          )}

          {header}

          {scrollEnabled ? (
            <KeyboardAwareScrollView
              nestedScrollEnabled={nestedScrollEnabled}
              refreshControl={refreshControl}
              contentInsetAdjustmentBehavior="automatic"
              enableOnAndroid={true}
              style={{
                flex: 1,
                backgroundColor,
                paddingHorizontal,
                paddingLeft,
                paddingRight,
              }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {children}
            </KeyboardAwareScrollView>
          ) : (
            <View
              style={{
                paddingHorizontal,
                flex: 1,
                paddingLeft,
                paddingRight,
              }}
            >
              {children}
            </View>
          )}

          {footer}
        </View>
      ),
      [
        backgroundColor,
        backgroundImage,
        translucent,
        insets.top,
        paddingBottom,
        barStyle,
        statusBarColor,
        isAuth,
        scrollEnabled,
        nestedScrollEnabled,
        refreshControl,
        paddingHorizontal,
        paddingLeft,
        paddingRight,
        header,
        footer,
        children,
      ]
    );

    if (backgroundImage) {
      return (
        <View style={{ width, height: height + imageBottom, zIndex: 999 }}>
          {contentView}
          <ImageFast
            source={backgroundImage}
            removeLoading={removeLoading}
            style={{
              width,
              height: height + 70,
              position: "absolute",
              zIndex: -1,
            }}
            resizeMode="stretch"
          />
        </View>
      );
    }

    return contentView;
  }
);

Layout.displayName = "Layout";

export default Layout;
