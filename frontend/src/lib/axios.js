import axios from "axios";

const BACKEND_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : import.meta.env.VITE_BACKEND_URL;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL + "/api",
  withCredentials: true,
});
