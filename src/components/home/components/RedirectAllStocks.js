import React, { useEffect, useState } from "react";
// import stockGraphLight from "../../../assets/images/home/all stocks white theme.png";
// import stockGraphDark from "../../../assets/images/home/All stocks dark theme.png";
import StockDark from "../../../assets/images/bg/stocksDark.webp";
import StockLight from "../../../assets/images/bg/stocksLight.webp";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import useWindowWidth from "../../../utilityFn/getWindowWidth";

function RedirectAllStocks({ lightMode }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      className={`p-50-0 d-flex justify-content-between flex-col-row px-15 mt-40 w-100`}
    >
      <div
        className={`w-100-40 d-flex flex-col justify-content-center align-md-center ${
          windowWidth < 600 && "text-align-center"
        }`}
      >
        <h3 className="fs-40-32 fw-700">
          More than <span className="text-blue-grad">4,000+ Stocks</span>
        </h3>
        <p className="fs-16-14 mb-0 text-md-center mb-20 mt-20">
          Make better-investing decisions by browsing through your favourite
          companies listed on BSE and NSE!
        </p>

        <Link href={`/stock/sector/agro-chemicals`} className="w-80-100">
          <div
            style={{ height: "40px" }}
            className="btn-bg-primary w-100 d-flex justify-content-center align-items-center fw-600 text-white fs-16-14 br-20"
          >
            Explore Stocks <ArrowRightOutlined />
          </div>
        </Link>
      </div>
      <div className="w-100-60 mt-20 d-flex justify-content-end">
        <Image
          className="h-100 w-80-100"
          width={"70%"}
          height={"70%"}
          src={lightMode ? StockLight : StockDark}
          alt="img"
        />
      </div>
    </section>
  );
}

export default RedirectAllStocks;
