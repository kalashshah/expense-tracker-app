import React, { useRef, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { ModalProps } from "./CategoryModal";

interface Props {
  modal: ({ visible, type }: ModalProps) => JSX.Element;
  type: "income" | "expense";
  onComplete: () => void;
}

const ActionButton = ({ modal: Modal, type, onComplete }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const animation: Animated.Value = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 10,
      useNativeDriver: true,
    }).start();

    setIsOpen((isOpen) => !isOpen);
  };

  const rotate = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "45deg"],
        }),
      },
    ],
  };

  return (
    <>
      <Modal visible={isOpen} type={type} onComplete={onComplete}/>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={toggle}>
          <Animated.View style={[styles.button, rotate]}>
            <AntDesign name="plus" size={20} color="white"/>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    bottom: 20,
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB1F48",
    color: "#ffffff",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    shadowRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    elevation: 3,
  },
});
