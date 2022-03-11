import React from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { FormikErrors } from "formik";
import Button from "./Button";
import Animation from "./Animation";
import { ILogin } from "../types/Authentication";

interface AuthFormProps {
  source: string;
  title: string;
  children: JSX.Element;
  link: string;
  linkDescription: string;
  onPress: () => void;
  errors: FormikErrors<ILogin>;
  handleSubmit: () => void;
  isSubmitting: boolean;
}

const AuthForm = (props: AuthFormProps) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.animationContainer}>
        <Animation source={props.source} style={styles.animation} />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.formHeader}>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View style={styles.center}>
          <View style={styles.children}>
            {props.children}
            {props.errors.authentication && (
              <View style={styles.errorContainer}>
                <Text style={styles.error}>{props.errors.authentication}</Text>
              </View>
            )}
            <Button
              label={props.title}
              isSubmitting={props.isSubmitting}
              onPress={props.handleSubmit}
            />
          </View>
          <Text style={styles.linkText}>{props.linkDescription}</Text>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.link}>{props.link}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  animationContainer: {
    height: Dimensions.get("window").height / 2.3,
    backgroundColor: "#FF8A8A",
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 250,
    height: 250,
  },
  formContainer: {
    flex: 1.5,
    backgroundColor: "#ffffff",
    bottom: 50,
    borderTopEndRadius: 60,
    borderTopStartRadius: 60,
  },
  formHeader: {
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
  },
  center: {
    alignItems: "center",
    paddingTop: 20,
  },
  children: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  errorContainer: {
    paddingBottom: 5,
  },
  error: {
    color: "#FF0058",
  },
  linkText: {
    fontSize: 18,
  },
  link: {
    color: "#DB1F48",
    fontSize: 18,
  },
});
