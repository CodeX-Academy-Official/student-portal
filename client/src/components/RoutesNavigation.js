import React from "react";
import About from "../containers/About/About";
import Overview from "../containers/Overview/Overview";
import Mentor from "../containers/Mentor/Mentor";
import DynamiteSessions from "../containers/DynamiteSessions/DynamiteSessions";
import Requests from "../containers/Requests/Requests";
import NoMatch from "../containers/NoMatch/NoMatch";
function RoutesNavigation(props) {
  switch (props.location.pathname) {
    case "/":
      return (
        <Overview
          student={props.student}
          studentActivity={props.studentActivity}
          studentLastActivity={props.studentLastActivity}
          studentLastThreeWeekActivity={props.studentLastThreeWeekActivity}
          studentLastLeaveOfAbscence={props.studentLastLeaveOfAbscence}
        />
      );
    case "/about":
      return (
        <About
          student={props.student}
          meetingPreference={props.meetingPreference}
        />
      );
    case "/mentor":
      return (
        <Mentor
          student={props.student}
          mentorsInformation={props.mentorsInformation}
          currentMentor={props.currentMentor}
        />
      );
    case "/dynamite-sessions":
      return <DynamiteSessions />;
    case "/requests":
      return <Requests />;
    default:
      return <NoMatch />;
  }
}

export default RoutesNavigation;
