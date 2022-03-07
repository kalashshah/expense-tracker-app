import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DrawerNavigationProps, DrawerRoutes } from "../constants/DrawerRoutes";
import axiosInstance from "../services/axiosInstance";
import useAuth from "../hooks/useAuth";
import { ITransaction } from "../types/Transaction";

const Home = ({ navigation }: DrawerNavigationProps<DrawerRoutes, "Home">) => {
  const auth = useAuth();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const date = new Date();

  const getData = async () => {
    try {
      const response = await axiosInstance.get("/transaction/all/1");
      setTransactions(response.data);
    } catch (error) {
      // navigation.navigate("Error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      <Text>{date.getFullYear()}</Text>
      <Text>{date.getMonth()}</Text>
      {transactions.map((transaction) => (
        <Text>{transaction.name}</Text>
      ))}
      <Text>{JSON.stringify(auth.user)}</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
