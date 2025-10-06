import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";
import { useState } from "react";

const OrderNotes = () => {
  const [quantity, setQuantity] = useState(1);
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        label={"Addtional Remarks"}
      />
      <View style={styles.inputBox}>
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          color={COLORS.subtitle}
          fontFamily={fonts.medium}
          label={"ADD A REMARK (OPTIONAL)"}
        />
        <TextInput multiline style={styles.input} cursorColor={COLORS.black} />
      </View>
      <View style={styles.info}>
        <Icons
          size={12}
          name={"info"}
          family={"Feather"}
          color={COLORS.subtitle}
        />
        <CustomText
          fontSize={12}
          lineHeight={12 * 1.4}
          textTransform={"none"}
          color={COLORS.subtitle}
          label={"0/200 characters."}
        />
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <View>
          <CustomText
            fontSize={16}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
            label={"Do you need Utensils?"}
          />
          <CustomText
            fontSize={12}
            label={"Free"}
            color={"#4347FF"}
            lineHeight={12 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => quantity > 1 && setQuantity(quantity - 1)}
          >
            <Icons name={"minus"} family={"Feather"} size={20} />
          </TouchableOpacity>
          <CustomText
            fontSize={16}
            label={quantity}
            lineHeight={16 * 1.4}
            fontFamily={fonts.medium}
          />
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Icons name={"plus"} family={"Feather"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OrderNotes;

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    padding: 12,
    height: 160,
  },
  input: {
    flex: 1,
    color: COLORS.black,
    fontFamily: fonts.medium,
    fontSize: 16,
    textAlignVertical: "top",
    padding: 0,
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
    marginTop: 6,
  },
  line: {
    backgroundColor: COLORS.lightGray,
    flex: 1,
    height: 1,
    marginTop: 15,
    marginBottom: 12,
  },
  quantityBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGray,
    borderRadius: 50,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
