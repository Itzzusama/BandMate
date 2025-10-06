import { Pressable, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const OptionItem = ({
  badgeLabel,
  badgeBg,
  badgeColor,
  title,
  subtitle,
  price,
  extraPrice,
  includedText,
  selected,
  onPress,
  isChange,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.optionCard, selected && styles.optionCardActive]}
    >
      <View style={styles.optionHeaderRow}>
        {!!badgeLabel && (
          <View style={[styles.badge, { backgroundColor: badgeBg }]}>
            <CustomText
              label={badgeLabel}
              fontFamily={fonts.semiBold}
              fontSize={10}
              lineHeight={10 * 1.4}
              color={badgeColor}
            />
          </View>
        )}

        <Pressable
          onPress={onPress}
          hitSlop={8}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            justifyContent: "center",
          }}
        >
          <Icons
            family="Ionicons"
            name={selected ? "radio-button-on" : "radio-button-off"}
            size={24}
            color={selected ? COLORS.darkPurple : COLORS.gray2}
          />
        </Pressable>
      </View>

      {isChange ? (
        <>
          <CustomText
            label={title}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
          />
          {!!subtitle && (
            <CustomText
              label={subtitle}
              color={COLORS.gray1}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginBottom={2}
            />
          )}
        </>
      ) : (
        <>
          {!!subtitle && (
            <CustomText
              label={subtitle}
              color={COLORS.gray1}
              fontSize={12}
              lineHeight={12 * 1.4}
              marginTop={4}
            />
          )}
          <CustomText
            label={title}
            fontFamily={fonts.medium}
            fontSize={16}
            lineHeight={16 * 1.4}
            marginTop={2}
          />
        </>
      )}

      {!!price && (
        <CustomText
          label={price}
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.gray1}
          marginBottom={2}
        />
      )}

      {!!extraPrice && (
        <View style={styles.infoRow}>
          <Icons
            family="Ionicons"
            name="information-circle-outline"
            size={12}
            color={COLORS.gray2}
          />
          <CustomText
            label={extraPrice}
            fontFamily={fonts.medium}
            fontSize={12}
            lineHeight={12 * 1.6}
            color={COLORS.gray2}
            marginLeft={6}
          />
        </View>
      )}

      {!!includedText && (
        <View style={[styles.infoRow]}>
          <Icons
            family="Ionicons"
            name="information-circle-outline"
            size={12}
            color={"#776A3D"}
          />
          <CustomText
            label={includedText}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={"#776A3D"}
            marginLeft={6}
          />
        </View>
      )}
    </Pressable>
  );
};
export default OptionItem;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
  optionCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBg,
    marginTop: 12,
  },
  optionCardActive: {
    // borderColor: COLORS.darkPurple,
  },
  optionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 2,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
