import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Reanimated from "react-native-reanimated";
import Svg, { Defs, Ellipse, Mask, Rect } from "react-native-svg";
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import { useImageLabeler } from "react-native-vision-camera-v3-image-labeling";
import { Worklets } from "react-native-worklets-core";
import ImageEditor from "@react-native-community/image-editor";

import fonts from "../../../assets/fonts";
import CustomText from "../../../components/CustomText";
import Icons from "../../../components/Icons";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useIsForeground } from "../../../utils/UseIsForground";
import CaptureButton from "./molecules/CaptureButton";
import SelfiPreview from "./molecules/SelfiPreview";
import { put } from "../../../services/ApiRequest";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps();

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TakePhoto = () => {
  const camera = useRef(null);
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { frontSide, backSide } = params;
  const [media, setMedia] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isPermissionChecked, setIsPermissionChecked] = useState(false);

  const device = useCameraDevice("front");
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  const { scanImage } = useImageLabeler({ minConfidence: 0.35 });

  const onPermissions = async () => {
    try {
      const cameraPermission = await Camera.requestCameraPermission();
      const isGranted = cameraPermission === "granted";
      setHasPermission(isGranted);
      setIsPermissionChecked(true);
    } catch (error) {
      setHasPermission(false);
      setIsPermissionChecked(true);
    }
  };

  const handleCapture = async () => {
    if (!camera?.current) return ToastMessage("Camera not found!", "error");
    setLoading(true);

    const photo = await camera?.current?.takePhoto({ flash: "off" });
    let filePath = photo?.path;
    if (!filePath?.startsWith("file://")) {
      filePath = `file://${filePath}`;
    }

    setMedia(filePath);
    setActive(false);
    setLoading(false);
  };

  const handleBack = () => {
    if (media) {
      setActive(true);
      setMedia("");
    } else {
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      onPermissions();
      setActive(true);
      return () => setActive(false);
    }, [])
  );

  // if (!isPermissionChecked) return <View style={styles.blank} />;
  // if (!hasPermission || device === null)
  //   return (
  //     <View
  //       style={[
  //         styles.blank,
  //         { justifyContent: "center", alignItems: "center" },
  //       ]}
  //     >
  //       <CustomText
  //         label="Camera permission not granted"
  //         color={COLORS.white}
  //         fontSize={16}
  //       />
  //     </View>
  //   );

  return (
    <ScreenWrapper backgroundColor={"#000"} paddingHorizontal={0.1} translucent>
      {/* ===== Header ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
          <Icons
            name="keyboard-arrow-left"
            family="MaterialIcons"
            size={26}
            color={COLORS.white}
          />
        </TouchableOpacity>
        <CustomText
          label={media ? "Preview" : "Back"}
          color={COLORS.white}
          fontSize={18}
          fontFamily={fonts.medium}
        />
      </View>

      {/* ===== Camera ===== */}
      {!media && (
        <Reanimated.View style={StyleSheet.absoluteFill}>
          {/* <ReanimatedCamera
            photo
            ref={camera}
            device={device}
            isActive={isActive && active}
            style={StyleSheet.absoluteFill}
          /> */}
        </Reanimated.View>
      )}

      {/* ===== Oval Overlay ===== */}
      {!media && (
        <View style={styles.overlayContainer}>
          <Svg height="100%" width="100%">
            <Defs>
              <Mask id="mask" x="0" y="0" width="100%" height="100%">
                <Rect width="100%" height="100%" fill="white" />
                <Ellipse cx="50%" cy="40%" rx="150" ry="190" fill="black" />
              </Mask>
            </Defs>

            <Rect width="100%" height="100%" fill="#121212" mask="url(#mask)" />
            <Ellipse
              cx="50%"
              cy="40%"
              rx="150"
              ry="190"
              stroke="white"
              strokeWidth={1.5}
              fill="transparent"
            />
          </Svg>

          <CustomText
            label="Keep your face in the frame."
            fontSize={14}
            color="#CCCCCC"
          />
        </View>
      )}

      {/* ===== Footer ===== */}
      {!media && (
        <View style={styles.footer}>
          <CustomText
            label="Take A Selfie"
            color={COLORS.white}
            fontFamily={fonts.semiBold}
            fontSize={16}
            marginBottom={4}
          />
          <CustomText
            label="Make sure that your face is clearly visible."
            color="#A0A0A0"
            fontSize={13}
            marginBottom={20}
          />

          {/* Buttons Row */}
          <View style={styles.controls}>
            <View style={styles.sideButton}>
              <Icons
                name="volume-off"
                family="MaterialIcons"
                size={20}
                color={COLORS.white}
              />
            </View>

            <TouchableOpacity
              disabled={loading}
              onPress={handleCapture}
              activeOpacity={0.8}
              style={styles.captureButton}
            >
              {loading ? (
                <ActivityIndicator color={COLORS.black} />
              ) : (
                <View style={styles.innerCapture} />
              )}
            </TouchableOpacity>

            <View style={styles.sideButton}>
              <Icons
                name="grid-on"
                family="MaterialIcons"
                size={20}
                color={COLORS.white}
              />
            </View>
          </View>
        </View>
      )}
    </ScreenWrapper>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  blank: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    position: "absolute",
    top: 40,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    backgroundColor: "#FFFFFF25",
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  sideButton: {
    backgroundColor: "#1E1E1E",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  innerCapture: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.white,
  },
});
