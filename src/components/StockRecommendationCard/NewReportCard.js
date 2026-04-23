import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThemeMode } from "../../redux/reducers/ThemeSlice";
import svgSheet from "../../assets/svg/svgSheet";
import { redGreenColorPicker } from "../../utilityFn/redGreenColor";
import stockIcon from "../../assets/images/portalFavICon.png";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import numberWithCommas from "../../utilityFn/numberWithCommas";
import { Popover } from "antd";
import PremiumPlusBlurLayout from "../PremiumPlusBlurLayout";
import StockReportPlusDark from "../../assets/images/premiumBlur/dark_web.webp";
import StockReportPlusLight from "../../assets/images/premiumBlur/light_web.webp";
import { authStore } from "../../redux/reducers/authSlice";
import commaWihNumber from "../../utilityFn/commaWithNumber";
import PremiumBlurLayout from "../PremiumBlurLayout";
import PremiumRedirectModal from "../PremiumRedirectModal";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";
import svgSheet6 from "../../assets/svg/svgSheet6";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";

function NewReportCard({ data }) {
  const { lightMode } = useSelector(getThemeMode);
  const [srcImage, setsrcImage] = useState();
  const [premiumModal, setPremiumModal] = useState(false);
  const dispatch = useDispatch();
  const checkTrialStatus = useCheckTrialStatus();
  const router = useRouter();
  const auth = useSelector(authStore);
  useEffect(() => {
    setsrcImage(
      `https://tradebrains-portal-s3.s3.ap-south-1.amazonaws.com/NIFTY50/${data?.symbol}.png`
    );
  }, [data?.symbol]);

  const potentialUpside = Number(data?.target - data?.cmp);
  const difference = Number((potentialUpside / data?.cmp) * 100).toFixed(2);

  const profit = Number(data?.target - data?.price_at_rec);
  const profitBooked = Number((profit / data?.price_at_rec) * 100).toFixed(2);

  const profitBook_new = Number(data?.reco_update_price - data?.price_at_rec);
  const profitBooked_new = Number(
    (profitBook_new / data?.price_at_rec) * 100
  ).toFixed(2);

  const formattedDate = moment(data?.date).format("DD-MM-YYYY");
  const encodeId = window.btoa(data?.report_id);
  const handleViewReportClick = () => {
    if (auth?.userData?.access_token) {
      if (
        (auth?.userData?.user?.plan?.planId?.includes("plus") &&
          data?.report_type === "Premium") ||
        data?.report_type === "Free"
      ) {
        if (data?.report_id && data?.report_id != 0) {
          // router.push(`/stock-report/${encodeId}`);
          const url = `/stock-report/${encodeId}`;
          window.open(url, "_blank");
        } else {
          window.location.href = data?.file;
        }
      } else {
      }
    } else {
      dispatch(setToggleForm("login"));
      // setPremiumModal(true);
    }
  };

  const score = data?.score || 0;
  const fillPercentage = (score / 5) * 100;

  const croreFormattedNumber = numberWithCommas(data?.MCAP);

  const toolTipData = [
    {
      title: "Market Cap :",
      value: croreFormattedNumber,
      unit: "Cr",
    },
    {
      title: "PE : ",
      value: data?.TTMPE,
    },
    {
      title: "ROE : ",
      value: data?.ROE,
      unit: "%",
    },
    {
      title: "ROCE : ",
      value: data?.ROCE,
      unit: "%",
    },
    {
      title: "Total Debt:",
      value: data?.total_debt_ttm,
      unit: "Cr",
    },
    {
      title: "PEG TTM:",
      value: data?.peg_ratio_ttm,
    },
  ];

  const items = (
    <div
      className={` ${lightMode ? "text-black" : "text-white bg-dark-gray"}`}
      style={{ width: "450px" }}
    >
      <p className="fs-14-12 d-flex justify-content-center align-items-center">
        <span>Smart Score by</span>{" "}
        <span className="fw-700 ml-5"> Trade Brains Portal</span>
      </p>
      <div className="w-100">
        <div className="portal-score-wrap">
          {toolTipData.map((item) => {
            return (
              <div
                className={`table-shadow br-10 w-100  ${
                  lightMode ? "bg-gray" : "bg-dark"
                }`}
              >
                <div className="d-flex justify-content-center align-items-center h-40px fw-400">
                  <span className="d-flex justify-content-start align-items-start">
                    {item?.title}
                  </span>
                  <span className={`ml-5 ff-lato fw-500 text-btn-dark `}>
                    {commaWihNumber(item?.value)} {item?.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const truncateText = (text, limit) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  return (
    <>
      {data?.report_type === "Premium" &&
      !auth?.userData?.user?.plan?.sname.includes("+") ? (
        <PremiumPlusBlurLayout
          bgImg={lightMode ? StockReportPlusLight : StockReportPlusDark}
          top="50%"
          headerText="Premium+ Research Reports"
          height={170}
          stockReport={true}
        />
      ) : (
        <div
          className={`table-shadow px-25-10 d-felx d-flex-col mb-10 br-10 h-165px ${
            lightMode ? "bg-gray" : "bg-darkmode-black"
          }`}
        >
          <div className="d-flex justify-content-between align-items-center mt-10 pt-10px">
            <div className="mr-5 d-flex justify-content-center align-items-center mb-10">
              <Image
                src={srcImage}
                onError={(error) => {
                  setsrcImage(stockIcon);
                }}
                width={55}
                height={50}
                className="h-50px-25px w-50px-25px br-5 mr-20 bg-white"
                alt="logo"
              />
              <div>
                <div className="d-flex align-items-center">
                  <div>
                    <Link href={`/stocks/${data?.symbol}`}>
                      <div className="fs-20-16 mb-5 ">
                        <span
                          title={data.comp_name}
                          className="testing-numbers"
                        >
                          {truncateText(data?.comp_name, 25)}
                        </span>
                        <span>
                          <div
                            className={`ml-10 single-star-rate ${
                              lightMode ? "bg-gray" : ""
                            }`}
                          >
                            <div className="star-wrapper">
                              <div
                                className={`${
                                  lightMode
                                    ? "star-background-light"
                                    : "star-background"
                                }`}
                              >
                                ★
                              </div>
                              <div
                                className="star-foreground"
                                style={{ width: `${fillPercentage}%` }}
                              >
                                ★
                              </div>
                            </div>
                          </div>
                        </span>
                        <span className="fs-16-14 fw-600 ml-5 ff-lato">
                          {data?.score?.toFixed(2)}
                        </span>
                        <span className="ml-5 mt-5">
                          <Popover
                            overlayClassName="Nopadding-pover"
                            color={lightMode ? "white" : "#3B3F4F"}
                            className={`nameis fs-s-20 `}
                            placement="bottom"
                            content={items}
                          >
                            {lightMode
                              ? svgSheet6.tooltipRatingIconLight
                              : svgSheet6.tooltipRatingIcon}
                          </Popover>
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div onClick={handleViewReportClick} className="pointer">
                    {(data?.target_reached === true ||
                      data.reco_update_type === "Book Profit") && (
                      <span className="ml-10">{svgSheet6?.redirectIcon}</span>
                    )}
                  </div>
                </div>
                <div className="fs-14-12 ff-lato">
                  <span className="ff-lato">{formattedDate}</span> |{" "}
                  <span className="fw-500 ff-lato">
                    ₹ {data?.cmp}{" "}
                    <span
                      style={{
                        color: redGreenColorPicker(data?.per_change, lightMode),
                      }}
                    >
                      {typeof data?.per_change === "number" && (
                        <>
                          ({data.per_change > 0 && "+"}
                          {data.per_change.toFixed(2)}%)
                        </>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="fs-14-12 fw-600">
              {data?.target_reached === true && (
                <div style={{ marginTop: "-30px" }}>
                  <span> {svgSheet6?.achievedIcon}</span>
                  <span
                    style={{
                      color: lightMode ? "#109633" : "#00FF57",
                    }}
                    className="ml-5 fs-16-14"
                  >
                    Target Achieved
                  </span>
                </div>
              )}
              {data.reco_update_type === "Book Profit" &&
                data?.target_reached !== true && (
                  <div style={{ marginTop: "-30px" }}>
                    <span> {svgSheet6?.achievedIcon}</span>
                    <span
                      style={{
                        color: lightMode ? "#109633" : "#00FF57",
                      }}
                      className="ml-5 fs-16-14"
                    >
                      Book Profits
                    </span>
                  </div>
                )}
              {data?.target_reached !== true &&
                data.reco_update_type !== "Book Profit" && (
                  <div
                    className={`br-20 d-flex justify-content-center align-items-center h-40px ${
                      data?.role === "buy" &&
                      (lightMode
                        ? "bg-buy-report-light color-text-buy-light"
                        : "bg-buy-report text-dark-green")
                    } ${
                      data?.role === "sell" &&
                      (lightMode
                        ? "bg-sell-report-light clr-red"
                        : "bg-sell-report clr-red")
                    } ${
                      data?.role === "hold" &&
                      (lightMode
                        ? "bg-hold-report-light clr-text-yellow"
                        : "bg-hold-report clr-text-yellow")
                    }`}
                    style={{ width: "80px" }}
                  >
                    {data?.role.toUpperCase()}
                  </div>
                )}
            </div>
          </div>
          <div className="d-flex justify-content-between  mb-20 w-100 mt-10 w-100">
            <div className="d-flex justify-content-start align-items-start flex-col ml-10 w-25">
              <div className="stock-recommendation-bottom-text-heading d-flex justify-content-center align-items-center fw-400 opacity7 mb-5">
                <span>Target: </span>
              </div>
              <div className="stock-recommendation-bottom-text fw-500 ff-lato">
                ₹ {numberWithCommas(data?.target)}{" "}
              </div>
            </div>
            <div className="mr-5 d-flex justify-content-start align-items-center w-25">
              <div className="">
                <div className="stock-recommendation-bottom-text-heading fw-400 opacity7 mb-5">
                  P@Reco:
                </div>
                <div className="stock-recommendation-bottom-text fw-500">
                  {commaWihNumber(data?.price_at_rec)}
                </div>
              </div>
            </div>
            {data?.reco_update_type === "Book Profit" &&
              data?.target_reached !== true && (
                <div className="mr-5 d-flex justify-content-start align-items-center w-25">
                  <div className="">
                    <div className="stock-recommendation-bottom-text-heading fw-400 opacity7 mb-5">
                      Price Booked:
                    </div>
                    <div className="stock-recommendation-bottom-text fw-500">
                      {commaWihNumber(data?.reco_update_price)}
                    </div>
                  </div>
                </div>
              )}
            <div className="mr-5 d-flex justify-content-start align-items-center w-25">
              <div className="">
                <div className="stock-recommendation-bottom-text-heading fw-400 opacity7 mb-5">
                  {data?.target_reached === true ||
                  data.reco_update_type === "Book Profit" ? (
                    <div>Profit Booked:</div>
                  ) : (
                    "Upside/Downside"
                  )}
                </div>
                {data?.target_reached === true && (
                  <div
                    className="stock-recommendation-bottom-text ff-lato fw-500"
                    style={{
                      color: redGreenColorPicker(profitBooked, lightMode),
                    }}
                  >
                    {profitBooked > 0 && "+"}
                    {profitBooked}%
                  </div>
                )}
                {data.reco_update_type === "Book Profit" &&
                  data?.target_reached !== true && (
                    <div
                      className="stock-recommendation-bottom-text ff-lato fw-500"
                      style={{
                        color: redGreenColorPicker(profitBooked_new, lightMode),
                      }}
                    >
                      {profitBooked_new > 0 && "+"}
                      {profitBooked_new}%
                    </div>
                  )}

                {data?.target_reached !== true &&
                  data.reco_update_type !== "Book Profit" && (
                    <div
                      className="stock-recommendation-bottom-text ff-lato fw-500"
                      style={{
                        color: redGreenColorPicker(difference, lightMode),
                      }}
                    >
                      {difference > 0 && "+"}
                      {difference}%
                    </div>
                  )}
              </div>
            </div>
            {data?.target_reached === true ||
            data.reco_update_type === "Book Profit" ? (
              <div className="mr-5 d-flex justify-content-start align-items-center">
                <div className="">
                  <div className="stock-recommendation-bottom-text-heading fw-400 opacity7 mb-5">
                    Rating
                  </div>
                  <div
                    className={`br-20 d-flex justify-content-center align-items-center ${
                      data?.role === "buy" &&
                      (lightMode ? " color-text-buy-light" : " text-dark-green")
                    } ${data?.role === "sell" && " clr-red"} ${
                      data?.role === "hold" && "clr-text-yellow"
                    }`}
                  >
                    {data?.role.charAt(0).toUpperCase() + data?.role.slice(1)}
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex justify-content-end align-items-center gap-10px">
                <div
                  className={`d-flex justify-content-center align-items-center pointer fs-14-12`}
                  style={{ width: "110px" }}
                  onClick={handleViewReportClick}
                  suppressHydrationWarning
                >
                  <span className="text-btn-dark fw-600"> View Report </span>
                  <span className="ml-5">{svgSheet6?.arrowRightReport}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* <PremiumRedirectModal
        visible={premiumModal}
        setVisible={setPremiumModal}
        loginRediect={true}
        modalPlan="/"
        reports={true}
        encodeId={encodeId}
      /> */}

      <PremiumTrialModal
        visible={premiumModal}
        setVisible={setPremiumModal}
        isTrialOver={checkTrialStatus()}
      />
    </>
  );
}

export default NewReportCard;
