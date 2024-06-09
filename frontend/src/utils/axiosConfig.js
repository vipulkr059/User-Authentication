import axios from "axios";

const instance = axios.create({
  baseURL: "https://user-authentication-1iup.onrender.com/api",
  withCredentials: true,
});

export default instance;
