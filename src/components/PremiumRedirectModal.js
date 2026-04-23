import React from "react";
import { Modal } from "antd";
import bgImgDark from "../assets/images/bg/premiumBg.png";
import spaceMainImg from "../assets/images/premiumSpaceman.png";
import svgSheet from "../assets/svg/svgSheet";
import svgSheet3 from "../assets/svg/svgSheet3";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { getThemeMode } from "../redux/reducers/ThemeSlice";
import { plans } from "../utilityFn/planData";
import Image from "next/image";
import { setToggleForm } from "../redux/reducers/AuthToggleSlice";

function PremiumRedirectModal({
  visible,
  setVisible,
  modalPlan,
  loginRediect = false,
  redirectState,
  reports,
  encodeId,
}) {
  const { lightMode } = useSelector(getThemeMode);
  const navigate = useRouter();
  const dispatch = useDispatch();
  const planNames = ["Sharks +", "Whales +", "Unlimited +"];
  var redirect_url = "";
  const cardData = {
    screener: {
      planHead: "Screener Features",
      planData: [
        // plans.basic.screener,
        plans["3months_plus"].screener,
        plans["12months"].screener,
        "Unlimited",
      ],
      footerText: "Filters",
    },
    customScreener: {
      planHead: "Custom Screener Features",
      planData: [
        // plans.basic.customScreener,
        plans["3months_plus"].customScreener,
        plans["12months"].customScreener,
        "Unlimited",
      ],
      footerText: "Queries",
    },
    premiumSupport: {
      planHead: "Premium Support",
      // planData: [
      //   // plans.basic.portfolioAnalsis,
      //   // plans["3months_plus"].portfolioAnalsis,
      //   plans["12months"].portfolioAnalsis,
      //   plans["year"].portfolioAnalsis,
      //   plans["lifetime"].portfolioAnalsis,
      // ],
      footerText: "Premium Support",
    },
    portFolio: {
      planHead: "Portfolio Features",
      planData: [
        plans["3months_plus"].portfolioAnalsis,
        plans["year"].portfolioAnalsis,
        plans["lifetime"].portfolioAnalsis,
      ],
      footerText: "Portfolios",
    },
    watchlist: {
      planHead: "Watchlist Features",
      planData: ["Unlimited", "Unlimited", "Unlimited"],
      footerText: "Watchlists",
    },
    stockCompare: {
      planHead: "Stock Compare Features",
      planData: [
        plans["3months_plus"].stockCompare,
        plans["year"].stockCompare,
        plans["lifetime"].stockCompare,
      ],
      footerText: "Stocks",
    },
    excel: {
      planHead: "Export to Excel",
      planData: [
        plans["3months_plus"].excel,
        plans["12months"].excel,
        "Unlimited",
      ],

      footerText: "Per Month",
    },
  };
  if (navigate?.asPath != undefined && navigate?.query) {
    redirect_url = navigate?.asPath;
  } else {
    redirect_url = navigate?.pathname;
  }

  return (
    <Modal
      centered
      // closable={true}
      width="800px"
      bodyStyle={{ minHeight: "400px", borderRadius: "10px" }}
      open={visible}
      footer={null}
      onCancel={() => {
        setVisible(false);
      }}
      className="relative  p-20 "
      wrapClassName={"filter-modal premium-mod"}
    >
      <Image
        className="absolute w-100 h-100 fit-cover pb-10 "
        src={bgImgDark}
        alt="bg"
        priority
      />
      <div
        style={{ marginInline: "7%", paddingTop: "3%" }}
        className=" h-100 d-flex flex-col justify-content-center"
      >
        <div className="wh-80-120">
          {loginRediect ? svgSheet3.LockIog : svgSheet3.premiumCardIcon}
        </div>
        <h1 className="fs-50-35 fw-700 my-10 lh-50">
          {loginRediect ? "Login to Portal" : "Get Premium +"}
        </h1>
        <p className="fs-16-14 fw-400">
          {loginRediect
            ? "To get started with detailed analysis & insights."
            : "To get detailed analysis & insights, check our plans & Features"}
        </p>
        {modalPlan && (
          <div>
            {cardData[modalPlan]?.planHead === "Premium Support" ? (
              <p className="fw-600 fs-20-16 mb-10 ">
                To access Premium Support,  Purchase{" "}
                <span className="gradient-text-blue ">Whales +</span> or{" "}
                <span className="gradient-text-blue ">Lifetime + Plan</span>
              </p>
            ) : (
              <p className="fw-600 fs-24-16 mb-10">
                {cardData[modalPlan]?.planHead === "Premium Support"}
              </p>
            )}
            <div style={{ gap: "15px" }} className="d-flex flex-wrap">
              {cardData[modalPlan]?.planData?.map((num, i) => (
                <>
                  <div
                    key={i}
                    className={`p-15 mt-10 h-120 ${
                      planNames[i] === "Unlimited +" ? "w-100-30" : "w-47-30"
                    } d-flex flex-col justify-content-between card-drop-dark-shadow`}
                  >
                    {planNames[i] === "Whales +" && (
                      <div
                        className={`absolute mt-20  d-flex justify-content-center text-white free-tag-research-bg popular-icon-card`}
                      >
                        <p
                          style={{ padding: "3px" }}
                          className="mb-0 fs-12 fw-500 text-white my-5 d-flex "
                        >
                          Most Popular Plan
                        </p>
                      </div>
                    )}
                    <p
                      className={`fw-700 text-grad-secondary ${
                        planNames[i] === "Whales +" && "mt-10"
                      } fs-25-20 lh-26 mb-0`}
                    >
                      {planNames[i]}
                    </p>
                    <div>
                      <p className="fs-s-20 fw-700 lh-24 mb-0 mt-10">{num}</p>
                      <p className="fs-14-14 mb-0">
                        {cardData[modalPlan]?.footerText}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        )}
        {loginRediect ? (
          <div
            style={{ zIndex: 100, margin: "auto" }}
            onClick={() => dispatch(setToggleForm("login"))}
          >
            <button
              style={{ width: "260px", margin: "10% 0", zIndex: 100 }}
              className="h-45 btn-bg-primary text-white br-3 fw-600 fs-16-14"
            >
              {reports ? "Click here to View" : "Click here to Login"}
            </button>
          </div>
        ) : (
          <Link
            href={"/getpremium"}
            style={{
              zIndex: 100,
              margin:
                cardData[modalPlan]?.planHead === "Premium Support"
                  ? "0"
                  : "auto",
            }}
          >
            <button
              onClick={() => setVisible(false)}
              style={{ width: "260px", margin: "15% 0", zIndex: 100 }}
              className="h-45 free-tag-research  text-white br-3 fw-600 fs-16-14"
            >
              View Pricing
            </button>
          </Link>
        )}
      </div>
      <Image
        // style={{ top: -130, right: 20,width:'120px',height:'120px' }}
        className=" modal-spaceman"
        src={spaceMainImg}
        alt="img"
      />
    </Modal>
  );
}

export default PremiumRedirectModal;
