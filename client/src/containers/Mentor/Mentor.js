import React, { useState } from "react";
import Styles from "./Mentor.module.scss";
import smallImage from "../../img/no-img.png";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Modal, notification, Divider } from "antd";

const Context = React.createContext({ name: "Default" });

export default function Mentor({
  student,
  mentorsinformation,
  currentMentorInfo,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [isLoading, setisLoading] = useState(false);
  const [disable, setDisable] = React.useState(false);

  const openNotification = (title, placement) => {
    api.info({
      message: `${title} Notification`,
      description: (
        <Context.Consumer>
          {({ name }) => `Requested Mentor Change for ${name}!`}
        </Context.Consumer>
      ),
      placement,
      duration: 5,
      icon: <CheckCircleTwoTone twoToneColor="#52c41a" />,
    });
  };

  const handleMentorChange = () => {
    setisLoading(true);
    fetch(
      `https://hooks.zapier.com/hooks/catch/6492165/bbl4f4q/?studentId=${student.id}`,
      {
        method: "POST",
      }
    );
    openNotification("Mentor Changed", "topRight");
    setDisable(true);
    setModalVisible(false);
  };

  return (
    <section className={Styles.section_Mentor}>
      <Modal
        title="Request Mentor Change"
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="back" onClick={() => setModalVisible(false)}>
            No
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={handleMentorChange}
          >
            Yes
          </Button>,
        ]}
        className={Styles.PauseModal}
      >
        <div className={Styles.modalContent}>
          <h2>Are you sure you want to change mentor?</h2>
        </div>
      </Modal>
      {currentMentorInfo ? (
        <>
          <div
            className={`${Styles.u_center_text} ${Styles.u_margin_bottom_small}`}
          >
            <h2 className={Styles.heading_secundary}>Meet your Mentor</h2>
          </div>
          <section className={Styles.current_mentor}>
            <div className={Styles.mentor_box}>
              <i className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}></i>
              <div className={Styles.card_heading}>
                <div className={Styles.card_picture}>
                  <div className={Styles.imgContainer}>
                    <img
                      src={
                        currentMentorInfo?.image === ""
                          ? smallImage
                          : currentMentorInfo?.image
                      }
                      alt="Mentor ProPic"
                    />
                  </div>
                  <h3
                    className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
                  >
                    {currentMentorInfo?.info?.firstName +
                      " " +
                      currentMentorInfo?.info?.lastName}
                  </h3>
                </div>
              </div>
              <div className={Styles.card_details}>
                {currentMentorInfo?.info?.attributes?.experienceYears !==
                  null &&
                currentMentorInfo?.info?.attributes?.country !== "" ? (
                  <p className={Styles.mentor_box__text}>
                    Developer with{" "}
                    {currentMentorInfo?.info?.attributes?.experienceYears ===
                    "1"
                      ? currentMentorInfo?.info?.attributes?.experienceYears +
                        " " +
                        "year "
                      : currentMentorInfo?.info?.attributes?.experienceYears +
                        " " +
                        "years "}
                    of experience based in{" "}
                    {currentMentorInfo?.info?.attributes?.country}.
                  </p>
                ) : (
                  <></>
                )}
                {currentMentorInfo?.info?.attributes?.languages ? (
                  <p className={Styles.mentor_box__text}>
                    Fluent in: {currentMentorInfo?.info?.attributes?.languages}.
                  </p>
                ) : (
                  <></>
                )}
                {currentMentorInfo?.info?.attributes?.level !== null ? (
                  <p className={Styles.mentor_box__text}>
                    I teach until level{" "}
                    {currentMentorInfo?.info?.attributes?.level}.
                  </p>
                ) : (
                  <></>
                )}

                <Divider />
                <Button className={Styles.btn}>
                  <a
                    href={`https://${currentMentorInfo?.info?.attributes?.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn
                  </a>
                </Button>

                <Button
                  className={`${Styles.btn} ${Styles.mentorChangeBtn} ${Styles.btn_primary}`}
                  disabled={disable}
                  onClick={() => setModalVisible(true)}
                >
                  Request Mentor Change
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
      {mentorsinformation.length !== 0 ? (
        <>
          <div
            className={`${Styles.u_center_text} ${Styles.u_margin_bottom_small} ${Styles.u_margin_top_medium}`}
          >
            <h2 className={Styles.heading_secundary}>Previous Mentors</h2>
          </div>
          <section className={Styles.previous_mentors}>
            {mentorsinformation.map((mentor, index) => {
              return (
                <div className={Styles.mentor_box} key={index}>
                  <i
                    className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}
                  ></i>
                  <div className={Styles.card_heading}>
                    <div className={Styles.card_picture}>
                      <div className={Styles.imgContainer}>
                        <img
                          src={
                            mentor?.image === "" ? smallImage : mentor?.image
                          }
                          alt="Mentor ProPic"
                        />
                      </div>
                      <h3
                        className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
                      >
                        {mentor?.info?.firstName + " " + mentor?.info?.lastName}
                      </h3>
                    </div>
                  </div>
                  <div className={Styles.card_details}>
                    {mentor?.info?.attributes?.experienceYears !== null &&
                    mentor?.info?.attributes?.country !== "" ? (
                      <p className={Styles.mentor_box__text}>
                        Developer with{" "}
                        {mentor?.info?.attributes?.experienceYears === "1"
                          ? mentor?.info?.attributes?.experienceYears + " year "
                          : mentor?.info?.attributes?.experienceYears +
                            " years "}
                        of experience based in{" "}
                        {mentor?.info?.attributes?.country}.
                      </p>
                    ) : (
                      <></>
                    )}

                    {mentor?.info?.attributes?.languages !== "" ? (
                      <p className={Styles.mentor_box__text}>
                        Fluent in: {mentor?.info?.attributes?.languages}.
                      </p>
                    ) : (
                      <div></div>
                    )}

                    {mentor?.info?.attributes?.level !== null ? (
                      <p className={Styles.mentor_box__text}>
                        I teach until level {mentor?.info?.attributes?.level}.
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                  <Divider />
                  <Button className={Styles.btn}>
                    <a
                      href={`https://${mentor?.info?.attributes?.resume}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                </div>
              );
            })}
          </section>
        </>
      ) : (
        <></>
      )}
      <Context.Provider
        value={{ name: student.info?.firstName + " " + student.info?.lastName }}
      >
        {contextHolder}
      </Context.Provider>
    </section>
  );
}
