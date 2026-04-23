import React from "react";
import LargeAdd from "../../AdsComp/LargeAdd";
import LeftBar from "../../AllStocks/LeftBar";
import SectorDropDown from "../../AllStocks/SectorDropDown";
import TimeLineButtons from "../../TimeLineButtons";
import SectorTable from "../../AllStocks/SectorTable";
import VidVertos from "../../AdsComp/VidVertos";
import AllSectorHeatmap from "../../AllStocks/AllSectorHeatmap";
import SectorIndusFaq from "./SectorIndusFaq";

import BreadCrumb from "../../BreadCrumb";
import useWindowWidth from "../../../utilityFn/getWindowWidth";

import ImageBasedAds from "../../AdsComp/AliceBlueImageAds";
import AllPageAds from "../../AdsComp/AllPageAds";
function SectorSection({
  lightMode,
  sector,
  titleSector,
  lengthofArray,
  sectorStocks,
  sectorName,
  navigate,
  sectorMappings,
  daysDuration,
  setdaysDuration,
  timeLineData,
  setlengthofArray,
  IndexList,
  setValue,
  setactiveIndex,
}) {
  const sortedSectors = sectorStocks?.results?.sort();
  const topCompanies = sortedSectors
    ?.slice(0, 3)
    ?.map((stock) => stock.company);
  const topRoeCompanies = sortedSectors
    ?.filter((stock) => stock.roe > 20)
    ?.map((stock) => stock.company);
  const topPeCompanies = sortedSectors
    ?.filter((stock) => stock.pe > 70)
    ?.map((stock) => stock.company);
  const breadCrumbData = [{ label: "Dashboard", link: `/dashboard` }];
  const windowWidth = useWindowWidth();

  return (
    <>
      <div className="py-20">
        <div
          className="p-10"
          style={{
            backgroundColor: lightMode ? "#f2f6f8" : "#212639",
            borderRadius: "16px",
          }}
        >
          <div>
            <div className="mb-20">
              <BreadCrumb linkData={breadCrumbData} current={titleSector} />
            </div>
            <div className="d-flex align-items-center mb-10">
              <h1 className="mb-0 fs-18-16 fw-700">
                List of {titleSector} Stocks in India by Market Cap{" "}
                {titleSector === "All Stocks" ? "" : ""}
              </h1>
            </div>
            <p className="mr-10 lh-24  d-flex align-self-center">
              Here is the complete list of {titleSector}{" "}
              {titleSector === "All Stocks" ? "" : " Stocks"} by market
              capitalization and current share price. Currently there are{" "}
              {lengthofArray} stocks in {titleSector}{" "}
              {titleSector === "All Stocks" ? "" : "sector"}
            </p>
          </div>
          {/* <div className="pb-10px">
            {" "}
            <ImageBasedAds />{" "}
          </div> */}
          <AllPageAds page="stock" />
          <div className="d-flex">
            {/* <div
            style={{ width: "20%", top: "130px", height: "min-content" }}
            className="detail-left-card p-fixed"
          >
            <LeftBar
              lightMode={lightMode}
              data={sectorName}
              navigate={navigate}
              activeSector={titleSector}
              sectorMappings={sectorMappings}
            />
          </div> */}
            <div className=" w-100 ">
              <div className="mb-20 d-flex  justify-content-between w-100">
                <SectorDropDown
                  lightMode={lightMode}
                  data={sectorName}
                  navigate={navigate}
                  activeValue={titleSector}
                  sectorMappings={sectorMappings}
                />
              </div>
              <div className="d-flex mb-10 justify-content-between flex-col-row ">
                {/* <div
                 className="d-flex gap-15px overflow-md-scroll"
                 style={{ minWidth: windowWidth < 650 ? "550px" : "" }}
               > */}
                {/* <div className=" d-flex scroll mt-10 overflow-md-scroll "> */}

                <div
                  className="d-flex overflow-md-scroll align-items-center"
                  style={{ minWidth: "356px", gap: "2px" }}
                >
                  {Object.keys(IndexList)?.map((items, i) => {
                    return (
                      <div
                        key={i}
                        onClick={() => {
                          navigate.push(IndexList[items]);
                          setactiveIndex({
                            symbol: IndexList[items],
                            label: items,
                          });
                        }}
                        style={{
                          marginRight: "10px",
                          minWidth: windowWidth < 500 && "130px",
                          color: lightMode
                            ? navigate?.query?.sector_name === IndexList[items]
                              ? "white"
                              : "black"
                            : navigate?.query?.sector_name === IndexList[items]
                              ? "white"
                              : "white",
                          background: lightMode
                            ? navigate?.query?.sector_name === IndexList[items]
                              ? "linear-gradient(90.15deg, #6DB8FD 0.17%, #1774FF 104.9%)"
                              : "#F2F6F8"
                            : navigate?.query?.sector_name === IndexList[items]
                              ? "linear-gradient(90.15deg, #6DB8FD 0.17%, #1774FF 104.9%)"
                              : "#3B3F4F",
                        }}
                        className="m-10 mb-0 bg-dark  px-10px pointer br-5"
                      >
                        <p className="p-5 mb-0 fs-s-12 d-flex align-items-center justify-content-center">
                          {items}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div
                  className="d-flex  justify-content-between flex-col-row"
                  style={{
                    marginBottom: windowWidth < 500 && "10px",
                    marginTop: windowWidth < 500 && "10px",
                  }}
                >
                  <TimeLineButtons
                    value={daysDuration}
                    setValue={setdaysDuration}
                    lightMode={lightMode}
                    data={timeLineData}
                  />
                </div>

                {/* </div> */}
                {/* </div> */}
              </div>

              <SectorTable
                setlengthofArray={setlengthofArray}
                daysDuration={daysDuration}
              />
              {/* <div className="mt-20">
                <VidVertos />
              </div> */}
              {sector === "All Stocks" ? (
                ""
              ) : (
                <AllSectorHeatmap daysDurationAll={daysDuration} />
              )}
            </div>
          </div>
          <section>
            <div className="w-100-75 mt-20">
              <SectorIndusFaq
                lightMode={lightMode}
                sector={sector}
                titleSector={titleSector}
                topCompanies={topCompanies}
                sectorStocks={sectorStocks}
                topRoeCompanies={topRoeCompanies}
                topPeCompanies={topPeCompanies}
              />
            </div>
          </section>
          {/* <div ><TrendingStocks lightMode={lightMode} /></div> */}
        </div>
      </div>
    </>
  );
}
export default SectorSection;
