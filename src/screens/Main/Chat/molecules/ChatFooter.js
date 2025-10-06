/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState } from "react";
import {
  Animated,
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../../../utils/COLORS";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import UploadChatModal from "./UploadChatModal";

const quickMessages = ["Have you arrived?", "I’m outside"];

const ChatFooter = ({
  inputText,
  setInputText,
  sendMessage,
  showChatFeatures = true,
}) => {
  const [visible, setVisible] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(new Animated.Value(0));

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
              <Icons name={"arrow-down"} size={20} />
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
        <View style={[styles.inputContainer]}>
          <TouchableOpacity onPress={() => setVisible(true)}>
            <Icons
              size={20}
              name={"plus"}
              family={"Entypo"}
              color={COLORS.subtitle}
            />
          </TouchableOpacity>
          <TextInput
            value={inputText}
            style={[styles.input]}
            placeholder="Type message"
            placeholderTextColor={COLORS.gray5}
            onChangeText={(text) => setInputText(text)}
          />
          <TouchableOpacity>
            <Icons
              size={20}
              name={"camera"}
              family={"Feather"}
              color={COLORS.subtitle}
            />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Icons
              size={18}
              name={"mic"}
              family={"Feather"}
              color={COLORS.subtitle}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={sendMessage}
          style={styles.sendBtn}
          disabled={!inputText || inputText?.trim() === ""}
        >
          <Icons
            name={"arrow-right"}
            family={"Feather"}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
      <UploadChatModal
        isVisible={visible}
        onDisable={() => setVisible(false)}
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
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    width: "87%",
    borderRadius: 25,
    marginRight: 8,
    backgroundColor: COLORS.lightGray,
    paddingLeft: 12,
    paddingRight: 15,
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingHorizontal: 8,
    color: COLORS.black,
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
    backgroundColor: COLORS.black,
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
    backgroundColor: COLORS.lightGray,
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
    backgroundColor: COLORS.lightGray,
    borderRadius: 50,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    paddingHorizontal: 12,
  },
  quickMsg: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 7,
    paddingHorizontal: 12,
    height: 32,
    marginTop: 10,
  },
});
