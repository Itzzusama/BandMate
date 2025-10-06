import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Reanimated from "react-native-reanimated";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import CustomButton from "../../../components/CustomButton";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import { COLORS } from "../../../utils/COLORS";
import { useIsForeground } from "../../../utils/UseIsForground";
import CameraErrorMessage from "./molecules/CamerErrorMessage";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps();

const { width } = Dimensions.get("window");

const TakeIDBack = ({ route }) => {
  const camera = useRef(null);
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const frontSide = params?.frontSide;

  const [media, setMedia] = useState("");
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isPermissionChecked, setIsPermissionChecked] = useState(false);

  const device = useCameraDevice("back");
  const isForeground = useIsForeground();
  const isActive = isFocused && isForeground;

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

  const handleRemoveImage = () => {
    setActive(true);
    setMedia("");
  };

  const handleContinue = async () => {
    if (media) {
      navigation.navigate("TakePhoto", {
        frontSide,
        id: params?.id,
        backSide: media,
        type: params?.type,
      });
      return;
    }

    if (!camera?.current) {
      return;
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

  const handleCancel = () => navigation.goBack();

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
  } else if (device == null) {
    return <CameraErrorMessage camera={false} />;
  }

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Take ID Back"} />}
      footerUnScrollable={() => (
        <View style={styles.actionButtonsContainer}>
          <CustomButton
            isBoarder
            marginBottom={12}
            onPress={handleContinue}
            title={media ? "Continue" : "Capture"}
            secondBorderColor={COLORS.primaryColor}
          />
          <CustomButton
            title="Cancel"
            color={COLORS.black}
            onPress={handleCancel}
            backgroundColor={COLORS.lightGray}
          />
        </View>
      )}
    >
      <CustomText
        label="Choose a document to validate your identity"
        fontSize={24}
        marginTop={12}
        lineHeight={24 * 1.4}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        fontSize={14}
        marginBottom={40}
        color={COLORS.gray1}
        lineHeight={14 * 1.4}
        textTransform={"none"}
        label="Please upload your document directly to the app. Scans and copies will not be accepted."
      />

      <View style={styles.box}>
        <ImageFast
          source={PNGIcons.warning}
          style={{ height: 40, width: 40 }}
        />

        <View style={{ marginLeft: 10, width: "85%" }}>
          <CustomText
            fontSize={16}
            lineHeight={16 * 1.4}
            label={"No blurry photos"}
            fontFamily={fonts.medium}
          />
          <CustomText
            fontSize={12}
            lineHeight={12 * 1.4}
            textTransform={"none"}
            label={"Make sure your camera is clean and avoid sudden movements."}
          />
        </View>
      </View>

      {media ? (
        <View>
          <TouchableOpacity onPress={handleRemoveImage} style={styles.icon}>
            <Icons name={"close"} family={"AntDesign"} color={COLORS.white} />
          </TouchableOpacity>
          <ImageFast source={{ uri: media }} style={styles.img} />
        </View>
      ) : (
        <Reanimated.View style={[styles.cameraBox]}>
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
            isActive={isActive && active && !media}
            lowLightBoost={device.supportsLowLightBoost}
          />
        </Reanimated.View>
      )}
      <CustomText
        fontSize={18}
        marginTop={10}
        marginBottom={20}
        alignSelf={"center"}
        textAlign={"center"}
        lineHeight={18 * 1.4}
        textTransform={"none"}
        fontFamily={fonts.medium}
        label={"Position the back of your document facing the camera"}
      />
    </ScreenWrapper>
  );
};

export default TakeIDBack;

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 16,
    padding: 12,
    marginBottom: 20,
  },
  cameraBox: {
    height: 230,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
  },
  actionButtonsContainer: {
    marginTop: "auto",
    paddingBottom: 20,
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  blank: {
    flex: 1,
    backgroundColor: "#000",
  },

  img: {
    height: 230,
    width: width - 30,
    borderRadius: 16,
    alignSelf: "center",
    marginBottom: 20,
  },
  icon: {
    height: 32,
    width: 32,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0000009E",
    position: "absolute",
    right: 20,
    zIndex: 1,
    top: 10,
  },
});
