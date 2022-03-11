import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { CommonActions } from "@react-navigation/native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Entypo } from "@expo/vector-icons";

import Share from "./Share";
import Animation from "./Animation";
import useAuth from "../hooks/useAuth";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const auth = useAuth();

  const logoutHandler = () => {
    auth.logout();
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Authentication" }],
      })
    );
  };

  return (
    <View style={styles.wrapper}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.container}
      >
        <Animation
          source={require("../assets/animations/avatar.json")}
          style={styles.animation}
        />
        <Text style={styles.name}>{`Welcome ${auth.user?.name}`}</Text>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <Share />
        <TouchableOpacity style={styles.button} onPress={logoutHandler}>
          <Entypo name="log-out" size={22} />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    backgroundColor: "#F5C5C5",
  },
  animation: {
    padding: "15%",
    paddingTop: "5%",
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  items: {
    flex: 1,
    padding: 8,
    backgroundColor: "#fff",
  },
  bottom: {
    borderTopWidth: 1,
    padding: "10%",
  },
  button: {
    flexDirection: "row",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 30,
  },
});
