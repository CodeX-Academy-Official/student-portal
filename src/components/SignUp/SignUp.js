import React from 'react';
import {
  Card,
  Form,
  Input,
  InputNumber,
  Cascader,
  Select,
  Checkbox,
  Button,
  AutoComplete,
  Typography,
  Space,
  Row,
  Col,
} from 'antd';
import Styles from './SignUp.module.scss';

const { Text, Link } = Typography;
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
export default function SignUp() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={Styles.SignUp}>
      <Row
        type="flex"
        justify="center"
        align="middle"
        style={{ minHeight: '100vh' }}
      >
        <Col xs={20} sm={16} md={16} lg={12} xl={8} xxl={5}>
          <Card title="Sign Up" className={Styles.Card}>
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              className={Styles.Form}
            >
              <Form.Item
                name="email"
                label="E-mail"
                className={Styles.item}
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ]}
              >
                <Input className={Styles.input} />
              </Form.Item>

              <Form.Item
                className={Styles.item}
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
                hasFeedback
              >
                <Input.Password className={Styles.input} />
              </Form.Item>

              <Form.Item
                name="confirm"
                className={Styles.item}
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error(
                          'The two passwords that you entered do not match!'
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password className={Styles.input} />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
            <Col
              xs={24}
              sm={16}
              md={16}
              lg={12}
              xl={20}
              xxl={24}
              justify="center"
              align="middle"
            >
              <Text>
                Already have an account?{' '}
                <Link href="https://ant.design" target="_blank">
                  Log In
                </Link>
              </Text>
            </Col>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
