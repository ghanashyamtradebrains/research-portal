import React from "react";
import useGetFetch from "../../../hooks/useGetFetch";
import StockEndpoints from "../../../pages/api/endPoints";
import MarketMoverTable from "./MarketMoverTable";
import { useRouter } from "next/router";
import styles from "./topGainLose.module.css";

function LoserGainerSection({ lightMode }) {
  const { isLoading, serverError, apiData } = useGetFetch(
    StockEndpoints.marketMovers("NIFTY")
  );

  const router = useRouter();

  return (
    <section className="p-50-0 px-15 mt-40 w-100">
      <div className="flex overflow-md-scroll">
        <div className="w-100-50">
          <div className="d-flex justify-content-between align-items-center">
            <p className="fs-20-16 fw-500 lh-30">Top Gainers</p>
            <p
              onClick={() => router.push("/marketstats/gainers/NIFTY")}
              className="fs-16-14 fw-400 text-btn-light underline pointer"
            >
              View all
            </p>
          </div>
          <MarketMoverTable
            tableData={apiData?.gainers?.slice(0, 5)}
            tableHead="Top Gainers"
            lightMode={lightMode}
            link={`/marketstats/gainers`}
            isLoading={isLoading}
          />
        </div>
        <div className="w-100-50">
          <div className="d-flex justify-content-between align-items-center">
            <p className="fs-20-16 fw-500 lh-30">Top Losers</p>
            <p
              onClick={() => router.push("/marketstats/losers/NIFTY")}
              className="fs-16-14 fw-400 text-btn-light underline pointer"
            >
              View all
            </p>
          </div>
          <MarketMoverTable
            tableData={apiData?.losers?.slice(0, 5)}
            tableHead="Top Losers"
            lightMode={lightMode}
            link={`/marketstats/losers`}
            isLoading={isLoading}
          />
        </div>
        <div className="w-100-50">
          <p className="fs-20-16 fw-500 lh-30">Most Traded Stocks</p>
          <MarketMoverTable
            tableData={apiData?.volume_movers?.slice(0, 5)}
            // tableHead="Top Losers"
            lightMode={lightMode}
            link={`/marketstats/losers`}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
}

export default LoserGainerSection;
