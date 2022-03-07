import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

import { DrawerRoutes } from "./DrawerRoutes";
import DrawerContent from "../components/DrawingContent";
import { Home } from "../screens";
import { Text } from "react-native";

const Drawer = createDrawerNavigator<DrawerRoutes>();

const Dashboard = () => <Text>Dashboard</Text>;
const Wallet = () => <Text>Wallet</Text>;
const Budget = () => <Text>Budget</Text>;
const Ethereum = () => <Text>Ethereum</Text>;
const Settings = () => <Text>Settings</Text>;

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#D2D2D2",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "bold",
        },
        drawerActiveTintColor: "#131313",
      }}
      useLegacyImplementation={true}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: () => <Icon name="home" size={24} />,
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="view-dashboard" size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="Wallets"
        component={Wallet}
        options={{
          drawerIcon: () => <Entypo name="wallet" size={24} />,
        }}
      />
      <Drawer.Screen
        name="Budgets"
        component={Budget}
        options={{
          drawerIcon: () => <FontAwesome5 name="money-check" size={20} />,
        }}
      />
      <Drawer.Screen
        name="Ethereum Wallet"
        component={Ethereum}
        options={{
          drawerIcon: () => (
            <MaterialCommunityIcons name="ethereum" size={24} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: () => <Icon name="settings" size={24} />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
