import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import useAuth from "../hooks/useAuth";
import Share from "../components/Share";
import { Linking } from "react-native";

const Settings = () => {
  const { user } = useAuth();

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>Name:</Text>
        <Text style={styles.sub}>{user?.name}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Email:</Text>
        <Text style={styles.sub}>{user?.email}</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Currency:</Text>
        <Text style={styles.sub}>Rupees ₹</Text>
        <TouchableOpacity>
          <Text style={styles.button}>Change currency</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Share />
      </View>
      <View style={styles.container}>
        <Text style={styles.sub}>Made with love by</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://github.com/kalashshah")}
        >
          <Text style={styles.button}>@kalashshah</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://www.linkedin.com/in/kalash-shah-2029aa201/"
            )
          }
        >
          <Text style={styles.button}>Linkedin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  container: {
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
  },
  sub: {
    fontSize: 15,
    opacity: 0.5,
    marginTop: 5,
  },
  button: {
    fontSize: 15,
    marginTop: 5,
    color: "#24a0ed",
  },
});
