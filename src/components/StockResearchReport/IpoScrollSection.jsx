import React, { useEffect, useRef, useState } from "react";
import styles from "./researchReport.module.css";
import {
  fetchTechnicalChart,
  getIpoList_v2,
  getIpoListNewDash,
  viewsCounter,
} from "../../pages/api/fetchClient";
import { useDispatch, useSelector } from "react-redux";
import { authStore } from "../../redux/reducers/authSlice";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";
import Image from "next/image";
import PremiumPlusReportModal from "./PremiumPlusReportModal";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";
import { Modal } from "antd";

const IpoScrollSection = ({ lightMode }) => {
  const [researchReports, setResearchReports] = useState([]);
  const [technicalData, setTechnicalData] = useState([]);
  const UserAuth = useSelector(authStore);
  const [visible, setVisible] = useState(false);
  const [isPremiumPlus, setIsPremiumPlus] = useState(false);
  const isLoggedIn = UserAuth?.userData.access_token;

  const [imageVisible, setImageVisible] = useState(false);

  const dispatch = useDispatch();
  const checkTrialStatus = useCheckTrialStatus();
  useEffect(() => {
    const fetchList = async () => {
      const res = await getIpoList_v2();

      setResearchReports(res?.data?.report_data);
    };

    const fetchList2 = async () => {
      const res = await fetchTechnicalChart();
      setTechnicalData(res?.data?.results[0]);
    };

    fetchList();
    fetchList2();
  }, []);

  useEffect(() => {
    const plan = UserAuth?.userData?.user?.plan;

    if (plan) {
      const hasPlus = plan?.planId?.includes("_plus");
      const hasSname = ["Whales", "Unlimited"].includes(plan?.sname);
      setIsPremiumPlus(hasPlus || hasSname);
    }
  }, [UserAuth?.userData?.user?.plan]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const combineAllReports = [
    researchReports?.["Monthly Picks"]?.[0],
    researchReports?.["Monthly Picks"]?.[1],
    researchReports?.["Research reports"]?.[0],
    researchReports?.["IPO reports"]?.[0],
  ].filter(Boolean);

  function isWithinLast7Days(dateStr) {
    if (!dateStr) return false;

    const inputDate = new Date(dateStr);
    if (isNaN(inputDate.getTime())) return false;

    const today = new Date();

    // Normalize both dates to midnight (local time)
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffInMs = today.getTime() - inputDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    return diffInDays >= 0 && diffInDays <= 7;
  }

  return (
    <div className={styles.main_report_container}>
      <div className={styles.container}>
        <div className={styles.title_report}>Research reports</div>
        <div className={styles.on_hover_underline}>
          <a href={`/research-reports`} target="_blank">
            View Reports
          </a>
        </div>
      </div>
      <div
        className={
          lightMode
            ? styles.card_grid_container_light
            : styles.card_grid_container
        }
      >
        {combineAllReports?.map((reports, i) => (
          <div
            onClick={async () => {
              let type = "";

              if (i == 0) type = "monthly_stock_picks";
              else if (i == 1) type = "monthly_stock_picks";
              else if (i == 2) type = "seasonal_stock_picks";
              else if (i == 3) type = "ipo_reports";

              const payload = {
                type,
                name: reports?.name,
              };

              await viewsCounter(payload);

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
              {isWithinLast7Days(reports?.date) && (
                <div>
                  <span className={styles.new_badge}>New</span>
                  <div className={styles.rhombusStrip} />
                </div>
              )}

              <Image
                className={styles.ipo_image}
                src={reports?.image}
                alt="Ipo Report"
                width={120}
                height={120}
              />
              <h2 className={styles.title} title={reports?.name}>
                {reports?.name}
              </h2>
              <p className={styles.date}>{formatDate(reports?.date)}</p>
            </div>
          </div>
        ))}
      </div>

      <Modal
        open={imageVisible}
        onCancel={() => setImageVisible(false)}
        footer={null}
        centered
        width={"70%"}
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
              <span>{technicalData?.chart_duration}</span>
            </div>

            {/* Image */}
            <div className={styles.techModalImageWrap}>
              <Image
                src={technicalData?.image_url}
                alt="Research Report"
                fill
                priority
                className={styles.techModalImage}
              />
            </div>
          </div>
        </div>
      </Modal>

      <PremiumTrialModal
        visible={visible}
        setVisible={setVisible}
        isTrialOver={checkTrialStatus()}
      />
    </div>
  );
};

export default IpoScrollSection;
