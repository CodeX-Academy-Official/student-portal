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
  WarningOutlined,
  MailOutlined,
  CheckCircleTwoTone,
} from "@ant-design/icons";
import Styles from "./About.module.scss";

const { Option } = Select;
const { TextArea } = Input;
const Context = React.createContext({ name: "Default" });

export default function About({ student, meetingPreference, getStudent }) {
  const [updateInfoModalVisible, setUpdateInfoModalVisible] = useState(false);
  const [changeEmailModalVisible, setChangeEmailModalVisible] = useState(false);
  const [withdrawModalVisible, setWithdrawModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [updateInformationForm] = Form.useForm();
  const [changeEmailForm] = Form.useForm();
  const [withdrawForm] = Form.useForm();

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
    setIsLoading(true);
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
          setUpdateInfoModalVisible(false);
          setIsLoading(false);
          changeEmailForm.resetFields();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const requestEmailChange = (values) => {
    setIsLoading2(true);
    try {
      fetch(
        `https://hooks.zapier.com/hooks/catch/6492165/b8ffnok/?firstName=${student.firstName}&lastName=${student.lastName}&currentEmail=${student.email}&newEmail=${values.email}`,
        {
          method: "POST",
        }
      );
      openNotificationRequestEmail("Requested Email Change", "topRight");
      setChangeEmailModalVisible(false);
      setIsLoading2(false);
      changeEmailForm.resetFields();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlacementService = () => {
    if (student.level >= 3) {
      console.log(student);
      requestPlacementService();
      Modal.success({
        content: "Requested placement service!",
      });
    } else {
      Modal.error({
        title: "Not Qualified yet",
        content: "You have to be on level 3 or above to request placement",
      });
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

  const handleWithdraw = (values) => {
    setIsLoading3(true);
    requestWithdraw(values);
    setWithdrawModalVisible(false);
    setIsLoading3(false);
  };

  const requestWithdraw = (formData) => {
    try {
      fetch(`https://eooooena9evuq5h.m.pipedream.net`, {
        method: "POST",
        body: JSON.stringify({
          student: student,
          withdrawDate:
            formData.withdrawDate || moment(new Date(), "YYYY-MM-DD"),
          withdrawReason: formData.withdrawReason || "",
        }),
      });
      withdrawForm.resetFields();
      Modal.success({
        content: "Withdraw requested!",
      });
    } catch (error) {
      Modal.error({
        title: "Sorry",
        content: "There was an error requesting your withdraw",
      });
      console.error(error);
    }
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

  const parseDate = (date) => {
    const parts = date.split("T");
    const onlyDate = parts.length ? parts[0] : "";
    return moment(onlyDate).format("MMMM Do, YYYY");
  };

  return (
    <div className={Styles.About}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
          <Modal
            centered
            visible={updateInfoModalVisible}
            title="Request Change of Information"
            onCancel={() => setUpdateInfoModalVisible(false)}
            footer={[
              <Button
                shape="round"
                key="back"
                onClick={() => setUpdateInfoModalVisible(false)}
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
              form={updateInformationForm}
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
            centered
            visible={changeEmailModalVisible}
            title="Request Email Change"
            onCancel={() => setChangeEmailModalVisible(false)}
            footer={[
              <Button
                shape="round"
                key="back"
                onClick={() => setChangeEmailModalVisible(false)}
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
              form={changeEmailForm}
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
          <Modal
            centered
            visible={withdrawModalVisible}
            title="Request Withdraw"
            onCancel={() => setWithdrawModalVisible(false)}
            footer={[
              <Button
                shape="round"
                key="back"
                onClick={() => setWithdrawModalVisible(false)}
              >
                Return
              </Button>,
              <Button
                form="withdraw"
                shape="round"
                key="submit"
                type="primary"
                loading={isLoading3}
                htmlType="submit"
              >
                Submit
              </Button>,
            ]}
          >
            <Form
              layout="vertical"
              id="withdraw"
              onFinish={handleWithdraw}
              form={withdrawForm}
              initialValues={{
                withdrawDate: moment(new Date(), "YYYY-MM-DD"),
                withdrawReason: "",
              }}
            >
              <Form.Item
                label="Withdraw reason"
                name="withdrawReason"
                rules={[
                  {
                    required: true,
                    message: "Please tell us why you want to withdraw",
                  },
                ]}
              >
                <TextArea
                  rows={4}
                  placeholder="Please tell us why you want to withdraw"
                />
              </Form.Item>
              <Form.Item
                label="Withdraw Date"
                name="withdrawDate"
                rules={[
                  {
                    required: true,
                    message: "Please input your withdraw date",
                  },
                ]}
              >
                <DatePicker />
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
                {parseDate(student.expectedStartDate)}
              </h3>
            ) : (
              <></>
            )}
            {student?.expectedEndDate ? (
              <h3>
                <strong>Expected End Date: </strong>
                {parseDate(student.expectedEndDate)}
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
                {parseDate(student.birthDate)}
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
              onClick={() => setUpdateInfoModalVisible(true)}
            >
              Update Information
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<MailOutlined />}
              size={"large"}
              className={Styles.secondary}
              onClick={() => setChangeEmailModalVisible(true)}
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
            <Button
              type="primary"
              shape="round"
              icon={<WarningOutlined />}
              size={"large"}
              className={Styles.danger}
              onClick={() => setWithdrawModalVisible(true)}
            >
              Withdraw from Codex Academy
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
