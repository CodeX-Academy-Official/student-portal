import React, { useState } from 'react';
import smallImage from '../../img/no-img.png';
import Styles from './LoggedInHeader.module.scss';
import { Layout, Row, Col, Popover, Button, Alert } from 'antd';
import BottomNavBar from '../BottomNavbar/BottomNavbar';
import { LogoutOutlined, CaretDownOutlined } from '@ant-design/icons';
import { link, useHistory } from 'react-router-dom';
const { Header } = Layout;
function LoggedInHeader({ logout }) {
  const [error, seterror] = useState('');
  const [show, setshow] = useState(false);
  const history = useHistory();
  const handleVisible = (visible) => {
    visible ? setshow(true) : setshow(false);
  };
  const handleLougout = async () => {
    seterror('');
    try {
      await logout();
      history.push('/log-in');
    } catch (error) {
      seterror('failed to logout');
    }
  };
  return (
    <>
      <Header className={Styles.loggedInContainer}>
        <div className={Styles.mainMenuWrapper}>
          <Row align="middle">
            <Col xs={18} sm={20} lg={21} xl={22}>
              <h1>Overview</h1>
            </Col>
            <Col xs={6} sm={4} lg={3} xl={2}>
              <Popover
                content={
                  <Button
                    type="link"
                    onClick={handleLougout}
                    className={Styles.button}
                  >
                    <LogoutOutlined /> Sign out
                  </Button>
                }
                title="Phil Morris"
                trigger="click"
                visible={show}
                onVisibleChange={handleVisible}
              >
                <Row>
                  <Col xs={23} sm={18} lg={16} xl={14}>
                    <div className={Styles.imgContainer}>
                      <img src={smallImage} alt="Linkerease Logo" />
                    </div>
                  </Col>
                  <Col xs={1} sm={1} lg={1} xl={1}>
                    <CaretDownOutlined className={Styles.arrowDown} />
                  </Col>
                </Row>
              </Popover>
            </Col>
          </Row>
        </div>
      </Header>
      <BottomNavBar />
      {error && <Alert message="Error" type="error" showIcon />}
    </>
  );
}

export default LoggedInHeader;
