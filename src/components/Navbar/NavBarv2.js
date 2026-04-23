import React, { Children, useEffect, useRef, useState } from "react";
import logo from "../../assets/images/PortalLogo.png";
import logoWhite from "../../assets/images/logo/logoWhite.png";
import ProductToggleCard from "./ProductToggleCard";
import svgSheet from "../../assets/svg/svgSheet";
import svgSheet2 from "../../assets/svg/svgSheet2";
import svgSheet3 from "../../assets/svg/svgSheet3";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined, LogoutOutlined, UpOutlined } from "@ant-design/icons";
import fingradLogo from "../../assets/images/Fingrad.png";
import Link from "next/link";
import Image from "next/image";
import { getThemeMode, toggleThemeMode } from "../../redux/reducers/ThemeSlice";
import SearchComponent from "./SearchComponent";
import {
  authStore,
  setAuth,
  updateAccessToken,
} from "../../redux/reducers/authSlice";
import ToolsTogglecard from "./ToolsTogglecard";
import MobileSideBar from "./MobileSideBar";
import MobileSearch from "./MobileSearch";
import { useRouter } from "next/router";
import { resetWatchlistArr } from "../../redux/reducers/watchListSlice";
import {
  checkFingradAccess,
  getNewsData,
  postRefreshToken,
} from "../../pages/api/fetchClient";
import opManish from "../../assets/images/FingradCourse/opManish.png";
import Kunal from "../../assets/images/FingradCourse/Kunal.webp";
import kriteshFingrad from "../../assets/images/FingradCourse/kriteshFingrad.png";
import ManishCourse from "../../assets/images/FingradCourse/manishCourse.png";
import Cookies from "js-cookie";
import { NavBarmenu } from "./NavBarMenu";
import {
  setLoginTime,
  setSessionTime,
  timeStore,
} from "../../redux/reducers/loginTimeSlice";
import styles from "./navbar.module.css";
import PortalIcon from "../../assets/images/logo/portal_ai.png";

import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";

function NavBarv2({
  MobileSearchDrop,
  setMobileSearchDrop,
  setIsMobileNavOpen,
}) {
  const finGradCourse = [
    {
      image: opManish,
      title: "LIVE Class: Advanced Options Trading Strategies",
      link: "https://joinfingrad.com/class/advanced-options-trading-strategies",
    },
    {
      image: ManishCourse,
      title: "Course: Advanced Options Selling Masterclass",
      link: "https://joinfingrad.com/courses-details/64/Advanced-Options-Selling-Masterclass",
    },

    {
      image: kriteshFingrad,
      title:
        "Stock Market Investing Masterclass: Learn to Invest in Stocks from Scratch",
      link: "https://joinfingrad.com/courses-details/51/Stock-Market-Investing-Masterclass-Learn-to-Invest-in-Stocks-from-Scratch",
    },
    {
      image: Kunal,
      title:
        "The Complete Course on Options Trading for Beginners (From Scratch)",
      link: "https://joinfingrad.com/courses-details/54/The-Complete-Course-on-Options-Trading-for-Beginners-From-Scratch",
    },
  ];
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector(authStore);
  const reduxLoginTime = useSelector(timeStore);
  const { lightMode } = useSelector(getThemeMode);

  const navigateTo = (path) => {
    const allowedPrefixes = [
      "/admin",
      "/stock-research-report",
      "/research-report",
      "/smallcase",
    ];
    if (allowedPrefixes.some((prefix) => path.startsWith(prefix))) {
      router.push(path);
    } else {
      window.open(`https://portal.tradebrains.in${path}`, "_blank");
    }
  };
  const [inputData, setinputData] = useState("");
  const [apiData, setapiData] = useState([]);
  const [PopupStatus, setPopupStatus] = useState("NONE");
  const [toggleStatus, setToggleStatus] = useState("NONE");
  const [WatchListTrigger, setWatchListTrigger] = useState(false);
  const [showNavEle, setShowNavEle] = useState(true);
  const [fingradAccessStatus, setfingradAccessStatus] = useState({
    url: false,
  });
  const activeSearch = useSelector((state) => state?.ActiveSearch);
  const [menuOpen, setMenuOpen] = useState(false);
  const getFinCourseAccess = async () => {
    await checkFingradAccess(auth?.userData?.user?.email)
      .then((resp) => {
        setfingradAccessStatus(resp.data);
      })
      .catch((err) => setfingradAccessStatus({ url: null }));
  };
  useEffect(() => {
    const fun = () => {
      dispatch(setAuth({}));
      dispatch(updateAccessToken());
      dispatch(resetWatchlistArr());
      dispatch(setSessionTime());
      dispatch(setLoginTime());
      Cookies.remove("ptl_access_token");
      Cookies.remove("login_time");
      Cookies.remove("start_session");
    };
    !Cookies.get("ptl_access_token") && fun();
  }, [auth?.userData?.access_token]);
  useEffect(() => {
    setTimeout(() => {
      setShowNavEle(false);
    }, 0);
  }, []);

  useEffect(() => {
    if (auth?.userData?.user?.email) getFinCourseAccess();
  }, [auth]);
  useEffect(() => {
    if (activeSearch?.Search) {
      setToggleStatus("SEARCH");
    }
  }, [activeSearch?.Search]);

  const userLogout = () => {
    dispatch(setAuth({}));
    dispatch(updateAccessToken());
    dispatch(resetWatchlistArr());
    dispatch(setSessionTime());
    dispatch(setLoginTime());
    dispatch(setToggleForm(null));
    Cookies.remove("ptl_access_token", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    Cookies.remove("login_time", { path: "/" });
    Cookies.remove("start_session", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    router.push("/");
  };

  const now = new Date();
  const start_session = Cookies.get("start_session");
  const login_time = Cookies.get("login_time");
  const loginTimeRedux = new Date(reduxLoginTime?.loginTime);
  const sessionTimeRedux = new Date(reduxLoginTime?.sessionTime);

  if (
    Cookies.get("login_time") === undefined &&
    loginTimeRedux !== undefined &&
    Cookies.get("ptl_access_token") !== undefined
  ) {
    Cookies.set("login_time", loginTimeRedux, {
      expires: 180,
      path: "/", // always recommended
      secure: false, // should be false for localhost
      sameSite: "Lax", // optional, good default
    });
  }
  if (
    Cookies.get("start_session") === undefined &&
    sessionTimeRedux !== undefined &&
    Cookies.get("ptl_access_token") !== undefined
  ) {
    Cookies.set("start_session", sessionTimeRedux);
  }
  if (
    Cookies.get("refresh_token") === undefined &&
    auth?.userData?.refresh_token !== undefined &&
    Cookies.get("ptl_access_token") !== undefined
  ) {
    Cookies.set("refresh_token", auth?.userData?.refresh_token, {
      expires: 180,
    });
  }

  useEffect(() => {
    const date1 = new Date(start_session);
    const date2 = new Date();
    const differenceInMinutes = Math.abs((date2 - date1) / (1000 * 60));

    const date3 = new Date(login_time);
    const date4 = new Date();
    const differenceInMinutesLoginSession = Math.abs(
      (date4 - date3) / (1000 * 60),
    );

    if (differenceInMinutesLoginSession >= 259200) {
      const checkSession = async () => {
        try {
          userLogout();
        } catch (err) {
          console.error("Error logging out:", err);
        }
      };
      checkSession();
    } else if (differenceInMinutes >= 2400) {
      const data = {
        refresh: auth?.userData?.refresh_token,
      };

      const postToken = async () => {
        try {
          const resp = await postRefreshToken(data);
          Cookies.set("ptl_access_token", resp?.data?.access, {
            expires: 2,
            secure: true,
            sameSite: "Lax",
          });
          dispatch(updateAccessToken(resp?.data?.access));
          dispatch(setSessionTime(now));
          Cookies.set("start_session", now);
        } catch (err) {
          if (err?.response?.status === 401) {
            userLogout();
          } else {
            console.error("Token refresh error:", err);
          }
        }
      };

      postToken();
    }
  }, [router.asPath, auth]);

  const menu = (
    <Menu
      className={`ff-poppins ${
        lightMode ? "menu-DropDwon-light" : "menu-DropDwon-dark bg-dark-black "
      } `}
      style={{ width: "250px", height: "auto" }}
      items={[
        {
          label: (
            <Link
              href={"/profile"}
              className="flex align-items-center"
              style={{ padding: "4px 10px" }}
            >
              {auth?.userData?.user?.profile_pic ? (
                <Image
                  src={auth?.userData?.user?.profile_pic}
                  style={{ height: "30px", width: "30px" }}
                  width={30}
                  height={30}
                  className=" br-50 d-flex pointer"
                />
              ) : (
                <li
                  style={{ height: "30px", width: "30px" }}
                  className="avatar-img  br-50 d-flex pointer"
                ></li>
              )}
              <div>
                <h5 className="fs-s-14 fw-700">
                  {auth?.userData?.user?.first_name}
                </h5>
                <h5
                  style={{ overflow: "hidden", width: "180px" }}
                  className="fs-12 "
                >
                  {auth?.userData?.user?.email}
                </h5>
              </div>
            </Link>
          ),
          key: "1",
        },

        auth?.userData?.user?.accountType !== "admin"
          ? auth?.userData?.user?.is_affiliate && {
              label: (
                <Link
                  href={"https://admin.tradebrains.in/"}
                  className="flex align-items-center"
                  style={{ padding: "4px 10px" }}
                >
                  <div style={{ width: "24px", height: "24px" }}>
                    {svgSheet3.affiliateIcon}
                  </div>
                  <h5 className="fs-s-14 fw-700">Affiliate</h5>
                </Link>
              ),
              key: "7",
            }
          : {
              label: (
                <Link
                  href="https://admin-portal.tradebrains.in/"
                  className="flex align-items-center"
                  style={{ padding: "4px 10px" }}
                >
                  <div style={{ width: "24px", height: "24px" }}>
                    {svgSheet3.affiliateIcon}
                  </div>

                  <h5 className="fs-s-14 fw-700">Admin</h5>
                </Link>
              ),
              key: "7",
            },
        auth?.userData?.user?.plan?.planId === "lifetime" && {
          label: (
            <div
              onClick={() => {
                return fingradAccessStatus.url !== false &&
                  fingradAccessStatus.url !== null
                  ? window.open(fingradAccessStatus?.url)
                  : fingradAccessStatus.url === null
                    ? window.open("https://joinfingrad.com/")
                    : router.push("/joinfingrad");
              }}
              style={{ padding: "4px 10px" }}
              className="flex align-items-center"
            >
              <div style={{ width: "24px", height: "24px" }}>
                <Image src={fingradLogo} width={24} height={24} alt="fingrad" />
              </div>
              <h5 className="fs-s-14 fw-700">
                {fingradAccessStatus.url === null
                  ? "Learn on Fingrad"
                  : "Fingrad Access"}
              </h5>
            </div>
          ),
          key: "8",
        },
        auth?.userData?.user?.plan?.planId === "year" ||
        auth?.userData?.user?.plan?.planId === "lifetime"
          ? {
              label: (
                <Link
                  href="/premium-support"
                  className="flex align-items-center"
                  style={{ padding: "4px 10px" }}
                >
                  <div style={{ width: "24px", height: "24px" }}>
                    {svgSheet.premiumIcon}
                  </div>
                  <h5 className="fs-s-14 fw-700">Premium Support</h5>
                </Link>
              ),
              key: "4",
            }
          : {
              label: (
                <Link
                  href="/contactus"
                  className="flex align-items-center"
                  style={{ padding: "4px 10px" }}
                >
                  <div style={{ width: "24px", height: "24px" }}>
                    {svgSheet3.contactUsIcon}
                  </div>
                  <h5 className="fs-s-14 fw-700">Contact Us</h5>
                </Link>
              ),
              key: "6",
            },
        auth?.userData?.user?.plan?.planId === "year_plus"
          ? null
          : {
              label: (
                <Link
                  href="/getpremium"
                  className="flex align-items-center"
                  style={{ padding: "4px 10px" }}
                >
                  <div
                    style={{ width: "24px", height: "24px" }}
                    className="mt-5"
                  >
                    {svgSheet?.premiumPLusMobile}
                  </div>
                  <h5 className="fs-s-14 text-grad-secondary fw-700">
                    Get Premium
                  </h5>
                </Link>
              ),
              key: "5 ",
            },

        {
          label: (
            <div
              className="fs-s-14 fw-500 flex"
              onClick={userLogout}
              style={{ padding: "4px 10px 12px 10px" }}
            >
              <LogoutOutlined className="mx-10" style={{ fontSize: "23px" }} />
              <span>Logout</span>
            </div>
          ),
          key: "5 ",
        },
      ]}
    />
  );
  // send search input API
  const getResults = async (e) => {
    setinputData(e);

    const response =
      (await !WatchListTrigger) &&
      getSearchData(e)
        .then((resp) => {
          setapiData(resp.data);
        })
        .catch((err) => null);
  };

  const openCloseToggle = (current) => {
    if (current === "NONE") {
      setIsMobileNavOpen(false);
    }

    if (current === "MOBILE") {
      setIsMobileNavOpen(true);
    }

    if (current === toggleStatus) {
      setToggleStatus("NONE");
      setMobileSearchDrop(false);
    } else {
      setToggleStatus(current);
    }
  };

  const dropdowndata = [];

  const renderItem = (title, symbol, type) => ({
    value: symbol,
    label: (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "50px",
        }}
        className="align-items-center"
      >
        <div
          onClick={() => navigateTo(`/stock/${symbol}/consolidated`)}
          className="d-flex-col ml-5"
        >
          <div className="fw-500">{title}</div>
          <div
            style={{ color: "#6DB8FD", fontWeight: "500px" }}
            className="btn- fw-500"
          >
            {symbol}
          </div>
        </div>
      </div>
    ),
    array: [type, title],
  });

  const uniqdataarrray = [];
  apiData.map((items) => {
    !uniqdataarrray.includes(items.symbol) &&
      dropdowndata.push(renderItem(items.company, items.symbol, items?.type));
    uniqdataarrray.push(items.symbol);
  });

  // search result div
  const searchResultDiv = apiData?.map((stock, i) => (
    <div
      key={i}
      className={`d-flex align-items-center justify-content-between ${
        lightMode ? "bb1px-light-mode" : "bb1px-dark-mode"
      }`}
    >
      <NavComponent stock={stock} setinputData={setinputData} />
    </div>
  ));
  // toggle popup
  const selectPopup = (key) => {
    switch (key) {
      case "SIGNUP":
        return (
          <Signup popupStatus={PopupStatus} onCloseHandler={setPopupStatus} />
        );
      case "JOIN":
        return (
          <JoinPortal
            popupStatus={PopupStatus}
            onCloseHandler={setPopupStatus}
          />
        );
      case "LOGIN":
        return (
          <Login popupStatus={PopupStatus} onCloseHandler={setPopupStatus} />
        );
      case "FORGOT":
        return (
          <ForgotPassword
            popupStatus={PopupStatus}
            onCloseHandler={setPopupStatus}
          />
        );
      default:
        return <div></div>;
        break;
    }
  };

  const mainNavLinkArr =
    auth?.userData?.user?.plan?.sname === "Free" || !auth?.userData.access_token
      ? [
          {
            name: "Stock Picks",
            shine: true,
            link: "/stock-research-report",
          },
          {
            name: "Stock Portfolio",
            link: "smallcase",
            // featureText: "New",
          },
          {
            name: "Research Report",
            link: "research-reports",
          },
          {
            name: "Markets",
            link: "markets",
          },
          {
            name: "Portal AI",
            featureText: "New",
            link: "/portal-ai",
          },
          {
            name: "View Pricing",
            link: "/getpremium",
          },
        ]
      : [
          {
            name: "Stock Picks",
            shine: true,
            link: "/stock-research-report",
          },
          {
            name: "Stock Portfolio",
            link: "smallcase",
            // featureText: "New",
          },
          {
            name: "Research Report",
            link: "research-reports",
          },
          {
            name: "Markets",
            link: "markets",
          },
          {
            name: "Heatmaps",
            link: "index/NIFTY/heatmap",
          },
          {
            name: "Portal AI",
            featureText: "New",
            link: "/portal-ai",
          },
        ];

  const createDropdownItem = (key, label, children = [], link = null) => ({
    key,
    label: (
      <div
        onClick={() => navigateTo(link)}
        className={
          lightMode ? styles.dropdown_item_light : styles.dropdown_item
        }
      >
        <span>{label}</span>
        <span style={{ display: children?.length > 0 ? "block" : "none" }}>
          {" "}
          {">"}
        </span>
      </div>
    ),
    ...(Array.isArray(children) && children.length > 0
      ? {
          children: children.map(({ key, label, link }) =>
            createDropdownItem(key, label, [], link),
          ),
        }
      : {}),
    ...(link ? { link } : {}),
  });

  const MegaMenu = ({ marketLeft, toolsRight, lightMode, closeMenu }) => {
    const [hoverItem, setHoverItem] = useState(null);

    const renderColumn = (title, items) => (
      <div style={{ flex: 1, position: "relative" }}>
        <h4 style={{ marginBottom: 10, fontSize: "12px" }}>{title}</h4>

        {items.map((item) => (
          <div
            key={item.key}
            onMouseEnter={() => setHoverItem(item)}
            onMouseLeave={() => setHoverItem(null)}
            style={{
              cursor: "pointer",
              color: lightMode ? "#000" : "#fff",
              position: "relative",
              padding: "2px 0",
            }}
          >
            {item.label}

            {/* SUB MENU */}
            {hoverItem?.key === item.key && item.children?.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: "100%",
                  width: "220px",
                  background: lightMode ? "#fff" : "#212639",
                  color: lightMode ? "#000" : "#fff",
                  borderRadius: "8px",
                  padding: "10px 0px",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                  zIndex: 999,
                }}
              >
                {item.children.map((child) => (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      closeMenu();
                    }}
                    key={child.key}
                    style={{
                      cursor: "pointer",
                      padding: "0px 0px 0px 10px",
                      color: lightMode ? "#000" : "#fff",
                    }}
                  >
                    {child.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );

    return (
      <div
        style={{
          display: "flex",
          gap: "40px",
          padding: "20px",
          backgroundColor: lightMode ? "#fff" : "#212639",
          color: lightMode ? "#000" : "#AFAFAF",
          borderRadius: "10px",
          width: "550px",
          position: "relative",
        }}
      >
        {renderColumn("Markets", marketLeft)}
        {renderColumn("Tools", toolsRight)}
      </div>
    );
  };

  const dropdownLinks = [
    (auth?.userData?.user?.plan?.sname === "Free" ||
      !auth?.userData.access_token) &&
      createDropdownItem(
        "1",
        "Heatmaps",
        [
          { key: "8-1", label: "Index Heatmaps", link: "/index/NIFTY/heatmap" },
          {
            key: "8-2",
            label: "Sector Heatmaps",
            link: "/heatmaps/sector/agro-chemicals",
          },
          {
            key: "8-3",
            label: "Industry Heatmaps",
            link: "/heatmaps/industry/abrasives-and-grinding-wheels",
          },
          {
            key: "8-4",
            label: "Superstar Heatmaps",
            link: "/heatmaps/superstar/rakesh-jhunjhunwala-and-associates",
          },
          {
            key: "8-5",
            label: "Monthly Index Heatmaps",
            link: "/heatmaps/monthly-index/NIFTY",
          },
          {
            key: "8-6",
            label: "Bucket Heatmaps",
            link: "/heatmaps/business-houses/tata-group",
          },
          {
            key: "8-7",
            label: "Stocks Heatmaps",
            link: "/heatmaps/stocks/TCS",
          },
          // {
          //   key: "8-8",
          //   label: "Other Heatmaps",
          //   link: "/heatmap/global-stock-market",
          // },
        ],
        "/index/NIFTY/heatmap",
      ),
    createDropdownItem("8", "Portfolio Analysis", [], "/portfolio"),
    createDropdownItem("9", "Watchlist", [], "/watchlist"),
    createDropdownItem("10", "Screener", [], "/screener"),
    createDropdownItem("11", "Compare Stocks", [], "/stockCompare"),
    createDropdownItem("12", "Superstar Portfolio", [], "/superstars"),
    createDropdownItem(
      "13",
      "Portfolio Backtesting",
      [],
      "/portfolio-backtesting",
    ),
    createDropdownItem(
      "2",
      "All Stocks",
      [
        { key: "1-1", label: "Sectors", link: "/stock/sector/banks" },
        { key: "1-2", label: "Industry", link: "/stock/industry/aluminium" },
        // {
        //   key: "1-3",
        //   label: "Other",
        //   link: "/stock/others/global-stock-market",
        // },
      ],
      "/stock/sector/banks",
    ),
    createDropdownItem(
      "3",
      "Trending Stocks",
      [
        {
          key: "2-1",
          label: "Top Gainers",
          link: "/marketstats/gainers/NIFTY",
        },
        { key: "2-2", label: "Top Losers", link: "/marketstats/losers/NIFTY" },
        { key: "2-3", label: "Others", link: "/marketstats/trending-stocks" },
      ],
      "/marketstats/trending-stocks",
    ),
    createDropdownItem(
      "4",
      "Corporate Actions",
      [
        { key: "3-1", label: "Dividends", link: "/corporateactions/Dividends" },
        {
          key: "3-2",
          label: "Board Meetings",
          link: "/corporateactions/Board-Meetings",
        },
        { key: "3-3", label: "Bonus", link: "/corporateactions/Bonus" },
        { key: "3-4", label: "Splits", link: "/corporateactions/Splits" },
        {
          key: "3-5",
          label: "Book Closure",
          link: "/corporateactions/Book-Closure",
        },
        {
          key: "3-6",
          label: "Offer for Sale",
          link: "/corporateactions/Offer-For-Sale",
        },
        {
          key: "3-7",
          label: "Rights Issues",
          link: "/corporateactions/Rights-Issue",
        },
        { key: "3-8", label: "AGM/EGM", link: "/corporateactions/AGM-EGM" },
        { key: "3-9", label: "Delisted", link: "/corporateactions/Delisted" },
        {
          key: "3-10",
          label: "BSE Announcements",
          link: "/corporateactions/BSE-Announcements",
        },
        {
          key: "3-11",
          label: "NSE Announcements",
          link: "/corporateactions/NSE-Announcements",
        },
        {
          key: "3-12",
          label: "Merger/Demerger",
          link: "/corporateactions/Merger-Demerger",
        },
        {
          key: "3-13",
          label: "Upcoming Results",
          link: "/corporateactions/Forthcoming  ",
        },
      ],
      "/corporateactions/Dividends",
    ),
    createDropdownItem(
      "5",
      "IPOs",
      [
        { key: "4-1", label: "Open IPO", link: "/ipo/open_data" },
        { key: "4-2", label: "Upcoming IPO", link: "/ipo/upcoming_data" },
        { key: "4-3", label: "Closed IPO", link: "/ipo/closed_data" },
        {
          key: "4-4",
          label: "Newly Listed IPO",
          link: "/ipo/newly_listed_data",
        },
        {
          key: "4-5",
          label: "Best Performing IPO",
          link: "/ipo/best_performance_data",
        },
      ],
      "/ipo",
    ),
    createDropdownItem("5", "Index Returns", [], "/marketstats/All-Indices"),
    createDropdownItem(
      "6",
      "Market News",
      [
        { key: "6-1", label: "Hot Pursuit", link: "/news/hot-pursuit" },
        { key: "6-2", label: "Foreign Markets", link: "/news/foreign-markets" },
        { key: "6-3", label: "Forex News", link: "/news/forex-news" },
        { key: "6-4", label: "Bullion", link: "/news/Bullion" },
        { key: "6-5", label: "Corporate News", link: "/news/corporate-news" },
        { key: "6-6", label: "Economy News", link: "/news/economy-news" },
        {
          key: "6-7",
          label: "Corporate Results",
          link: "/news/corporate-results",
        },
        { key: "6-8", label: "Stock Alert", link: "/news/stock-alert" },
      ],
      "/news",
    ),
    createDropdownItem("7", "FII/DII Investments", [], "/fii-investments"),

    createDropdownItem(
      "7",
      "Stock Exchange Holiday List",
      [],
      "/stock-exchange-holiday-list",
    ),
  ];

  const marketGroupIds = ["1", "2", "3", "4", "5", "6", "7"];
  const toolsGroupIds = ["8", "9", "10", "11", "12", "13"];

  const cleanDropdownLinks = dropdownLinks.filter(Boolean);

  const marketLeft = cleanDropdownLinks.filter((item) =>
    marketGroupIds.includes(item.key),
  );

  const toolsRight = cleanDropdownLinks.filter((item) =>
    toolsGroupIds.includes(item.key),
  );

  const heatmapLinks = [
    createDropdownItem("1", "Index Heatmaps", [], "/index/NIFTY/heatmap"),
    createDropdownItem(
      "2",
      "Sector Heatmaps",
      [],
      "/heatmaps/sector/agro-chemicals",
    ),
    createDropdownItem(
      "3",
      "Industry Heatmaps",
      [],
      "/heatmaps/industry/abrasives-and-grinding-wheels",
    ),
    createDropdownItem(
      "4",
      "Superstar Heatmaps",
      [],
      "/heatmaps/superstar/rakesh-jhunjhunwala-and-associates",
    ),
    createDropdownItem(
      "5",
      "Monthly Index Heatmaps",
      [],
      "/heatmaps/monthly-index/NIFTY",
    ),
    createDropdownItem(
      "6",
      "Bucket Heatmaps",
      [],
      "/heatmaps/business-houses/tata-group",
    ),
    createDropdownItem("7", "Stocks Heatmaps", [], "/heatmaps/stocks/TCS"),
    // createDropdownItem(
    //   "8",
    //   "Other Heatmaps",
    //   [],
    //   "/heatmap/global-stock-market"
    // ),
  ];

  const researchReportLinks = [
    createDropdownItem(
      "1",
      "Technical Reports",
      [],
      "/research-reports/technicals-reports",
    ),
    createDropdownItem(
      "2",
      "Monthly Stock Picks",
      [],
      "/research-reports/monthly-stock-picks",
    ),
    createDropdownItem(
      "3",
      "Seasonal Stock Picks",
      [],
      "/research-reports/seasonal-stock-picks",
    ),
    createDropdownItem("4", "IPO Reports", [], "/research-reports/ipo-reports"),
  ];

  useEffect(() => {
    const updateDropdownStyles = () => {
      document
        .querySelectorAll(".dropdown_class [class*='arrow']")
        .forEach((el) => {
          el.style.display = "none";
        });

      document.querySelectorAll(".ant-dropdown-menu").forEach((el) => {
        el.style.backgroundColor = lightMode ? "#fff" : "#212639";
        el.style.color = lightMode ? "#000" : "#fff";
      });

      document
        .querySelectorAll(".ant-dropdown-menu-submenu-popup")
        .forEach((el) => {
          el.style.backgroundColor = lightMode ? "#fff" : "#212639";
        });
    };

    // Run once on lightMode toggle
    updateDropdownStyles();

    // MutationObserver for dynamic updates [Also meant to ensure rollback of antd change in submenu]
    const observer = new MutationObserver(() => {
      setTimeout(updateDropdownStyles, 50); // Small delay ensures new elements exist
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [lightMode]); // Depend on lightMode for real-time updates

  return (
    <div
      className={`${
        lightMode
          ? "bg-white text-black"
          : `${
              router.pathname.includes("/portal-ai")
                ? "bg-dark-portal-ai"
                : "bg-dark-black"
            } text-white`
      } card-shadow-black`}
      onClick={() => {
        toggleStatus === "Tools"
          ? openCloseToggle("Tools")
          : toggleStatus === "Products" && openCloseToggle("Products");
      }}
    >
      <div>
        <nav className="h-75 px-15 w-100  p-50-0 d-flex align-items-center justify-content-between">
          {/* logo  */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="w-10-30"
              style={{
                flex: 1,
                minWidth: "100px",
              }}
            >
              <Image
                onClick={() =>
                  router.route !== "/" &&
                  navigateTo(
                    auth.userData.access_token ? "/stock-research-report" : "/",
                  )
                }
                src={lightMode ? logo : logoWhite}
                className="header-logo h-100 pointer"
                height={"30px"}
                width={"30px"}
                alt="logo"
              />
            </div>
            <div
              className="only-PC-view"
              style={{
                flex: 1,
              }}
            >
              <SearchComponent
                lightMode={lightMode}
                setMobileSearchToggle={setToggleStatus}
                planData={auth}
                custom={true}
              />
            </div>
          </div>
          {/* auth?.userData?.user?.plan?.sname === "Free" || Object.keys(auth?.userData)?.length === 0 */}
          <div className={styles.width_nav_bar}>
            {!showNavEle && (
              <ul
                className={`ff-poppins fw-500 list-style-none w-100 ${
                  styles.flex_navbar
                } ${
                  auth?.userData?.user?.email
                    ? styles.nav_list_dashboard
                    : styles.nav_list
                }`}
              >
                {mainNavLinkArr?.map((each, index) => {
                  return (
                    <li
                      className="pointer relative gap-5px link-hover-underline flex align-items-center"
                      key={index}
                    >
                      {/* each?.featureText === "Early Access" */}
                      {each?.featureText === "New" && (
                        <span className={`nav-bar-feature-text bg-feature-red`}>
                          {each?.featureText}
                        </span>
                      )}
                      {each?.featureText === "Pro" &&
                        (auth?.userData?.user?.plan?.sname === "Free" ||
                        Object.keys(auth?.userData)?.length === 0 ? (
                          <span className="mt-5">
                            {svgSheet?.premiumIconSmallPricing}
                          </span>
                        ) : (
                          ""
                        ))}
                      {each?.link === "/getpremium" && (
                        <span className="mt-5">
                          {svgSheet?.premiumIconSmallPricing}
                        </span>
                      )}

                      {each?.link === "research-reports" && (
                        <>
                          <Dropdown
                            overlayClassName={`${
                              lightMode ? "dropdown-light" : "dropdown-dark"
                            } sticky-dropdown`}
                            menu={{
                              items:
                                each?.name === "Research Report" &&
                                researchReportLinks,
                              style: {
                                backgroundColor: lightMode ? "#fff" : "#212639",
                                color: lightMode ? "#000" : "#fff",
                                width: "200px",
                              },
                            }}
                            arrow={false}
                            trigger={["hover"]}
                          >
                            <button
                              style={{
                                background: "none",
                                color: "white",
                                cursor: "pointer",
                              }}
                            >
                              <Space>
                                <span
                                  style={{ color: lightMode ? "#000" : "#fff" }}
                                  onClick={() => {
                                    navigateTo(
                                      each?.link === "research-reports"
                                        ? "/research-reports"
                                        : each?.link,
                                    );
                                  }}
                                >
                                  {each?.name}
                                </span>
                                <DownOutlined
                                  style={{
                                    color: lightMode ? "#000" : "#fff",
                                    fontSize: "12px",
                                  }}
                                />
                              </Space>
                            </button>
                          </Dropdown>
                        </>
                      )}
                      {/* 
                      {each?.link === "/stock-research-report" && (
                        <span className={`mr-5 ${styles.portal_ai_animated}`}>
                          {each?.name}
                        </span>
                      )} */}
                      {each?.link === "/portal-ai" ? (
                        <span
                          className={`mr-5`}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            const redirectUrl = auth?.userData?.access_token
                              ? "/portal-ai/portal-ai-chat"
                              : "/portal-ai";
                            navigateTo(redirectUrl);
                          }}
                        >
                          {each?.name}
                          {/* <span>
                            <Image
                              src={PortalIcon}
                              width="80"
                              height="20"
                              alt="logo"
                              style={{ marginTop: "-10px" }}
                            />
                          </span> */}
                        </span>
                      ) : each?.link?.startsWith("/") ? (
                        <span
                          className={styles.portal_ai_animated}
                          onClick={() => {
                            // if (
                            //   typeof window !== "undefined" &&
                            //   window.gtag &&
                            //   each?.link === "/stock-research-report"
                            // ) {
                            //   window.gtag("event", "stock_picks_click", {
                            //     user_logged_in: !!auth?.userData?.access_token,
                            //     user_plan:
                            //       auth?.userData?.user?.plan?.planId ||
                            //       "free_or_guest",
                            //   });
                            // }
                            navigateTo(each?.link);
                          }}
                        >
                          {each?.name}
                        </span>
                      ) : each?.link === "smallcase" ? (
                        <span
                          style={{
                            background: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => navigateTo("/smallcase")}
                        >
                          {each?.name}
                        </span>
                      ) : each?.link === "markets" ? (
                        <>
                          <Dropdown
                            overlayClassName={`${
                              lightMode ? "dropdown-light" : "dropdown-dark"
                            } sticky-dropdown`}
                            trigger={["hover"]}
                            open={menuOpen}
                            onOpenChange={(val) => setMenuOpen(val)}
                            arrow={false}
                            dropdownRender={() => (
                              <MegaMenu
                                marketLeft={marketLeft}
                                toolsRight={toolsRight}
                                lightMode={lightMode}
                                closeMenu={() => setMenuOpen(false)}
                              />
                            )}
                          >
                            <button
                              style={{
                                background: "none",
                                color: lightMode ? "#000" : "#fff",
                                cursor: "pointer",
                              }}
                            >
                              Markets <DownOutlined style={{ fontSize: 12 }} />
                            </button>
                          </Dropdown>
                        </>
                      ) : each?.name === "Heatmaps" ? (
                        <>
                          <Dropdown
                            overlayClassName={`${
                              lightMode ? "dropdown-light" : "dropdown-dark"
                            } sticky-dropdown`}
                            menu={{
                              items: heatmapLinks,
                              style: {
                                backgroundColor: lightMode ? "#fff" : "#212639",
                                color: lightMode ? "#000" : "#fff",
                                width: "200px",
                              },
                            }}
                            arrow={false}
                            trigger={["hover"]}
                          >
                            <button
                              style={{
                                background: "none",
                                color: "white",
                                cursor: "pointer",
                              }}
                            >
                              <Space>
                                <span
                                  style={{ color: lightMode ? "#000" : "#fff" }}
                                >
                                  {each?.name}
                                </span>
                                <DownOutlined
                                  style={{
                                    color: lightMode ? "#000" : "#fff",
                                    fontSize: "12px",
                                  }}
                                />
                              </Space>
                            </button>
                          </Dropdown>
                        </>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          {/*mobile burger menu */}{" "}
          <div className={`flex align-items-center ${styles.burger_menu}`}>
            {router.pathname === "/portal-ai" ? (
              ""
            ) : (
              <li
                className="d-flex pointer  align-items-center"
                // onClick={() => openCloseToggle("Tools")}
              >
                {lightMode ? (
                  <span
                    style={{ marginTop: "7px" }}
                    onClick={() => dispatch(toggleThemeMode(false))}
                  >
                    {svgSheet2.LightModeMoon}
                  </span>
                ) : (
                  <span
                    style={{ marginTop: "7px" }}
                    onClick={() => dispatch(toggleThemeMode(true))}
                  >
                    {svgSheet2.DarkModeSun}
                  </span>
                )}
              </li>
            )}
            {
              <span className={styles.search_mobile}>
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => openCloseToggle("SEARCH")}
                  className="w-20 h-20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
            }
            {toggleStatus === "MOBILE" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => openCloseToggle("NONE")}
                className="w-20 h-20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <div
                className="w-20 h-20 "
                onClick={() => openCloseToggle("MOBILE")}
              >
                {svgSheet.burgerIcon}
              </div>
            )}
          </div>
          {/*login btn web view */}
          {!showNavEle && (
            <div className={styles.only_PC_view}>
              <div className="d-flex align-items-center ">
                {router.pathname.includes("/portal-ai") ? (
                  ""
                ) : (
                  <div>
                    {lightMode ? (
                      <span
                        style={{ marginTop: "7px" }}
                        onClick={() => dispatch(toggleThemeMode(false))}
                      >
                        {svgSheet2.LightModeMoon}
                      </span>
                    ) : (
                      <span
                        style={{ marginTop: "7px" }}
                        onClick={() => dispatch(toggleThemeMode(true))}
                      >
                        {svgSheet2.DarkModeSun}
                      </span>
                    )}
                  </div>
                )}
                {auth?.userData?.access_token ? (
                  <Dropdown
                    overlay={menu}
                    trigger={["click"]}
                    placement="bottomRight"
                    overlayClassName="border-radius-logout"
                    className=""
                  >
                    {auth?.userData?.user?.profile_pic ? (
                      <Image
                        width={45}
                        height={45}
                        onLoad={() => auth.userData.user.profile_pic}
                        src={auth.userData.user.profile_pic}
                        className=" h-45 w-45 br-50 d-flex pointer ml-15"
                      />
                    ) : (
                      <div className="avatar-img h-45 w-45 br-50 d-flex pointer ml-15"></div>
                    )}
                  </Dropdown>
                ) : (
                  <div
                    onClick={() => dispatch(setToggleForm("login"))}
                    style={{ width: "76px", height: "35px" }}
                    className="btn-bg-primary text-white content-center br-5 pointer ml-15"
                  >
                    Login
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        <ProductToggleCard
          authStatus={auth.userData?.access_token}
          lightMode={lightMode}
          productsToggle={toggleStatus}
          setproductsToggle={setToggleStatus}
          setPopupStatus={setPopupStatus}
        />
        <ToolsTogglecard
          finGradCourse={finGradCourse}
          authStatus={auth.userData?.access_token}
          lightMode={lightMode}
          toolsToggle={toggleStatus}
          setToolsToggle={setToggleStatus}
          setPopupStatus={setPopupStatus}
        />
        <MobileSideBar
          finGradCourse={finGradCourse}
          authStatus={auth.userData}
          lightMode={lightMode}
          mobileToggle={toggleStatus}
          setMobileToggle={setToggleStatus}
          // setToggleForm={setToggleForm}
          userLogout={userLogout}
          fingradAccessStatus={fingradAccessStatus}
        />
        <MobileSearch
          lightMode={lightMode}
          searchResultDiv={searchResultDiv}
          inputData={inputData}
          setinputData={setinputData}
          mobileSearchToggle={toggleStatus}
          setMobileSearchToggle={setToggleStatus}
          getResults={getResults}
          setMobileSearchDrop={setMobileSearchDrop}
          MobileSearchDrop={MobileSearchDrop}
        />
      </div>

      {/* <NavBarmenu setMobileToggle={setToggleStatus} /> */}
      {selectPopup(PopupStatus)}
    </div>
  );
}

export default NavBarv2;
