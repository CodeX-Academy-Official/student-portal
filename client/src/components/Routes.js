import React from 'react';
import { Switch } from 'react-router-dom';
import About from '../containers/About/About';
import Overview from '../containers/Overview/Overview';
import PrivateRoute from '../PrivateRoute';
import Mentor from '../containers/Mentor/Mentor';
import DynamiteSessions from '../containers/DynamiteSessions/DynamiteSessions';
import Requests from '../containers/Requests/Requests';
function Routes(props) {
  return (
    <div>
      <Switch>
        <PrivateRoute
          exact
          path="/"
          student={props.student}
          component={Overview}
        />
        <PrivateRoute path="/about" component={About} />
        <PrivateRoute path="/mentor" component={Mentor} />
        <PrivateRoute path="/dynamite-sessions" component={DynamiteSessions} />
        <PrivateRoute path="/requests" component={Requests} />
      </Switch>
    </div>
  );
}

export default Routes;
