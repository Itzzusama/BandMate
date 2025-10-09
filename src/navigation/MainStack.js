import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InboxScreen from "../screens/Main/Chat/InboxScreen";
import ReportChat from "../screens/Main/Chat/ReportChat";
import Equipments from "../screens/Main/Home/Equipments";
import FilterScreen from "../screens/Main/Home/FilterScreen";
import Notification from "../screens/Main/Notification";
import Profile from "../screens/Main/Profile";
import { default as AiAssistant } from "../screens/Main/Profile/AiAssistantNew";
import ChangePassword from "../screens/Main/Profile/ChangePassword";
import ChangePinCode from "../screens/Main/Profile/ChangePinCode";
import Community from "../screens/Main/Profile/Community";
import ConfirmPassword from "../screens/Main/Profile/ConfirmPassword";
import CreatePassword from "../screens/Main/Profile/CreatePassword";
import Donations from "../screens/Main/Profile/Donations";
import EditProfile from "../screens/Main/Profile/EditProfile";
import InviteFriends from "../screens/Main/Profile/InviteFriends";
import Languages from "../screens/Main/Profile/Languages";
import MyFriends from "../screens/Main/Profile/MyFriends";
import MyProfile from "../screens/Main/Profile/MyProfile";
import PlanScreen from "../screens/Main/Profile/PlanScreen";
import PreferAddressing from "../screens/Main/Profile/PreferAddressing";
import Preferences from "../screens/Main/Profile/Preferences";
import PreferredCurrency from "../screens/Main/Profile/PreferredCurrency";
import PreferredDateFormat from "../screens/Main/Profile/PreferredDateFormat";
import PreferredFirstDayOfWeek from "../screens/Main/Profile/PreferredFirstDayOfWeek";
import PreferredLanguage from "../screens/Main/Profile/PreferredLanguage";
import PreferredMap from "../screens/Main/Profile/PreferredMap";
import PreferredServiceProviders from "../screens/Main/Profile/PreferredServiceProviders";
import PreferredTemperature from "../screens/Main/Profile/PreferredTemperature";
import PreferredUnits from "../screens/Main/Profile/PreferredUnits";
import PromoCode from "../screens/Main/Profile/PromoCode";
import QrScreen from "../screens/Main/Profile/QrScreen";
import QuickSelection from "../screens/Main/Profile/QuickSelection";
import ReferApp from "../screens/Main/Profile/ReferApp";
import Security from "../screens/Main/Profile/Security";
import UserAddress from "../screens/Main/Profile/UserAddress";
import TermsConditions from "../screens/Main/TermsConditions";

import AddSocials from "../screens/Main/Notification/AddSocials";
import YourTripsScreen from "../screens/Main/YourTripsScreen";
import SellingAVehicle from "../screens/ServiceProviderAuth/AsPro/SellingAVehicle";
import TabStack from "./TabStack";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="TabStack"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="InviteFriends" component={InviteFriends} />
      <Stack.Screen name="MyProfile" component={MyProfile} />
      <Stack.Screen name="QuickSelection" component={QuickSelection} />
      <Stack.Screen name="Community" component={Community} />
      <Stack.Screen name="Donations" component={Donations} />
      <Stack.Screen name="Languages" component={Languages} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
     

      <Stack.Screen name="SellingAVehicle" component={SellingAVehicle} />

     
      <Stack.Screen
        name="YourTripsScreen"
        component={YourTripsScreen}
        options={{
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen name="UserAddress" component={UserAddress} />
      <Stack.Screen name="Equipments" component={Equipments} />
      


      <Stack.Screen name="MyFriends" component={MyFriends} />

      {/* setting screens  */}
      <Stack.Screen name="PromoCode" component={PromoCode} />
      <Stack.Screen name="ReferApp" component={ReferApp} />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
      <Stack.Screen name="ChangePinCode" component={ChangePinCode} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="PreferAddressing" component={PreferAddressing} />
      <Stack.Screen name="AiAssistant" component={AiAssistant} />
      <Stack.Screen name="PreferredCurrency" component={PreferredCurrency} />
      <Stack.Screen name="PreferredLanguage" component={PreferredLanguage} />
      <Stack.Screen name="PreferredMap" component={PreferredMap} />
      <Stack.Screen name="PreferredUnits" component={PreferredUnits} />
      <Stack.Screen
        name="PreferredTemperature"
        component={PreferredTemperature}
      />
      <Stack.Screen
        name="PreferredFirstDayOfWeek"
        component={PreferredFirstDayOfWeek}
      />
      <Stack.Screen
        name="PreferredDateFormat"
        component={PreferredDateFormat}
      />
      <Stack.Screen
        name="PreferredServiceProviders"
        component={PreferredServiceProviders}
      />
      <Stack.Screen name="PlanScreen" component={PlanScreen} />
      <Stack.Screen name="ReportChat" component={ReportChat} />

 
      <Stack.Screen name="QrScreen" component={QrScreen} />

     
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="AddSocials" component={AddSocials} />
    </Stack.Navigator>
  );
};

export default MainStack;
