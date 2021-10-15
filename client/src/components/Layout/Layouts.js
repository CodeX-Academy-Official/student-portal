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
  const isMounted = useRef(null);
  useEffect(() => {
    isMounted.current = true;
    getStudent();
    return () => {
      isMounted.current = false;
    };
  });

  async function getStudent() {
    try {
      await fetch(`http://localhost:3001/student/${currentUser.email}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setStudent(data);
        });
    } catch (error) {
      console.log(error);
    }
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
                    <Routes />
                  </Content>
                  <Footer> </Footer>
                </Layout>
              ))
            ) : (
              <></>
            )}
          </Layout>
        )}
      ></Route>
    </BrowserRouter>
  );
}

export default Layouts;
