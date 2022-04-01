import React, { useState } from "react";
import moment from "moment";
import { Tag } from "antd";
import {
  Button,
  Modal,
  Select,
  DatePicker,
  Form,
  Input,
  Radio,
  notification,
} from "antd";

import {
  CheckCircleFilled,
  CloseCircleFilled,
  FormOutlined,
  VerticalAlignBottomOutlined,
  MailOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import Styles from "./About.module.scss";
const { Option } = Select;
const Context = React.createContext({ name: "Default" });

export default function About({ student, meetingPreference }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const openNotification = (title, placement) => {
    api.info({
      message: `${title} Notification`,
      description: (
        <Context.Consumer>
          {({ name }) => `Updated Information for ${name}!`}
        </Context.Consumer>
      ),
      placement,
      duration: 5,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const handleMentorChange = () => {
    setisLoading(true);
    openNotification("Updated Information", "topRight");
    setModalVisible(false);
    setisLoading(false);
    form.resetFields();
  };

  return (
    <div className={Styles.About}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <Modal
            visible={modalVisible}
            title="Request Change of Information"
            onCancel={() => setModalVisible(false)}
            footer={[
              <Button
                shape="round"
                key="back"
                onClick={() => setModalVisible(false)}
              >
                Return
              </Button>,
              <Button
                form="updateInfo"
                shape="round"
                key="submit"
                type="primary"
                loading={isLoading}
                htmlType="submit"
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              id="updateInfo"
              onFinish={handleMentorChange}
              form={form}
            >
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: true,
                    message: "Please input your last name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Meeting Time Preference"
                rules={[
                  {
                    required: true,
                    message: "Meeting Time Preference is required",
                  },
                ]}
              >
                <Select placeholder="Select Meeting Time Preference">
                  <Option value="Mid-Day">Mid-Day</Option>
                  <Option value="Afternoon">Afternoon</Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                label="Birth Date"
              >
                <DatePicker />
              </Form.Item>
              <Form.Item
                label="Coaching Intensity"
                name="coachingIntensity"
                rules={[
                  {
                    required: true,
                    message: "Please check on of the boxes",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="Coaching Humor"
                name="coachingHumor"
                rules={[
                  {
                    required: true,
                    message: "Please check on of the boxes",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1">1</Radio>
                  <Radio value="2">2</Radio>
                  <Radio value="3">3</Radio>
                  <Radio value="4">4</Radio>
                  <Radio value="5">5</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>
          <h2>
            <strong>
              {student.firstName} {student.lastName}
            </strong>
          </h2>
          <div className={Styles.details}>
            <h3>
              <strong>Target Certification: </strong>
              {student.targetCertification}
            </h3>
            <h3>
              <strong>Current Level: </strong>
              {student?.level}
            </h3>

            {student?.expectedStartDate ? (
              <h3>
                <strong>Expected Start Date: </strong>
                {moment(student.expectedStartDate).format("MMMM Do YYYY")}
              </h3>
            ) : (
              <></>
            )}
            {student?.expectedEndDate ? (
              <h3>
                <strong>Expected End Date: </strong>
                {moment(student.expectedEndDate).format("MMMM Do YYYY")}
              </h3>
            ) : (
              <></>
            )}
            {student?.isActive ? (
              <h3>
                <strong>Active: </strong>
                <CheckCircleFilled className={Styles.check} />
              </h3>
            ) : (
              <h3>
                <strong>Active: </strong>
                <CloseCircleFilled className={Styles.inactive} />
              </h3>
            )}
            {student?.meetingTimePreference ? (
              <div>
                <h3 className={Styles.meetingPreferenceTitle}>
                  <strong>Meeting Time Preference: </strong>
                </h3>
                <ul className={Styles.meetingPreferenceList}>
                  <h3>
                    {meetingPreference.map((d, index) => (
                      <Tag color="geekblue" key={index}>
                        {d}
                      </Tag>
                    ))}
                  </h3>
                </ul>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className={Styles.actions}>
            <Button
              type="primary"
              shape="round"
              icon={<FormOutlined />}
              size={"large"}
              className={Styles.primary}
              onClick={() => setModalVisible(true)}
            >
              Update Information
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<MailOutlined />}
              size={"large"}
              className={Styles.secondary}
            >
              Request Email Change
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<VerticalAlignBottomOutlined />}
              size={"large"}
              className={Styles.third}
            >
              Request Placement Service
            </Button>
          </div>
        </div>
      </div>
      <Context.Provider
        value={{ name: student.info?.firstName + " " + student.info?.lastName }}
      >
        {contextHolder}
      </Context.Provider>
    </div>
  );
}
