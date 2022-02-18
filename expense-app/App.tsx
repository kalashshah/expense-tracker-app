import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppRoutes } from "./constants/AppRoutes";
import { DrawerRoutes } from "./constants/DrawerRoutes";
import { AuthenticationRoutes } from "./constants/AuthenticationRoutes";

import { Onboard, Login } from "./screens";
import useFirstLaunch from "./hooks/useFirstLaunch";
import Loading from "./components/Loading";

const AppStack = createStackNavigator<AppRoutes>();
const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();
const Drawer = createDrawerNavigator<DrawerRoutes>();

const DrawerContent = () => {
  return <Text>DrawerContent</Text>;
};
const Home = () => {
  return <Text>Home</Text>;
};

const App = () => {
  const isFirstLaunch = useFirstLaunch();
  console.log(isFirstLaunch);

  if (isFirstLaunch === null) {
    return <Loading />;
  }

  const AuthenticationNavigator = () => {
    return (
      <AuthenticationStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? "Onboard" : "Login"}
      >
        <AuthenticationStack.Screen name="Onboard" component={Onboard} />
        <AuthenticationStack.Screen name="Login" component={Login} />
      </AuthenticationStack.Navigator>
    );
  };

  const HomeNavigator = () => {
    return (
      <Drawer.Navigator drawerContent={DrawerContent}>
        <Drawer.Screen name="Home" component={Home} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          <AppStack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />
          <AppStack.Screen name="Home" component={HomeNavigator} />
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default App;
