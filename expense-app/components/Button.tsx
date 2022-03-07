import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Animation from "./Animation";

interface Props {
  label: string;
  onPress: () => void;
  isSubmitting?: boolean;
}

const Button = ({ label, onPress, isSubmitting }: Props) => {
  return (
    <TouchableOpacity
      style={isSubmitting ? styles.disabled : styles.button}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <Animation
          source={require("../assets/animations/button-loading.json")}
          style={styles.animation}
        />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e94832",
  },
  disabled: {
    borderRadius: 8,
    height: 50,
    width: 245,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9F1F0",
  },
  label: {
    fontSize: 18,
    color: "white",
    textTransform: "uppercase",
  },
  animation: {
    width: 100,
    height: 100,
  },
});
