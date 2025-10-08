import {
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
} from "react-native";

import CustomBlurComponent from "../../../../components/CustomBlurComponent";
import CustomText from "../../../../components/CustomText";
import Icons from "../../../../components/Icons";

import { PNGIcons } from "../../../../assets/images/icons";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const Search = ({ onSearchPress, onLocationPress, tab, loading }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{ justifyContent: "flex-end", width: "85%" }}>
        {tab == 0 ? (
          <CustomBlurComponent onPress={onSearchPress} height={48} width="100%">
            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-between",
                  width: "100%",
                  paddingHorizontal: 14,
                },
              ]}
            >
              <View style={styles.row}>
                <Icons
                  family="FontAwesome5"
                  name="search"
                  size={18}
                  color={COLORS.gray2}
                />
                <CustomText
                  label="What do you want to do...?"
                  fontFamily={fonts.medium}
                  marginLeft={4}
                />
              </View>
              <Icons
                family="FontAwesome"
                name="angle-double-up"
                size={20}
                color={COLORS.subtitle}
              />
            </View>
          </CustomBlurComponent>
        ) : (
          <View />
        )}
      </View>

      <View>
        <TouchableOpacity
          onPress={onLocationPress}
          style={styles.locationContainer}
          activeOpacity={0.6}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.primaryColor} />
          ) : (
            <Image source={PNGIcons.location} style={styles.location} />
          )}
        </TouchableOpacity>
        {tab == 0 ? (
          <TouchableOpacity style={{ marginTop: 10 }} activeOpacity={0.6}>
            <Image
              source={PNGIcons.qrIcon}
              style={{
                width: 48,
                height: 48,
                resizeMode: "contain",
              }}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationContainer: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  location: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});
