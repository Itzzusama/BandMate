import { TouchableOpacity, View } from "react-native";
import React from "react";

import CustomText from "../../../../components/CustomText";
import ImageFast from "../../../../components/ImageFast";
import Icons from "../../../../components/Icons";

import { Images } from "../../../../assets/images";
import { COLORS } from "../../../../utils/COLORS";
import fonts from "../../../../assets/fonts";

const UploadCard = ({ label, file, onUpload, onDelete, info }) => (
  <View
    style={{
      backgroundColor: COLORS.inputBg,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: COLORS.inputBg,
      padding: 12,
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 56,
    }}
  >
    <TouchableOpacity
      style={{
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: COLORS.inputBg,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
        borderColor: COLORS.inputLabel,
      }}
      onPress={onUpload}
      activeOpacity={0.7}
    >
      <Icons
        family="Feather"
        name="plus"
        size={16}
        color={COLORS.primaryColor}
      />
    </TouchableOpacity>
    <View>
      {info && <CustomText label={info} fontSize={12} color={COLORS.gray3} />}
      <CustomText
        label={label}
        fontFamily={fonts.medium}
        fontSize={16}
        color={COLORS.primaryColor}
      />
      {file && (
        <CustomText
          label={file.name || file.fileName}
          fontSize={12}
          color={COLORS.gray4}
        />
      )}
    </View>
    <TouchableOpacity
      onPress={onDelete}
      style={{
        width: 36,
        height: 36,
        borderRadius: 100,
        backgroundColor: COLORS.inputBg,
        alignItems: "center",
        justifyContent: "center",
        borderColor: COLORS.inputLabel,
      }}
    >
      <ImageFast source={Images.bin} style={{ height: 16, width: 16 }} />
    </TouchableOpacity>
  </View>
);
export default UploadCard;
