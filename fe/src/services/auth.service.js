import axios from "../api/axiosInterceptors";

const AuthServices = {
  login: async (params) => axios.post("/auth", params),
  signIn: async (params) => axios.post("/signIn", params),
};

export default AuthServices;
