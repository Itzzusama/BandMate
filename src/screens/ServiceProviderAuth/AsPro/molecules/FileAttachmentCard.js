import { StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const FileAttachmentCard = ({ marginVertical }) => {
  return (
    <View style={[styles.container, { marginVertical: marginVertical || 8 }]}>
      <View style={styles.iconWrapper}>
        <Icons name="plus" family="AntDesign" size={16} color={COLORS.black} />
      </View>

      <View style={styles.textWrapper}>
        <CustomText
          label="PDF uniquement. 20MB."
          color={COLORS.black}
          fontSize={12}
          fontFamily={fonts.regular}
        />
        <CustomText
          label="Joindre le casier judiciare"
          color={COLORS.black}
          fontSize={16}
          fontFamily={fonts.medium}
        />
      </View>

      <View style={styles.iconWrapper}>
        <Icons
          name="delete"
          family="MaterialIcons"
          size={16}
          color={COLORS.black}
        />
      </View>
    </View>
  );
};

export default FileAttachmentCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.inputBg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  iconWrapper: {
    backgroundColor: COLORS.inputBg,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    width: 32,
    height: 32,
  },
  textWrapper: {
    alignItems: "center",
  },
});
