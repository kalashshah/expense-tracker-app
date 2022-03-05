import React, { useState, createContext, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthContext } from "../types/Context";
import { IUser } from "../types/User";

export const AuthContext = createContext<IAuthContext>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
});

interface Props {
  children: JSX.Element;
}

const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (token: string, user: IUser) => {
    setIsLoggedIn(true);
    setUser(user);
    setToken(token);
    await AsyncStorage.multiSet([
      ["@token", token],
      ["@user", JSON.stringify(user)],
    ]);
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
    await AsyncStorage.multiRemove(["@token", "@user"]);
  };

  const value = useMemo(
    () => ({
      isLoggedIn,
      user,
      token,
      login,
      logout,
    }),
    [token, user, isLoggedIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
