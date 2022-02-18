import React, { forwardRef } from "react";
import { TextInput, TextInputProps, View, StyleSheet } from "react-native";
import { Entypo as Icon } from "@expo/vector-icons";
import RoundedIcon from "../RoundedIcon";

interface Props extends TextInputProps {
  icon: string;
  error?: string;
  touched?: boolean;
}
const validationColor = "#223e4b";

const TextInputField = forwardRef<TextInput, Props>(
  ({ icon, error, touched, ...rest }, ref) => {
    return (
      <View style={styles.container}>
        <View style={{ padding: 8 }}>
          <Icon name={icon as any} color={validationColor} size={16} />
        </View>
        <View style={styles.input}>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="rgba(34, 62, 75, 0.7)"
            {...{ ref }}
            {...rest}
          />
        </View>
        {touched && (
          <RoundedIcon
            size={16}
            name={error ? "x" : "check"}
            color="white"
            backgroundColor={error ? "#FF0058" : "#2EB872"}
          />
        )}
      </View>
    );
  }
);

export default TextInputField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    width: 300,
    borderRadius: 8,
    borderColor: validationColor,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
  },
  input: {
    flex: 1,
  },
});
