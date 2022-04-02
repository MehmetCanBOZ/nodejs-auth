import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  "authtoken"
)}`;
axios.defaults.headers["x-agentname"] = "node-auth";

const onRequest = (request) => {
  return request;
};

const onResponse = (response) => {
  const data = response.data?.data || response;
  const error = null;

  return { data, error };
};

const onResponseFailed = (err) => {
  const result = err?.response?.data;

  if (result?.errors?.length) {
    return {
      error: { message: result.errors[0] ? result.errors[0] : "Invalid error" },
      data: null,
    };
  }

  const error = {
    message: "unKnown Error",
  };

  return { error, data: null };
};

axios.interceptors.request.use(onRequest);
axios.interceptors.response.use(onResponse, onResponseFailed);

export default axios;
