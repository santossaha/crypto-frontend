import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://13.233.93.31/new-crypto-blog/public/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
