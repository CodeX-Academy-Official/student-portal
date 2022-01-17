import React from "react";
import { Routes, Route } from "react-router-dom";
import About from "../containers/About/About";
import Overview from "../containers/Overview/Overview";
import PrivateRoute from "../PrivateRoute";
import Mentor from "../containers/Mentor/Mentor";
import DynamiteSessions from "../containers/DynamiteSessions/DynamiteSessions";
import Requests from "../containers/Requests/Requests";
function Routes_Navigation(props) {
  return (
    <div>
      <Routes>
        <Route
          exact
          path="/"
          student={props.student}
          studentActivity={props.studentActivity}
          studentLastActivity={props.studentLastActivity}
          studentLastThreeWeekActivity={props.studentLastThreeWeekActivity}
          studentLastLeaveOfAbscence={props.studentLastLeaveOfAbscence}
          element={
            <PrivateRoute>
              <Overview />
            </PrivateRoute>
          }
        />
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
          student={props.student}
          meetingPreference={props.meetingPreference}
        />
        <Route
          path="/mentor"
          element={
            <PrivateRoute>
              <Mentor />
            </PrivateRoute>
          }
        />
        <Route
          path="/dynamite-sessions"
          element={
            <PrivateRoute>
              <DynamiteSessions />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <Requests />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default Routes_Navigation;
