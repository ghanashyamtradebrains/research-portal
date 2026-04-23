import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import {
  getAllStockIndustryList,
  getAllStockSectorList,
} from "../../../pages/api/fetchClient";
import { useRouter } from "next/router";

export const AllStockMenu = ({
  mobile = false,
  setMobileToggle = null,
  sector = false,
  industry = false,
}) => {
  const { lightMode } = useSelector(getThemeMode);
  const [sectorName, setSectorName] = useState([]);
  const [industryName, setIndustryName] = useState([]);
  const router = useRouter();
  const getSectorData = async () => {
    await getAllStockSectorList()
      .then((res) => {
        setSectorName(res?.data);
      })
      .catch((err) => {
        null;
      });
  };
  const getIndustryData = async () => {
    await getAllStockIndustryList()
      .then((res) => {
        setIndustryName(res?.data);
      })
      .catch((err) => {
        null;
      });
  };
  useEffect(() => {
    getSectorData();
    getIndustryData();
  }, []);

  const OtherStocks = [
    { slug: "global-stock-market", other_name: "Global Market Indices" },
    { slug: "forex", other_name: "Forex Currencies" },
    { slug: "adr-stocks", other_name: "ADR Stocks" },
  ];

  return (
    <div
      className={`ff-poppins flex-col-row gap-15px mt-4 bt-navbar 
      ${mobile ? "" : "p-20 card-shadow-black"} br-t-b-l-r
        ${lightMode ? "bg-white text-black"
          : (router.pathname.includes("/portal-ai")? 
            "bg-dark-portal-ai text-white" : `${mobile ? "" : "bg-dark-black text-white"}`)}`}
      style={{
        minWidth: !mobile ? "800px" : "",
        // borderTop: "2px solid grey",
      }}
    >
      {sector && (
        <div className="w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Sectors</p>
              <span className="underline fs-s-12">
                <Link
                  onClick={() => setMobileToggle("NONE")}
                  href={`/stock/sector/banks`}
                  className="underline "
                >
                  View all
                </Link>
              </span>
            </div>
          )}

          <div className="d-flex-col gap-10px">
            <div>
              <p className="opacity5 mb-5 d-flex justify-content-between">
                {mobile && (
                  <>
                    <span>Sectors</span>
                    <span className="underline fs-s-12">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        href={`/stock/sector/banks`}
                        className={`${lightMode ? "text-black" : "text-white"
                          } underline`}
                      >
                        View all
                      </Link>
                    </span>
                  </>
                )}
              </p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {sectorName.slice(0, 5)?.map((each) => {
                return (
                  <div className="mb-20">
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/stock/sector/${each?.slug}`}
                    >
                      {each?.sect_name}
                      <span className="text-btn-dark fw-600 ml-5">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {!mobile && <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>}
      {industry && (
        <div className="w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Industries</p>
              <span className="underline fs-s-12">
                <Link
                  href={`/stock/industry/aluminium`}
                  className="underline "
                >
                  View all
                </Link>
              </span>
            </div>
          )}

          <div className="d-flex-col gap-10px">
            <div>
              <p className="opacity5 mb-5 d-flex justify-content-between">
                {mobile && (
                  <>
                    <span>Industries</span>
                    <span className="underline fs-s-12">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        href={`/stock/industry/aluminium`}
                        className={`${lightMode ? "text-black" : "text-white"
                          } underline`}
                      >
                        View all
                      </Link>
                    </span>
                  </>
                )}
              </p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {industryName.slice(0, 5)?.map((each) => {
                return (
                  <div className="mb-20">
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14 "
                      href={`/stock/industry/${each?.slug}`}
                    >
                      {each?.industry_name}{" "}
                      <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {!mobile && <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>}
      {sector && (
        <div className=" w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Others</p>
              <span className="underline fs-s-12">
                <Link
                  onClick={() => setMobileToggle("NONE")}
                  href={`/stock/others/global-stock-market`}
                  className="underline "
                >
                  View all
                </Link>
              </span>
            </div>
          )}

          <div className="d-flex-col gap-10px">
            <div>
              <p className="opacity5 mb-5 d-flex justify-content-between">
                {mobile && (
                  <>
                    <span>Others</span>
                    <span className="underline fs-s-12">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        href={`/stock/others/global-stock-market`}
                        className={`${lightMode ? "text-black" : "text-white"
                          } underline`}
                      >
                        View all
                      </Link>
                    </span>
                  </>
                )}
              </p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {OtherStocks.slice(0, 5)?.map((each) => {
                return (
                  <div className="mb-20">
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/stock/others/${each?.slug}`}
                    >
                      {each?.other_name}{" "}
                      <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};