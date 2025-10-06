import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { PNGIcons } from "../../../../assets/images/icons";
import ImageFast from "../../../../components/ImageFast";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const TreasuryItem = ({
  title,
  amount,
  percentage,
  isIncome = true,
  progress = 0.8,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer]}>
          <ImageFast
            source={isIncome ? PNGIcons.TreasuryDown : PNGIcons?.TreasuryUp}
            resizeMode={"contain"}
            style={{ height: 40, width: 40 }}
          />
        </View>

        <View style={styles.infoContainer}>
          <CustomText
            label={title}
            fontFamily={fonts.medium}
            fontSize={14}
            lineHeight={14 * 1.4}
            color={COLORS.black}
          />
          <CustomText
            label={`${amount} - ${percentage}`}
            fontFamily={fonts.regular}
            lineHeight={12 * 1.4}
            fontSize={12}
            color={COLORS.gray1}
            marginTop={-2}
          />

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progress * 100}%`,
                    backgroundColor: "#1431Fa",
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      <Image source={PNGIcons.forward} style={styles.forwardDesign} />
    </TouchableOpacity>
  );
};

export default TreasuryItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  progressContainer: {
    marginTop: 4,
  },
  progressBackground: {
    height: 8,
    backgroundColor: COLORS.lightGray,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  forwardDesign: {
    height: 24,
    width: 24,
    marginLeft: 12,
  },
});
