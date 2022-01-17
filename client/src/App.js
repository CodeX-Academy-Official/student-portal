import React from "react";
import SignUp from "./containers/SignUp/SignUp";
import LogIn from "./containers/LogIn/LogIn";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import "antd/dist/antd.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Layouts from "./components/Layout/Layouts";
function App() {
  const app = (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Layouts />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <Layouts />
            </PrivateRoute>
          }
        />
        <Route
          path="/mentor"
          element={
            <PrivateRoute>
              <Layouts />
            </PrivateRoute>
          }
        />
        <Route
          path="/dynamite-sessions"
          element={
            <PrivateRoute>
              <Layouts />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <Layouts />
            </PrivateRoute>
          }
        />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
  return (
    <AuthProvider>
      <div className="App">{app}</div>
    </AuthProvider>
  );
}

export default App;
