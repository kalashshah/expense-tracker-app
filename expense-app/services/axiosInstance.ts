import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://monitor-expense.herokuapp.com/",
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const temp_token = "auth_token";
  config.headers = {
    Authorization: `Bearer ${temp_token}}`,
  };
  return config;
});

export default axiosInstance;
