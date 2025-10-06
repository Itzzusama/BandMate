import { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import CustomText from "../../../../components/CustomText";
import CustomSwitch from "../../../../components/CustomSwitch";
import ErrorComponent from "../../../../components/ErrorComponent";
import Icons from "../../../../components/Icons";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";

const CollapseableCard = ({
  title = "Trips",
  description = "You don’t have any messages yet.",
  tabs = [],
  showErrors = true,
  showSwitch = true,
  onToggle,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [switchStates, setSwitchStates] = useState(tabs.map(() => false));

  const toggleCollapseAll = () => setCollapsed(!collapsed);

  const toggleSwitch = (index, value) => {
    const updatedSwitchStates = [...switchStates];
    updatedSwitchStates[index] = value;
    setSwitchStates(updatedSwitchStates);
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.headerRow}
        onPress={toggleCollapseAll}
      >
        <View>
          <CustomText
            label={title}
            fontSize={24}
            fontFamily={fonts.semiBold}
            lineHeight={28}
          />
          <CustomText label={description} color={COLORS.gray1} />
        </View>
        <Icons
          name={collapsed ? "chevron-down" : "chevron-up"}
          family={"Feather"}
          size={22}
        />
      </TouchableOpacity>

      {collapsed && <View style={styles.border1} />}

      {!collapsed && (
        <View style={{ marginTop: 16 }}>
          {tabs.map((tab, i) => (
            <View key={tab.id || i}>
              <View style={styles.row}>
                <View style={{ width: "75%" }}>
                  <CustomText
                    label={tab?.name}
                    fontSize={16}
                    lineHeight={20}
                    fontFamily={fonts.medium}
                  />
                  <CustomText
                    label={tab?.subname}
                    lineHeight={18}
                    fontSize={12}
                  />
                </View>

                {showSwitch && (
                  <CustomSwitch
                    value={tab?.isEnable}
                    setValue={(val) => onToggle(tab?.id, val)}
                  />
                )}
              </View>

              {showErrors && (
                <ErrorComponent errorTitle={"Minimal rental period"} />
              )}
              {i !== tabs.length - 1 ? (
                <View style={styles.border} />
              ) : (
                <View style={styles.border1} />
              )}
            </View>
          ))}
        </View>
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  border: {
    width: "100%",
    height: 1,
    marginVertical: 20,
    backgroundColor: COLORS.lightGray,
  },
  border1: {
    width: "100%",
    height: 4,
    marginVertical: 16,
    backgroundColor: COLORS.lightGray,
  },
});
