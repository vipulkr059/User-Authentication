import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
  </Router>
);

export default AppRouter;
