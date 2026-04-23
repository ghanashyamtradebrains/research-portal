import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import svgSheet from "../../assets/svg/svgSheet";
import svgSheet2 from "../../assets/svg/svgSheet2";
import { authStore } from "../../redux/reducers/authSlice";
import { useSelector } from "react-redux";
import PremiumRedirectModal from "../PremiumRedirectModal";
import { bannerOffsetCalc } from "../../utilityFn/bannerOffsetcalc";
import { useRouter } from "next/router";
import Image from "next/image";
import { getWatchListStore } from "../../redux/reducers/watchListSlice";
import svgSheet5 from "../../assets/svg/svgSheet5";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";

function ToolsTogglecard({
  toolsToggle,
  setToolsToggle,
  lightMode,
  authStatus,
  finGradCourse,
}) {
  const [Visible, setVisible] = useState(false);
  const UserAuth = useSelector(authStore);
  const navigate = useRouter();
  const watchlistArr = useSelector(getWatchListStore);
  const checkTrialStatus = useCheckTrialStatus();
  const navRedirect = (path) => {
    if (authStatus) {
      navigate.push(path);
      setToolsToggle("NONE");
    } else {
      navigate.push(path);
    }
  };

  const ListOfDropdownData = [
    {
      name: "Portfolio Analysis",
      disc: "Get visual reports of your portfolio similar to what million dollar investment managers get!",
      Logo: svgSheet2.portFolioSvg,
      link: "portfolio",
      premium: false,
    },
    {
      name: "Screener",
      disc: "Stock search made easier. This powerful screener helps you separate glitter from gold.",
      Logo: svgSheet2.ScreenerSvg,
      premium: false,
      link: "screener",
    },
    {
      name: "Stock compare",
      disc: "Compare stocks side to side and pick the winner!",
      Logo: svgSheet2.CompareStocksSvg,
      link: "stockCompare",
    },
    {
      name: "Buckets",
      disc: "Find ready made bucket of stocks across several themes, and sectors. ",
      Logo: svgSheet2.BuckectNewSvg,
      link: "buckets",
    },
    {
      name: "Watchlist",
      disc: "Track your favourite stocks to find the best opportunity.",
      Logo: svgSheet2.WatchListNewSvg,
      link: `watchlist`,
    },
    {
      name: "Superstar Portfolio",
      disc: "Find out what the big names like the Jhunjhunwala's of the investing world are buying.",
      Logo: svgSheet2.SuperStarPorNewSvg,
      link: "superstars",
    },
    {
      name: "Portfolio Backtesting ",
      disc: "Evaluate portfolio performance through historical data to improve investment strategies.",
      Logo: svgSheet5.blueBacktesting,
      link: "portfolio-backtesting",
      beta: "BETA",
    },
    {
      name: "Calculators",
      disc: "Advance calculators for all your financial instruments.",
      Logo: svgSheet.calculatorIcon,
      link: "calculator",
    },
  ];

  return (
    <Drawer
      style={{
        top:
          toolsToggle === "Tools"
            ? `${
                bannerOffsetCalc(UserAuth) === 1
                  ? "70"
                  : 100 + bannerOffsetCalc(UserAuth)
              }px`
            : "0px",
      }}
      drawerStyle={{
        background: lightMode ? "white" : "#292E3F",
        color: lightMode ? "black" : "white",
      }}
      rootStyle={{
        top:
          toolsToggle === "Tools"
            ? `${
                bannerOffsetCalc(UserAuth) === 1
                  ? "70"
                  : 100 + bannerOffsetCalc(UserAuth)
              }px`
            : "0px",
      }}
      headerStyle={{ marginInline: "16px", padding: "0px" }}
      bodyStyle={{ margin: "16px 0px 0px 0px", padding: "0px" }}
      contentWrapperStyle={{ width: "99%" }}
      placement={"top"}
      closable={false}
      onClose={() => setToolsToggle("NONE")}
      open={toolsToggle === "Tools" ? true : false}
      key="tools"
      height="auto"
      zIndex={500}
    >
      <div className="">
        <div className="flex ff-poppins ff-poppins max-w mx-auto h-100  px-15 relative">
          <div
            style={{ width: "70%" }}
            className="w-70 bbr-blue d-flex flex-wrap"
          >
            <div className="d-flex flex-wrap my-50  justify-content-start">
              {ListOfDropdownData.map((items, i) => (
                <div
                  key={i}
                  onClick={() => {
                    items?.premium
                      ? UserAuth?.userData?.user?.plan?.planId === "basic"
                        ? setVisible(true)
                        : navRedirect(`/${items?.link}`)
                      : navRedirect(`/${items?.link}`);
                  }}
                  className={` h-100px mt-10 flex p-10 ${
                    lightMode ? "hover-light-blue" : "bg-dark-nav-hover"
                  } pointer`}
                  style={{ width: "31%" }}
                >
                  <p> {items.Logo}</p>
                  <div>
                    <div className="d-flex align-items-center">
                      <p className="fw-700 fs-s-14 line-h-18">{items?.name}</p>
                      <p className="gradient-text-blue ml-5 fw-700 fs-s-10 line-h-18">
                        {items?.beta}
                      </p>
                    </div>
                    <p className="fs-s-12 line-h-18 pr-8">{items.disc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Knowledge Center  */}
          <div className="w-30 d-flex-col mt-25">
            <div className="w-100 py-15 flex align-items-center">
              <div className="w-100  fw-500 fs-s-20 mt-15 fw-700 d-flex align-items-center">
                Start Learning
              </div>
            </div>
            <div className="d-flex-col gap-20px mb-30">
              {finGradCourse?.slice(0, 3).map((each) => {
                return (
                  <a
                    href={each?.link}
                    target="_blank"
                    className="d-flex gap-20px"
                    key={each?.link}
                  >
                    <Image
                      style={{ width: "100px" }}
                      width={100}
                      src={each?.image}
                    />
                    <div className="d-flex-col justify-content-between">
                      <p className="mb-0 fs-s-12">{each?.title}</p>
                      <div>
                        <p className="horizontal-line mb-5"></p>
                        <p className="fs-s-12 d-flex align-items-center gap-5px mb-0">
                          View Courses
                          {lightMode
                            ? svgSheet5?.northEastblack
                            : svgSheet5?.northEastWhite}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{ height: "50px" }}
          className={` d-flex align-items-center justify-content-around ${
            lightMode ? "bg-gray " : "bluedark-gradient"
          } `}
        >
          {!authStatus && (
            <div className="d-flex align-items-center">
              <p className="fw-700 fs-s-16  mb-0">Ready to get started ?</p>
              <p
                onClick={() => navigate.push("/signup")}
                className={`mb-0 ml-10 fw-700 pointer ${
                  lightMode ? "" : "text-btn-dark"
                }`}
              >
                Sign up for free
              </p>
            </div>
          )}
          <div>
            <p
              onClick={() => navigate.push("/getpremium")}
              className="fw-700 fs-s-16  mb-0 underline pointer"
            >
              View Pricing
            </p>
          </div>
        </div>
      </div>
      {/* <PremiumRedirectModal
        visible={Visible}
        setVisible={setVisible}
        modalPlan="portFolio"
      /> */}

      <PremiumTrialModal
        visible={Visible}
        setVisible={setVisible}
        isTrialOver={checkTrialStatus()}
      />
    </Drawer>
  );
}

export default ToolsTogglecard;
