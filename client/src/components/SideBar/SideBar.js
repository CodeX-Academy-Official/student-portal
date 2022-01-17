/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import logo from "../../img/logoIcon.png";
import Styles from "./SideBar.module.scss";
import { Link } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
function SideBar(props) {
  const [collapsed, setcollapsed] = useState(false);
  const [key, setkey] = useState("");
  const onCollapse = (collapsed) => {
    setcollapsed(collapsed);
  };

  useEffect(() => {
    switch (props.location.pathname) {
      case "/":
        setkey("1");
        break;
      case "/about":
        setkey("2");
        break;
      /*case "/mentor":
        setkey("3");
        break;
      case "/dynamite-sessions":
        setkey("4");
        break;
      case "/requests":
        setkey("5");
        break;*/
      default:
        setkey("1");
        break;
    }
  }, [props.location.pathname]);
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
      <Menu theme="dark" selectedKeys={[key]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <span>Overview</span>
          <Link to="/" />
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          About
          <Link to="/about" />
        </Menu.Item>
        {/*<Menu.Item key="3" icon={<TeamOutlined />}>
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
        </Menu.Item>*/}
      </Menu>
    </Sider>
  );
}

export default SideBar;
