import axios from "axios";
// import 'dotenv/config'; 

const API = axios.create({
  baseURL: "http://localhost:3000/api/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if(token) {
    req.headers.Authorization = token;
  }

  return req;
})

export default API;