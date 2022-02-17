import { createDrawerNavigator } from "@react-navigation/drawer";
import { Text, View } from "react-native";
import { DrawerRoutes } from "../../constants/DrawerRoutes";

const Drawer = createDrawerNavigator<DrawerRoutes>();

const DrawerContent = () => {
  return (
    <View>
      <Text>DrawerContent</Text>
    </View>
  );
};

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

const HomeNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
