import React from "react";
import { StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
  return (
    <LottieView
      source={require("../../assets/animations/loading.json")}
      style={styles.animation}
      autoPlay
    />
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 350,
    height: 350,
  },
});

export default Loading;
