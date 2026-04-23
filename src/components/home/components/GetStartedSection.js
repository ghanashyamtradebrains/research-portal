import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRecentSearch } from "../../../redux/reducers/RecenSearchSlice";
import IndexGraphCard from "./IndexGraphCard";
import { getGraphData, getStockChange } from "../../../api/fetchClient";
import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { ArrowRightOutlined } from "@ant-design/icons";

function GetStartedSection({ lightMode }) {
  const recentStocks = useSelector(getRecentSearch);
  const IndexName = ["NIFTY", "SENSEX", "NIFTYPHARMA", "BANKNIFTY"];
  const [indexChangeData, setindexChangeData] = useState({});
  const [indexGraphData, setindexGraphData] = useState({});
  // get index change data
  const popularStocks = [
    {
      comp_name: "Reliance Industries Ltd",
      symbol: "RELIANCE",
    },
    {
      comp_name: "HDFC Bank Ltd.",
      symbol: "HDFCBANK",
    },
    {
      comp_name: "Tata Consultancy Services Ltd.",
      symbol: "TCS",
    },
    {
      comp_name: "ITC Ltd.",
      symbol: "ITC",
    },
  ];
  const getStockChangeData = async () => {
    let resultObj = {};
    for (let index = 0; index < IndexName.length; index++) {
      await getStockChange(IndexName[index])
        .then((resp) => {
          resultObj = { ...resultObj, [IndexName[index]]: resp.data[0] };
        })
        .catch((err) => null);
    }
    setindexChangeData(resultObj);
  };

  // get index intraday graph data
  const getDayGrphData = async () => {
    let graphObj = {};
    for (let index = 0; index < IndexName.length; index++) {
      await getGraphData(IndexName[index], 1)
        .then((resp) => {
          graphObj = { ...graphObj, [IndexName[index]]: resp.data };
        })
        .catch((err) => null);
    }
    setindexGraphData(graphObj);
  };
  useEffect(() => {
    getStockChangeData();
  }, []);
  useEffect(() => {
    getDayGrphData();
  }, []);

  const cardProps = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400, // laptop breakpoint
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 768, // tablet breakpoint
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 450, // mobile breakpoint
        settings: {
          autoplay: true,
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="home-ring-bg py-40">
      <img
        className=" display-md"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: "-40px",
          opacity: ".8",
          objectFit: "fill",
          zIndex: 1,
        }}
        src={getStartedBgMob}
        alt="bg"
      />
      <section className="d-flex flex-col-row justify-content-between align-lg-center max-w mx-auto px-15 ">
        {/* left section  */}
        <div className="w-100-60 d-flex flex-col align-md-center">
          <h1 className="fs-40-32 text-md-center mb-10">
            Become a Better{" "}
            <span className="fw-700 text-blue-grad">Stock Investor!</span>
          </h1>
          <div
            style={{ zIndex: 10 }}
            className={`trending-stocks justify-md-center`}
          >
            {popularStocks?.map((stock, i) => (
              <Link
                to={`/stocks/${stock?.symbol}`}
                key={i}
                className={`company-names ${
                  lightMode ? "bg-gray" : "bg-dark-gray"
                }`}
              >
                {stock.comp_name}
              </Link>
            ))}
          </div>
          <p className="my-20 fs-16-12 w-100-70 text-md-center">
            Trade brains portal helps investors make efficient stock research
            and analysis by providing quality fundamental data with insightful
            visuals.
          </p>
          <Link className="z-10" to={"/signup"}>
            <button
              style={{ width: "200px", height: "50px" }}
              className="btn-bg-primary fw-600 text-white fs-16-14 br-5"
            >
              Get Started <ArrowRightOutlined />
            </button>
          </Link>
        </div>
        {/* left section  */}
        {/* right section  */}
        {/* only in pc view  */}
        <div
          style={{ zIndex: 10 }}
          className="w-100-40 index-grid-wrap display-lg"
        >
          {IndexName?.map((name, i) => (
            <IndexGraphCard
              key={i}
              lightMode={lightMode}
              name={name}
              id={i}
              stockChange={indexChangeData[name]}
              graphData={indexGraphData[name]}
            />
          ))}
        </div>
        {/* only in pc view  */}
        {/* only in mobile view  */}
        <div style={{ zIndex: 10 }} className="display-md">
          <Carousel {...cardProps}>
            {IndexName.map((name, i) => {
              return (
                <div key={i}>
                  <IndexGraphCard
                    lightMode={lightMode}
                    name={name}
                    id={i}
                    stockChange={indexChangeData[name]}
                    graphData={indexGraphData[name]}
                  />
                </div>
              );
            })}
          </Carousel>
        </div>
        {/* only in mobile view  */}

        {/* right section  */}
      </section>
    </div>
  );
}

export default GetStartedSection;
