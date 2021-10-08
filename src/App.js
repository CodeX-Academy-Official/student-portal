import React from 'react';
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { AuthProvider } from './contexts/AuthContext';
import Home from './components/Dashboard/Dashboard';
function App() {
  const app = (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/log-in" component={LogIn} />
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
