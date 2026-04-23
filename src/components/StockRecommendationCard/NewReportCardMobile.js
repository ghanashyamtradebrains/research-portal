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
import CustomTooltip from "../ant/CustomTooltip";
import numberWithCommas from "../../utilityFn/numberWithCommas";
import { Popover } from "antd";
import PremiumPlusBlurLayout from "../PremiumPlusBlurLayout";
import StockReportPlusDark from "../../assets/images/premiumBlur/dark_mob.webp";
import StockReportPlusLight from "../../assets/images/premiumBlur/light_mob.webp";
import { authStore } from "../../redux/reducers/authSlice";
import commaWihNumber from "../../utilityFn/commaWithNumber";
import PremiumBlurLayout from "../PremiumBlurLayout";
import PremiumRedirectModal from "../PremiumRedirectModal";
import { setToggleForm } from "../../redux/reducers/AuthToggleSlice";
import svgSheet6 from "../../assets/svg/svgSheet6";
import PremiumTrialModal from "../Popups/PremiumTrialModal";
import useCheckTrialStatus from "../../hooks/useCheckTrialStatus";

function NewReportCardMobile({ data }) {
  const dispatch = useDispatch();
  const { lightMode } = useSelector(getThemeMode);
  const [symbol, setSymbol] = useState(data?.symbol);
  const [srcImage, setsrcImage] = useState();
  const [premiumModal, setPremiumModal] = useState(false);
  const router = useRouter();
  const auth = useSelector(authStore);
  useEffect(() => {
    setsrcImage(
      `https://tradebrains-portal-s3.s3.ap-south-1.amazonaws.com/NIFTY50/${symbol}.png`
    );
  }, [symbol]);

  const potentialUpside = Number(data?.target - data?.cmp);
  const difference = Number((potentialUpside / data?.cmp) * 100).toFixed(2);

  const profit = Number(data?.target - data?.price_at_rec);
  const profitBooked = Number((profit / data?.price_at_rec) * 100).toFixed(2);

  const profitBook_new = Number(data?.reco_update_price - data?.price_at_rec);
  const profitBooked_new = Number(
    (profitBook_new / data?.price_at_rec) * 100
  ).toFixed(2);

  const formattedDate = moment(data?.created_date).format("DD-MM-YYYY");
  const encodeId = window.btoa(data?.report_id);
  const handleViewReportClick = () => {
    if (auth?.userData?.access_token) {
      if (
        (auth?.userData?.user?.plan?.planId?.includes("plus") &&
          data?.report_type === "Premium") ||
        data?.report_type === "Free"
      ) {
        if (data?.report_id && data?.report_id != 0) {
          router.push(`/stock-report/${encodeId}`);
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

  const checkTrialStatus = useCheckTrialStatus();

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
      style={{ width: "300px" }}
    >
      <div className="fs-14-12 d-flex justify-content-center align-items-center mb-5">
        <span>Smart Score by</span>{" "}
        <span className="fw-700 ml-5"> Trade Brains Portal</span>
      </div>
      <div className="w-100">
        <div className="portal-score-wrap-mobile">
          {toolTipData.map((item) => {
            return (
              <div
                className={`table-shadow br-10 w-100  ${
                  lightMode ? "bg-gray" : "bg-dark"
                }`}
              >
                <div className="d-flex justify-content-center align-items-center h-30px fw-400 fs-12">
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
          className={`table-shadow px-25-10 d-felx d-flex-col mb-10 br-10 ${
            lightMode ? "bg-gray" : "bg-darkmode-black"
          }`}
        >
          <div className="d-flex justify-content-between align-items-center mt-10 pt-5px">
            <div className="mr-5 d-flex justify-content-center align-items-center">
              <Image
                src={srcImage}
                onError={(error) => {
                  setsrcImage(stockIcon);
                }}
                width={40}
                height={40}
                className="h-50px-25px w-50px-25px br-5 bg-white"
                alt="logo"
              />
              <div className="">
                <Link href={`/stocks/${symbol}`}>
                  <div className="fs-20-16 mb-5 ml-5 overFlow-text-one">
                    <span title={data.comp_name}>{data.comp_name}</span>
                  </div>
                </Link>
                <div className="ff-lato" style={{ fontSize: "10px" }}>
                  <span className="ml-5">{formattedDate}</span> |{" "}
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
              <div
                className={`br-20 d-flex justify-content-center align-items-center h-30px ${
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
                style={{ width: "60px" }}
              >
                {data?.role.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between  mb-5 w-100  mt-0-15">
            <div className="d-flex justify-content-start align-items-start flex-col ml-10">
              <div className="stock-recommendation-bottom-text-heading d-flex justify-content-center align-items-center fw-400 opacity7 mb-5">
                <span>Target: </span>
              </div>
              <div className="stock-recommendation-bottom-text fw-500 ff-lato">
                ₹ {numberWithCommas(data?.target)}{" "}
              </div>
            </div>
            <div className="mr-5 d-flex justify-content-start align-items-center">
              <div className="">
                <div className="stock-recommendation-bottom-text-heading fw-400 opacity7 mb-5">
                  P@Reco:
                </div>
                <div className="stock-recommendation-bottom-text fw-500">
                  {commaWihNumber(data?.price_at_rec)}
                </div>
              </div>
            </div>
            {data?.reco_update_type === "Book Profit" && (
              <div className="mr-5 d-flex justify-content-start align-items-center">
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
            <div className="">
              <div className="stock-recommendation-bottom-text-heading fw-400 opacity7 mb-5">
                {data?.target_reached === true ||
                data?.reco_update_type === "Book Profit" ? (
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
          <div className="d-flex justify-content-between align-items-center mt-5">
            <div className="d-flex justify-content-center align-items-center">
              <Popover
                overlayClassName="Nopadding-pover"
                color={lightMode ? "white" : "#3B3F4F"}
                className={`nameis fs-12`}
                placement="bottom"
                content={items}
              >
                <span className="fs-12 text-btn-dark fw-600">
                  Smart Score :{" "}
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
                <span className="fs-12 fw-600 ml-5 ff-lato">
                  {data?.score?.toFixed(2)}
                </span>
                <span className="ml-10 mt-5"></span>
              </Popover>
            </div>
            <div className="d-flex justify-content-between align-items-center gap-10px ml-10">
              {data?.file !== "NaN" ? (
                <div className="w-35per">
                  {data?.report_id ? (
                    <div
                      className={`d-flex justify-content-center align-items-center pointer fs-14-12`}
                      style={{ width: "110px" }}
                      onClick={handleViewReportClick}
                    >
                      <span className="text-btn-dark fw-600">
                        {" "}
                        View Report{" "}
                      </span>
                      <span className="ml-5">
                        {svgSheet6?.arrowRightReport}
                      </span>
                    </div>
                  ) : (
                    <a href={data?.file} target="_blank" className="">
                      <div
                        className={`d-flex justify-content-center align-items-center pointer fs-14-12`}
                        style={{ width: "110px" }}
                      >
                        <span className="text-btn-dark fw-600">
                          {" "}
                          View Report{" "}
                        </span>
                        <span className="ml-5">
                          {svgSheet6?.arrowRightReport}
                        </span>
                      </div>
                    </a>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center mb-5">
            {data?.target_reached === true && (
              <div className="d-flex justify-content-center align-items-center fs-12">
                <div className="mt-5">{svgSheet6?.achievedIcon}</div>
                <div
                  style={{ color: lightMode ? "#109633" : "#00FF57" }}
                  className="ml-5"
                >
                  Target Achieved
                </div>
              </div>
            )}
            {data.reco_update_type === "Book Profit" &&
              data?.target_reached !== true && (
                <div className="d-flex justify-content-center align-items-center fs-12">
                  <div className="mt-5">{svgSheet6?.achievedIcon}</div>
                  <div
                    style={{ color: lightMode ? "#109633" : "#00FF57" }}
                    className="ml-5"
                  >
                    Book Profits
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

export default NewReportCardMobile;
