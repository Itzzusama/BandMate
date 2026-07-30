import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InboxScreen from "../screens/Main/Chat/InboxScreen";
import ReportChat from "../screens/Main/Chat/ReportChat";
import FilterScreen from "../screens/Main/Home/FilterScreen";
import Notification from "../screens/Main/Notification";

import TermsConditions from "../screens/Main/TermsConditions";

import Detail from "../screens/Main/Detail";
import SearchEvent from "../screens/Main/Event/SearchEvent";
import SampleScreen from "../screens/Main/Home/molecules/SampleScreen";
import AddSocials from "../screens/Main/Notification/AddSocials";
import PublishPost from "../screens/Main/PublishPost/Index";
import Settings from "../screens/Main/Settings";
import AdvancedNotification from "../screens/Main/Settings/AdvancedNotification";
import ChangePassword from "../screens/Main/Settings/ChangePassword";
import AdvancedSettings from "../screens/Main/Settings/AdvancedSettings";
import PreferredAddressing from "../screens/Main/Settings/PreferredAddressing";
import PreferredUnits from "../screens/Main/Settings/PreferredUnits";
import TemperatureScale from "../screens/Main/Settings/TemperatureScale";
import FirstDayOfWeek from "../screens/Main/Settings/FirstDayOfWeek";
import DateFormat from "../screens/Main/Settings/DateFormat";
import PreferredCurrency from "../screens/Main/Settings/PreferredCurrency";
import PreferredTimezone from "../screens/Main/Settings/PreferredTimezone";
import ServiceProviderPreference from "../screens/Main/Settings/ServiceProviderPreference";
import PreferredMap from "../screens/Main/Settings/PreferredMap";
import Plans from "../screens/Main/Settings/Plans";
import Preferences from "../screens/Main/Settings/Preferences";
import TabStack from "./TabStack";

import AppLanguage from "../screens/Main/Settings/AppLanguage";
import PicLocation from "../screens/Auth/PicLocation";
import SongsList from "../screens/Main/SongsList";
import CreateEvent from "../screens/Main/CreateEvent";
import AddSponsor from "../screens/Main/CreateEvent/AddSponsor";
import Branding from "../screens/Main/CreateEvent/Branding";
import FoodBeverage from "../screens/Main/CreateEvent/FoodBeverage";
import TicketDetail from "../screens/Main/CreateEvent/TicketDetail";
import EventDetail from "../screens/Main/EventDetails";
import GooglePlaces from "../components/CustomModalGooglePlaces";
import Availability from "../screens/Main/Settings/Availability";
import LookingFor from "../screens/Main/Settings/LookingFor";
import AddItems from "../screens/Main/CreateEvent/AddItems";
import SocialsAccount from "../screens/Main/SocialsAccount";
import AddAccount from "../screens/Main/SocialsAccount/AddAccount";
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="TabStack" component={TabStack} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="AddSocials" component={AddSocials} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="SearchEvent" component={SearchEvent} />
      <Stack.Screen name="Plans" component={Plans} />
      <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
      <Stack.Screen
        name="PreferredAddressing"
        component={PreferredAddressing}
      />
      <Stack.Screen name="PreferredUnits" component={PreferredUnits} />
      <Stack.Screen name="TemperatureScale" component={TemperatureScale} />
      <Stack.Screen name="FirstDayOfWeek" component={FirstDayOfWeek} />
      <Stack.Screen name="DateFormat" component={DateFormat} />
      <Stack.Screen name="PreferredCurrency" component={PreferredCurrency} />
      <Stack.Screen name="PreferredTimezone" component={PreferredTimezone} />
      <Stack.Screen
        name="ServiceProviderPreference"
        component={ServiceProviderPreference}
      />
      <Stack.Screen name="PreferredMap" component={PreferredMap} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PublishPost" component={PublishPost} />
      <Stack.Screen name="SampleScreen" component={SampleScreen} />
      <Stack.Screen
        name="AdvancedNotification"
        component={AdvancedNotification}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="AppLanguage" component={AppLanguage} />
      <Stack.Screen name="PicLocation" component={PicLocation} />
      <Stack.Screen name="SongsList" component={SongsList} />
      <Stack.Screen name="ReportChat" component={ReportChat} />

      {/* create events screens */}
      <Stack.Screen name="CreateEvent" component={CreateEvent} />
      <Stack.Screen name="AddSponsor" component={AddSponsor} />
      <Stack.Screen name="Branding" component={Branding} />
      <Stack.Screen name="FoodBeverage" component={FoodBeverage} />
      <Stack.Screen name="TicketDetail" component={TicketDetail} />
      <Stack.Screen name="EventDetail" component={EventDetail} />
      <Stack.Screen name="GooglePlaces" component={GooglePlaces} />
      <Stack.Screen name="Availability" component={Availability} />
      <Stack.Screen name="LookingFor" component={LookingFor} />
      <Stack.Screen name="AddItems" component={AddItems} />
      <Stack.Screen name="SocialsAccount" component={SocialsAccount} />
      <Stack.Screen name="AddAccount" component={AddAccount} />
    </Stack.Navigator>
  );
};

export default MainStack;
