import React from "react";
import Styles from "./Mentor.module.scss";
import smallImage from "../../img/no-img.png";
import { Button } from "antd";

export default function Mentor() {
  return (
    <section className={Styles.section_Mentor}>
      <div
        className={`${Styles.u_center_text} ${Styles.u_margin_bottom_small}`}
      >
        <h2 className={Styles.heading_secundary}>Current Mentor</h2>
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
          <h3
            className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
          >
            Jose Martinez
          </h3>
          <p className={Styles.mentor_box__text}>
            Developer with 3 years of experience
          </p>
        </div>
        <div className={Styles.mentor_box}>
          <i className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}></i>
          <h3
            className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
          >
            Jose Martinez
          </h3>
          <p className={Styles.mentor_box__text}>
            Developer with 3 years of experience
          </p>
        </div>
        <div className={Styles.mentor_box}>
          <i className={`${Styles.mentor_box__icon} ${Styles.pro_pic}`}></i>
          <h3
            className={`${Styles.heading_tertiary} ${Styles.u_margin_bottom_small}`}
          >
            Jose Martinez
          </h3>
          <p className={Styles.mentor_box__text}>
            Developer with 3 years of experience
          </p>
        </div>
      </section>
    </section>
  );
}
