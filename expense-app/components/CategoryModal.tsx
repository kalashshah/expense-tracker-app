import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";

import { categoryColors, categoryIcons } from "../constants/CategoryData";
import axiosInstance from "../services/axiosInstance";
import Button from "./Button";
import RoundedIcon from "./RoundedIcon";
import TextInputField from "./TextInputField";
import { IAddCategory } from "../types/Category";

export interface ModalProps {
  visible: boolean;
  type: "income" | "expense";
  onComplete: () => void;
}

const CategoryModal = ({ visible, type, onComplete }: ModalProps) => {
  const [color, setColor] = useState<number>(0);
  const [icon, setIcon] = useState<number>(0);

  const animate: Animated.Value = useRef(new Animated.Value(0)).current;
  const modal = {
    transform: [
      { scale: animate },
      {
        translateY: animate.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0],
        }),
      },
    ],
  };

  useEffect(() => {
    Animated.spring(animate, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const AddCategorySchema = yup.object().shape({
    name: yup
      .string()
      .required("Category name is required")
      .min(2, "Category name must be at least 2 characters")
      .max(20, "Category name must have less than 20 characters"),
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    validationSchema: AddCategorySchema,
    initialValues: { name: "", check: "" },
    onSubmit: (values: IAddCategory, { setFieldError, setSubmitting }) => {
      const submit = async () => {
        const data = {
          name: values.name,
          icon: categoryIcons[icon],
          color: categoryColors[color],
          type,
        };
        try {
          await axiosInstance.post("/category/add", data);
          onComplete();
          setSubmitting(false);
        } catch (error) {
          const err = (error as AxiosError).response?.data;
          if (err) setFieldError("check", err);
          else setFieldError("check", "Oops! Something went wrong");
          setSubmitting(false);
        }
      };
      submit();
    },
  });

  return (
    <>
      {visible && (
        <View style={styles.modal}>
          <Animated.View style={[styles.container, modal]}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>
                {`Add ${type} Category`.toUpperCase()}
              </Text>
            </View>
            <View style={styles.preview}>
              <View
                style={[
                  styles.iconPreview,
                  { backgroundColor: categoryColors[color] },
                ]}
              >
                <RoundedIcon
                  name={categoryIcons[icon]}
                  size={40}
                  color="white"
                  backgroundColor={categoryColors[color]}
                />
              </View>
              <View style={styles.input}>
                <TextInputField
                  width="100%"
                  placeholder="Enter Category Name"
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  error={errors.name}
                  touched={touched.name}
                  autoCapitalize="words"
                />
              </View>
            </View>
            <Text style={styles.subtitle}>Category Color</Text>
            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoryColors}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Pressable
                    style={[styles.circle, { backgroundColor: item }]}
                    onPress={() => setColor(index)}
                  >
                    {color === index && (
                      <View style={styles.check}>
                        <RoundedIcon
                          name="check"
                          color="white"
                          size={22}
                          backgroundColor="transparent"
                        />
                      </View>
                    )}
                  </Pressable>
                )}
              />
            </View>
            <Text style={styles.subtitle}>Category Icon</Text>
            <View style={styles.listContainer}>
              <FlatList
                style={styles.list}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoryIcons}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <Pressable
                    style={[styles.iconCircle, { backgroundColor: "black" }]}
                    onPress={() => setIcon(index)}
                  >
                    <RoundedIcon
                      name={categoryIcons[index]}
                      color="white"
                      size={45}
                      backgroundColor="transparent"
                    />
                  </Pressable>
                )}
              />
            </View>
            <View style={styles.button}>
              {errors.check && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{errors.check}</Text>
                </View>
              )}
              <Button
                label="Add"
                onPress={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default CategoryModal;

const styles = StyleSheet.create({
  titleContainer: {
    padding: 25,
    paddingBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    paddingTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "80%",
    height: "70%",
    marginTop: "15%",
    marginBottom: "35%",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
  },
  input: {
    flexDirection: "column",
    width: "75%",
  },
  preview: {
    flexDirection: "row",
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    marginVertical: 5,
  },
  iconPreview: {
    width: 55,
    height: 55,
    borderRadius: 55 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    paddingVertical: 8,
    margin: "2%",
  },
  listContainer: {
    width: "90%",
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  check: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 65 / 2,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: "5%",
  },
  errorContainer: {
    paddingBottom: 5,
  },
  error: {
    textAlign: "center",
    color: "#FF0058",
  },
});
