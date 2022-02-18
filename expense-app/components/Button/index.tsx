import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface Props {
  label: string;
  onPress: () => void;
}

const Button = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
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
  label: {
    fontSize: 18,
    color: "white",
    textTransform: "uppercase",
  },
});
