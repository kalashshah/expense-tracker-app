import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useFormik } from "formik";
import * as yup from "yup";
import { AxiosError } from "axios";
import DatePicker from "@react-native-community/datetimepicker";

import TextInputField from "./TextInputField";
import axiosInstance from "../services/axiosInstance";
import { DrawerRoutes } from "../constants/DrawerRoutes";
import { IEditTransaction, ITransaction } from "../types/Transaction";
import Button from "./Button";
import { CommonActions } from "@react-navigation/native";

interface Props {
  visible: boolean;
  item: ITransaction;
  navigation: DrawerNavigationProp<DrawerRoutes, "TransactionItem">;
}

const EditTransaction = ({ visible, item, navigation }: Props) => {
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date(item.date));

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

  const EditTransactionSchema = yup.object().shape({
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
    validationSchema: EditTransactionSchema,
    initialValues: {
      name: item.name,
      description: item.description,
      amount: item.amount,
      check: "",
    },
    onSubmit: (values: IEditTransaction, { setFieldError, setSubmitting }) => {
      const submit = async () => {
        const data = { ...values };
        data.date = date;
        delete data.check;
        try {
          const res = await axiosInstance.put(`/transaction/${item._id}`, data);
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "TransactionItem", params: { item: res.data } }],
            })
          );
          setIsDateOpen(false);
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

  const toggleModal = () => {
    setIsDateOpen(true);
  };

  const onChange = (_: any, date: Date | undefined) => {
    setDate(date || new Date(item.date));
    setIsDateOpen(false);
  };

  return (
    <>
      {visible && (
        <View style={styles.container}>
          <Animated.View style={[modal, styles.modal]}>
            <Text style={styles.title}>Edit Transaction</Text>
            <View style={styles.inputContainer}>
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
            <View style={styles.inputContainer}>
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
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Description</Text>
              <TextInputField
                placeholder="Enter description"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                error={errors.description}
                touched={touched.description}
              />
            </View>
            <Text style={styles.label}>Date: {date.toDateString()}</Text>
            <TouchableWithoutFeedback onPress={toggleModal}>
              <Text style={styles.dateBtn}>Change Date</Text>
            </TouchableWithoutFeedback>
            {isDateOpen && (
              <DatePicker mode="date" value={date} onChange={onChange} />
            )}
            <View style={styles.submitBtn}>
              {errors.check && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{errors.check}</Text>
                </View>
              )}
              <Button
                label="Edit"
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

export default EditTransaction;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  modal: {
    width: "80%",
    height: Dimensions.get("window").height / 1.5,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    color: "black",
    opacity: 0.7,
    marginBottom: 5,
    marginLeft: 8,
  },
  dateBtn: {
    fontSize: 16,
    color: "#24a0ed",
  },
  submitBtn: {
    marginTop: "auto",
    marginBottom: 40,
  },
  errorContainer: {
    paddingBottom: 5,
  },
  error: {
    textAlign: "center",
    color: "#FF0058",
  },
});
