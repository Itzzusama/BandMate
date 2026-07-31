import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Blur from "../../../components/Blur";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { PNGIcons } from "../../../assets/images/icons";
import { setUserData } from "../../../store/reducer/usersSlice";
import { put } from "../../../services/ApiRequest";
import { uploadAndGetUrl } from "../../../utils/constants";
import UploadImageCustom from "../../../components/UploadImageCustom";
import Icons from "../../../components/Icons";
import { ToastMessage } from "../../../utils/ToastMessage";
import ScreenWrapper from "../../../components/ScreenWrapper";
import AuthHeader from "../../../components/Auth/AuthHeader";
import AuthFooter from "../../../components/Auth/AuthFooter";

const MAX_IMAGES = 4;

const AddPictures = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const CARD_SIZE = (width - 50) / 2;
  const { userData } = useSelector((state) => state.users);
  const [step, setStep] = useState(userData?.role == "band" ? 14 : 15);
  const totalSteps = userData?.role == "band" ? 15 : 16;
  const cameraRef = useRef(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState([]);
  const [error, setError] = useState("");
  const [imageModal, setImageModal] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [cameraIndex, setCameraIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (pickedImage) => {
    if (!pickedImage?.path && !pickedImage?.uri) return;

    const localUri = pickedImage.path || pickedImage.uri;
    const file = {
      uri: localUri,
      type: pickedImage.mime || "image/jpeg",
    };

    try {
      setImgLoading(true);
      setUploading((prev) => {
        const updated = [...prev];
        updated[cameraIndex] = true;
        return updated;
      });

      const uploadedUrl = await uploadAndGetUrl(file);

      if (uploadedUrl) {
        setImages((prev) => {
          const updated = [...prev];
          updated[cameraIndex] = uploadedUrl;
          return updated;
        });
        setError("");
      } else {
        setError("Failed to upload image. Please try again.");
      }
    } catch (err) {
      console.log("Upload error:", err);
      setError("Error while uploading image.");
      ToastMessage(err?.data?.message || err?.message || "Error while uploading image.", "error");
    } finally {
      setImgLoading(false);
      setUploading((prev) => {
        const updated = [...prev];
        updated[cameraIndex] = false;
        return updated;
      });
    }
  };

  const handleCapture = async () => {
    try {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePhoto({ flash: "off" });
        if (photo?.path) handleChange(photo);
      }
    } catch (err) {
      console.log("Camera capture error:", err);
    }
  };

  const onDelete = (index) => {
    if (index === null || index === undefined) return;
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = async () => {
    // navigation.navigate("AddDescription");
    if (images.length < MAX_IMAGES) {
      setError(`Please upload all ${MAX_IMAGES} pictures.`);
      return;
    }

    setIsLoading(true);
    try {
      setError("");
      const res = await put("user/profile", { pictures: images });

      if (res?.data?.success) {
        dispatch(setUserData(res?.data?.user));
        ToastMessage("Your photos have been uploaded successfully!", "success");
        navigation.navigate("AddDescription");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      console.log("Submit error:", err);
      setError("Something went wrong while saving.");
      ToastMessage(err?.data?.message || err?.message || "Something went wrong while saving.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
  };

  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <AuthFooter
          paddingHorizontal={12}
          onPress={handleNext}
          onBackPress={handleBack}
          btnLoading={isLoading}
          btnDisabled={images.filter(Boolean).length === 0}
        />
      )}
    >
      <AuthHeader
        step={step}
        totalSteps={totalSteps}
        subtitle="Upload your photos"
      />

      <View style={styles.container}>
        <CustomText
          label="Pictures"
          fontFamily={fonts.abril}
          fontSize={24}
          lineHeight={24 * 1.4}
          marginTop={10}
          marginBottom={2}
        />
        <CustomText
          label={`Add pictures to stand out in the community (${images.length}/${MAX_IMAGES})`}
          color={COLORS.white2}
          fontSize={12}
          lineHeight={12 * 1.4}
          marginBottom={12}
        />

        <View style={styles.grid}>
          {Array.from({ length: MAX_IMAGES }).map((_, index) => {
            const img = images[index];
            const isUploading = uploading[index];

            return (
              <TouchableOpacity
                key={index}
                style={[styles.card, { width: CARD_SIZE, height: CARD_SIZE }]}
                activeOpacity={0.8}
                onPress={() => {
                  setCameraIndex(index);
                  setImageModal(true);
                }}
                disabled={isUploading}
              >
                {img ? (
                  <>
                    <Image
                      source={{ uri: img }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                    <TouchableOpacity
                      style={styles.removeOverlay}
                      onPress={() => onDelete(index)}
                      disabled={isUploading}
                    >
                      <Blur blurAmount={4} />
                      <Image
                        source={PNGIcons.trash}
                        style={{ height: 40, width: 40 }}
                      />
                    </TouchableOpacity>
                  </>
                ) : isUploading ? (
                  <ActivityIndicator size="large" color={COLORS.btnColor} />
                ) : (
                  <Icons
                    family="AntDesign"
                    name="plus"
                    size={50}
                    color={COLORS.white2}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <ErrorComponent
          errorTitle={
            error
              ? error
              : ".jpg; .png format only. Please upload exactly 4 images (1:1 ratio preferred)."
          }
          color={error ? "#EE1045" : ""}
        />

        {imageModal && (
          <UploadImageCustom
            images={images}
            camera={cameraRef}
            onDelete={onDelete}
            imageModal={imageModal}
            imgLoading={imgLoading}
            handleChange={handleChange}
            handleCapture={handleCapture}
            setImageModal={setImageModal}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default AddPictures;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    rowGap: 9,
    justifyContent: "center",
    marginBottom: 6,
  },
  card: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#1B1B1B",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeOverlay: {
    position: "absolute",
    borderRadius: 99,
    overflow: "hidden",
    top: 6,
    right: 6,
  },
});
