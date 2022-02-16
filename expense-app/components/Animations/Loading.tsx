import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";

const Loading = () => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);
  // }, []);

  return (
    <>
      {isLoading && (
        <LottieView
          source={require("../../assets/animations/loading.json")}
          style={styles.animation}
          autoPlay
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  animation: {
    width: 350,
    height: 350,
  },
});

export default Loading;
