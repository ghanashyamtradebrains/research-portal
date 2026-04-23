import React from "react";
import { Modal } from "antd";
import Link from "next/link";
import svgSheet8 from "../../assets/svg/svgSheet8";
import styles from "./styles/pretrial.module.css";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";

function PremiumTrialModal({ visible, setVisible, isTrialOver }) {
  const { lightMode } = useSelector(getThemeMode);

  return (
    <Modal
      centered
      open={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      className={lightMode ? "modal-override-light" : "modal-override"}
    >
      <div
        className={`${styles.modal_body} ${
          lightMode ? styles.modal_body_light : ""
        }`}
      >
        <div className={styles.icon_wrapper}>{svgSheet8.premiumPopUpIcon}</div>

        <div className={styles.title}>
          {isTrialOver
            ? "Better Prices. Smarter Choices. Get 60% off"
            : "Better Prices. Smarter Choices. Get 60% off"}
        </div>

        <Link href="/getpremium">
          <button className={styles.cta_button}>
            {isTrialOver ? "Subscribe Now" : "Subscribe Now"}
          </button>
        </Link>
      </div>
    </Modal>
  );
}

export default PremiumTrialModal;
