import React, { useEffect, useState } from "react";
import { CaretUpOutlined } from "@ant-design/icons";
import { redGreenColorPicker } from "../utilityFn/redGreenColor";
import numberWithCommas from "../utilityFn/numberWithCommas";
import Link from "next/link";
import { getIndexconstitients } from "../pages/api/fetchClient";
import { useRouter } from "next/router";

function Ticker({ lightMode }) {
  const [stockList, setstockList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const getData = async () => {
      await getIndexconstitients({
        indexname: "NIFTY",

        sortBy: "per_change",
        sortHead: false,
        page: 1,
      })
        .then((res) => {
          setstockList(res?.results);
        })
        .catch((err) => null);
    };
    getData();
  }, []);

  return (
    <div
      className={`slider ${
        lightMode
          ? "bg-gray"
          :  router.pathname.includes("/portal-ai")
          ? "bg-dark-portal-ai"
          : "bg-dark-gray-2"
      }`}
    >
      <div className="slide-track">
        {stockList?.map((stock, i) => (
          <Link href={`/stocks/${stock?.symbol}`} className="slide " key={i}>
            <span
              className={`ff-poppins fs-s-14 fw-600 ${
                lightMode ? "text-black" : "text-white"
              } px-3`}
            >
              {stock?.symbol}
            </span>
            <span
              className={`ff-rubik fs-s-14 fw-500 ${
                lightMode ? "text-black" : "text-white"
              } px-3`}
            >
              ₹{numberWithCommas(stock?.curr_price)}
            </span>
            <span
              style={{ color: redGreenColorPicker(stock.change, lightMode) }}
              className={`ff-rubik fs-s-14 fw-500 `}
            >
              {stock?.change > 0 ? "+" : ""}
              {stock?.change ?? 0} ({stock?.per_change > 0 ? "+" : ""}
              {stock?.per_change ?? 0}%)
            </span>
            <CaretUpOutlined
              style={{
                color: redGreenColorPicker(stock.change, lightMode),
                fontSize: "1.5rem",
                marginBottom: "3px",
              }}
              rotate={stock?.change < 0 ? 180 : 0}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Ticker;