import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  source: string;
  loop?: boolean;
}

const Animation = ({ style, source, loop }: Props) => {
  return <LottieView {...{ style, source, loop }} autoPlay />;
};

const styles = StyleSheet.create({
  animation: {
    width: 350,
    height: 350,
  },
});

Animation.defaultProps = {
  loop: true,
  style: styles.animation,
};

export default Animation;
