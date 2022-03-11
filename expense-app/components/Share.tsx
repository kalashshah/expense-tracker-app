import React from "react";
import {
  Share as ShareAPI,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

const Share = () => {
  const onShare = async () => {
    try {
      const result = await ShareAPI.share({
        title: "Expense Tracker",
        message:
          "Unsure of how to manage your expenses? Try this expense tracker with custom categories and amazing graphs to analyse your money. Do give it a star on github if you liked the application, https://github.com/kalashshah/expense-tracker-app",
        url: "https://github.com/kalashshah/expense-tracker-app",
      });
      if (result.action === ShareAPI.sharedAction) {
        console.log("Share was successful");
      } else if (result.action === ShareAPI.dismissedAction) {
        console.log("Share was dismissed");
      }
    } catch (error) {}
  };
  return (
    <TouchableOpacity style={styles.button} onPress={onShare}>
      <Entypo name="share" size={22} />
      <Text style={styles.buttonText}>Share</Text>
    </TouchableOpacity>
  );
};

export default Share;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
  },
});
