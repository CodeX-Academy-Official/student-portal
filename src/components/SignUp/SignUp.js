import React, { useState, useRef, useEffect } from 'react';
import Styles from './SignUp.module.scss';
import { Form, Input, Button, Alert } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import CircularSpinner from '../CircularSpinner/CircularSpinner';
export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup, currentUser } = useAuth();
  const [signUpError, setSignUpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      await signup(
        emailRef.current.state.value,
        passwordRef.current.state.value
      );
    } catch (error) {
      setSignUpError('Email is already used');
      console.log(error.message);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  }, [isLoading]);
  return (
    <div className={Styles.SignUp}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <div className={Styles.heading}>
            <img src={logo} alt="Linkerease Logo" className={Styles.logo} />
            <h1>Student Portal</h1>
            <h2>Sign Up</h2>
            {/*<p>let’s set up your student portal account</p>*/}
            {currentUser.email}
          </div>
          {signUpError && (
            <Alert
              message={signUpError}
              type="error"
              showIcon
              className={Styles.Alert}
            />
          )}
          <Form
            name="setupAccount"
            className={Styles.formWrapper}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              remember: false,
            }}
            onFinish={handleSubmit}
          >
            <label htmlFor="email" className="formLabel">
              Email
            </label>
            <Form.Item
              validateTrigger="onBlur"
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                ({ getFieldValue }) => ({
                  async validator(rule, value) {},
                }),
              ]}
            >
              <Input ref={emailRef} />
            </Form.Item>

            <div>
              <span className={Styles.passTip}>8 or more characters</span>
              <label
                className={`${Styles.passLabel} formLabel`}
                htmlFor="password"
              >
                Password
              </label>
            </div>
            <Form.Item
              validateTrigger="onBlur"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },

                {
                  message:
                    'Your password must contain lower and uppercase letters, digits, and special characters and cannot be less than 8 characters.',
                  pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                },
              ]}
            >
              <Input.Password allowClear ref={passwordRef} />
            </Form.Item>

            <label htmlFor="confirmPassword" className="formLabel">
              Confirm Password
            </label>
            <Form.Item
              validateTrigger="onBlur"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    );
                  },
                }),
              ]}
            >
              <Input.Password allowClear />
            </Form.Item>
            <Button
              className={`${Styles.signupBtn} Btn`}
              htmlType="submit"
              type="primary"
              shape="round"
              data-testid="submit"
              disabled={isLoading}
              // disabled={!isValid || !values.email || !values.password}
            >
              Sign Up
            </Button>
          </Form>
        </div>
        <div className={Styles.footer}>
          <p>
            Already have an account? <Link to="/log-in">Log In</Link>
          </p>
        </div>
      </div>
      <span className={Styles.spinnerContainer}>
        <CircularSpinner isShowing={isLoading} />
      </span>
    </div>
  );
}
