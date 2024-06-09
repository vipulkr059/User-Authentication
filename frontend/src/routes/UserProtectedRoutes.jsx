import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UserProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  console.log(user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtectedRoutes;
