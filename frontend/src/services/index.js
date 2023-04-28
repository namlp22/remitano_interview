import axios from "axios";
import { getToken } from "../utils";

const https = axios.create({
  baseURL: "http://localhost:7777/",
  timeout: 10000,
});


https.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log(config);
    config.headers.Authorization = `Bearer ${getToken()}`;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const makeRequest = async (config) => {
  try {
    const response = await https.request(config);
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios Error:", error);
      return error
    } else {
      console.log("Unexpected Error:", error);
      return error
    }
  }
};
