import React, { useEffect } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import Animation from "./Animation";

const Loading = () => {
  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animation source={require("../assets/animations/loading.json")} />
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
