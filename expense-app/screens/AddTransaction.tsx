import { AxiosError } from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import * as yup from "yup";
import TextInputField from "../components/TextInputField";
import DatePicker from "@react-native-community/datetimepicker";

import { DrawerNavigationProps, DrawerRoutes } from "../constants/DrawerRoutes";
import axiosInstance from "../services/axiosInstance";
import { ICategory } from "../types/Category";
import { IAddTransaction } from "../types/Transaction";
import Button from "../components/Button";
import ToggleButton from "../components/ToggleButton";
import CategoryPicker from "../components/CategoryPicker";
import { CommonActions } from "@react-navigation/native";

const AddTransaction = ({
  navigation,
}: DrawerNavigationProps<DrawerRoutes, "AddTransaction">) => {
  const [isIncome, setIsIncome] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [category, setCategory] = useState<ICategory | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    const type = isIncome ? "income" : "expense";
    axiosInstance
      .get(`/category/${type}`)
      .then((res) => setCategories(res.data))
      .catch(() => {});
  }, [isIncome]);

  const AddTransactionSchema = yup.object().shape({
    name: yup
      .string()
      .required("Transaction name is required")
      .min(2, "Transaction name must be at least 2 characters")
      .max(20, "Transaction name must have less than 20 characters"),
    amount: yup
      .number()
      .required("Amount is required")
      .min(1, "Amount must be at least ₹1")
      .max(100000000, "Amount must be less than ₹1,000,000,000"),
    description: yup
      .string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(100, "Description must be less than 100 characters"),
  });

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isSubmitting,
    values,
  } = useFormik({
    enableReinitialize: true,
    validationSchema: AddTransactionSchema,
    initialValues: {
      name: "",
      description: "",
      amount: 0,
      category: "",
      check: "",
    },
    onSubmit: (values: IAddTransaction, { setFieldError, setSubmitting }) => {
      const submit = async () => {
        try {
          const data = { ...values };
          data.date = date;
          if (!category) {
            setSubmitting(false);
            return setFieldError("category", "Category is required");
          }
          data.category = category.name;
          data.type = isIncome ? "income" : "expense";
          delete data.check;
          await axiosInstance.post("/transaction/add", data);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Transaction" }],
            })
          );
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

  const toggleDateModal = () => {
    setIsDateOpen(true);
  };

  const onDateChange = (_: any, date: Date | undefined) => {
    setDate(date || new Date());
    setIsDateOpen(false);
  };

  const toggleCategoryModal = () => {
    setIsCategoryOpen(true);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.section}>
        <Text style={styles.title}>Add New Transaction</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <TextInputField
          placeholder="Enter name"
          onChangeText={handleChange("name")}
          value={values.name}
          onBlur={handleBlur("name")}
          error={errors.name}
          touched={touched.name}
          autoCapitalize="words"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Amount</Text>
        <TextInputField
          placeholder="Enter amount"
          value={values.amount.toString()}
          onChangeText={handleChange("amount")}
          onBlur={handleBlur("amount")}
          error={errors.amount}
          touched={touched.amount}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <TextInputField
          placeholder="Enter description"
          value={values.description}
          onChangeText={handleChange("description")}
          onBlur={handleBlur("description")}
          error={errors.description}
          touched={touched.description}
          keyboardType="default"
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.choiceLabel}>Date: {date.toDateString()}</Text>
        <TouchableWithoutFeedback onPress={toggleDateModal}>
          <Text style={styles.choiceBtn}>Change Date</Text>
        </TouchableWithoutFeedback>
        {isDateOpen && (
          <DatePicker mode="date" value={date} onChange={onDateChange} />
        )}
        <Text style={styles.choiceLabel}>Category: {category?.name}</Text>
        <TouchableWithoutFeedback onPress={toggleCategoryModal}>
          <Text style={styles.choiceBtn}>Change Category</Text>
        </TouchableWithoutFeedback>
        {errors.category && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{errors.category}</Text>
          </View>
        )}
        {isCategoryOpen && (
          <CategoryPicker
            {...{ categories, setCategory, setIsCategoryOpen, setIsIncome }}
          />
        )}
        <View style={styles.submitBtn}>
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
      </View>
    </View>
  );
};

export default AddTransaction;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 80,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  choiceBtn: {
    fontSize: 16,
    color: "#24a0ed",
    textAlign: "center",
  },
  choiceLabel: {
    marginTop: 15,
    fontSize: 18,
    textAlign: "center",
  },
  submitBtn: {
    marginTop: 40,
  },
  errorContainer: {
    paddingBottom: 5,
  },
  error: {
    textAlign: "center",
    color: "#FF0058",
  },
  section: {
    marginVertical: 10,
  },
  bottom: {
    marginTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});
