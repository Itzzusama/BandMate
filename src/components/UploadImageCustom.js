import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Reanimated from "react-native-reanimated";
import { openPicker } from "react-native-image-crop-picker";
import { Camera, useCameraDevice } from "react-native-vision-camera";

import { Images } from "../assets/images";
import { COLORS } from "../utils/COLORS";
import { useIsForeground } from "../utils/UseIsForground";
import CustomButton from "./CustomButton";
import CustomModal from "./CustomModal";
import ImageFast from "./ImageFast";
import CustomText from "./CustomText";
import { ToastMessage } from "../utils/ToastMessage";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps();

const UploadImageCustom = ({
  images,
  camera,
  onDelete,
  imageModal,
  imgLoading,
  handleChange,
  handleCapture,
  setImageModal,
}) => {
  const isFocused = useIsFocused();
  const isForeground = useIsForeground();

  const [active, setActive] = useState(true);
  const [selected, setSelected] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isPermissionChecked, setIsPermissionChecked] = useState(false);

  const device = useCameraDevice("back");

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

  const openSettings = async () => {
    try {
      if (Platform.OS === "ios") {
        const settingsUrl = "app-settings:";
        const canOpen = await Linking.canOpenURL(settingsUrl);
        if (canOpen) {
          await Linking.openURL(settingsUrl);
        } else {
          ToastMessage(
            "Unable to open settings. Please open them manually.",
            "error"
          );
        }
      } else {
        await Linking.openSettings();
      }
    } catch (error) {
      ToastMessage(
        "An unexpected error occurred while opening settings.",
        "error"
      );
    }
  };

  const takePhotoFromLibrary = async () => {
    try {
      setImageModal(false);
      setTimeout(async () => {
        const result = await openPicker({
          mediaType: "photo",
          quality: 0.8,
        });

        if (result.path) {
          handleChange(result);
        }
      }, 1000);
    } catch (error) {
      console.log("takePhotoFromLibrary error", error);
    }
  };

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

  let message = "";

  if (!isPermissionChecked) {
    message = "Loading camera...";
    return;
  }

  if (!hasPermission) {
    message = "Please grant permission to use camera!";
    return;
  } else if (device == null) {
    message = "Please grant permission to use camera!";
    return;
  }

  return (
    <View>
      <CustomModal
        isChange
        transparent={true}
        isVisible={imageModal}
        backgroundColor="transparent"
        onDisable={() => {
          setImageModal(false);
          setSelected(null);
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.imagesContainer}>
            {message ? (
              <TouchableOpacity activeOpacity={0.6} onPress={openSettings}>
                <CustomText
                  width={100}
                  color={"#fff"}
                  textAlign={"center"}
                  label={"Please grant permission to use camera!"}
                />
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity onPress={handleCapture} disabled={imgLoading}>
                  {imgLoading && (
                    <View style={styles.loader}>
                      <ActivityIndicator color={"#fff"} size={"small"} />
                    </View>
                  )}
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
                      isActive={isActive && active}
                      style={StyleSheet.absoluteFill}
                      lowLightBoost={device.supportsLowLightBoost}
                    />
                  </Reanimated.View>
                </TouchableOpacity>
                <View style={styles.line} />
              </>
            )}
            <FlatList
              horizontal
              contentContainerStyle={{ paddingLeft: 13 }}
              showsHorizontalScrollIndicator={false}
              data={images}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => setSelected(index)}
                  style={[
                    { marginRight: 10 },
                    selected === index && styles.selected,
                  ]}
                >
                  <ImageFast source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>
              )}
            />
          </View>
          <CustomButton
            marginBottom={8}
            icon={Images.gallery}
            backgroundColor={"#525252"}
            title={"Choose from Gallery"}
            onPress={takePhotoFromLibrary}
          />
          <CustomButton
            icon={Images.bin}
            iconColor={COLORS.white}
            title={"Delete this Image"}
            backgroundColor={"#EE1045"}
            onPress={() => onDelete(selected)}
          />
        </View>
      </CustomModal>
    </View>
  );
};

export default UploadImageCustom;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#131313",
    width: "100%",
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 14,
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 16,
  },
  cameraBox: {
    height: 80,
    width: 80,
    borderRadius: 16,
    overflow: "hidden",
  },
  loader: {
    height: 80,
    width: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0000009E",
    position: "absolute",
    zIndex: 2,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  line: {
    height: 70,
    width: 1,
    marginLeft: 13,
    backgroundColor: "#FFFFFF29",
  },
  selected: {
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 16,
    borderColor: COLORS.white,
  },
});
