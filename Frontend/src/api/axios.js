import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-app-wheat-beta.vercel.app/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if(token) {
    req.headers.Authorization = token;
  }

  return req;
})

export default API;