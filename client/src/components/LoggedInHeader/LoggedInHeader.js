import React, { useState, useEffect, useRef } from "react";
import smallImage from "../../img/no-img.png";
import Styles from "./LoggedInHeader.module.scss";
import { Layout, Row, Col, Popover, Button, Alert } from "antd";
import BottomNavBar from "../BottomNavbar/BottomNavbar";
import { LogoutOutlined, CaretDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

function LoggedInHeader(props) {
  const [error, seterror] = useState("");
  const [show, setshow] = useState(false);
  const [title, setTitle] = useState("");
  const isMounted = useRef(null);
  const navigate = useNavigate();
  const handleVisible = (visible) => {
    visible ? setshow(true) : setshow(false);
  };
  const handleLougout = async () => {
    seterror("");
    try {
      await props.logout();
      navigate("/log-in", { replace: true });
    } catch (error) {
      seterror("failed to logout");
    }
  };
  useEffect(() => {
    isMounted.current = true;
    switch (props.location.pathname) {
      case "/":
        setTitle("Overview");
        break;
      case "/about":
        setTitle("About");
        break;
      case "/mentor":
        setTitle("Mentor");
        break;
      case "/dynamite-sessions":
        setTitle("Dynamite Sessions");
        break;
      case "/requests":
        setTitle("Requests");
        break;
      default:
        setTitle("");
        break;
    }

    return () => {
      isMounted.current = false;
    };
  }, [props.location.pathname]);
  return (
    <>
      <Header className={Styles.loggedInContainer}>
        <div className={Styles.mainMenuWrapper}>
          <Row align="middle">
            <Col xs={18} sm={20} lg={21} xl={22}>
              <h1>{title}</h1>
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
                title={props.student.firstName + " " + props.student.lastName}
                trigger="click"
                visible={show}
                onVisibleChange={handleVisible}
              >
                <Row>
                  <Col xs={23} sm={18} lg={16} xl={14}>
                    <div className={Styles.imgContainer}>
                      <img src={smallImage} alt="CodeXAcademy Logo" />
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
      <BottomNavBar pathname={props.location.pathname} />
      {error && <Alert message="Error" type="error" showIcon />}
    </>
  );
}

export default LoggedInHeader;
