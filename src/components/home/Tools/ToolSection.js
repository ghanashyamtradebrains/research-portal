import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import React from "react";
import svgSheet from "../../../assets/svg/svgSheet";
import svgSheet2 from "../../../assets/svg/svgSheet2";
import ToolCard from "./ToolCard";
import { useDispatch } from "react-redux";
import { setToggleForm } from "../../../redux/reducers/AuthToggleSlice";

function ToolSection({ lightMode }) {
  const dispatch = useDispatch();
  const toolCardContent = [
    {
      icon: svgSheet2.userIcon,
      head: "Register",
      content: "Create an account in an instant to access more features.",
      redirectLink: "/signup",
      redirectState: "/",
    },
    {
      icon: svgSheet2.screenerIcon,
      head: "Screen Stocks",
      content: "Screen, sort and select stocks with 100+ filters.",
      redirectLink: "/login",
      redirectState: "/screener",
    },
    {
      icon: svgSheet2.analyzeGraph,
      head: "Analyse Stocks",
      content:
        "Examine stocks on the basis of their price, profitability and more.",
      redirectLink: "/login",
      redirectState: "/stocks/RELIANCE",
    },
    {
      icon: svgSheet2.downloadBlueIcon,
      head: "Get Our App",
      content: "Trade Brains Portal is now available on iOS and Android.",
      redirectLink: "https://bit.ly/tradebrainsportal",
      redirectState: "",
    },
  ];
  return (
    <div className="my-100">
      <section className="max-w  flex flex-col-row bg-image-fit mx-auto px-15  w-100 ">
        <div className="w-100-50">
          <h3 className="fs-40-32 fw-700 mb-30 text-md-center ">
            Exclusive Trading & Analytics Tools for You
          </h3>
          <div
            style={{ maxWidth: "600px", height: "380px" }}
            className={` ${
              lightMode ? "card-drop-light-shadow" : "card-drop-dark-shadow"
            }`}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ReQZONSMLqM"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="w-100-50 d-flex flex-col align-md-center">
          <p className="mb-30 text-md-center fs-18-14 w-70-100">
            Browse through the stock data of your favourite listed companies on
            BSE and NSE!
          </p>
          <div
            // onClick={dispatch(setToggleForm("login"))}
            style={{ width: "200px" }}
          >
            <button
              style={{ width: "200px", height: "50px" }}
              className="btn-bg-primary  fw-600 text-white fs-16-14 br-5"
            >
              Login <ArrowRightOutlined />
            </button>
          </div>
          {/* <Link href={"/login"} style={{ width: "200px" }}>
            <button
              style={{ width: "200px", height: "50px" }}
              className="btn-bg-primary  fw-600 text-white fs-16-14 br-5"
            >
              Login <ArrowRightOutlined />
            </button>
          </Link> */}
          <div style={{ minHeight: "380px" }} className="mt-30 flex flex-wrap">
            {toolCardContent?.map((data, i) => (
              <ToolCard key={i} data={data} lightMode={lightMode} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ToolSection;
