import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UserProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    navigate("/login");
  } else {
    return children;
  }
};

export default UserProtectedRoutes;
