import React, { useState, useEffect } from "react";
import Styles from "./Layouts.module.scss";
import { Layout } from "antd";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";
import { useAuth } from "../../contexts/AuthContext";
import SideBar from "../SideBar/SideBar";
import RoutesNavigation from "../RoutesNavigation";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";

import { useLocation } from "react-router-dom";
const { Content } = Layout;
function Layouts() {
  const { currentUser, logout } = useAuth();
  const [student, setStudent] = useState(null);
  const [studentActivity, setStudentActivity] = useState(null);
  const [studentLastActivity, setStudentLastActivity] = useState(null);
  const [studentLastThreeWeekActivity, setStudentLastThreeWeekActivity] =
    useState(null);
  const [studentLastLeaveOfAbscence, setStudentLastLeaveOfAbscence] =
    useState(null);
  const [studentEnrollments, setStudentEnrollments] = useState(null);
  const [meetingPreference, setmeetingPreference] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function getStudent() {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:3001/student/info/${currentUser.email}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setmeetingPreference(
              getMeetingTimeP(data[0].meetingTimePreference, data[0].attributes)
            );
            setStudent(data);
            getStudentLastLeaveofAbscence(data[0].id);
            getStudentEnrollments(data[0].id);
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      return;
    }
    async function getStudentActivity() {
      try {
        setIsLoading(true);
        await fetch(
          `http://localhost:3001/student/activity/${currentUser.email}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStudentActivity(data);
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      return;
    }

    async function getStudentLastActivity() {
      try {
        setIsLoading(true);
        await fetch(
          `http://localhost:3001/student/lastactivity/${currentUser.email}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStudentLastActivity(data);
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      return;
    }

    async function getStudentLast3weekActivity() {
      try {
        setIsLoading(true);
        await fetch(
          `http://localhost:3001/student/lastactivities/3weeks/${currentUser.email}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStudentLastThreeWeekActivity(data);
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      return;
    }

    async function getStudentLastLeaveofAbscence(id) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:3001/student/leaveofabcenses/${id}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStudentLastLeaveOfAbscence(data);
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      return;
    }

    async function getStudentEnrollments(id) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:3001/student/enrollments/${id}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setStudentEnrollments(data);
          });
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
      return;
    }

    getStudent();
    getStudentActivity();
    getStudentLastActivity();
    getStudentLast3weekActivity();
  }, [currentUser.email]);

  function getMeetingTimeP(text, text2) {
    let str = text?.replace(/"/g, "").replace("[", "").replace("]", "");
    let str2 = text2?.studyTimes
      ?.replace(/"/g, "")
      .replace("[", "")
      .replace("]", "");
    let result;
    if (str !== undefined && str !== "no info") {
      result = [str];
      if (str.indexOf(";") !== -1) {
        result = str.split(";");
      }
      if (str.indexOf(",") !== -1) {
        result = str.split(",");
      }
      return result.map((s) => s.trim());
    } else if (str2 !== undefined) {
      result = [str2];
      if (str2.indexOf(";") !== -1) {
        result = str2.split(";");
      }
      if (str2.indexOf(",") !== -1) {
        result = str2.split(",");
      }
      return result.map((s) => s.trim());
    }
    return str2;
  }

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider={true}>
      <SideBar location={location} />
      {student && student.map ? (
        student.map((student) => (
          <Layout key={student.id} className={Styles.layout}>
            <LoggedInHeader
              logout={logout}
              student={student}
              location={location}
            />
            <Content className={Styles.content}>
              <RoutesNavigation
                student={student}
                meetingPreference={meetingPreference}
                studentActivity={studentActivity}
                studentLastActivity={studentLastActivity}
                studentLastThreeWeekActivity={studentLastThreeWeekActivity}
                studentLastLeaveOfAbscence={studentLastLeaveOfAbscence}
                studentEnrollments={studentEnrollments}
                location={location}
              />
            </Content>
          </Layout>
        ))
      ) : (
        <span className={Styles.spinnerContainer}>
          <CircularSpinner isShowing={isLoading} />
        </span>
      )}
    </Layout>
  );
}

export default Layouts;
