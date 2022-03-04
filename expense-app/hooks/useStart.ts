import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "./useAuth";
import { IUser } from "../types/User";

const useFirstLaunch = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const getInitialState = async () => {
      const [[_, token], [__, user]] = await AsyncStorage.multiGet([
        "@token",
        "@user",
      ]);
      if (token === null || user === null) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
        setToken(token);
        setUser(JSON.parse(user));
      }
    };
    getInitialState();
  }, []);

  return { isLoggedIn, token, user };
};

export default useFirstLaunch;
