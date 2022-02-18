import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useRef } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import AuthForm from "../components/AuthForm";
import {
  AuthenticationRoutes,
  StackNavigationProps,
} from "../constants/AuthenticationRoutes";
import { ILogin } from "../types/Login";
import TextInputField from "../components/TextInputField";
import Button from "../components/Button";
import axiosInstance from "../services/axiosInstance";
import { CommonActions } from "@react-navigation/native";

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
  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      validationSchema: LoginSchema,
      initialValues: { email: "", password: "", authentication: "" },
      onSubmit: (values: ILogin, { setFieldError }) => {
        const submit = async () => {
          const data = { email: values.email, password: values.password };
          try {
            const res = await axiosInstance.post("/account/signin", data);
            console.log(res);
            navigation.dispatch(
              CommonActions.reset({ index: 0, routes: [{ name: "Home" }] })
            );
          } catch {
            setFieldError("authentication", "Invalid Credentials");
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
      linkText="Don't have an account?"
      onPress={() => navigation.navigate("Signup")}
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
        {errors.authentication && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{errors.authentication}</Text>
          </View>
        )}
        <Button label="Login" onPress={handleSubmit} />
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
  errorContainer: {
    paddingBottom: 5,
  },
  error: {
    color: "#FF0058",
  },
});
