import React, { useState } from 'react';
import { Row, Col, Button, Form, Input } from 'antd';
import Styles from './LogIn.module.scss';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../img/logo.png';
export default function LogIn() {
  const onSubmit = async (values) => {
    const { email, password } = values;

    try {
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={Styles.LogIn}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <div className={Styles.heading}>
            <img src={logo} alt="Linkerease Logo" className={Styles.logo} />
            <h1>Student Portal</h1>
            <h2>Log In</h2>
            {/*<p>Sign in with your account to see your information.</p>*/}
          </div>
          <Form
            name="LogIn"
            className={Styles.formWrapper}
            initialValues={{
              email: '',
              password: '',
              confirmPassword: '',
              remember: false,
            }}
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
              <Input />
            </Form.Item>
            <label
              className={`${Styles.passLabel} formLabel`}
              htmlFor="password"
            >
              Password
            </label>

            <Form.Item
              validateTrigger="onBlur"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password allowClear />
            </Form.Item>

            <Button
              className={`${Styles.loginBtn} Btn`}
              htmlType="submit"
              type="primary"
              shape="round"
              data-testid="submit"
              // disabled={!isValid || !values.email || !values.password}
            >
              Sign Up
            </Button>
          </Form>
          {/* <div className={Styles.socialMediaContainer}>
            {socialIcons.map((icon, index) => (
              <Icon key={`social-icon-${index}`} component={icon} />
            ))}
          </div> */}
        </div>

        <div className={Styles.footer}>
          <p>
            Don't have an account yet? <Link to="/sign-up">Join now</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
