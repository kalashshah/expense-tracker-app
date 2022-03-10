import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useRef, useState } from "react";
import AnimatedLottieView from "lottie-react-native";

const RadioButton = () => {
  const animation = useRef<AnimatedLottieView>(null);
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn((isOn) => {
      if (isOn) {
        animation.current?.play(0, 45);
      } else {
        animation.current?.play(46, 90);
      }
      return !isOn;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Expense</Text>
      <TouchableWithoutFeedback onPress={toggle}>
        <AnimatedLottieView
          loop={false}
          ref={animation}
          source={require("../assets/animations/toggle.json")}
          style={styles.animation}
        />
      </TouchableWithoutFeedback>
      <Text style={styles.text}>Income</Text>
    </View>
  );
};

export default RadioButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    marginTop: 100,
    flexDirection: "row",
    alignItems: "center",
  },
  animation: {
    width: 125,
    height: 125,
  },
  text: {
    fontSize: 18,
    fontVariant: ["tabular-nums"],
  },
});
