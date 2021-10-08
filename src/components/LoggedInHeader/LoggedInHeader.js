import React, { useState } from 'react';
import smallImage from '../../img/no-img.png';
import Styles from './LoggedInHeader.module.scss';
import { Layout, Row, Col, Popover } from 'antd';
import BottomNavBar from '../BottomNavbar/BottomNavbar';
import { LogoutOutlined, CaretDownOutlined } from '@ant-design/icons';
const { Header } = Layout;
function LoggedInHeader() {
  const [show, setshow] = useState(false);
  const handleVisible = (visible) => {
    visible ? setshow(true) : setshow(false);
  };
  return (
    <>
      <Header className={Styles.loggedInContainer}>
        <div className={Styles.mainMenuWrapper}>
          <Row align="middle">
            <Col xs={18} sm={20} lg={21} xl={22}>
              <h1>Overview</h1>
            </Col>
            <Col xs={5} sm={3} lg={2} xl={1}>
              <Popover
                content={
                  <p>
                    <LogoutOutlined /> Sign out
                  </p>
                }
                title="Phil Morris"
                trigger="click"
                visible={show}
                onVisibleChange={handleVisible}
              >
                <div className={Styles.imgContainer}>
                  <img src={smallImage} alt="Linkerease Logo" />
                </div>
              </Popover>
            </Col>
            <Col xs={1} sm={1} lg={1} xl={1}>
              <CaretDownOutlined className={Styles.arrowDown} />
            </Col>
          </Row>
        </div>
      </Header>
      <BottomNavBar />
    </>
  );
}

export default LoggedInHeader;
