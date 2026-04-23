import { useEffect, useState } from "react";
import { getGainerLoserList, getHighData, getHighLowData, getLowData } from "../../../pages/api/fetchClient";
import { useSelector } from "react-redux";
import { getThemeMode } from "../../../redux/reducers/ThemeSlice";
import Link from "next/link";
import { useRouter } from "next/router";

export const TopGainLossMenu = ({
  mobile = false,
  gainer = false,
  loser = false,
  other = false,
  setMobileToggle,
}) => {
  const { lightMode } = useSelector(getThemeMode);
  const [gainerLoserList, setGainerLoserList] = useState([]);
  const [OtherList, setOtherList] = useState([]);
  const [OtherLowList, setOtherLowList] = useState([]);
  const [input, setInput] = useState("");
  const [page, setPage] = useState(1);
  const [perpage, setPerPage] = useState(100);
  const router = useRouter();
  const [sortState, setsortState] = useState({
    head: "change",
    sortOrder: false,
  });
  useEffect(() => {
    const getData = async () => {
      await getGainerLoserList()
        .then((res) => {
          setGainerLoserList(
            res?.data?.filter(
              (each) =>
                each?.symbol === "NIFTY" ||
                each?.symbol === "BANKNIFTY" ||
                each?.symbol === "NIFTYFINANCE" ||
                each?.symbol === "SENSEX" ||
                each?.symbol === "AUTO" ||
                each?.symbol === "BSEPVTBANK"
            )
          );
        })
        .catch((err) => {
          null;
        });
    };
    const getHighLowDatas = async () => {
      await getHighLowData("high", input, page, perpage, sortState.head, sortState.sortOrder)
        .then((res) => {
          setOtherList(res?.data?.count);
        })
      await getHighLowData("low", input, page, perpage, sortState.head, sortState.sortOrder)
        .then((res) => {
          setOtherLowList(res?.data?.count);
        })
        .catch((err) => {
          null;
        });
    };
    getData();
    getHighLowDatas();
  }, []);

  return (
    <div
      className={` ff-poppins bt-navbar mt-4 ${mobile ? "" : "p-20 card-shadow-black"
        } br-t-b-l-r d-flex gap-15px ${lightMode
          ? "bg-white text-black"
          : (router.pathname.includes("/portal-ai") ?
            "bg-dark-portal-ai text-white"
            : `${mobile ? "text-white" : "bg-dark-black text-white"}`)
        }`}
    >
      {gainer && (
        <div className=" w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Top Gainers</p>
              <span className="underline fs-s-12">
                <Link
                  onClick={() => setMobileToggle("NONE")}
                  href={`/marketstats/gainers/NIFTY`}
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
                NSE Top gainers
                {mobile && (
                  <span className="underline fs-s-12">
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      href={`/marketstats/gainers/NIFTY`}
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
                        href={`/marketstats/gainers/${each?.symbol}`}
                      >
                        {each?.name}{" "}
                        <span className="text-btn-dark fw-600">{">"}</span>
                      </Link>
                    </div>
                  );
                })}
            </div>
            {!mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
            <div>
              <p className="opacity5 mb-5">BSE Top gainers</p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}

              {gainerLoserList
                ?.filter((each) => each?.exchange === "BSE")
                ?.map((each) => {
                  return (
                    <div className="mb-20">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        className="link-hover-underline fs-s-14 "
                        href={`/marketstats/gainers/${each?.symbol}`}
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
      {loser && (
        <div className="w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Top Losers</p>
              <span className="underline fs-s-12">
                <Link href={`/marketstats/losers/NIFTY`} className="underline ">
                  View all
                </Link>
              </span>
            </div>
          )}

          <div className="d-flex-col gap-10px">
            <div>
              <p className="opacity5 mb-5 d-flex justify-content-between">
                NSE Top Losers
                {mobile && (
                  <span className="underline fs-s-12">
                    <Link
                      onClick={() => setMobileToggle("NONE")}
                      href={`/marketstats/losers/NIFTY`}
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
                        href={`/marketstats/losers/${each?.symbol}`}
                      >
                        {each?.name}{" "}
                        <span className="text-btn-dark fw-600">{">"}</span>
                      </Link>
                    </div>
                  );
                })}
            </div>
            {!mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}
            <div>
              <p className="opacity5 mb-5">BSE Top losers</p>
              {mobile && <p className="opacity5 mb-10 bb-2-gray"></p>}

              {gainerLoserList
                ?.filter((each) => each?.exchange === "BSE")
                ?.map((each) => {
                  return (
                    <div className="mb-20">
                      <Link
                        onClick={() => setMobileToggle("NONE")}
                        className="link-hover-underline fs-s-14 "
                        href={`/marketstats/losers/${each?.symbol}`}
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
      {other && (
        <div className="w-100">
          {!mobile && (
            <div className="d-flex align-items-center justify-content-between mb-15">
              <p className="mb-0 fs-s-16 fw-600 text-btn-dark">Others</p>
              <span className="underline fs-s-12">
                <Link href={`/marketstats/trending-stocks`} className="underline ">
                  View all
                </Link>
              </span>
            </div>
          )}
          <div className="d-flex-col gap-10px">
            <div>
              <p className=" mb-5">
                <Link href={`/marketstats/52week-high`}>
                  52 Week High
                </Link> <span className="opacity5">({OtherList === undefined ? "0" : OtherList})</span>  </p>
            </div>
            <div>
              <p className=" mb-5">
                <Link href={`/marketstats/52week-low`}>
                  52 Week Low
                </Link> <span className="opacity5">({OtherLowList === undefined ? "0" : OtherLowList})</span>  </p>
            </div>
            <div>
              <p className=" mb-5">
                <Link href={`/marketstats/trending-stocks`}>
                  Trending Stocks
                </Link>  </p>
            </div>
            {/* <div>
            <p className=" mb-5">
            <Link href={`/marketstats/market-prediction`}>
            Market Prediction
                </Link>  </p>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};