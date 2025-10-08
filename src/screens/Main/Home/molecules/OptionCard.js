import { StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const OptionCard = ({ title, array, setArray }) => {
  const handlePress = (index) => {
    const updatedArray = array.map((item, i) => {
      if (typeof item === "string") {
        return {
          name: item,
          isSelected:
            i === index
              ? !(array[i]?.isSelected || false)
              : array[i]?.isSelected || false,
        };
      } else {
        return {
          ...item,
          isSelected: i === index ? !item.isSelected : item.isSelected,
        };
      }
    });

    setArray(updatedArray);
  };

  const getItemInfo = (item) => {
    if (typeof item === "string") {
      return {
        name: item,
        isSelected: false,
      };
    }
    return item;
  };

  return (
    <View style={styles.mainContainer}>
      <CustomText
        label={title || "I'm looking for"}
        fontSize={18}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        marginBottom={8}
      />
      <View style={styles.row}>
        {array?.map((item, index) => {
          const itemInfo = getItemInfo(item);
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.btn,
                {
                  backgroundColor: itemInfo.isSelected
                    ? COLORS.white
                    : "#FFFFFF0A",
                },
              ]}
              onPress={() => handlePress(index)}
            >
              <CustomText
                label={itemInfo.name}
                fontFamily={fonts.medium}
                fontSize={12}
                lineHeight={12 * 1.4}
                color={itemInfo.isSelected ? COLORS.black : COLORS.white}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#272727",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },
  btn: {
    padding: 7,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF0A",
    borderRadius: 99,
    marginBottom: 8,
  },
});
