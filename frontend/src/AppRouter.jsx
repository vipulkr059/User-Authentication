import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </Router>
);

export default AppRouter;
