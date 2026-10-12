import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT Token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cinemind_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle Unauthorized User
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("cinemind_token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export default API;