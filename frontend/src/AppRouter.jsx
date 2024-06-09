import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import UserProtectedRoutes from "./routes/UserProtectedRoutes";

const AppRouter = () => (
  <>
    <Router>
      <Routes>
        <Route path="/profile" element={<UserProtectedRoutes />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/" element={<Signin />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
    <Toaster
      position="bottom-right"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "var(--color-grey-0)",
          color: "var(--color-grey-700)",
        },
      }}
    />
  </>
);

export default AppRouter;
