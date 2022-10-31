import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Alert, Divider, notification } from "antd";
import { useNavigate } from "react-router-dom";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../img/logo.png";
import { SmileOutlined } from "@ant-design/icons";
import Styles from "./ForgotPassword.module.scss";

function ForgotPassword() {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [forgetPasswordError, setforgetPasswordError] = useState("");

  const openNotification = (email) => {
    notification.open({
      message: "Email Sent",
      description: `An email is sent to ${email} for password reset instructions.`,
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  async function handleSubmit() {
    try {
      setIsLoading(true);
      await forgotPassword(emailRef.current.state.value);
      openNotification(emailRef.current.state.value);
    } catch (error) {
      setforgetPasswordError("Email is not being used by the application");
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }

    return function cleanup() {
      setIsLoading(false);
      setforgetPasswordError("");
    };
  }, [isLoading]);

  return (
    <div className={Styles.LogIn}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <div className={Styles.heading}>
            <img src={logo} alt="Linkerease Logo" className={Styles.logo} />
            <h1>Forgot password</h1>
          </div>
          {forgetPasswordError && (
            <Alert
              message={forgetPasswordError}
              type="error"
              showIcon
              className={Styles.Alert}
            />
          )}
          <Form
            name="LogIn"
            className={Styles.formWrapper}
            initialValues={{
              email: "",
              remember: false,
            }}
            onFinish={handleSubmit}
          >
            <label
              htmlFor="email"
              className={`${Styles.passLabel} ${Styles.textGrey} formLabel`}
            >
              Email
            </label>
            <Form.Item
              validateTrigger="onBlur"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                ({ getFieldValue }) => ({
                  async validator(rule, value) {},
                }),
              ]}
            >
              <Input allowClear ref={emailRef} placeholder="Email address" />
            </Form.Item>

            <Button
              className={`${Styles.forgotPassBtn}`}
              htmlType="submit"
              type="primary"
              shape="round"
              data-testid="submit"
            >
              Submit
            </Button>
          </Form>
          <Divider>OR</Divider>
          <Button
            className={`${Styles.loginBtn}`}
            type="primary"
            shape="round"
            onClick={() => navigate("/log-in", { replace: true })}
          >
            Login
          </Button>
        </div>
      </div>
      <span className={Styles.spinnerContainer}>
        <CircularSpinner isShowing={isLoading} />
      </span>
    </div>
  );
}

export default ForgotPassword;
