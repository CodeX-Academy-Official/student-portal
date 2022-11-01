import React, { useState } from "react";
import {
  Progress,
  Tag,
  Table,
  Button,
  Modal,
  DatePicker,
  Input,
  notification,
  Divider,
  Statistic,
} from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import Styles from "./Overview.module.scss";
import moment from "moment";
import calendarIcon from "../../img/calendarIcon.svg";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const Context = React.createContext({ name: "Default" });

export default function Overview({
  student,
  studentActivity,
  meetingPreference,
  studentLastActivity,
  studentLastThreeWeekActivity,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (title, placement) => {
    api.info({
      message: `${title} Notification`,
      description: (
        <Context.Consumer>
          {({ name }) => `Requested Pause for, ${name}!`}
        </Context.Consumer>
      ),
      placement,
      duration: 5,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const targetCertificationName = student?.targetCertification;

  const getAttributes = () => {
    const attributes = student?.attributes;
    try {
      return JSON.parse(attributes);
    } catch (e) {
      return attributes;
    }
  };
  const currentBadges =
    getAttributes()?.badges === undefined ? 0 : Number(getAttributes()?.badges);
  const progressBarCertificationPercentage = () => {
    let targetCertification = 0;
    if (targetCertificationName === "Full-Stack Developer") {
      targetCertification = 80;
    } else if (targetCertificationName === "Front-End Developer") {
      targetCertification = 35;
    } else if (targetCertificationName === "Full-Stack Engineer") {
      targetCertification = 125;
    } else {
      targetCertification = 0;
    }
    return Math.round((currentBadges / targetCertification) * 100);
  };

  const getTargetCertifications = () => {
    switch (targetCertificationName) {
      case "Full-Stack Developer":
        return targetCertificationName + " (80)";
      case "Front-End Developer":
        return targetCertificationName + " (35)";
      case "Full-Stack Engineer":
        return targetCertificationName + " (125)";
      default:
        return "none(0)";
    }
  };

  const getStartDate = () => {
    const startDate = student?.expectedStartDate
      ? student.expectedStartDate
      : "";
    return moment(startDate).format("MMMM Do YYYY");
  };

  const getEndDate = () => {
    const endDate = student?.expectedEndDate ? student.expectedEndDate : "";
    return moment(endDate).format("MMMM Do YYYY");
  };

  const getTimeLinePercentage = () => {
    const start = new Date(student?.expectedStartDate);
    const end = new Date(student?.expectedEndDate);
    const today = new Date();
    return Math.round(((today - start) / (end - start)) * 100);
  };

  const handlePause = () => {
    setisLoading(true);
    openNotification("Pause", "topRight");
    setModalVisible(false);
  };

  const getPace = () => {
    const badges = studentLastThreeWeekActivity?.length;

    let pace = badges / 3;
    if (pace < 0) {
      pace = 0;
    }

    return Math.round(pace);
  };

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <p>{moment(text).format("MMM Do YY")}</p>,
    },
    {
      title: "Description",
      dataIndex: "info",
      key: "info",
    },
  ];
  return (
    <>
      <div className={Styles.Overview}>
        <div className={Styles.LeftOverview}>
          <div className={`${Styles.whiteBox} ${Styles.whiteBoxLeft}`}>
            <div className={Styles.withPadding}>
              <h2>Timeline:</h2>
              <p>
                <strong>Start Date ({getStartDate()})</strong>
              </p>
              <Progress
                percent={getTimeLinePercentage()}
                className={Styles.timeLine}
                strokeColor={
                  getTimeLinePercentage() <= 100 ? "limegreen" : "tomato"
                }
                status={getTimeLinePercentage() <= 100 ? "" : "exception"}
              />
              <p>
                <strong>End Date ({getEndDate()})</strong>
              </p>
            </div>
          </div>
          <div className={`${Styles.whiteBox} ${Styles.whiteBoxLeft}`}>
            <div className={Styles.withPadding}>
              <h2>Badge Progress:</h2>
              <p>
                <strong>Current ({currentBadges})</strong>
              </p>
              <Progress
                percent={progressBarCertificationPercentage()}
                className={Styles.badges}
              />
              <p>
                <strong>{getTargetCertifications()}</strong>
              </p>
            </div>
          </div>
          <div
            className={`${Styles.whiteBox} ${Styles.whiteBoxLeft} ${Styles.whiteBoxLeftButtom}`}
          >
            <div className={Styles.withPadding}>
              <div className={Styles.progressDiv}>
                <h2>Last Badge Awarded:</h2>
                <Progress
                  strokeColor={{
                    "0%": "#52c41a",
                    "100%": "#52c41a",
                  }}
                  type="circle"
                  percent={99}
                  format={() => `${student.LastActivity} Days Ago`}
                  className={Styles.progressCircle}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.RightOverview}>
          <div className={Styles.RightRightOverview}>
            <div className={`${Styles.whiteBox} ${Styles.whiteBoxRightRight}`}>
              <div className={Styles.withPadding}>
                <h2>Pace</h2>
                <Statistic
                  valueStyle={{ lineHeight: 2.2 }}
                  title="Badges Awarded per week"
                  value={getPace()}
                />
              </div>
            </div>
            <div className={`${Styles.whiteBox} ${Styles.whiteBoxRightRight}`}>
              <div className={Styles.withPadding}>
                <h2>Request Pause</h2>
                <div className={Styles.centerContent}>
                  <Button
                    type="primary"
                    onClick={() => setModalVisible(true)}
                    className={Styles.buttonPause}
                  >
                    New Pause
                  </Button>
                </div>
                <Modal
                  title="Request Pause"
                  centered
                  visible={modalVisible}
                  onCancel={() => setModalVisible(false)}
                  footer={[
                    <Button key="back" onClick={() => setModalVisible(false)}>
                      Return
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      loading={isLoading}
                      onClick={handlePause}
                    >
                      Submit
                    </Button>,
                  ]}
                  className={Styles.PauseModal}
                >
                  <div className={Styles.modalContent}>
                    <p className={Styles.PauseText}>
                      Start Date and End Date:{" "}
                    </p>
                    <RangePicker
                      className={Styles.PauseRangePicker}
                      required={true}
                    />
                    <p className={Styles.PauseText2}>
                      Why do you want to pause the program:{" "}
                    </p>
                    <TextArea
                      className={Styles.PauseTextArea}
                      placeholder="Description"
                      autoSize={{ minRows: 1, maxRows: 1 }}
                      required={true}
                    />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
          <div className={`${Styles.whiteBox} ${Styles.bottomWhiteBox}`}>
            <div className={Styles.withPadding}>
              <h2>Pause Progress:</h2>
              <p>
                <strong>Start Date ()</strong>
              </p>
              <Progress percent={0} className={Styles.timeLine} />
              <p>
                <strong>End Date ()</strong>
              </p>
            </div>
          </div>
          <div className={`${Styles.whiteBox} ${Styles.whiteBoxRight}`}>
            <div className={Styles.withPadding}>
              <h2>Today's Dynamite Session</h2>

              <div className={Styles.dynamiteSession}>
                <div className={Styles.greyBox}>
                  <img
                    src={calendarIcon}
                    alt="Linkerease Logo"
                    className={Styles.logo}
                  />
                </div>
                <Divider
                  type="vertical"
                  className={Styles.vertical}
                  style={{ borderWidth: 2, borderColor: "#e74c3c" }}
                />
                <h3 className={Styles.sessionDescription}>
                  Level 3 with JR Martinez
                </h3>
                <p className={Styles.sessionTime}>09:00 - 10:00 AM</p>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.BottomOverview}>
          <div className={`${Styles.whiteBox} ${Styles.bottomWhiteBox}`}>
            <div className={Styles.withPaddingBottom}>
              <h2>Latest Activity</h2>
              <Table
                columns={columns}
                dataSource={studentLastActivity}
                className={Styles.table}
                pagination={false}
              />
            </div>
          </div>
        </div>
        <Context.Provider
          value={{ name: student.firstName + " " + student.lastName }}
        >
          {contextHolder}
        </Context.Provider>
      </div>
    </>
  );
}
