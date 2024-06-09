import { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UserProtectedRoutes = () => {
  const { user, loading } = useContext(AuthContext);
  console.log(user);

  if (loading) return <div>Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserProtectedRoutes;
