import {Platform, StyleSheet} from 'react-native';
import React from 'react';

import CustomText from './CustomText';

import fonts from '../assets/fonts';
import {COLORS} from '../utils/COLORS';

const DualText = ({title, secondTitle, marginBottom, marginTop, onPress}) => {
  return (
    <CustomText
      color={COLORS.white}
      alignSelf="center"
      marginTop={marginTop}
      marginBottom={marginBottom}
      fontSize={12}
      label={title}>
      <CustomText
        label={secondTitle}
        color={COLORS.white}
        onPress={onPress}
        fontFamily={fonts.semiBold}
        fontSize={16}
        marginLeft={4}
        marginBottom={Platform.OS == 'android' ? -10 : -4}
      />
    </CustomText>
  );
};

export default DualText;

const styles = StyleSheet.create({});
