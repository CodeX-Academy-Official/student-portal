import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
function PrivateRoute({ component: Component, exact, strict, path, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      exact={exact}
      strict={strict}
      path={path}
      render={(props) => {
        return currentUser ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to="/log-in" />
        );
      }}
    ></Route>
  );
}

export default PrivateRoute;
