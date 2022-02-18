import React from "react";
import { StyleSheet, View } from "react-native";
import Animation from "../Animation";

const Loading = () => {
  return (
    <View style={styles.container}>
      <Animation source={require("../../assets/animations/loading.json")} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
