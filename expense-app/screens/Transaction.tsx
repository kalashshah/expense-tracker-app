import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import Picker from "../components/Picker";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import TransactionList from "../components/TransactionList";
import { ITransaction } from "../types/Transaction";
import ToggleButton from "../components/ToggleButton";

interface Query {
  [key: string]: string;
}

const Transaction = () => {
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [clicked, setClicked] = useState<boolean>(false);
  const [fakeData, setFakeData] = useState<null | ITransaction[]>(null);
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    const getData = async () => {
      const link = "/transactions";
      const apiResponse = await fetch(
        "https://my-json-server.typicode.com/kevintomas1995/logRocket_searchBar/languages"
      );
      const data = await apiResponse.json();
      setFakeData(data);
    };
    getData();
  }, []);

  if (!fakeData) return <Loading />;

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      <Picker />
      <ToggleButton />
      <TransactionList
        searchPhrase={searchPhrase}
        data={fakeData}
        setClicked={setClicked}
      />
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  root: {
    // justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
