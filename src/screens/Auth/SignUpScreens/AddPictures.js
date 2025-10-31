import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";

import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import fonts from "../../../assets/fonts";
import { useDispatch, useSelector } from "react-redux";
import { count, setOnboardingCount } from "../../../store/reducer/appSlice";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";
import { setUserData } from "../../../store/reducer/usersSlice";
import { put } from "../../../services/ApiRequest";
import { uploadAndGetUrl } from "../../../utils/constants";
import UploadImageCustom from "../../../components/UploadImageCustom"; // ✅ your advanced picker/camera component
import Icons from "../../../components/Icons";
import { ToastMessage } from "../../../utils/ToastMessage";

const MAX_IMAGES = 4;

const AddPictures = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState, setIsLoading }, ref) => {
    const onboardingCount = useSelector(count);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const CARD_SIZE = (width - 50) / 2;

    const cameraRef = useRef(null);
    const [images, setImages] = useState(state?.images || []);
    const [uploading, setUploading] = useState([]); // loader state per slot
    const [error, setError] = useState("");
    const [imageModal, setImageModal] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const [cameraIndex, setCameraIndex] = useState(null);

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
          const photo = await cameraRef.current.takePhoto({
            flash: "off",
          });
          if (photo?.path) {
            handleChange(photo);
          }
        }
      } catch (err) {
        console.log("Camera capture error:", err);
      }
    };

    const onDelete = (index) => {
      if (index === null || index === undefined) return;
      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const submit = async () => {
      if (images.length < MAX_IMAGES) {
        setError(`Please upload all ${MAX_IMAGES} pictures.`);
        return;
      }
      setIsLoading(true);

      try {
        setError("");
        const res = await put("user/profile", {
          pictures: images,
        });

        if (res?.data?.success) {
          dispatch(setUserData(res?.data?.user));
          setState({ ...state, images });
          ToastMessage(
            "Your photos have been uploaded successfully!",
            "success"
          );
          if (currentIndex < onboardingCount) {
            setCurrentIndex(currentIndex + 1);
          }
        } else {
          setError("Failed to update profile. Please try again.");
        }
      } catch (err) {
        console.log("Submit error:", err);
        setError("Something went wrong while saving.");
      } finally {
        setIsLoading(false);
      }
    };

    const back = () => {
      if (currentIndex > 1) setCurrentIndex(currentIndex - 1);
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
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
    );
  }
);

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
    top: 6,
    right: 6,
  },
});
