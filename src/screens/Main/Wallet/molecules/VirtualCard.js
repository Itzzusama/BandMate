import { StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const VirtualCard = ({
  type = "Personal",
  balance = "1160.62",
  currency = "SC",
  expiryDate = "Never",
  colors = ["#4B5EFF", "#6C4CE8"],
  icon = "💳",
  onPress,
  selected = false,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.cardWrapper,
        {
          backgroundColor: selected ? COLORS.primaryColor : colors[0],
        },
      ]}
    >
      <View style={styles.cardContainer}>
        <LinearGradient
          colors={colors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <View style={styles.nameView}>
                <CustomText
                  label={icon}
                  fontSize={16}
                  lineHeight={16 * 1.4}
                  color={"#4B5EFF"}
                  textStyle={{ zIndex: 999 }}
                />
              </View>
              <CustomText
                label="Card"
                fontFamily={fonts.medium}
                fontSize={24}
                lineHeight={24 * 1.4}
                color={COLORS.white}
                marginLeft={4}
              />
            </View>
          </View>

          <View style={styles.cardContent}>
            <CustomText
              label={type}
              fontFamily={fonts.medium}
              fontSize={24}
              lineHeight={24 * 1.4}
              color={COLORS.white}
            />
            <CustomText
              label="Balance"
              fontFamily={fonts.medium}
              lineHeight={14 * 1.4}
              marginTop={-4}
              color={"#FFFFFFA3"}
            />
            <View style={styles.row}>
              <CustomText
                label={`${balance}`}
                fontFamily={fonts.semiBold}
                fontSize={32}
                lineHeight={32 * 1.4}
                color={COLORS.white}
              />
              <CustomText
                label={`${currency}`}
                fontFamily={fonts.semiBold}
                fontSize={32}
                marginLeft={4}
                lineHeight={32 * 1.4}
                color={"#FFFFFFA3"}
              />
            </View>
          </View>

          <View style={styles.cardFooter}>
            <View>
              <CustomText
                label="Expiry Date"
                fontFamily={fonts.medium}
                fontSize={14}
                lineHeight={14 * 1.4}
                color={COLORS.white}
              />
              <CustomText
                label={expiryDate}
                lineHeight={12 * 1.4}
                fontSize={12}
                color={COLORS.white}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    marginRight: 16,
    borderRadius: 24,
    // overflow: "hidden",
    padding: 3,
  },
  cardContainer: {
    width: 280,
    height: 340,
    borderRadius: 20,
    overflow: "hidden",
    position: "relative",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  nameView: {
    backgroundColor: COLORS.white,
    height: 24,
    width: 24,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default VirtualCard;
