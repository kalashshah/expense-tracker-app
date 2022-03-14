import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppRoutes } from "./constants/AppRoutes";
import { AuthenticationRoutes } from "./constants/AuthenticationRoutes";
import MainNavigator from "./constants/MainNavigator";

import { Onboard, Login, Signup } from "./screens";
import useFirstLaunch from "./hooks/useFirstLaunch";
import Loading from "./components/Loading";
import AuthContextProvider from "./store/AuthContext";
import useStart from "./hooks/useStart";
import useAuth from "./hooks/useAuth";

const AppStack = createStackNavigator<AppRoutes>();
const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

const App = () => {
  const isFirstLaunch = useFirstLaunch();
  const { isLoggedIn, token, user } = useStart();
  const auth = useAuth();

  const login = async () => {
    if (isLoggedIn && token && user) {
      await auth.login(token, user);
    }
  };

  useEffect(() => {
    login();
  }, [isLoggedIn, isFirstLaunch, token, user]);

  if (isFirstLaunch === null || isLoggedIn === null) return <Loading />;

  const AuthenticationNavigator = () => {
    return (
      <AuthenticationStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isFirstLaunch ? "Onboard" : "Login"}
      >
        <AuthenticationStack.Screen name="Onboard" component={Onboard} />
        <AuthenticationStack.Screen name="Login" component={Login} />
        <AuthenticationStack.Screen name="Signup" component={Signup} />
      </AuthenticationStack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <AppStack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? "Main" : "Authentication"}
        >
          <AppStack.Screen
            name="Authentication"
            component={AuthenticationNavigator}
          />
          <AppStack.Screen name="Main" component={MainNavigator} />
        </AppStack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default function AppWrapper() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}
