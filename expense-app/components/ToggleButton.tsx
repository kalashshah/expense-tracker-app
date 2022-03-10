import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import React, { useRef } from "react";
import AnimatedLottieView from "lottie-react-native";

interface Props {
  setIsOn: React.Dispatch<React.SetStateAction<boolean>>;
  left: string;
  right: string;
}

const RadioButton = ({ setIsOn, left, right }: Props) => {
  const animation = useRef<AnimatedLottieView>(null);

  const toggle = () => {
    setIsOn((isOn) => {
      if (isOn) animation.current?.play(50, 90);
      else animation.current?.play(0, 45);
      return !isOn;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{left}</Text>
      <TouchableWithoutFeedback onPress={toggle}>
        <AnimatedLottieView
          loop={false}
          ref={animation}
          source={require("../assets/animations/toggle.json")}
          style={styles.animation}
        />
      </TouchableWithoutFeedback>
      <Text style={styles.text}>{right}</Text>
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
