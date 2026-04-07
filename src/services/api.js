import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-api-k6ys.onrender.com"
});

export default api;