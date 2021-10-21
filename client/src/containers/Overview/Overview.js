import React, { useState, useEffect, useRef } from 'react';
import { Progress, Tag } from 'antd';
import Styles from './Overview.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import moment from 'moment';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import ActivityTable from '../../components/ActivityTable/ActivityTable';
export default function Overview({ student, meetingPreference }) {
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
              <h2>
                <strong>Last Activity:</strong>
              </h2>
              <Progress
                type="circle"
                percent={100}
                format={(percent) => `${student.LastActivity} Days Ago`}
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
                    {moment(student.expectedStartDate).format('MMMM Do YYYY')}
                  </h3>
                ) : (
                  <></>
                )}
                {student?.expectedEndDate ? (
                  <h3>
                    <strong>Expected End Date: </strong>
                    {moment(student.expectedEndDate).format('MMMM Do YYYY')}
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
              </div>
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
