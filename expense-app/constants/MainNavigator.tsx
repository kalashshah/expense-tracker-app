import React from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  MaterialIcons as Icon,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { DrawerRoutes } from "./DrawerRoutes";
import { CategoryRoutes } from "./CategoryTopRoutes";
import DrawerContent from "../components/DrawerContent";
import {
  Home,
  Category,
  Transaction,
  TransactionItem,
  Dashboard,
  Settings,
} from "../screens";

const Drawer = createDrawerNavigator<DrawerRoutes>();
const TopTab = createMaterialTopTabNavigator<CategoryRoutes>();

const Ethereum = () => <Text>Ethereum</Text>;

const CategoryTabNavigator = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Income"
      screenOptions={{
        tabBarActiveTintColor: "#CF291D",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: "#CF291D" },
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <TopTab.Screen
        name="Income"
        component={Category}
        initialParams={{ type: "income" }}
      />
      <TopTab.Screen
        name="Expense"
        component={Category}
        initialParams={{ type: "expense" }}
      />
    </TopTab.Navigator>
  );
};

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
        name="Categories"
        component={CategoryTabNavigator}
        options={{
          drawerIcon: () => <Icon name="category" size={24} />,
        }}
      />
      <Drawer.Screen
        name="Transaction"
        component={Transaction}
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
      <Drawer.Screen
        name="TransactionItem"
        component={TransactionItem}
        options={{
          drawerItemStyle: { display: "none" },
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
