import React from "react";
import SignUp from "./containers/SignUp/SignUp";
import LogIn from "./containers/LogIn/LogIn";
import ResetPassword from "./containers/ResetPassword/ResetPassword";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./PrivateRoute";
import Layouts from "./components/Layout/Layouts";
function App() {
  const app = (
    <Router>
      <ScrollToTop />
      <Switch>
        <PrivateRoute exact path="/" component={Layouts} />
        <PrivateRoute path="/about" component={Layouts} />
        <PrivateRoute path="/mentor" component={Layouts} />
        <PrivateRoute path="/dynamite-sessions" component={Layouts} />
        <PrivateRoute path="/requests" component={Layouts} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/log-in" component={LogIn} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password" component={ResetPassword} />
      </Switch>
    </Router>
  );
  return (
    <AuthProvider>
      <div className="App">{app}</div>
    </AuthProvider>
  );
}

export default App;
