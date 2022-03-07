import React, { useState } from "react";
import Styles from "./Mentor.module.scss";
import smallImage from "../../img/no-img.png";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";

const Context = React.createContext({ name: "Default" });

export default function Mentor({ student }) {
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
                <img src={smallImage} alt="Mentor ProPic" />
              </div>
              <h3
                className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
              >
                Jose Martinez
              </h3>
            </div>
          </div>
          <div className={Styles.card_details}>
            <p className={Styles.mentor_box__text}>
              Developer with 3 years of experience
            </p>
            <Button className={Styles.btn}>LinkedIn</Button>
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
        <div className={Styles.mentor_box}>
          <i className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}></i>
          <div className={Styles.card_heading}>
            <div className={Styles.card_picture}>
              <div className={Styles.imgContainer}>
                <img src={smallImage} alt="Mentor ProPic" />
              </div>
              <h3
                className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
              >
                Jose Martinez
              </h3>
            </div>
          </div>
          <div className={Styles.card_details}>
            <p className={Styles.mentor_box__text}>
              Developer with 3 years of experience
            </p>
            <Button className={Styles.btn}>LinkedIn</Button>
          </div>
        </div>
        <div className={Styles.mentor_box}>
          <i className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}></i>
          <div className={Styles.card_heading}>
            <div className={Styles.card_picture}>
              <div className={Styles.imgContainer}>
                <img src={smallImage} alt="Mentor ProPic" />
              </div>
              <h3
                className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
              >
                Jose Martinez
              </h3>
            </div>
          </div>
          <div className={Styles.card_details}>
            <p className={Styles.mentor_box__text}>
              Developer with 3 years of experience
            </p>
            <Button className={Styles.btn}>LinkedIn</Button>
          </div>
        </div>
        <div className={Styles.mentor_box}>
          <i className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}></i>
          <div className={Styles.card_heading}>
            <div className={Styles.card_picture}>
              <div className={Styles.imgContainer}>
                <img src={smallImage} alt="Mentor ProPic" />
              </div>
              <h3
                className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
              >
                Jose Martinez
              </h3>
            </div>
          </div>
          <div className={Styles.card_details}>
            <p className={Styles.mentor_box__text}>
              Developer with 3 years of experience
            </p>
            <Button className={Styles.btn}>LinkedIn</Button>
          </div>
        </div>
      </section>
      <Context.Provider
        value={{ name: student.firstName + " " + student.lastName }}
      >
        {contextHolder}
      </Context.Provider>
    </section>
  );
}
