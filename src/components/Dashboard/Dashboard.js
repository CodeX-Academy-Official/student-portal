import React, { useState } from 'react';
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
        <Layout>
          <LoggedInHeader logout={logout} />
          <Content className={Styles.content}>
            <strong>Email:</strong>
            {currentUser.email}
          </Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </>
  );
}
