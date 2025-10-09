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
import { useSelector } from "react-redux";
import { count } from "../../../store/reducer/appSlice";
import { COLORS } from "../../../utils/COLORS";
import { PNGIcons } from "../../../assets/images/icons";

const MAX_IMAGES = 4;

const AddPictures = forwardRef(
  ({ currentIndex, setCurrentIndex, state, setState }, ref) => {
    const [images, setImages] = useState(state?.images || []);
    const [error, setError] = useState("");
    const onboardingCount = useSelector(count);

    const { width } = useWindowDimensions();
    const CARD_SIZE = (width - 50) / 2; // 2 columns with spacing

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
          return [...prev, { uri: image.path }];
        });
      } catch (err) {
        console.log("Image pick cancelled:", err);
      }
    };

    const removeImage = (index) => {
      setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const submit = () => {
      if (images.length === 0) {
        setError("Please upload at least one picture.");
        return;
      }
      setError("");
      setState({ ...state, images });
      if (currentIndex < onboardingCount) {
        setCurrentIndex(currentIndex + 1);
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
            marginTop={12}
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
                  onPress={!img ? openGallery : () => removeImage(index)}
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
              error ? error : ".jpg; .png format only. 1:1 ratio preferrably."
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
