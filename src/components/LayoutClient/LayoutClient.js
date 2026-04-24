import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  setToggleForm,
  toggleStore,
} from "../../redux/reducers/AuthToggleSlice";
import {
  getWatchListStore,
  resetWatchlistArr,
} from "../../redux/reducers/watchListSlice";
import { authStore } from "../../redux/reducers/authSlice";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import DotLoader from "../spinners/DotLoader";
import EventTopBanner from "../EventTopBanner";
import NavBarv2 from "../Navbar/NavBarv2";
import PasswordPopup from "../home/components/PasswordPopup";
import Footer from "../Footer";
import FeedbackModal from "../Navbar/FeedbackModal";
import MarketModal from "../Navbar/MarketModal";
import useGetFetch from "../../hooks/useGetFetch";
import StockEndpoints from "../../pages/api/endPoints";
import {
  eSignMonitorAPI,
  eSignStatusCheck,
  fetchLatestPurchaseTime,
  getPredefineCompareStocks,
} from "../../pages/api/fetchClient";
import Ticker from "../Ticker";
import AuthModal2 from "../AuthModal2/AuthModal2";
import StatusCheckModal from "../EsignStatusCheck/StatusCheckModal";
import { decryptData } from "../../utilityFn/dataEncryption";
import MobileNavBar from "../Navbar/MobileNavBar";
import useWindowWidth from "../../utilityFn/getWindowWidth";
function LayoutClient({ children }) {
  const router = useRouter();
  const windowWidth = useWindowWidth();
  const dispatch = useDispatch();

  const [MobileSearchDrop, setMobileSearchDrop] = useState(false);
  const { lightMode } = useSelector(getThemeMode);
  const [FeedbackDate, setFeedbackDate] = useState(true);
  const [ComparestockData, setComparestockData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visibleMarket, setvisibleMarket] = useState(true);
  const auth = useSelector(authStore);
  const { googleSignIn } = useSelector(toggleStore);
  const watchListStore = useSelector(getWatchListStore);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Esign Check Modal
  const [esignCheck, setEsignCheck] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [termsSigned, setTermsSigned] = useState(false);

  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [latestPurchaseTime, setLatestPurchaseTime] = useState(null);

  useEffect(() => {
    // Push Notification

    const fetchTime = async () => {
      const res = await fetchLatestPurchaseTime();
      setLatestPurchaseTime(res?.data?.time_diff);
    };

    fetchTime();

    // Push Notification

    const feedSubmitDate = dayjs(localStorage.getItem("FeedbackTime"));
    const currentDate = new Date();
    if (feedSubmitDate.diff(currentDate, "hours") > -72) {
      setFeedbackDate(false);
    }
    getPredefineCompareStocks().then((res) => {
      setComparestockData(res);
    });
  }, []);

  useEffect(() => {
    if (watchListStore?.watchListData?.length === undefined) {
      dispatch(resetWatchlistArr());
    }
  }, [watchListStore?.watchListData]);

  const { apiData: stckGlossaryLists } = useGetFetch(
    StockEndpoints.stockGlossaryList,
  );

  const letterOption = stckGlossaryLists ? Object.keys(stckGlossaryLists) : [];
  const [selectLetter, setSelectedLetter] = useState("#");

  useEffect(() => {
    if (letterOption?.length > 0) {
      setSelectedLetter(letterOption[0]);
    }
  }, [stckGlossaryLists]);

  const [visible, setvisible] = useState();

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, []);

  // *********************

  // Call status check api to open/close modal
  // Check if user has - 1. pan verified, 2. esign_status = pending 3. esign_status = completed, to show view accordingly

  const convertToJSObject = (str) => {
    const jsonCompatible = str
      .replace(/'/g, '"') // replace single quotes with double quotes
      .replace(/\bFalse\b/g, "false") // convert False to false
      .replace(/\bTrue\b/g, "true") // convert True to true
      .replace(/\bNone\b/g, "null"); // convert None to null

    try {
      return JSON.parse(jsonCompatible);
    } catch (err) {
      console.error("Failed to parse string as JSON:", err.message);
      return null;
    }
  };

  const checkEsignProgress = async () => {
    const planId = auth?.userData?.user?.plan?.planId;
    const joinDate = new Date(auth?.userData?.user?.premiumPurchasedDate);
    const cutoffDate = new Date("2025-06-30");

    if (!planId || !planId.includes("plus")) return;

    // Only plus users beyond this point

    try {
      // Step 1: Check PAN + initial eSign status
      const statusRes = await eSignStatusCheck(planId);
      const decryptedResponse = decryptData(
        statusRes?.data?.data,
        process.env.NEXT_PUBLIC_PORTAL_AUTH_KEY,
      );
      const parsed = convertToJSObject(decryptedResponse);

      const { pan, esign_status, subscriptions } = parsed;

      if (
        esign_status === "completed" &&
        router.asPath === "/dashboard?signed=true"
      ) {
        setTermsSigned(true);
        setIsModalOpen(true);
        // console.log("item_remove");
        localStorage.removeItem("esign_pending");
        return;
      }

      // console.log("joinDate > cutoffDate", joinDate > cutoffDate);

      // New plus user
      if (
        (!subscriptions || subscriptions?.length === 0) &&
        joinDate > cutoffDate
      )
        return;

      // Step 2: Check actual sign monitor status
      const monitorRes = await eSignMonitorAPI();

      const monitorItem = monitorRes?.data?.find(
        (item) => item?.plan_id === planId,
      );

      const monitorStatus = monitorItem?.status;

      // Step 3: Evaluate based on 3 conditions
      let tempStatus = "";

      const isPanVerified = !!pan;
      const isSigned = monitorStatus === "completed";

      if (!isPanVerified && !isSigned) {
        tempStatus = "pan_unverified_unsigned"; // Condition 1
      } else if (isPanVerified && !isSigned) {
        tempStatus = "pan_verified_unsigned"; // Condition 2
      } else if (!isPanVerified && isSigned) {
        tempStatus = "pan_unverified_signed"; // Condition 3
      } else {
        tempStatus = "signed_and_verified";
      }

      // console.log("tempcheck_whales", tempStatus);
      setEsignCheck(tempStatus);
      setIsModalOpen(tempStatus !== "signed_and_verified");
    } catch (error) {
      console.error("Error in checkEsignProgress:", error);
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
  };
  const onClosePushNotify = () => {
    setIsNotifyOpen(false);
  };

  useEffect(() => {
    checkEsignProgress();

    if (
      !auth?.userData?.access_token &&
      !auth?.userData?.user?.phone_verified
    ) {
      dispatch(setToggleForm(null));
    } else {
      dispatch(setToggleForm("verify_phone"));
    }

    if (auth?.userData?.user?.phone_verified) {
      dispatch(setToggleForm(null));
    }

    // dispatch(setToggleForm("verify_phone"));
  }, [auth, router]);

  return (
    <div className="relative">
      <>
        <div style={{ zIndex: 999 }} className="p-fixed w-100">
          {auth?.userData?.user?.plan?.sname === "Free" ||
          !auth?.userData?.access_token ||
          Object.keys(auth?.userData)?.length === 0 ? (
            router.pathname === "/" ? null : (
              <EventTopBanner />
            )
          ) : null}
          {router.pathname !== "/" && <Ticker lightMode={lightMode} />}
          <NavBarv2
            MobileSearchDrop={MobileSearchDrop}
            setMobileSearchDrop={setMobileSearchDrop}
            setIsMobileNavOpen={setIsMobileNavOpen}
          />
        </div>
        {/* {FeedbackDate && (
          <div
            onClick={() => setvisible((state) => !state)}
            className={`${
              visible ? "right-7-25" : "right-25"
            } absolute pointer right-25-7-25 feedback-banner`}
          >
            <p className={`mb-0 fw-600 fs-s-12`}>Feedback</p>
          </div>
        )} */}
        <div className={`${lightMode ? "bg-white" : "invert-text"}`}>
          {Object.keys(auth?.userData)?.length !== 0 && googleSignIn && (
            <PasswordPopup />
          )}
          {children}
          {loader ? <DotLoader /> : null}
          {/* {router.pathname.includes("/portal-ai") ? (<></>) : (!isMobileNavOpen && !isNotifyOpen && <DownloadButton />) } */}
          {/* <DownloadApp /> */}
          {router.pathname.includes("/portal-ai") ? (
            <></>
          ) : (
            <Footer ComparestockData={ComparestockData} lightMode={lightMode} />
          )}
        </div>
      </>

      <FeedbackModal
        setFeedbackDate={setFeedbackDate}
        lightMode={lightMode}
        setvisible={setvisible}
        visible={visible}
      />

      <AuthModal2 lightMode={lightMode} />
      <StatusCheckModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onClose={onClose}
        esignCheck={esignCheck}
        termsSigned={termsSigned}
      />
      <MarketModal
        lightMode={lightMode}
        setvisible={setvisibleMarket}
        visible={visibleMarket}
      />
      {router.asPath === "/portal-ai/portal-ai-chat" ||
      router.asPath === "/portal-ai" ||
      router.asPath === "/portal-ai-usage-cost" ? (
        <></>
      ) : (
        !isNotifyOpen && windowWidth <= 600 && ""
      )}
    </div>
  );
}

export default LayoutClient;
