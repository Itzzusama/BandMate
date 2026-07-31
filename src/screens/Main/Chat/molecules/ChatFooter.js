/* eslint-disable react-native/no-inline-styles */
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import UploadChatModal from "./UploadChatModal";
import { Images } from "../../../../assets/images";
import AudioRecorder from "./AudioRecorder";
import { uploadFileGetUrl, uploadAndGetUrl } from "../../../../utils/constants";
import UploadImageCustom from "../../../../components/UploadImageCustom";

const quickMessages = ["Have you arrived?", "I'm outside"];

const ChatFooter = ({
  inputText,
  setInputText,
  sendMessage,
  showChatFeatures = false,
  replyMessage,
  onClearReply,
  name,
  addLocalMessage,
  updateTempMessage,
}) => {
  const [recordingMode, setRecordingMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [images, setImages] = useState([]);
  const camera = useRef(null);

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));
  const [actionsOpen, setActionsOpen] = useState(false);
  const actionsAnim = useRef(new Animated.Value(0)).current; // 0 closed, 1 open
  const inputFlexAnim = useRef(new Animated.Value(1)).current; // input container flex
  const autoCloseRef = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const keyboardShowEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const keyboardHideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const keyboardShow = Keyboard.addListener(keyboardShowEvent, (event) => {
      setIsKeyboardVisible(true);
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });

    const keyboardHide = Keyboard.addListener(keyboardHideEvent, (event) => {
      setIsKeyboardVisible(false);
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, []);

  const pb = Platform.OS === "android" ? 20 : isKeyboardVisible ? 20 : 35;

  const scheduleAutoClose = () => {
    if (autoCloseRef.current) clearTimeout(autoCloseRef.current);
    autoCloseRef.current = setTimeout(() => {
      // close if still open and no interaction
      if (actionsOpen) {
        Animated.parallel([
          Animated.timing(actionsAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
          }),
          Animated.timing(inputFlexAnim, {
            toValue: 0.87,
            duration: 200,
            useNativeDriver: false,
          }),
        ]).start(() => setActionsOpen(false));
      }
    }, 4000);
  };

  const openActions = () => {
    setActionsOpen(true);
    Animated.parallel([
      Animated.timing(actionsAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(inputFlexAnim, {
        toValue: 0.65,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => {
      scheduleAutoClose();
    });
  };

  const closeActions = () => {
    if (autoCloseRef.current) {
      clearTimeout(autoCloseRef.current);
      autoCloseRef.current = null;
    }
    Animated.parallel([
      Animated.timing(actionsAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(inputFlexAnim, {
        toValue: 0.87,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(() => setActionsOpen(false));
  };

  const toggleActions = () => {
    if (actionsOpen) closeActions();
    else openActions();
  };

  const actionsOpacity = actionsAnim;
  const actionsScale = actionsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.9, 1],
  });
  const actionsTranslateY = actionsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [8, 0],
  });
  const actionsWidth = actionsAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 120],
  });
  const handleAudioSend = async (filePath, duration, size) => {
    try {
      const tempId = `temp_${Date.now()}`;
      const fileName = filePath.split("/").pop();

      const tempMessage = {
        clientId: tempId,
        content: "",
        senderId: { _id: "local" },
        createdAt: new Date().toISOString(),
        isPending: true,
        isSender: true,
        replyTo: replyMessage?.id,
        type: "voice",
        attachment: {
          filename: fileName,
          localUri: filePath,
          mimetype: "audio/m4a",
          size: size || 0,
        },
        duration,
      };

      addLocalMessage(tempMessage);

      const file = {
        localUri: filePath,
        name: fileName,
      };

      const res = await uploadFileGetUrl(file, "audio/m4a");

      if (res?.file) {
        const attachment = {
          filename: fileName,
          url: res.file,
          mimetype: "audio/m4a",
          size: size || 0,
        };

        sendMessage({
          type: "voice",
          attachment,
          content: "",
          duration,
          tempMessage,
        });
      } else {
        updateTempMessage(tempId, { isPending: false, sendFailed: true });
        Alert.alert("Upload Failed", "No URL returned from server");
      }
    } catch (err) {
      console.error("Upload error:", err);
      updateTempMessage(tempId, { isPending: false, sendFailed: true });
      Alert.alert("Error", "Failed to upload voice message");
    }
  };

  const uploadMediaAndSend = async (localPath, mime, type) => {
    try {
      const file = {
        localUri: localPath,
        name: localPath.split("/").pop(),
      };
      const img = {
        uri: localPath,
        type: "image/jpeg",
      };
      let res;

      if (type === "image") {
        res = await uploadAndGetUrl(img);
        console.log(res);
      } else {
        res = await uploadFileGetUrl(file, mime);
      }

      const attachment = {
        filename: file.name,
        url: type == "image" ? res : res.file,
        mimetype: mime,
        size: 0,
      };

      sendMessage({
        type: type == "image" ? type : "file",
        attachment,
        content: "",
      });
    } catch (err) {
      console.log("Upload error", err);
    }
  };

  const handleChange = async (result) => {
    const path = result.path || result.uri;
    const mime = result.mime || result.mimeType || "";

    const isVideo = mime.includes("video");

    const type = isVideo ? "video" : "image";

    setImages((prev) => [...prev, path]);
    setImageModal(false);

    const tempId = `temp_${Date.now()}`;
    const fileName = path.split("/").pop();
    const tempMessage = {
      clientId: tempId,
      content: "",
      senderId: { _id: "local" },
      createdAt: new Date().toISOString(),
      isPending: true,
      isSender: true,
      replyTo: replyMessage?.id,
      type: type === "image" ? "image" : "file",
      attachment: {
        filename: fileName,
        localUri: path,
        mimetype: mime,
        size: 0,
      },
    };

    addLocalMessage(tempMessage);

    try {
      const file = {
        localUri: path,
        name: fileName,
      };
      const img = {
        uri: path,
        type: "image/jpeg",
      };

      let res;
      if (type === "image") {
        res = await uploadAndGetUrl(img);
      } else {
        res = await uploadFileGetUrl(file, mime);
      }

      const url = type === "image" ? res : res.file;

      const attachment = {
        filename: fileName,
        url,
        mimetype: mime,
        size: 0,
      };

      sendMessage({
        type: type === "image" ? "image" : "file",
        attachment,
        content: "",
        tempMessage,
      });
    } catch (err) {
      console.log("Upload error", err);
      updateTempMessage(tempId, { isPending: false, sendFailed: true });
    }
  };

  const handleCapture = async () => {
    try {
      const photo = await camera.current.takePhoto({ flash: "off" });
      const path = "file://" + photo.path;

      setImages((prev) => [...prev, path]);
      setImageModal(false);

      await uploadMediaAndSend(path, "image/jpeg", "image");
    } catch (e) {
      console.log("capture error", e);
    }
  };

  const handleDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  return (
    <>
      {showChatFeatures && (
        <View>
          <View style={styles.row}>
            <View style={styles.typeBox}>
              <View style={styles.dot} />
              <CustomText
                fontSize={12}
                label={"Marcus typing"}
                lineHeight={12 * 1.4}
              />
            </View>
            <TouchableOpacity style={styles.arrowDown}>
              <Icons name={"arrow-down"} color={COLORS.white} size={20} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            data={quickMessages}
            contentContainerStyle={{ paddingLeft: 12 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.quickMsg}>
                <CustomText
                  label={item}
                  lineHeight={14 * 1.4}
                  fontFamily={fonts.medium}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {replyMessage && (
        <View style={[styles.replyContainer, { borderColor: COLORS.btnColor }]}>
          <View style={styles.replyContent}>
            <View style={styles.replyTextContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <Image
                  source={Images.Reply}
                  style={{ height: 16, width: 16 }}
                />

                <CustomText
                  label={`Replying to ${name}`}
                  fontFamily={fonts.medium}
                />
              </View>
              {replyMessage?.type == "voice" ? (
                <CustomText
                  label={formatTime(replyMessage?.attachment?.duration)}
                  fontSize={12}
                  color={COLORS.white}
                  marginTop={4}
                />
              ) : replyMessage?.type == "text" ? (
                <CustomText
                  label={`${replyMessage.content}`}
                  fontSize={12}
                  color={COLORS.white}
                  marginTop={4}
                />
              ) : (
                <CustomText
                  label={`${replyMessage.attachment?.filename}`}
                  fontSize={12}
                  color={COLORS.white}
                  marginTop={4}
                />
              )}
            </View>
            <TouchableOpacity onPress={onClearReply} style={styles.closeReply}>
              <Icons
                name={"x"}
                size={16}
                color={COLORS.white}
                family={"Feather"}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Animated.View
        style={[
          styles.mainContainer,
          {
            paddingBottom: pb,
            marginBottom:
              Platform.OS === "android" && Platform.Version < 35
                ? 0
                : keyboardHeight,
          },
        ]}
      >
        {recordingMode ? (
          <AudioRecorder
            onCancel={() => setRecordingMode(false)}
            onSend={(filePath, duration, size) => {
              setRecordingMode(false);
              handleAudioSend(filePath, duration, size);
            }}
          />
        ) : (
          <Animated.View
            style={[styles.inputContainer, { flex: inputFlexAnim }]}
          >
            {/* <TouchableOpacity
              onPress={toggleActions}
              onLongPress={() => setVisible(true)}
            >
              <Icons
                size={20}
                name={"plus"}
                family={"Entypo"}
                color={COLORS.white3}
              />
            </TouchableOpacity> */}
            <TextInput
              value={inputText}
              style={[styles.input]}
              placeholder="Type message"
              placeholderTextColor={COLORS.white3}
              onChangeText={(text) => {
                setInputText(text);
                if (actionsOpen) closeActions();
              }}
            />
            <TouchableOpacity
              onPress={() => setImageModal(true)}
              disabled={loading}
            >
              <Icons
                size={20}
                name={"camera"}
                family={"Feather"}
                color={COLORS.white3}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 15 }}
              onPress={() => setRecordingMode(true)}
            >
              <Icons
                size={18}
                name={"mic"}
                family={"Feather"}
                color={COLORS.white3}
              />
            </TouchableOpacity>
          </Animated.View>
        )}

        <Animated.View
          style={[
            styles.actionsContainer,
            {
              opacity: actionsOpacity,
              width: actionsWidth,
              transform: [
                { scale: actionsScale },
                { translateY: actionsTranslateY },
              ],
            },
          ]}
          pointerEvents={actionsOpen ? "auto" : "none"}
        >
          <TouchableOpacity style={styles.actionBtn} onPress={closeActions}>
            <Icons
              size={18}
              name={"calendar"}
              family={"Feather"}
              color={COLORS.white3}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={closeActions}>
            <Icons
              size={18}
              name={"music"}
              family={"Feather"}
              color={COLORS.white3}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={closeActions}>
            <Icons
              size={18}
              name={"gif"}
              family={"MaterialIcons"}
              color={COLORS.white3}
            />
          </TouchableOpacity>
        </Animated.View>
        {!recordingMode && (
          <TouchableOpacity
            onPress={sendMessage}
            style={styles.sendBtn}
            disabled={!inputText || inputText?.trim() === ""}
          >
            <Icons
              name={"arrow-right"}
              family={"Feather"}
              size={18}
              // color="#fff"
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      <UploadChatModal
        isVisible={visible}
        onDisable={() => setVisible(false)}
      />
      <UploadImageCustom
        images={images}
        camera={camera}
        onDelete={handleDelete}
        imageModal={imageModal}
        imgLoading={false}
        setImageModal={setImageModal}
        handleChange={handleChange}
        handleCapture={handleCapture}
        mediaType="any"
      />
    </>
  );
};

export default ChatFooter;

const styles = StyleSheet.create({
  mainContainer: {
    padding: 12,
    width: "100%",
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: COLORS.primaryColor,
    backgroundColor: COLORS.black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 25,
    marginRight: 8,
    backgroundColor: COLORS.inputBg,
    paddingLeft: 12,
    paddingRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
    color: COLORS.white,
    fontFamily: fonts.regular,
    justifyContent: "center",
    padding: 0,
  },

  sendBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#A19375",
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    marginRight: 8,
    overflow: "hidden",
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.inputBg,
  },
  dot: {
    backgroundColor: "#397050",
    width: 12,
    height: 12,
    borderRadius: 10,
  },
  typeBox: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: COLORS.inputBg,
    borderRadius: 30,
    height: 24,
    width: 120,
    justifyContent: "center",
    columnGap: 5,
  },
  arrowDown: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF1F",
    borderRadius: 50,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  quickMsg: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
    paddingHorizontal: 12,
    height: 32,
    marginTop: 10,
  },
  replyContainer: {
    backgroundColor: "rgba(161, 147, 117, 0.08)",
    borderColor: COLORS.btnColor,
    marginHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 8,
    marginBottom: -4,
  },
  replyContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  replyTextContainer: {
    flex: 1,
  },
  closeReply: {
    padding: 4,
  },
});
