import React from "react";
import styles from "../../ResearchReports/ProfileDescription/ProfileDescription.module.css";

import Image from "next/image";

const SmallCaseProfileDescription = ({ lightMode, toggle, setToggle , fullText }) => {
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

        {fullText ? <div className={styles.popup_content}>

          <div className={styles.profile_container}>
         
              
                  <p className={styles.desc_summary}>
                    Trade Brains Portal offers a range of curated smallcases designed to suit different investor profiles and risk appetites. For risk-averse investors, we provide bluechip and stable smallcases focused on consistent returns and strong fundamentals. For aggressive investors, we offer fast-growth smallcases built around high-potential emerging companies. Additionally, we provide balanced smallcases that combine both growth and stability to help mitigate risks. Depending on their goals and preferences, investors can choose the smallcase that best aligns with their investment strategy.
                  </p>
                </div>
            
        
         
        </div> :<div className={styles.popup_content}>
          <span className={styles.section_title}>Managed By</span>

          <div className={styles.profile_container}>
         
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
                  <span className={styles.profile_title}>Head of research(8+ years of experience)</span>
                  <p className={styles.desc_summary}>
                    Anoushka Roy is the Head of Research and a SEBI-Registered Research Analyst at Trade Brains Portal (Dailyraven Technologies Pvt. Ltd.). With over eight years of experince in the stock market and five years of hands-on experience in heading equity research segment at tradebrains, she has led the development of high-conviction stock picks, seasonal and thematic portfolios, and in-depth IPO reports. 
                    Anoushka’s analytical expertise and data-driven approach help investors discover quality opportunities and make confident, well-researched investment decisions.
                  </p>
                </div>
              </div>
        
          </div>
        </div>}
      </div>
    </div>
  );
};

export default SmallCaseProfileDescription;
