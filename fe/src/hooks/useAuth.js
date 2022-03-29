import { useContext, useMemo } from "react";
import { AuthContext } from "context/AuthContext";

export default function useAuth() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext) || {};

  const value = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated]
  );

  return {
    ...value,
  };
}
