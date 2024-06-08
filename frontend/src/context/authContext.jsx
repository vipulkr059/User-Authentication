import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });
    console.log(res);
    setUser(res.data.user);
  };

  const signup = async (firstName, lastName, email, password) => {
    await axios.post("http://localhost:8000/api/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
  };

  const logout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
