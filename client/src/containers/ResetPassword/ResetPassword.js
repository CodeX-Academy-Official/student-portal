import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Alert, Divider } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../img/logo.png";
import Styles from "./ResetPassword.module.scss";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ResetPassword() {
  const history = useHistory();
  const query = useQuery();
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordError, setResetPasswordError] = useState("");
  const passwordRef = useRef();
  console.log(query.get("mode"), query.get("oobCode"));
  async function handleSubmit() {
    try {
      setIsLoading(true);
      await resetPassword(
        query.get("oobCode"),
        passwordRef.current.state.value
      );
      history.push("/log-in");
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
    return () => console.log("unmounting...");
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
            onClick={() => history.push("/log-in")}
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
