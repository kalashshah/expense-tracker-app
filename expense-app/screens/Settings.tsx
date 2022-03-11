import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React from "react";

const Settings = () => {
  return (
    <View>
      <View>
        <Text>Currency: Rupees ₹</Text>
      </View>
      <TouchableWithoutFeedback>
        <Text>Change currency</Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
