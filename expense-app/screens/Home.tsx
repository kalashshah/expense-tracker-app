import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { DrawerNavigationProps, DrawerRoutes } from "../constants/DrawerRoutes";
import useAuth from "../hooks/useAuth";

const Home = ({ navigation }: DrawerNavigationProps<DrawerRoutes, "Home">) => {
  const auth = useAuth();

  return (
    <View>
      <Text>{auth.isLoggedIn}</Text>
      <Text>{auth.token}</Text>
      <Text>{JSON.stringify(auth.user)}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
