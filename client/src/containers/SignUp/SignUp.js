import React, { useState, useRef, useEffect } from 'react';
import Styles from './SignUp.module.scss';
import { Form, Input, Button, Alert } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../img/logo.png';
import { useAuth } from '../../contexts/AuthContext';
import CircularSpinner from '../../components/CircularSpinner/CircularSpinner';
export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();
  const { signup } = useAuth();
  const [signUpError, setSignUpError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit() {
    try {
      setIsLoading(true);
      await fetch(
        `http://localhost:3001/student/${emailRef.current.state.value}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.length === 1) {
            signup(
              emailRef.current.state.value,
              passwordRef.current.state.value
            )
              .then(() => {
                history.push('/overview');
              })
              .catch(() => {
                setSignUpError('Email is already used');
              });
          } else {
            setSignUpError('Email is not in the database');
          }
        });
    } catch (error) {
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
            <h1>Sign Up to Student Portal</h1>
            <h4 className={Styles.textGrey}>
              Enter your email used for entering Codex
            </h4>
            {/*<p>let’s set up your student portal account</p>*/}
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
            }}
            onFinish={(e) => handleSubmit(e)}
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
              <Input allowClear ref={emailRef} placeholder="Email" />
            </Form.Item>

            <div>
              <span className={Styles.passTip}>8 or more characters</span>
              <label
                className={`${Styles.passLabel} ${Styles.textGrey} formLabel`}
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
              <Input.Password
                allowClear
                ref={passwordRef}
                placeholder="Password"
              />
            </Form.Item>

            <label
              htmlFor="confirmPassword"
              className={`${Styles.passLabel} ${Styles.textGrey} formLabel`}
            >
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
              <Input.Password allowClear placeholder="Confirm Password" />
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
