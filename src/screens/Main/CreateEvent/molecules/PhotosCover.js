import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import UploadImageCustom from "../../../../components/UploadImageCustom";
import ImageFast from "../../../../components/ImageFast";
import AddImgBtn from "./AddImgBtn";
import { PNGIcons } from "../../../../assets/images/icons";
import { uploadAndGetUrl } from "../../../../utils/constants";

const ratioToNumber = {
  "1:1": 1,
  "16:9": 16 / 9,
  "9:16": 9 / 16,
};

const ratioToCropSize = {
  "1:1": { width: 1000, height: 1000 },
  "16:9": { width: 1600, height: 900 },
  "9:16": { width: 900, height: 1600 },
};

const PhotosCover = ({ media, setMedia }) => {
  const [type, setType] = useState("1:1");
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const cameraRef = useRef(null);

  const aspectRatio = ratioToNumber[type];
  const cropSize = ratioToCropSize[type];

  const handleChange = async (result) => {
    if (!result?.path) return;

    try {
      setUploading(true);

      const uploadedUrl = await uploadAndGetUrl(result);
      setImages((prev) => {
        const newArr = [...prev, uploadedUrl];
        if (newArr.length === 1) setSelectedIndex(0);
        return newArr;
      });

      setMedia((prev) => [
        ...prev,
        {
          url: uploadedUrl,
          type: "image/jpeg",
          size: type,
        },
      ]);
    } finally {
      setUploading(false);
    }
  };

  const handleCapture = async () => {
    if (!cameraRef.current) return;

    try {
      setImgLoading(true);
      setUploading(true);

      const photo = await cameraRef.current.takePhoto({
        qualityPrioritization: "quality",
      });

      if (photo?.path) {
        const fileObj = {
          uri: photo.path,
          type: "image/jpeg",
          name: "camera_photo.jpg",
        };

        const uploadedUrl = await uploadAndGetUrl(fileObj);

        setImages((prev) => [...prev, uploadedUrl]);

        setMedia((prev) => [
          ...prev,
          {
            url: uploadedUrl,
            type: "image/jpeg",
            size: type,
          },
        ]);
      }
    } finally {
      setUploading(false);
      setImgLoading(false);
      setImageModal(false);
    }
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setMedia((prev) => prev.filter((_, i) => i !== index));

    if (index === selectedIndex) setSelectedIndex(0);
  };

  useEffect(() => {
    if (media.length > 0) {
      setMedia((prev) =>
        prev.map((item) => ({
          ...item,
          size: type,
        }))
      );
    }
  }, [type]);

  return (
    <View>
      <CustomText
        label="Photos Cover"
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        color={COLORS.white}
        marginBottom={8}
      />
      {uploading && <ActivityIndicator size="large" color={COLORS.white} />}
      {images.length > 0 && (
        <View style={[styles.previewContainer, { aspectRatio }]}>
          <ImageFast
            source={{ uri: images[selectedIndex] }}
            style={styles.coverImage}
            resizeMode="cover"
          />

          <TouchableOpacity
            style={styles.trashIconContainer}
            onPress={() => handleDelete(selectedIndex)}
          >
            <Image source={PNGIcons.trash} style={styles.trashIcon} />
          </TouchableOpacity>
        </View>
      )}
      {images.length > 0 && (
        <View style={styles.tabsRow}>
          {["1:1", "16:9", "9:16"].map((item) => {
            const isActive = item === type;
            return (
              <TouchableOpacity
                key={item}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => setType(item)}
              >
                <CustomText
                  label={`${item} ratio`}
                  fontSize={14}
                  fontFamily={fonts.medium}
                  color={isActive ? COLORS.white : COLORS.white3}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <View style={styles.thumbRow}>
        <AddImgBtn
          title={images.length ? "Add more" : "Add image"}
          onPress={() => setImageModal(true)}
        />

        {images.length > 0 && (
          <FlatList
            horizontal
            data={images}
            keyExtractor={(_, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => setSelectedIndex(index)}
                style={[
                  styles.thumbWrapper,
                  index === selectedIndex && styles.thumbWrapperSelected,
                ]}
              >
                <ImageFast source={{ uri: item }} style={styles.thumbnail} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <UploadImageCustom
        images={images}
        camera={cameraRef}
        onDelete={handleDelete}
        imageModal={imageModal}
        imgLoading={imgLoading}
        handleChange={handleChange}
        handleCapture={handleCapture}
        setImageModal={setImageModal}
        mediaType="photo"
        cropSize={cropSize}
      />
    </View>
  );
};

export default PhotosCover;

const styles = StyleSheet.create({
  previewContainer: {
    width: "100%",
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: "#1B1B1B",
    overflow: "hidden",
    marginBottom: 12,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },

  tabsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
    gap: 8,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    alignItems: "center",
  },
  tabActive: {
    backgroundColor: COLORS.cardColor,
    borderWidth: 0,
  },

  thumbnail: {
    width: 58,
    height: 58,
    borderRadius: 8,
  },
  thumbWrapper: {
    marginRight: 8,
    borderWidth: 1,
    borderColor: COLORS.black,
    padding: 3,
    borderRadius: 12,
  },
  thumbWrapperSelected: {
    borderColor: COLORS.white,
  },

  thumbRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContent: {
    paddingLeft: 12,
  },

  trashIconContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  trashIcon: {
    width: 36,
    height: 36,
  },
});
