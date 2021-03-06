/* eslint-disable no-unused-vars */
/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Styles from "./BottomNavbar.module.scss";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const BottomNavBar = ({ pathname }) => {
  const [key, setkey] = useState("");
  useEffect(() => {
    switch (pathname) {
      case "/":
        setkey("1");
        break;
      case "/about":
        setkey("2");
        break;

      case "/mentor":
        setkey("3");
        break;
        {
          /*case "/dynamite-sessions":
        setkey("4");
        break;
      case "/requests":
        setkey("5");
          break;*/
        }
      default:
        setkey("1");
        break;
    }
  }, [pathname]);
  return (
    <div className={Styles.bottomNav}>
      <Menu theme="dark" selectedKeys={[key]} mode="horizontal">
        <Menu.Item key="1" className={Styles.bnTab} icon={<PieChartOutlined />}>
          <Link to="/">Overview</Link>
        </Menu.Item>
        <Menu.Item key="2" className={Styles.bnTab} icon={<UserOutlined />}>
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="3" className={Styles.bnTab} icon={<TeamOutlined />}>
          <Link to="/mentor">Mentor</Link>
        </Menu.Item>
        {/* <Menu.Item key="4" className={Styles.bnTab} icon={<DesktopOutlined />}>
          <Link to="/dynamite-sessions">dynamite-sessions</Link>
        </Menu.Item>
        <Menu.Item key="5" className={Styles.bnTab} icon={<FileOutlined />}>
          <Link to="/requests">requests</Link>
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default BottomNavBar;
