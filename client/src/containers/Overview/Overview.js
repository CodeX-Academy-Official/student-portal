import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import Styles from './Overview.module.scss';

export default function Overview() {
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
            <div className={Styles.withPadding}></div>
          </div>
        </div>
        <div className={Styles.BottomOverview}>
          <div className={Styles.whiteBox}>
            <div className={Styles.withPadding}></div>
          </div>
        </div>
      </div>
    </>
  );
}
