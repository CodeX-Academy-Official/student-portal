import React, { useState, useEffect, useRef } from 'react';
import { Progress } from 'antd';
import Styles from './Overview.module.scss';
import { useAuth } from '../../contexts/AuthContext';

export default function Overview({ student }) {
  return (
    <>
      <div className={Styles.Overview}>
        <div className={Styles.LeftOverview}>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <Progress percent={100} />
            </div>
          </div>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <Progress percent={0} />
            </div>
          </div>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <Progress
                type="circle"
                percent={75}
                format={(percent) => `${percent} Days`}
              />
            </div>
          </div>
        </div>
        <div className={Styles.RightOverview}>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <h2>
                <strong>
                  {student.firstName} {student.lastName}
                </strong>
              </h2>
              <h3>
                <strong>Target Certification: </strong>
                {student.targetCertification}
              </h3>
              <h3>
                <strong>Current Level: </strong>
                {student.attributes.level}
              </h3>
              <h3>
                <strong>Meeting Time Preference: </strong>
                {student.meetingTimePreference}
              </h3>
              {student?.expectedStartDate ? (
                <h3>
                  <strong>Expected Start Date: </strong>
                  {student.expectedStartDate}
                </h3>
              ) : (
                <></>
              )}
              {student?.expectedEndDate ? (
                <h3>
                  <strong>Expected End Date: </strong>
                  {student.expectedEndDate}
                </h3>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className={Styles.BottomOverview}>
          <div className={`${Styles.whiteBox} ${Styles.bottomWhiteBox}`}>
            <div className={Styles.withPadding}>
              <h1>
                <strong>Latest Activity</strong>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
