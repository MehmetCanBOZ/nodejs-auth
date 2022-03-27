import axios from "axios";

const AuthServices = {
  login: async (params) => axios.post("http://localhost:3001/auth", params),
  signIn: async (params) => axios.post("http://localhost:3001/signIn", params),
};

export default AuthServices;
