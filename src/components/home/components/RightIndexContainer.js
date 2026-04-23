import { useSelector } from "react-redux";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import CustomTable from "../../CustomTable";
import GrayContainer from "../../NewStockDetails/LeftContainer/SecondaryGrayCont/GrayContainer";
import IndexNavbar from "../../NewStockDetails/RightContainer/IndexNavbar/IndexNavbar";
import { authStore } from "../../../redux/reducers/authSlice";
import SentimentalReturns from "./SentimentalReturns";
import TechnicalIndex from "../../StockDetails/technical/TechnicalIndex";
import NewIndexHeatmaps from "./NewIndexHeatmaps";
import LeftSectionCompanies from "../../IndexDetails/LeftSectionCompanies";
import StockConstituents from "../../IndexDetails/StockConstituents";
import VidVertos from "../../AdsComp/VidVertos";
import NewsTabStockDetails from "../../StockDetails/Corp Announce/NewsTabStockDetails";
import StockFaq from "../../StockDetails/StockFaq";
import IndexGainLoss from "./IndexGainLoss";
import IndexCount from "./IndexCount";
import NewsTabIndexDetails from "./IndexNews/NewsTabIndexDetails";
import { useRouter } from "next/router";
import AboutGiftNifty from "../../IndexDetails/AboutGiftNifty";
import ImageBasedAds from "../../AdsComp/AliceBlueImageAds";

function RightIndexContainer({
  lightMode,
  adjustedGainers,
  adjustedLosers,
  isLoading,
  columns,
  apiData,
  convertFaq,
  srcImage,
  index_name,
  Stockdata,
  returns,
  giftreturns,
  indexname,
  fullName,
  Wpercentage,
  Wclose,
  Wlow,
  Whigh,
  high,
  low,
  names,
}) {
  const windowWidth = useWindowWidth();
  const UserAuth = useSelector(authStore);
  const navigate = useRouter();
  return (
    <div className="w-75-100p ">
      <div className="stock_navbar only-PC-view">
        <IndexNavbar index={true} lightMode={lightMode} />
      </div>
      {/* <div className="mb-10 only-mobile-view mt-10">
      <IndexCount lightMode={lightMode} index_name={index_name}/>
      </div> */}
      <div
        style={{
          width: "100%",
          backgroundColor: lightMode ? "#f2f6f8 " : "#212639",
          padding: "16px",
          marginTop: windowWidth < 1024 ? "50px" : "88px",
          borderRadius: "16px",
        }}
      >
        <ImageBasedAds />
        {apiData?.total_count !== 0 && (
          <div
            className="w-100 d-flex d-flex-row-col justify-content-between mb-20"
            id="gainer-losers"
          >
            <div
              className={` w-100 ${
                windowWidth < 1024 ? "" : "mt-40"
              } only-mobile-view`}
            >
              <GrayContainer
                width="100%"
                borderRadius="16px"
                srcImage={srcImage}
                lightMode={lightMode}
                UserAuth={UserAuth}
                index={true}
                index_name={index_name}
                volumeBar={"false"}
                Stockdata={Stockdata}
                apiData={apiData}
                Wpercentage={Wpercentage}
                Wclose={Wclose}
                Wlow={Wlow}
                Whigh={Whigh}
                high={high}
                low={low}
                names={names}
                mobile={true}
              />{" "}
            </div>
            {navigate?.query?.index_name === "GIFT-NIFTY" ? (
              <div
                className="fs-s-14 fw-400 p-15 br-10 "
                style={{
                  background: lightMode ? "rgba(242, 246, 248, 1)" : "#212639",
                  borderColor: lightMode ? "#C9D7DE" : "#545E78",
                  border: lightMode ? "1px solid #C9D7DE" : "1px solid #545E78",
                  color: lightMode ? "#000" : "#fff",
                  opacity: "0.8",
                  marginTop: windowWidth < 600 && "20px",
                }}
              >
                GIFT Nifty, formerly known as SGX Nifty, refers to the Nifty 50
                index futures traded on the Singapore Exchange (SGX) and is now
                associated with the Gujarat International Finance Tec-City (GIFT
                City) in India. At present, 60 members from NSE are authorized
                to trade on GIFT Nifty, and 40 are in the process of joining,
                reaching the prior set mark of 100 local members of NSE. This
                will present investors with a better option as GIFT Nifty is a
                dollar-denominated contract, whereas SGX Nifty is a Singapore
                dollar-denominated contract. Thus, liquidity for the SGX Nifty
                was not ideal, and this was one of the reasons behind the
                transformation of SGX to GIFT Nifty.
              </div>
            ) : (
              <IndexGainLoss
                lightMode={lightMode}
                columns={columns}
                adjustedGainers={adjustedGainers}
                adjustedLosers={adjustedLosers}
                isLoading={isLoading}
                index_name={index_name}
              />
            )}
          </div>
        )}
        <SentimentalReturns
          lightMode={lightMode}
          index_name={index_name}
          returns={returns}
          names={names}
        />
        <div id="Technical">
          <TechnicalIndex
            lightMode={lightMode}
            symbol={indexname}
            CMP={
              Stockdata && Stockdata[0] && Stockdata && Stockdata[0]["close"]
            }
            index={true}
            fullName={fullName}
            names={names}
          />
        </div>
        <NewIndexHeatmaps
          lightMode={lightMode}
          index_name={index_name}
          names={names}
        />
        <div className="desktop-non mt-20">
          <LeftSectionCompanies />
        </div>
        <div className="mt-20 mb-20">
          <VidVertos />
        </div>
        <div id="Stock-constituents">
          <StockConstituents
            indexname={indexname}
            fullName={fullName}
            lightMode={lightMode}
            stockDeatil={true}
            dashboard={true}
            names={names}
          />
        </div>
        {navigate?.query?.index_name === "GIFT-NIFTY" && (
          <AboutGiftNifty lightMode={lightMode} />
        )}
        <div id="News">
          <h2
            className="index-header sub-table-news-data"
            style={{ marginTop: "-4px" }}
          >
            News
          </h2>
          <div className="sub-table-news-data w-100 d-flex flex-col ">
            <NewsTabIndexDetails
              lightMode={lightMode}
              indexname={indexname}
              index={true}
            />
            <StockFaq data={convertFaq} lightMode={lightMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightIndexContainer;
