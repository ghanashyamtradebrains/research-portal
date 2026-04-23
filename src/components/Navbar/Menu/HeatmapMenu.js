import { useEffect, useState } from "react";
import { getGainerLoserList } from "../../../pages/api/fetchClient";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export const HeatmapMenu = ({
  mobile = false,
  index = false,
  sector = false,
  industry = false,
  buckets = false,
  other = false,
  setMobileToggle,
}) => {
  const { lightMode } = useSelector(getThemeMode);
  const [gainerLoserList, setGainerLoserList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      await getGainerLoserList()
        .then((res) => {
          setGainerLoserList(
            res?.data?.filter(
              (each) =>
                each?.symbol === "NIFTY" ||
                each?.symbol === "NIFTY100" ||
                each?.symbol === "NIFTYMIDCAP" ||
                // each?.symbol === "BANKNIFTY" ||
                // each?.symbol === "NIFTYFINANCE" ||
                each?.symbol === "SENSEX" ||
                each?.symbol === "AUTO" ||
                each?.symbol === "BSEPVTBANK" ||
                // each?.symbol === "METAL" ||
                // each?.symbol === "MIDCAP" ||
                each?.symbol === "global-stock-market" ||
                each?.symbol === "forex" ||
                each?.symbol === "adr-stocks"
            )
          );
        })

        .catch((err) => {
          null;
        });
    };
    getData();
  }, []);
  const IndexList = {
    "Rakesh Jhunjhunwala And Associates": "rakesh-jhunjhunwala-and-associates",
    "Mukul Agrawal": "mukul-agrawal",
    "Ashish Kacholia": "ashish-kacholia",
  };
  const IndexItems = {
    "TATA Group": "tata-group",
    "Mukesh Ambani Group": "mukesh-ambani-group",
    "Bajaj Group": "bajaj-group",
  };
  const MonthlyIndexItems = {
    "Nifty 50": "NIFTY",
    "Bank Nifty": "BANKNIFTY",
    Sensex: "Sensex",
  };
  const SectorItems = {
    Banks: "banks",
    Entertainment: "entertainment",
    "IT - Software": "it-software",
  };
  const IndustryItems = {
    "Abrasives and Grinding Wheels Industry Stocks":
      "abrasives-and-grinding-wheels",
    "Air-conditioners": "air-conditioners",
    Aluminium: "aluminium",
  };
  const AllstocksList = {
    "Infosys Ltd": "INFY",
    "HDFC Bank Ltd": "HDFCBANK",
    "Reliance Industries Ltd": "RELIANCE",
  };
  const OtherList = {
    "Global Market Indices": "global-stock-market",
    "Forex Currencies": "forex",
    "Adr Stocks": "adr-stocks",
    IPO: "ipo",
  };
  return (
    <div
      className={` ff-poppins bt-navbar mt-4 ${mobile ? "" : "p-20 card-shadow-black"
        } br-t-b-l-r d-flex-row-col gap-15px ${lightMode
          ? "bg-white text-black" : (router.pathname.includes("/portal-ai")?
            "bg-dark-portal-ai text-white"
            : `${mobile ? "text-white" : "bg-dark-black text-white"}`
          )}`}
      style={{ minWidth: !mobile ? "1350px" : "" }}
    >
      {index && (
        <div className=" w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">
                Index HeatMaps
              </p>
              <span className="underline fs-s-12 mr-10">
                <Link
                  onClick={() => setMobileToggle("NONE")}
                  href={`/index/NIFTY/heatmap`}
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
                NSE Heatmaps{" "}
                {mobile && (
                  <span className="underline fs-s-12 mr-10">
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      href={`/index/NIFTY/heatmap`}
                      className={`${lightMode ? "text-black" : "text-white"
                        } underline`}
                    >
                      View all
                    </Link>
                  </span>
                )}
              </p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {gainerLoserList
                ?.filter((each) => each?.exchange === "NSE")
                ?.map((each) => {
                  return (
                    <div className="mb-20">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        className="link-hover-underline fs-s-14 "
                        href={`/index/${each?.symbol}/heatmap`}
                      >
                        {each?.name}{" "}
                        <span className="text-btn-dark fw-600">{">"}</span>
                      </Link>
                    </div>
                  );
                })}
            </div>

            <div>
              <p className="opacity5 mb-5">BSE Heatmaps</p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}

              {gainerLoserList
                ?.filter((each) => each?.exchange === "BSE")
                ?.map((each) => {
                  return (
                    <div className="mb-20">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        className="link-hover-underline fs-s-14 "
                        href={`/index/${each?.symbol}/heatmap`}
                      >
                        {each?.name}{" "}
                        <span className="text-btn-dark fw-600">{">"}</span>
                      </Link>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      {/* {!mobile && <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>} */}
      {sector && (
        <div className="w-100">
          {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
          <div className="d-flex align-items-center justify-content-between mb-15">
            <p
              className={
                mobile ? "opacity5 mb-5" : "mb-0 fs-s-14 fw-600 text-btn-dark"
              }
            >
              Monthly Index Heatmaps
            </p>
            <span className="underline fs-s-12 mr-10">
              <Link
                href={`/heatmaps/monthly-index/NIFTY`}
                onClick={() => setMobileToggle("NONE")}
                className={!mobile ? " underline" : "underline opacity5"}
              >
                View all
              </Link>
            </span>
          </div>
          <div className="d-flex-col gap-10px">
            <div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(MonthlyIndexItems).map((key) => {
                const businessSlug = MonthlyIndexItems[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmaps/monthly-index/${businessSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
            {!mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
            <div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              <div className="d-flex align-items-center justify-content-between mb-15">
                <p
                  className={
                    mobile
                      ? "opacity5 mb-5"
                      : "mb-0 fs-s-16 fw-600 text-btn-dark"
                  }
                >
                  Sector HeatMaps
                </p>
                <span className="underline fs-s-12 mr-10">
                  <Link
                    href={`/heatmaps/sector/agro-chemicals`}
                    onClick={() => setMobileToggle("NONE")}
                    className={!mobile ? " underline" : "underline opacity5"}
                  >
                    View all
                  </Link>
                </span>
              </div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(SectorItems).map((key) => {
                const businessSlug = SectorItems[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmaps/sector/${businessSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {sector && (
        <div className="w-100">
          {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
          <div className="d-flex align-items-center justify-content-between mb-15">
            <p
              className={
                mobile ? "opacity5 mb-5" : "mb-0 fs-s-16 fw-600 text-btn-dark"
              }
            >
              Industry HeatMaps
            </p>
            <span className="underline fs-s-12 mr-10">
              <Link
                href={`/heatmaps/industry/abrasives-and-grinding-wheels`}
                onClick={() => setMobileToggle("NONE")}
                className={!mobile ? " underline" : "underline opacity5"}
              >
                View all
              </Link>
            </span>
          </div>
          <div className="d-flex-col gap-10px">
            <div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(IndustryItems).map((key) => {
                const businessSlug = IndustryItems[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmaps/industry/${businessSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
            {!mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
            <div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              <div className="d-flex align-items-center justify-content-between mb-15">
                <p
                  className={
                    mobile
                      ? "opacity5 mb-5"
                      : "mb-0 fs-s-16 fw-600 text-btn-dark"
                  }
                >
                  Bucket HeatMaps
                </p>
                <span className="underline fs-s-12 mr-10">
                  <Link
                    href={`/heatmaps/business-houses/tata-group`}
                    onClick={() => setMobileToggle("NONE")}
                    className={!mobile ? " underline" : "underline opacity5"}
                  >
                    View all
                  </Link>
                </span>
              </div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(IndexItems).map((key) => {
                const businessSlug = IndexItems[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmaps/business-houses/${businessSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* {!mobile && <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>} */}
      {buckets && (
        <div className="w-100">
          {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
          <div className="d-flex align-items-center justify-content-between mb-15">
            <p
              className={
                mobile ? "opacity5 mb-5" : "mb-0 fs-s-16 fw-600 text-btn-dark"
              }
            >
              Superstar HeatMaps
            </p>
            <span className="underline fs-s-12 mr-10">
              <Link
                href={`/heatmaps/superstar/rakesh-jhunjhunwala-and-associates`}
                onClick={() => setMobileToggle("NONE")}
                className={!mobile ? " underline" : "underline opacity5"}
              >
                View all
              </Link>
            </span>
          </div>

          <div className="d-flex-col gap-10px">
            <div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(IndexList).map((key) => {
                const superstarSlug = IndexList[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmaps/superstar/${superstarSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
            {!mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
            <div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              <div className="d-flex align-items-center justify-content-between mb-15">
                <p
                  className={
                    mobile
                      ? "opacity5 mb-5"
                      : "mb-0 fs-s-16 fw-600 text-btn-dark"
                  }
                >
                  Stocks HeatMaps
                </p>
                <span className="underline fs-s-12 mr-10">
                  <Link
                    href={`/heatmaps/stocks/TCS`}
                    onClick={() => setMobileToggle("NONE")}
                    className={!mobile ? " underline" : "underline opacity5"}
                  >
                    View all
                  </Link>
                </span>
              </div>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(AllstocksList).map((key) => {
                const AllstocksSlug = AllstocksList[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmaps/stocks/${AllstocksSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* {!mobile && <p className="bl-light-gray-1px  pd-1px opacity5 mb-0"></p>} */}
      {industry && (
        <div className="w-100">
          {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
          <div className="d-flex align-items-center justify-content-between mb-15">
            <p
              className={
                mobile ? "opacity5 mb-5" : "mb-0 fs-s-16 fw-600 text-btn-dark"
              }
            >
              Other HeatMaps
            </p>
            <span className="underline fs-s-12 mr-10">
              <Link
                href={`/heatmap/global-stock-market`}
                onClick={() => setMobileToggle("NONE")}
                className={!mobile ? " underline" : "underline opacity5"}
              >
                View all
              </Link>
            </span>
          </div>

          <div className="d-flex-col gap-10px">
            <div className="">
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
              {Object.keys(OtherList).map((key) => {
                const AllothersSlug = OtherList[key];
                return (
                  <div className="mb-20" key={key}>
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      className="link-hover-underline fs-s-14"
                      href={`/heatmap/${AllothersSlug}`}
                    >
                      {key} <span className="text-btn-dark fw-600">{">"}</span>
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