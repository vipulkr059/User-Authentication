import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UserProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  // Load the authenticated user
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return children;
};

export default UserProtectedRoutes;
