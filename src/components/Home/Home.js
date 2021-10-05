import React, { useState } from 'react';
import Styles from './Home.module.scss';
import { Layout, Menu, Row, Col } from 'antd';
import logo from '../../img/logoIcon.png';
import hamburger from '../../img/menu-mobile.png';
import smallImage from '../../img/no-img.png';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
export default function Home() {
  const [collapsed, setcollapsed] = useState(false);
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
          <Header className={Styles.loggedInContainer}>
            <div className={Styles.mainMenuWrapper}>
              <Row align="middle">
                <img className={Styles.hamburgerIcon} src={hamburger} alt="" />

                <Col xs={15} sm={16} lg={19} xl={21}>
                  <h1>Overview</h1>
                </Col>
                <Col xs={8} sm={6} lg={4} xl={2}>
                  <h4>Phil Moris</h4>
                </Col>
                <Col xs={1} sm={1} lg={1} xl={1}>
                  <div className={Styles.imgContainer}>
                    <img src={smallImage} alt="Linkerease Logo" />
                  </div>
                </Col>
              </Row>
            </div>
          </Header>
          <Content className={Styles.content}></Content>
          <Footer></Footer>
        </Layout>
      </Layout>
    </>
  );
}
