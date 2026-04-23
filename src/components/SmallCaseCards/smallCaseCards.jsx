import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import styles from "./smallcase.module.css";
import Link from "next/link";
import { fetchSmallcase, viewsCounter } from "../../pages/api/fetchClient";
import numberWithCommas from "../../utilityFn/numberWithCommas";

const portfolios = [
  {
    id: 1,
    title: "Golden Nest Theme",
    cagr: "37.5%",
    min_investment: "₹ 38,183",
    volatility: "High Risk",
    riskType: "high",
    perMonth: "₹393",
    image_url: "/images/others/Golden_Nest_Theme.png",
    link: "https://tradebrainsportal.smallcase.com/smallcase/TDBNNM_0001",
  },
  {
    id: 2,
    title: "The Alpha Blend Multi-Asset ETF Model",
    cagr: "37.5%",
    min_investment: "₹ 12,000",
    volatility: "Mid Risk",
    riskType: "medium",
    perMonth: "₹256",
    image_url: "/images/others/Alpha_Blend_Multi_Asset_ETF_Model.png",
    link: "https://tradebrainsportal.smallcase.com/smallcase/TDBNMX_0001",
  },
];

function SmallCaseCards() {
  const { lightMode } = useSelector(getThemeMode);

  const [smallcaseData, setSmallcasData] = useState([]);

  useEffect(() => {
    const getTechnicalData = async () => {
      const response = await fetchSmallcase();
      console.log("takethat", response?.data?.results);
      setSmallcasData(response?.data?.results);
    };
    getTechnicalData();
  }, []);

  const sendAnalytics = async (item) => {
    const payload = {
      type: "smallcase",
      id: item?.id,
    };

    const res = await viewsCounter(payload);
  };

  return (
    <div
      className={
        lightMode
          ? styles.portfolio_container_light
          : styles.portfolio_container
      }
    >
      {smallcaseData?.map((item) => (
        <Link href={item.link} target="_blank">
          <div
            key={item.id}
            className={
              lightMode ? styles.portfolio_card_light : styles.portfolio_card
            }
            onClick={() => sendAnalytics(item)}
          >
            <div className={styles.card_left}>
              <Image
                src={item.image_url}
                alt={item.name}
                width={55}
                height={55}
                className={styles.logo_img}
              />
              <span className={styles.title}>{item.title}</span>
            </div>

            <div className={styles.card_info}>
              <div>
                <span className={styles.label}>
                  <span className={styles.number_font}>3Y CAGR </span>{" "}
                </span>
                <span className={styles.value}>
                  {" "}
                  <span className={styles.number_font_blur}>676</span>{" "}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  <span className={styles.label}>Min Investment</span>
                </span>{" "}
                <span className={styles.value}>
                  {" "}
                  <span className={styles.number_font}>
                    ₹ {numberWithCommas(item.min_investment)}{" "}
                  </span>{" "}
                </span>
              </div>
              <div>
                <span className={styles.label}>
                  <span className={styles.label}>Volatility</span>
                </span>
                <span
                  className={`${styles.value}  
                     ${item.volatility === "Mid Risk" && styles.risk_medium}
                     ${item.volatility === "Low Risk" && styles.risk_low}
                     ${item.volatility === "High Risk" && styles.risk_high}`}
                >
                  {item.volatility}
                </span>
              </div>
            </div>

            <div className={styles.card_right}>
              <button className={styles.btn_bg_gradient}>Subscribe Now</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default SmallCaseCards;
