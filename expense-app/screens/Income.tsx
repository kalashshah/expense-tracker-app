import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import {
  MaterialTopTabNavigationProps,
  CategoryRoutes,
} from "../constants/CategoryTopRoutes";
import ActionButton from "../components/ActionButton";
import CategoryModal from "../components/CategoryModal";
import axiosInstance from "../services/axiosInstance";

const Income = ({
  navigation,
}: MaterialTopTabNavigationProps<CategoryRoutes, "Income">) => {
  useEffect(() => {
    axiosInstance.get("/category/income").then((res) => {
      console.log(res.data);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-100}
      behavior="height"
      collapsable={false}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
          <Text>Hello</Text>
        </View>
      </ScrollView>
      <ActionButton type="income" modal={CategoryModal} />
    </KeyboardAvoidingView>
  );
};

export default Income;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
