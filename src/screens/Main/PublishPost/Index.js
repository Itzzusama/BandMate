import { BlurView } from "@react-native-community/blur";
import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../assets/fonts";
import { Images } from "../../../assets/images";
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
import ImageFast from "../../../components/ImageFast";
import ScreenWrapper from "../../../components/ScreenWrapper";
import UploadImageCustom from "../../../components/UploadImageCustom";
import { COLORS } from "../../../utils/COLORS";
import { uploadAndGetUrl } from "../../../utils/constants";
import { ToastMessage } from "../../../utils/ToastMessage";
import { useNavigation } from "@react-navigation/native";
import { post } from "../../../services/ApiRequest";
// Removed distance calculation util; location selection now only saves the address

/**
 * PublishPost Component
 *
 * A comprehensive form for creating and editing posts with full validation.
 *
 * Usage for Create Mode:
 *   <CreatePost />
 *
 * Usage for Edit Mode:
 *   navigation.navigate('PublishPost', {
 *     editMode: true,
 *     postData: {
 *       id: '123',
 *       description: 'Post description',
 *       imageRatio: '1:1 ratio',
 *       topic: { name: 'Technology', image: ... },
 *       ageRating: '+18',
 *       contentRating: 'Public',
 *       location: { address: '...', latitude: 0, longitude: 0 },
 *       collaborators: ['Name 1', 'Name 2'],
 *       sponsors: ['Sponsor 1'],
 *       startDate: '2025-07-01',
 *       startTime: '2025-07-01T10:00:00',
 *       endDate: '2025-07-01',
 *       endTime: '2025-07-01T18:00:00',
 *       availableTo: ['Public'],
 *       permissions: { canUpvote: true, canComment: true, ... },
 *       tosConfirmation: true
 *     }
 *   });
 *
 * API Payload Structure:
 * The form submits a structured payload ready for API consumption.
 * Check the onSubmit handler for the exact payload structure.
 */

// Validation function

const PublishPost = ({ route }) => {
  const navigation = useNavigation();
  // Check if we're in edit mode
  const editMode = route?.params?.editMode || false;
  const existingPost = route?.params?.postData || null;

  // Helper function to transform API data for edit mode
  const transformPostDataForEdit = (postData) => {
    if (!postData) return null;

    const transformed = { ...postData };

    // Transform age rating from number to "+XX" format
    if (typeof postData.ageRating === "number") {
      transformed.ageRating = `+${postData.ageRating}`;
    }

    // Transform availableTo from API format to display format
    if (
      Array.isArray(postData.availableTo) &&
      postData.availableTo.length > 0
    ) {
      transformed.availableTo = postData.availableTo.map((value) => {
        // Convert "premiumPlus" to "PremiumPlus", others capitalize first letter
        if (value === "premiumPlus") return "PremiumPlus";
        return value.charAt(0).toUpperCase() + value.slice(1);
      });
    }

    // Transform startDate from object to Date
    if (postData.startDate && typeof postData.startDate === "object") {
      const { date, time } = postData.startDate;
      if (date) {
        transformed.startDate = new Date(`${date}T${time || "00:00"}:00`);
        transformed.startTime = new Date(`${date}T${time || "00:00"}:00`);
      }
    }

    // Transform endDate from object to Date
    if (postData.endDate && typeof postData.endDate === "object") {
      const { date, time } = postData.endDate;
      if (date) {
        transformed.endDate = new Date(`${date}T${time || "00:00"}:00`);
        transformed.endTime = new Date(`${date}T${time || "00:00"}:00`);
      }
    }

    // Transform privacy back to permissions
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

    // Transform location if coordinates is an array
    if (postData.location && Array.isArray(postData.location.coordinates)) {
      transformed.location = {
        address: postData.location.address,
        latitude: postData.location.coordinates[1],
        longitude: postData.location.coordinates[0],
        city: postData.location.city || "",
        country: postData.location.country || "",
      };
    }

    return transformed;
  };

  const transformedPost = editMode
    ? transformPostDataForEdit(existingPost)
    : existingPost;

  const [HandleImageSelect, setHandleImageSelect] = useState(null);
  const [isAddStepModal, setIsAddStepModal] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [isAgeLimitModalVisible, setIsAgeLimitModalVisible] = useState(false);
  const [isContentRatingModalVisible, setIsContentRatingModalVisible] =
    useState(false);
  const [isAvailableToModalVisible, setIsAvailableToModalVisible] =
    useState(false);
  const [currentHashtag, setCurrentHashtag] = useState("");

  const [uploadedImages, setUploadedImages] = useState(
    transformedPost?.images || []
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageModal, setImageModal] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const camera = useRef(null);

  const topics = [
    { name: "Technology", image: Images.Topis1 },
    { name: "Politics", image: Images.Topis2 },
    { name: "Sports", image: Images.Topis3 },
    { name: "Music", image: Images.Topis4 },
    { name: "Entertainement", image: Images.Topis5 },
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

  // Permission fields array for rendering
  const permissionFields = [
    { key: "canUpvote", label: "CAN UPVOTE?" },
    { key: "canComment", label: "CAN COMMENT?" },
    { key: "canRepost", label: "CAN REPOST?" },
    { key: "canShare", label: "CAN SHARE" },
    { key: "canSave", label: "CAN SAVE?" },
  ];

  // Available To options for FilterModal
  const availableToOptions = [
    { name: "Public" },
    { name: "Private" },
    { name: "Premium" },
    { name: "PremiumPlus" },
  ];

  // Form state
  const [description, setDescription] = useState(
    transformedPost?.description || ""
  );
  const [size, setSize] = useState(transformedPost?.size || "1:1 ratio");
  const [images, setImages] = useState(uploadedImages);
  const [topic, setTopic] = useState(transformedPost?.topic || null);
  const [ageRating, setAgeRating] = useState(transformedPost?.ageRating || "");
  const [hashtags, setHashtags] = useState(transformedPost?.hashtags || []);
  const [contentRating, setContentRating] = useState(
    transformedPost?.contentRating || "Public"
  );
  const [location, setLocation] = useState(transformedPost?.location || null);
  const [collaborators, setCollaborators] = useState(
    transformedPost?.collaborators || ["David Beckham", "Jude Bellingham"]
  );
  const [sponsors, setSponsors] = useState(
    transformedPost?.sponsors || ["Adidas"]
  );
  const [startDate, setStartDate] = useState(
    transformedPost?.startDate || null
  );
  const [startTime, setStartTime] = useState(
    transformedPost?.startTime || null
  );
  const [endDate, setEndDate] = useState(transformedPost?.endDate || null);
  const [endTime, setEndTime] = useState(transformedPost?.endTime || null);
  const [availableTo, setAvailableTo] = useState(
    transformedPost?.availableTo || ["Public"]
  );
  const [permissions, setPermissions] = useState(
    transformedPost?.permissions || {
      canUpvote: false,
      canComment: false,
      canRepost: false,
      canShare: false,
      canSave: false,
    }
  );
  const [tosConfirmation, setTosConfirmation] = useState(
    transformedPost?.tosConfirmation ?? false
  );

  // Validation and submission states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (values) => {
    const errors = {};

    // Description
    if (!values.description || values.description.trim() === "") {
      errors.description = "Description is required";
    } else if (values.description.length > 250) {
      errors.description = "Description cannot exceed 250 characters";
    }

    // Size
    if (!values.size) {
      errors.size = "Image size is required";
    }

    // Images
    if (!values.images || values.images.length === 0) {
      errors.images = "At least one image is required";
    }

    // Topic
    if (!values.topic) {
      errors.topic = "Topic is required";
    }

    // Age Rating
    if (!values.ageRating) {
      errors.ageRating = "Age rating is required";
    }

    // Content Rating
    if (!values.contentRating) {
      errors.contentRating = "Content visibility is required";
    }

    // Location
    if (!values.location) {
      errors.location = "Location is required";
    } else if (
      !values.location.address ||
      !values.location.latitude ||
      !values.location.longitude
    ) {
      errors.location = "Complete location details are required";
    }

    // Available To
    if (!values.availableTo || values.availableTo.length === 0) {
      errors.availableTo = "At least one availability option is required";
    }

    // TOS Confirmation
    if (!values.tosConfirmation) {
      errors.tosConfirmation = "You must confirm the post is within TOS";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Validate form
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

      // Helper function to format date
      const formatDate = (date) => {
        if (!date) return null;
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // Returns YYYY-MM-DD
      };

      // Helper function to format time
      const formatTime = (time) => {
        if (!time) return null;
        const t = new Date(time);
        return `${String(t.getHours()).padStart(2, "0")}:${String(
          t.getMinutes()
        ).padStart(2, "0")}`; // Returns HH:MM
      };

      // Extract age rating number
      const ageRatingNumber = parseInt(ageRating.replace("+", ""));

      // Transform availableTo to lowercase/camelCase array
      const availableToArray = availableTo.map((item) => {
        // Convert "PremiumPlus" to "premiumPlus", others to lowercase
        if (item === "PremiumPlus") return "premiumPlus";
        return item.toLowerCase();
      });

      // Prepare API payload matching the required structure
      const payload = {
        description,
        images: uploadedImages,
        size,
        topic: topic?.name,
        ageRating: ageRatingNumber,
        mentions: ["68ff1b0014801b06673e2e69"], // Static mentions
        hashtags,
        location: {
          type: "Point",
          coordinates: [location?.longitude || 0, location?.latitude || 0],
          city: location?.city || "",
          country: location?.country || "",
          address: location?.address || "",
        },
        sponsoredBy: ["68ff1b0014801b06673e2e69"], // Static sponsors
        availableTo: availableToArray,
        privacy: {
          upvote: permissions.canUpvote,
          comment: permissions.canComment,
          repost: permissions.canRepost,
          share: permissions.canShare,
          save: permissions.canSave,
          TOS: tosConfirmation,
        },
      };

      // Add startDate and endDate only if they exist (optional)
      if (startDate && startTime) {
        payload.startDate = {
          date: formatDate(startDate),
          time: formatTime(startTime),
        };
      }

      if (endDate && endTime) {
        payload.endDate = {
          date: formatDate(endDate),
          time: formatTime(endTime),
        };
      }

      console.log("Final Payload:", JSON.stringify(payload, null, 2));

      // Make API call
      if (editMode && existingPost?.id) {
        // Edit mode - update existing post
        const response = await post(`posts/${existingPost.id}`, payload);
        console.log("Update Response:", response);

        if (response?.data?.success) {
          ToastMessage("Post updated successfully", "success");
          navigation.goBack();
        } else {
          const errorMessage =
            response?.data?.message ||
            response?.message ||
            "Failed to update post";
          console.error("Update failed:", response);
          ToastMessage(errorMessage, "error");
        }
      } else {
        // Create mode - create new post
        const response = await post("posts", payload);
        console.log("Create Response:", response);

        if (response?.data?.success) {
          ToastMessage("Post created successfully", "success");
          navigation.goBack();
        } else {
          const errorMessage =
            response?.data?.message ||
            response?.message ||
            "Failed to create post";
          console.error("Create failed:", response);
          ToastMessage(errorMessage, "error");
        }
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      console.error("Error details:", error.response?.data || error.message);
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
    // Save the selected location with all required fields
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
      // Remove # if user added it, we'll add it when displaying
      const tag = currentHashtag.trim().replace(/^#/, "");

      // Check if hashtag already exists
      if (!hashtags.includes(tag)) {
        setHashtags([...hashtags, tag]);
        setCurrentHashtag("");
      }
    }
  };

  const handleRemoveHashtag = (index) => {
    const updatedHashtags = hashtags.filter((_, i) => i !== index);
    setHashtags(updatedHashtags);
  };

  // Image upload handlers
  const handleImageChange = async (image) => {
    if (image?.path) {
      try {
        setImgLoading(true);

        // Upload image to server and get URL
        const imageUrl = await uploadAndGetUrl(image);

        if (imageUrl) {
          const newImages = [...uploadedImages, imageUrl];
          setUploadedImages(newImages);
          setImages(newImages); // Sync with form state
          setSelectedImageIndex(uploadedImages.length); // Select the newly added image
          ToastMessage("Image uploaded successfully", "success");
        } else {
          ToastMessage("Failed to upload image", "error");
        }

        setImgLoading(false);
        setImageModal(false);
      } catch (error) {
        console.log("Image upload error:", error);
        setImgLoading(false);
        ToastMessage("Failed to upload image", "error");
      }
    }
  };

  const handleCapture = async () => {
    if (!camera.current) return;

    try {
      setImgLoading(true);
      const photo = await camera.current.takePhoto({
        flash: "off",
        qualityPrioritization: "balanced",
      });

      if (photo?.path) {
        // Upload captured photo to server and get URL
        const photoFile = {
          path: `file://${photo.path}`,
          type: "image/jpeg",
          name: `photo_${Date.now()}.jpg`,
        };

        const imageUrl = await uploadAndGetUrl(photoFile);

        if (imageUrl) {
          const newImages = [...uploadedImages, imageUrl];
          setUploadedImages(newImages);
          setImages(newImages); // Sync with form state
          setSelectedImageIndex(uploadedImages.length);
          ToastMessage("Photo captured and uploaded successfully", "success");
          setImageModal(false);
        } else {
          ToastMessage("Failed to upload photo", "error");
        }
      }
      setImgLoading(false);
    } catch (error) {
      console.log("Capture error:", error);
      setImgLoading(false);
      ToastMessage("Failed to capture photo", "error");
    }
  };

  const handleDeleteImage = (index) => {
    if (index !== null && index !== undefined) {
      const updatedImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(updatedImages);
      setImages(updatedImages); // Sync with form state

      // Adjust selected index if needed
      if (selectedImageIndex >= updatedImages.length) {
        setSelectedImageIndex(Math.max(0, updatedImages.length - 1));
      }
      setImageModal(false);
    }
  };

  // Calculate aspect ratio based on selected size
  const getAspectRatioStyle = () => {
    const containerWidth = 358; // Approximate width based on padding
    let height;

    switch (size) {
      case "1:1 ratio":
        height = containerWidth; // Square
        break;
      case "4:5 ratio":
        height = (containerWidth * 5) / 4; // Portrait
        break;
      case "16:9 ratio":
        height = (containerWidth * 9) / 16; // Landscape
        break;
      default:
        height = containerWidth;
    }

    return { height };
  };

  // Validate form on mount if in edit mode
  // Log validation errors for debugging
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Form Validation Errors:", errors);
    }
  }, [errors]);

  return (
    <>
      <ScreenWrapper
        scrollEnabled
        headerUnScrollable={() => (
          <Header title={editMode ? "Edit Post" : "Publish A Post"} />
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
              color={COLORS.primaryColor}
              fontSize={16}
              fontFamily={fonts.medium}
              onPress={handleSubmit}
              loading={isSubmitting}
              disabled={isSubmitting}
            />

            <CustomButton
              title={"cancel"}
              color={COLORS.white}
              fontSize={16}
              backgroundColor={"#FFFFFF0A"}
              fontFamily={fonts.medium}
              onPress={() => {
                navigation.goBack();
              }}
            />
          </View>
        )}
      >
        {editMode && (
          <>
            <CustomText
              label={editMode ? "Edit Post" : "Create Post"}
              fontFamily={fonts.semiBold}
              fontSize={24}
            />
            <CustomText
              fontSize={fonts.regular}
              label={
                "Please fill all the details below for better referencing."
              }
              color={COLORS.white2}
              marginBottom={32}
            />
          </>
        )}

        <CustomInput
          multiline
          withLabel={"WHAT'S HAPPENING"}
          height={220}
          value={description}
          onChangeText={setDescription}
          placeholder="What's on your mind?"
          error={errors.description}
        />
        <ErrorComponent
          errorTitle={`${description.length}/250 characters.`}
          color={description.length > 250 ? "#EE1045" : COLORS.white2}
        />
        <Divider marginVertical={16} thickness={1} />
        {editMode && (
          <>
            <View style={styles.rowBetween}>
              {/* Left Section */}
              <View style={styles.rowflex}>
                <View style={styles.avatar} />
                <View style={styles.userInfo}>
                  <View style={styles.nameRow}>
                    <CustomText label={"Display Name"} />
                    <Image
                      source={Images.verified}
                      style={styles.verifiedIcon}
                    />
                  </View>
                  <CustomText
                    label={"username"}
                    color={"rgba(255, 255, 255, 0.64)"}
                  />
                </View>
              </View>

              <Image source={Images.moreIcon} style={styles.moreIcon} />
            </View>
            <View style={[styles.rowflex, { gap: 4, marginTop: 4 }]}>
              <Image
                source={Images.arrowNext}
                style={{ height: 20, width: 20 }}
              />
              <CustomText
                label={"In Partnership with"}
                color={"rgba(255, 255, 255, 0.64)"}
                fontSize={12}
              />
              <View style={styles.rowflex}>
                <View
                  style={{
                    height: 16,
                    width: 16,
                    backgroundColor: "#FFFFFF29",
                    borderRadius: 100,
                  }}
                />

                <CustomText
                  label={"Samsung Inc."}
                  fontFamily={fonts.medium}
                  marginLeft={4}
                />
              </View>
            </View>
          </>
        )}

        {uploadedImages.length > 0 && (
          <View style={styles.imageContainer}>
            <ImageFast
              source={
                uploadedImages[selectedImageIndex]
                  ? { uri: uploadedImages[selectedImageIndex] }
                  : Images.PostDemo
              }
              style={[styles.post, getAspectRatioStyle()]}
            />

            <TouchableOpacity
              style={styles.CrossIcon}
              onPress={() => handleDeleteImage(selectedImageIndex)}
            >
              <ImageFast
                resizeMode={"contain"}
                source={Images.delBlur}
                style={styles.icon}
              />
            </TouchableOpacity>

            {uploadedImages.length > 1 && (
              <View
                style={[
                  styles.rowSwipper,
                  { position: "absolute", bottom: 16, overflow: "hidden" },
                ]}
              >
                <BlurView
                  blurType="light"
                  style={StyleSheet.absoluteFill}
                  blurAmount={15}
                  reducedTransparencyFallbackColor="transparent"
                />
                {uploadedImages.map((_, idx) => (
                  <View
                    key={`indicator-${idx}`}
                    style={[
                      styles.indicator,
                      idx === selectedImageIndex
                        ? styles.activeIndicator
                        : styles.inactiveIndicator,
                    ]}
                  />
                ))}
              </View>
            )}
          </View>
        )}
        {uploadedImages?.length == 0 && (
          <ImageFast
            source={Images.PostSample}
            style={{ height: 350, width: "100%", borderRadius: 16 }}
            resizeMode={"contain"}
          />
        )}
        {/* {uploadedImages?.length > 0 && ( */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 16,
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
        {/* )} */}
        {errors.size && (
          <ErrorComponent errorTitle={errors.size} color="#EE1045" />
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
                  <>
                    <View style={styles.uploadingIndicator}>
                      <CustomText
                        label="Uploading..."
                        fontSize={8}
                        color={COLORS.primaryColor}
                        textAlign="center"
                      />
                    </View>
                  </>
                ) : (
                  <>
                    <Image
                      source={Images.camera1}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: "rgba(255, 255, 255, 0.64)",
                        alignSelf: "center",
                      }}
                    />
                    <CustomText
                      label="Add more"
                      fontSize={8}
                      color={"rgba(255, 255, 255, 0.64)"}
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
                            : "#1212120A",
                      },
                    ]}
                  >
                    <ImageFast
                      source={{ uri: item }}
                      style={{
                        height: 64,
                        width: 64,
                        borderRadius: 12,
                      }}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>

        {/* Image upload validation error */}
        {uploadedImages.length === 0 && errors.images && (
          <ErrorComponent
            errorTitle="At least one image is required"
            color="#EE1045"
            marginTop={8}
          />
        )}

        <Divider marginVertical={16}  color="rgba(255, 255, 255, 0.04)" />

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

        {/* Hashtag Input with Add Button */}
        <View style={styles.hashtagInputContainer}>
          <View style={styles.hashtagInput}>
            <CustomInput
              value={currentHashtag}
              onChangeText={setCurrentHashtag}
              placeholder="Add tag"
              onSubmitEditing={handleAddHashtag}
              withLabel={"Tags"}
              returnKeyType="Enter"
            />
          </View>
        </View>

        {/* Display Added Hashtags */}
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
          collabNames={collaborators}
          icColabe
          Isicon
          withLabel={"In COLLABORATION With"}
        />
        <ErrorComponent
          errorTitle={"Person working together on the same project or content."}
        />
        <CustomInputTextOnly
          collabNames={sponsors}
          icColabe
          marginTop={8}
          Isicon
          withLabel={"SPONSORED BY"}
        />
        <ErrorComponent
          errorTitle={
            "Organization supporting financially or with resources in exchange for promotion."
          }
        />
        <Divider marginVertical={16} color="rgba(255, 255, 255, 0.04)" />

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
            isIcon1
            width={"49%"}
          />
          <CustomDatePicker
            withLabel={"STARTING TIME"}
            value={startTime}
            setValue={(time) => setStartTime(time)}
            placeholder="Select Time"
            type="time"
            isIcon1
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
            isIcon1
            width={"49%"}
          />
          <CustomDatePicker
            withLabel={"ENDING TIME"}
            value={endTime}
            setValue={(time) => setEndTime(time)}
            placeholder="Select Time"
            type="time"
            isIcon1
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
            color="#EE1045"
            marginTop={4}
          />
        ) : null}
        <Divider marginVertical={16} />

        <CustomDropdown
          withLabel={"AVAILABLE TO"}
          placeholder={
            availableTo.length > 0 ? availableTo.join(", ") : "Select options"
          }
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
              />
            </View>
            <CustomSwitch
              value={permissions[field.key]}
              setValue={(value) =>
                setPermissions({ ...permissions, [field.key]: value })
              }
            />
          </View>
        ))}

        <Divider marginVertical={16} />

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
            color="#EE1045"
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
      </ScreenWrapper>

      {/* Image Upload Modal */}
      <UploadImageCustom
        images={uploadedImages}
        camera={camera}
        onDelete={handleDeleteImage}
        imageModal={imageModal}
        imgLoading={imgLoading}
        handleChange={handleImageChange}
        handleCapture={handleCapture}
        setImageModal={setImageModal}
      />
    </>
  );
};

export default PublishPost;

const styles = StyleSheet.create({
  imageContainer: {
    borderWidth: 2,
    borderColor: "#FFFFFF0A",
    borderRadius: 20,
    padding: 4,
    position: "relative",
    marginTop: 8,
  },

  itemCard: {},
  imagesRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    backgroundColor: COLORS.inputBg,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    height: 56,
  },
  post: {
    borderRadius: 16,
    width: "100%",
    resizeMode: "cover",
  },
  blurView: {
    height: 68,
    position: "absolute",
    top: 5,
    width: "100%",
    left: 5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    opacity: 0.8,
  },
  gradient: {
    height: 68,
    position: "absolute",
    top: 5,
    left: 5,
    width: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  addPic: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#FFFFFF0A",
    borderWidth: 1,
    marginRight: 5,
  },

  blurViewend: {
    height: 68,
    position: "absolute",
    width: "100%",
    bottom: 5,
    left: 5,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
    opacity: 0.8,
  },
  gradientend: {
    height: 68,
    position: "absolute",
    bottom: 5,
    width: "100%",
    left: 5,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },

  CrossIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    // borderWidth: 1,
    borderRadius: 100,
    height: 36,
    width: 36,
    justifyContent: "center",
    alignItems: "center",
  },

  blurViewIcon: {
    overflow: "hidden",
    borderRadius: 100,
  },
  icon: {
    width: 35,
    height: 35,
  },

  innerborder: {
    borderWidth: 1,
    borderColor: "#FFFFFF0A",
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
    backgroundColor: "#FFFFFF0A",
    height: 32,
    paddingHorizontal: 10,
  },

  selected: {
    backgroundColor: "#FFFF",
    paddingHorizontal: 10,
    height: 32,
  },

  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    height: 32,
    width: 32,
    borderRadius: 99,
    backgroundColor: COLORS.inputBg,
  },
  userInfo: {
    marginLeft: 8,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 14,
    width: 14,
    marginLeft: 4,
  },
  moreIcon: {
    height: 32,
    width: 32,
    marginLeft: 8,
  },
  wrapper: {
    gap: 4,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cardBg: {
    backgroundColor: COLORS.inputBg,
    padding: 10,
    borderRadius: 99,
  },
  rowSwipper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 8,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF29",
    padding: 4,
    borderRadius: 100,
  },
  rowButtons: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    gap: 6,
    paddingVertical: 4,
  },
  indicator: {
    height: 6,
    borderRadius: 100,
  },
  activeWidth: {
    width: 32,
    height: 8,
  },
  activeIndicator: {
    width: 32,
    backgroundColor: COLORS.white,
    height: 8,
  },
  inactiveIndicator: {
    width: 8,
    height: 8,
    backgroundColor: "#FFFFFF7A",
  },

  rowflex: {
    flexDirection: "row",
    alignItems: "center",
  },

  // Hashtag Styles
  hashtagInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hashtagInput: {
    flex: 1,
  },
  addHashtagButton: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
    height: 48,
    width: 48,
    marginBottom: 8,
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
    backgroundColor: "#A1937529",
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
});
