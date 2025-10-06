import { StyleSheet, Image, View } from "react-native";
import React from "react";
import ImageFast from "../../../../components/ImageFast";
import { Images } from "../../../../assets/images";
import CustomText from "../../../../components/CustomText";
import { COLORS } from "../../../../utils/COLORS";

const FriendCard = ({ onDellPress, name, email, phone, imageUri }) => {
  return (
    <View style={styles.container}>
      <ImageFast
        source={imageUri ? { uri: imageUri } : Images.user}
        style={styles.icon}
      />
      <View style={{ flex: 1 }}>
        <CustomText label={name || "Unknown"} fontSize={16} lineHeight={16 * 1.4} />
        {!!email && (
          <CustomText label={email} lineHeight={14 * 1.4} color={COLORS.gray2} />
        )}
        {!!phone && (
          <CustomText
            label={phone}
            fontSize={12}
            lineHeight={12 * 1.4}
            color={COLORS.gray1}
          />
        )}
      </View>
      {onDellPress && (
        <ImageFast
          loading={false}
          source={Images.bin}
          style={styles.bin}
          onPress={onDellPress}
        />
      )}
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 99,
    marginRight: 12,
  },
  bin: {
    height: 24,
    width: 24,
    tintColor: COLORS.gray1,
  },
});
