import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Animated,
  SafeAreaView,
} from "react-native";

import {
  MaterialTopTabNavigationProps,
  CategoryRoutes,
} from "../constants/CategoryTopRoutes";
import ActionButton from "../components/ActionButton";
import CategoryModal from "../components/CategoryModal";
import CategoryItem from "../components/CategoryItem";
import axiosInstance from "../services/axiosInstance";
import { ICategory } from "../types/Category";
import Loading from "../components/Loading";

const SIZE = 85;

const Category = ({
  route,
  navigation,
}: MaterialTopTabNavigationProps<CategoryRoutes, "Income">) => {
  const [categories, setCategories] = useState<null | ICategory[]>(null);
  const scrollY: Animated.Value = useRef(new Animated.Value(0)).current;
  const { type } = route.params;

  useEffect(() => {
    axiosInstance
      .get(`/category/${type}`)
      .then((res) => {
        setCategories(res.data);
      })
      .catch(() => {});
  }, []);

  if (!categories) return <Loading />;

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={-100}
      behavior="height"
      collapsable={false}
      style={styles.view}
    >
      <View style={styles.container}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          data={categories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => {
            const scale = scrollY.interpolate({
              inputRange: [-1, 0, SIZE * index, SIZE * (index + 3)],
              outputRange: [1, 1, 1, 0],
            });

            const opacity = scrollY.interpolate({
              inputRange: [-1, 0, SIZE * index, SIZE * (index + 1)],
              outputRange: [1, 1, 1, 0],
            });

            return (
              <CategoryItem category={item} scale={scale} opacity={opacity} />
            );
          }}
          contentContainerStyle={styles.list}
        />
      </View>
      <ActionButton type={type} modal={CategoryModal} />
    </KeyboardAvoidingView>
  );
};

export default Category;

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  list: {
    padding: 20,
    paddingBottom: 10,
  },
});
