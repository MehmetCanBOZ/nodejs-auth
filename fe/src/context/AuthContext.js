import React from "react";
import AuthServices from "../services/auth.service";

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticate, setIsAuthenticate] = React.useState(false);
  const [user, setUser] = React.useState(null);
  console.log("isAuthenticate: ", isAuthenticate);

  const SignUpUser = async (params) => {
    try {
      const response = await AuthServices.signIn(params);
      setUser(response?.data?.user);
      setIsAuthenticate(true);
    } catch (err) {
      setIsAuthenticate(false);
      return err;
    }
  };

  const LoginUser = async (params) => {
    try {
      const response = await AuthServices.login(params);
      setUser(response?.data?.user);
      setIsAuthenticate(true);
    } catch (err) {
      setIsAuthenticate(false);
      return err;
    }
  };

  const data = {
    isAuthenticate,
    LoginUser,
    user,
    SignUpUser,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
