import React from 'react';
import smallImage from '../../img/no-img.png';
import Styles from './LoggedInHeader.module.scss';
import { Layout, Row, Col } from 'antd';
import BottomNavBar from '../BottomNavbar/BottomNavbar';

const { Header } = Layout;
function LoggedInHeader() {
  return (
    <>
      <Header className={Styles.loggedInContainer}>
        <div className={Styles.mainMenuWrapper}>
          <Row align="middle">
            <Col xs={15} sm={16} lg={19} xl={20}>
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
      <BottomNavBar />
    </>
  );
}

export default LoggedInHeader;
