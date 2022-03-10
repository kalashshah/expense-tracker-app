import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
import { ITransaction } from "../types/Transaction";

interface ItemProps {
  name: string;
  description: string;
}

const Item = ({ name, description }: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text>{description}</Text>
  </View>
);

interface ListProps {
  data: ITransaction[];
}

const TransactionList = ({ data }: ListProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            const { name, description } = item;
            return <Item name={name} description={description} />;
          }}
          keyExtractor={(item) => item._id}
        />
      </View>
    </SafeAreaView>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    height: "80%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});
