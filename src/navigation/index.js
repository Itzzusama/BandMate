import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const isToken = useSelector((state) => state.authConfig.token);

  return (
    <Stack.Navigator
      initialRouteName="MainStack"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {/* <Stack.Screen name="MainStack" component={MainStack} />
      <Stack.Screen name="AuthStack" component={AuthStack} /> */}

      {isToken ? (
        <>
          <Stack.Screen name="MainStack" component={MainStack} />
          <Stack.Screen name="AuthStack" component={AuthStack} />
        </>
      ) : (
        <>
          <Stack.Screen name="AuthStack" component={AuthStack} />
          <Stack.Screen name="MainStack" component={MainStack} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootNavigation;
