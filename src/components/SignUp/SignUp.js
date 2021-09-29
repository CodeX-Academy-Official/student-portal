import React, { useState } from 'react';
import Styles from './SignUp.module.scss';
import { Form, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

export default function SignUp({ formRef }) {
  return (
    <div className={Styles.SignUp}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <div className={Styles.heading}>
            <img src={logo} alt="Linkerease Logo" className={Styles.logo} />
            <h1>Student Portal</h1>
            <h2>Sign Up</h2>
            {/*<p>let’s set up your student portal account</p>*/}
          </div>

          <Form
            name="setupAccount"
            ref={formRef}
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
                  min: 8,
                  message: 'Cannot be less than 8 characters',
                },
              ]}
            >
              <Input.Password allowClear />
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
    </div>
  );
}
