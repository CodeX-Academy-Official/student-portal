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

export default function About({ student, meetingPreference, getStudent }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();

  const openNotification = (title, placement) => {
    api.info({
      message: `${title} Notification`,
      description: (
        <Context.Consumer>
          {({ name }) => `Updated Information for ${name} !`}
        </Context.Consumer>
      ),
      placement,
      duration: 5,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const openNotificationRequestEmail = (title, placement) => {
    api.info({
      message: `${title} Notification`,
      description: (
        <Context.Consumer>
          {({ name }) => `Request sent for ${name} !`}
        </Context.Consumer>
      ),
      placement,
      duration: 5,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const handleUpdateInfoChange = async (values) => {
    setisLoading(true);
    try {
      await fetch(
        `https://codex-student-portal-server.herokuapp.com/student/info/update/${student?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then(() => {
          getStudent();
          openNotification("Updated Information", "topRight");
          setModalVisible(false);
          setisLoading(false);
          form2.resetFields();
        });
    } catch (error) {
      console.log(error);
    }
  };
  const requestEmailChange = (values) => {
    setisLoading2(true);
    try {
      fetch(
        `https://hooks.zapier.com/hooks/catch/6492165/b8ffnok/?firstName=${student.firstName}&lastName=${student.lastName}&currentEmail=${student.email}&newEmail=${values.email}`,
        {
          method: "POST",
        }
      );
      openNotificationRequestEmail("Requested Email Change", "topRight");
      setModalVisible2(false);
      setisLoading2(false);
      form2.resetFields();
    } catch (error) {
      console.log(error);
    }
  };
  const handlePlacementService = () => {
    if (student.level >= 3) {
      console.log(student);
      requestPlacementService();
      success();
    } else {
      error();
    }
  };

  const requestPlacementService = () => {
    fetch(
      `https://hooks.zapier.com/hooks/catch/6492165/bbltgp1/?studentId=${student.id}&Level=${student.level}`,
      {
        method: "POST",
      }
    );
  };

  const handleMeetingTimePreference = (time) => {
    let str = time?.replace(/"/g, "").replace("[", "").replace("]", "");
    let result;
    if (str !== undefined && str !== "no info") {
      result = [str];
      if (str.indexOf(";") !== -1) {
        result = str.split(";");
      }
      if (str.indexOf(",") !== -1) {
        result = str.split(",");
      }
      return result.map((s) => s.trim());
    }
  };

  function success() {
    Modal.success({
      content: "Requested placement service!",
    });
  }

  function error() {
    Modal.error({
      title: "Not Qualified yet",
      content: "You have to be on level 3 or above to request placement",
    });
  }

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
              onFinish={handleUpdateInfoChange}
              form={form}
              initialValues={{
                firstName: student?.firstName,
                lastName: student?.lastName,
                meetingTimePreference: handleMeetingTimePreference(
                  student?.meetingTimePreference
                ),
                birthDate: moment(student?.birthDate),
                coachingIntensity: student?.coachingIntensity?.toString(),
                coachingHumor: student?.coachingHumor?.toString(),
              }}
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
                name="meetingTimePreference"
                rules={[
                  {
                    required: true,
                    message: "Meeting Time Preference is required",
                  },
                ]}
              >
                <Select
                  placeholder="Select Meeting Time Preference"
                  mode="multiple"
                  allowClear
                >
                  <Option value="Morning">Morning</Option>
                  <Option value="Mid-Day">Mid-Day</Option>
                  <Option value="Afternoon">Afternoon</Option>
                  <Option value="Early Evening">Early Evening</Option>
                  <Option value="Evening">Evening</Option>
                  <Option value="Late-Night">Late-Night</Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ display: "inline-block", width: "calc(50% - 12px)" }}
                name="birthDate"
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
          <Modal
            visible={modalVisible2}
            title="Request Email Change"
            onCancel={() => setModalVisible2(false)}
            footer={[
              <Button
                shape="round"
                key="back"
                onClick={() => setModalVisible2(false)}
              >
                Return
              </Button>,
              <Button
                form="updateEmail"
                shape="round"
                key="submit"
                type="primary"
                loading={isLoading2}
                htmlType="submit"
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              id="updateEmail"
              onFinish={requestEmailChange}
              form={form2}
              initialValues={{
                email: student?.email,
              }}
            >
              <Form.Item
                label="New Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your new email",
                  },
                ]}
              >
                <Input type="email" />
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
              <strong>Email: </strong>
              {student?.email}
            </h3>
            <h3>
              <strong>Target Certification: </strong>
              {student?.targetCertification}
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
            {student?.coachingHumor ? (
              <h3>
                <strong>Coaching Humor: </strong>
                {student?.coachingHumor}
              </h3>
            ) : (
              <></>
            )}
            {student?.coachingIntensity ? (
              <h3>
                <strong>Coaching Intensity: </strong>
                {student?.coachingIntensity}
              </h3>
            ) : (
              <></>
            )}
            {student?.birthDate ? (
              <h3>
                <strong>Birth Date: </strong>
                {moment(student.birthDate).format("MMMM Do YYYY")}
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
              onClick={() => setModalVisible2(true)}
            >
              Request Email Change
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<VerticalAlignBottomOutlined />}
              size={"large"}
              className={Styles.third}
              onClick={handlePlacementService}
            >
              Request Placement Service
            </Button>
          </div>
        </div>
      </div>
      <Context.Provider
        value={{ name: student?.firstName + " " + student?.lastName }}
      >
        {contextHolder}
      </Context.Provider>
    </div>
  );
}
