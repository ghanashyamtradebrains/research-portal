import React, { useEffect, useState } from "react";
import StockDark from "../../../assets/images/bg/RA_dashboard_Dark.webp";
import StockLight from "../../../assets/images/bg/RA_dashboard_light.webp";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import LineSebiDark from "../../../assets/images/Brokers/lineSebiLogoDark.png";
import LineSebiLight from "../../../assets/images/Brokers/lineSebiLogo.png";

function HomeResearchReport({ lightMode }) {
  const [scrollPosition, setScrollPosition] = useState(0);

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
      <div className="w-100-40 d-flex flex-col justify-content-center align-md-center">
        <h3 className="fs-40-32 fw-700">
          Get Expert <span className="text-grad-secondary">Stock</span>
        </h3>
        <h3 className="fs-40-32 fw-700 text-grad-secondary"> Recommendation</h3>
        <p className="fs-16-14 mb-0 text-md-center mb-20 mt-20">
          Get Detailed Insights with Stock Recommendations from our Expert
          Analysts!
        </p>

        <Link href={`/stock-research-report`} className="w-80-100">
          <div
            style={{ height: "40px" }}
            className="stock-report-plus-button w-100 d-flex justify-content-center align-items-center fw-600 text-white fs-16-14"
          >
            Subscribe Now{" "}
            <span className="ml-5">
              <ArrowRightOutlined />
            </span>
          </div>
        </Link>
        <Image
          className="mt-10"
          src={lightMode ? LineSebiLight : LineSebiDark}
          alt="img"
        />
      </div>
      <div className="w-100-60 mt-20 d-flex justify-content-end flex-col align-items-center">
        <Image
          className="h-100 w-80-100"
          width={"70%"}
          height={"70%"}
          src={lightMode ? StockLight : StockDark}
          alt="img"
        />
        <span
          className="clr-text-dark-grey text-align-center"
          style={{ fontSize: "10px" }}
        >
          *The securities quoted are for illustration only and are not
          recommendatory
        </span>
      </div>
    </section>
  );
}

export default HomeResearchReport;
