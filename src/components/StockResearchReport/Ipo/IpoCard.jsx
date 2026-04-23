import Image from "next/image";
import React from "react";
import styles from "../report.module.css";
import web from "../../../assets/images/Ads/InvestIQ-web.png";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../../redux/reducers/authSlice";
import { setToggleForm } from "../../../redux/reducers/AuthToggleSlice";

const IpoCard = ({ ipo }) => {
  const UserAuth = useSelector(authStore);
  const isLoggedIn = UserAuth?.userData.access_token;
  const dispatch = useDispatch();

  return (
    <div
      key={ipo?.report_id}
      className={styles.ipo_relative}
      onClick={() => {
        if (isLoggedIn) {
          if (ipo?.report_id !== null) {
            window.open(`/ipo-report/${window.btoa(ipo?.report_id)}`, "_blank");
          } else {
            window.open(`${ipo?.file}`, "_blank");
          }
        } else {
          dispatch(setToggleForm("login"));
        }
      }}
    >
      <Image
        src={!ipo?.image?.endsWith("media/") ? ipo?.image : web}
        width={350}
        height={100}
        alt="Ipo Report"
        className={styles.ipo_image_allreports}
      />
      <span className={styles.name}>{ipo?.name}</span>
    </div>
  );
};

export default IpoCard;
