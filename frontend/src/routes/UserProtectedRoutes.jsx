import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const UserProtectedRoutes = ({ children }) => {
  const navigate = useNavigate();

  // Load the authenticated user
  const { user } = useContext(AuthContext);

  if (!user) {
    navigate("/login");
  } else {
    return children;
  }
};

export default UserProtectedRoutes;
