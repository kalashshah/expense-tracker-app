import React from "react";
import { StyleSheet, Text, View, Animated } from "react-native";

import RoundedIcon from "./RoundedIcon";
import { ICategory } from "../types/Category";

interface Props {
  category: ICategory;
  scale: Animated.AnimatedInterpolation;
  opacity: Animated.AnimatedInterpolation;
}

const CategoryItem = ({ category, scale, opacity }: Props) => {
  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale }], opacity }]}
    >
      <View style={[styles.icon, { backgroundColor: category.color }]}>
        <RoundedIcon
          name={category.icon}
          backgroundColor={category.color}
          size={30}
          color="white"
        />
      </View>
      <View style={styles.right}>
        <Text style={styles.text}>{category.name}</Text>
      </View>
    </Animated.View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  icon: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  right: {
    flex: 0.8,
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    color: "black",
  },
});
