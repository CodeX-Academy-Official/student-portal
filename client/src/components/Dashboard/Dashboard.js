import React, { useState, useEffect } from 'react';
import Styles from './Dashboard.module.scss';
import { Layout, Menu } from 'antd';
import logo from '../../img/logoIcon.png';
import LoggedInHeader from '../LoggedInHeader/LoggedInHeader';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
const { Footer, Sider, Content } = Layout;
export default function Home() {
  const [collapsed, setcollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const [student, setStudent] = useState(null);
  useEffect(() => {
    getStudent();
  }, []);

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

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setcollapsed(collapsed);
  };
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          className={Styles.sider}
        >
          <div className={Styles.logo}>
            <img src={logo} alt="Linkerease Logo" />
            <h3 className={Styles.logoText} hidden={collapsed}>
              Student Portal
            </h3>
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Overview
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              About
            </Menu.Item>
            <Menu.Item key="3" icon={<TeamOutlined />}>
              Mentor
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              Dynamite Sessions
            </Menu.Item>
            <Menu.Item key="5" icon={<FileOutlined />}>
              Requests
            </Menu.Item>
          </Menu>
        </Sider>
        {student && student.map
          ? student.map((student) => (
              <Layout key={student.id}>
                <LoggedInHeader logout={logout} student={student} />
                <Content className={Styles.content}></Content>
                <Footer></Footer>
              </Layout>
            ))
          : 'There is no student data available for this email'}
      </Layout>
    </>
  );
}
