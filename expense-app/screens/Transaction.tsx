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
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  let cancelToken: CancelTokenSource;

  useEffect(() => {
    if (cancelToken) cancelToken.cancel("Cancelled");
    cancelToken = axios.CancelToken.source();
    setPage(1);
    setReachedEnd(false);

    const link = `/transaction/${isIncome ? "income" : "expense"}`;
    axiosInstance
      .get(link, {
        params: {
          ...(searchPhrase !== "" ? { search: searchPhrase } : {}),
          date: getDate(selected),
          page: 1,
        },
        cancelToken: cancelToken.token,
      })
      .then((res) => setTransactions(res.data))
      .catch(() => {});
  }, [isIncome, selected, searchPhrase]);

  useEffect(() => {
    console.log("reached end", reachedEnd);
    console.log("page", page);
    const link = `/transaction/${isIncome ? "income" : "expense"}`;
    axiosInstance
      .get(link, {
        params: {
          ...(searchPhrase !== "" ? { search: searchPhrase } : {}),
          date: getDate(selected),
          page,
        },
      })
      .then((res) => {
        setTransactions((current) => {
          if (current === null || res.data === undefined) {
            setReachedEnd(true);
            return [];
          } else if (res.data.length === 0) {
            setReachedEnd(true);
            return current;
          }
          const transactions: any = {};
          if (res.data.length < 10) setReachedEnd(true);
          [...current, ...(res.data as ITransaction[])].forEach(
            (transaction) => (transactions[transaction._id] = transaction)
          );
          return Object.values(transactions);
        });
      })
      .catch(() => {});
  }, [page]);

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
      <TransactionList
        data={transactions}
        nav={navigation}
        endReached={() => {
          if (!reachedEnd) setPage((page) => page + 1);
        }}
      />
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
