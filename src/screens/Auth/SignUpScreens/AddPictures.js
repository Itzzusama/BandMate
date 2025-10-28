import { forwardRef, useImperativeHandle, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import CustomText from "../../../components/CustomText";
import ErrorComponent from "../../../components/ErrorComponent";
import Icons from "../../../components/Icons";
import fonts from "../../../assets/fonts";
import { useDispatch, useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";
import { setUserData } from "../../../store/reducer/usersSlice";
import { put } from "../../../services/ApiRequest";
import { uploadAndGetUrl } from "../../../utils/constants";

const MAX_IMAGES = 4;

const AddPictures = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [images, setImages] = useState(state?.images || []);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const onboardingCount = useSelector(count);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const CARD_SIZE = (width - 50) / 2;

    const openGallery = async () => {
      try {
        const image = await ImagePicker.openPicker({
          width: 800,
          height: 800,
          cropping: true,
          compressImageQuality: 0.8,
          mediaType: "photo",
        });

        setImages((prev) => {
          if (prev.length >= MAX_IMAGES) return prev;
          return [...prev, { uri: image.path, type: image.mime }];
        });
      } catch (err) {
        console.log("Image pick cancelled:", err);
      }
    };

    const removeImage = (index) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const submit = async () => {
      if (images.length < MAX_IMAGES) {
        setError(`Please upload all ${MAX_IMAGES} pictures.`);
        return;
      }

      try {
        setError("");
        setLoading(true);

        const uploadedUrls = [];
        for (const img of images) {
          const uploadedUrl = await uploadAndGetUrl(img);
          if (uploadedUrl) uploadedUrls.push(uploadedUrl);
        }
        console.log(uploadedUrls);
        const res = await put("user/profile", {
          pictures: uploadedUrls,
        });

        console.log("Profile update response:", res?.data);

        if (res?.data?.success) {
          dispatch(setUserData(res?.data?.user));
          setState({ ...state, images: uploadedUrls });
          if (currentIndex < onboardingCount) {
            setCurrentIndex(currentIndex + 1);
          }
        } else {
          setError("Failed to update profile. Please try again.");
        }
      } catch (err) {
        console.log("Submit error:", err);
        setError("Something went wrong while uploading images.");
      } finally {
        setLoading(false);
      }
    };

    const back = () => {
      if (currentIndex > 1) {
        setCurrentIndex(currentIndex - 1);
      }
    };

    useImperativeHandle(ref, () => ({ submit, back }));

    return (
      <View style={styles.container}>
        <View>
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

          {/* Image grid */}
          <View style={styles.grid}>
            {Array.from({ length: MAX_IMAGES }).map((_, index) => {
              const img = images[index];
              return (
                <TouchableOpacity
                  key={index}
                  style={[styles.card, { width: CARD_SIZE, height: CARD_SIZE }]}
                  activeOpacity={0.8}
                  onPress={
                    !img && images.length < MAX_IMAGES
                      ? openGallery
                      : () => removeImage(index)
                  }
                  disabled={loading}
                >
                  {img ? (
                    <>
                      <Image
                        source={{ uri: img.uri }}
                        style={styles.image}
                        resizeMode="cover"
                      />
                      <View style={styles.removeOverlay}>
                        <Image
                          source={PNGIcons.trash}
                          style={{ height: 40, width: 40 }}
                          resizeMode="cover"
                        />
                      </View>
                    </>
                  ) : (
                    images.length < MAX_IMAGES && (
                      <Icons
                        family="AntDesign"
                        name="plus"
                        size={50}
                        color={COLORS.white2}
                      />
                    )
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
        </View>
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
