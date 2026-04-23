import { useRouter } from "next/router";
import useWindowWidth from "../../../utilityFn/getWindowWidth";
import AliceBlueImageAds from "../../AdsComp/AliceBlueImageAds";
import VidVertos from "../../AdsComp/VidVertos";
import AllIndustryHeatmap from "../../AllStocks/AllIndustryHeatmap";
import IndustryDropDown from "../../AllStocks/IndustryDropDown";
import IndustryLeftBar from "../../AllStocks/IndustryLeftBar";
import IndustryStocksDropdown from "../../AllStocks/IndustryStocksDropdown";
import IndustryTable from "../../AllStocks/IndustryTable";
import TimeLineButtons from "../../TimeLineButtons";

function IndustrySection({
  lightMode,
  industryName,
  temp_sector,
  daysDuration,
  setdaysDuration,
  timeLineData,
  setlengthofArray,
  setactiveIndex,
}) {
  const windowWidth = useWindowWidth();
  const navigate = useRouter();
  const IndexList = {
    Aluminium: "aluminium",
    "Automobiles - passenger cars": "automobiles-passenger-cars",
    "Bank-Private": "banks-private-sector",
    "Finance - Large": "finance-large",
    "Engineering - Heavy - General - Large": "engineering-heavy-general-large",
  };
  return (
    <>
      <div className=" w-100">
        <div className="p-10">
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
                <IndustryStocksDropdown
                  lightMode={lightMode}
                  data={industryName}
                  navigate={navigate}
                  activeValue={temp_sector}
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
                          minWidth: windowWidth < 500 && "150px",
                          color: lightMode
                            ? navigate?.query?.industry_name ===
                              IndexList[items]
                              ? "white"
                              : "black"
                            : navigate?.query?.industry_name ===
                              IndexList[items]
                            ? "white"
                            : "white",
                          background: lightMode
                            ? navigate?.query?.industry_name ===
                              IndexList[items]
                              ? "linear-gradient(90.15deg, #6DB8FD 0.17%, #1774FF 104.9%)"
                              : "#F2F6F8"
                            : navigate?.query?.industry_name ===
                              IndexList[items]
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
              <IndustryTable
                setlengthofArray={setlengthofArray}
                daysDuration={daysDuration}
              />
              {/* <div className="mt-20">
                <VidVertos />
              </div> */}

              <AllIndustryHeatmap daysDurationAll={daysDuration} />
            </div>
          </div>
          <section>
            {/* <div className="w-100-75 mb-75">
              <SectorIndusFaq
                lightMode={lightMode}
                sector={sector}
                titleSector={titleSector}
                topCompanies={topCompanies}
                sectorStocks={sectorStocks}
                topRoeCompanies={topRoeCompanies}
                topPeCompanies={topPeCompanies}
              />
            </div> */}
          </section>
          {/* <TrendingStocks lightMode={lightMode} /> */}
        </div>
      </div>
    </>
  );
}
export default IndustrySection;
