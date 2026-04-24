import React, { useState } from "react";
import { Drawer } from "antd";
import { Collapse } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authStore, setAuth } from "../../redux/reducers/authSlice";
import svgSheet from "../../assets/svg/svgSheet";
import svgSheet3 from "../../assets/svg/svgSheet3";
import { bannerOffsetCalc } from "../../utilityFn/bannerOffsetcalc";
import PremiumRedirectModal from "../PremiumRedirectModal";
import { useRouter } from "next/router";
import Link from "next/link";
import { AllStockMenu } from "./Menu/AllStockMenu";
import { TopGainLossMenu } from "./Menu/TopgainLossMenu";
import { HeatmapMenu } from "./Menu/HeatmapMenu";
import { CorporateMenu } from "./Menu/CorporateMenu";
import { BucketMenu } from "./Menu/BucketMenu";
import { NewTopGainLossMenu } from "./Menu/NewTopGainersLosers";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";

function MobileSideBar({
  mobileToggle,
  setMobileToggle,
  lightMode,
  authStatus,
  userLogout,
  fingradAccessStatus,
  finGradCourse,
}) {
  const [Visible, setVisible] = useState(false);
  const auth = useSelector(authStore);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const navigateTo = (path) => {
    const allowedPrefixes = [
      "/admin",
      "/stock-research-report",
      "/research-report",
      "/smallcase",
      "/index",
      "/heatmaps",
      "/heatmap",
      "/stock",
      "/marketstats",
    ];
    if (allowedPrefixes.some((prefix) => path.startsWith(prefix))) {
      navigate.push(path);
    } else {
      window.open(`https://portal.tradebrains.in${path}`, "_blank");
    }
  };
  const checkTrialStatus = useCheckTrialStatus();
  const { Panel } = Collapse;
  //toggle popup

  const mainNavLinkArr = [
    // {
    //   name: "Portal AI",
    //   featureText: "New",
    //   link: "/portal-ai",
    // },
    {
      name: "Stock Picks",
      // featureText: "New",
      link: "/stock-research-report",
    },
    {
      name: "Stock Portfolio",
      // featureText: "New",
      link: "/smallcase",
    },
    {
      name: "Research Report",
      // featureText: "New",
      link: "/research-reports",
    },
    // {
    //   name: "Portfolio Analysis",
    //   featureText: "Pro",
    //   link: "/portfolio",
    // },
    // {
    //   name: "Screener",
    //   featureText: "",
    //   link: "/screener",
    // },
    // {
    //   name: "Watchlist",
    //   featureText: "",
    //   link: "/watchlist",
    // },
    // {
    //   name: "IPO",
    //   featureText: "",
    //   link: "/ipo",
    // },
    // {
    //   name: "Compare Stocks",
    //   featureText: "",
    //   link: "/stockCompare",
    // },
    // {
    //   name: "Portfolio Backtesting",
    //   featureText: "",
    //   link: "/portfolio-backtesting",
    // },
    // {
    //   name: "Market news",
    //   featureText: "",
    //   link: "/news",
    // },
    // {
    //   name: "Superstar Portfolio",
    //   featureText: "",
    //   link: "/superstars",
    // },
    // {
    //   name: "Sector heat map",
    //   featureText: "",
    //   link: "/heatmaps/sector/banks",
    // },
    // {
    //   name: "Calculator",
    //   featureText: "",
    //   link: "/calculator",
    // },
    // {
    //   name: "Stock Exchange Holiday list",
    //   featureText: "",
    //   link: "/stock-exchange-holiday-list",
    // },
    // {
    //   name: "FII/DII Investments",
    //   link: "/fii-investments",
    // },
  ];

  return (
    <>
      <Drawer
        style={{
          top:
            mobileToggle === "MOBILE"
              ? `${
                  bannerOffsetCalc(auth) === 1
                    ? "100"
                    : 75 + bannerOffsetCalc(auth)
                }px`
              : "0px",
        }}
        rootStyle={{
          top:
            mobileToggle === "MOBILE"
              ? `${
                  bannerOffsetCalc(auth) === 1
                    ? "100"
                    : 75 + bannerOffsetCalc(auth)
                }px`
              : "0px",
        }}
        className="ff-poppins "
        drawerStyle={{
          background: lightMode ? "white" : "#131315",
          color: lightMode ? "black" : "white",
        }}
        headerStyle={{ marginInline: "16px", padding: "0px" }}
        bodyStyle={{ margin: "16px 24px 16px 13px", padding: "0px" }}
        placement={"top"}
        closable={false}
        onClose={() => setMobileToggle("NONE")}
        open={mobileToggle === "MOBILE" ? true : false}
        key="tools"
        height="100%"
        zIndex={500}
      >
        <div className="d-flex flex-col justify-content-between h-90">
          <div className="mt-15">
            {auth.userData.access_token && (
              <div
                onClick={() => {
                  navigateTo("/profile");
                  setMobileToggle("NONE");
                }}
                className="flex align-items-center"
                style={{ padding: "20px 40px 0px 16px" }}
              >
                {auth?.userData?.user?.profile_pic ? (
                  <img
                    src={auth?.userData?.user?.profile_pic}
                    style={{ height: "30px", width: "30px" }}
                    className=" br-50 d-flex pointer"
                  />
                ) : (
                  <li
                    style={{ height: "30px", width: "30px" }}
                    className="avatar-img  br-50 d-flex pointer"
                  ></li>
                )}
                <div>
                  <p className="fs-s-14">{auth?.userData?.user?.first_name}</p>
                  <p className="fs-12">{auth?.userData?.user?.email}</p>
                </div>
              </div>
            )}
            {auth?.userData?.user?.is_affiliate && (
              <Link
                href={"/affiliate"}
                className="fs-s-16 fw-500"
                style={{ padding: "20px 40px 0  px 16px" }}
              ></Link>
            )}

            {mainNavLinkArr?.slice(0, 5)?.map((each) => {
              return (
                <>
                  <div
                    onClick={() => {
                      navigateTo(each?.link);
                      setMobileToggle("NONE");
                    }}
                    className={`fw-500 fs-s-16 d-flex gap-10px align-items-center `}
                    style={{ padding: "12px 16px" }}
                  >
                    <span
                      className={each?.link === "/portal-ai" ? "fw-500" : ""}
                    >
                      {each?.name}
                    </span>
                    {each?.featureText === "New" && (
                      <span>{svgSheet3?.newFeatureIcon}</span>
                    )}
                    {/* {each?.featureText === "Early Access" && (
                      <span
                        className={`nav-bar-feature-text-new bg-feature-red`}
                      >
                        {each?.featureText}
                      </span>
                    )} */}
                    {each?.featureText === "Pro" &&
                      (auth?.userData?.user?.plan?.sname === "Free" ||
                      Object.keys(auth?.userData)?.length === 0 ? (
                        <span
                          style={{ width: "20px", height: "20px" }}
                          className="mt-4px"
                        >
                          {svgSheet?.premiumPLusMobile}
                        </span>
                      ) : (
                        ""
                      ))}
                  </div>
                  <p className="opacity5 mb-0 bb-2-gray"></p>
                </>
              );
            })}

            <Collapse
              expandIconPosition="end"
              bordered={false}
              className="ff-poppins "
              style={{ background: lightMode ? "#fff" : "#131315" }}
            >
              <Panel
                header={
                  <div
                    className="fs-s-16 fw-500"
                    style={{ color: lightMode ? "black" : "white" }}
                  >
                    All Stocks
                  </div>
                }
                className="fw-500 "
                key="1"
              >
                <div style={{ color: lightMode ? "black" : "white" }}>
                  <AllStockMenu
                    mobile={true}
                    sector={true}
                    industry={true}
                    setMobileToggle={setMobileToggle}
                  />
                </div>
              </Panel>
              <p className="opacity5 mb-0 bb-2-gray"></p>
              <Panel
                header={
                  <div
                    className="fs-s-16 fw-500"
                    style={{ color: lightMode ? "black" : "white" }}
                  >
                    Trending Stocks
                  </div>
                }
                className="fw-500"
                key="2"
                style={{ borderBottom: "1px solid #d9d9d9" }}
              >
                <NewTopGainLossMenu
                  mobile={true}
                  setMobileToggle={setMobileToggle}
                />
              </Panel>
              <p className="opacity5 mb-0 bb-2-gray"></p>
              <Panel
                header={
                  <div
                    className="fs-s-16 fw-500"
                    style={{ color: lightMode ? "black" : "white" }}
                  >
                    Heat Map
                  </div>
                }
                className="fw-500"
                key="4"
                style={{ borderBottom: "1px solid #d9d9d9" }}
              >
                <HeatmapMenu
                  mobile={true}
                  index={true}
                  sector={true}
                  buckets={true}
                  industry={true}
                  other={true}
                  setMobileToggle={setMobileToggle}
                />
              </Panel>
              <p className="opacity5 mb-0 bb-2-gray"></p>
              <Panel
                header={
                  <div
                    className="fs-s-16 fw-500"
                    style={{ color: lightMode ? "black" : "white" }}
                  >
                    Corporate Actions
                  </div>
                }
                className="fw-500"
                key="5"
                style={{ borderBottom: "1px solid #d9d9d9" }}
              >
                <CorporateMenu
                  mobile={true}
                  setMobileToggle={setMobileToggle}
                />
              </Panel>
              <p className="opacity5 mb-0 bb-2-gray"></p>
              <Panel
                header={
                  <div
                    className="fs-s-16 fw-500"
                    style={{ color: lightMode ? "black" : "white" }}
                  >
                    Buckets
                  </div>
                }
                className="fw-500"
                key="6"
                style={{ borderBottom: "1px solid #d9d9d9" }}
              >
                <BucketMenu mobile={true} setMobileToggle={setMobileToggle} />
              </Panel>
              <p className="opacity5 mb-0 bb-2-gray"></p>
            </Collapse>

            {mainNavLinkArr?.slice(5, 13)?.map((each) => {
              return (
                <>
                  <div
                    onClick={() => {
                      navigateTo(each?.link);
                      setMobileToggle("NONE");
                    }}
                    className="fw-500 fs-s-16 d-flex gap-10px align-items-center"
                    style={{ padding: "12px 16px" }}
                  >
                    {each?.name}
                    {each?.featureText === "New" && (
                      <span>{svgSheet3?.newFeatureIcon}</span>
                    )}
                    {each?.featureText === "Pro" && (
                      <span
                        style={{ width: "20px", height: "20px" }}
                        className="mt-4px"
                      >
                        {svgSheet?.premiumIcon}
                      </span>
                    )}
                  </div>
                  <p className="opacity5 mb-0 bb-2-gray"></p>
                </>
              );
            })}

            {auth?.userData?.user?.plan?.planId === "year" ||
            auth?.userData?.user?.plan?.planId === "lifetime" ? (
              <div
                onClick={() => {
                  navigateTo("/premium-support");
                  setMobileToggle("NONE");
                }}
                className="fw-500 fs-s-16"
                style={{ padding: "20px 40px 1px 16px" }}
              >
                Premium Support
              </div>
            ) : (
              <div
                onClick={() => {
                  navigateTo("/premium-support");
                  setMobileToggle("NONE");
                }}
                className="fw-500 fs-s-16"
                style={{ padding: "20px 40px 15px 16px" }}
              >
                Contact Us
              </div>
            )}
            {auth?.userData?.user?.plan?.planId === "lifetime" && (
              <div
                onClick={() => {
                  setMobileToggle("NONE");
                  return fingradAccessStatus.url === false &&
                    fingradAccessStatus.url !== null
                    ? window.open(fingradAccessStatus?.url)
                    : fingradAccessStatus.url === null
                      ? window.open("https://joinfingrad.com/")
                      : navigate.push("/joinfingrad");
                }}
                className="fw-500 fs-s-16"
                style={{ padding: "20px 40px 1px 16px" }}
              >
                Fingrad Access
              </div>
            )}

            {auth?.userData?.user ? (
              <div
                className="fw-500 fs-s-16"
                style={{ padding: "20px 40px 1px 16px" }}
                onClick={userLogout}
              >
                {/* <GoogleLogoutFn/> */}
                Logout
              </div>
            ) : (
              // <button
              //   className="w-100 h-40px btn-bg-primary text-white br-5 pb-fixed"
              //   onClick={() => {
              //     setMobileToggle("NONE");
              //     dispatch(setToggleForm("login"));
              //     // navigate.push("/login");
              //   }}
              // >
              //   Login
              // </button>
              ""
            )}
          </div>
          <div
            style={{ height: "50px" }}
            className={` d-flex align-items-center flex-col justify-content-around ${
              lightMode ? "bg-gray " : "bluedark-gradient"
            } `}
          >
            {/* {!authStatus?.access_token && (
              <div className="d-flex align-items-center">
                <p className="fw-500 mb-0">Ready to get started ?</p>
                <p
                  className={`mb-0 ml-10 fw-500 ${
                    lightMode ? "" : "text-btn-dark"
                  }`}
                >
                  Sign up for free
                </p>
              </div>
            )} */}
            <div>
              <p
                onClick={() => {
                  navigateTo("/getpremium");
                  setMobileToggle("NONE");
                }}
                className="fw-500   mb-0 underline pointer"
              >
                View Pricing
              </p>
            </div>
          </div>
        </div>
      </Drawer>
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
    </>
  );
}

export default MobileSideBar;
