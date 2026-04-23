import { Button, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./report.module.css";
import svgSheet7 from "../../assets/svg/svgSheet7";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import { useRouter } from "next/router";

const PremiumPlusReportModal = ({
  visible,
  setVisible,
  loginRediect = false,
  reports,
}) => {
  const router = useRouter();
  const { lightMode } = useSelector(getThemeMode);

  return (
    <div>
      <Modal
        centered
        width="500px"
        bodyStyle={{
          height: "300px",
          borderRadius: "10px",
        }}
        open={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
        className="research-report-modal relative"
        wrapClassName={"filter-modal premium-mod"}
      >
        <div
          className={
            lightMode ? styles.modal_container_light : styles.modal_container
          }
        >
          {svgSheet7.subscribeIconReports}
          <span className={styles.modal_title}>Unlock Report Now</span>

          <button
            className={styles.subscribeBtn}
            onClick={() => router.push("/getpremium")}
          >
            Subscribe
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PremiumPlusReportModal;
