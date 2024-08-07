import axios from "axios";

import { redirectTo } from "./redirectTo";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken);

        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const { data } = await axios.post(
          "http://localhost:3000/api/refresh-token",
          { refreshToken }
        );

        const { token } = data;
        console.log("New token", token);
        localStorage.setItem("token", token);

        originalRequest.headers["Authorization"] = `Bearer ${token}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error", refreshError);
        redirectTo("/");
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
