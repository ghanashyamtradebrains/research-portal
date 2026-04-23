import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import IndexGraphCard from "./IndexGraphCard";

import { Carousel } from "antd";
// import getStartedBg from "../../../assets/images/bg/getstartedBg.png";
import getstartedBgDark from "../assets/images/bg/getstartedBgDark.png";
import getStartedBgMob from "../assets/images/bg/getStartedBgMob.png";
import { ArrowRightOutlined } from "@ant-design/icons";

import Link from "next/link";
import Image from "next/image";
import IndexGraphCard from "./home/components/IndexGraphCard";
import { getRecentSearch } from "../redux/reducers/RecenSearchSlice";
import { getGraphData, getStockChange } from "../pages/api/fetchClient";
import SearchComponent from "./Navbar/SearchComponent";
import { authStore } from "../redux/reducers/authSlice";
import LaptopImage from "../assets/images/bg/bgDashboardOne.webp";
import LaptopImageMObile from "../assets/images/bg/getStartedWhiteMobile.webp";
import HomePageIndexCard from "./homePageCard";
import useWindowWidth from "../utilityFn/getWindowWidth";
import { useRouter } from "next/router";
import SebiLogo from "../assets/images/Brokers/SebiLogo.png";
import SebiLogoLight from "../assets/images/Brokers/sebiLight.png";
import StartUp from "../assets/images/Brokers/start-up-india.png";
import StartUpDark from "../assets/images/Brokers/start-up-dark.png";
import TopIndices from "./dashboard/marketWatch.js/TopIndices/TopIndices";
import styles from "./dashboard.module.css";

function GetStartedSection({ lightMode }) {
  const recentStocks = useSelector(getRecentSearch);
  const IndexName = ["NIFTY", "SENSEX", "NIFTYFINANCE", "BANKNIFTY"];
  const [indexChangeData, setindexChangeData] = useState({});
  const [indexGraphData, setindexGraphData] = useState({});
  const [toggleStatus, setToggleStatus] = useState("NONE");
  const auth = useSelector(authStore);
  const router = useRouter();
  // get index change data
  const popularStocks = [
    {
      comp_name: "Reliance Industries Ltd",
      symbol: "RELIANCE",
    },
    {
      comp_name: "HDFC Bank Ltd.",
      symbol: "HDFCBANK",
    },
    {
      comp_name: "Tata Consultancy Services Ltd.",
      symbol: "TCS",
    },
    {
      comp_name: "ITC Ltd.",
      symbol: "ITC",
    },
  ];
  const getStockChangeData = async () => {
    let resultObj = {};
    for (let index = 0; index < IndexName.length; index++) {
      await getStockChange(IndexName[index])
        .then((resp) => {
          resultObj = { ...resultObj, [IndexName[index]]: resp.data[0] };
        })
        .catch((err) => null);
    }
    setindexChangeData(resultObj);
  };

  // get index intraday graph data
  const getDayGrphData = async () => {
    let graphObj = {};
    for (let index = 0; index < IndexName.length; index++) {
      await getGraphData(IndexName[index], 1)
        .then((resp) => {
          graphObj = { ...graphObj, [IndexName[index]]: resp.data };
        })
        .catch((err) => null);
    }
    setindexGraphData(graphObj);
  };
  useEffect(() => {
    getStockChangeData();
  }, []);
  useEffect(() => {
    getDayGrphData();
  }, []);

  const indexArr = ["GIFT-NIFTY", "NIFTY", "SENSEX", "BANKNIFTY"];

  const stocks = [
    {
      name: "Reliance Industries",
      link: "/stocks/RELIANCE",
    },
    {
      name: "TATA motors",
      link: "/stocks/TATAMOTORS",
    },
    {
      name: "TATA Consultancy",
      link: "/stocks/TCS",
    },
    {
      name: "HDFC Bank",
      link: "/stocks/HDFCBANK",
    },
    {
      name: "Bajaj Finance",
      link: "/stocks/BAJFINANCE",
    },
    {
      name: "Maruti Suzuki ",
      link: "/stocks/MARUTI",
    },
  ];

  const stocksMobile = [
    {
      name: "RELIANCE",
      link: "/stocks/RELIANCE",
    },
    {
      name: "TATAMOTORS",
      link: "/stocks/TATAMOTORS",
    },
    {
      name: "TCS",
      link: "/stocks/TCS",
    },
  ];

  return (
    <div className="w-100">
      <div className={styles.only_pc_view}>
        <div
          className={`p-50-0 px-15 mb-30 ${
            lightMode
              ? "get-started-background-image-light"
              : "get-started-background-image"
          }
          `}
        >
          <div
            className="w-100 d-flex flex-col"
            style={{
              paddingTop: "40px",
              paddingBottom: "50px",
            }}
          >
            <div
              className="w-100 d-flex justify-content-center text-align-center"
              style={{ marginLeft: "-100px" }}
            >
              <h2 className="text-h1-animation">
                Become a Better{" "}
                <span className={"roller"}>
                  <span id="rolltext">
                    Investor!
                    <br />
                    Analyst!
                    <br />
                    Trader!
                    <br />
                  </span>
                  <br />
                </span>
              </h2>
            </div>

            <h1
              style={{ zIndex: "200" }}
              className="fs-18-16 w-100 fw-400 text-align-center"
            >
              Best Stock Analysis and Fundamental Analysis Platform
            </h1>
            <div className="w-100 mt-30">
              <SearchComponent
                lightMode={lightMode}
                setMobileSearchToggle={setToggleStatus}
                planData={auth}
                homePage={true}
              />
            </div>
            <div
              className={`w-100 d-flex justify-content-center align-items-center mt-70 gap-15px`}
            >
              {stocks?.map((item) => {
                return (
                  <div
                    className={`h-40px d-flex justify-content-center align-items-center p-10 br-20  w-12 pointer ${
                      lightMode
                        ? "bg-gray text-color-stock-search card-shadow"
                        : "bg-color-stocks-dark text-color-stock-search card-shadow-black"
                    }`}
                    onClick={() => router.push(item?.link)}
                  >
                    {item?.name}
                  </div>
                );
              })}
            </div>
            <div className="mt-60 fw-500 d-flex justify-content-center align-items-center">
              Recognized By :{" "}
            </div>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ marginTop: "-10px" }}
            >
              <div className="d-flex justify-content-center align-items-center ">
                <Image
                  src={lightMode ? SebiLogoLight : SebiLogo}
                  width={230}
                  height={45}
                  className="ml-5"
                />
                <Image
                  src={lightMode ? StartUp : StartUpDark}
                  width={197}
                  height={69}
                  className={`${lightMode ? "mt-25 ml-10" : "mt-15"}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.only_mobile_view}>
        <div
          className={`mb-30 ${
            lightMode
              ? "get-started-mobile-background-image-light"
              : "get-started-mobile-background-image"
          }`}
        >
          <div className="w-100 pt-20px p-50-0">
            <div className="w-100 ml-10">
              <h2 className="text-h1-animation">
                Become a Better{" "}
                <span className={"roller"}>
                  <span id="rolltext">
                    Investor!
                    <br />
                    Analyst!
                    <br />
                    Trader!
                    <br />
                  </span>
                  <br />
                </span>
              </h2>
            </div>
          </div>
          <h2 className="fs-16-14 w-100 fw-400 mt-10 mb-30 p-50-0 text-align-center">
            Best Stock Analysis and Fundamental Analysis Platform
          </h2>

          <div className="w-100 p-50-0 mt-10">
            <SearchComponent
              lightMode={lightMode}
              setMobileSearchToggle={setToggleStatus}
              planData={auth}
              homePage={true}
            />
          </div>
          <div
            className={`w-100 d-flex justify-content-center align-items-center mt-95 gap-5px p-50-0`}
          >
            {stocksMobile?.slice(0, 3).map((item) => {
              return (
                <div
                  className={`h-35px d-flex justify-content-center fs-12 align-items-center p-10 br-20  w-33 pointer ${
                    lightMode
                      ? "bg-gray text-color-stock-search card-shadow"
                      : "card-drop-dark-shadow-home-page-stock text-color-stock-search "
                  }`}
                  onClick={() => router.push(item?.link)}
                >
                  {item?.name}
                </div>
              );
            })}
          </div>

          <div className="d-flex justify-content-center align-items-center mt-40">
            Recognized By :{" "}
          </div>
          <div className="d-flex justify-content-center align-items-center mb-50">
            <div className="d-flex justify-content-center align-items-center gap-15px ">
              <Image
                src={lightMode ? SebiLogoLight : SebiLogo}
                width={170}
                height={27}
                className=""
              />
              <Image
                src={lightMode ? StartUp : StartUpDark}
                width={133}
                height={39}
                className="mt-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.scroll_indices}>
        <TopIndices lightMode={lightMode} />
      </div>
    </div>
  );
}

export default GetStartedSection;
