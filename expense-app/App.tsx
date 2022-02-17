import React, { useEffect, useState } from "react";
import { LayoutAnimation } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppRoutes } from "./constants/AppRoutes";
import {
  AuthenticationNavigator,
  HomeNavigator,
} from "./components/Navigation";
import axiosInstance from "./services/axiosInstance";

const AppStack = createStackNavigator<AppRoutes>();

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        const { data } = await axiosInstance.get("/");
        LayoutAnimation.easeInEaseOut();
        setData(data);
      };
      getData();
    }, 3000);
  }, []);

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
