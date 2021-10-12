import React, { useState, useEffect } from 'react';
import Styles from './Mentor.module.scss';
import { Layout } from 'antd';
import LoggedInHeader from '../../components/LoggedInHeader/LoggedInHeader';
import { useAuth } from '../../contexts/AuthContext';
import SideBar from '../../components/SideBar/SideBar';
const { Footer, Content } = Layout;
export default function Mentor() {
  const { currentUser, logout } = useAuth();
  const [student, setStudent] = useState(null);
  useEffect(() => {
    getStudent();
  });

  async function getStudent() {
    console.log(currentUser.email);
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
    <>
      <Layout style={{ minHeight: '100vh' }} hasSider={true}>
        <SideBar selected={'3'} />
        {student && student.map ? (
          student.map((student) => (
            <Layout key={student.id}>
              <LoggedInHeader
                logout={logout}
                student={student}
                title={'Mentor'}
              />
              <Content className={Styles.content}></Content>
              <Footer></Footer>
            </Layout>
          ))
        ) : (
          <></>
        )}
      </Layout>
    </>
  );
}
