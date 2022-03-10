import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

interface Props {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
  searchPhrase: string;
  setSearchPhrase: (searchPhrase: string) => void;
}

const SearchBar = ({
  clicked,
  searchPhrase,
  setSearchPhrase,
  setClicked,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={[clicked ? styles.clicked : styles.notClicked, styles.view]}>
        <Feather
          name="search"
          size={20}
          color="black"
          style={styles.searchIcon}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{ padding: 1 }}
            onPress={() => {
              setSearchPhrase("");
            }}
          />
        )}
      </View>
      {clicked && (
        <View>
          <TouchableWithoutFeedback
            style={styles.cancelButton}
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          >
            <Text>Cancel</Text>
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "80%",
  },
  view: {
    padding: 10,
    flexDirection: "row",
    backgroundColor: "#d9dbda",
    alignItems: "center",
    borderRadius: 15,
  },
  notClicked: {
    width: "95%",
  },
  clicked: {
    width: "80%",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
  searchIcon: {
    marginLeft: 1,
  },
  cancelButton: {
    margin: 5,
  },
});
