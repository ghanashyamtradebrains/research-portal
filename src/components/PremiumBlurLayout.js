import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import svgSheet from "../assets/svg/svgSheet";
import svgSheet3 from "../assets/svg/svgSheet3";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import { authStore } from "../redux/reducers/authSlice";
import { useRouter } from "next/router";
import { setToggleForm } from "../redux/reducers/AuthToggleSlice";
function PremiumBlurLayout({
  bgImg,
  bgImgStocks,
  top,
  isCover,
  loggedOut,
  allStocks,
  stockheatmap,
  height = allStocks ? "250px" : "600px",

  headerText = "Unlock all features",

  margintop = "0px",
  disable = false,
  images = false,
  stockReport,
}) {
  const { lightMode } = useSelector(getThemeMode);
  const UserAuth = useSelector(authStore);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div
      className={`relative ${lightMode ? "table-shadow" : ""}`}
      style={{ height: height, width: "100%", marginTop: margintop }}
    >
      {!images && (
        <Image
          src={allStocks || stockheatmap ? bgImgStocks : bgImg}
          className="w-100 h-100 absolute br-5"
          priority
          alt="bg_image"
        />
      )}

      <div
        className={`w-100 h-100 absolute br-5 ${
          allStocks
            ? lightMode
              ? "portal-stocks-light"
              : "portal-stocks-dark"
            : images
            ? lightMode
              ? "portal-score-light"
              : "portal-score-dark"
            : ""
        }`}
      ></div>
      {disable ? (
        ""
      ) : stockReport ? (
        <div
          className="absolute d-flex flex-col div-items-center"
          style={{
            zIndex: 10,
            left: "50%",
            top: top,
            transform: "translate(-50%,-50%)",
          }}
        >
          <div style={{ width: "50px", height: "50px" }}>
            {loggedOut ? svgSheet3.LockIog : svgSheet.premiumIcon}
          </div>
          <p
            className={`fs-16-14 fw-700 mb-5 text-align-center ${
              lightMode ? "text-black" : "text-white"
            }`}
          >
            {headerText}
          </p>
          {!allStocks && (
            <p className="fs-14-12 fw-500 mb-20 text-align-center">
              See Detailed Analysis & Insights
            </p>
          )}
          {Object.keys(UserAuth?.userData).length === 0 && !loggedOut ? (
            <div
              onClick={() =>
                router.push(`/login?redirect_url=${router.asPath}`)
              }
            >
              <button
                style={{ width: "100px", height: "30px" }}
                className="btn-bg-primary  fw-600 text-white fs-12 br-5"
              >
                Login
              </button>
            </div>
          ) : (
            <Link href={`/getpremium`}>
              <button
                style={{ width: "100px", height: "30px" }}
                className="btn-bg-primary  fw-600 text-white fs-12 br-5"
              >
                View Pricing
              </button>
            </Link>
          )}
        </div>
      ) : (
        <div
          className="absolute d-flex flex-col div-items-center"
          style={{
            zIndex: 10,
            left: "50%",
            top: top,
            transform: "translate(-50%,-50%)",
          }}
        >
          <div style={{ width: "70px", height: "70px" }}>
            {allStocks || !stockheatmap
              ? svgSheet.premiumPlusWeb
              : svgSheet.premiumIcon}
          </div>
          <p
            className={`fs-25-20 fw-700 mb-10 text-align-center ${
              lightMode ? "text-black" : "text-white"
            }`}
          >
            {headerText}
          </p>
          {!allStocks && (
            <p
              className={`fs-14-12 fw-500 mb-20 text-align-center ${
                lightMode ? "text-black" : "text-white"
              }`}
            >
              See Detailed Analysis & Insights
            </p>
          )}
          {loggedOut ? (
            <div style={{ zIndex: 100, margin: "auto" }}>
              <button
                style={{ width: "200px", height: "40px" }}
                className="free-tag-research-bg text-white br-3 fw-600 fs-16-14"
                onClick={() => dispatch(setToggleForm("login"))}
              >
                Click here to Login
              </button>
            </div>
          ) : (
            <Link href={`/getpremium`}>
              <button
                style={{ width: "200px", height: "50px" }}
                className={`free-tag-research-bg fw-600 text-white fs-16-14 br-5`}
              >
                {allStocks || stockheatmap ? "Get Premium +" : "View Pricing"}
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default PremiumBlurLayout;
