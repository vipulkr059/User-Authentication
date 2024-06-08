import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UserProtectedRoutes from "./routes/UserProtectedRoutes";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route element={<UserProtectedRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </Router>
);

export default AppRouter;
