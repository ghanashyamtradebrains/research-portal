import React, { useEffect, useState } from "react";
import styles from "./report-card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../../redux/reducers/authSlice";
import { setToggleForm } from "../../../redux/reducers/AuthToggleSlice";
import Image from "next/image";
import svgSheet8 from "../../../assets/svg/svgSheet8";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { viewsCounter } from "../../../pages/api/fetchClient";

function ResearchReport({
  reports,
  lightMode,
  isPremiumPlus,
  setVisible,
  type,
}) {
  const UserAuth = useSelector(authStore);
  const isLoggedIn = UserAuth?.userData.access_token;
  const [imageVisible, setImageVisible] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const viewsCounterFn = async () => {
    let str = router.asPath.split("/").filter(Boolean).pop(),
      type = null,
      payload = {};

    if (str === "monthly-stock-picks") {
      type = "monthly_stock_picks";
      payload = {
        type,
        name: reports?.name,
      };
    } else if (str === "seasonal-stock-picks") {
      type = "seasonal_stock_picks";
      payload = {
        type,
        name: reports?.name,
      };
    } else if (str === "technicals-reports") {
      type = "technical_charts";
      payload = {
        type,
        id: reports?.id,
      };
    } else if (str === "ipo-reports") {
      type = "ipo_reports";
      payload = {
        type,
        name: reports?.name,
      };
    }

    await viewsCounter(payload);
  };

  const reportClickHandler = async () => {
    await viewsCounterFn();

    if (isLoggedIn) {
      setImageVisible(true);
    } else {
      dispatch(setToggleForm("login"));
    }
  };

  const getTruncatedText = (text, limit = 200) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) : text;
  };

  return (
    <>
      {type === "technicals" ? (
        <div
          className={
            lightMode ? styles.main_card_tech_light : styles.main_card_tech
          }
          onClick={() => reportClickHandler()}
        >
          <div className={styles.content_container_tech}>
            <div className={styles.tech_top_container}>
              <span>{reports?.chart_duration}</span>
              <span>
                {lightMode
                  ? svgSheet8.maximize_black
                  : svgSheet8.maximize_white}
              </span>
            </div>

            <Image
              className={styles.ipo_image}
              src={reports?.image_url}
              alt="Research Report"
              width={190}
              height={190}
              style={{
                objectFit: "cover",
              }}
            />

            <div
              className={
                lightMode
                  ? styles.card_description_tech_light
                  : styles.card_description_tech
              }
            >
              <div className={styles.tech_card_container}>
                <div
                  style={{
                    position: "relative",
                    background:
                      !isLoggedIn &&
                      "linear-gradient(90deg, #F37335 4.83%, #FCC030 95.32%)",
                    width: "100%",
                    padding: "0 12px 12px 12px",
                    paddingTop: !isLoggedIn ? "8px" : "0",
                    height: isLoggedIn ? "15px" : "35px",
                  }}
                >
                  {isLoggedIn ? (
                    <span
                      className={styles.title_container}
                      title={`${reports?.company_name}`}
                    >
                      {reports?.company_name}
                    </span>
                  ) : (
                    <span className="text-center fw-500">
                      Sign in to continue
                    </span>
                  )}
                </div>

                <div className={styles.tech_chips}>
                  <div
                    className={
                      lightMode ? styles.chip_text_light : styles.chip_text
                    }
                  >
                    {reports?.chart_name}
                  </div>
                  <div
                    className={
                      lightMode ? styles.chip_text_light : styles.chip_text
                    }
                  >
                    {reports?.call}
                  </div>
                </div>
                <span className={styles.tech_desc}>
                  {getTruncatedText(reports?.description, 200)}
                </span>
              </div>
              <span className={styles.date}>
                {formatDate(reports?.updated_at)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={async () => {
            await viewsCounterFn();

            if (isPremiumPlus) {
              if (reports?.report_id !== null) {
                window.open(
                  `/ipo-report/${window.btoa(reports?.report_id)}`,
                  "_blank"
                );
              } else {
                window.open(`${reports?.file}`, "_blank");
              }
            } else if (isLoggedIn) {
              setVisible(true);
            } else {
              dispatch(setToggleForm("login"));
            }
          }}
          className={lightMode ? styles.main_card_light : styles.main_card}
        >
          <div className={styles.content_container}>
            <Image
              className={styles.ipo_image}
              src={reports?.image}
              alt="Ipo Report"
              width={220}
              height={220}
              style={{
                objectFit: "cover",
              }}
            />
            <div
              className={
                lightMode
                  ? styles.card_description_light
                  : styles.card_description
              }
            >
              <span className={styles.title} title={reports?.name}>
                {reports?.name}
              </span>
              <span className={styles.date}>{formatDate(reports?.date)}</span>
            </div>
          </div>
        </div>
      )}

      <Modal
        open={imageVisible}
        onCancel={() => setImageVisible(false)}
        footer={null}
        centered
        width={"80%"}
        className={styles.techModalWrapper}
        closable={true}
      >
        <div
          className={
            lightMode ? styles.techModalCardLight : styles.techModalCard
          }
        >
          <div className={styles.techModalContent}>
            {/* Top overlay */}
            <div className={styles.techModalTop}>
              <span>{reports?.chart_duration}</span>
            </div>

            {/* Image */}
            <div className={styles.techModalImageWrap}>
              <Image
                src={reports?.image_url}
                alt="Research Report"
                fill
                priority
                className={styles.techModalImage}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ResearchReport;
