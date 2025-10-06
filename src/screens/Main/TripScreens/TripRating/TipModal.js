import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import CustomModal from "../../../../components/CustomModal";
import CustomText from "../../../../components/CustomText";

import fonts from "../../../../assets/fonts";
import { Images } from "../../../../assets/images";
import { PNGIcons } from "../../../../assets/images/icons";
import AuthFooter from "../../../../components/Auth/AuthFooter";
import ImageFast from "../../../../components/ImageFast";
import { COLORS } from "../../../../utils/COLORS";

const TipModal = ({ isVisible, onDisable, onPress, title, subtitle }) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View style={styles.greenContainer}>
        <Image
          source={PNGIcons.save}
          style={{ height: 14, width: 14, marginRight: 6 }}
        />
        <CustomText
          label={"Save by using move+"}
          color={COLORS.white}
          fontFamily={fonts.medium}
          lineHeight={14 * 1.4}
        />
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onDisable}
          style={styles.closeButton}
        >
          <Image source={PNGIcons.cross} style={styles.icon} />
        </TouchableOpacity>

        <ImageFast source={Images.user} style={styles.userImage} />

        <CustomText
          label={subtitle || "How was your experience?"}
          fontFamily={fonts.semiBold}
          fontSize={24}
          alignSelf={"center"}
        />
        <CustomText
          label={subtitle || "What did you like about Sadia?"}
          color={COLORS.gray1}
          alignSelf={"center"}
        />
        <CustomText
          label={subtitle || "#T1313113"}
          fontFamily={fonts.medium}
          color={COLORS.gray1}
          alignSelf={"center"}
          marginBottom={30}
        />

        <FlatList
          data={[1, 2, 3, 4, 5, 6]}
          numColumns={3}
          contentContainerStyle={{ gap: 8 }}
          renderItem={() => (
            <View
              style={{
                padding: 12,
                backgroundColor: COLORS.lightGray,
                height: 110,
                width: "32%",
                marginRight: 8,
                paddingVertical: 20,
                borderRadius: 12,
              }}
            >
              <CustomText
                label={"Tip"}
                fontSize={12}
                alignSelf={"center"}
                lineHeight={12 * 1.4}
              />
              <CustomText
                label={"$40"}
                fontSize={40}
                alignSelf={"center"}
                fontFamily={fonts.semiBold}
                lineHeight={40 * 1.4}
              />
            </View>
          )}
        />

        <CustomText
          label={"Thank You For Your Tipping!"}
          fontFamily={fonts.semiBold}
          fontSize={24}
          alignSelf={"center"}
          lineHeight={24 * 1.4}
        />
        <CustomText
          label={"Your total stands at $24.25"}
          fontSize={16}
          alignSelf={"center"}
          lineHeight={16 * 1.4}
        />

        <View style={{ flex: 1 }} />
        <AuthFooter btnTitle={"Confirm"} onPress={onPress} />
      </View>
    </CustomModal>
  );
};

export default TipModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 12,
    height: 700,
    backgroundColor: COLORS.white,
  },
  icon: {
    height: 24,
    width: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  closeButton: {
    height: 48,
    width: 48,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: "50%",
    top: -100,
    backgroundColor: COLORS.lightGray,
  },
  userImage: {
    height: 80,
    width: 80,
    alignSelf: "center",
    marginVertical: 24,
  },
  feedbackRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    marginVertical: 32,
  },
  feedbackIcon: {
    height: 64,
    width: 64,
  },
  greenContainer: {
    backgroundColor: "#37B874",
    padding: 8,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});
