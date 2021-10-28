import React, { useState, useEffect, useRef } from 'react';
import { Progress, Tag, Table } from 'antd';
import Styles from './Overview.module.scss';
import { useAuth } from '../../contexts/AuthContext';
import moment from 'moment';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
export default function Overview({
  student,
  studentActivity,
  meetingPreference,
  studentLastActivity,
}) {
  console.log('Overview - Render lifecycle');
  console.log(studentActivity);
  console.log(studentLastActivity);

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      responsive: ['md'],
      render: (text) => <p>{moment(text).format('MMM Do YY')}</p>,
    },
    {
      title: 'Description',
      dataIndex: 'info',
      key: 'info',
      responsive: ['lg'],
    },
  ];
  return (
    <>
      <div className={Styles.Overview}>
        <div className={Styles.LeftOverview}>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <h2>
                <strong>Timeline:</strong>
              </h2>
              <Progress percent={100} />
            </div>
          </div>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <h2>
                <strong>Badge Progress:</strong>
              </h2>
              <Progress percent={0} />
            </div>
          </div>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}>
              <h2>
                <strong>Last Badge Awarded:</strong>
              </h2>
              <Progress
                strokeColor={{
                  '0%': '#145DA0',
                  '100%': '#0C2D48',
                }}
                type="circle"
                percent={100}
                format={() => `${student.LastActivity} Days Ago`}
                className={Styles.progressCircle}
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
        <div className={Styles.BottomOverview}>
          <div className={`${Styles.whiteBox} ${Styles.bottomWhiteBox}`}>
            <div className={Styles.withPadding}>
              <h1>
                <strong>Latest Activity</strong>
              </h1>
              <Table columns={columns} dataSource={studentLastActivity} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
