import { Image, ScrollView, StyleSheet, View } from "react-native";
import fonts from "../../../../assets/fonts";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const BrowseAudience = ({ title }) => {
  return (
    <View style={{ paddingHorizontal: 12, marginBottom: 18, marginTop: 12 }}>
      <View style={styles.row}>
        <CustomText
          label={title || "Browse By Audience"}
          fontSize={18}
          fontFamily={fonts.medium}
          lineHeight={18 * 1.4}
        />

        <View style={styles.seeMore}>
          <CustomText
            label={"SEE MORE"}
            fontSize={12}
            lineHeight={12 * 1.4}
            fontFamily={fonts.semiBold}
          />
          <Image source={PNGIcons.forwardPurple} style={styles.forwardPurple} />
        </View>
      </View>
      <ScrollView horizontal>
        <View style={[styles.box, { backgroundColor: "#264230" }]}>
          <CustomText
            label={"Men"}
            fontSize={18}
            lineHeight={18 * 1.4}
            color={COLORS.white}
            fontFamily={fonts.medium}
          />
        </View>
        <View style={[styles.box, { backgroundColor: "#4D3838" }]}>
          <CustomText
            label={"WOmen"}
            fontSize={18}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
            color={COLORS.white}
          />
        </View>
        <View style={[styles.box, { backgroundColor: "#383A4D" }]}>
          <CustomText
            label={"Kids"}
            fontSize={18}
            color={COLORS.white}
            lineHeight={18 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default BrowseAudience;

const styles = StyleSheet.create({
  seeMore: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  forwardPurple: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  border: {
    height: 2,
    backgroundColor: COLORS.lightGray,
    marginVertical: 12,
  },
  box: {
    height: 104,
    width: 160,
    borderRadius: 16,
    padding: 16,
    marginRight: 8,
  },
});
