import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "https://blog-app-mern-server.vercel.app/api",
});

export default instance;
