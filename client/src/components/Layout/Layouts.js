import React, { useState, useEffect } from "react";
import Styles from "./Layouts.module.scss";
import { Layout } from "antd";
import LoggedInHeader from "../LoggedInHeader/LoggedInHeader";
import { useAuth } from "../../contexts/AuthContext";
import SideBar from "../SideBar/SideBar";
import Routes from "../Routes";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";

import { BrowserRouter, Route } from "react-router-dom";
const { Content } = Layout;
function Layouts() {
  const { currentUser, logout } = useAuth();
  const [student, setStudent] = useState(null);
  const [studentActivity, setStudentActivity] = useState(null);
  const [studentLastActivity, setStudentLastActivity] = useState(null);
  const [studentLastThreeWeekActivity, setStudentLastThreeWeekActivity] =
    useState(null);
  const [meetingPreference, setmeetingPreference] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Layouts - Render lifecycle");
  useEffect(() => {
    console.log("mounted");
    async function getStudent() {
      try {
        setIsLoading(true);
        await fetch(
          `https://codex-student-portal-server.herokuapp.com/student/info/${currentUser.email}`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setmeetingPreference(
              getMeetingTimeP(data[0].meetingTimePreference, data[0].attributes)
            );
            setStudent(data);
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
          `https://codex-student-portal-server.herokuapp.com/student/activity/${currentUser.email}`
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
          `https://codex-student-portal-server.herokuapp.com/student/lastactivity/${currentUser.email}`
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
          `https://codex-student-portal-server.herokuapp.com/student/lastactivities/3weeks/${currentUser.email}`
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
    getStudent();
    getStudentActivity();
    getStudentLastActivity();
    getStudentLast3weekActivity();
    return () => console.log("unmounting...");
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
    <BrowserRouter>
      <Route
        render={(props) => (
          <Layout style={{ minHeight: "100vh" }} hasSider={true}>
            <SideBar {...props} />
            {student && student.map ? (
              student.map((student) => (
                <Layout key={student.id} className={Styles.layout}>
                  <LoggedInHeader
                    logout={logout}
                    student={student}
                    {...props}
                  />
                  <Content className={Styles.content}>
                    <Routes
                      student={student}
                      meetingPreference={meetingPreference}
                      studentActivity={studentActivity}
                      studentLastActivity={studentLastActivity}
                      studentLastThreeWeekActivity={
                        studentLastThreeWeekActivity
                      }
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
        )}
      ></Route>
    </BrowserRouter>
  );
}

export default Layouts;
