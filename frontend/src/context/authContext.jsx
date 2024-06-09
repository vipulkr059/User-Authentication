import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

axios.defaults.withCredentials = true;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/auth/user");
      setUser(res.data.userInfo);
      console.log(res);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:8000/api/auth/login", {
      email,
      password,
    });
    console.log(res);
    setUser(res.data.userInfo);
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
    await axios.post("http://localhost:8000/api/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
