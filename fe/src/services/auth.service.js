import axios from "../api/axiosInterceptors";
import jwtDecode from "jwt-decode";
const AuthServices = {
  isAuthenticated: async () => {
    const authtoken = localStorage.getItem("authtoken");
    const isTokenValid = () => {
      const decodedToken = jwtDecode(authtoken);
      const now = Math.floor(Date.now() / 1000);
      return decodedToken.exp > now;
    };
    if (authtoken) {
      if (isTokenValid()) {
        return true;
      }
      return false;
    }
    return false;
  },
  login: async (params) => {
    return axios
      .post("/auth", params)
      .then(({ data: response }) => {
        if (response?.data) {
          const accessToken = response.data.accessToken;
          if (accessToken) {
            localStorage.setItem("authtoken", accessToken);
            localStorage.setItem(
              "authrefreshToken",
              response?.data?.refreshToken
            );
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            return accessToken;
          }
        }
        AuthServices.logout();
        return false;
      })
      .catch(() => false);
  },
  logout: () => {
    localStorage.removeItem("authtoken");
    localStorage.removeItem("authrefreshToken");
    delete axios.defaults.headers.common.Authorization;
  },
  signIn: async (params) => axios.post("/signIn", params),
};

export default AuthServices;
