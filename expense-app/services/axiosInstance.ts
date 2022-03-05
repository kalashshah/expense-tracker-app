import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://monitor-expense.herokuapp.com/",
});

const getToken = async () => {
  const token = await AsyncStorage.getItem("@token");
  return token;
};

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();
  config.headers = {
    Authorization: `Bearer ${token}}`,
  };
  return config;
});

export default axiosInstance;
