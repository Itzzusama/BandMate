import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
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
import CameraErrorMessage from "./molecules/CamerErrorMessage";
import CaptureButton from "./molecules/CaptureButton";
import SelfiPreview from "./molecules/SelfiPreview";
import { put } from "../../../services/ApiRequest";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps();

const API_KEY = "5n7F2gNzERB7qijPbj6rXLqNk7jN4sm8cAU6p5j-u3k";

const headers = {
  "x-api-key": API_KEY,
  Accept: "application/json",
  "Content-Type": "multipart/form-data",
};

const MIN_CONFIDENCE = 0.35;

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const TakePhoto = () => {
  const camera = useRef(null);
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const { frontSide, backSide } = params;

  const [media, setMedia] = useState("");
  const [active, setActive] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isSelfieDetected, setIsSelfieDetected] = useState(false);
  const [isPermissionChecked, setIsPermissionChecked] = useState(false);

  const device = useCameraDevice("front");
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

  const { scanImage } = useImageLabeler({ minConfidence: MIN_CONFIDENCE });

  const setDetectedJsRef = useRef(
    Worklets.createRunOnJS((detected) => {
      detected ? setIsSelfieDetected(true) : setIsSelfieDetected(false);
    })
  );
  const setDetectedJs = setDetectedJsRef.current;

  const onPermissions = async () => {
    try {
      const cameraPermission = await Camera.requestCameraPermission();

      const isGranted = cameraPermission === "granted";

      setHasPermission(isGranted);
      setIsPermissionChecked(true);
    } catch (error) {
      console.log("Permission check error:", error);
      setHasPermission(false);
      setIsPermissionChecked(true);
    }
  };

  const handleCrop = async (uri) => {
    try {
      // First crop to rectangle (approx around your ellipse overlay)
      const cropData = {
        offset: { x: 100, y: 300 }, // starting point
        size: { width: 320, height: 400 }, // crop size
        displaySize: { width: 320, height: 400 }, // output size
        resizeMode: "contain",
      };

      const croppedUri = await ImageEditor.cropImage(uri, cropData);
      return croppedUri;
    } catch (err) {
      console.log("Crop error: ", err);
    }
  };

  const handleCapture = async () => {
    if (!camera?.current) {
      return ToastMessage("Camera not found!", "error");
    }
    setLoading(true);

    const photo = await camera?.current?.takePhoto({ flash: "off" });

    let filePath = photo?.path;
    if (!filePath?.startsWith("file://")) {
      filePath = `file://${filePath}`;
    }

    setLoading(false);
    setMedia(filePath);
    setActive(false);
  };

  const handleBack = () => {
    if (media) {
      setActive(true);
      setMedia("");
    } else {
      navigation.goBack();
    }
  };

  const handleDocs = async () => {
    try {
      let formData = new FormData();
      formData.append("front_image", {
        uri: frontSide,
        type: "image/jpeg",
        name: "id_front.jpg",
      });

      formData.append("back_image", {
        uri: backSide,
        type: "image/jpeg",
        name: "id_back.jpg",
      });

      const url = "https://verification.didit.me/v2/id-verification/";

      const response = await axios.post(url, formData, { headers });

      const result = await response.data;

      return {
        status: result?.id_verification?.status || "Declined",
        ref_image: result?.id_verification?.portrait_image || "",
      };
    } catch (error) {
      setLoader(false);
      console.error("Docs verification error:", error?.response?.data);
    }
  };

  const handleImage = async (refImage) => {
    try {
      let formData = new FormData();
      formData.append("user_image", {
        uri: media,
        type: "image/jpeg",
        name: "user_image.jpg",
      });

      formData.append("ref_image", {
        uri: refImage,
        type: "image/jpeg",
        name: "ref_image.jpg",
      });

      const url = "https://verification.didit.me/v2/face-match/";

      const response = await axios.post(url, formData, { headers });

      const result = await response.data;
      return result;
    } catch (error) {
      setLoader(false);
      console.log("Face verification error:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      let url;

      if (params?.type === "independent") {
        url = `/api/vtc/driver/${params?.id}`;
      } else {
        url = `vtc/business/${params?.id}`;
      }

      const res = await put(url, { isVerified: true });
      if (res?.data?.successs) {
        ToastMessage("KYC process has been completed!", "success");
        navigation.navigate("Home");
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log(error, "in. update user KYC");
    }
  };

  const handleVerify = async () => {
    try {
      setLoader(true);
      const { status, ref_image } = await handleDocs();

      if (status === "Approved") {
        const result = await handleImage(ref_image);
        if (result?.face_match?.status === "Approved") {
          handleUpdate();
        }
      } else {
        ToastMessage(
          "Validation failed! Please upload carefully, you will be blocked for 24 hours after 1 more invalid attempt",
          "error"
        );
        setLoader(false);
      }
    } catch (error) {
      setLoader(false);
      console.log(error, "err in KYC");
      ToastMessage("Validation failed. Please try again!", "error");
    }
  };

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";

    try {
      const labels = scanImage(frame);
      let detected = false;

      if (labels && labels.length > 0) {
        for (let i = 0; i < labels.length; i++) {
          const l = labels[i];
          if (l?.label && l.label === "Selfie") {
            if (l.confidence >= MIN_CONFIDENCE) {
              detected = true;
              break;
            }
          }
        }
      }

      setDetectedJs(detected);
    } catch (e) {
      console.log(e, "innn frame ");
    }
  }, []);

  const onError = useCallback((error) => {
    console.log("camera error==>>", error);
  }, []);

  useFocusEffect(
    useCallback(() => {
      onPermissions();
      setActive(true);

      return () => {
        setActive(false);
      };
    }, [])
  );

  if (!isPermissionChecked) {
    return <View style={styles.blank} />;
  }

  if (!hasPermission) {
    return <CameraErrorMessage />;
  } else if (device === null) {
    return <CameraErrorMessage camera={false} />;
  }

  return (
    <ScreenWrapper backgroundColor={COLORS.black}>
      <View style={styles.header}>
        <TouchableOpacity
          disabled={loader}
          activeOpacity={0.6}
          onPress={handleBack}
          style={styles.backIcon}
        >
          <Icons
            size={26}
            color={COLORS.white}
            family="MaterialIcons"
            name={media ? "close" : "keyboard-arrow-left"}
          />
        </TouchableOpacity>
        <CustomText
          fontSize={20}
          color={COLORS.white}
          textTransform={"none"}
          fontFamily={fonts.semiBold}
          label={media ? "Preview" : "Take a Selfie"}
        />
      </View>

      {media ? (
        <SelfiPreview
          selfi={media}
          loading={loader}
          handleVerify={handleVerify}
          handleCancel={() => {
            setMedia("");
            setActive(true);
          }}
        />
      ) : (
        <>
          <View style={styles.overlayContainer}>
            <Svg height="100%" width="100%">
              <Defs>
                <Mask id="mask" x="0" y="0" width="100%" height="100%">
                  <Rect width="100%" height="100%" fill="white" />
                  <Ellipse cx="50%" cy="45%" rx="160" ry="200" fill="black" />
                </Mask>
              </Defs>

              <Rect
                width="100%"
                height="100%"
                fill="rgba(0,0,0,0.6)"
                mask="url(#mask)"
              />

              <Ellipse
                cx="50%"
                cy="45%"
                rx="160"
                ry="200"
                stroke={isSelfieDetected ? "green" : "red"}
                strokeWidth={4}
                fill="transparent"
              />
            </Svg>
          </View>

          <Reanimated.View style={[StyleSheet.absoluteFill]}>
            <ReanimatedCamera
              photo
              ref={camera}
              exposure={0}
              device={device}
              onError={onError}
              enableZoomGesture
              orientation="portrait"
              enableHighQualityPhotos
              style={StyleSheet.absoluteFill}
              frameProcessor={frameProcessor}
              isActive={isActive && active && !media}
              lowLightBoost={device.supportsLowLightBoost}
            />
          </Reanimated.View>
        </>
      )}

      {loading || media
        ? null
        : isSelfieDetected && <CaptureButton onPress={handleCapture} />}
    </ScreenWrapper>
  );
};

export default TakePhoto;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    zIndex: 3,
    position: "absolute",
  },
  backIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF29",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
});
