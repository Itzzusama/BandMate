import { createNativeStackNavigator } from "@react-navigation/native-stack";
import InboxScreen from "../screens/Main/Chat/InboxScreen";
import FilterScreen from "../screens/Main/Home/FilterScreen";
import Notification from "../screens/Main/Notification";

import TermsConditions from "../screens/Main/TermsConditions";

import AddSocials from "../screens/Main/Notification/AddSocials";
import TabStack from "./TabStack";
import Detail from "../screens/Main/Detail";
import SearchEvent from "../screens/Main/Event/SearchEvent";
import Plans from "../screens/Main/Settings/Plans";
import AdvancedSettings from "../screens/Main/Settings/AdvancedSettings";
import Preferences from "../screens/Main/Settings/Preferences";
import Settings from "../screens/Main/Settings";
import PublishPost from "../screens/Main/PublishPost/Index";
import AdvancedNotification from "../screens/Main/Settings/AdvancedNotification";
import ChangePassword from "../screens/Main/Settings/ChangePassword";

import AppLanguage from "../screens/Main/Settings/AppLanguage";
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
      <Stack.Screen name="FilterScreen" component={FilterScreen} />
      <Stack.Screen name="AddSocials" component={AddSocials} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="SearchEvent" component={SearchEvent} />
      <Stack.Screen name="Plans" component={Plans} />
      <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
      <Stack.Screen name="Preferences" component={Preferences} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="PublishPost" component={PublishPost} />
      <Stack.Screen
        name="AdvancedNotification"
        component={AdvancedNotification}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="AppLanguage" component={AppLanguage} />
    </Stack.Navigator>
  );
};

export default MainStack;
