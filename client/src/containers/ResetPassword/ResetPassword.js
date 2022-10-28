import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Alert, Divider, notification } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../img/logo.png";
import Styles from "./ResetPassword.module.scss";
import { SmileOutlined } from "@ant-design/icons";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const passwordRef = useRef();
  const navigate = useNavigate();
  const query = useQuery();
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");

  const openNotification = () => {
    notification.open({
      message: "Password Changed",
      description: "Password has been changed, you can login now.",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
    });
  };

  async function handleSubmit() {
    try {
      setIsLoading(true);
      await resetPassword(
        query.get("oobCode"),
        passwordRef.current.state.value
      );
      navigate("/log-in", { replace: true });
      openNotification();
    } catch (error) {
      setResetPasswordError("Email is not being used by the application");
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
      setResetPasswordError("");
    };
  }, [isLoading]);

  return (
    <div className={Styles.LogIn}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <div className={Styles.heading}>
            <img src={logo} alt="Linkerease Logo" className={Styles.logo} />
            <h1>Reset password</h1>
          </div>
          {resetPasswordError && (
            <Alert
              message={resetPasswordError}
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
              password: "",
              confirmPassword: "",
              remember: false,
            }}
            onFinish={handleSubmit}
          >
            <label
              className={`${Styles.passLabel} ${Styles.textGrey} formLabel`}
              htmlFor="password"
            >
              New password
            </label>

            <Form.Item
              validateTrigger="onBlur"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                allowClear
                ref={passwordRef}
                placeholder="Password"
              />
            </Form.Item>

            <Button
              className={`${Styles.forgotPassBtn}`}
              htmlType="submit"
              type="primary"
              shape="round"
              data-testid="submit"
            >
              Reset password
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

export default ResetPassword;
