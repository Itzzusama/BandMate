import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import CustomText from "../../../../components/CustomText";
import fonts from "../../../../assets/fonts";
import { COLORS } from "../../../../utils/COLORS";
import ErrorComponent from "../../../../components/ErrorComponent";

const DetailCard = ({
  name,
  value,
  isFirst = false,
  isLast = false,
  ischange = false,
  leftImage,
  isInfo,
}) => {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 16,
          borderBottomWidth: isLast ? 0 : 1,
          borderColor: "#ededed",
          borderTopLeftRadius: isFirst ? 12 : 0,
          borderTopRightRadius: isFirst ? 12 : 0,
          borderBottomLeftRadius: isLast ? 12 : 0,
          borderBottomRightRadius: isLast ? 12 : 0,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {ischange && leftImage ? (
            <Image
              source={leftImage}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
          ) : null}
          <CustomText
            label={name}
            fontSize={14}
            lineHeight={14 * 1.4}
            fontFamily={fonts.medium}
          />
        </View>
        <CustomText label={value} fontSize={14} lineHeight={14 * 1.4} />
      </View>
      
    </>
  );
};

export default DetailCard;

const styles = StyleSheet.create({});
