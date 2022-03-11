import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

import { DrawerRoutes } from "../constants/DrawerRoutes";
import { ITransaction } from "../types/Transaction";
import RoundedIcon from "./RoundedIcon";

interface ItemProps {
  item: ITransaction;
  nav: DrawerNavigationProp<DrawerRoutes, "Transaction">;
}

const Item = ({ item, nav }: ItemProps) => (
  <TouchableOpacity
    style={styles.button}
    onPress={() => {
      nav.navigate("TransactionItem", { item });
    }}
  >
    <View style={styles.item}>
      <RoundedIcon
        size={40}
        color="white"
        name={item.category.icon}
        backgroundColor={item.category.color}
      />
      <View style={styles.text}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text
          style={[
            styles.amount,
            { color: item.type === "income" ? "#2E8B57" : "#DC143C" },
          ]}
        >
          ₹{item.amount}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

interface ListProps {
  data: ITransaction[];
  nav: DrawerNavigationProp<DrawerRoutes, "Transaction">;
}

const TransactionList = ({ data, nav }: ListProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item {...{ item, nav }} />}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    height: "80%",
    width: "100%",
    padding: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "black",
    opacity: 0.5,
  },
  button: {
    marginBottom: 25,
  },
  amountContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  amount: {
    textAlign: "right",
    fontSize: 18,
    fontWeight: "bold",
  },
});
