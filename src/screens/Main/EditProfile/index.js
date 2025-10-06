import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  Keyboard,
  View,
} from 'react-native';

import ScreenWrapper from '../../../components/ScreenWrapper';
import CustomButton from '../../../components/CustomButton';
import UploadImage from '../../../components/UploadImage';
import CustomInput from '../../../components/CustomInput';
import ImageFast from '../../../components/ImageFast';
import Header from '../../../components/Header';
import Icons from '../../../components/Icons';

import {setUserData} from '../../../store/reducer/usersSlice';
import {uploadAndGetUrl} from '../../../utils/constants';
import {put} from '../../../services/ApiRequest';
import {Images} from '../../../assets/images';
import {COLORS} from '../../../utils/COLORS';

const EditProfile = ({navigation}) => {
  const userData = useSelector(state => state.users.userData);
  const dispatch = useDispatch();
  const keyboardHeight = new Animated.Value(0);

  const [name, setName] = useState(userData?.username || '');
  const [profile, setProfile] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', event => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: event.endCoordinates.height,
        useNativeDriver: false,
      }).start();
    });
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', event => {
      Animated.timing(keyboardHeight, {
        duration: event.duration,
        toValue: 0,
        useNativeDriver: false,
      }).start();
    });
    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const updateProfile = async () => {
    try {
      const body = {
        username: name,
        avatar: profile,
      };
      setLoading(true);
      const res = await put('auth/updatedetails', body);
      dispatch(setUserData(res?.data?.data));

      navigation.goBack();

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      footerUnScrollable={() => (
        <Animated.View
          style={{marginBottom: keyboardHeight, paddingHorizontal: 20}}>
          <CustomButton
            title="Save"
            marginBottom={30}
            onPress={updateProfile}
            loading={loading}
            disabled={!name}
          />
        </Animated.View>
      )}
      headerUnScrollable={() => <Header title="Fill Your Profile" />}>
      <View style={styles.profileContainer}>
        <ImageFast
          source={profile ? {uri: profile} : Images.placeholderUser}
          style={styles.profile}
          loading={profileLoading}
        />
        <UploadImage
          handleChange={async img => {
            setProfileLoading(true);
            const url = await uploadAndGetUrl(img, 'profile');
            setProfile(url);
            setProfileLoading(false);
          }}
          renderButton={onPress => (
            <TouchableOpacity
              onPress={onPress}
              style={styles.edit}
              activeOpacity={0.6}>
              <Icons
                family="MaterialIcons"
                name="edit"
                color={COLORS.black}
                size={20}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <CustomInput
        withLabel="User Name"
        placeholder="Enter"
        value={name}
        onChangeText={setName}
        error={!name ? 'Please Enter User Name' : false}
      />
    </ScreenWrapper>
  );
};

export default EditProfile;
const styles = StyleSheet.create({
  profileContainer: {
    width: 160,
    height: 160,
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  profile: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
  },
  edit: {
    width: 33,
    height: 33,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    right: 8,
    position: 'absolute',
    bottom: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
