import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import logo from '../../img/logoIcon.png';
import Styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Sider } = Layout;
function SideBar({ selected }) {
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    console.log(collapsed);
    setcollapsed(collapsed);
  };
  return (
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
      <Menu theme="dark" defaultSelectedKeys={[selected]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <span>Overview</span>
          <Link to="/overview" />
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          About
          <Link to="/about" />
        </Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}>
          Mentor
          <Link to="/mentor" />
        </Menu.Item>
        <Menu.Item key="4" icon={<DesktopOutlined />}>
          Dynamite Sessions
          <Link to="/dynamite-sessions" />
        </Menu.Item>
        <Menu.Item key="5" icon={<FileOutlined />}>
          Requests
          <Link to="/requests" />
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideBar;
