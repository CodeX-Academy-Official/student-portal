import React from "react";
import moment from "moment";
import { Tag } from "antd";
import { CheckCircleFilled, CloseCircleFilled } from "@ant-design/icons";
import Styles from "./About.module.scss";

export default function About({ student, meetingPreference }) {
  return (
    <div className={Styles.About}>
      <div className={Styles.whiteBox}>
        <div className={Styles.withPadding}>
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
              {student.attributes.level}
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
        </div>
      </div>
    </div>
  );
}
