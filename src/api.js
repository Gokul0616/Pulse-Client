import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8000/", // Ensure this matches the server URL
});

export default api;
