import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

// screens
import AllowNotification from "../screens/Auth/AllowNotification";
import WelcomeScreen from "../screens/Main/WelcomeScreen/Index";
import SignUpScreens from "../screens/Auth/SignUpScreens/Index";
import ConfirmPinCode from "../screens/Auth/ConfirmPinCode";
import PinOnBoarding from "../screens/Auth/PinOnBoarding";
import LoginPass from "../screens/Auth/Login/LoginPass";
import PersonalAds from "../screens/Auth/PersonalAds";
import LoginPin from "../screens/Auth/Login/LoginPin";
import OnBoarding from "../screens/Auth/OnBoarding";
import ForgotPass from "../screens/Auth/ForgotPass";
import GetStarted from "../screens/Auth/GetStarted";
import OTPScreen from "../screens/Auth/OTPScreen";
import Password from "../screens/Auth/Password";
import NewPass from "../screens/Auth/NewPass";
import Profile from "../screens/Auth/Profile";
import PinCode from "../screens/Auth/PinCode";
import Login from "../screens/Auth/Login";
import Success from "../screens/Success";
import VTCChauffeur from "../screens/Auth/VTCChauffeur";
import VerifyIdentity from "../screens/Auth/VTCChauffeur/VerifyIdentity";
import TakePhoto from "../screens/Auth/VTCChauffeur/TakePhoto";
import TakeIDFront from "../screens/Auth/VTCChauffeur/TakeIDFront";
import TakeIDBack from "../screens/Auth/VTCChauffeur/TakeIDBack";
import CompleteProfile from "../screens/Auth/VTCChauffeur/CompleteProfile";
import PicLocation from "../screens/Auth/PicLocation";
import Instruments from "../screens/Auth/SignUpScreens/Instruments";
import Level from "../screens/Auth/SignUpScreens/Level";
import Genres from "../screens/Auth/SignUpScreens/Genres";
import Artists from "../screens/Auth/SignUpScreens/Artists";
import AddPictures from "../screens/Auth/SignUpScreens/AddPictures";
import AddDescription from "../screens/Auth/SignUpScreens/AddDescription";
import GooglePlaces from "../components/CustomModalGooglePlaces";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const loginValue = useSelector((state) => state.users.loginValue);
  const isToken = useSelector((state) => state.authConfig.token);
  const user = useSelector((state) => state.users.userData);

  const missingInstruments =
    !user?.Instruments || user.Instruments.length === 0;
  const missingArtists = !user?.Artists || user.Artists.length === 0;
  const missingGenres = !user?.Genres || user.Genres.length === 0;
  const missingImages = !user?.pictures || user.pictures.length === 0;

  let initialRoute = "OnBoarding";
  if (isToken && missingInstruments) {
    initialRoute = "Instruments";
  } else if (isToken && missingGenres) {
    initialRoute = "Genres";
  } else if (isToken && missingArtists) {
    initialRoute = "Artists";
  } else if (isToken && missingImages) {
    initialRoute = "AddPictures";
  }
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
      <Stack.Screen name="LoginPass" component={LoginPass} />
      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="LoginPin" component={LoginPin} />

      <Stack.Screen name="OTPScreen" component={OTPScreen} />
      <Stack.Screen name="SignUpScreens" component={SignUpScreens} />
      <Stack.Screen name="AllowNotification" component={AllowNotification} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="PersonalAds" component={PersonalAds} />
      <Stack.Screen name="ForgotPass" component={ForgotPass} />
      <Stack.Screen name="PinOnBoarding" component={PinOnBoarding} />
      <Stack.Screen name="PinCode" component={PinCode} />
      <Stack.Screen name="Password" component={Password} />
      <Stack.Screen name="ConfirmPinCode" component={ConfirmPinCode} />
      <Stack.Screen name="NewPass" component={NewPass} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Success" component={Success} />
      <Stack.Screen name="VTCChauffeur" component={VTCChauffeur} />
      <Stack.Screen name="VerifyIdentity" component={VerifyIdentity} />
      <Stack.Screen name="TakePhoto" component={TakePhoto} />
      <Stack.Screen name="TakeIDBack" component={TakeIDBack} />
      <Stack.Screen name="TakeIDFront" component={TakeIDFront} />
      <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
      <Stack.Screen name="PicLocation" component={PicLocation} />
      <Stack.Screen name="Instruments" component={Instruments} />
      <Stack.Screen name="Level" component={Level} />
      <Stack.Screen name="Genres" component={Genres} />
      <Stack.Screen name="Artists" component={Artists} />
      <Stack.Screen name="AddPictures" component={AddPictures} />
      <Stack.Screen name="AddDescription" component={AddDescription} />
      <Stack.Screen name="GooglePlaces" component={GooglePlaces} />
    </Stack.Navigator>
  );
};

export default AuthStack;
