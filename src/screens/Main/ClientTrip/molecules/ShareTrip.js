import { FlatList, Pressable, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import CustomText from "../../../../components/CustomText";
import { PNGIcons } from "../../../../assets/images/icons";
import ImageFast from "../../../../components/ImageFast";

const data = [
  {
    _id: 1,
    logo: PNGIcons.insta,
  },
  {
    _id: 2,
    logo: PNGIcons.twitter,
  },
  {
    _id: 3,
    logo: PNGIcons.fb,
  },
  {
    _id: 4,
    logo: PNGIcons.raddit,
  },
];

const ShareTrip = () => {
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        fontFamily={fonts.medium}
        label={"Share This Profile with Friends"}
      />
      <FlatList
        data={data}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Pressable style={styles.box}>
            <ImageFast
              source={item.logo}
              style={styles.logo}
              resizeMode={"contain"}
            />
          </Pressable>
        )}
      />
    </View>
  );
};

export default ShareTrip;

const styles = StyleSheet.create({
  box: {
    width: "23%",
    height: 64,
    borderRadius: 12,
    backgroundColor: "#1212120A",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 32,
    height: 32,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
});
