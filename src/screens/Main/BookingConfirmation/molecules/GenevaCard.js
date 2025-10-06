import { StyleSheet, Image, View } from "react-native";
import React from "react";
import { PNGIcons } from "../../../../assets/images/icons";
import CustomText from "../../../../components/CustomText";

const GenevaCard = ({label}) => {
  return (
    <View>
      <Image source={PNGIcons.Geneva} style={styles.Geneva} />
      <CustomText label={label|| "Mur Des Reformateurs"}/>
    </View>
  );
};

export default GenevaCard;

const styles = StyleSheet.create({
  Geneva: {
    height: 20,
    width: 20,
  },
});
