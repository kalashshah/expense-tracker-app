import { ParamListBase, RouteProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { ITransaction } from "../types/Transaction";

export interface DrawerNavigationProps<
  Paramlist extends ParamListBase,
  RouteName extends keyof Paramlist = string
> {
  navigation: DrawerNavigationProp<Paramlist, RouteName>;
  route: RouteProp<Paramlist, RouteName>;
}

export type DrawerRoutes = {
  Settings: undefined;
  Dashboard: undefined;
  Categories: undefined;
  Transaction: undefined;
  AddTransaction: undefined;
  TransactionItem: { item: ITransaction };
};
