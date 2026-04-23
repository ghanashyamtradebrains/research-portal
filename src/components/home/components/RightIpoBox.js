import { useSelector } from "react-redux";
import LeftIpoBox from "../../LeftIpoBox/LeftIpoBox";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import { authStore } from "../../../redux/reducers/authSlice";
import IpoNavbar from "./IpoNavbar/IpoNavbar";
import ReservationStatus from "../../Ipo/ReservationStatus";
import CompanyDetails from "../../Ipo/CompanyDetails";
import ShareHoldingDetails from "../../Ipo/ShareHoldingDetails";
import Financial from "../../Ipo/Financial";
import Competitor from "../../Ipo/Competitor";
import { useState } from "react";
import TableLoader from "../../spinners/TableLoader";
import ImageBasedAds from "../../AdsComp/AliceBlueImageAds";

function RightIpoBox({
  lightMode,
  apiData,
  subscriptionData,
  companyDetails,
  shareholdingData,
  OfferDetailsData,
  financialData,
  switchData,
  handleShowMore,
  riskKeys,
  tableHeaders,
  riskValues,
  totalWordsLength,
  displayCount,
  showMore,
}) {
  const windowWidth = useWindowWidth();
  const UserAuth = useSelector(authStore);
  const scrollToHistory = () => {
    const element = document.getElementById("Peer");
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 180;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  const truncateText = (text, wordLimit = 100) => {
    const words = text?.split(" ");
    if (words?.length > wordLimit) {
      return {
        truncatedText: words.slice(0, wordLimit).join(" ") + "...",
        isTruncated: true,
      };
    }
    return {
      truncatedText: text,
      isTruncated: false,
    };
  };

  const { truncatedText, isTruncated } = truncateText(
    apiData?.summary_data?.company_data
  );

  const [showFullText, setShowFullText] = useState(false);

  const handleReadMoreClick = () => {
    scrollToHistory();
  };

  return (
    <div className="w-75-100p ">
      <div className="stock_navbar only-PC-view">
        <IpoNavbar index={true} lightMode={lightMode} />
      </div>
      <div
        style={{
          width: "100%",
          backgroundColor:
            windowWidth < 600 ? "" : lightMode ? "#f2f6f8 " : "#212639",
          padding: windowWidth < 600 ? "" : "16px",
          marginTop: windowWidth < 500 ? "0" : "88px",
          borderRadius: "16px",
        }}
      >
        <ImageBasedAds />
        {apiData?.total_count !== 0 && (
          <div
            className="w-100 d-flex d-flex-row-col justify-content-between mb-20"
            id="overview"
          >
            <div
              className={` w-100 p-10 ${
                windowWidth < 500 ? "" : "mt-40"
              } only-mobile-view`}
            >
              <LeftIpoBox
                width="100%"
                borderRadius="16px"
                lightMode={lightMode}
                UserAuth={UserAuth}
                CompanyName={apiData?.company_details?.company_name}
                data={apiData?.overview_data}
                mobile={true}
              />{" "}
            </div>

            <div
              style={{
                backgroundColor: lightMode ? "#f2f6f8" : "#212639",
                borderRadius: "16px",
                padding: "10px",
                width: "100%",
              }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-15px">
                  <h2
                    className="fs-s-16 fw-500 lh-26"
                    style={{ marginTop: windowWidth < 600 && "10px" }}
                  >
                    About {apiData?.company_details?.company_name}
                  </h2>
                </div>
              </div>
              <div className="d-flex align-items-center gap-15px">
                <div
                  className={`${
                    lightMode ? "ipo_container_light" : "ipo_container_dark"
                  }`}
                >
                  <div
                    className="text-align-justify lh-22 fs-s-14 fw-400"
                    style={{ color: lightMode ? "#000" : "#afafaf" }}
                  >
                    {apiData ? (
                      showFullText ? (
                        apiData?.summary_data?.company_data
                      ) : (
                        truncatedText
                      )
                    ) : (
                      <TableLoader />
                    )}

                    {isTruncated && !showFullText && (
                      <span
                        style={{ cursor: "pointer", color: "#6DB8FD" }}
                        onClick={handleReadMoreClick}
                      >
                        ... Read More
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-flex  flex-col-row w-100 gap-15px ">
                <ReservationStatus
                  subscriptionData={subscriptionData}
                  apiData={apiData}
                  lightMode={lightMode}
                />
                <CompanyDetails
                  companyDetails={companyDetails}
                  apiData={apiData}
                  lightMode={lightMode}
                />
              </div>
              <div className="d-flex align-items-center justify-content-between flex-col-row w-100 gap-15px ">
                <div className="w-100">
                  <ShareHoldingDetails
                    shareholdingData={shareholdingData}
                    OfferDetailsData={OfferDetailsData}
                    apiData={apiData}
                    lightMode={lightMode}
                  />{" "}
                </div>
                {/* <div className="w-100-50"> 
        <Image
              src={lightMode ? IpoRatingLight : IpoRatingDark}
              className="w-100 br-20 mt-10"
              height={300}
            />  </div> */}
              </div>
              <Financial
                financialData={financialData}
                switchData={switchData}
                apiData={apiData}
                lightMode={lightMode}
              />
              <div className="mt-20 mb-20">
                {/* <VidVertos /> */}
                <Competitor
                  apiData={apiData}
                  riskKeys={riskKeys}
                  lightMode={lightMode}
                  tableHeaders={tableHeaders}
                  riskValues={riskValues}
                  showMore={showMore}
                  handleShowMore={handleShowMore}
                  totalWordsLength={totalWordsLength}
                  displayCount={displayCount}
                />
              </div>
            </div>
          </div>
        )}

        <div id="News">
          {/* <h2 className="index-header sub-table-news-data" style={{marginTop:"-4px"}}>News</h2> */}
          <div className="sub-table-news-data w-100 d-flex flex-col ">
            {/* <NewsTabIndexDetails lightMode={lightMode} indexname={indexname} index={true}/>
            <StockFaq data={convertFaq} lightMode={lightMode} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightIpoBox;
