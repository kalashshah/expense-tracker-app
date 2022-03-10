import React from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";

interface Props {
  searchPhrase: string;
  setClicked: (clicked: boolean) => void;
}

const Item = ({ name, details }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
  </View>
);

const TransactionList = ({ searchPhrase, setClicked, data }) => {
  const renderItem = ({ item }) => {
    if (searchPhrase === "") {
      return <Item name={item.name} details={item.details} />;
    }
    if (
      item.name
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
    if (
      item.details
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ""))
    ) {
      return <Item name={item.name} details={item.details} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        onStartShouldSetResponder={() => {
          setClicked(false);
          return false;
        }}
      >
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
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
