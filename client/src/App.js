import React from 'react';
import SignUp from './containers/SignUp/SignUp';
import LogIn from './containers/LogIn/LogIn';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import About from './containers/About/About';
import Overview from './containers/Overview/Overview';
import PrivateRoute from './PrivateRoute';
import Mentor from './containers/Mentor/Mentor';
import DynamiteSessions from './containers/DynamiteSessions/DynamiteSessions';
import Requests from './containers/Requests/Requests';
function App() {
  const app = (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/log-in" component={LogIn} />
        <PrivateRoute exact path="/about" component={About} />
        <PrivateRoute exact path="/overview" component={Overview} />
        <PrivateRoute exact path="/mentor" component={Mentor} />
        <PrivateRoute
          exact
          path="/dynamite-sessions"
          component={DynamiteSessions}
        />
        <PrivateRoute exact path="/requests" component={Requests} />
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
