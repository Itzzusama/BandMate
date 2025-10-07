import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView, Dimensions, StatusBar, View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ImageFast from "./ImageFast";

import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";

const { width, height } = Dimensions.get("window");

const FocusAwareStatusBar = (props) => {
  const isFocused = useIsFocused();
  return isFocused ? (
    <StatusBar
      hidden
      barStyle="dark-content"
      backgroundColor={COLORS.black}
      {...props}
    />
  ) : null;
};

const ScreenWrapper = ({
  children,
  statusBarColor = COLORS.black,
  translucent = false,
  scrollEnabled = false,
  backgroundImage,
  backgroundColor = COLORS.black,
  headerUnScrollable = () => null,
  footerUnScrollable = () => null,
  barStyle = "dark-content",
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

  const content = () => {
    return (
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
        {isAuth ? (
          <ImageFast
            source={Images.backIcon}
            style={{ width: 41, height: 41, margin: 16 }}
            onPress={() => {
              if (navigation.canGoBack()) navigation.goBack();
            }}
          />
        ) : null}
        {headerUnScrollable()}

        {scrollEnabled ? (
          <KeyboardAwareScrollView
            nestedScrollEnabled={nestedScrollEnabled}
            refreshControl={refreshControl}
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
            style={{ paddingHorizontal, flex: 1, paddingLeft, paddingRight }}
          >
            {children}
          </View>
        )}
        {footerUnScrollable()}
      </View>
    );
  };
  return backgroundImage ? (
    <View style={{ width, height: height + imageBottom, zIndex: 999 }}>
      {content()}
      <ImageFast
        source={backgroundImage}
        removeLoading={removeLoading}
        style={{
          width,
          height: height + 70,
          position: "absolute",
          zIndex: -1,
        }}
        resizeMode="cover"
      />
    </View>
  ) : (
    content()
  );
};

export default ScreenWrapper;
