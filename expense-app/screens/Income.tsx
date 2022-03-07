import React from "react";
import { StyleSheet, Text, View } from "react-native";

import {
  MaterialTopTabNavigationProps,
  CategoryRoutes,
} from "../constants/CategoryTopRoutes";

const Categories = ({
  navigation,
}: MaterialTopTabNavigationProps<CategoryRoutes, "Income">) => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
