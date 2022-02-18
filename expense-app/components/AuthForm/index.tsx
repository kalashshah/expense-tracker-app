import {
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Animation from "../Animation";
import { TouchableOpacity } from "react-native-gesture-handler";

interface AuthFormProps {
  source: string;
  title: string;
  children: JSX.Element,
  link: string;
  linkText: string;
  onPress: () => void;
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
          <View style={styles.children}>{props.children}</View>
          <Text style={styles.linkText}>{props.linkText}</Text>
          <TouchableOpacity onPress={props.onPress}>
            <Text style={styles.link}>Sign Up</Text>
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
    backgroundColor: "#ffffff",
  },
  animationContainer: {
    height: Dimensions.get("window").height / 2.5,
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
  children: {
    flex: 1,
  },
  linkText: {
    fontSize: 20,
  },
  link: {
    color: "#DB1F48",
    fontSize: 20,
  },
});
