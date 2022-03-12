import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ICategory } from "../types/Category";
import RoundedIcon from "./RoundedIcon";
import ToggleButton from "./ToggleButton";

interface Props {
  categories: ICategory[];
  setCategory: React.Dispatch<React.SetStateAction<ICategory | null>>;
  setIsCategoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsIncome: React.Dispatch<React.SetStateAction<boolean>>;
}

const CategoryPicker = ({
  categories,
  setCategory,
  setIsCategoryOpen,
  setIsIncome,
}: Props) => {
  return (
    <Modal style={styles.modal} animationType="fade">
      <View style={styles.toggle}>
        <ToggleButton left="Income" right="Expense" setIsOn={setIsIncome} />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Choose Category</Text>
        <FlatList
          data={categories}
          style={styles.list}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setCategory(item);
                setIsCategoryOpen(false);
              }}
            >
              <View style={styles.item}>
                <RoundedIcon
                  backgroundColor={item.color}
                  name={item.icon}
                  color="white"
                  size={30}
                />
                <Text style={styles.buttonTxt}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          onPress={() => setIsCategoryOpen(false)}
          style={styles.closeBtn}
        >
          <Text style={styles.closeTxt}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CategoryPicker;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  container: {
    justifyContent: "center",
    marginLeft: 50,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
  },
  list: {
    height: "60%",
  },
  listContent: {
    marginHorizontal: "auto",
  },
  buttonTxt: {
    fontSize: 18,
    marginVertical: 15,
    marginLeft: 10,
  },
  closeBtn: {
    marginTop: 30,
  },
  closeTxt: {
    fontSize: 20,
    color: "#24a0ed",
  },
  toggle: {
    width: "100%",
    alignItems: "center",
    paddingTop: 100,
  },
});
