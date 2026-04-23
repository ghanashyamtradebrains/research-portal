import StockEndpoints from "../pages/api/endPoints";
import { CaretUpOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useGetFetch from "../hooks/useGetFetch";
import numberWithCommas from "../utilityFn/numberWithCommas";
import { redGreenColorPicker } from "../utilityFn/redGreenColor";
import PerformanceBarLine from "./PerformanceBarLine";
import { getStockChange } from "../pages/api/fetchClient";

function DashboardIndexCard({ lightMode, index }) {
  // get losersgainers count in index list
  const { isLoading, serverError, apiData } = useGetFetch(
    StockEndpoints.marketMovers(index)
  );
  const [stockChangeData, setstockChangeData] = useState({});
  const stockChange = async () => {
    await getStockChange(index)
      .then((resp) => {
        setstockChangeData(resp.data[0]);
      })
      .catch((err) => null);
  };
  useEffect(() => {
    stockChange();
  }, []);
  return (
    // <Link to={`/index/${index}`}>
    <Link 
    href="/index/[index]"
    as={`/index/${encodeURIComponent(index)}`} 
      style={{ minHeight: "335px", minWidth: "215px", width: "33%" }}
      className={`card-shadow  p-10md-20lg br-3 ${
        lightMode ? "bg-gray card-drop-light-shadow" : "card-drop-dark-shadow"
      }`}
    >
      
        <p className="fs-18-16 fw-500 mb-10">{index}</p>
      
      <p
        className={`d-flex d-flex-row lh-20  fs-s-20 mt-30 fw-500 align-items-center fw-600`}
      >
       
        {numberWithCommas(stockChangeData?.close)}
        <CaretUpOutlined
          style={{
            color: redGreenColorPicker(stockChangeData?.change, lightMode),marginLeft:'5px'
          }}
          rotate={stockChangeData?.change < 0 ? 180 : 0}
        />
      </p>
      <p
        className={` fw-500 fs-s-14 mb-30 mb-0 `}
        style={{
          color: redGreenColorPicker(stockChangeData?.change, lightMode),
        }}
      >
        {stockChangeData?.change?.toFixed(2)} ({Math.abs(stockChangeData?.percent?.toFixed(2))}%)
      </p>
      <div className="my-40 flex justify-content-between">
        <div>
          <p className="mb-5">High</p>
          <p
            style={{ color: redGreenColorPicker(5, lightMode) }}
            className="fw-500"
          >
            {numberWithCommas(stockChangeData?.high)}
          </p>
        </div>
        <div>
          <p className="mb-5">Low</p>
          <p
            style={{ color: redGreenColorPicker(-5, lightMode) }}
            className="fw-500"
          >
            {numberWithCommas(stockChangeData?.low)}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <PerformanceBarLine
          lineHeight={"4px"}
          LoserCount={apiData?.losers_count}
          gainerCount={apiData?.gainers_count}
          totalCount={apiData?.total_count}
        />
      </div>
    {/* </div> */}
    </Link>
  );
}

export default DashboardIndexCard;
