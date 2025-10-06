import {
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import FriendCard from "./FriendCard";
import { del } from "../../../../services/ApiRequest";
import { ToastMessage } from "../../../../utils/ToastMessage";
import { useState } from "react";

const DellFriendModal = ({
  isVisible,
  setModal,
  title,
  desc,
  buttonTitle,
  onPress,
  source,
  onClose,
  item,
  onDeleted,
}) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!item?._id) {
      ToastMessage("Missing friend id", "error");
      return;
    }
    try {
      setLoading(true);
      const res = await del(`friends/${item?._id}`);
      if (res?.data?.success || res?.status === 200) {
        ToastMessage("Friend removed", "success");
        onClose && onClose();
        onDeleted && onDeleted(item);
      } else {
        ToastMessage(res?.data?.message || "Failed to remove friend", "error");
      }
    } catch (e) {
      ToastMessage("Failed to remove friend", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomModal isVisible={isVisible} onDisable={onClose}>
      <View
        style={{
          padding: 5,
          width: "95%",
          alignSelf: "center",
          borderRadius: 24,
          maxHeight: "100%",
          borderWidth: 1,
          backgroundColor: "#FFFFFF29",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          style={{
            maxHeight: "100%",
            width: "100%",
            borderRadius: 24,
          }}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />

        <View style={styles.mainContainer}>
          <ImageFast
            source={source || Images.binRed}
            style={styles.img}
            resizeMode="contain"
          />
          <CustomText
            label={title || "Remove This Friend"}
            fontFamily={fonts.medium}
            fontSize={20}
            lineHeight={20 * 1.4}
            textAlign="center"
          />
          <CustomText
            label={desc || "Are you sure you want to remove this friend?"}
            fontSize={14}
            lineHeight={14 * 1.4}
            textAlign="center"
            marginBottom={16}
          />
          <FriendCard
            name={
              `${item?.first_name} ${item?.sur_name}` || item?.email || "Friend"
            }
            email={item?.email}
            phone={item?.phone}
            imageUri={item?.avatarUrl || item?.image}
          />

          <CustomButton
            title={
              loading ? "Removing..." : buttonTitle || "Yes, Remove Friend"
            }
            marginBottom={8}
            onPress={handleDelete}
            marginTop={24}
            disabled={loading}
          />
          <CustomButton
            title={buttonTitle || "Cancel"}
            color={COLORS.primaryColor}
            backgroundColor={COLORS.lightGray}
            onPress={onClose}
          />
        </View>
      </View>
    </CustomModal>
  );
};

export default DellFriendModal;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    alignSelf: "center",
  },
  img: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
});
