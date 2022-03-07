import { ParamListBase, RouteProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export interface MaterialTopTabNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string
> {
  navigation: MaterialTopTabNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export type CategoryRoutes = {
  Income: undefined;
  Expense: undefined;
};
