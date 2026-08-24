import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Video from "react-native-video";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
import Blur from "../../../components/Blur";
import FilterModal from "../../../components/CarFilterModal";
import CustomButton from "../../../components/CustomButton";
import CustomDatePicker from "../../../components/CustomDatePicker";
import CustomDropdown from "../../../components/CustomDropdown";
import CustomInput from "../../../components/CustomInput";
import CustomInputTextOnly from "../../../components/CustomInputTextOnly";
import CustomModalGooglePlaces from "../../../components/CustomModalGooglePlaces";
import CustomSwitch from "../../../components/CustomSwitch";
import CustomText from "../../../components/CustomText";
import Divider from "../../../components/Divider";
import ErrorComponent from "../../../components/ErrorComponent";
import Header from "../../../components/Header";
import Icons from "../../../components/Icons";
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImageCustom from "../../../components/UploadImageCustom";
import { post, put } from "../../../services/ApiRequest";
import { COLORS } from "../../../utils/COLORS";
import { uploadAndGetUrl, uploadFileGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import PeopleSelection from "./molecules/PeopleSelection";

const validateForm = (values) => {
  const errors = {};

  if (!values.description || values.description.trim() === "") {
    errors.description = "Description is required";
  } else if (values.description.length > 250) {
    errors.description = "Description cannot exceed 250 characters";
  }

  if (!values.size) {
    errors.size = "Image size is required";
  }

  if (!values.images || values.images.length === 0) {
    errors.images = "At least one image is required";
  }

  if (!values.topic) {
    errors.topic = "Topic is required";
  }

  if (!values.ageRating) {
    errors.ageRating = "Age rating is required";
  }

  if (!values.contentRating) {
    errors.contentRating = "Content visibility is required";
  }

  if (!values.location) {
    errors.location = "Location is required";
  } else if (
    !values.location.address ||
    !values.location.latitude ||
    !values.location.longitude
  ) {
    errors.location = "Complete location details are required";
  }

  if (!values.availableTo || values.availableTo.length === 0) {
    errors.availableTo = "At least one availability option is required";
  }

  if (!values.tosConfirmation) {
    errors.tosConfirmation = "You must confirm the post is within TOS";
  }

  return errors;
};

const topics = [
  { name: "Technology", image: Images.Topis1 },
  { name: "Politics", image: Images.Topis2 },
  { name: "Sports", image: Images.Topis3 },
  { name: "Music", image: Images.Topis4 },
  { name: "Entertainment", image: Images.Topis5 },
  { name: "Fashion", image: Images.Topis6 },
  { name: "Food", image: Images.Topis7 },
  { name: "Gaming", image: Images.Topis8 },
  { name: "Health", image: Images.Topis9 },
];

const ageLimt = [
  { name: "+14", subtitle: "14 years old or older" },
  { name: "+16", subtitle: "16 years old or older" },
  { name: "+18", subtitle: "18 years old or older" },
  { name: "+21", subtitle: "21 years old or older" },
];

const Rating = [
  { name: "Public" },
  { name: "Followers" },
  { name: "BFFs" },
  { name: "Private" },
];

const permissionFields = [
  { key: "canUpvote", label: "CAN VOTE?" },
  { key: "canComment", label: "CAN COMMENT?" },
  { key: "canRepost", label: "CAN REPOST?" },
  { key: "canShare", label: "CAN SHARE" },
  { key: "canSave", label: "CAN SAVE?" },
];

const availableToOptions = [
  { name: "Public" },
  { name: "Private" },
  { name: "Premium" },
  { name: "PremiumPlus" },
];

const CreatePost = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const detectMediaType = (url) => {
    if (
      typeof url === "string" &&
      url.match(/\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v)(\?.*)?$/i)
    ) {
      return "video";
    }
    return "image";
  };

  const editMode = route?.params?.editMode || false;
  const existingPost = route?.params?.postData || null;
  const parentPostId = route?.params?.parentPostId || null;

  const transformPostDataForEdit = (postData) => {
    if (!postData) return null;

    const transformed = { ...postData };

    if (typeof postData.ageRating === "number") {
      transformed.ageRating = `+${postData.ageRating}`;
    }

    if (
      Array.isArray(postData.availableTo) &&
      postData.availableTo.length > 0
    ) {
      transformed.availableTo = postData.availableTo.map((value) => {
        if (value === "premiumPlus") return "PremiumPlus";
        return value.charAt(0).toUpperCase() + value.slice(1);
      });
    }

    if (postData.startDate && typeof postData.startDate === "object") {
      const { date, time } = postData.startDate;
      transformed.startDate =
        date && date.trim() !== "" ? new Date(`${date}T00:00:00`) : null;
      transformed.startTime =
        time && time.trim() !== "" ? new Date(`2000-01-01T${time}:00`) : null;
    }

    if (postData.endDate && typeof postData.endDate === "object") {
      const { date, time } = postData.endDate;
      transformed.endDate =
        date && date.trim() !== "" ? new Date(`${date}T00:00:00`) : null;
      transformed.endTime =
        time && time.trim() !== "" ? new Date(`2000-01-01T${time}:00`) : null;
    }

    if (postData.privacy) {
      transformed.permissions = {
        canUpvote: postData.privacy.upvote ?? false,
        canComment: postData.privacy.comment ?? false,
        canRepost: postData.privacy.repost ?? false,
        canShare: postData.privacy.share ?? false,
        canSave: postData.privacy.save ?? false,
      };
      transformed.tosConfirmation = postData.privacy.TOS ?? false;
    }

    transformed.collaborators =
      postData.mentionBy || postData.mentions || postData.collaborators || [];
    transformed.sponsors = postData.sponsors || postData.sponsoredBy || [];

    if (typeof postData.topic === "string") {
      const foundTopic = topics.find((t) => t.name === postData.topic);
      if (foundTopic) {
        transformed.topic = foundTopic;
      }
    }

    if (postData.location && Array.isArray(postData.location.coordinates)) {
      transformed.location = {
        address: postData.location.address,
        latitude: postData.location.coordinates[1],
        longitude: postData.location.coordinates[0],
        city: postData.location.city || "",
        country: postData.location.country || "",
      };
    }

    if (Array.isArray(postData.description)) {
      transformed.description = postData.description[0] || "";
      if (postData.description.length > 1) {
        transformed.threads = postData.description.slice(1).map((desc) => ({
          description: desc,
          id: Math.random().toString(36).substr(2, 9),
        }));
      }
    }

    return transformed;
  };

  const transformedPost =
    editMode || parentPostId
      ? transformPostDataForEdit(existingPost)
      : existingPost;

  const [isAddStepModal, setIsAddStepModal] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAgeLimitModalVisible, setIsAgeLimitModalVisible] = useState(false);
  const [isContentRatingModalVisible, setIsContentRatingModalVisible] =
    useState(false);
  const [isAvailableToModalVisible, setIsAvailableToModalVisible] =
    useState(false);
  const [currentHashtag, setCurrentHashtag] = useState("");

  const [uploadedImages, setUploadedImages] = useState(
    transformedPost?.images || [],
  );
  const [uploadedMediaTypes, setUploadedMediaTypes] = useState(
    transformedPost?.images?.map(detectMediaType) || [],
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const camera = useRef(null);

  // Form state
  const [description, setDescription] = useState(
    transformedPost?.description || "",
  );
  const [threads, setThreads] = useState(transformedPost?.threads || []);
  const [size, setSize] = useState(transformedPost?.size || "1:1 ratio");
  const [images, setImages] = useState(uploadedImages);
  const [topic, setTopic] = useState(transformedPost?.topic || null);
  const [ageRating, setAgeRating] = useState(transformedPost?.ageRating || "");
  const [hashtags, setHashtags] = useState(transformedPost?.hashtags || []);
  const [contentRating, setContentRating] = useState(
    transformedPost?.contentRating || "Public",
  );
  const [location, setLocation] = useState(transformedPost?.location || null);
  const [collaborators, setCollaborators] = useState(
    transformedPost?.collaborators || [],
  );
  const [sponsors, setSponsors] = useState(transformedPost?.sponsors || []);
  const [startDate, setStartDate] = useState(
    transformedPost?.startDate || null,
  );
  const [startTime, setStartTime] = useState(
    transformedPost?.startTime || null,
  );
  const [endDate, setEndDate] = useState(transformedPost?.endDate || null);
  const [endTime, setEndTime] = useState(transformedPost?.endTime || null);
  const [availableTo, setAvailableTo] = useState(
    transformedPost?.availableTo || ["Public"],
  );
  const [permissions, setPermissions] = useState(
    transformedPost?.permissions || {
      canUpvote: true,
      canComment: true,
      canRepost: true,
      canShare: true,
      canSave: true,
    },
  );
  const [tosConfirmation, setTosConfirmation] = useState(
    transformedPost?.tosConfirmation ?? true,
  );
  const [makeItContinuous, setMakeItContinuous] = useState(
    transformedPost?.makeItContinuous ?? true,
  );

  const [mutedVideos, setMutedVideos] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // People Selection State
  const [selectionVisible, setSelectionVisible] = useState(false);
  const [selectionType, setSelectionType] = useState("collaborators");

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const formValues = {
        description,
        size,
        images: uploadedImages,
        topic,
        ageRating,
        hashtags,
        contentRating,
        location,
        availableTo,
        permissions,
        tosConfirmation,
      };

      const validationErrors = validateForm(formValues);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        console.log("Form Errors:", validationErrors);
        ToastMessage("Please fill all required fields", "error");
        return;
      }

      setErrors({});
      setIsSubmitting(true);

      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split("T")[0];
      };

      const formatTime = (time) => {
        if (!time) return null;
        const t = new Date(time);
        return `${String(t.getHours()).padStart(2, "0")}:${String(
          t.getMinutes(),
        ).padStart(2, "0")}`;
      };

      const ageRatingNumber = parseInt(ageRating?.replace("+", ""));

      const availableToArray = availableTo.map((item) => {
        if (item === "PremiumPlus") return "premiumPlus";
        return item.toLowerCase();
      });

      const descriptionArray = [description];
      threads.forEach((thread) => {
        if (thread.description && thread.description.trim() !== "") {
          descriptionArray.push(thread.description);
        }
      });

      const payload = {
        description: descriptionArray,
        images: uploadedImages,
        size,
        topic: topic?.name,
        ageRating: ageRatingNumber,
        mentions: collaborators.map((u) =>
          typeof u === "string" ? u : u?._id || u?.id,
        ),
        hashtags,
        location: {
          type: "Point",
          coordinates: [location?.longitude || 0, location?.latitude || 0],
          city: location?.city || "",
          country: location?.country || "",
          address: location?.address || "",
        },
        sponsoredBy: sponsors.map((u) =>
          typeof u === "string" ? u : u?._id || u?.id,
        ),
        availableTo: availableToArray,
        privacy: {
          upvote: permissions.canUpvote,
          comment: permissions.canComment,
          repost: permissions.canRepost,
          share: permissions.canShare,
          save: permissions.canSave,
          TOS: tosConfirmation,
        },
        makeItContinuous: makeItContinuous,
        ...(parentPostId && { parentPostId }),
      };

      if (startDate || startTime) {
        payload.startDate = {
          date: formatDate(startDate),
          time: formatTime(startTime),
        };
      }

      if (endDate || endTime) {
        payload.endDate = {
          date: formatDate(endDate),
          time: formatTime(endTime),
        };
      }

      if (editMode && (existingPost?._id || existingPost?.id)) {
        const response = await put(
          `posts/${existingPost._id || existingPost.id}`,
          payload,
        );

        if (response?.data?.success) {
          ToastMessage("Post updated successfully", "success");
          navigation.goBack();
        } else {
          const errorMessage =
            response?.data?.message ||
            response?.message ||
            "Failed to update post";
          ToastMessage(errorMessage, "error");
        }
      } else {
        const response = await post("posts", payload);

        if (response?.data?.success) {
          ToastMessage("Post created successfully", "success");
          navigation.goBack();
        } else {
          const errorMessage =
            response?.data?.message ||
            response?.message ||
            "Failed to create post";
          ToastMessage(errorMessage, "error");
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit post";
      ToastMessage(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLocationSelect = async (locationData) => {
    setLocation({
      address: locationData?.address,
      latitude: locationData?.latitude,
      longitude: locationData?.longitude,
      city: locationData?.city || "",
      country: locationData?.country || "",
    });
    setIsAddStepModal(false);
  };

  const handleAddHashtag = () => {
    if (currentHashtag.trim()) {
      if (hashtags.length >= 3) {
        ToastMessage(
          "You can only add up to 3 tags. Remove a tag to add a new one.",
          "error",
        );
        return;
      }

      const tag = currentHashtag.trim().replace("#", "");

      if (!hashtags.includes(tag)) {
        setHashtags([...hashtags, tag]);
      }
      setCurrentHashtag("");
    }
  };

  const handleRemoveHashtag = (index) => {
    const updatedHashtags = hashtags.filter((_, i) => i !== index);
    setHashtags(updatedHashtags);
  };

  // Thread handlers
  const handleAddThread = () => {
    setThreads([...threads, { id: Date.now(), description: "" }]);
  };

  const handleRemoveThread = (threadId) => {
    setThreads(threads.filter((thread) => thread.id !== threadId));
  };

  const handleThreadChange = (threadId, text) => {
    setThreads(
      threads.map((thread) =>
        thread.id === threadId ? { ...thread, description: text } : thread,
      ),
    );
  };

  // Image/Video upload handlers
  const handleImageChange = async (file) => {
    if (file?.path) {
      try {
        setImgLoading(true);

        const isVideo =
          file?.mime?.startsWith("video/") ||
          file?.type?.startsWith("video/") ||
          file?.path?.match(/\.(mp4|mov|avi|mkv|webm|flv|wmv|m4v)$/i);

        let mediaUrl;

        if (isVideo) {
          const videoType = file?.mime || file?.type || "video/mp4";
          const videoFile = {
            localUri: file?.path,
            name: file?.filename || file?.name || `video_${Date.now()}.mp4`,
            type: videoType,
          };

          const response = await uploadFileGetUrl(videoFile, videoType);
          mediaUrl = response?.file || response?.url;

          if (mediaUrl) {
            ToastMessage("Video uploaded successfully", "success");
          }
        } else {
          mediaUrl = await uploadAndGetUrl(file);

          if (mediaUrl) {
            ToastMessage("Image uploaded successfully", "success");
          }
        }

        if (mediaUrl) {
          const newImages = [...uploadedImages, mediaUrl];
          const newMediaTypes = [
            ...uploadedMediaTypes,
            isVideo ? "video" : "image",
          ];
          setUploadedImages(newImages);
          setUploadedMediaTypes(newMediaTypes);
          setImages(newImages);
          setSelectedImageIndex(uploadedImages.length);
        } else {
          ToastMessage(
            `Failed to upload ${isVideo ? "video" : "image"}`,
            "error",
          );
        }

        setImgLoading(false);
        setImageModal(false);
      } catch (error) {
        console.log("Media upload error:", error);
        setImgLoading(false);
        ToastMessage("Failed to upload media", "error");
      }
    }
  };

  const handleCapture = async (result) => {
    if (result) {
      await handleImageChange(result);
    }
  };

  const handleDeleteImage = (index) => {
    if (index !== null && index !== undefined) {
      const updatedImages = uploadedImages?.filter((_, i) => i !== index);
      const updatedMediaTypes = uploadedMediaTypes?.filter(
        (_, i) => i !== index,
      );
      setUploadedImages(updatedImages);
      setUploadedMediaTypes(updatedMediaTypes);
      setImages(updatedImages);

      if (selectedImageIndex >= updatedImages?.length) {
        setSelectedImageIndex(Math.max(0, updatedImages.length - 1));
      }
      setImageModal(false);
    }
  };

  const toggleMute = useCallback(() => {
    setMutedVideos((prev) => ({
      ...prev,
      [selectedImageIndex]: !prev[selectedImageIndex],
    }));
  }, [selectedImageIndex]);

  const isCurrentVideoMuted = () => {
    return mutedVideos[selectedImageIndex] || false;
  };

  const getAspectRatioStyle = () => {
    const containerWidth = Dimensions.get("window").width - 32;
    let height;

    switch (size) {
      case "1:1 ratio":
        height = containerWidth;
        break;
      case "4:5 ratio":
        height = (containerWidth * 5) / 4;
        break;
      case "16:9 ratio":
        height = (containerWidth * 9) / 16;
        break;
      default:
        height = containerWidth;
    }

    return { height };
  };

  // Real-time error clearing
  useEffect(() => {
    setErrors((prevErrors) => {
      const updated = { ...prevErrors };
      let changed = false;

      if (
        updated.description &&
        description.trim() !== "" &&
        description.length <= 250
      ) {
        delete updated.description;
        changed = true;
      }
      if (updated.size && size) {
        delete updated.size;
        changed = true;
      }
      if (updated.images && uploadedImages.length > 0) {
        delete updated.images;
        changed = true;
      }
      if (updated.topic && topic) {
        delete updated.topic;
        changed = true;
      }
      if (updated.ageRating && ageRating) {
        delete updated.ageRating;
        changed = true;
      }
      if (updated.contentRating && contentRating) {
        delete updated.contentRating;
        changed = true;
      }
      if (
        updated.location &&
        location?.address &&
        location?.latitude &&
        location?.longitude
      ) {
        delete updated.location;
        changed = true;
      }
      if (updated.availableTo && availableTo.length > 0) {
        delete updated.availableTo;
        changed = true;
      }
      if (updated.tosConfirmation && tosConfirmation) {
        delete updated.tosConfirmation;
        changed = true;
      }

      return changed ? updated : prevErrors;
    });
  }, [
    description,
    size,
    uploadedImages,
    topic,
    ageRating,
    contentRating,
    location,
    availableTo,
    tosConfirmation,
  ]);

  const screenWidth = Dimensions.get("window").width;
  const [scrollOffset, setScrollOffset] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    setScrollOffset(contentOffsetX);
    const index = Math.round(contentOffsetX / (screenWidth - 32));
    setCarouselIndex(index);
    setSelectedImageIndex(index);
  };

  const getBorderRadiusStyle = () => {
    return {
      borderRadius: 16,
    };
  };

  return (
    <ScreenWrapper
      headerUnScrollable={() => (
        <Header
          title={editMode ? "Edit Post" : "Publish A Post"}
          rightIcon={
            <Image source={Images.thread} style={{ height: 36, width: 36 }} />
          }
        />
      )}
      footerUnScrollable={() => (
        <View
          style={{
            paddingHorizontal: 12,
            marginBottom: 20,
            paddingTop: 6,
            gap: 8,
          }}
        >
          <CustomButton
            title={editMode ? "Update Post" : "Publish"}
            color={COLORS.black}
            backgroundColor={COLORS.white}
            fontSize={16}
            fontFamily={fonts.medium}
            onPress={handleSubmit}
            loading={isSubmitting || imgLoading}
            disabled={isSubmitting || imgLoading}
          />
        </View>
      )}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Main Thread Section */}
        <View style={styles.threadContainer}>
          <View style={threads.length > 0 ? styles.threadRow : null}>
            {threads.length > 0 && (
              <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <View style={styles.verticalLine} />
              </View>
            )}
            <View style={threads.length > 0 ? styles.threadContent : null}>
              <CustomInput
                multiline
                withLabel={"WHAT'S HAPPENING"}
                height={200}
                value={description}
                onChangeText={setDescription}
                placeholder="What's on your mind?"
                error={errors.description}
                publishPost
                enableMentionHighlight
              />

              <ErrorComponent
                errorTitle={`${description?.length}/250 characters.`}
                color={description?.length > 250 ? COLORS.red : COLORS.white2}
              />
            </View>
          </View>
        </View>

        {/* Additional Threads */}
        {threads.map((thread, index) => (
          <View key={thread.id} style={styles.threadContainer}>
            <View style={styles.threadRow}>
              <View style={styles.dotContainer}>
                <View style={styles.dot} />
                <View style={styles.verticalLine} />
              </View>
              <View style={styles.threadContent}>
                <CustomInput
                  multiline
                  withLabel={"WHAT'S HAPPENING"}
                  height={200}
                  value={thread.description}
                  onChangeText={(text) => handleThreadChange(thread.id, text)}
                  placeholder="What's on your mind?"
                  publishPost
                />
                <ErrorComponent
                  errorTitle={`${thread.description.length}/250 characters.`}
                  color={
                    thread.description.length > 250 ? COLORS.red : COLORS.white2
                  }
                />
                <TouchableOpacity
                  onPress={() => handleRemoveThread(thread.id)}
                  style={styles.removeThreadButton}
                >
                  <Image
                    source={Images.crossGray}
                    style={styles.removeThreadIcon}
                  />
                  <CustomText
                    label="Remove thread"
                    fontSize={12}
                    color={COLORS.white2}
                    marginLeft={4}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* Ending dot for the last thread */}
            {index === threads.length - 1 && (
              <View style={styles.threadRow}>
                <View style={styles.endDotContainer}>
                  <View style={styles.dot} />
                </View>
              </View>
            )}
          </View>
        ))}

        <CustomButton
          title={"Add a thread"}
          width={130}
          height={34}
          backgroundColor={COLORS.cardColor}
          color={COLORS.white}
          fontSize={12}
          icon={Images.threadPlus}
          alignSelf="flex-start"
          marginTop={16}
          onPress={handleAddThread}
        />

        <Divider marginVertical={16} thickness={1} color={COLORS.cardColor} />

        {uploadedImages?.length > 0 && (
          <View style={styles.imageContainer}>
            <ScrollView
              horizontal
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              decelerationRate="fast"
              snapToInterval={screenWidth - 32}
              snapToAlignment="center"
              disableIntervalMomentum={true}
              style={{ borderRadius: 16, overflow: "hidden" }}
            >
              {uploadedImages.map((imageUri, index) => (
                <View
                  key={index}
                  style={{
                    width: screenWidth - 32,
                    height: getAspectRatioStyle().height,
                  }}
                >
                  {uploadedMediaTypes[index] === "video" ? (
                    <Video
                      source={{ uri: imageUri }}
                      style={[
                        styles.post,
                        getAspectRatioStyle(),
                        getBorderRadiusStyle(),
                      ]}
                      controls={false}
                      paused={index !== carouselIndex}
                      repeat={true}
                      muted={mutedVideos[index] || false}
                    />
                  ) : (
                    <ImageFast
                      source={{ uri: imageUri }}
                      style={[
                        styles.post,
                        getAspectRatioStyle(),
                        getBorderRadiusStyle(),
                      ]}
                    />
                  )}
                </View>
              ))}
            </ScrollView>

            {uploadedMediaTypes[carouselIndex] === "video" && (
              <TouchableOpacity
                onPress={toggleMute}
                style={[styles.muteButton, { zIndex: 99 }]}
              >
                <Blur />
                <Icons
                  name={isCurrentVideoMuted() ? "volume-up" : "volume-off"}
                  family={"MaterialIcons"}
                  size={16}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.CrossIcon, { zIndex: 99 }]}
              onPress={() => handleDeleteImage(carouselIndex)}
            >
              <Blur />
              <ImageFast
                resizeMode={"contain"}
                source={Images.delImage}
                style={styles.icon}
              />
            </TouchableOpacity>

            {uploadedImages?.length > 1 && (
              <View
                style={[
                  styles.rowSwipper,
                  {
                    position: "absolute",
                    bottom: 16,
                    overflow: "hidden",
                    zIndex: 99,
                  },
                ]}
              >
                <Blur
                  blurType="light"
                  blurAmount={12}
                  borderRadius={8}
                  reducedTransparencyFallbackColor="transparent"
                />
                {uploadedImages?.map((_, idx) => (
                  <View
                    key={`indicator-${idx}`}
                    style={[
                      styles.indicator,
                      idx === carouselIndex
                        ? styles.activeIndicator
                        : styles.inactiveIndicator,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        )}

        {uploadedImages?.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 16,
            }}
          >
            {["1:1 ratio", "4:5 ratio", "16:9 ratio"].map((item, index) => {
              return (
                <TouchableOpacity
                  key={`ratio-${index}`}
                  onPress={() => setSize(item)}
                  style={[styles.ratio, size === item && styles.selected]}
                >
                  <CustomText
                    label={item}
                    fontSize={14}
                    fontFamily={fonts.medium}
                    color={size === item ? COLORS.black : COLORS.white}
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        {errors.size && (
          <ErrorComponent errorTitle={errors.size} color={COLORS.red} />
        )}

        {/* Image Upload Section */}
        <View style={styles.itemCard}>
          <View style={styles.imagesRow}>
            <TouchableOpacity
              style={[
                styles.addPic,
                {
                  width: 60,
                  height: 60,
                  marginTop: uploadedImages?.length === 0 ? 8 : 0,
                },
              ]}
              onPress={() => setImageModal(true)}
              disabled={imgLoading}
            >
              <View style={styles.innerborder}>
                {imgLoading ? (
                  <View style={styles.uploadingIndicator}>
                    <ActivityIndicator size="small" color={COLORS.btnColor} />
                  </View>
                ) : (
                  <>
                    <Image
                      source={Images.camera1}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: COLORS.white2,
                        alignSelf: "center",
                      }}
                    />
                    <CustomText
                      label="Add media"
                      fontSize={8}
                      color={COLORS.white2}
                      marginTop={4}
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>

            {uploadedImages?.length > 0 && (
              <FlatList
                data={uploadedImages}
                keyExtractor={(item, idx) => `uploaded-${idx}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    onPress={() => setSelectedImageIndex(index)}
                    style={[
                      {
                        marginRight: 6,
                        borderRadius: 12,
                        borderWidth: 2,
                        borderColor:
                          selectedImageIndex === index
                            ? COLORS.white
                            : COLORS.cardColor,
                      },
                    ]}
                  >
                    <ImageFast
                      source={{ uri: item }}
                      style={{
                        height: 60,
                        width: 60,
                        borderRadius: 10,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>

        {uploadedImages?.length === 0 && errors.images && (
          <ErrorComponent
            errorTitle="At least one image is required"
            color={COLORS.red}
            marginTop={8}
          />
        )}

        <View style={[styles.row, { marginTop: 16 }]}>
          <View style={{ width: "80%" }}>
            <CustomText
              fontSize={12}
              label={"MAKE IT CONTINUOUS"}
              fontFamily={fonts.medium}
              color={COLORS.white2}
            />
            <CustomText
              label={makeItContinuous ? "Yes" : "No"}
              fontSize={16}
              color={COLORS.white}
            />
          </View>
          <CustomSwitch
            value={makeItContinuous}
            setValue={setMakeItContinuous}
          />
        </View>
        <ErrorComponent
          errorTitle={"One single collage that links all media together."}
          marginTop={6}
        />
        <Divider marginVertical={18} color={COLORS.cardColor} thickness={1} />

        <CustomInputTextOnly
          onPress={() => setIsFilterModalVisible(true)}
          withLabel={"Topic"}
          placeholder={topic?.name || "Select Topic"}
          value={topic?.name}
          Isicon
          error={errors.topic}
        />
        <CustomInputTextOnly
          onPress={() => setIsAgeLimitModalVisible(true)}
          withLabel={"AGE RATING"}
          placeholder="Select Age Rating"
          value={ageRating}
          Isicon
          error={errors.ageRating}
        />

        {/* Hashtags Section */}
        <View style={styles.hashtagInputContainer}>
          <View style={styles.hashtagInput}>
            <CustomInput
              value={currentHashtag}
              onChangeText={setCurrentHashtag}
              placeholder="Add hashtag"
              onSubmitEditing={handleAddHashtag}
              withLabel={"Hashtags"}
              returnKeyType="Enter"
            />
          </View>
        </View>

        {hashtags.length > 0 && (
          <View style={styles.hashtagsContainer}>
            {hashtags.map((tag, index) => (
              <View key={`hashtag-${index}`} style={styles.hashtagChip}>
                <CustomText
                  label={`#${tag}`}
                  color={COLORS.white}
                  fontSize={14}
                  fontFamily={fonts.medium}
                />
                <TouchableOpacity
                  onPress={() => handleRemoveHashtag(index)}
                  style={styles.removeHashtagButton}
                >
                  <Image source={Images.crossGray} style={styles.closeIcon} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <CustomInputTextOnly
          onPress={() => setIsAddStepModal(true)}
          withLabel={"Location"}
          placeholder="Select Location"
          Isicon
          value={location?.address || ""}
          islocation
          iconSrc={Images.LocationArrow}
          error={errors.location}
        />

        <CustomInputTextOnly
          collabNames={collaborators.map((u) => u.firstName || u.username || u)}
          placeholder={"Click to select the Collaborators"}
          icColabe
          Isicon
          withLabel={"In COLLABORATION With"}
          onPress={() => {
            setSelectionType("collaborators");
            setSelectionVisible(true);
          }}
        />
        <ErrorComponent
          errorTitle={"Person working together on the same project or content."}
        />
        <CustomInputTextOnly
          collabNames={sponsors.map((u) => u.firstName || u.username || u)}
          icColabe
          placeholder={"Click to select the Sponsors"}
          marginTop={8}
          Isicon
          withLabel={"SPONSORED BY"}
          onPress={() => {
            setSelectionType("sponsors");
            setSelectionVisible(true);
          }}
        />
        <ErrorComponent
          errorTitle={
            "Organization supporting financially or with resources in exchange for promotion."
          }
        />
        <Divider marginVertical={16} color={COLORS.cardColor} thickness={1} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <CustomDatePicker
            withLabel={"STARTING ON"}
            value={startDate}
            setValue={(date) => setStartDate(date)}
            placeholder="Select Date"
            type="date"
            isIcon={true}
            width={"49%"}
          />
          <CustomDatePicker
            withLabel={"STARTING TIME"}
            value={startTime}
            setValue={(time) => setStartTime(time)}
            placeholder="Select Time"
            type="time"
            isIcon={true}
            width={"49%"}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <CustomDatePicker
            withLabel={"ENDING ON"}
            value={endDate}
            setValue={(date) => setEndDate(date)}
            placeholder="Select Date"
            type="date"
            isIcon={true}
            width={"49%"}
            minDate={startDate}
          />
          <CustomDatePicker
            withLabel={"ENDING TIME"}
            value={endTime}
            setValue={(time) => setEndTime(time)}
            placeholder="Select Time"
            type="time"
            isIcon={true}
            width={"49%"}
          />
        </View>

        <ErrorComponent
          marginTop={8}
          errorTitle={"Date & time according to your location."}
        />
        {errors.startDate || errors.endDate ? (
          <ErrorComponent
            errorTitle={errors.startDate || errors.endDate}
            color={COLORS.red}
            marginTop={4}
          />
        ) : null}
        <Divider marginVertical={16} thickness={1} color={COLORS.cardColor} />

        <CustomDropdown
          withLabel={"AVAILABLE TO"}
          placeholder={
            availableTo.length > 0 ? availableTo.join(", ") : "Select options"
          }
          value={availableTo.length > 0 && availableTo.join(", ")}
          marginBottom={8}
          onPress={() => setIsAvailableToModalVisible(true)}
        />
        {errors.availableTo && <ErrorComponent error={errors.availableTo} />}

        {permissionFields.map((field, idx) => (
          <View
            style={[styles.row, idx > 0 && { marginTop: 8 }]}
            key={field.key}
          >
            <View style={{ width: "80%" }}>
              <CustomText
                fontSize={12}
                label={field.label}
                lineHeight={16 * 1.4}
                fontFamily={fonts.medium}
                color={COLORS.white2}
              />
              <CustomText
                label={permissions[field.key] ? "Yes" : "No"}
                fontSize={16}
                lineHeight={12 * 1.4}
                color={COLORS.white}
              />
            </View>
            <CustomSwitch
              value={permissions[field.key]}
              setValue={(value) =>
                setPermissions((prev) => ({ ...prev, [field.key]: value }))
              }
            />
          </View>
        ))}

        <Divider marginVertical={16} thickness={1} color={COLORS.cardColor} />

        <View style={[styles.row, { marginBottom: 40 }]}>
          <View style={{ width: "80%" }}>
            <CustomText
              fontSize={12}
              label={"I HEREBY CONFIRM THE POST IS WITHIN TOS"}
              fontFamily={fonts.medium}
              color={COLORS.white2}
            />
            <CustomText
              label={tosConfirmation ? "Yes" : "No"}
              fontSize={16}
              color={COLORS.white}
            />
          </View>
          <CustomSwitch value={tosConfirmation} setValue={setTosConfirmation} />
        </View>
        {errors.tosConfirmation && (
          <ErrorComponent
            errorTitle={errors.tosConfirmation}
            color={COLORS.red}
            marginBottom={16}
          />
        )}

        <CustomModalGooglePlaces
          isVisible={isAddStepModal}
          onClose={() => setIsAddStepModal(false)}
          onLocationSelect={handleLocationSelect}
        />
        <FilterModal
          isVisible={isFilterModalVisible}
          onDisable={() => setIsFilterModalVisible(false)}
          title="Select A Topic"
          subtitle="Select your filters"
          filters={topics}
          onItemPress={(item) => {
            setTopic(item);
            setIsFilterModalVisible(false);
          }}
        />
        <FilterModal
          isVisible={isAgeLimitModalVisible}
          onDisable={() => setIsAgeLimitModalVisible(false)}
          title="Select Age Limit"
          subtitle="Choose age restriction"
          filters={ageLimt}
          onItemPress={(item) => {
            const age = item?.name ?? item;
            setAgeRating(age);
            setIsAgeLimitModalVisible(false);
          }}
        />

        <FilterModal
          isVisible={isContentRatingModalVisible}
          onDisable={() => setIsContentRatingModalVisible(false)}
          title="Select Visibility"
          subtitle="Who can view this post"
          filters={Rating}
          onItemPress={(item) => {
            const rating = item?.name ?? item;
            setContentRating(rating);
            setIsContentRatingModalVisible(false);
          }}
        />
        <FilterModal
          isVisible={isAvailableToModalVisible}
          onDisable={() => setIsAvailableToModalVisible(false)}
          title="Available To"
          subtitle="Select who can access"
          filters={availableToOptions}
          multiSelect={true}
          selectedItems={availableTo}
          onConfirm={(selectedItems) => {
            setAvailableTo(selectedItems);
          }}
        />

        <PeopleSelection
          isVisible={selectionVisible}
          onClose={() => setSelectionVisible(false)}
          selectionType={selectionType}
          initialSelected={
            selectionType === "collaborators" ? collaborators : sponsors
          }
          onConfirm={(selectedUsers) => {
            if (selectionType === "collaborators") {
              setCollaborators(selectedUsers);
            } else {
              setSponsors(selectedUsers);
            }
          }}
        />

        {/* Image/Video Upload Modal */}
        <UploadImageCustom
          images={uploadedImages}
          camera={camera}
          onDelete={handleDeleteImage}
          imageModal={imageModal}
          imgLoading={imgLoading}
          handleChange={handleImageChange}
          handleCapture={handleCapture}
          setImageModal={setImageModal}
          mediaType="any"
        />
      </ScrollView>
    </ScreenWrapper>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 1,
    borderColor: COLORS.white4,
    borderRadius: 20,
    padding: 2,
    position: "relative",
    marginTop: 8,
    overflow: "hidden",
  },
  imagesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: COLORS.cardColor,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 12,
  },
  post: {
    borderRadius: 16,
    width: "100%",
    resizeMode: "cover",
    overflow: "hidden",
  },
  addPic: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.cardColor,
    borderWidth: 1,
    marginRight: 8,
  },
  CrossIcon: {
    position: "absolute",
    overflow: "hidden",
    top: 16,
    right: 16,
    borderRadius: 100,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  muteButton: {
    position: "absolute",
    bottom: 16,
    left: 16,
    paddingHorizontal: 10,
    height: 32,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.cardColor,
    borderRadius: 99,
    overflow: "hidden",
    zIndex: 100,
  },
  icon: {
    width: 20,
    height: 20,
  },
  innerborder: {
    borderWidth: 1,
    borderColor: COLORS.white4,
    borderRadius: 12,
    borderStyle: "dashed",
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  ratio: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: COLORS.cardColor,
    height: 32,
    paddingHorizontal: 10,
  },
  selected: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    height: 32,
  },
  rowSwipper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 8,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.white4,
    padding: 4,
    borderRadius: 100,
    overflow: "hidden",
  },
  indicator: {
    height: 6,
    borderRadius: 100,
  },
  activeIndicator: {
    width: 32,
    backgroundColor: COLORS.white,
    height: 8,
  },
  inactiveIndicator: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.white3,
  },
  hashtagInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hashtagInput: {
    flex: 1,
  },
  hashtagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  hashtagChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.btnSoftColor,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  removeHashtagButton: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 12,
    height: 12,
    tintColor: COLORS.white,
  },
  uploadingIndicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  threadContainer: {
    marginBottom: 0,
  },
  threadRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  dotContainer: {
    alignItems: "center",
    marginRight: 12,
    paddingTop: 0,
    width: 16,
  },
  endDotContainer: {
    alignItems: "center",
    marginRight: 12,
    paddingTop: 0,
    marginTop: -2,
    width: 16,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.white4,
    zIndex: 1,
  },
  verticalLine: {
    width: 2,
    backgroundColor: COLORS.white4,
    flex: 1,
    marginTop: -8,
    marginBottom: -8,
    zIndex: 0,
    minHeight: 220,
  },
  threadContent: {
    flex: 1,
    paddingBottom: 16,
  },
  removeThreadButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 4,
  },
  removeThreadIcon: {
    width: 16,
    height: 16,
    tintColor: COLORS.white2,
  },
});
