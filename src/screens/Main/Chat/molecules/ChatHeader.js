/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomButton from "../../../../components/CustomButton";
import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const ChatHeader = ({ title, source, showIcons = true }) => {
  const navigation = useNavigation();

  const [isViewModal, setIsViewModal] = useState(false);

  return (
    <View style={[styles.mainContainer]}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.backIcon]}
        onPress={() => navigation.goBack()}
      >
        <Icons
          size={26}
          family="MaterialIcons"
          color={COLORS.darkPurple}
          name="keyboard-arrow-left"
        />
      </TouchableOpacity>

      <ImageFast resizeMode="cover" source={source} style={styles.userImage} />
      <View style={{ flex: 1 }}>
        <CustomText
          label={title}
          fontSize={20}
          lineHeight={20 * 1.4}
          fontFamily={fonts.semiBold}
        />
      </View>
      {showIcons && (
        <>
          <TouchableOpacity activeOpacity={0.6} style={[styles.backIcon]}>
            <Icons size={22} name="phone" family="MaterialIcons" />
          </TouchableOpacity>

          <Pressable
            style={styles.icon}
            onPress={() => setIsViewModal(true)}
            hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
          >
            <Icons size={20} family={"Entypo"} name={"dots-three-vertical"} />
          </Pressable>
        </>
      )}

      <CustomModal
        isChange
        isVisible={isViewModal}
        onDisable={() => setIsViewModal(false)}
      >
        <View style={[styles.modalContainer]}>
          <View style={[styles.container]}>
            <CustomButton
              title="Block"
              marginBottom={10}
              indicatorcolor={"#fff"}
              customText={styles.txt}
              customStyle={styles.btn}
              backgroundColor="transparent"
            />
            <CustomButton
              title="Report"
              marginBottom={10}
              customText={styles.txt}
              customStyle={styles.btn}
              backgroundColor="transparent"
              onPress={() => {
                setIsViewModal(false);
                navigation.navigate("ReportChat");
              }}
            />
            <CustomButton
              height={50}
              title="Cancel"
              color={"#FFF"}
              marginBottom={10}
              backgroundColor="#000"
              onPress={() => setIsViewModal(false)}
              customText={{ fontFamily: fonts.medium }}
            />
          </View>
        </View>
      </CustomModal>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingHorizontal: 15,
  },
  backIcon: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightGray,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  userImage: {
    width: 24,
    height: 24,
    borderRadius: 50,
    marginRight: 10,
  },
  btn: {
    height: 47,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ebeced",
  },
  txt: {
    fontFamily: fonts.medium,
    color: COLORS.red1,
  },
  modalContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#FFFFFF29",
    borderColor: "rgba(255, 255, 255, 0.16)",
    overflow: "hidden",
    marginVertical: "auto",
  },
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    paddingBottom: 0,
    overflow: "hidden",
    paddingTop: 20,
  },
});
