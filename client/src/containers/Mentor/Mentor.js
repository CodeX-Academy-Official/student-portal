import React, { useState } from "react";
import Styles from "./Mentor.module.scss";
import smallImage from "../../img/no-img.png";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Modal, notification, Divider } from "antd";

const Context = React.createContext({ name: "Default" });

export default function Mentor({
  student,
  currentMentor,
  mentorsInformation,
  mentorsProPic,
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
                  src={mentorsProPic[0] === "" ? smallImage : mentorsProPic[0]}
                  alt="Mentor ProPic"
                />
              </div>
              <h3
                className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
              >
                {currentMentor?.MentorFirst + " " + currentMentor?.MentorLast}
              </h3>
            </div>
          </div>
          <div className={Styles.card_details}>
            {mentorsInformation?.[0]?.attributes?.experienceYears !== null &&
            mentorsInformation?.[0]?.attributes?.country !== "" ? (
              <p className={Styles.mentor_box__text}>
                Developer with{" "}
                {mentorsInformation?.[0]?.attributes?.experienceYears === "1"
                  ? mentorsInformation?.[0]?.attributes?.experienceYears +
                    " " +
                    "year "
                  : mentorsInformation?.[0]?.attributes?.experienceYears +
                    " " +
                    "years "}
                of experience based in{" "}
                {mentorsInformation?.[0]?.attributes?.country}.
              </p>
            ) : (
              <></>
            )}
            {mentorsInformation?.[0]?.attributes?.languages ? (
              <p className={Styles.mentor_box__text}>
                Fluent in: {mentorsInformation?.[0]?.attributes?.languages}.
              </p>
            ) : (
              <></>
            )}
            {mentorsInformation?.[0]?.attributes?.level !== null ? (
              <p className={Styles.mentor_box__text}>
                I teach until level {mentorsInformation?.[0]?.attributes?.level}
                .
              </p>
            ) : (
              <></>
            )}

            <Divider />
            <Button className={Styles.btn}>
              <a
                href={`https://${mentorsInformation?.[0]?.attributes?.resume}`}
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
      <div
        className={`${Styles.u_center_text} ${Styles.u_margin_bottom_small} ${Styles.u_margin_top_medium}`}
      >
        <h2 className={Styles.heading_secundary}>Previous Mentors</h2>
      </div>
      <section className={Styles.previous_mentors}>
        {mentorsInformation.map((mentor, index) => {
          if (index !== 0) {
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
                          mentorsProPic[index] === ""
                            ? smallImage
                            : mentorsProPic[index]
                        }
                        alt="Mentor ProPic"
                      />
                    </div>
                    <h3
                      className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
                    >
                      {mentor?.firstName + " " + mentor?.lastName}
                    </h3>
                  </div>
                </div>
                <div className={Styles.card_details}>
                  {mentor?.attributes?.experienceYears !== null &&
                  mentor?.attributes?.country !== "" ? (
                    <p className={Styles.mentor_box__text}>
                      Developer with{" "}
                      {mentor?.attributes?.experienceYears === "1"
                        ? mentor?.attributes?.experienceYears + " year "
                        : mentor?.attributes?.experienceYears + " years "}
                      of experience based in {mentor?.attributes?.country}.
                    </p>
                  ) : (
                    <></>
                  )}

                  {mentor?.attributes?.languages !== "" ? (
                    <p className={Styles.mentor_box__text}>
                      Fluent in: {mentor?.attributes?.languages}.
                    </p>
                  ) : (
                    <div></div>
                  )}

                  {mentor?.attributes?.level !== null ? (
                    <p className={Styles.mentor_box__text}>
                      I teach until level {mentor?.attributes?.level}.
                    </p>
                  ) : (
                    <></>
                  )}

                  <Divider />
                  <Button className={Styles.btn}>
                    <a
                      href={`https://${mentor?.attributes?.resume}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </Button>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })}
      </section>
      <Context.Provider
        value={{ name: student.firstName + " " + student.lastName }}
      >
        {contextHolder}
      </Context.Provider>
    </section>
  );
}
