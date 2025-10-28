/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
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
          color={COLORS.white}
          name="keyboard-arrow-left"
        />
      </TouchableOpacity>

      {/* <ImageFast resizeMode="cover" source={source} style={styles.userImage} /> */}
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <View style={styles.onlineDot} />
          <CustomText
            label={title || "Catie, 24"}
            fontSize={20}
            fontFamily={fonts.semiBold}
          />
        </View>
        <View style={styles.row}>
          <ImageFast
            resizeMode="contain"
            source={Images.pindrop}
            tintColor={"#828186"}
            style={{ height: 15, width: 15, marginLeft: -3 }}
          />
          <CustomText
            label={"Los Angeles"}
            fontFamily={fonts.semiBold}
            color={"#828186"}
            fontSize={12}
          />
          <View style={styles.sparator} />

          <CustomText
            label={"Solo Artist"}
            fontFamily={fonts.semiBold}
            color={"#828186"}
            fontSize={12}
          />
        </View>
      </View>
      {showIcons && (
        <>
          <TouchableOpacity activeOpacity={0.6} style={[styles.backIcon]}>
            <ImageFast
              resizeMode="contain"
              source={Images.ChatSetting}
              style={{ height: 15, width: 15, marginLeft: -3 }}
            />
          </TouchableOpacity>

          {/* <Pressable
            style={styles.icon}
            onPress={() => setIsViewModal(true)}
            hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
          >
            <Icons
              size={20}
              color={COLORS.white}
              family={"Entypo"}
              name={"dots-three-vertical"}
            />
          </Pressable> */}
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
    borderColor: COLORS.inputBg,
    // backgroundColor: "rgba(38, 38, 38, 0.64)",
    paddingHorizontal: 15,
  },
  backIcon: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF14",
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

  onlineDot: {
    backgroundColor: "#64CD75",
    width: 8,
    height: 8,
    marginRight: 3,
    borderRadius: 100,
  },

  sparator: {
    backgroundColor: "#828186",
    width: 4,
    height: 4,
    borderRadius: 100,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});
