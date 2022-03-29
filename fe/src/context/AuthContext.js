import React, { createContext, useState, useEffect } from "react";
import AuthServices from "services/auth.service";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    AuthServices.isAuthenticated().then((res) => {
      setIsAuthenticated(res);
    });
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
