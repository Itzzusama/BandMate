import { useNavigation } from "@react-navigation/native";
import { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import AuthFooter from "../../../components/Auth/AuthFooter";
import AuthSlider from "../../../components/Auth/AuthSlider";
import CustomText from "../../../components/CustomText";
import Header from "../../../components/Header";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImageCustom from "../../../components/UploadImageCustom";
import { post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { uploadAndGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";

const Dot = ({ style, onPress }) => (
  <TouchableOpacity onPress={onPress} style={[styles.dot, style]} />
);

const UploadVehicle = ({ route }) => {
  const body = route.params?.body;

  const camera = useRef(null);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [activeDot, setActiveDot] = useState(null);
  const [thumbImages, setThumbImages] = useState(body?.vehicleImages || []);
  const [imageModal, setImageModal] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [dotImages, setDotImages] = useState({
    top: body?.vehicleImages[0] || null,
    left: body?.vehicleImages[1] || null,
    right: body?.vehicleImages[2] || null,
    bottom: body?.vehicleImages[3] || null,
    leftMid: body?.vehicleImages[4] || null,
    rightMid: body?.vehicleImages[5] || null,
    bottomLeft: body?.vehicleImages[6] || null,
    bottomRight: body?.vehicleImages[7] || null,
  });

  const handleImages = (dotKey, url) => {
    setThumbImages((prev) => {
      const prevUrl = dotImages[dotKey];
      let updated = [...prev];
      if (prevUrl) {
        updated = updated.filter((img) => img !== prevUrl);
      }
      return [...updated, url];
    });

    setDotImages((prev) => ({
      ...prev,
      [dotKey]: url,
    }));
  };

  const handleDelete = (index) => {
    setThumbImages((prev) => {
      const imgToRemove = prev[index];
      const updated = prev.filter((_, i) => i !== index);

      setDotImages((prevDots) => {
        const updatedDots = { ...prevDots };
        Object.keys(updatedDots).forEach((key) => {
          if (updatedDots[key] === imgToRemove) {
            updatedDots[key] = null;
          }
        });
        return updatedDots;
      });

      return updated;
    });
  };

  const handleCapture = async () => {
    try {
      if (!camera?.current) {
        return ToastMessage("Something failed while capturing!", "error");
      }
      const photo = await camera?.current?.takePhoto({ flash: "off" });

      let filePath = photo?.path;
      if (!filePath?.startsWith("file://")) {
        filePath = `file://${filePath}`;
      }

      setImgLoading(true);
      const url = await uploadAndGetUrl({ path: filePath });
      if (url) {
        handleImages(activeDot, url);
      }
      setImgLoading(false);
      setImageModal(false);
    } catch (error) {
      console.log(error, "in vehicle capture");
    }
  };

  const createVehicle = async () => {
    setLoading(true);

    const mergedImages = [
      ...(Array.isArray(body?.vehicleImages) ? body.vehicleImages : []),
      ...(Array.isArray(thumbImages) ? thumbImages : []),
    ];
    const filteredImages = Array.from(
      new Set(
        mergedImages
          ?.filter((img) => typeof img === "string")
          ?.map((img) => img?.trim())
          ?.filter((img) => img && img.length > 0)
      )
    );

    if (filteredImages?.length === 0) {
      ToastMessage("Please upload at least one image", "error");
      setLoading(false);
      return;
    }
    const finalBody = {
      ...body,
      vehicleImages: filteredImages,
    };

    try {
      const response = body?.isEdit
        ? await put(`vehicles/${body?._id}`, finalBody)
        : await post("vehicles", finalBody);
      console.log(
        `Vehicle ${body?._id ? "updated" : "created"} successfully:======`,
        response.data
      );
      if (response.data.success) {
        setLoading(false);
        ToastMessage(
          `Vehicle ${body?._id ? "updated" : "created"} successfully`,
          "success"
        );
        navigation.reset({
          index: 0,
          routes: [{ name: "TabStack", params: { screen: "Dashboard" } }],
        });
      }
    } catch (error) {
      console.error("Error creating vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderUploadDot = (key, positionStyle) => (
    <Dot
      style={[positionStyle, dotImages[key] ? styles.dotGreen : null]}
      onPress={() => {
        setActiveDot(key);
        setImageModal(true);
      }}
    />
  );

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title={"Upload Images"} />}
      footerUnScrollable={() => (
        <View style={{ paddingHorizontal: 12 }}>
          <AuthFooter
            isMain
            onPress={createVehicle}
            btnLoading={loading}
            btnDisabled={imgLoading}
            btnTitle={imgLoading ? "Uploading Image" : "Create Vehicle"}
          />
        </View>
      )}
    >
      <AuthSlider min={2} max={3} marginTop={1} marginBottom={18} />

      <CustomText
        label={"Take pictures of your vehicle"}
        lineHeight={24 * 1.4}
        fontSize={24}
        fontFamily={fonts.semiBold}
      />
      <CustomText
        label={
          "This will help us examine the car and prevent any issues with later sales."
        }
        lineHeight={14 * 1.4}
        fontSize={14}
        color={COLORS.gray1}
      />

      <View style={styles.imageWrapper}>
        <ImageFast
          source={Images.carUpload}
          style={styles.carUpload}
          resizeMode="contain"
        />

        {renderUploadDot("top", styles.topDot)}
        {renderUploadDot("bottom", styles.bottomDot)}
        {renderUploadDot("left", styles.leftDot)}
        {renderUploadDot("right", styles.rightDot)}
        {renderUploadDot("leftMid", styles.leftMidDot)}
        {renderUploadDot("rightMid", styles.rightMidDot)}
        {renderUploadDot("bottomLeft", styles.bottomLeftDot)}
        {renderUploadDot("bottomRight", styles.bottomRightDot)}
      </View>

      <UploadImageCustom
        camera={camera}
        images={thumbImages}
        imageModal={imageModal}
        onDelete={handleDelete}
        imgLoading={imgLoading}
        handleCapture={handleCapture}
        setImageModal={setImageModal}
        handleChange={async (e) => {
          setImgLoading(true);
          const url = await uploadAndGetUrl(e);
          if (url) {
            handleImages(activeDot, url);
          }
          setImgLoading(false);
        }}
      />
    </ScreenWrapper>
  );
};

export default UploadVehicle;

const styles = StyleSheet.create({
  imageWrapper: {
    marginTop: 100,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  carUpload: {
    height: 335,
    width: 187,
  },
  dot: {
    width: 24,
    height: 24,
    backgroundColor: "#EBEBEB",
    borderRadius: 8,
    position: "absolute",
  },
  dotGreen: {
    backgroundColor: COLORS.green,
  },
  topDot: {
    bottom: 370,
    left: "50%",
    transform: [{ translateX: -12 }],
  },
  bottomDot: {
    bottom: -50,
    left: "50%",
    transform: [{ translateX: -12 }],
  },
  leftDot: {
    left: 20,
    bottom: 300,
    transform: [{ translateY: -12 }],
  },
  rightDot: {
    right: 20,
    bottom: 300,
    transform: [{ translateY: -12 }],
  },
  leftMidDot: {
    left: 20,
    bottom: 140,
    transform: [{ translateY: -12 }],
  },
  rightMidDot: {
    right: 20,
    bottom: 140,
    transform: [{ translateY: -12 }],
  },
  bottomLeftDot: {
    bottom: 10,
    left: 20,
    transform: [{ translateY: -12 }],
  },
  bottomRightDot: {
    bottom: 10,
    right: 20,
    transform: [{ translateY: -12 }],
  },
});
