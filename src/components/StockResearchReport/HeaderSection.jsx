import React from "react";
import CustomTooltip from "../ant/CustomTooltip";
import svgSheet from "../../assets/svg/svgSheet";
import styles from "./report.module.css";
import { useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import svgSheet5 from "../../assets/svg/svgSheet5";

const HeaderSection = ({ lightMode }) => {
  const UserAuth = useSelector(authStore);

  const items = (
    <p>
      Investments in securities are subject to market risks. Read all the
      related documents carefully before investing." Receiving registration from
      SEBI and certification from NISM does not assure the performance of the
      intermediary or guarantee returns to investors in any manner.Compliance
      Email:{" "}
      <a
        href="https://portal.tradebrains.in/"
        className="warning-color"
        target="_blank"
      >
        compliance@tradebrains.in
      </a>{" "}
    </p>
  );

  return (
    <div
      className={styles.header_section}
      style={{
        backgroundColor: lightMode ? "#F2F6F8" : "#1f1f1f",
      }}
    >
      <h1 className={styles.title}>Stock Research Reports</h1>
      <p className="mt-10 mb-10">
        Latest stock research reports featuring buy, hold, and sell
        recommendations and trading ideas from research analysts of Trade Brains
        Portal to make the best investment choices.
        <span className="fs-14-12 ml-10">
          <CustomTooltip text={items}>
            {lightMode ? svgSheet5.warningIconLight : svgSheet5.warningIcon}
            <span
              style={{
                color: lightMode ? "black" : "white",
                marginRight: "5px",
                marginLeft: "3px",
              }}
            >
              Disclaimer{" "}
            </span>{" "}
          </CustomTooltip>
        </span>
      </p>
    </div>
  );
};

export default HeaderSection;
