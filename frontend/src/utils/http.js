import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/api";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 10,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
