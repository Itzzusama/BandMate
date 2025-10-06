import { StyleSheet, View } from "react-native";
import ImageFast from "../../../../components/ImageFast";
import CustomButton from "../../../../components/CustomButton";
import { COLORS } from "../../../../utils/COLORS";

const SelfiPreview = ({ selfi, handleCancel, handleVerify, loading }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, marginBottom: 20 }}>
        <ImageFast
          style={styles.img}
          resizeMode={"contain"}
          source={{ uri: selfi }}
        />
      </View>
      <View style={styles.actionButtonsContainer}>
        <CustomButton
          isBoarder
          title={"Retake"}
          marginBottom={12}
          disabled={loading}
          onPress={handleCancel}
          secondBorderColor={COLORS.white}
        />
        <CustomButton
          title="Verify"
          loading={loading}
          color={COLORS.black}
          onPress={handleVerify}
          backgroundColor={COLORS.lightGray}
        />
      </View>
    </View>
  );
};

export default SelfiPreview;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    marginTop: "20%",
  },
  actionButtonsContainer: {
    marginBottom: 30,
  },
});
