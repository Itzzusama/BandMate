import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import CustomButton from "../../../../components/CustomButton";
import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { PNGIcons } from "../../../../assets/images/icons";
import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const TripPassangers = () => {
  const navigation = useNavigation();
  return (
    <View>
      <CustomText
        fontSize={18}
        marginBottom={10}
        lineHeight={18 * 1.4}
        fontFamily={fonts.medium}
        label={`Passengers  ${2}/${4}`}
      />
      <View>
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => (
            <View style={styles.card}>
              <ImageFast
                source={Images.user}
                style={styles.avatar}
                resizeMode={"contain"}
              />
              <View style={styles.subCard}>
                <View>
                  <CustomText
                    fontSize={16}
                    label={"Mr. Sola"}
                    lineHeight={16 * 1.4}
                    fontFamily={fonts.medium}
                  />
                  <CustomText
                    fontSize={12}
                    lineHeight={12 * 1.4}
                    color={COLORS.subtitle}
                    fontFamily={fonts.medium}
                    label="vsola@darcotech.com"
                  />
                </View>
                <TouchableOpacity>
                  <Icons
                    size={22}
                    family="Feather"
                    color="#121212A3"
                    name="chevron-right"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
      <CustomButton
        width="90%"
        borderRadius={12}
        icon={PNGIcons.plus}
        color={COLORS.black}
        alignSelf="flex-end"
        title="Add A Passenger"
        backgroundColor="#1212120A"
        onPress={() => navigation.navigate("AddPassenger")}
      />
      <View style={styles.warningBox}>
        <Icons name={"info"} family={"Feather"} color={COLORS.warning} />
        <CustomText
          fontSize={12}
          marginTop={-3}
          marginRight={10}
          lineHeight={12 * 1.4}
          color={COLORS.warning}
          label={"A fee of $2.00 per Passenger is to be considered."}
        />
      </View>
      <View style={styles.line} />
      <CustomButton
        color={COLORS.black}
        title="Split Receipt"
        rightIcon={PNGIcons.split}
        backgroundColor={"#1212120A"}
        onPress={() => navigation.navigate("SplitBillUser")}
      />
    </View>
  );
};

export default TripPassangers;

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1212120A",
    marginBottom: 10,
  },
  subCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#A57A3A0A",
    padding: 8,
    columnGap: 5,
    borderRadius: 12,
    marginTop: 15,
  },
  line: {
    backgroundColor: "#1212120A",
    width: "100%",
    height: 1,
    marginVertical: 20,
  },
});
