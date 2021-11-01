import React from "react";
import { Progress, Tag, Table } from "antd";
import Styles from "./Overview.module.scss";
import moment from "moment";
export default function Overview({
  student,
  studentActivity,
  meetingPreference,
  studentLastActivity,
}) {
  console.log("Overview - Render lifecycle");
  console.log(studentActivity);
  console.log(studentLastActivity);

  const targetCertificationName = student?.targetCertification;

  const getAttributes = () => {
    const attributes = student?.attributes;
    try {
      return JSON.parse(attributes);
    } catch (e) {
      return attributes;
    }
  };

  const progressBarCertificationPercentage = () => {
    let targetCertification = 0;
    const currentBadges =
      getAttributes()?.badges === null ? 0 : Number(getAttributes()?.badges);
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
    const startDate =
      student?.expectedStartDate === undefined
        ? ""
        : student?.expectedStartDate;
    return moment(startDate).format("MMMM Do YYYY");
  };

  const getEndDate = () => {
    const endDate =
      student?.expectedEndDate === undefined ? "" : student?.expectedEndDate;
    return moment(endDate).format("MMMM Do YYYY");
  };

  const getTimeLinePercentage = () => {
    const start = new Date(student?.expectedStartDate);
    const end = new Date(student?.expectedEndDate);
    const today = new Date();
    return Math.round(((today - start) / (end - start)) * 100);
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
                <strong>Current ({getAttributes().badges})</strong>
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
                    "0%": "#1890ff",
                    "100%": "#1890ff",
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
              </div>
            </div>
            <div className={`${Styles.whiteBox} ${Styles.whiteBoxRightRight}`}>
              <div className={Styles.withPadding}>
                <h2>Request Pause</h2>
              </div>
            </div>
          </div>
          <div className={`${Styles.whiteBox} ${Styles.whiteBoxRight}`}>
            <div className={Styles.withPadding}>
              <h2>Today's Dynamite Session</h2>
            </div>
          </div>
          <div className={`${Styles.whiteBox} ${Styles.bottomWhiteBox}`}>
            <div className={Styles.withPadding}>
              <h2>Latest Activity</h2>
              <Table
                columns={columns}
                dataSource={studentLastActivity}
                className={Styles.table}
              />
            </div>
          </div>
        </div>
        <div className={Styles.BottomOverview}></div>
      </div>
    </>
  );
}
