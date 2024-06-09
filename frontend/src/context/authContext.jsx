import React, { createContext, useEffect, useState } from "react";

import toast from "react-hot-toast";
import axios from "../utils/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/auth/user");
        setUser(res.data.userInfo);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verifyUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post("/auth/login", {
      email,
      password,
    });
    console.log(res);
    setUser(res.data.userInfo);
  };

  const signup = async (firstName, lastName, email, password) => {
    await axios.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
    });
    toast.success("User registered successfully");
  };

  const logout = async () => {
    await axios.post("/auth/logout");
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
