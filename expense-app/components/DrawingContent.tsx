import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Entypo } from "@expo/vector-icons";

import Animation from "./Animation";
import useAuth from "../hooks/useAuth";
import { TouchableOpacity } from "react-native-gesture-handler";

const DrawerContent = (props: DrawerContentComponentProps) => {
  const { user } = useAuth();

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
        <Text style={styles.name}>{`Welcome ${user?.name}`}</Text>
        <View style={styles.items}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button}>
          <Entypo name="share" size={22} />
          <Text style={styles.buttonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
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
