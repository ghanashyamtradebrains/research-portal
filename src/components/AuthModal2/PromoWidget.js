import React from "react";
import styles from "./AuthModal.module.css";
import qr_dark from "../../assets/images/LoginPage/Dark Theme QR code.webp";
import qr_light from "../../assets/images/LoginPage/White Theme QR code.webp";
import mobile_widget from "../../assets/images/LoginPage/mobile_widget_new.webp";
import Image from "next/image";

const PromoWidget = ({ lightMode }) => {
  return (
    <section
      className={
        lightMode ? styles.info_container_light : styles.info_container
      }
    >
      <h1
        className="fw-700 mt-10 text-align-center"
        style={{ fontSize: "28.12px" }}
      >
        Become a Better <span style={{ color: "#2881FF" }}>Investor!</span>
      </h1>
      <div className={styles.right_container}>
        <article className={styles.qr_code}>
          <span className={styles.scan_text}>Scan to download</span>
          <Image
            className="mt-10"
            src={lightMode ? qr_light : qr_dark}
            width={150}
            height={150}
          />
          <span className={styles.info_text}>
            Best Stock Analysis and Fundamental Analysis Platform
          </span>
        </article>
        <article className={styles.mobile_widget}>
          <Image
            className={styles.mobile_image}
            src={mobile_widget}
            width={300}
            height={600}
          />
        </article>
      </div>
    </section>
  );
};

export default PromoWidget;
