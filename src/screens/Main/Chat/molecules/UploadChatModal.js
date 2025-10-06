import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomModal from "../../../../components/CustomModal";
import { COLORS } from "../../../../utils/COLORS";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import Icons from "../../../../components/Icons";
import { PNGIcons } from "../../../../assets/images/icons";

const UploadChatModal = ({ onDisable, isVisible }) => {
  return (
    <CustomModal
      isChange
      onDisable={onDisable}
      isVisible={isVisible}
      backdropOpacity={0.9}
    >
      <View style={[styles.modalContainer]}>
        <View style={[styles.container]}>
          <CustomText
            fontSize={16}
            marginBottom={16}
            color={COLORS.white}
            lineHeight={16 * 1.4}
            fontFamily={fonts.semiBold}
            label={"What would you like to do?"}
          />
          <View style={styles.box}>
            <View>
              <View style={styles.row}>
                <Icons
                  size={16}
                  family={"Feather"}
                  name={"file-text"}
                  color={COLORS.white}
                />
                <CustomText
                  fontSize={16}
                  color={COLORS.white}
                  lineHeight={16 * 1.4}
                  label={"Upload a File"}
                  fontFamily={fonts.semiBold}
                />
              </View>
              <CustomText
                color={"#FFFFFFA3"}
                lineHeight={14 * 1.4}
                label={"Most files are supported"}
              />
            </View>
            <TouchableOpacity>
              <Icons
                size={20}
                family={"Feather"}
                color={COLORS.white}
                name={"chevron-right"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <View>
              <View style={styles.row}>
                <Icons
                  size={16}
                  family={"Feather"}
                  name={"file-text"}
                  color={COLORS.white}
                />
                <CustomText
                  fontSize={16}
                  color={COLORS.white}
                  lineHeight={16 * 1.4}
                  fontFamily={fonts.semiBold}
                  label={"Upload a Image/Video"}
                />
              </View>
              <CustomText
                color={"#FFFFFFA3"}
                lineHeight={14 * 1.4}
                label={"JPG., PNG, GIF, MP4"}
              />
            </View>
            <TouchableOpacity>
              <Icons
                size={20}
                family={"Feather"}
                color={COLORS.white}
                name={"chevron-right"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.box}>
            <View>
              <View style={styles.row}>
                <Icons
                  size={16}
                  family={"Feather"}
                  name={"file-text"}
                  color={COLORS.white}
                />
                <CustomText
                  fontSize={16}
                  color={COLORS.white}
                  lineHeight={16 * 1.4}
                  label={"Create a Poll"}
                  fontFamily={fonts.semiBold}
                />
              </View>
              <CustomText
                color={"#FFFFFFA3"}
                lineHeight={14 * 1.4}
                label={"Single-choice with 4 max. options"}
              />
            </View>
            <TouchableOpacity>
              <Icons
                size={20}
                family={"Feather"}
                color={COLORS.white}
                name={"chevron-right"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onDisable} style={styles.dismissIcon}>
        <Image
          source={PNGIcons.cross}
          tintColor={COLORS.white}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
    </CustomModal>
  );
};

export default UploadChatModal;

const styles = StyleSheet.create({
  modalContainer: {
    padding: 5,
    width: "95%",
    alignSelf: "center",
    borderRadius: 24,
    overflow: "hidden",
    marginVertical: "auto",
  },
  container: {
    width: "100%",
    padding: 12,
    borderRadius: 20,
    paddingBottom: 4,
    overflow: "hidden",
    paddingTop: 16,
    backgroundColor: "rgba(60, 61, 55, 0.80)",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
    marginBottom: 5,
  },
  box: {
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dismissIcon: {
    height: 48,
    width: 48,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 15,
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    marginBottom: 25,
  },
});
