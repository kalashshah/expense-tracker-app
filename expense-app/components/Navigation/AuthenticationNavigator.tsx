import { createStackNavigator } from "@react-navigation/stack";
import { Text } from "react-native";
import { AuthenticationRoutes } from "../../constants/AuthenticationRoutes";
import { Onboard } from "../../screens";

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

const Login = () => {
  return <Text>Login</Text>;
};

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      {/* , animationEnabled: false */}
      <AuthenticationStack.Screen name="Onboard" component={Onboard} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
