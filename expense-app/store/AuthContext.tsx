import React, { useState, createContext } from "react";
import { IUser } from "../types/User";

type AuthContextType = {
  isLoggedIn: boolean;
  user: IUser | null;
  token: string | null;
  login: (token: string, user: IUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
});

interface Props {
  children: JSX.Element;
}

const AuthContextProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: IUser) => {
    setIsLoggedIn(true);
    setUser(user);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  const value = {
    isLoggedIn,
    user,
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
