import React from "react";
import styles from "./ProfileDescription.module.css";
import Image from "next/image";

const ProfileDescription = ({ lightMode, toggle, setToggle }) => {
  return (
    <div className={styles.overlay}>
      <div
        className={`${styles.popup_container} ${
          lightMode ? styles.popup_container_light : ""
        }`}
      >
        <span className={styles.close_icon} onClick={() => setToggle(null)}>
          &times;
        </span>

        <div className={styles.popup_content}>
          <span className={styles.section_title}>Managed By</span>

          <div className={styles.profile_container}>
            {toggle === 1 && (
              <div
                className={`${styles.profile_card} ${
                  lightMode ? styles.profile_card_light : ""
                }`}
              >
                <Image
                  src="/images/others/img_anushka.png"
                  width={200}
                  height={200}
                  alt="profile_img"
                  className={styles.profile_img}
                />

                <div
                  className={`${styles.profile_details} ${
                    lightMode ? styles.profile_details_light : ""
                  }`}
                >
                  <span className={styles.profile_name}>Anoushka Roy</span>
                  <span className={styles.profile_title}>Head of research</span>
                  <p className={styles.desc_summary}>
                    With 5+ years of experience, she has spearheaded the
                    creation of high-conviction stock picks, seasonal and
                    thematic stocks, and technical analysis. Her strong
                    analytical acumen and data-driven insights have empowered
                    investors to identify high-quality opportunities and make
                    informed, confident investment decisions.
                  </p>
                </div>
              </div>
            )}

            {toggle === 2 && (
              <div
                className={`${styles.profile_card} ${
                  lightMode ? styles.profile_card_light : ""
                }`}
              >
                <Image
                  src={"/images/others/img_shashi.png"}
                  width={200}
                  height={200}
                  alt="profile_img"
                  className={styles.profile_img}
                />

                <div
                  className={`${styles.profile_details} ${
                    lightMode ? styles.profile_details_light : ""
                  }`}
                >
                  <span className={styles.profile_name}>Shashi Kumar</span>
                  <span className={styles.profile_title}>Research Analyst</span>
                  <p className={styles.desc_summary}>
                    Expert in delivering data-driven insights for long-term
                    investors through financial statement analysis and valuation
                    techniques in various sectors. He is proficient in preparing
                    detailed equity research reports, technical analysis, and
                    IPO analyses.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDescription;
