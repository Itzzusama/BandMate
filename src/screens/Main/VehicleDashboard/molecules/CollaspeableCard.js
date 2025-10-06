import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "../../../../components/CustomText";
import CustomSwitch from "../../../../components/CustomSwitch";
import Icons from "../../../../components/Icons";
import Divider from "../../../../components/Divider";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";
import FlexibleHighlightedText from "./HighlightedText";

const CollapseableCard = ({
  title,
  subtitle,
  collapsed,
  toggleCollapse,
  showSwitch = false,
  switchValue,
  setSwitchValue,
  switchLabel,
  switchSubLabel,
  showInputs = false,
  inputFields = [],
  highlight,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.headerRow, { marginBottom: collapsed ? 0 : 30 }]}
        onPress={toggleCollapse}
      >
        <View>
          <CustomText
            label={title}
            fontSize={24}
            fontFamily={fonts.semiBold}
            lineHeight={24 * 1.4}
          />
          <CustomText
            label={subtitle}
            color={COLORS.gray1}
            fontFamily={fonts.medium}
            lineHeight={14 * 1.4}
          />
        </View>
        <Icons
          name={collapsed ? "chevron-up" : "chevron-down"}
          family="Feather"
          size={24}
        />
      </TouchableOpacity>

      {collapsed && (
        <>
          {showSwitch && (
            <View
              style={{
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View style={{ width: "80%" }}>
                <CustomText
                  label={switchLabel}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  lineHeight={16 * 1.4}
                />
                <CustomText
                  label={switchSubLabel}
                  color={COLORS.gray1}
                  lineHeight={12 * 1.4}
                  fontSize={12}
                />
              </View>
              <CustomSwitch value={switchValue} setValue={setSwitchValue} />
            </View>
          )}

          {highlight && <View>{highlight}</View>}

          {showInputs &&
            inputFields?.map((field, index) => (
              <View key={index}>
                {field.component}
                {field.infoText && <View>{field.infoText}</View>}
              </View>
            ))}

          <Divider marginVertical={12} />
        </>
      )}
    </View>
  );
};

export default CollapseableCard;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
