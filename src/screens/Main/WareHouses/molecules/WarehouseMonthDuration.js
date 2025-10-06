import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";
import { COLORS } from "../../../../utils/COLORS";

const WarehouseMonthDuration = () => {
  return (
    <View style={{ paddingHorizontal: 12 }}>
      <CustomText
        fontSize={12}
        marginTop={2}
        marginBottom={12}
        lineHeight={12 * 1.4}
        color={COLORS.subtitle}
        label={"HOW MANY MONTHS"}
        fontFamily={fonts.medium}
      />
      <View style={{ marginBottom: 16 }}>
        <FlatList
          data={Array.from({ length: 7 }, (_, i) => i + 1)}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.selector}>
              <CustomText
                lineHeight={14 * 1.4}
                fontFamily={fonts.medium}
                label={item === 7 ? `+${item}` : `${item}`}
              />
            </TouchableOpacity>
          )}
          horizontal
        />
      </View>
      <View style={styles.box}>
        <View>
          <CustomText
            fontSize={12}
            marginBottom={2}
            label={"CHECK-IN"}
            lineHeight={1.4 * 12}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={styles.row}>
            <Icons name={"calendar"} family={"Entypo"} />
            <CustomText
              fontSize={16}
              lineHeight={1.4 * 16}
              label={"July 1, 2025"}
              fontFamily={fonts.medium}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.icon}>
          <Icons
            size={14}
            name={"calendar"}
            family={"Entypo"}
            color={COLORS.darkPurple}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.box}>
        <View>
          <CustomText
            fontSize={12}
            marginBottom={2}
            label={"CHECK OUT"}
            lineHeight={1.4 * 12}
            color={COLORS.subtitle}
            fontFamily={fonts.medium}
          />
          <View style={styles.row}>
            <Icons name={"calendar"} family={"Entypo"} />
            <CustomText
              fontSize={16}
              lineHeight={1.4 * 16}
              label={"July 1, 2025"}
              fontFamily={fonts.medium}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.icon}>
          <Icons
            size={14}
            name={"calendar"}
            family={"Entypo"}
            color={COLORS.darkPurple}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WarehouseMonthDuration;

const styles = StyleSheet.create({
  selector: {
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.lightGray,
    marginRight: 5,
  },
  box: {
    borderRadius: 12,
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightGray,
    padding: 12,
    paddingVertical: 10,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.low,
    borderRadius: 50,
    width: 32,
    height: 32,
  },
});
