import React, { useRef } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { CommonActions } from "@react-navigation/native";
import * as yup from "yup";
import { useFormik } from "formik";
import { AxiosError } from "axios";

import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import AuthForm from "../components/AuthForm";
import TextInputField from "../components/TextInputField";
import axiosInstance from "../services/axiosInstance";
import useAuth from "../hooks/useAuth";
import { ILogin } from "../types/Authentication";

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email ID is required")
    .email("Please enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters")
    .max(15, "Password must be smaller than 15 characters"),
});

const Login = ({
  navigation,
}: StackNavigationProps<AuthenticationRoutes, "Login">) => {
  const password = useRef<TextInput>(null);
  const auth = useAuth();

  const {
    handleChange,
    handleSubmit,
    handleBlur,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "", authentication: "" },
    onSubmit: (values: ILogin, { setFieldError, setSubmitting }) => {
      const submit = async () => {
        const data = { email: values.email, password: values.password };
        try {
          const res = await axiosInstance.post("/account/signin", data);
          await auth.login(res.data.token, res.data.result);
          navigation.dispatch(
            CommonActions.reset({ index: 0, routes: [{ name: "Main" }] })
          );
          setSubmitting(false);
        } catch (error) {
          const err = (error as AxiosError).response?.data.message;
          if (err) setFieldError("authentication", err);
          else setFieldError("authentication", "Invalid Credentials");
          setSubmitting(false);
        }
      };
      submit();
    },
  });

  return (
    <AuthForm
      source={require("../assets/animations/loading.json")}
      title="Login"
      link="Sign Up"
      linkDescription="Don't have an account?"
      onPress={() => navigation.navigate("Signup")}
      {...{ errors, handleSubmit, isSubmitting }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.fieldContainer}>
          <TextInputField
            icon="mail"
            keyboardType="email-address"
            placeholder="Enter your email"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            onSubmitEditing={() => password.current?.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.fieldContainer}>
          <TextInputField
            ref={password}
            icon="lock"
            placeholder="Enter your password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
            secureTextEntry
          />
        </View>
      </View>
    </AuthForm>
  );
};

export default Login;

const styles = StyleSheet.create({
  fieldContainer: {
    paddingHorizontal: 32,
    marginBottom: 16,
    width: "100%",
  },
});
