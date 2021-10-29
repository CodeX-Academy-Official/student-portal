import React, { useState, useEffect, useRef } from "react";
import { Progress, Tag, Table } from "antd";
import Styles from "./Overview.module.scss";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
export default function Overview({
  student,
  studentActivity,
  meetingPreference,
  studentLastActivity,
}) {
  console.log("Overview - Render lifecycle");
  console.log(studentActivity);
  console.log(studentLastActivity);

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
              <Progress percent={100} />
            </div>
          </div>
          <div className={`${Styles.whiteBox} ${Styles.whiteBoxLeft}`}>
            <div className={Styles.withPadding}>
              <h2>Badge Progress:</h2>
              <Progress percent={0} />
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
