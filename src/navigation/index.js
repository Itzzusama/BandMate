import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const isToken = useSelector((state) => state.authConfig.token);
  const user = useSelector((state) => state.users.userData);

  const isBandIncomplete = () => {
    const missingInstruments =
      !user?.Instruments || user.Instruments.length === 0;
    const missingArtists = !user?.Artists || user.Artists.length === 0;
    const missingGenres = !user?.Genres || user.Genres.length === 0;
    const missingImages = !user?.pictures || user.pictures.length === 0;
    return missingInstruments || missingArtists || missingGenres;
  };

  const shouldGoToAuth = isToken && isBandIncomplete();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      {isToken ? (
        shouldGoToAuth ? (
          <>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainStack" component={MainStack} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainStack" component={MainStack} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </>
        )
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
