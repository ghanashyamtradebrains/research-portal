import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import svgSheet from "../assets/svg/svgSheet";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import { authStore } from "../redux/reducers/authSlice";
import { useRouter } from "next/router";
import { setToggleForm } from "../redux/reducers/AuthToggleSlice";
function PremiumPlusBlurLayout({
  bgImg,
  bgImgStocks,
  top,
  isCover,
  stocks,
  allStocks,
  stockheatmap,
  height = "900px",
  headerText = "Premium Research Reports",

  margintop = "0px",
  disable = false,
  images = false,
  stockReport,
  dashboard,
}) {
  const { lightMode } = useSelector(getThemeMode);
  const UserAuth = useSelector(authStore);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className={`relative mb-10 ${lightMode ? "table-shadow" : ""}`}
      style={{
        height: stockheatmap ? "260px" : height,
        width: "100%",
        marginTop: margintop,
      }}
    >
      {!images && (
        <Image
          src={allStocks ? bgImgStocks : bgImg}
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
          <div
            className="only-PC-view"
            style={{ width: "90px", height: "70px" }}
          >
            {svgSheet?.premiumIconPLuss}
          </div>
          <div
            className="only-mobile-view"
            style={{ width: "35px", height: "45px" }}
          >
            {svgSheet?.premiumPLusMobile}
          </div>
          <span
            className={`fs-16-14 fw-700 text-align-center ${
              stocks ? "" : "mb-10"
            }  ${lightMode ? "text-black" : "text-white"}`}
          >
            {headerText}
          </span>
          {stocks && (
            <span
              className={`fs-14-12 fw-500 mb-10 text-align-center ${
                lightMode ? "text-black" : "text-white"
              }`}
            >
              See Detailed Analysis & Insights
            </span>
          )}
          {Object.keys(UserAuth?.userData).length === 0 ? (
            <div
              onClick={
                () => dispatch(setToggleForm("login"))
                // router.push(`/login?redirect_url=${router.asPath}`)
              }
            >
              <button
                style={{
                  width: stocks ? "150px" : "180px",
                  height: stocks ? "30px" : "35px",
                }}
                className="free-tag text-white  fw-600 text-white fs-12 br-5"
              >
                Subscribe Now
              </button>
            </div>
          ) : (
            <Link href={`/getpremium`}>
              <button
                style={{ width: "120px", height: "42px" }}
                className="free-tag text-white  fw-600 fs-12 br-5"
              >
                Subscribe Now
              </button>
            </Link>
          )}
        </div>
      ) : dashboard ? (
        <div
          className="absolute d-flex flex-col div-items-center w-100 "
          style={{
            zIndex: 10,
            left: "50%",
            top: top,
            transform: "translate(-50%,-50%)",
          }}
        >
          <div style={{ width: "50px", height: "25px" }}>
            {svgSheet?.premiumPLusMobile}
          </div>

          <span
            className={`fs-12 fw-500 text-align-center w-100 mb-5 ${
              lightMode ? "text-black" : "text-white"
            }`}
            style={{ marginTop: "-5px" }}
          >
            {headerText}
          </span>
          {Object.keys(UserAuth?.userData).length === 0 ? (
            <div
              onClick={
                () => dispatch(setToggleForm("login"))
                // router.push(`/login?redirect_url=${router.asPath}`)
              }
            >
              <button
                style={{
                  width: "80px",
                  height: "35px",
                }}
                className="free-tag text-white  fw-600 text-white fs-12 br-5"
              >
                Subscribe Now
              </button>
            </div>
          ) : (
            <Link href={`/getpremium`}>
              <button
                style={{ width: "120px", height: "25px" }}
                className="free-tag text-white  fw-600 fs-12 br-5"
              >
                Subscribe Now
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
            {svgSheet.premiumIconPLuss}
          </div>
          <p
            className={`fs-25-20 fw-700 mb-10 text-align-center ${
              lightMode ? "text-black" : "text-white"
            }`}
          >
            {headerText}
          </p>
          {stocks && (
            <span
              className={`fs-14-12 fw-500 mb-20 text-align-center ${
                lightMode ? "text-black" : "text-white"
              }`}
            >
              See Detailed Analysis & Insights
            </span>
          )}
          <Link href={`/getpremium`}>
            <button
              style={{ width: "200px", height: "50px" }}
              className="btn-bg-primary  fw-600 text-white fs-16-14 br-5"
            >
              {"Get Premium +"}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PremiumPlusBlurLayout;
