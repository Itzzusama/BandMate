import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  View,
} from "react-native";

import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const percents = [5, 10, 15, 25, 50];

const getTipPrice = (price, percent) => {
  return (price / 100) * percent;
};

const TripTip = ({ totalPrice = 80, tip, setTip, onAddTip }) => {
  const [selected, setSelected] = useState(0);

  const handleSelect = (percent) => {
    setSelected(percent);
    setTip(getTipPrice(totalPrice, percent));
    onAddTip(getTipPrice(totalPrice, percent));
  };

  const handleInput = (e) => {
    setTip(e);
    setSelected(0);
  };

  return (
    <View>
      <View style={[styles.row]}>
        <Icons name={"hand-holding-heart"} family={"FontAwesome5"} size={15} />
        <CustomText
          fontSize={18}
          label={"Add A Tip"}
          lineHeight={18 * 1.4}
          fontFamily={fonts.medium}
        />
      </View>
      <View style={styles.inputContainer}>
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          label={"TIP CUSTOM AMOUNT ($)"}
        />
        <TextInput
          placeholder="$0.00"
          style={styles.input}
          keyboardType="numeric"
          value={tip?.toString()}
          onChangeText={handleInput}
          onEndEditing={() => {
            const numericTip = parseFloat(tip);
            onAddTip(isNaN(numericTip) ? 0 : numericTip);
          }}
          cursorColor={COLORS.black}
          placeholderTextColor={COLORS.black}
        />
      </View>
      <FlatList
        data={percents}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handleSelect(item)}
            style={[styles.box, selected === item && styles.selectedBox]}
          >
            <CustomText
              fontSize={16}
              label={item + "%"}
              alignSelf="center"
              lineHeight={16 * 1.4}
              fontFamily={fonts.semiBold}
              color={selected === item ? COLORS.white : COLORS.black}
            />
            <CustomText
              fontSize={12}
              alignSelf="center"
              lineHeight={12 * 1.4}
              fontFamily={fonts.medium}
              label={"$" + getTipPrice(totalPrice, item)?.toFixed(2)}
              color={selected === item ? "#FFFFFFA3" : COLORS.subtitle}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TripTip;

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.inputBg,
    width: 65,
    height: 56,
    marginRight: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedBox: {
    backgroundColor: COLORS.black,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 6,
  },
  inputContainer: {
    backgroundColor: COLORS.inputBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    fontFamily: fonts.semiBold,
    color: COLORS.black,
    textAlignVertical: "center",
    fontSize: 13,
    padding: 0,
    marginTop: 2,
  },
});
