import React, { useState, useEffect, useRef } from 'react';
import Styles from './Layouts.module.scss';
import { Layout } from 'antd';
import LoggedInHeader from '../LoggedInHeader/LoggedInHeader';
import { useAuth } from '../../contexts/AuthContext';
import SideBar from '../SideBar/SideBar';
import Routes from '../Routes';

import { BrowserRouter, Route } from 'react-router-dom';
const { Footer, Content } = Layout;
function Layouts() {
  const { currentUser, logout } = useAuth();
  const [student, setStudent] = useState(null);
  const [studentActivity, setStudentActivity] = useState(null);
  const [studentLastActivity, setStudentLastActivity] = useState(null);
  const [meetingPreference, setmeetingPreference] = useState([]);

  console.log('Layouts - Render lifecycle');
  useEffect(() => {
    console.log('mounted');
    getStudent();
    getStudentActivity();
    getStudentLastActivity();
    return () => console.log('unmounting...');
  }, []);

  function getMeetingTimeP(text, text2) {
    let str = text?.replace(/"/g, '').replace('[', '').replace(']', '');
    let str2 = text2?.studyTimes
      ?.replace(/"/g, '')
      .replace('[', '')
      .replace(']', '');
    let result;
    if (str !== undefined && str !== 'no info') {
      result = [str];
      if (str.indexOf(';') != -1) {
        result = str.split(';');
      }
      if (str.indexOf(',') != -1) {
        result = str.split(',');
      }
      return result.map((s) => s.trim());
    } else if (str2 !== undefined) {
      result = [str2];
      if (str2.indexOf(';') != -1) {
        result = str2.split(';');
      }
      if (str2.indexOf(',') != -1) {
        result = str2.split(',');
      }
      return result.map((s) => s.trim());
    }
    return str2;
  }

  async function getStudent() {
    try {
      await fetch(`http://localhost:3001/student/info/${currentUser.email}`)
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
    return;
  }

  async function getStudentActivity() {
    try {
      await fetch(`http://localhost:3001/student/activity/${currentUser.email}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setStudentActivity(data);
        });
    } catch (error) {
      console.log(error);
    }
    return;
  }

  async function getStudentLastActivity() {
    try {
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
    return;
  }

  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <Layout style={{ minHeight: '100vh' }} hasSider={true}>
            <SideBar selected={'1'} />
            {student && student.map ? (
              student.map((student) => (
                <Layout key={student.id}>
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
                    />
                  </Content>
                </Layout>
              ))
            ) : (
              <h1>No Information found for this user</h1>
            )}
          </Layout>
        )}
      ></Route>
    </BrowserRouter>
  );
}

export default Layouts;
