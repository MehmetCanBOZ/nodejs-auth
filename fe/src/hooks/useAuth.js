import { useMemo, useContext } from "react";

import { AuthContext } from "context/AuthContext";

export default function useAuth() {
  const { isAuthenticate, LoginUser, user, SignUpUser } =
    useContext(AuthContext) || {};

  const value = useMemo(
    () => ({ isAuthenticate, LoginUser, user, SignUpUser }),
    [isAuthenticate, LoginUser, user, SignUpUser]
  );

  return value;
}
