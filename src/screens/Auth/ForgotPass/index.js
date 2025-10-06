import {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import CustomInput from '../../../components/CustomInput';
import ImageFast from '../../../components/ImageFast';
import DualText from '../../../components/DualText';
import Header from '../../../components/Header';

import {ToastMessage} from '../../../utils/ToastMessage';
import {regEmail} from '../../../utils/constants';
import {post} from '../../../services/ApiRequest';
import {Images} from '../../../assets/images';

const ForgotPass = ({navigation}) => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [email, setEmail] = useState('');

  const sendOtp = async () => {
    try {
      setLoading(true);
      const body = {
        email,
      };
      const response = await post('auth/forgot-password', body);
      ToastMessage(response.data?.message);
      if (response.data?.success) {
        navigation.navigate('OTPScreen', {
          isAccountCreated: true,
          token: response.data?.token,
          verificationCode: response.data?.verificationCode,
          signupData: {
            email,
          },
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const errorCheck = useMemo(() => {
    return () => {
      let newErrors = '';
      if (!email) newErrors = 'Please enter email address';
      else if (!regEmail.test(email))
        newErrors = 'Please enter a valid email address';
      setError(newErrors);
    };
  }, [email]);

  useEffect(() => {
    errorCheck();
  }, [errorCheck]);

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => <Header title="Forgot Password" />}
      footerUnScrollable={() => (
        <View style={{paddingHorizontal: 20}}>
          <CustomButton
            title="Send Code"
            onPress={sendOtp}
            loading={loading}
            disabled={error ? true : false}
          />
          <DualText
            title="Remember Password?"
            secondTitle=" Login"
            marginTop={20}
            marginBottom={20}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      )}>
      <ImageFast
        source={Images.forgot}
        style={styles.logo}
        resizeMode="contain"
      />

      <CustomInput
        onChangeText={setEmail}
        value={email}
        error={error}
        placeholder="Enter Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </ScreenWrapper>
  );
};

export default ForgotPass;
const styles = StyleSheet.create({
  logo: {
    width: '70%',
    height: 250,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 60,
  },
});
