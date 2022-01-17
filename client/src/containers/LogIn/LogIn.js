import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Alert } from "antd";
import Styles from "./LogIn.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../img/logo.png";
import CircularSpinner from "../../components/CircularSpinner/CircularSpinner";
export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [signInError, setSignUpError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit() {
    try {
      setIsLoading(true);
      await login(
        emailRef.current.state.value,
        passwordRef.current.state.value
      );
      navigate("/", { replace: true });
    } catch (error) {
      setSignUpError("Username and/or password are incorrect.");
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
            <h1>Log In to Student Portal</h1>
            <h4 className={Styles.textGrey}>
              Enter your email and password below
            </h4>
            {/*<p>Sign in with your account to see your information.</p>*/}
          </div>
          {signInError && (
            <Alert
              message={signInError}
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
            <label
              className={`${Styles.passLabel} ${Styles.textGrey} formLabel`}
              htmlFor="password"
            >
              Password
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
              className={`${Styles.loginBtn} Btn`}
              htmlType="submit"
              type="primary"
              shape="round"
              data-testid="submit"
              // disabled={!isValid || !values.email || !values.password}
            >
              Log In
            </Button>
          </Form>
          {/* <div className={Styles.socialMediaContainer}>
            {socialIcons.map((icon, index) => (
              <Icon key={`social-icon-${index}`} component={icon} />
            ))}
          </div> */}
        </div>

        <div className={Styles.footer}>
          <Link className={Styles.forgotPassword} to="/forgot-password">
            Forgot Password?
          </Link>
          <p>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </p>
        </div>
      </div>
      <span className={Styles.spinnerContainer}>
        <CircularSpinner isShowing={isLoading} />
      </span>
    </div>
  );
}
