import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import axios, { CancelTokenSource } from "axios";

import { DrawerNavigationProps, DrawerRoutes } from "../constants/DrawerRoutes";
import Picker from "../components/Picker";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import ToggleButton from "../components/ToggleButton";
import { getDate } from "../constants/TransactionData";
import axiosInstance from "../services/axiosInstance";
import { ITransaction } from "../types/Transaction";

const Transaction = ({
  navigation,
}: DrawerNavigationProps<DrawerRoutes, "Transaction">) => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<null | ITransaction[]>(null);
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  let cancelToken: CancelTokenSource;

  useEffect(() => {
    if (cancelToken) cancelToken.cancel("Cancelled");
    cancelToken = axios.CancelToken.source();

    const link = `/transaction/${isIncome ? "income" : "expense"}`;
    axiosInstance
      .get(link, {
        params: {
          ...(searchPhrase !== "" ? { search: searchPhrase } : {}),
          date: getDate(selected),
          page,
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => setTransactions(res.data))
      .catch(() => {});
  }, [isIncome, selected, searchPhrase]);

  if (!transactions) return <Loading />;

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <Picker {...{ selected, setSelected }} />
      <View style={styles.button}>
        <ToggleButton left="Income" right="Expense" setIsOn={setIsIncome} />
      </View>
      <TransactionList data={transactions} nav={navigation} />
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginTop: 100,
    position: "absolute",
    alignItems: "center",
  },
});
