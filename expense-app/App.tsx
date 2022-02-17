import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { LayoutAnimation, StyleSheet, Text, View } from "react-native";
import Loading from "./components/Animations/Loading";
import axiosInstance from "./services/axiosInstance";

export default function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      const getData = async () => {
        const { data } = await axiosInstance.get("/");
        LayoutAnimation.easeInEaseOut();
        setData(data);
      };
      getData();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      {data ? <Text>{data}</Text> : <Loading />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
