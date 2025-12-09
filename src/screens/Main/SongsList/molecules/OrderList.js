import { Image, StyleSheet, Pressable, View } from "react-native";

import { COLORS } from "../../../../utils/COLORS";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";

const OrderList = ({ sortOrder, setSortOrder, viewMode, setViewMode }) => {
  return (
    <View style={[styles.container, styles.row]}>
      <Pressable
        style={[styles.row, { flex: 1, gap: 4 }]}
        onPress={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        <Image style={styles.img} source={PNGIcons.arrowUpDown} />
        <CustomText
          label={sortOrder === "asc" ? "A-Z" : "Z-A"}
          fontSize={12}
          fontFamily={fonts.medium}
        />
      </Pressable>

      <Pressable
      // onPress={() => setViewMode(viewMode === "list" ? "grid" : "list")}
      >
        <Image
          style={styles.img}
          source={viewMode === "list" ? PNGIcons.grid : PNGIcons.list}
        />
      </Pressable>
    </View>
  );
};

export default OrderList;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderTopWidth: 4,
    borderColor: COLORS.cardColor,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  img: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
});
