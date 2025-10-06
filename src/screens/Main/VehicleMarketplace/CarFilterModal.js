import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

import CustomButton from "../../../components/CustomButton";
import CustomModal from "../../../components/CustomModal";
import CustomText from "../../../components/CustomText";

import { PNGIcons } from "../../../assets/images/icons";
import { COLORS } from "../../../utils/COLORS";
import fonts from "../../../assets/fonts";
import { carFilters } from "../../../utils/constants";
import ImageFast from "../../../components/ImageFast";

const CarFilterModal = ({
  isVisible,
  onDisable,
  onItemPress,
  title,
  subtitle,
}) => {
  return (
    <CustomModal isChange isVisible={isVisible} onDisable={onDisable}>
      <View
        style={{
          padding: 5,
          width: "95%",
          alignSelf: "center",
          borderRadius: 24,
          marginBottom: 12,
          maxHeight: "100%",
          borderWidth: 1,
          backgroundColor: "#FFFFFF29",
          borderColor: "rgba(255, 255, 255, 0.16)",
        }}
      >
        <BlurView
          style={{
            maxHeight: "100%",
            width: "100%",
            borderRadius: 24,
          }}
          blurType="light"
          blurAmount={26}
          reducedTransparencyFallbackColor="#FFFFFF29"
        />

        <View style={styles.mainContainer}>
          <View style={styles.row}>
            <CustomText
              label={title || "Filters"}
              fontFamily={fonts.semiBold}
              fontSize={24}
            />
            <TouchableOpacity
              onPress={onDisable}
              style={{
                height: 32,
                width: 32,
                borderRadius: 99,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: COLORS.lightGray,
              }}
            >
              <Image source={PNGIcons.cross} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <CustomText
            label={subtitle || "Find the perfect fit for you!"}
            fontFamily={fonts.medium}
            color={COLORS.gray1}
          />

          <FlatList
            data={carFilters}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                style={styles.filterIcon}
                onPress={onItemPress}
              >
                <CustomText
                  label={item.name}
                  fontSize={16}
                  fontFamily={fonts.medium}
                  lineHeight={16 * 1.4}
                />
                <ImageFast
                  source={PNGIcons.forward}
                  style={{ height: 24, width: 24 }}
                  resizeMode={"contain"}
                />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <CustomButton
              title={"Clear All"}
              width="47%"
              height={48}
              backgroundColor={COLORS.lightGray}
              color={COLORS.primaryColor}
            />
            <CustomButton title={"Confirm"} width="47%" height={48} />
          </View>
        </View>
      </View>
    </CustomModal>
  );
};

export default CarFilterModal;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 22,
  },
  icon: {
    height: 16,
    width: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
});
